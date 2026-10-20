(() => {
'use strict';
const $ = id => document.getElementById(id);
const DAY = 86400000;
const STORE = 'cbse-commerce-50day-v3';
const SYNC_KEY = 'cbse-commerce-sync-id';

/* ============ CURRICULUM ============ */
const CURRICULUM = {
acc: {
  pf: ['Partnership — Fundamentals', [
    ['Partnership deed & features','Read NCERT theory. Note 5 clauses of deed, why it matters. Make 1-page summary.',30],
    ['Profit Sharing Ratio: concept','Understand PSR. Calculate simple ratios. Difference from sacrificing ratio.',30],
    ['P&L Appropriation A/c format','Learn format thoroughly. Difference from P&L A/c. Draw from memory.',40],
    ['Interest on Capital','Opening vs closing capital. Drawings treatment. 2 numericals.',40],
    ['Interest on Drawings','Simple, average period, product method. 3 numericals.',45],
    ['Salary & commission to partners','Fixed salary entries. Commission: % of profit before/after charging.',35],
    ['Past adjustments (table trick)','Table method. Reversal entries. 2 questions.',50],
    ['Guarantee of profit','Minimum guarantee. Deficiency borne by guarantor. 2 problems.',40],
    ['Practice: 5 full P&L App sums','Time-bound, no solution peeking. Check against answer key.',60],
    ['Chapter test — Fundamentals','45 min, 20 marks. Black Book all errors.',45],
  ]],
  gw: ['Goodwill Valuation', [
    ['Goodwill — meaning & factors','NCERT theory. 5 factors affecting goodwill.',25],
    ['Average Profit Method','Simple + weighted average. Normal business profit adjustments.',40],
    ['Super Profit Method','Capital employed, normal rate, super profit. 3 questions.',40],
    ['Capitalisation Method','Two approaches: avg profit cap, super profit cap.',40],
    ['Practice mixed numericals','Mix of all methods. 5 questions in 45 min.',50],
    ['Chapter test — Goodwill','20-mark test. Track errors.',40],
  ]],
  psr: ['Change in Profit Sharing Ratio', [
    ['Sacrificing & gaining ratio','Concept + calculation. Who gains, who sacrifices.',30],
    ['Goodwill adjustment','Goodwill raised/written off. Journal entries.',35],
    ['Revaluation of assets/liabilities','Revaluation A/c entries.',40],
    ['Reserves & accumulated profits','Distribution in old ratio.',35],
    ['Capital adjustment','Adjust capitals per new ratio.',30],
    ['Practice: full PSR questions','2 complete questions.',55],
    ['Chapter test — PSR','20-mark test.',40],
  ]],
  adm: ['Admission of a Partner', [
    ['New & sacrificing ratio','Calculate new PSR and sacrificing ratio.',30],
    ['Goodwill — premium in cash','Premium brought in cash. Entries.',35],
    ['Goodwill — revaluation method','Goodwill + revaluation combined.',40],
    ['Hidden goodwill','When premium not specified. Calculate from capital.',35],
    ['Revaluation A/c','Format, entries, P&L on revaluation.',40],
    ['Reserves & accumulated','Treatment of reserves, P&L, workmen compensation.',35],
    ['Capital adjustment','Adjusting capitals in new ratio.',40],
    ['New Balance Sheet','Prepare revised BS after admission.',40],
    ['Practice: full admission','2 complete questions.',60],
    ['Practice: hidden goodwill mix','3 hidden goodwill questions.',50],
    ['Chapter test — Admission','60-min, 30-mark test.',60],
  ]],
  ret: ['Retirement / Death of Partner', [
    ['Gaining ratio & goodwill','Calculate gaining ratio, adjust goodwill.',35],
    ['Revaluation & reserves','Same as admission pattern.',35],
    ['Capital adjustment','Retiring partner settlement.',30],
    ['Death: profit till death','Time basis or turnover basis. Calculate share.',35],
    ['Executor account','Amount due to executor. Interest.',40],
    ['Settlement of amount due','Lump sum vs installment.',40],
    ['Practice: full retirement','2 complete questions.',55],
    ['Practice: death full','2 complete questions.',50],
    ['Chapter test — Retirement/Death','30-mark test.',55],
  ]],
  dis: ['Dissolution of Partnership', [
    ['Realisation A/c format','Types of dissolution. Format of Realisation A/c.',35],
    ['Assets & liabilities treatment','Entries for assets/liabilities disposal.',40],
    ['Partner loan & capital accounts','Treatment of partner loans, final settlement.',35],
    ['Unrecorded assets/liabilities','Entries for unrecorded items.',35],
    ['Practice: full dissolution','2 complete questions.',50],
    ['Chapter test — Dissolution','20-mark test.',45],
  ]],
  shc: ['Accounting for Share Capital', [
    ['Share capital basics','Types of shares. Terminology: authorised, issued, subscribed, paid-up.',30],
    ['Issue at par','Full journal entries. Calls in arrears.',35],
    ['Issue at premium','Entries at premium. Securities premium.',30],
    ['Pro-rata allotment (master table)','The table trick. Learn it cold.',50],
    ['Excess application adjustment','Adjust excess against allotment/calls.',35],
    ['Calls in arrears & advance','Treatment + interest.',30],
    ['Forfeiture (3 entries)','The 3-entry sequence. Learn by heart.',45],
    ['Reissue of forfeited shares','Reissue entries. Discount treatment.',40],
    ['Capital reserve calculation','Formula + practice.',30],
    ['Practice: full share capital','2 complete questions.',60],
    ['Chapter test — Share Capital','30-mark test.',50],
  ]],
  deb: ['Issue of Debentures', [
    ['Debenture basics','Types, terminology. Difference from shares.',25],
    ['Issue at par & premium','Journal entries.',35],
    ['Issue at discount & write-off','Discount write-off entries.',30],
    ['Collateral security','Treatment + entries.',35],
    ['Terms of redemption','DRR, DRI. Entries.',35],
    ['Interest on debentures','Accrued, TDS, entries.',30],
    ['Practice: full debentures','2 complete questions.',50],
  ]],
  cfs: ['Company Financial Statements', [
    ['Balance Sheet format (Sch III)','Learn Schedule III format. Classification.',35],
    ['Statement of P&L','Schedule III P&L format.',35],
    ['Classification practice','Classify 20 items correctly.',30],
    ['Practice + revision','Full BS + P&L preparation.',30],
  ]],
  rat: ['Accounting Ratios', [
    ['Ratio basics & classification','Liquidity, solvency, activity, profitability.',25],
    ['Liquidity ratios','Current, quick, cash. 3 numericals.',40],
    ['Solvency ratios','Debt-equity, total assets to debt, proprietary.',40],
    ['Activity ratios','Inventory, receivables, working capital turnover.',40],
    ['Profitability ratios','Gross, net, operating profit. 3 numericals.',40],
    ['Impact on ratios','What increases/decreases each ratio. Table.',45],
    ['Practice: full ratio questions','2 complete questions.',55],
    ['Chapter test — Ratios','30-mark test.',45],
  ]],
  cf: ['Cash Flow Statement', [
    ['Cash flow overview','Classification: operating/investing/financing.',30],
    ['Operating — indirect method','Start from net profit. Adjustments.',45],
    ['Non-cash & non-operating adj','Depreciation, interest, tax.',40],
    ['Working capital changes','Current assets/liabilities changes.',40],
    ['Investing activities','Purchase/sale of assets, investments.',35],
    ['Financing activities','Shares, debentures, loans, dividends.',35],
    ['Full cash flow statement','Prepare complete statement.',55],
    ['Practice: full cash flow','2 complete questions.',60],
    ['Chapter test — Cash Flow','30-mark test.',50],
  ]],
},
eco: {
  ni1: ['National Income I', [
    ['Basic concepts: final/intermediate','Definitions, examples. Stock vs flow.',30],
    ['Circular flow (2-sector)','Diagram + explanation.',30],
    ['Depreciation & net/gross','NDP vs GDP. Numericals.',35],
  ]],
  ni2: ['National Income II', [
    ['GDP/GNP/NDP/NNP','All aggregates. Market price vs factor cost.',35],
    ['Real vs nominal GDP','Deflator, calculation.',30],
    ['Domestic vs national','NFIA adjustment.',30],
  ]],
  ni3: ['National Income Numericals', [
    ['Value-added method','Practice 3 numericals.',40],
    ['Income method','Practice 3 numericals.',40],
    ['Expenditure method','Practice 3 numericals + double counting.',40],
  ]],
  mab: ['Money & Banking', [
    ['Functions of money','Primary, secondary, contingent.',30],
    ['Money supply (M1-M4)','Measures, credit creation.',35],
    ['Commercial banks','Credit creation process. 1 numerical.',40],
    ['RBI & monetary tools','Repo, CRR, SLR, OMO.',35],
  ]],
  ie1: ['Income & Employment I', [
    ['Aggregate demand & consumption','AD, consumption function.',35],
    ['Saving function','APS, MPS, relationship.',30],
    ['APC/MPC/APS/MPS numericals','Practice 3 numericals.',35],
  ]],
  ie2: ['Income & Employment II', [
    ['Equilibrium income','Y = C+I. Calculate equilibrium.',40],
    ['Multiplier','Investment multiplier. Numericals.',35],
    ['Excess/deficient demand','Correction measures.',30],
  ]],
  gb: ['Government Budget', [
    ['Revenue/capital receipts','Classification with examples.',35],
    ['Revenue/capital expenditure','Classification.',30],
    ['Deficits','Revenue, fiscal, primary. Numericals.',35],
  ]],
  bop: ['Balance of Payments', [
    ['Current & capital account','Components.',30],
    ['Autonomous/accommodating','Difference.',30],
    ['Exchange rate basics','Fixed vs flexible.',30],
  ]],
  ie90: ['Indian Economy 1947-90', [
    ['Independence-era economy','State of economy at independence.',30],
    ['Planning goals','Goals + achievements/failures.',30],
    ['Agriculture/industry/trade','Key features.',30],
  ]],
  ref: ['Reforms since 1991', [
    ['LPG reforms','Liberalisation, privatisation, globalisation.',35],
    ['Rationale & features','Why reforms were needed.',30],
    ['Effects','Positive + negative.',30],
  ]],
  hc: ['Human Capital & Rural Dev', [
    ['Education & health','Human capital formation.',30],
    ['Rural credit & marketing','Sources, issues.',30],
    ['Organic farming','Benefits, challenges.',30],
  ]],
  emp: ['Employment & Sustainable Dev', [
    ['Employment types','Formal/informal, organised/unorganised.',30],
    ['Unemployment','Types, causes.',30],
    ['Environment & sustainability','Concepts, strategies.',30],
  ]],
  inf: ['Infrastructure/Poverty', [
    ['Infrastructure','Energy, health.',30],
    ['Poverty concepts','Absolute/relative, measures.',30],
  ]],
  comp: ['India & Neighbours', [
    ['India vs China vs Pakistan','Demographic, sectoral, HDI.',35],
    ['Development indicators','Compare + analyse.',30],
  ]],
},
bst: {
  mgmt: ['Nature of Management', [
    ['Concept & characteristics','Definition, characteristics.',30],
    ['Objectives & importance','Organisational/social/personal objectives.',30],
    ['Levels & coordination','Top/middle/lower. Coordination essence.',30],
  ]],
  pom: ['Principles of Management', [
    ['Fayol 14 principles','Learn all 14 with examples.',40],
    ['Taylor scientific mgmt','Techniques, comparison.',35],
    ['Comparison + questions','Fayol vs Taylor.',30],
  ]],
  be: ['Business Environment', [
    ['Features & importance','Meaning, features.',30],
    ['Dimensions','Economic, social, legal, tech, political.',30],
    ['Policy changes','1991 reforms, examples.',30],
  ]],
  plan: ['Planning', [
    ['Features & process','Characteristics, steps.',30],
    ['Importance & limitations','Why plan, why fail.',30],
    ['Types of plans','Standing vs single-use.',30],
  ]],
  org: ['Organising', [
    ['Process & structure','Steps, functional/divisional.',35],
    ['Delegation & decentralisation','Elements, differences.',35],
    ['Questions','3–4 case questions.',30],
  ]],
  staff: ['Staffing', [
    ['HRM process','All 6 steps.',30],
    ['Recruitment vs selection','Internal/external, process.',35],
    ['Training & development','Methods.',30],
  ]],
  dir: ['Directing', [
    ['Supervision & motivation','Meaning, importance. Maslow.',35],
    ['Leadership','Styles, qualities.',30],
    ['Communication','Process, barriers.',30],
  ]],
  ctrl: ['Controlling', [
    ['Process & importance','Steps, why.',30],
    ['Planning-controlling link','Relationship.',25],
    ['Limitations','Limits, resistance.',25],
  ]],
  fm: ['Financial Management', [
    ['3 decisions','Investment, financing, dividend.',35],
    ['Capital structure','Factors affecting.',30],
    ['Dividend decisions','Factors.',30],
  ]],
  fmkts: ['Financial Markets', [
    ['Money vs capital market','Difference, instruments.',30],
    ['Primary & secondary','Functions.',30],
    ['SEBI & stock exchange','Roles, functions.',35],
  ]],
  mktg: ['Marketing Management', [
    ['Philosophies & functions','5 concepts.',30],
    ['Marketing mix (4Ps)','Product, price, place, promotion.',40],
    ['Branding/packaging','Concepts, benefits.',30],
  ]],
  cp: ['Consumer Protection', [
    ['Rights & responsibilities','6 rights.',30],
    ['Redressal machinery','3-tier.',30],
    ['Reliefs & organisations','Remedies, NGOs.',30],
  ]],
},
eng: {
  rc: ['Reading Comprehension', [
    ['Unseen passage practice','Timed. Inference + vocabulary questions.',30],
    ['Note-making','Format + 1 practice passage.',25],
  ]],
  wr: ['Writing Skills', [
    ['Notice & invitation','Format + 2 samples.',30],
    ['Letters','Formal/informal formats.',30],
    ['Article/report','Format + 1 each.',30],
  ]],
  ll: ['The Last Lesson', [
    ['Theme & characters','Read + annotate. 5 short answers.',30],
    ['Long answers','1 long answer practice.',25],
  ]],
  ls: ['Lost Spring', [
    ['Saheb & Mukesh','Character analysis.',30],
    ['Themes','Poverty, child labour. 5 short answers.',30],
  ]],
  dw: ['Deep Water', [
    ['Fear & determination','Read + annotate.',30],
    ['Central idea + long answer','1 long answer.',25],
  ]],
  rr: ['The Rattrap', [
    ['Symbolism & character change','Read + annotate.',30],
    ['Theme + title significance','5 short answers.',25],
  ]],
  ind: ['Indigo', [
    ['Gandhi & Champaran','Read + annotate.',30],
    ['Leadership theme','Long answer + 5 short.',30],
  ]],
  pp: ['Poets & Pancakes', [
    ['Satire & studio life','Read + annotate.',30],
    ['Narrator + theme','5 short answers.',25],
  ]],
  intv: ['The Interview', [
    ['Interview debate','Read + annotate.',30],
    ['Umberto Eco','Short answers.',25],
  ]],
  gp: ['Going Places', [
    ['Sophie: dreams vs reality','Read + annotate.',30],
    ['Character analysis','5 short + 1 long.',30],
  ]],
  mm: ['My Mother at Sixty-Six', [
    ['Theme & imagery','Read + annotate.',25],
    ['Poetic devices','List + explain.',25],
  ]],
  kq: ['Keeping Quiet', [
    ['Stillness & introspection','Read + annotate.',25],
    ['Imagery + central idea','Short answers.',25],
  ]],
  tob: ['A Thing of Beauty', [
    ['Beauty & hope','Read + annotate.',25],
    ['Poetic devices','List + explain.',25],
  ]],
  rss: ['A Roadside Stand', [
    ['Rural-urban divide','Read + annotate.',30],
    ['Tone + exploitation','Short answers.',25],
  ]],
  ajt: ['Aunt Jennifer’s Tigers', [
    ['Symbolism & patriarchy','Read + annotate.',25],
    ['Contrast + devices','Short answers.',25],
  ]],
  vst: ['Vistas (prescribed set)', [
    ['The Third Level','Theme + 5 short answers.',30],
    ['The Tiger King','Satire + 5 short answers.',30],
    ['Journey to End of Earth','Theme + short answers.',30],
    ['The Enemy','Character + theme.',30],
    ['On the Face of It','Theme + short answers.',30],
    ['Memories of Childhood','Compare + theme.',30],
  ]],
},
pe: {
  se: ['Management of Sporting Events', [
    ['Committees & fixtures','Knockout vs league. Draw fixtures.',35],
    ['Intramural/extramural','Meaning, objectives.',30],
  ]],
  cwsn: ['Children & Women in Sports', [
    ['Exercise guidelines','Postural deformities. Corrective asanas.',35],
    ['Women in sports','Issues, initiatives.',30],
  ]],
  yoga: ['Yoga as Preventive', [
    ['Lifestyle diseases','Diabetes, hypertension, obesity. Asanas.',35],
    ['Asana procedure + benefits','5 asanas detailed.',30],
  ]],
  dis: ['CWSN (Divyang)', [
    ['Disability etiquette','Types, inclusion.',30],
    ['Organisations','Special Olympics, Paralympics.',25],
  ]],
  nut: ['Sports & Nutrition', [
    ['Balanced diet','Macro/micro. Plate diagram.',35],
    ['Weight control & eating disorders','BMI. Anorexia, bulimia.',30],
  ]],
  tmm: ['Test & Measurement', [
    ['Fitness tests','AAHPER, Kraus-Weber.',35],
    ['BMI, somatotypes','Calculations, categories.',30],
  ]],
  phy: ['Physiology & Injuries', [
    ['Effects of exercise','Acute + chronic.',35],
    ['Sports injuries','Prevention, first aid.',30],
  ]],
  bio: ['Biomechanics', [
    ['Newton’s laws','Applications in sports.',35],
    ['Levers & projectile','Types, examples.',30],
  ]],
  psy: ['Psychology & Sports', [
    ['Personality & motivation','Types, theories.',35],
    ['Aggression & cohesion','Types, strategies.',30],
  ]],
  trn: ['Training in Sports', [
    ['Strength/endurance/speed','Methods for each.',35],
    ['Flexibility + talent ID','Methods, identification.',30],
  ]],
},
};

/* ============ 50-DAY PLAN ============ */
const NEW_DAYS = [
/* 1 */ {acc:'pf:0-2', eco:'ni1:0', bst:'mgmt:0', eng:'ll:0', pe:'se:0'},
/* 2 */ {acc:'pf:3-5', eco:'ni1:1', bst:'mgmt:1', eng:'ll:1', pe:'se:1'},
/* 3 */ {acc:'pf:6-8', eco:'ni1:2', bst:'mgmt:2', eng:'ls:0', pe:'cwsn:0'},
/* 4 */ {acc:'pf:9,gw:0-1', eco:'ni2:0', bst:'pom:0', eng:'ls:1', pe:'cwsn:1'},
/* 5 */ {acc:'gw:2-5', eco:'ni2:1', bst:'pom:1', eng:'dw:0', pe:'yoga:0'},
/* 6 */ {acc:'psr:0-3', eco:'ni2:2', bst:'pom:2', eng:'dw:1', pe:'yoga:1'},
/* 7 */ {acc:'psr:4-6', eco:'ni3:0', bst:'be:0', eng:'rr:0', pe:'dis:0'},
/* 8 */ {acc:'adm:0-2', eco:'ni3:1', bst:'be:1', eng:'rr:1', pe:'dis:1'},
/* 9 */ {acc:'adm:3-5', eco:'ni3:2', bst:'be:2', eng:'ind:0', pe:'nut:0'},
/*10 */ {acc:'adm:6-8', eco:'mab:0', bst:'plan:0', eng:'ind:1', pe:'nut:1'},
/*11 */ {acc:'adm:9-10', eco:'mab:1', bst:'plan:1', eng:'pp:0', pe:'tmm:0'},
/*12 */ {acc:'ret:0-2', eco:'mab:2', bst:'plan:2', eng:'pp:1', pe:'tmm:1'},
/*13 */ {acc:'ret:3-5', eco:'mab:3', bst:'org:0', eng:'intv:0', pe:'phy:0'},
/*14 */ {acc:'ret:6-8', eco:'ie1:0', bst:'org:1', eng:'intv:1', pe:'phy:1'},
/*15 */ {acc:'dis:0-2', eco:'ie1:1', bst:'org:2', eng:'gp:0', pe:'bio:0'},
/*16 */ {acc:'dis:3-5', eco:'ie1:2', bst:'staff:0', eng:'gp:1', pe:'bio:1'},
/*17 */ {acc:'shc:0-2', eco:'ie2:0', bst:'staff:1', eng:'mm:0', pe:'psy:0'},
/*18 */ {acc:'shc:3-5', eco:'ie2:1', bst:'staff:2', eng:'mm:1', pe:'psy:1'},
/*19 */ {acc:'shc:6-8', eco:'ie2:2', bst:'dir:0', eng:'kq:0', pe:'trn:0'},
/*20 */ {acc:'shc:9-10', eco:'gb:0', bst:'dir:1', eng:'kq:1', pe:'trn:1'},
/*21 */ {acc:'deb:0-2', eco:'gb:1', bst:'dir:2', eng:'tob:0', pe:'se:0'},
/*22 */ {acc:'deb:3-5', eco:'gb:2', bst:'ctrl:0', eng:'tob:1', pe:'cwsn:0'},
/*23 */ {acc:'deb:6,cfs:0-1', eco:'bop:0', bst:'ctrl:1', eng:'rss:0', pe:'yoga:0'},
/*24 */ {acc:'cfs:2-3,rat:0', eco:'bop:1', bst:'ctrl:2', eng:'rss:1', pe:'dis:0'},
/*25 */ {acc:'rat:1-3', eco:'bop:2', bst:'fm:0', eng:'ajt:0', pe:'nut:0'},
/*26 */ {acc:'rat:4-6', eco:'ie90:0', bst:'fm:1', eng:'ajt:1', pe:'tmm:0'},
/*27 */ {acc:'rat:7,cf:0-1', eco:'ie90:1', bst:'fm:2', eng:'vst:0', pe:'phy:0'},
/*28 */ {acc:'cf:2-4', eco:'ie90:2', bst:'fmkts:0', eng:'rc:0', pe:'bio:0'},
/*29 */ {acc:'cf:5-7', eco:'ref:0', bst:'fmkts:1', eng:'wr:0', pe:'psy:0'},
/*30 */ {acc:'cf:8', eco:'ref:1', bst:'fmkts:2', eng:'wr:1', pe:'trn:1'},
];

const REV_PLAN = {
31: [['Revise Partnership Fundamentals + 5 PYQs',90],['Revise National Income I+II + 3 numericals',60],['Revise Management basics + Fayol',45]],
32: [['Revise Goodwill + 3 numericals',60],['Revise NI numericals + Money & Banking',60],['Revise Business Environment + Planning',45]],
33: [['Revise PSR + Admission + 3 full questions',90],['Revise Income & Employment + Budget',60],['Revise Organising + Staffing',45]],
34: [['Revise Retirement/Death + 3 full questions',90],['Revise BoP + Indian Economy 1947-90',60],['Revise Directing + Controlling',45]],
35: [['Revise Dissolution + Share Capital (forfeiture) + 3 questions',90],['Revise Reforms + Human Capital',60],['Revise Financial Mgmt + Markets',45]],
36: [['Revise Debentures + Ratios + Cash Flow (formats only)',90],['Revise rest Eco chapters',60],['Revise Marketing + Consumer Protection',45]],
37: [['PYQ: Partnership (all types) — 2 full papers',120],['PYQ: Macro numericals — 5 sums',60],['PYQ: English writing formats',45]],
38: [['PYQ: Admission + Retirement — 2 full',120],['PYQ: Indian Economy long answers',60],['PYQ: PE Unit 1–3',45]],
39: [['PYQ: Share Capital + Debentures — 2 full',120],['PYQ: Micro/macro mix',60],['PYQ: Vistas long answers',45]],
40: [['PYQ: Ratios + Cash Flow — 2 full',120],['PYQ: Eco full section',60],['PYQ: BST case studies',45]],
41: [['PYQ: Complete 2019 + 2020 papers',180],['PYQ: Complete 2019 Eco paper',90],['PYQ: 2019 English paper',60]],
42: [['PYQ: Complete 2021 + 2022 papers',180],['PYQ: Complete 2021 Eco paper',90],['PYQ: 2021 English paper',60]],
43: [['Mock: Full Accountancy (3 hr)',180],['Mock: Eco (3 hr) — alternate days',0],['Error log review',45]],
44: [['Mock: Full Accountancy (3 hr)',180],['Mock: BST (3 hr)',180],['Error log review',45]],
45: [['Mock: Full Accountancy (3 hr)',180],['Mock: English (3 hr)',180],['Error log review',45]],
46: [['Mock: Full Accountancy (3 hr)',180],['Mock: PE (2 hr)',120],['Error log review',45]],
47: [['Mock: Full Accountancy (3 hr)',180],['Mock: Eco (3 hr)',180],['Error log review',45]],
48: [['Mock: Full Accountancy (3 hr)',180],['Mock: BST (3 hr)',180],['Error log review',45]],
49: [['Accountancy weakest 3 topics — repair',120],['Eco formula sheet',45],['BST keywords all chapters',45]],
50: [['Accountancy final weak-area revision',120],['All subjects: 1-page recall',60],['Set Jan–Feb mock plan',30]],
};

/* ============ HELPERS ============ */
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const dateOf = s => { const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d,12); };
const dayName = d => ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
const fmt = s => dateOf(s).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
const minutes = s => { const [h,m]=s.split(':').map(Number); return h*60+m; };
const hm = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
const pretty = s => { const [h,m]=s.split(':').map(Number); return new Date(2000,0,1,h,m).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true}); };
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function parseRange(str) {
  if (!str) return [];
  const out = [];
  str.split(',').forEach(part => {
    const [ch, range] = part.split(':');
    if (range.includes('-')) {
      const [s,e] = range.split('-').map(Number);
      for (let i=s; i<=e; i++) out.push(`${ch}:${i}`);
    } else {
      out.push(`${ch}:${range}`);
    }
  });
  return out;
}

