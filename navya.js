(() => {
'use strict';

const $ = id => document.getElementById(id);
const DAY = 86400000;

const STORE = 'cbse-navya-50day-v1';
const SYNC_KEY = 'cbse-navya-sync-id';
const CLOUD_PATH = 'planner/navya';

const firebaseConfig = {
  apiKey: "AIzaSyBwlW88e_C0tlvPqBhMs0WjoN8YlQVgzxY",
  authDomain: "toolkit-9d9b5.firebaseapp.com",
  databaseURL: "https://toolkit-9d9b5-default-rtdb.firebaseio.com",
  projectId: "toolkit-9d9b5",
  storageBucket: "toolkit-9d9b5.firebasestorage.app",
  messagingSenderId: "305180262667",
  appId: "1:305180262667:web:e0cbb12f007402945f620e",
  measurementId: "G-WTCKG4HJ4Q"
};

const SUBJECT_META = {
  math: { label: 'Mathematics', color: '#8ea2ff' },
  phy: { label: 'Physics', color: '#7dd3fc' },
  chem: { label: 'Chemistry', color: '#5eead4' },
  bio: { label: 'Biology', color: '#86efac' },
  sst: { label: 'Social Science', color: '#fcd34d' },
  eng: { label: 'English', color: '#93c5fd' },
  hin: { label: 'Hindi', color: '#f9a8d4' },
  it: { label: 'IT / Computer', color: '#c084fc' },
  rev: { label: 'Revision / Mock', color: '#fb7185' },
  routine: { label: 'Routine', color: '#94a3b8' },
  class: { label: 'Tabla Class', color: '#f472b6' },
  break: { label: 'Break', color: '#64748b' }
};

/* ============ NAVYA 50-DAY PLAN ============ */
const PLAN = [
  /* 1 */ [
    ['math','Real Numbers — LCM/HCF word problems','NCERT Ex 1 + 5 PYQs. Write steps.',45],
    ['chem','Chemical Reactions & Equations — Balancing & Types','Balance 12 equations. Classify combination/decomposition/displacement/double displacement.',45]
  ],
  /* 2 */ [
    ['math','Polynomials — Zeroes & Coefficients','Find zeroes, verify relationship. 6 questions.',45],
    ['bio','Life Processes — Nutrition & Respiration','Plant/human nutrition, respiratory diagrams. Label 3 diagrams.',45]
  ],
  /* 3 */ [
    ['math','Linear Equations in Two Variables — Word problems','Substitution/elimination. 5 word problems.',45],
    ['phy','Light — Reflection & Spherical Mirrors','Mirror formula sign convention. 5 numericals + ray diagrams.',45]
  ],
  /* 4 */ [
    ['math','Quadratic Equations — Nature of roots','Discriminant, factorization/formula. 6 questions.',45],
    ['chem','Acids, Bases and Salts — pH & Indicators','pH range, indicators, common salts. Short notes.',45]
  ],
  /* 5 */ [
    ['math','Arithmetic Progressions — nth term & Sum','a, d, an, Sn formulas. 6 numericals.',45],
    ['sst','History — Nationalism in Europe','French Revolution, unification ideas. Timeline + 5 answers.',45]
  ],
  /* 6 */ [
    ['math','AP Word Problems','Age, savings, production type questions. 5 sums.',45],
    ['bio','Life Processes — Transport & Excretion','Heart, nephron, plant transport. Diagrams.',45]
  ],
  /* 7 */ [
    ['rev','Week 1 Revision + Mini Test','20 PYQs from Day 1-6. Update Black Book.',90]
  ],
  /* 8 */ [
    ['math','Triangles — BPT & Similarity','Basic Proportionality Theorem, similarity criteria. 2 proofs + 4 sums.',45],
    ['phy','Light — Refraction & Numericals','Snell law, refractive index, lens basics. 5 numericals.',45]
  ],
  /* 9 */ [
    ['math','Triangles Word Problems','Area ratio, Pythagoras applications. 5 questions.',45],
    ['chem','Metals & Non-metals — Reactivity','Reactivity series, extraction, roasting/calcination. Tables.',45]
  ],
  /* 10 */ [
    ['math','Coordinate Geometry — Distance & Section','Distance, section, midpoint. 6 numericals.',45],
    ['sst','Geography — Resources & Development + Map','Resource types, conservation. Mark 5 map items.',45]
  ],
  /* 11 */ [
    ['math','Trigonometry Intro — Ratios & Identities','Trig table, basic identities. Simplify 8 expressions.',45],
    ['bio','Control & Coordination — Neuron/Hormones','Reflex arc, brain, plant/animal hormones. Diagrams.',45]
  ],
  /* 12 */ [
    ['math','Trigonometry Identities Practice','Prove 5 identities, solve mixed questions.',45],
    ['phy','Light — Lenses, Power & Numericals','Lens formula, magnification, power. 6 numericals.',45]
  ],
  /* 13 */ [
    ['math','Applications of Trigonometry — Heights & Distances','Angle of elevation/depression. 4 word problems.',45],
    ['eng','English — Reading Practice','One unseen passage + vocabulary. Focus inference.',30]
  ],
  /* 14 */ [
    ['rev','Week 2 Revision + Mini Test','Trig + Light numericals. 25 questions. Black Book update.',90]
  ],
  /* 15 */ [
    ['math','Circles — Tangents Proof','Tangent from external point, theorems. 2 proofs + 4 questions.',45],
    ['chem','Carbon & Compounds — IUPAC & Isomers','Naming, structural isomers. 10 structures.',45]
  ],
  /* 16 */ [
    ['math','Circles PYQs','Mixed circle theorem/numerical PYQs.',45],
    ['chem','Carbon — Soaps, Detergents & Homologous Series','Micelles, cleansing action, series properties.',45]
  ],
  /* 17 */ [
    ['math','Areas Related to Circles','Sector, segment, combination figures. 6 sums.',45],
    ['sst','Economics — Development & Sectors','Development indicators, primary/secondary/tertiary. Notes.',45]
  ],
  /* 18 */ [
    ['phy','Human Eye — Defects & Corrections','Myopia, hypermetropia, presbyopia, dispersion. 4 numericals.',45],
    ['bio','How do Organisms Reproduce?','Asexual/sexual plant + human reproduction basics.',45]
  ],
  /* 19 */ [
    ['phy','Human Eye PYQs','Scattering/prism/defect mixed board questions.',45],
    ['sst','History — Nationalism in India','Timeline, movements, map items. 6 answers.',45]
  ],
  /* 20 */ [
    ['rev','Phase 1 Mega Revision — Math Sectional Mock','2-hour mock from Day 1-19 math topics. Post-mortem.',120]
  ],
  /* 21 */ [
    ['bio','Heredity — Mendel Laws','Monohybrid/dihybrid, sex determination. 5 crosses.',45],
    ['sst','Pol Sci — Power Sharing & Federalism','Belgium/Sri Lanka, Indian federalism. Answer writing.',45]
  ],
  /* 22 */ [
    ['bio','Heredity & Evolution — Practice','Genetics numericals + evolutionary concepts short answers.',45],
    ['sst','Geography — Water Resources & Agriculture + Map','Crop patterns, irrigation, water conflict. Map 6 items.',45]
  ],
  /* 23 */ [
    ['math','Areas Related to Circles PYQs','Mixed sector/segment board questions.',45],
    ['phy','Electricity — Ohm Law & Resistance','V-I graph, resistivity, series/parallel basics. 5 numericals.',45]
  ],
  /* 24 */ [
    ['math','Surface Areas & Volumes — Cube/Cuboid/Cylinder','Formula drill + 6 numericals.',45],
    ['phy','Electricity — Heating Effect & Power','H = I^2Rt, power, household circuits. 5 numericals.',45]
  ],
  /* 25 */ [
    ['math','SA & V — Cone/Sphere/Combination','Combined solids, frustum not included if deleted. 6 sums.',45],
    ['sst','Economics — Money & Credit','Modern money, credit, SHGs, loan terms. Notes.',45]
  ],
  /* 26 */ [
    ['math','Statistics — Mean/Median/Mode','Grouped data formulas. 6 numericals.',45],
    ['sst','Pol Sci — Gender, Religion, Caste + Parties','Politics of identity, party functions. 5 answers.',45]
  ],
  /* 27 */ [
    ['rev','Week 4 Revision + SST Map Masterclass','All History/Geo map items blank. 30-minute map drill.',90]
  ],
  /* 28 */ [
    ['math','Statistics — Missing Frequency & Ogive','Missing frequency, cumulative frequency. 5 sums.',45],
    ['phy','Magnetic Effects — Field Lines & Force','Right-hand thumb, force on conductor. Diagrams.',45]
  ],
  /* 29 */ [
    ['math','Probability — Cards/Dice/Coins','Classical probability. 8 questions.',45],
    ['phy','Magnetic Effects — Solenoid/Fleming/Motor','Solenoid, electromagnet, Fleming rules, induction. 5 answers.',45]
  ],
  /* 30 */ [
    ['math','Probability PYQs','Mixed probability board questions.',45],
    ['bio','Our Environment & Natural Resources','Food chain, waste management, sustainable practices.',45]
  ],
  /* 31 */ [
    ['rev','Buffer / Weak Topic Repair','Pick 3 weakest topics from Day 1-30 and redo errors.',90],
    ['sst','Geography — Minerals, Energy & Manufacturing','Distribution, conservation, industry location. Map.',45]
  ],
  /* 32 */ [
    ['sst','History — Global World & Industrialisation','Trade, silk routes, factory system. Timeline.',45],
    ['sst','Geography — Lifelines of National Economy','Transport, communication, trade. Short answers.',45]
  ],
  /* 33 */ [
    ['sst','Economics — Globalisation & Consumer Rights','MNCs, WTO, consumer rights/redressal. Notes.',45],
    ['sst','Pol Sci — Outcomes of Democracy','Accountability, legitimacy, comparison. 5 answers.',45]
  ],
  /* 34 */ [
    ['rev','Phase 2 Mega Revision — Science Sectional Mock','2-hour Science mock. Black Book post-mortem.',120]
  ],
  /* 35 */ [
    ['rev','BUFFER DAY — Pending Chapters','Jo bhi Phase 1/2 pending hai, aaj khatam. No new topic.',120]
  ],
  /* 36 */ [
    ['eng','English — First Flight Prose','Summaries + character sketches of all prose chapters.',60],
    ['hin','Hindi — Kshitij Bhag 2','Lessons summary + 5 important questions each.',60]
  ],
  /* 37 */ [
    ['eng','English — Footprints Without Feet','Summaries, theme, value points.',60],
    ['hin','Hindi — Kritika Bhag 2','Grammar/literature mix as per school book.',60]
  ],
  /* 38 */ [
    ['eng','English Grammar + Writing','Tenses, modals, clauses, omission. Letter + analytical paragraph.',60],
    ['hin','Hindi Vyakaran','Sandhi, samas, alankar, muhavare, vilom, parayavachi.',45]
  ],
  /* 39 */ [
    ['hin','Hindi Lekhan','Anuchhed, patra lekhana, diary/sambhash format.',45],
    ['it','IT/Computer — Employability Skills','Communication, self-management, ICT basics.',45]
  ],
  /* 40 */ [
    ['it','IT/Computer — Python Basics','Syntax, variables, input/output, operators, conditions.',60],
    ['eng','English — Writing Format Drill','2 letters + 1 paragraph from memory.',45]
  ],
  /* 41 */ [
    ['it','IT/Computer — Advanced Python/HTML/SQL','As per school choice. Output-based questions.',60],
    ['hin','Hindi — Unseen Passage Practice','Apathit gadyansh + 10 questions.',45]
  ],
  /* 42 */ [
    ['rev','Week 6 Revision — Language + IT','Write 2 English/Hindi formats from memory. Solve 1 IT mock.',90]
  ],
  /* 43 */ [
    ['rev','Math Full Mock Test','3-hour board pattern mock. Strict timing. Post-mortem.',180]
  ],
  /* 44 */ [
    ['rev','Science Full Mock Test','3-hour board pattern mock. Diagrams + numericals.',180]
  ],
  /* 45 */ [
    ['rev','SST Full Mock Test','3-hour mock including map work. Post-mortem.',180]
  ],
  /* 46 */ [
    ['rev','English + Hindi Mock Tests','Alternate timing. Format checking. Writing + literature.',150]
  ],
  /* 47 */ [
    ['rev','Black Book Deep Dive','Only errors. Redo wrong questions. Formula/dates/diagrams.',120]
  ],
  /* 48 */ [
    ['rev','PYQ Meat Grinder — Math & Science','Last 5 years VVIQ. Timed section drills.',120]
  ],
  /* 49 */ [
    ['rev','Final Rapid Fire','100 MCQs + 20 assertion-reason. Fast recall.',90]
  ],
  /* 50 */ [
    ['rev','System Reset — Light Revision','Formula sheets, map items, writing formats. No heavy study. Sleep 8 hours.',60]
  ]
];

/* ============ HELPERS ============ */
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const dateOf = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d, 12); };
const dayName = d => ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
const fmt = s => dateOf(s).toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' });
const minutes = s => { const [h,m] = s.split(':').map(Number); return h * 60 + m; };
const hm = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
const pretty = s => {
  const [h,m] = s.split(':').map(Number);
  return new Date(2000,0,1,h,m).toLocaleTimeString('en-IN', { hour:'numeric', minute:'2-digit', hour12:true });
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const startMin = t => (!t.start || t.start === '—') ? 999999 : minutes(t.start);
const subjectLabel = code => (SUBJECT_META[code] && SUBJECT_META[code].label) || code;

function dateForDay(dayNum) {
  const start = ($('startDate') && $('startDate').value) || '2026-10-18';
  const d = dateOf(start);
  d.setDate(d.getDate() + (dayNum - 1));
  return iso(d);
}

function todayDayNum() {
  const start = ($('startDate') && $('startDate').value) || '2026-10-18';
  return Math.floor((dateOf(iso(new Date())) - dateOf(start)) / DAY) + 1;
}

/* ============ STATE ============ */
let state = normalizeState(null);

function normalizeState(s) {
  s = s || {};
  return {
    tasks: (s.tasks && typeof s.tasks === 'object') ? s.tasks : {},
    settings: (s.settings && typeof s.settings === 'object') ? s.settings : {},
    lastUpdated: typeof s.lastUpdated === 'number' ? s.lastUpdated : 0
  };
}

function saveLocal() {
  try { localStorage.setItem(STORE, JSON.stringify(state)); } catch(e) {}
}

function save() {
  state.lastUpdated = Date.now();
  saveLocal();
  scheduleCloudSave();
}

function isTaskDone(dateStr, task) {
  return !!state.tasks[taskKey(dateStr, task)];
}

function setTaskDone(dateStr, task, val) {
  const key = taskKey(dateStr, task);
  if (val) state.tasks[key] = true;
  else delete state.tasks[key];
  save();
}

function taskKey(dateStr, task) {
  if (task.kind === 'study') return `d:${dateStr}:${task.taskIndex}`;
  return `x:${dateStr}:${task.start}:${task.title}`;
}

/* ============ NAVYA ROUTINE / WINDOWS ============ */
function getStudyWindows(dow, mode) {
  const holiday = mode !== 'attend';

  if (holiday) {
    // Tuesday(2)/Thursday(4): tabla 4:30-7 PM
    if (dow === 2 || dow === 4) {
      return [
        ['09:00','10:30'],
        ['11:00','12:30'],
        ['15:00','16:15'],
        ['19:15','20:45']
      ];
    }

    // Wednesday(3)/Friday(5): tabla 7-9 PM
    if (dow === 3 || dow === 5) {
      return [
        ['09:00','10:30'],
        ['11:00','12:30'],
        ['15:00','16:30'],
        ['17:00','18:30']
      ];
    }

    // Sunday/Monday/Saturday holiday
    return [
      ['09:00','10:30'],
      ['11:00','12:30'],
      ['15:00','16:30'],
      ['17:00','18:30']
    ];
  }

  // School attend
  // Tuesday/Thursday: tabla 4:30-7 PM, light evening study only
  if (dow === 2 || dow === 4) {
    return [
      ['19:15','20:45']
    ];
  }

  // Wednesday/Friday: tabla 7-9 PM, early evening study
  if (dow === 3 || dow === 5) {
    return [
      ['17:00','18:30']
    ];
  }

  // Monday/Saturday school days
  return [
    ['17:00','18:30'],
    ['18:45','20:15']
  ];
}

function buildDayTasks(dateStr, dayNum) {
  const d = dateOf(dateStr);
  let dow = d.getDay();
  let mode = ($('schoolMode') && $('schoolMode').value) || 'attend';

  // Sunday ko always holiday treat karo
  if (dow === 0) mode = 'holiday';

  const holiday = mode !== 'attend';
  const tasks = [];

  // Wake up
  tasks.push({
    kind: 'routine',
    subject: 'routine',
    title: 'Wake up',
    desc: 'Navya fixed 7 AM wake-up.',
    start: '07:00',
    end: '07:30',
    type: 'routine'
  });

  if (holiday) {
    tasks.push({
      kind: 'routine',
      subject: 'break',
      title: 'Breakfast + freshen up',
      desc: 'No rush. Free time.',
      start: '07:30',
      end: '09:00',
      type: 'break'
    });

    tasks.push({
      kind: 'routine',
      subject: 'break',
      title: 'Lunch + rest',
      desc: 'Midday break.',
      start: '12:30',
      end: '15:00',
      type: 'break'
    });
  } else {
    tasks.push({
      kind: 'routine',
      subject: 'class',
      title: 'School',
      desc: 'School jaana hai, 4:30 PM tak return.',
      start: '08:00',
      end: '16:30',
      type: 'school'
    });

    tasks.push({
      kind: 'routine',
      subject: 'break',
      title: 'Rest after school',
      desc: 'Freshen up, light snack.',
      start: '16:30',
      end: '17:00',
      type: 'break'
    });
  }

  // Tabla classes
  if (dow === 2 || dow === 4) {
    tasks.push({
      kind: 'routine',
      subject: 'class',
      title: 'Tabla class',
      desc: 'Tuesday/Thursday 4:30-7:00 PM.',
      start: '16:30',
      end: '19:00',
      type: 'tabla'
    });

    if (!holiday) {
      tasks.push({
        kind: 'routine',
        subject: 'break',
        title: 'Dinner after tabla',
        desc: 'Quick dinner.',
        start: '19:00',
        end: '19:15',
        type: 'break'
      });
    }
  }

  if (dow === 3 || dow === 5) {
    tasks.push({
      kind: 'routine',
      subject: 'class',
      title: 'Tabla class',
      desc: 'Wednesday/Friday 7:00-9:00 PM.',
      start: '19:00',
      end: '21:00',
      type: 'tabla'
    });

    tasks.push({
      kind: 'routine',
      subject: 'break',
      title: 'Dinner / buffer',
      desc: 'Before tabla.',
      start: '18:30',
      end: '19:00',
      type: 'break'
    });
  }

  // Free / sleep
  tasks.push({
    kind: 'routine',
    subject: 'break',
    title: 'Free time',
    desc: 'Thoda free time zaroori hai.',
    start: '20:45',
    end: '21:00',
    type: 'free'
  });

  tasks.push({
    kind: 'routine',
    subject: 'routine',
    title: 'Sleep',
    desc: 'Strict 9 PM sleep.',
    start: '21:00',
    end: '21:30',
    type: 'sleep'
  });

  // Study windows
  const windows = getStudyWindows(dow, mode).map(w => ({
    s: minutes(w[0]),
    e: minutes(w[1]),
    cur: minutes(w[0])
  }));

  const dayTasks = PLAN[dayNum - 1] || [];

  dayTasks.forEach((t, idx) => {
    const item = {
      kind: 'study',
      subject: t[0],
      title: t[1],
      desc: t[2],
      mins: t[3] || 45,
      taskIndex: idx,
      start: '—',
      end: '—'
    };

    const win = windows.find(w => (w.e - w.cur) >= item.mins);

    if (win) {
      item.start = hm(win.cur);
      win.cur += item.mins;
      item.end = hm(win.cur);

      // small gap if room
      if ((win.e - win.cur) >= 10) win.cur += 5;
    } else {
      item.overflow = true;
      item.desc = 'BACKLOG: Aaj ke free slot mein fit nahi hua. Buffer/next free day mein karo. ' + item.desc;
    }

    tasks.push(item);
  });

  return tasks.sort((a,b) => startMin(a) - startMin(b));
}

/* ============ SMART NEXT ============ */
function smartNext() {
  const today = iso(new Date());
  const todayNum = todayDayNum();

  if (todayNum >= 1 && todayNum <= 50) {
    const todayTasks = buildDayTasks(today, todayNum);
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();

    const current = todayTasks.find(t =>
      t.kind === 'study' &&
      nowMin >= minutes(t.start) &&
      nowMin < minutes(t.end) &&
      !isTaskDone(today, t)
    );

    if (current) return { type: 'current', date: today, dayNum: todayNum, task: current };

    const nextPending = todayTasks.find(t => t.kind === 'study' && !isTaskDone(today, t));
    if (nextPending) return { type: 'next-today', date: today, dayNum: todayNum, task: nextPending };
  }

  // backlog
  for (let day = 1; day < Math.min(todayNum, 51); day++) {
    const date = dateForDay(day);
    const dayTasks = PLAN[day - 1] || [];

    for (let i = 0; i < dayTasks.length; i++) {
      const key = `d:${date}:${i}`;
      if (!state.tasks[key]) {
        const t = dayTasks[i];
        return {
          type: 'backlog',
          date,
          dayNum: day,
          task: {
            kind: 'study',
            subject: t[0],
            title: t[1],
            desc: t[2],
            start: '—',
            end: '—'
          }
        };
      }
    }
  }

  // tomorrow preview
  if (todayNum + 1 <= 50) {
    const date = dateForDay(todayNum + 1);
    const dayTasks = PLAN[todayNum] || [];
    if (dayTasks.length) {
      const t = dayTasks[0];
      return {
        type: 'tomorrow',
        date,
        dayNum: todayNum + 1,
        task: {
          kind: 'study',
          subject: t[0],
          title: t[1],
          desc: t[2],
          start: '—',
          end: '—'
        }
      };
    }
  }

  return { type: 'done', message: '50 days complete! Calm revision mode.' };
}

/* ============ RENDER ============ */
function renderNow() {
  const n = smartNext();
  const clock = $('clock');
  const now = new Date();

  if (clock) {
    clock.textContent = `Device time: ${now.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true})} · Day ${Math.max(1, Math.min(50, todayDayNum()))} of 50`;
  }

  const curTitle = $('currentTitle');
  const curDesc = $('currentDesc');
  const nextT = $('nextTitle');
  const nextD = $('nextDesc');

  if (!curTitle || !curDesc || !nextT || !nextD) return;

  if (n.type === 'current' || n.type === 'next-today') {
    const prefix = n.type === 'current' ? '▶ NOW: ' : '▶ NEXT (today): ';
    curTitle.textContent = prefix + n.task.title;
    curDesc.textContent = `${subjectLabel(n.task.subject)} · ${n.task.desc} · ${n.task.start === '—' ? 'Flexible' : pretty(n.task.start) + '–' + pretty(n.task.end)}`;

    const today = iso(new Date());
    const todayTasks = buildDayTasks(today, todayDayNum());
    const after = todayTasks.find(t => t.kind === 'study' && !isTaskDone(today, t) && t !== n.task && startMin(t) >= startMin(n.task));

    nextT.textContent = after ? after.title : '—';
    nextD.textContent = after ? `${subjectLabel(after.subject)} · ${after.desc}` : 'Aaj ke baaki blocks niche dekh lo.';
  } else if (n.type === 'backlog') {
    curTitle.textContent = '⚠ BACKLOG: ' + n.task.title;
    curDesc.textContent = `${subjectLabel(n.task.subject)} · Day ${n.dayNum} (${fmt(n.date)}) ka pending topic. Pehle ise finish karo.`;
    nextT.textContent = 'Phir: aaj ka plan';
    nextD.textContent = 'Backlog clear hone ke baad today ka plan continue karo.';
  } else if (n.type === 'tomorrow') {
    curTitle.textContent = '✓ Aaj ke study blocks done';
    curDesc.textContent = '9 PM sleep routine follow karo. Kal ka pehla topic:';
    nextT.textContent = n.task.title;
    nextD.textContent = `${subjectLabel(n.task.subject)} · ${n.task.desc}`;
  } else {
    curTitle.textContent = '🎉 50 days complete!';
    curDesc.textContent = 'Full revision mode — weak areas + mocks.';
    nextT.textContent = '—';
    nextD.textContent = '—';
  }
}

function render() {
  const sel = ($('selectedDate') && $('selectedDate').value) || iso(new Date());
  const start = ($('startDate') && $('startDate').value) || '2026-10-18';
  const dayNum = Math.floor((dateOf(sel) - dateOf(start)) / DAY) + 1;

  if ($('dateStat')) $('dateStat').textContent = fmt(sel);
  if ($('todayHeading')) $('todayHeading').textContent = `${fmt(sel)} — Day ${Math.max(1, Math.min(50, dayNum))} / 50`;
  if ($('dayStat')) $('dayStat').textContent = dayNum >= 1 && dayNum <= 50 ? `${dayNum}/50` : dayNum < 1 ? 'Before' : 'Done';

  const tasks = (dayNum >= 1 && dayNum <= 50) ? buildDayTasks(sel, dayNum) : [];
  const studyTasks = tasks.filter(t => t.kind === 'study');
  const doneCount = studyTasks.filter(t => isTaskDone(sel, t)).length;

  if ($('dayProgress')) $('dayProgress').textContent = `${doneCount} / ${studyTasks.length} study blocks done`;

  if ($('subjectChips')) {
    const subs = [...new Set(studyTasks.map(t => t.subject))];
    $('subjectChips').innerHTML = subs.map(s => `<span class="chip">${esc(subjectLabel(s))}</span>`).join('');
  }

  const host = $('taskList');
  if (host) {
    host.innerHTML = '';

    tasks.forEach(task => {
      const done = isTaskDone(sel, task);
      const el = document.createElement('div');
      el.className = 'task' + (done ? ' done' : '') + (task.kind === 'study' ? ' topic-task' : '');
      el.dataset.subject = task.subject;

      const timeStr = task.start === '—'
        ? 'Flexible<small>backlog</small>'
        : pretty(task.start) + '<small>' + pretty(task.end) + '</small>';

      el.innerHTML =
        `<input type="checkbox" ${done ? 'checked' : ''}>` +
        `<div class="time">${timeStr}</div>` +
        `<div class="taskbody">` +
          `<div class="tasktitle">${esc(task.title)}</div>` +
          `<div class="desc">${esc(task.desc || '')}</div>` +
        `</div>`;

      el.querySelector('input').addEventListener('change', e => {
        setTaskDone(sel, task, e.target.checked);
        el.classList.toggle('done', e.target.checked);
        render();
        renderNow();
      });

      host.appendChild(el);
    });
  }

  if ($('intensityTag')) {
    const it = chosenIntensity(dateOf(sel).getDay());
    $('intensityTag').textContent = it;
    $('intensityTag').className = 'tag ' + it.toLowerCase();
  }

  if ($('daySummary')) {
    $('daySummary').textContent = `Day ${Math.max(1, Math.min(50, dayNum))} · ${tasks.length} blocks · ${studyTasks.length} study`;
  }

  renderRoadmap();
  renderStats();
  renderNow();
}

function renderRoadmap() {
  const host = $('roadmap');
  if (!host) return;

  host.innerHTML = '';
  const start = ($('startDate') && $('startDate').value) || '2026-10-18';
  const startD = dateOf(start);
  const sel = ($('selectedDate') && $('selectedDate').value) || iso(new Date());

  for (let i = 0; i < 50; i++) {
    const d = new Date(startD.getTime());
    d.setDate(d.getDate() + i);
    const ds = iso(d);
    const dayNum = i + 1;

    const tasks = buildDayTasks(ds, dayNum);
    const study = tasks.filter(t => t.kind === 'study');
    const done = study.filter(t => isTaskDone(ds, t)).length;
    const complete = study.length > 0 && done === study.length;

    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'roadmap-item' + (ds === sel ? ' selected' : '') + (complete ? ' complete' : '');
    b.innerHTML =
      `<div class="rmhead"><strong>Day ${dayNum} · ${dayName(d)}</strong>` +
      `<span class="rmprog">${done}/${study.length}</span></div>` +
      `<div class="small muted">${fmt(ds)}</div>`;

    b.onclick = () => {
      if ($('selectedDate')) $('selectedDate').value = ds;
      render();
    };

    host.appendChild(b);
  }
}

function renderStats() {
  let total = 0;
  let done = 0;

  for (let day = 1; day <= 50; day++) {
    const date = dateForDay(day);
    const dayTasks = PLAN[day - 1] || [];
    total += dayTasks.length;

    for (let i = 0; i < dayTasks.length; i++) {
      if (state.tasks[`d:${date}:${i}`]) done++;
    }
  }

  if ($('doneStat')) $('doneStat').textContent = done;
  if ($('totalStat')) $('totalStat').textContent = `${total} topics tracked`;

  const pct = Math.min(100, Math.round(done / Math.max(1, total) * 100));
  if ($('progressStat')) $('progressStat').textContent = pct + '%';
  if ($('progressBar')) $('progressBar').style.width = pct + '%';

  const todayNum = todayDayNum();
  let backlog = 0;

  for (let day = 1; day < Math.min(todayNum, 51); day++) {
    const date = dateForDay(day);
    const dayTasks = PLAN[day - 1] || [];
    for (let i = 0; i < dayTasks.length; i++) {
      if (!state.tasks[`d:${date}:${i}`]) backlog++;
    }
  }

  if ($('statusStat')) $('statusStat').textContent = backlog ? `${backlog} pending` : 'On track';
}

function chosenIntensity(dow) {
  const v = ($('intensity') && $('intensity').value) || 'auto';
  if (v !== 'auto') return v.toUpperCase();
  if (dow === 0) return 'FLEX';
  if (dow === 2 || dow === 4) return 'LIGHT';
  if (dow === 3 || dow === 5) return 'MEDIUM';
  return 'HEAVY';
}

/* ============ TOASTS ============ */
function showToast({ message, type = 'info', duration = 4000, action = null }) {
  const host = $('toasts');
  if (!host) return;

  const el = document.createElement('div');
  el.className = 'toast toast-' + type;

  const span = document.createElement('span');
  span.textContent = message;
  el.appendChild(span);

  if (action) {
    const btn = document.createElement('button');
    btn.className = 'toast-action';
    btn.type = 'button';
    btn.textContent = action.label;
    btn.onclick = () => {
      try { action.onClick(); } finally { dismiss(); }
    };
    el.appendChild(btn);
  }

  const close = document.createElement('button');
  close.className = 'toast-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close');
  close.innerHTML = '×';
  close.onclick = () => dismiss();
  el.appendChild(close);

  host.appendChild(el);

  let dismissed = false;
  let timer = null;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    if (timer) clearTimeout(timer);
    el.classList.add('toast-out');
    setTimeout(() => el.remove(), 300);
  }

  if (duration > 0) timer = setTimeout(dismiss, duration);
  return { dismiss };
}

