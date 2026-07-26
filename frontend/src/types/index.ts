export type UserRole =
  | 'SUPER_ADMIN'
  | 'SCHOOL_ADMIN'
  | 'PRINCIPAL'
  | 'VICE_PRINCIPAL'
  | 'ACCOUNTANT'
  | 'TEACHER'
  | 'LIBRARIAN'
  | 'RECEPTIONIST'
  | 'STUDENT'
  | 'PARENT';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
}

export interface Student {
  id: string;
  userId: string;
  user: User;
  studentIdCode: string;
  admissionNo: string;
  rollNo: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dob: string;
  bloodGroup?: string;
  nationality: string;
  religion?: string;
  address?: string;
  academicYearId: string;
  classId: string;
  sectionId: string;
  class?: { name: string; code: string };
  section?: { name: string };
  house?: string;
  status: string;
  allergies?: string;
  medicalNotes?: string;
  emergencyContact?: string;
  parent?: any;
}

export interface Teacher {
  id: string;
  userId: string;
  user: User;
  employeeId: string;
  qualification: string;
  experienceYrs: number;
  salary: number;
  department?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE' | 'HOLIDAY';
  remarks?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  student?: Student;
  amount: number;
  discount: number;
  netAmount: number;
  status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'OVERDUE';
  dueDate: string;
  feeStructure?: { feeCategory: { name: string } };
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  targetRoles: string;
  isImportant: boolean;
  createdAt: string;
  author?: { firstName: string; lastName: string; role?: string };
}