/* ============ STATE ============ */
let state = normalizeState(null);
function normalizeState(s) {
  s = s || {};
  return {
    topics: (s.topics && typeof s.topics === 'object') ? s.topics : {},
    revs: (s.revs && typeof s.revs === 'object') ? s.revs : {},
    ticks: (s.ticks && typeof s.ticks === 'object') ? s.ticks : {},
    settings: (s.settings && typeof s.settings === 'object') ? s.settings : {},
    lastUpdated: typeof s.lastUpdated === 'number' ? s.lastUpdated : 0
  };
}
function saveLocal() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch(e){} }
function save() { state.lastUpdated = Date.now(); saveLocal(); scheduleCloudSave(); }

/* ============ SYLLABUS HELPERS ============ */
function getChapterByTopicId(combinedId) {
  // combinedId = 'acc-pf:0'
  const parts = combinedId.split('-');
  const sub = parts[0];
  const rest = parts.slice(1).join('-').split(':');
  const ch = rest[0]; const idx = Number(rest[1]);
  const chapter = CURRICULUM[sub] && CURRICULUM[sub][ch];
  if (!chapter) return null;
  return { sub, ch, idx, chapter, topic: chapter[1][idx], chapterName: chapter[0], chapterId: `${sub}-${ch}` };
}
function makeTopicId(combinedId) { return combinedId.replace(':', '-'); }
function chapterTopics(sub, ch) { return CURRICULUM[sub][ch][1].map((_, i) => `${sub}-${ch}:${i}`); }
function isTopicDone(topicId) { return !!state.topics[topicId]; }
function chapterProgress(sub, ch) {
  const ids = chapterTopics(sub, ch);
  const done = ids.filter(isTopicDone).length;
  return { done, total: ids.length, complete: done === ids.length && ids.length > 0 };
}
function dayPlanFor(dayNum) {
  if (dayNum < 1 || dayNum > 50) return null;
  if (dayNum <= 30) {
    const raw = NEW_DAYS[dayNum - 1];
    const out = {};
    Object.keys(raw).forEach(sub => {
      out[sub] = parseRange(raw[sub]).map(x => makeTopicId(`${sub}:${x}`));
    });
    return out;
  }
  return null;
}
function revTasksFor(dayNum) { return REV_PLAN[dayNum] || null; }
function todayDayNum() {
  const start = $('startDate').value || '2026-10-18';
  return Math.floor((dateOf(iso(new Date())) - dateOf(start)) / DAY) + 1;
}