/* ============ CONFIRM MODAL ============ */
let modalBusy = false;

function confirmAction({ title, message, details = [], confirmText = 'Confirm', danger = true }) {
  return new Promise(resolve => {
    if (modalBusy) {
      resolve(false);
      return;
    }

    modalBusy = true;

    const backdrop = $('modalBackdrop');
    const titleEl = $('modalTitle');
    const msgEl = $('modalMsg');
    const detailsEl = $('modalDetails');
    const okBtn = $('modalOk');
    const cancelBtn = $('modalCancel');

    if (!backdrop || !titleEl || !msgEl || !detailsEl || !okBtn || !cancelBtn) {
      modalBusy = false;
      resolve(false);
      return;
    }

    titleEl.textContent = title;
    msgEl.textContent = message || '';
    detailsEl.innerHTML = details.map(d => `<li>${esc(d)}</li>`).join('');
    okBtn.textContent = confirmText;
    okBtn.className = 'btn ' + (danger ? 'danger' : 'primary');

    function cleanup(result) {
      backdrop.hidden = true;
      document.body.classList.remove('modal-open');
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      backdrop.removeEventListener('click', onBackdrop);
      document.removeEventListener('keydown', onKey);
      modalBusy = false;
      resolve(result);
    }

    function onOk() { cleanup(true); }
    function onCancel() { cleanup(false); }
    function onBackdrop(e) { if (e.target === backdrop) cleanup(false); }
    function onKey(e) { if (e.key === 'Escape') cleanup(false); }

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    backdrop.addEventListener('click', onBackdrop);
    document.addEventListener('keydown', onKey);

    backdrop.hidden = false;
    document.body.classList.add('modal-open');
    setTimeout(() => okBtn.focus(), 40);
  });
}

