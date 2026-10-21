const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

global.window = {};
require('./planner-scheduling.js');
const sharedScheduler = global.window.PlannerScheduling;
delete global.window;

const DAY = 86400000;
const RealDate = Date;
class FixedDate extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-10-21T12:00:00']));
  }
  static now() {
    return new RealDate('2026-10-21T12:00:00').getTime();
  }
}

function loadPlanner(file) {
  const elements = new Map();
  const local = new Map();
  const getElement = id => {
    if (!elements.has(id)) {
      elements.set(id, {
        value: id === 'selectedDate' ? '2026-10-21' : id === 'startDate' ? '2026-10-18' : id === 'schoolMode' ? 'attend' : '',
        textContent: '',
        addEventListener() {},
        appendChild() {},
        replaceChildren() {}
      });
    }
    return elements.get(id);
  };
  const window = { PlannerScheduling: null, location: {}, Router: {}, addEventListener() {} };
  const context = {
    window,
    document: { getElementById: getElement },
    Date: FixedDate,
    localStorage: {
      getItem: key => local.get(key) || null,
      setItem: (key, value) => local.set(key, String(value)),
      removeItem: key => local.delete(key)
    },
    console,
    setTimeout:() => 1,
    clearTimeout() {},
    setInterval,
    navigator: {}
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'planner-scheduling.js'), 'utf8'), context);

  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const expose = `window.__plannerTest = {
    buildDayTasks, syncBacklog, getSchoolStatus, setTaskDone, placeBacklogItem, doCloudSave,
    getState: () => state, setState: value => { state = normalizeState(value); },
    setCloud: (database, id) => { db = database; cloudReady = true; currentSyncId = id; },
    getUserStoreKey: typeof getUserStoreKey === 'function' ? getUserStoreKey : null,
    getStoreKey: () => STORE,
    getCloudTag: () => ({className:document.getElementById('cloudTag').className,textContent:document.getElementById('cloudTag').textContent})
  };})();`;
  const testSource = source.replace(/init\(\);\s*\}\)\(\);\s*$/, expose);
  assert.notEqual(testSource, source, `test harness should suppress ${file} startup`);
  vm.runInNewContext(testSource, context, {filename:path.join(__dirname, file)});
  return { app:window.__plannerTest, elements, local };
}

function dayNumber(date, start = '2026-10-18') {
  return Math.floor((new RealDate(date) - new RealDate(start)) / DAY) + 1;
}

function asMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

const planners = [
  { file:'script.js', classTypes:['class'], hasFixedClasses:true },
  { file:'navya.js', classTypes:['tabla'], hasFixedClasses:true },
  { file:'deepak.js', classTypes:['class','tabla','tuition'], hasFixedClasses:false }
];

for (const planner of planners) {
  test(`${planner.file}: study blocks never overlap fixed classes`, () => {
    const { app, local } = loadPlanner(planner.file);
    app.setState({ settings:{startDate:'2026-10-18'}, dailyStatus:{} });

    let fixedDays = 0;
    for (let offset = 0; offset < 50; offset++) {
      const d = new RealDate(2026, 9, 18 + offset);
      const date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const tasks = app.buildDayTasks(date, offset + 1, false);
      const classes = tasks.filter(task => planner.classTypes.includes(task.type));
      fixedDays += classes.length;
      classes.forEach(fixed => {
        tasks.filter(task => task !== fixed && task.start && task.end && task.start !== '—').forEach(task => {
          assert.ok(
            !(asMinutes(task.start) < asMinutes(fixed.end) && asMinutes(task.end) > asMinutes(fixed.start)),
            `${date}: ${task.title} overlaps ${fixed.title}`
          );
        });
      });
    }
    if (planner.hasFixedClasses) assert.ok(fixedDays > 0, 'fixed class schedule should be represented');
  });

  test(`${planner.file}: date status and missed-task records stay per-day and idempotent`, () => {
    const { app, local } = loadPlanner(planner.file);
    app.setState({ settings:{startDate:'2026-10-18'}, dailyStatus:{'2026-10-21':'holiday'} });
    assert.equal(app.getSchoolStatus('2026-10-21'), 'holiday');
    assert.equal(app.getSchoolStatus('2026-10-22'), 'attend');
    const holidayStudy = app.buildDayTasks('2026-10-21', 4, false).find(task => ['topic','rev','study'].includes(task.kind));
    const normalStudy = app.buildDayTasks('2026-10-22', 5, false).find(task => ['topic','rev','study'].includes(task.kind));
    assert.ok(holidayStudy && normalStudy && holidayStudy.start !== normalStudy.start, 'switching dates restores each date’s schedule status');
    app.syncBacklog();
    const first = Object.values(app.getState().backlog);
    assert.ok(first.length > 0);
    assert.ok(first.every(item => item.originalDate < '2026-10-21'));
    app.syncBacklog();
    assert.equal(Object.keys(app.getState().backlog).length, first.length);
    const localKey = app.getUserStoreKey ? app.getUserStoreKey() : app.getStoreKey();
    const persisted = JSON.parse(local.get(localKey));
    assert.equal(persisted.dailyStatus['2026-10-21'], 'holiday');
    assert.equal(Object.keys(persisted.backlog).length, first.length);
    app.setState(persisted);
    assert.equal(app.getSchoolStatus('2026-10-21'), 'holiday');

    const scheduled = first.find(item => item.status === 'scheduled');
    assert.ok(scheduled, 'missed block should be assigned a suitable future slot');
    const baseTasks = app.buildDayTasks(scheduled.scheduledDate, dayNumber(scheduled.scheduledDate), false);
    const visibleBacklog = app.buildDayTasks(scheduled.scheduledDate, dayNumber(scheduled.scheduledDate))
      .find(task => task.kind === 'backlog' && task.backlogId === scheduled.id);
    assert.ok(visibleBacklog, 'rescheduled item appears on its assigned date');
    baseTasks.filter(task => task.start && task.end && task.start !== '—').forEach(task => {
      assert.ok(
        !(asMinutes(scheduled.start) < asMinutes(task.end) && asMinutes(scheduled.end) > asMinutes(task.start)),
        `${scheduled.title} overlaps ${task.title}`
      );
    });
    app.setTaskDone(scheduled.scheduledDate, {kind:'backlog', backlogId:scheduled.id}, true);
    app.syncBacklog();
    assert.equal(app.getState().backlog[scheduled.id].status, 'completed');

    const manuallySelected = {...app.getState().backlog[scheduled.id], id:'manual-date-test', status:'pending'};
    assert.equal(app.placeBacklogItem(manuallySelected, '2026-12-15'), true);
    assert.equal(manuallySelected.scheduledDate, '2026-12-15');
    const customDay = app.buildDayTasks('2026-12-15', dayNumber('2026-12-15'), false);
    customDay.filter(task => task.start && task.end && task.start !== '—').forEach(task => {
      assert.ok(
        !(asMinutes(manuallySelected.start) < asMinutes(task.end) && asMinutes(manuallySelected.end) > asMinutes(task.start)),
        `custom date selection overlaps ${task.title}`
      );
    });
  });
}