/* ============ SCHEDULE BUILDER ============ */
function buildDayTasks(dateStr, dayNum) {
  const d = dateOf(dateStr);
  const dow = d.getDay();
  const school = $('schoolMode').value;
  const holiday = school !== 'attend';
  const tasks = [];

  if (holiday) {
    tasks.push({kind:'routine', subject:'Routine', title:'Breakfast + setup', desc:'Fresh ho jao, desk set karo.', start:'08:30', end:'09:00', type:'routine'});
  } else {
    tasks.push({kind:'routine', subject:'School', title:'School + commute', desc:'Notes + homework track karo.', start:'07:00', end:'14:00', type:'school'});
    tasks.push({kind:'routine', subject:'Break', title:'Lunch + rest', desc:'Freshen up, lunch, rest.', start:'14:00', end:'15:30', type:'break'});
  }

  let t = holiday ? minutes('09:00') : minutes('15:30');
  const plan = dayPlanFor(dayNum);

  if (plan) {
    const order = ['acc','eco','bst','eng','pe'];
    order.forEach(sub => {
      const topicIds = plan[sub] || [];
      if (!topicIds.length) return;
      topicIds.forEach((tid, i) => {
        const info = getChapterByTopicId(tid);
        if (!info) return;
        const mins = info.topic[2] || 30;
        let endMin = t + mins;
        if (endMin > 21*60) endMin = Math.min(endMin, 21*60);
        tasks.push({
          kind:'topic',
          subject: info.sub === 'acc' ? 'Accountancy' : info.sub === 'eco' ? 'Economics' : info.sub === 'bst' ? 'Business Studies' : info.sub === 'eng' ? 'English Core' : 'Physical Education',
          title: info.chapterName.split(' — ')[0].split('(')[0].trim() + ' — ' + info.topic[0],
          desc: info.topic[1],
          start: hm(t), end: hm(endMin), topicId: tid, type:'study'
        });
        t = endMin + 5;
        if (sub === 'acc' && i === topicIds.length - 1 && t < 21*60 - 30) {
          tasks.push({kind:'routine', subject:'Break', title:'Short break', desc:'Stretch, water, eyes rest.', start: hm(t), end: hm(t+10), type:'break'});
          t += 15;
        }
      });
    });
  } else {
    const rev = revTasksFor(dayNum);
    if (rev) {
      rev.forEach((r, i) => {
        if (!r[1]) return;
        let endMin = t + r[1];
        if (endMin > 21*60) endMin = 21*60;
        tasks.push({
          kind:'rev', subject:'Revision', title: r[0], desc: 'Focus, time-bound. Black Book mistakes.',
          start: hm(t), end: hm(endMin), revIdx: i, type:'revision'
        });
        t = endMin + 10;
      });
    }
  }

  // Tabla class schedule (handled independently of school holidays)
  const tablaHoliday = ($('tablaMode') && $('tablaMode').value === 'holiday') || (state.settings && state.settings.tablaMode === 'holiday');
  const tuition = (!tablaHoliday && (dow === 2 || dow === 4)) ? {start:'17:15', end:'19:00', title:'Class 5:15–7:00 PM'} :
                 (!tablaHoliday && dow === 3) ? {start:'19:15', end:'21:00', title:'Class 7:15–9:00 PM'} :
                 (!tablaHoliday && dow === 5) ? {start:'19:00', end:'21:00', title:'Class 7:00–9:00 PM'} : null;
  if (tuition) {
    tasks.push({kind:'routine', subject:'Tuition', title: tuition.title, desc:'Class attend karo. Doubts star karo.', start: tuition.start, end: tuition.end, type:'class'});
  }

  if (plan) {
    if (!holiday) {
      tasks.push({kind:'routine', subject:'Dinner + rest', title:'Dinner / relax', desc:'9 PM sleep routine maintain.', start:'19:00', end:'20:00', type:'break'});
    } else {
      tasks.push({kind:'routine', subject:'Plan tomorrow', title:'Wrap-up', desc:'Tick tracker update, kal ki books ready.', start:'17:00', end:'17:15', type:'routine'});
    }
  }

  return tasks.sort((a,b) => minutes(a.start) - minutes(b.start));
}