function snapshot() {
  return JSON.parse(JSON.stringify({ tasks: state.tasks }));
}

function offerUndo(snap, msg) {
  showToast({
    message: msg,
    type: 'info',
    duration: 15000,
    action: {
      label: 'Undo',
      onClick: () => {
        state.tasks = snap.tasks;
        save();
        render();
        showToast({ message: 'Restore ho gaya.', type: 'success', duration: 2500 });
      }
    }
  });
}

/* ============ FIREBASE ============ */
let db = null;
let cloudReady = false;
let cloudSaveTimer = null;
let cloudSaveInFlight = false;
let cloudSavePending = false;
let cloudLoadFailed = false;
let syncInProgress = false;
let currentSyncId = '';
let lastSaveError = null;

function setCloudTag(cls, text) {
  const el = $('cloudTag');
  if (el) {
    el.className = 'tag ' + cls;
    el.textContent = text;
  }
}

function initFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      setCloudTag('cloud-off', 'Firebase SDK load nahi hua');
      return false;
    }

    if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    cloudReady = true;
    setCloudTag('cloud-sync', 'Sync ready');
    return true;
  } catch (e) {
    console.warn('Firebase init error:', e);
    setCloudTag('cloud-off', 'Cloud off');
    return false;
  }
}

function getOrCreateSyncId() {
  let id = localStorage.getItem(SYNC_KEY);
  if (!id || !/^stu-[a-z0-9]{6,20}$/i.test(id)) {
    id = 'stu-' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SYNC_KEY, id);
    showToast({ message: `Naya Navya Sync ID banaya: ${id}`, type: 'info', duration: 6000 });
  }
  return id.toLowerCase();
}

