// One-off generator for realistic mock data. Run with: node scripts/generate-mock-data.mjs
// Output is committed as static JSON — the app itself never re-runs this.
import { writeFileSync } from 'node:fs';

const EMPLOYEES = [
  { name: 'Aditi Rao', role: 'Frontend Engineer', department: 'Engineering', color: '#0E7C86' },
  { name: 'Karan Mehta', role: 'Backend Engineer', department: 'Engineering', color: '#2457C5' },
  { name: 'Rhea Kapoor', role: 'Engineering Manager', department: 'Engineering', color: '#7C3A9C' },
  { name: 'Vivek Nair', role: 'QA Engineer', department: 'Engineering', color: '#B5541A' },
  { name: 'Sana Sheikh', role: 'DevOps Engineer', department: 'Engineering', color: '#157F4A' },
  { name: 'Rohan Iyer', role: 'Full Stack Engineer', department: 'Engineering', color: '#0E7C86' },
  { name: 'Meera Pillai', role: 'Product Designer', department: 'Design', color: '#7C3A9C' },
  { name: 'Arjun Desai', role: 'UX Researcher', department: 'Design', color: '#2457C5' },
  { name: 'Ishita Bose', role: 'Visual Designer', department: 'Design', color: '#B5541A' },
  { name: 'Farhan Ali', role: 'Design Lead', department: 'Design', color: '#157F4A' },
  { name: 'Neha Joshi', role: 'Account Executive', department: 'Sales', color: '#0E7C86' },
  { name: 'Sameer Khanna', role: 'Sales Development Rep', department: 'Sales', color: '#2457C5' },
  { name: 'Divya Menon', role: 'Regional Sales Manager', department: 'Sales', color: '#7C3A9C' },
  { name: 'Tarun Bhatia', role: 'Customer Success Manager', department: 'Sales', color: '#B5541A' },
  { name: 'Priya Shah', role: 'HR Business Partner', department: 'People Ops', color: '#157F4A' },
  { name: 'Ananya Gupta', role: 'Talent Acquisition Lead', department: 'People Ops', color: '#0E7C86' },
  { name: 'Nikhil Verma', role: 'People Ops Manager', department: 'People Ops', color: '#2457C5' },
  { name: 'Zoya Ahmed', role: 'Payroll Specialist', department: 'People Ops', color: '#7C3A9C' },
];

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

function slug(name, i) {
  return `emp-${String(i + 1).padStart(2, '0')}`;
}

const employees = EMPLOYEES.map((e, i) => ({
  id: slug(e.name, i),
  name: e.name,
  initials: initials(e.name),
  avatarColor: e.color,
  role: e.role,
  department: e.department,
  email: `${e.name.toLowerCase().replace(/\s+/g, '.')}@nimbus.io`,
  phone: `+91 9${String(800000000 + i * 37129).slice(0, 9)}`,
  location: ['Bengaluru', 'Mumbai', 'Pune', 'Remote'][i % 4],
  joinedOn: `202${2 + (i % 4)}-0${1 + (i % 9)}-1${i % 9}`,
  status: i === 4 || i === 11 ? 'on-leave' : i === 17 ? 'inactive' : 'active',
}));

// Logged in user = emp-01 (Aditi Rao)
const CURRENT_USER_ID = 'emp-01';

// --- Attendance: last 30 days, weekdays only, for every employee ---
const attendance = [];
const today = new Date();
for (let d = 29; d >= 0; d--) {
  const date = new Date(today);
  date.setDate(today.getDate() - d);
  const day = date.getDay();
  if (day === 0 || day === 6) continue; // skip weekends
  const iso = date.toISOString().slice(0, 10);

  employees.forEach((emp, i) => {
    const seed = (i * 13 + d * 7) % 100;
    let status = 'present';
    if (emp.status === 'on-leave' && d < 5) status = 'leave';
    else if (seed < 6) status = 'absent';
    else if (seed < 14) status = 'wfh';
    else if (seed < 18) status = 'half-day';

    attendance.push({
      employeeId: emp.id,
      date: iso,
      status,
      checkIn: status === 'absent' || status === 'leave' ? undefined : '09:1' + (seed % 5),
      checkOut: status === 'absent' || status === 'leave' ? undefined : '18:0' + (seed % 5),
    });
  });
}

// --- Leave requests ---
const leaveTypes = ['sick', 'casual', 'earned', 'unpaid'];
const leaveReasons = [
  'Fever and body ache, need rest to recover.',
  'Family function out of town, traveling with parents.',
  'Planned vacation with family, booked in advance.',
  'Personal errand that needs to be handled in person.',
  'Recovering from a minor surgery, doctor advised rest.',
  'Moving to a new apartment, need a couple of days.',
  'Attending a family wedding in my hometown.',
  'Not feeling well, seasonal flu going around the office.',
];

const leaves = [];
let leaveId = 1;
[0, 1, 2, 5, 6, 9, 10, 12, 14, 16].forEach((empIdx, i) => {
  const emp = employees[empIdx];
  const startOffset = [-20, -14, -9, -5, -3, 2, 6, 10, 15, 20][i];
  const start = new Date(today);
  start.setDate(today.getDate() + startOffset);
  const end = new Date(start);
  end.setDate(start.getDate() + (i % 3));
  const status = startOffset < -2 ? (i % 4 === 0 ? 'rejected' : 'approved') : i % 3 === 0 ? 'approved' : 'pending';
  const appliedOn = new Date(start);
  appliedOn.setDate(start.getDate() - 4);

  leaves.push({
    id: `lv-${String(leaveId++).padStart(3, '0')}`,
    employeeId: emp.id,
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    type: leaveTypes[i % leaveTypes.length],
    reason: leaveReasons[i % leaveReasons.length],
    status,
    appliedOn: appliedOn.toISOString().slice(0, 10),
  });
});

