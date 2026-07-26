import { UserRole } from '../types';

const API_BASE = 'http://localhost:5000/api/v1';

// Mock Data Store for instant UI fallback testing
export const MOCK_USER_ROLE_CREDENTIALS: Record<UserRole, { email: string; name: string }> = {
  SUPER_ADMIN: { email: 'superadmin@sms.edu', name: 'Alexander Vance' },
  SCHOOL_ADMIN: { email: 'admin@sms.edu', name: 'Sarah Jenkins' },
  PRINCIPAL: { email: 'principal@sms.edu', name: 'Dr. Robert Langdon' },
  VICE_PRINCIPAL: { email: 'viceprincipal@sms.edu', name: 'Elena Rostova' },
  ACCOUNTANT: { email: 'accountant@sms.edu', name: 'Marcus Goldman' },
  TEACHER: { email: 'teacher@sms.edu', name: 'Emily Watson' },
  LIBRARIAN: { email: 'librarian@sms.edu', name: 'Arthur Pendelton' },
  RECEPTIONIST: { email: 'receptionist@sms.edu', name: 'Clara Oswald' },
  STUDENT: { email: 'student@sms.edu', name: 'Ethan Hunt' },
  PARENT: { email: 'parent@sms.edu', name: 'Jonathan Hunt' },
};

export const MOCK_STUDENTS = [
  {
    id: 's1',
    userId: 'u-stu-1',
    studentIdCode: 'STU-2025-001',
    admissionNo: 'ADM-10045',
    rollNo: '1001',
    gender: 'MALE',
    dob: '2010-04-12',
    bloodGroup: 'O+',
    nationality: 'American',
    house: 'Gryffindor',
    status: 'ACTIVE',
    user: { id: 'u1', firstName: 'Ethan', lastName: 'Hunt', email: 'student@sms.edu', phone: '+1 555-0192' },
    class: { name: 'Grade 10', code: 'G10' },
    section: { name: 'Section A' },
    allergies: 'Peanuts',
    medicalNotes: 'Asthma inhaler in backpack',
    emergencyContact: '+1 555-999-8888',
  },
  {
    id: 's2',
    userId: 'u-stu-2',
    studentIdCode: 'STU-2025-002',
    admissionNo: 'ADM-10046',
    rollNo: '1002',
    gender: 'FEMALE',
    dob: '2010-08-22',
    bloodGroup: 'A+',
    nationality: 'American',
    house: 'Ravenclaw',
    status: 'ACTIVE',
    user: { id: 'u2', firstName: 'Sophia', lastName: 'Miller', email: 'sophia@sms.edu', phone: '+1 555-0193' },
    class: { name: 'Grade 10', code: 'G10' },
    section: { name: 'Section A' },
    allergies: 'None',
    medicalNotes: 'None',
    emergencyContact: '+1 555-888-7777',
  },
  {
    id: 's3',
    userId: 'u-stu-3',
    studentIdCode: 'STU-2025-003',
    admissionNo: 'ADM-10047',
    rollNo: '1003',
    gender: 'MALE',
    dob: '2009-11-05',
    bloodGroup: 'B+',
    nationality: 'American',
    house: 'Slytherin',
    status: 'ACTIVE',
    user: { id: 'u3', firstName: 'Lucas', lastName: 'Davis', email: 'lucas@sms.edu', phone: '+1 555-0194' },
    class: { name: 'Grade 11', code: 'G11' },
    section: { name: 'Section B' },
    allergies: 'Penicillin',
    medicalNotes: 'Wears glasses',
    emergencyContact: '+1 555-777-6666',
  },
];

export const MOCK_TEACHERS = [
  {
    id: 't1',
    employeeId: 'EMP-2025-001',
    qualification: 'M.Sc. Mathematics',
    experienceYrs: 8,
    salary: 65000,
    department: 'Mathematics',
    user: { firstName: 'Emily', lastName: 'Watson', email: 'teacher@sms.edu', phone: '+1 555-0111' },
  },
  {
    id: 't2',
    employeeId: 'EMP-2025-002',
    qualification: 'Ph.D. Quantum Physics',
    experienceYrs: 12,
    salary: 78000,
    department: 'Science',
    user: { firstName: 'Prof. David', lastName: 'Sterling', email: 'david@sms.edu', phone: '+1 555-0222' },
  },
];

export const MOCK_INVOICES = [
  {
    id: 'inv1',
    invoiceNo: 'INV-2026-0098',
    studentId: 's1',
    student: MOCK_STUDENTS[0],
    amount: 1200,
    discount: 100,
    netAmount: 1100,
    status: 'UNPAID',
    dueDate: '2026-08-15',
    feeStructure: { feeCategory: { name: 'Quarterly Tuition Fee Q3' } },
  },
  {
    id: 'inv2',
    invoiceNo: 'INV-2026-0099',
    studentId: 's2',
    student: MOCK_STUDENTS[1],
    amount: 1200,
    discount: 0,
    netAmount: 1200,
    status: 'PAID',
    dueDate: '2026-08-15',
    feeStructure: { feeCategory: { name: 'Quarterly Tuition Fee Q3' } },
  },
];

export const MOCK_NOTICES = [
  {
    id: 'n1',
    title: 'Welcome to Academic Year 2025-2026',
    content: 'Orientation ceremony begins next Monday at 9:00 AM in the Auditorium.',
    targetRoles: 'ALL',
    isImportant: true,
    createdAt: '2026-07-26',
    author: { firstName: 'Sarah', lastName: 'Jenkins', role: 'SCHOOL_ADMIN' },
  },
  {
    id: 'n2',
    title: 'Midterm Examination Schedule Released',
    content: 'The detailed midterm datesheet is now published under the Exams section.',
    targetRoles: 'STUDENT,TEACHER,PARENT',
    isImportant: false,
    createdAt: '2026-07-24',
    author: { firstName: 'Dr. Robert', lastName: 'Langdon', role: 'PRINCIPAL' },
  },
];

export async function fetchDashboardData() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback to mock data
  }
  return {
    counters: {
      totalStudents: 1284,
      totalTeachers: 86,
      totalParents: 1120,
      totalClasses: 24,
      totalSubjects: 48,
      attendanceRate: '96.4%',
      totalFeesCollected: 245000,
      totalPendingFees: 32400,
    },
    upcomingExams: [
      { id: 'e1', name: 'Midterm Physics Lab', type: 'PRACTICAL', startDate: '2026-08-10' },
      { id: 'e2', name: 'Mathematics Semester Exam', type: 'MIDTERM', startDate: '2026-08-15' },
    ],
    recentNotices: MOCK_NOTICES,
  };
}