function cloudRef(id) {
  return db.ref(CLOUD_PATH + '/' + id);
}

function loadFromCloud(id) {
  if (!db) return Promise.resolve({ ok: false, error: new Error('DB not init') });
  return cloudRef(id).once('value')
    .then(s => ({ ok: true, exists: !!s.exists(), data: s.val() }))
    .catch(e => ({ ok: false, error: e }));
}

function pushToCloud(payload) {
  if (!db) return Promise.reject(new Error('DB not init'));
  return cloudRef(currentSyncId).set(payload);
}

function scheduleCloudSave() {
  if (!cloudReady || !db) return;
  if (cloudLoadFailed) {
    setCloudTag('cloud-error', 'Cloud not synced');
    return;
  }

  if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
  setCloudTag('cloud-saving', 'Saving…');
  cloudSaveTimer = setTimeout(() => {
    cloudSaveTimer = null;
    doCloudSave();
  }, 500);
}

async function doCloudSave() {
  if (!cloudReady || !db || cloudLoadFailed) return;
  if (cloudSaveInFlight) {
    cloudSavePending = true;
    return;
  }

  cloudSaveInFlight = true;
  setCloudTag('cloud-saving', 'Saving…');

  try {
    await pushToCloud({ ...state, lastUpdated: state.lastUpdated || Date.now() });
    lastSaveError = null;
    setCloudTag('cloud-saved', 'Saved to cloud');
  } catch (e) {
    lastSaveError = e;
    console.warn('Cloud save failed:', e);
    setCloudTag('cloud-error', 'Save failed');
    showToast({
      message: 'Cloud save fail — data browser cache mein safe hai. Retry karo.',
      type: 'error',
      duration: 8000,
      action: { label: 'Retry', onClick: () => doCloudSave() }
    });
  } finally {
    cloudSaveInFlight = false;
    if (cloudSavePending) {
      cloudSavePending = false;
      scheduleCloudSave();
    }
  }
}