// --- Announcements (some intentionally long, for the AI summarizer feature) ---
const announcements = [
  {
    id: 'ann-01',
    title: 'Revised Work-From-Home Policy — Effective Next Month',
    body:
      "Following feedback collected from the engagement survey conducted last quarter, People Ops has revised the work-from-home policy for all departments effective the 1st of next month. Employees will now be permitted to work remotely up to three days per week instead of the previous two, provided their manager approves the arrangement in writing and the employee maintains the standard core collaboration hours of 11 AM to 4 PM IST regardless of location. Teams that are client-facing, including Sales and Customer Success, are required to be present in the office on all days their assigned client has an on-site expectation, and this will be communicated separately by respective managers. Additionally, the company will reimburse up to INR 3,000 per month toward internet and electricity costs for employees who work remotely more than 8 days in a given month, and this reimbursement must be claimed through the expense portal with supporting bills by the 5th of the following month. Employees are strongly encouraged to block their remote days on the shared team calendar at least 48 hours in advance so that in-office collaboration and meeting scheduling is not disrupted. Facilities will also be reconfiguring seating on the 3rd floor to a hot-desking model starting the same date, and lockers will be issued to all employees for personal storage. Please direct any questions about this policy to your HR Business Partner.",
    postedBy: 'Priya Shah',
    department: 'People Ops',
    postedOn: daysAgoIso(2),
    priority: 'high',
  },
  {
    id: 'ann-02',
    title: 'Quarterly All-Hands — This Friday at 4 PM',
    body:
      "Join us this Friday at 4 PM IST in the main auditorium (and via the usual video link for remote employees) for the Q2 all-hands meeting. Leadership will walk through quarterly business performance, key product milestones shipped this quarter, and priorities for the upcoming quarter. There will be a live Q&A session at the end, and employees can submit questions in advance through the anonymous form shared on Slack. Light refreshments will be served for those attending in person.",
    postedBy: 'Nikhil Verma',
    department: 'People Ops',
    postedOn: daysAgoIso(1),
    priority: 'high',
  },
  {
    id: 'ann-03',
    title: 'New Health Insurance Enrollment Window Open',
    body:
      "The annual open enrollment window for the group health insurance plan is now open and will remain open until the end of this month. This year, the plan has been upgraded to include coverage for dependent parents in addition to spouse and children, along with an increased sum insured of INR 5 lakh per family floater, up from INR 3 lakh last year. Employees who wish to add or remove dependents, or opt for the enhanced top-up cover, must complete the enrollment form on the HR portal before the deadline, as changes cannot be made outside this window except in the case of a qualifying life event such as marriage or childbirth. A detailed comparison sheet of the old and new plan benefits has been attached to the HR portal announcement for reference, and an optional info session will be held next Wednesday for anyone with questions.",
    postedBy: 'Zoya Ahmed',
    department: 'People Ops',
    postedOn: daysAgoIso(5),
    priority: 'normal',
  },
  {
    id: 'ann-04',
    title: 'Engineering: Staging Environment Maintenance Tonight',
    body:
      "The staging environment will be unavailable tonight between 11 PM and 2 AM IST due to a scheduled database migration. Please ensure any in-progress QA sign-offs are completed before 11 PM. No action needed for production systems.",
    postedBy: 'Sana Sheikh',
    department: 'Engineering',
    postedOn: daysAgoIso(0),
    priority: 'normal',
  },
  {
    id: 'ann-05',
    title: 'Office Wi-Fi Upgrade Completed',
    body:
      "The office Wi-Fi infrastructure upgrade is now complete across all floors, and employees should see meaningfully improved speed and stability in meeting rooms, which were previously the weakest coverage areas. If you continue to experience connectivity issues at your desk, please raise a ticket with IT support so the network team can investigate further.",
    postedBy: 'Karan Mehta',
    department: 'Engineering',
    postedOn: daysAgoIso(6),
    priority: 'normal',
  },
  {
    id: 'ann-06',
    title: 'Welcome New Joiners — July Cohort',
    body:
      "Please join us in welcoming this month's new joiners across Engineering, Design and Sales. Introductions will be shared on the #general Slack channel, and the customary welcome lunch will be organized this Thursday for all new team members and their managers.",
    postedBy: 'Ananya Gupta',
    department: 'People Ops',
    postedOn: daysAgoIso(8),
    priority: 'normal',
  },
];

function daysAgoIso(n) {
  const d = new Date(today);
  d.setDate(today.getDate() - n);
  return d.toISOString().slice(0, 10);
}

writeFileSync(new URL('../src/api/mockData/employees.json', import.meta.url), JSON.stringify(employees, null, 2));
writeFileSync(new URL('../src/api/mockData/attendance.json', import.meta.url), JSON.stringify(attendance, null, 2));
writeFileSync(new URL('../src/api/mockData/leaves.json', import.meta.url), JSON.stringify(leaves, null, 2));
writeFileSync(new URL('../src/api/mockData/announcements.json', import.meta.url), JSON.stringify(announcements, null, 2));
writeFileSync(
  new URL('../src/api/mockData/currentUser.json', import.meta.url),
  JSON.stringify({ id: CURRENT_USER_ID }, null, 2)
);

console.log(`Generated ${employees.length} employees, ${attendance.length} attendance records, ${leaves.length} leave requests, ${announcements.length} announcements.`);