/* ============ TASK TICK KEY ============ */
function taskKey(dateStr, task) {
  if (task.kind === 'topic') return `d:${dateStr}:${task.topicId}`;
  if (task.kind === 'rev') return `r:${dateStr}:${task.revIdx}`;
  return `x:${dateStr}:${task.start}:${task.title}`;
}
function isTaskDone(dateStr, task) {
  if (task.kind === 'topic') return isTopicDone(task.topicId);
  if (task.kind === 'rev') return !!state.revs[taskKey(dateStr, task)];
  return !!state.ticks[taskKey(dateStr, task)];
}
function setTaskDone(dateStr, task, val) {
  if (task.kind === 'topic') {
    if (val) state.topics[task.topicId] = true; else delete state.topics[task.topicId];
  } else if (task.kind === 'rev') {
    if (val) state.revs[taskKey(dateStr, task)] = true; else delete state.revs[taskKey(dateStr, task)];
  } else {
    if (val) state.ticks[taskKey(dateStr, task)] = true; else delete state.ticks[taskKey(dateStr, task)];
  }
  save();
}

/* ============ SMART DIRECTION ============ */
function smartNext() {
  const today = iso(new Date());
  const todayNum = todayDayNum();

  if (todayNum >= 1 && todayNum <= 50) {
    const todayTasks = buildDayTasks(today, todayNum);
    const nowMin = new Date().getHours()*60 + new Date().getMinutes();
    const current = todayTasks.find(t => nowMin >= minutes(t.start) && nowMin < minutes(t.end) && !isTaskDone(today, t));
    if (current) return { type:'current', date: today, dayNum: todayNum, task: current };
    const nextPending = todayTasks.find(t => !isTaskDone(today, t));
    if (nextPending) return { type:'next-today', date: today, dayNum: todayNum, task: nextPending };
  }

  const startStr = $('startDate').value || '2026-10-18';
  const startD = dateOf(startStr);
  for (let i = 0; i < Math.min(todayNum - 1, 50); i++) {
    const d = new Date(startD.getTime());
    d.setDate(d.getDate() + i);
    const ds = iso(d);
    const dayNum = i + 1;
    const plan = dayPlanFor(dayNum);
    if (!plan) continue;
    for (const sub of Object.keys(plan)) {
      for (const tid of plan[sub]) {
        if (!isTopicDone(tid)) {
          const info = getChapterByTopicId(tid);
          return { type:'backlog', date: ds, dayNum, task: {
            kind:'topic', topicId: tid, title: info.topic[0],
            desc: info.topic[1], chapterName: info.chapterName,
            start:'—', end:'—'
          }};
        }
      }
    }
  }

  if (todayNum + 1 <= 50) {
    const d = new Date(dateOf(today).getTime() + DAY);
    const ds = iso(d);
    const plan = dayPlanFor(todayNum + 1);
    if (plan) {
      for (const sub of Object.keys(plan)) {
        if (plan[sub].length) {
          const info = getChapterByTopicId(plan[sub][0]);
          return { type:'tomorrow', date: ds, dayNum: todayNum + 1, task: {
            kind:'topic', topicId: plan[sub][0], title: info.topic[0],
            desc: info.topic[1], chapterName: info.chapterName, start:'—', end:'—'
          }};
        }
      }
    }
  }
  return { type:'done', message:'50 days complete! Full revision mode.' };
}