test('Abhinav local planner keys remain isolated by signed-in user', () => {
  const { app, local } = loadPlanner('script.js');
  local.set('study_auth_session_v1', JSON.stringify({userId:'abhinav'}));
  const abhinavKey = app.getUserStoreKey();
  local.set('study_auth_session_v1', JSON.stringify({userId:'navya'}));
  const navyaKey = app.getUserStoreKey();
  assert.notEqual(abhinavKey, navyaKey);
});

for (const planner of planners) {
  test(`${planner.file}: Firebase write includes planner state and waits for acknowledgement`, async () => {
    const { app } = loadPlanner(planner.file);
    const persisted = planner.file === 'navya.js'
      ? {
          tasks:{'d:2026-10-21:0':true},
          dailyStatus:{'2026-10-21':'holiday'},
          backlog:{'missed-1':{id:'missed-1',status:'scheduled',originalDate:'2026-10-20'}},
          settings:{startDate:'2026-10-18'}
        }
      : {
          topics:{'acc-pf:0':true},
          revs:{'r:31:0':true},
          ticks:{'x:2026-10-21:07:00:School':true},
          dailyStatus:{'2026-10-21':'holiday'},
          backlog:{'missed-1':{id:'missed-1',status:'scheduled',originalDate:'2026-10-20'}},
          settings:{startDate:'2026-10-18'}
        };
    app.setState(persisted);
    let resolveWrite;
    const pendingWrite = new Promise(resolve => { resolveWrite = resolve; });
    let writtenPath;
    let writtenPayload;
    app.setCloud({
      ref: path => ({
        update: payload => {
          if (path.startsWith('planner/')) {
            writtenPath = path;
            writtenPayload = payload;
          }
          return pendingWrite;
        }
      })
    }, 'stu-test1234');

    const saving = app.doCloudSave();
    assert.equal(app.getCloudTag().className, 'tag cloud-saving');
    assert.ok(writtenPath.startsWith('planner/'));
    for (const field of Object.keys(persisted)) assert.deepEqual(JSON.parse(JSON.stringify(writtenPayload[field])), persisted[field]);
    resolveWrite();
    await saving;
    assert.equal(app.getCloudTag().className, 'tag cloud-saved');
  });
}

test('planner scheduling: fixed intervals split availability without changing boundaries', () => {
  const scheduler = sharedScheduler;
  assert.deepEqual(JSON.parse(JSON.stringify(scheduler.freeSlots([['15:30','21:00']], [{start:'19:15',end:'21:00'}]))), [['15:30','19:15']]);
  assert.equal(scheduler.findSlot([['15:30','21:00']], [{start:'19:15',end:'21:00'}], 225).end, '19:15');
  assert.equal(scheduler.findSlot([['15:30','21:00']], [{start:'19:15',end:'21:00'}], 226), null);
});