async function syncFromCloud() {
  if (!cloudReady || !db || syncInProgress) return;
  syncInProgress = true;
  setCloudTag('cloud-sync', 'Loading from cloud…');

  try {
    const res = await loadFromCloud(currentSyncId);

    if (!res.ok) {
      cloudLoadFailed = true;
      setCloudTag('cloud-error', 'Load failed');
      showToast({ message: 'Cloud load fail — save rok diya data safe rakhne ke liye.', type: 'error', duration: 8000 });
      return;
    }

    cloudLoadFailed = false;
    const remote = (res.exists && res.data) ? normalizeState(res.data) : null;
    const localHas = state.tasks && Object.keys(state.tasks).length;

    if (!remote) {
      if (localHas) scheduleCloudSave();
      else setCloudTag('cloud-saved', 'In sync');
      return;
    }

    if (!localHas) {
      state = remote;
      saveLocal();
      render();
      setCloudTag('cloud-saved', 'Loaded from cloud');
      showToast({ message: 'Cloud se Navya progress load ho gayi.', type: 'success', duration: 3000 });
      return;
    }

    const merged = normalizeState(null);
    merged.tasks = {};

    const a = state.tasks || {};
    const b = remote.tasks || {};

    new Set([...Object.keys(a), ...Object.keys(b)]).forEach(key => {
      if (a[key] === true || b[key] === true) merged.tasks[key] = true;
    });

    merged.settings = Object.assign({}, remote.settings, state.settings);
    state = merged;

    saveLocal();
    render();
    setCloudTag('cloud-saving', 'Merged — saving');
    scheduleCloudSave();
    showToast({ message: 'Local + cloud data merge ho gaya.', type: 'info', duration: 4000 });
  } finally {
    syncInProgress = false;
  }
}