/* ============ RENDER: NOW PANEL ============ */
function renderNow() {
  const n = smartNext();
  const curTitle = $('currentTitle');
  const curDesc = $('currentDesc');
  const nextT = $('nextTitle');
  const nextD = $('nextDesc');
  const clock = $('clock');
  const now = new Date();
  clock.textContent = `Device time: ${now.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true})} · Day ${Math.max(1,Math.min(50,todayDayNum()))} of 50`;

  if (n.type === 'current' || n.type === 'next-today') {
    const prefix = n.type === 'current' ? '▶ NOW: ' : '▶ NEXT (today): ';
    curTitle.textContent = prefix + (n.task.title || 'Task');
    curDesc.textContent = (n.task.chapterName ? n.task.chapterName + ' · ' : '') + (n.task.desc || '') + ' · ' + n.task.start + '–' + n.task.end;
    const todayTasks = buildDayTasks(iso(new Date()), todayDayNum());
    const after = todayTasks.find(t => !isTaskDone(iso(new Date()), t) && t !== n.task && minutes(t.start) >= minutes(n.task.start));
    nextT.textContent = after ? after.title : '—';
    nextD.textContent = after ? after.desc : 'Aaj ke baaki blocks dekhne ke liye niche scroll karo.';
  } else if (n.type === 'backlog') {
    curTitle.textContent = '⚠ BACKLOG: ' + n.task.title;
    curDesc.textContent = `${n.task.chapterName} · Day ${n.dayNum} (${fmt(n.date)}) ka pending topic. Pehle ise finish karo.`;
    nextT.textContent = 'Phir: aaj ka plan';
    nextD.textContent = 'Backlog clear hone ke baad today\'s plan continue karo.';
  } else if (n.type === 'tomorrow') {
    curTitle.textContent = '✓ Aaj ke study blocks done';
    curDesc.textContent = '9 PM se pehle sleep routine. Kal ka pehla topic:';
    nextT.textContent = n.task.title;
    nextD.textContent = n.task.chapterName + ' — ' + n.task.desc;
  } else {
    curTitle.textContent = '🎉 50 days complete!';
    curDesc.textContent = 'Full revision mode — weak areas + mocks.';
    nextT.textContent = '—';
    nextD.textContent = '—';
  }
}

/* ============ RENDER: DAY ============ */
function render() {
  const sel = $('selectedDate').value || iso(new Date());
  const dayNum = (() => {
    const start = $('startDate').value || '2026-10-18';
    return Math.floor((dateOf(sel) - dateOf(start)) / DAY) + 1;
  })();

  $('dateStat').textContent = fmt(sel);
  $('todayHeading').textContent = `${fmt(sel)} — Day ${Math.max(1,Math.min(50,dayNum))} / 50`;
  $('dayStat').textContent = dayNum >= 1 && dayNum <= 50 ? `${dayNum}/50` : dayNum < 1 ? 'Before' : 'Done';

  const tasks = (dayNum >= 1 && dayNum <= 50) ? buildDayTasks(sel, dayNum) : [];
  const studyTasks = tasks.filter(t => t.kind === 'topic' || t.kind === 'rev');
  const doneCount = studyTasks.filter(t => isTaskDone(sel, t)).length;
  $('dayProgress').textContent = `${doneCount} / ${studyTasks.length} study blocks done`;

  const subs = [...new Set(studyTasks.map(t => t.subject))];
  $('subjectChips').innerHTML = subs.map(s => `<span class="chip">${esc(s)}</span>`).join('');

  const host = $('taskList');
  host.innerHTML = '';
  tasks.forEach(task => {
    const done = isTaskDone(sel, task);
    const el = document.createElement('div');
    el.className = 'task' + (done ? ' done' : '') + (task.kind === 'topic' ? ' topic-task' : '');
    el.dataset.subject = subjectCode(task.subject);
    const timeStr = pretty(task.start) + '<small>' + pretty(task.end) + '</small>';
    el.innerHTML =
      `<input type="checkbox" ${done ? 'checked' : ''}>` +
      `<div class="time">${timeStr}</div>` +
      `<div class="taskbody"><div class="tasktitle">${esc(task.title)}</div>` +
      `<div class="desc">${esc(task.desc || '')}</div></div>`;
    el.querySelector('input').addEventListener('change', e => {
      setTaskDone(sel, task, e.target.checked);
      el.classList.toggle('done', e.target.checked);
      render();
      renderNow();
    });
    host.appendChild(el);
  });

  const it = chosenIntensity(dateOf(sel).getDay());
  $('intensityTag').textContent = it;
  $('intensityTag').className = 'tag ' + it.toLowerCase();
  $('daySummary').textContent = `Day ${Math.max(1,Math.min(50,dayNum))} · ${tasks.length} blocks · ${studyTasks.length} study`;

  renderRoadmap();
  renderStats();
  renderChecklists();
  renderNow();
}

/* ============ RENDER: ROADMAP ============ */
function renderRoadmap() {
  const host = $('roadmap');
  host.innerHTML = '';
  const startStr = $('startDate').value || '2026-10-18';
  const startD = dateOf(startStr);
  const sel = $('selectedDate').value;

  for (let i = 0; i < 50; i++) {
    const d = new Date(startD.getTime());
    d.setDate(d.getDate() + i);
    const ds = iso(d);
    const dayNum = i + 1;
    const tasks = buildDayTasks(ds, dayNum);
    const study = tasks.filter(t => t.kind === 'topic' || t.kind === 'rev');
    const done = study.filter(t => isTaskDone(ds, t)).length;
    const complete = study.length > 0 && done === study.length;

    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'roadmap-item' + (ds === sel ? ' selected' : '') + (complete ? ' complete' : '');
    b.innerHTML =
      `<div class="rmhead"><strong>Day ${dayNum} · ${dayName(d)}</strong>` +
      `<span class="rmprog">${done}/${study.length}</span></div>` +
      `<div class="small muted">${fmt(ds)}</div>`;
    b.onclick = () => { $('selectedDate').value = ds; render(); };
    host.appendChild(b);
  }
}

/* ============ RENDER: CHECKLISTS ============ */
function renderChecklists() {
  const groups = [
    ['accChecklist','accCount','acc'],
    ['ecoChecklist','ecoCount','eco'],
    ['bstChecklist','bstCount','bst'],
    ['engChecklist','engCount','eng'],
    ['peChecklist','peCount','pe'],
  ];
  groups.forEach(([hostId, countId, sub]) => {
    const host = $(hostId);
    if (!host) return;
    host.innerHTML = '';
    let totalDone = 0, totalAll = 0;

    Object.keys(CURRICULUM[sub]).forEach(ch => {
      const chapter = CURRICULUM[sub][ch];
      const prog = chapterProgress(sub, ch);
      totalDone += prog.done; totalAll += prog.total;

      const wrap = document.createElement('details');
      wrap.className = 'chapter-wrap';
      wrap.style.cssText = 'border:1px solid var(--line);border-radius:12px;padding:10px;background:#0a1526;margin-bottom:8px';
      const summary = document.createElement('summary');
      summary.style.cssText = 'cursor:pointer;font-weight:800;display:flex;justify-content:space-between;gap:10px;align-items:center';
      summary.innerHTML = `<span>${prog.complete ? '✓ ' : ''}${esc(chapter[0])}</span><span class="count">${prog.done}/${prog.total}</span>`;
      wrap.appendChild(summary);

      const inner = document.createElement('div');
      inner.style.cssText = 'margin-top:8px;display:grid;gap:6px';
      chapter[1].forEach((topic, i) => {
        const tid = `${sub}-${ch}:${i}`;
        const done = isTopicDone(tid);
        const row = document.createElement('label');
        row.style.cssText = `display:flex;gap:8px;align-items:flex-start;padding:8px;border-radius:8px;background:${done ? '#0d1a30' : '#0c1525'};cursor:pointer;opacity:${done ? .6 : 1}`;
        row.innerHTML = `<input type="checkbox" ${done ? 'checked' : ''} style="margin-top:3px;accent-color:var(--green)">` +
          `<div><div style="font-weight:700;font-size:13.5px;${done ? 'text-decoration:line-through' : ''}">${esc(topic[0])}</div>` +
          `<div style="color:var(--muted);font-size:12px;margin-top:2px">${esc(topic[1])} · ${topic[2]} min</div></div>`;
        row.querySelector('input').addEventListener('change', e => {
          if (e.target.checked) state.topics[tid] = true; else delete state.topics[tid];
          save();
          render();
        });
        inner.appendChild(row);
      });
      wrap.appendChild(inner);
      host.appendChild(wrap);
    });

    const countEl = $(countId);
    if (countEl) countEl.textContent = `${totalDone}/${totalAll}`;
  });
}