/* ============ EVENTS ============ */
function wireEvents() {
  if ($('startDate')) {
    $('startDate').addEventListener('change', () => {
      state.settings.startDate = $('startDate').value;
      save();
      render();
    });
  }

  if ($('selectedDate')) $('selectedDate').addEventListener('change', render);

  if ($('schoolMode')) {
    $('schoolMode').addEventListener('change', () => {
      state.settings.schoolMode = $('schoolMode').value;
      save();
      render();
    });
  }

  if ($('intensity')) {
    $('intensity').addEventListener('change', () => {
      state.settings.intensity = $('intensity').value;
      save();
      render();
    });
  }

  if ($('todayBtn')) {
    $('todayBtn').addEventListener('click', () => {
      if ($('selectedDate')) $('selectedDate').value = iso(new Date());
      render();
    });
  }

  if ($('markAllBtn')) {
    $('markAllBtn').addEventListener('click', async () => {
      const sel = ($('selectedDate') && $('selectedDate').value) || iso(new Date());
      const start = ($('startDate') && $('startDate').value) || '2026-10-18';
      const dayNum = Math.floor((dateOf(sel) - dateOf(start)) / DAY) + 1;
      if (dayNum < 1 || dayNum > 50) return;

      const tasks = buildDayTasks(sel, dayNum).filter(t => t.kind === 'study');
      if (!tasks.length) return;

      const ok = await confirmAction({
        title: 'Sab study tasks complete mark karo?',
        message: `${fmt(sel)} ke saare study blocks done ho jayenge.`,
        details: [`${tasks.length} tasks`, 'Undo 15s'],
        confirmText: 'Haan',
        danger: false
      });

      if (!ok) return;

      const snap = snapshot();
      tasks.forEach(t => setTaskDone(sel, t, true));
      render();
      offerUndo(snap, 'Marked done. Undo?');
    });
  }

  if ($('clearDayBtn')) {
    $('clearDayBtn').addEventListener('click', async () => {
      const sel = ($('selectedDate') && $('selectedDate').value) || iso(new Date());
      const start = ($('startDate') && $('startDate').value) || '2026-10-18';
      const dayNum = Math.floor((dateOf(sel) - dateOf(start)) / DAY) + 1;
      if (dayNum < 1 || dayNum > 50) return;

      const tasks = buildDayTasks(sel, dayNum);
      const count = tasks.filter(t => isTaskDone(sel, t)).length;

      if (!count) {
        showToast({ message: 'Koi tick nahi hai.', type: 'info' });
        return;
      }

      const ok = await confirmAction({
        title: 'Selected day clear karo?',
        message: `${count} ticks hat jayenge.`,
        details: ['Undo 15s'],
        confirmText: 'Clear',
        danger: true
      });

      if (!ok) return;

      const snap = snapshot();
      tasks.forEach(t => setTaskDone(sel, t, false));
      render();
      offerUndo(snap, 'Cleared. Undo?');
    });
  }

  if ($('resetAllBtn')) {
    $('resetAllBtn').addEventListener('click', async () => {
      const count = Object.keys(state.tasks).length;
      if (!count) {
        showToast({ message: 'Kuch reset karne ko nahi.', type: 'info' });
        return;
      }

      const ok = await confirmAction({
        title: 'Sab progress reset?',
        message: 'Saare ticks clear ho jayenge. Settings safe.',
        details: [`${count} ticks delete`, 'Undo 15s'],
        confirmText: 'Reset',
        danger: true
      });

      if (!ok) return;

      const snap = snapshot();
      state.tasks = {};
      save();
      render();
      offerUndo(snap, 'Reset done. Undo?');
    });
  }

  if ($('copySyncBtn')) {
    $('copySyncBtn').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(currentSyncId);
        showToast({ message: 'Navya Sync ID copied!', type: 'success', duration: 4000 });
      } catch (e) {
        const inp = $('syncIdView');
        if (inp) {
          inp.select();
          try {
            document.execCommand('copy');
            showToast({ message: 'Copied!', type: 'success' });
          } catch (e2) {
            showToast({ message: 'Copy fail — manually select karke copy karo.', type: 'error' });
          }
        }
      }
    });
  }

  if ($('restoreBtn')) {
    $('restoreBtn').addEventListener('click', async () => {
      const newId = (($('syncIdInput') && $('syncIdInput').value) || '').trim().toLowerCase();

      if (!/^stu-[a-z0-9]{6,20}$/.test(newId)) {
        showToast({ message: 'Invalid ID — example: stu-abc12345', type: 'error' });
        return;
      }

      if (newId === currentSyncId) {
        showToast({ message: 'Ye current ID hai.', type: 'info' });
        return;
      }

      if (!cloudReady || !db) {
        showToast({ message: 'Firebase available nahi. Internet check karo.', type: 'error' });
        return;
      }

      const ok = await confirmAction({
        title: 'Restore from this ID?',
        message: 'Current Navya progress replace hogi. Pehle current ID copy karo.',
        details: [`Current: ${currentSyncId}`, `New: ${newId}`],
        confirmText: 'Restore',
        danger: true
      });

      if (!ok) return;

      setCloudTag('cloud-sync', 'Restoring…');
      const res = await loadFromCloud(newId);

      if (!res.ok) {
        setCloudTag('cloud-error', 'Restore failed');
        showToast({ message: 'Restore fail — network issue. Retry karo.', type: 'error' });
        return;
      }

      if (!res.exists) {
        setCloudTag('cloud-saved', 'No data at ID');
        showToast({ message: 'Us ID par koi Navya data nahi mila.', type: 'warning' });
        return;
      }

      currentSyncId = newId;
      localStorage.setItem(SYNC_KEY, newId);
      state = normalizeState(res.data);
      saveLocal();

      if ($('syncIdView')) $('syncIdView').value = currentSyncId;
      if ($('syncIdInput')) $('syncIdInput').value = '';

      cloudLoadFailed = false;
      render();
      setCloudTag('cloud-saved', 'Restored');
      showToast({ message: 'Navya progress restore ho gayi!', type: 'success', duration: 4000 });
    });
  }
}

/* ============ INIT ============ */
async function init() {
  if ($('selectedDate')) $('selectedDate').value = iso(new Date());

  try {
    const raw = localStorage.getItem(STORE);
    if (raw) state = normalizeState(JSON.parse(raw));
  } catch (e) {}

  if (state.settings.startDate && $('startDate')) $('startDate').value = state.settings.startDate;
  if (state.settings.schoolMode && $('schoolMode')) $('schoolMode').value = state.settings.schoolMode;
  if (state.settings.intensity && $('intensity')) $('intensity').value = state.settings.intensity;

  currentSyncId = getOrCreateSyncId();
  if ($('syncIdView')) $('syncIdView').value = currentSyncId;

  wireEvents();
  render();
  setInterval(() => { renderNow(); }, 30000);

  if (initFirebase()) {
    await syncFromCloud();
  } else {
    setCloudTag('cloud-off', 'Cloud off');
    showToast({ message: 'Firebase connect nahi hua — internet check karo. Data browser mein safe hai.', type: 'warning', duration: 8000 });
  }
}

init();

})();