/* ============ STATS ============ */
function renderStats() {
  let total = 0, done = 0;
  ['acc','eco','bst','eng','pe'].forEach(sub => {
    Object.keys(CURRICULUM[sub]).forEach(ch => {
      const ids = chapterTopics(sub, ch);
      total += ids.length;
      done += ids.filter(isTopicDone).length;
    });
  });
  for (let d = 31; d <= 50; d++) {
    const rev = revTasksFor(d);
    if (rev) { total += rev.length; done += rev.filter((_,i) => state.revs[`r:${d}:${i}`]).length; }
  }
  $('doneStat').textContent = done;
  $('totalStat').textContent = `${total} topics tracked`;
  const pct = Math.min(100, Math.round(done / Math.max(1,total) * 100));
  $('progressStat').textContent = pct + '%';
  $('progressBar').style.width = pct + '%';

  const todayNum = todayDayNum();
  let backlog = 0;
  for (let d = 1; d < Math.min(todayNum, 50); d++) {
    const plan = dayPlanFor(d);
    if (!plan) continue;
    for (const sub of Object.keys(plan)) for (const tid of plan[sub]) if (!isTopicDone(tid)) backlog++;
  }
  $('statusStat').textContent = backlog ? `${backlog} pending` : 'On track';
}

/* ============ SUBJECT COLORS ============ */
const SUBJECT_CODE = {
  'Accountancy':'acc','Economics':'eco','Business Studies':'bst',
  'English Core':'eng','Physical Education':'pe',
  'Revision':'rev','Tuition':'class','School':'routine','Break':'routine',
  'Routine':'routine','Dinner + rest':'routine','Plan tomorrow':'routine',
};
function subjectCode(s) { return SUBJECT_CODE[s] || 'routine'; }
function chosenIntensity(dow) {
  const v = $('intensity').value;
  if (v !== 'auto') return v.toUpperCase();
  if (dow === 0) return 'FLEX';
  if (dow === 1 || dow === 3 || dow === 6) return 'HEAVY';
  if (dow === 2 || dow === 4) return 'LIGHT';
  return 'MEDIUM';
}

/* ============ TOASTS ============ */
function showToast({message, type='info', duration=4000, action=null}) {
  const host = $('toasts'); if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast toast-' + type;
  const span = document.createElement('span'); span.textContent = message; el.appendChild(span);
  if (action) {
    const btn = document.createElement('button'); btn.className='toast-action'; btn.type='button'; btn.textContent = action.label;
    btn.onclick = () => { try { action.onClick(); } finally { dismiss(); } };
    el.appendChild(btn);
  }
  const close = document.createElement('button'); close.className='toast-close'; close.type='button'; close.setAttribute('aria-label','Close'); close.innerHTML='×';
  close.onclick = () => dismiss();
  el.appendChild(close);
  host.appendChild(el);
  let dismissed = false, timer = null;
  function dismiss() { if (dismissed) return; dismissed = true; if (timer) clearTimeout(timer); el.classList.add('toast-out'); setTimeout(() => el.remove(), 300); }
  if (duration > 0) timer = setTimeout(dismiss, duration);
  return { dismiss };
}

/* ============ CONFIRM MODAL ============ */
let modalBusy = false;
function confirmAction({title, message, details=[], confirmText='Confirm', danger=true}) {
  return new Promise(resolve => {
    if (modalBusy) { resolve(false); return; }
    modalBusy = true;
    const backdrop = $('modalBackdrop'); const titleEl = $('modalTitle'); const msgEl = $('modalMsg');
    const detailsEl = $('modalDetails'); const okBtn = $('modalOk'); const cancelBtn = $('modalCancel');
    titleEl.textContent = title; msgEl.textContent = message || '';
    detailsEl.innerHTML = details.map(d => `<li>${esc(d)}</li>`).join('');
    okBtn.textContent = confirmText; okBtn.className = 'btn ' + (danger ? 'danger' : 'primary');
    function cleanup(result) {
      backdrop.hidden = true; document.body.classList.remove('modal-open');
      okBtn.removeEventListener('click', onOk); cancelBtn.removeEventListener('click', onCancel);
      backdrop.removeEventListener('click', onBackdrop); document.removeEventListener('keydown', onKey);
      modalBusy = false; resolve(result);
    }
    function onOk() { cleanup(true); } function onCancel() { cleanup(false); }
    function onBackdrop(e) { if (e.target === backdrop) cleanup(false); }
    function onKey(e) { if (e.key === 'Escape') cleanup(false); }
    okBtn.addEventListener('click', onOk); cancelBtn.addEventListener('click', onCancel);
    backdrop.addEventListener('click', onBackdrop); document.addEventListener('keydown', onKey);
    backdrop.hidden = false; document.body.classList.add('modal-open');
    setTimeout(() => okBtn.focus(), 40);
  });
}

function snapshot() { return JSON.parse(JSON.stringify({topics: state.topics, revs: state.revs, ticks: state.ticks})); }
function offerUndo(snap, msg) {
  showToast({ message: msg, type:'info', duration:15000, action: { label:'Undo', onClick: () => {
    state.topics = snap.topics; state.revs = snap.revs; state.ticks = snap.ticks;
    save(); render();
    showToast({message:'Restore ho gaya.', type:'success', duration:2500});
  }}});
}

/* ============ FIREBASE (COMPAT SDK) ============ */
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
let db = null, cloudReady = false, cloudSaveTimer = null, cloudSaveInFlight = false, cloudSavePending = false;
let cloudLoadFailed = false, syncInProgress = false, currentSyncId = '', lastSaveError = null;

function setCloudTag(cls, text) { const el = $('cloudTag'); if (el) { el.className = 'tag ' + cls; el.textContent = text; } }

function initFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      setCloudTag('cloud-off','Firebase SDK load nahi hua');
      return false;
    }
    if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    cloudReady = true;
    setCloudTag('cloud-sync','Sync ready');
    return true;
  } catch (e) {
    console.warn('Firebase init error:', e);
    setCloudTag('cloud-off','Cloud off');
    return false;
  }
}

function getOrCreateSyncId() {
  let id = localStorage.getItem(SYNC_KEY);
  if (!id || !/^stu-[a-z0-9]{6,20}$/i.test(id)) {
    id = 'stu-' + Math.random().toString(36).slice(2,10);
    localStorage.setItem(SYNC_KEY, id);
    showToast({message:`Naya Sync ID banaya: ${id}`, type:'info', duration:6000});
  }
  return id.toLowerCase();
}

function cloudRef(id) { return db.ref('planner/' + id); }
function loadFromCloud(id) {
  if (!db) return Promise.resolve({ok:false, error:new Error('DB not init')});
  return cloudRef(id).once('value').then(s => ({ok:true, exists: !!s.exists(), data: s.val()})).catch(e => ({ok:false, error:e}));
}
function pushToCloud(payload) {
  if (!db) return Promise.reject(new Error('DB not init'));
  return cloudRef(currentSyncId).set(payload);
}

function scheduleCloudSave() {
  if (!cloudReady || !db) return;
  if (cloudLoadFailed) { setCloudTag('cloud-error','Cloud not synced'); return; }
  if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
  setCloudTag('cloud-saving','Saving…');
  cloudSaveTimer = setTimeout(() => { cloudSaveTimer = null; doCloudSave(); }, 500);
}

async function doCloudSave() {
  if (!cloudReady || !db || cloudLoadFailed) return;
  if (cloudSaveInFlight) { cloudSavePending = true; return; }
  cloudSaveInFlight = true;
  setCloudTag('cloud-saving','Saving…');
  try {
    await pushToCloud({...state, lastUpdated: state.lastUpdated || Date.now()});
    lastSaveError = null;
    setCloudTag('cloud-saved','Saved to cloud');
  } catch (e) {
    lastSaveError = e;
    console.warn('Cloud save failed:', e);
    setCloudTag('cloud-error','Save failed');
    showToast({message:'Cloud save fail — data browser cache mein safe hai. Retry karo.', type:'error', duration:8000,
      action: {label:'Retry', onClick: () => doCloudSave()}});
  } finally {
    cloudSaveInFlight = false;
    if (cloudSavePending) { cloudSavePending = false; scheduleCloudSave(); }
  }
}

async function syncFromCloud() {
  if (!cloudReady || !db || syncInProgress) return;
  syncInProgress = true;
  setCloudTag('cloud-sync','Loading from cloud…');
  try {
    const res = await loadFromCloud(currentSyncId);
    if (!res.ok) {
      cloudLoadFailed = true;
      setCloudTag('cloud-error','Load failed');
      showToast({message:'Cloud load fail — save rok diya data safe rakhne ke liye.', type:'error', duration:8000});
      return;
    }
    cloudLoadFailed = false;
    const remote = (res.exists && res.data) ? normalizeState(res.data) : null;
    const localHas = state.topics && Object.keys(state.topics).length;

    if (!remote) {
      if (localHas) scheduleCloudSave();
      else setCloudTag('cloud-saved','In sync');
      return;
    }
    if (!localHas) {
      state = remote;
      saveLocal();
      render();
      setCloudTag('cloud-saved','Loaded from cloud');
      showToast({message:'Cloud se progress load ho gayi.', type:'success', duration:3000});
      return;
    }
    // Merge: true wins
    const merged = normalizeState(null);
    ['topics','revs','ticks'].forEach(k => {
      merged[k] = {};
      const a = state[k]||{}, b = remote[k]||{};
      new Set([...Object.keys(a),...Object.keys(b)]).forEach(key => {
        if (a[key]===true || b[key]===true) merged[k][key] = true;
      });
    });
    merged.settings = Object.assign({}, remote.settings, state.settings);
    state = merged;
    saveLocal();
    render();
    setCloudTag('cloud-saving','Merged — saving');
    scheduleCloudSave();
    showToast({message:'Local + cloud data merge ho gaya.', type:'info', duration:4000});
  } finally {
    syncInProgress = false;
  }
}

/* ============ EVENTS ============ */
function wireEvents() {
  $('startDate').addEventListener('change', () => { state.settings.startDate = $('startDate').value; save(); render(); });
  $('selectedDate').addEventListener('change', render);
  $('schoolMode').addEventListener('change', () => { state.settings.schoolMode = $('schoolMode').value; save(); render(); });
  $('intensity').addEventListener('change', () => { state.settings.intensity = $('intensity').value; save(); render(); });
  $('todayBtn').addEventListener('click', () => { $('selectedDate').value = iso(new Date()); render(); });

  $('markAllBtn').addEventListener('click', async () => {
    const sel = $('selectedDate').value || iso(new Date());
    const dayNum = Math.floor((dateOf(sel) - dateOf($('startDate').value || '2026-10-18'))/DAY)+1;
    if (dayNum < 1 || dayNum > 50) return;
    const tasks = buildDayTasks(sel, dayNum).filter(t => t.kind === 'topic' || t.kind === 'rev');
    if (!tasks.length) return;
    const ok = await confirmAction({title:'Sab tasks complete mark karo?', message:`${fmt(sel)} ke saare study blocks done ho jayenge.`, details:[`${tasks.length} tasks`, 'Undo 15s'], confirmText:'Haan', danger:false});
    if (!ok) return;
    const snap = snapshot();
    tasks.forEach(t => setTaskDone(sel, t, true));
    render();
    offerUndo(snap, 'Marked done. Undo?');
  });

  $('clearDayBtn').addEventListener('click', async () => {
    const sel = $('selectedDate').value || iso(new Date());
    const dayNum = Math.floor((dateOf(sel) - dateOf($('startDate').value || '2026-10-18'))/DAY)+1;
    if (dayNum < 1 || dayNum > 50) return;
    const tasks = buildDayTasks(sel, dayNum);
    const count = tasks.filter(t => isTaskDone(sel, t)).length;
    if (!count) { showToast({message:'Koi tick nahi hai.', type:'info'}); return; }
    const ok = await confirmAction({title:'Selected day clear karo?', message:`${count} ticks hat jayenge.`, details:['Undo 15s'], confirmText:'Clear', danger:true});
    if (!ok) return;
    const snap = snapshot();
    tasks.forEach(t => setTaskDone(sel, t, false));
    render();
    offerUndo(snap, 'Cleared. Undo?');
  });

  $('resetAllBtn').addEventListener('click', async () => {
    const count = Object.keys(state.topics).length + Object.keys(state.revs).length + Object.keys(state.ticks).length;
    if (!count) { showToast({message:'Kuch reset karne ko nahi.', type:'info'}); return; }
    const ok = await confirmAction({title:'Sab progress reset?', message:'Saare ticks + checklists clear ho jayenge. Settings safe.', details:[`${count} ticks/checks delete`, 'Undo 15s'], confirmText:'Reset', danger:true});
    if (!ok) return;
    const snap = snapshot();
    state.topics = {}; state.revs = {}; state.ticks = {};
    save(); render();
    offerUndo(snap, 'Reset done. Undo?');
  });

  $('copySyncBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentSyncId);
      showToast({message:'Sync ID copied! Doosre device par paste karo.', type:'success', duration:4000});
    } catch(e) {
      const inp = $('syncIdView'); inp.select();
      try { document.execCommand('copy'); showToast({message:'Copied!', type:'success'}); }
      catch(e2) { showToast({message:'Copy fail — manually select karke copy karo.', type:'error'}); }
    }
  });

  $('restoreBtn').addEventListener('click', async () => {
    const newId = ($('syncIdInput').value || '').trim().toLowerCase();
    if (!/^stu-[a-z0-9]{6,20}$/.test(newId)) { showToast({message:'Invalid ID — example: stu-abc12345', type:'error'}); return; }
    if (newId === currentSyncId) { showToast({message:'Ye current ID hai.', type:'info'}); return; }
    if (!cloudReady || !db) { showToast({message:'Firebase available nahi. Internet check karo.', type:'error'}); return; }
    const ok = await confirmAction({title:'Restore from this ID?', message:'Current progress replace hogi. Pehle current ID copy karo.', details:[`Current: ${currentSyncId}`, `New: ${newId}`], confirmText:'Restore', danger:true});
    if (!ok) return;
    setCloudTag('cloud-sync','Restoring…');
    const res = await loadFromCloud(newId);
    if (!res.ok) { setCloudTag('cloud-error','Restore failed'); showToast({message:'Restore fail — network issue. Retry karo.', type:'error'}); return; }
    if (!res.exists) { setCloudTag('cloud-saved','No data at ID'); showToast({message:'Us ID par koi data nahi mila.', type:'warning'}); return; }
    currentSyncId = newId;
    localStorage.setItem(SYNC_KEY, newId);
    state = normalizeState(res.data);
    saveLocal();
    $('syncIdView').value = currentSyncId;
    $('syncIdInput').value = '';
    cloudLoadFailed = false;
    render();
    setCloudTag('cloud-saved','Restored');
    showToast({message:'Progress restore ho gayi!', type:'success', duration:4000});
  });
}

/* ============ INIT ============ */
async function init() {
  $('selectedDate').value = iso(new Date());
  try { const raw = localStorage.getItem(STORE); if (raw) state = normalizeState(JSON.parse(raw)); } catch(e) {}
  if (state.settings.startDate) $('startDate').value = state.settings.startDate;
  if (state.settings.schoolMode) $('schoolMode').value = state.settings.schoolMode;
  if (state.settings.intensity) $('intensity').value = state.settings.intensity;
  currentSyncId = getOrCreateSyncId();
  $('syncIdView').value = currentSyncId;
  wireEvents();
  render();
  setInterval(() => { renderNow(); }, 30000);

  if (initFirebase()) {
    await syncFromCloud();
  } else {
    setCloudTag('cloud-off','Cloud off');
    showToast({message:'Firebase connect nahi hua — internet check karo. Data browser mein safe hai.', type:'warning', duration:8000});
  }
}
init();

})();