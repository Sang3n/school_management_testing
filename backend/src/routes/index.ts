import { Router } from 'express';
import { login, getCurrentUser, refreshToken } from '../controllers/authController';
import { getAllStudents, getStudentById, createStudentAdmission } from '../controllers/studentController';
import { getAllTeachers, createTeacher } from '../controllers/teacherController';
import { markStudentAttendance, getAttendanceByClassAndDate } from '../controllers/attendanceController';
import { getAllExams, createExam, enterExamMarks } from '../controllers/examController';
import { getAllInvoices, recordPayment } from '../controllers/feeController';
import { getDashboardStats } from '../controllers/dashboardController';
import { getAllNotices, createNotice } from '../controllers/noticeController';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticateJWT } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/rbac';
import { UserRoleEnum } from '@prisma/client';

const router = Router();

// Public Routes
router.post('/auth/login', login);
router.post('/auth/refresh', refreshToken);

// Protected Routes
router.use(authenticateJWT);

// Auth
router.get('/auth/me', getCurrentUser);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Students
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post(
  '/students/admission',
  authorizeRoles(
    UserRoleEnum.SUPER_ADMIN,
    UserRoleEnum.SCHOOL_ADMIN,
    UserRoleEnum.PRINCIPAL,
    UserRoleEnum.VICE_PRINCIPAL,
    UserRoleEnum.ACCOUNTANT
  ),
  createStudentAdmission
);

// Teachers
router.get('/teachers', getAllTeachers);
router.post(
  '/teachers',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.SCHOOL_ADMIN, UserRoleEnum.PRINCIPAL),
  createTeacher
);

// Attendance
router.get('/attendance/student', getAttendanceByClassAndDate);
router.post(
  '/attendance/student',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.SCHOOL_ADMIN, UserRoleEnum.TEACHER),
  markStudentAttendance
);

// Exams
router.get('/exams', getAllExams);
router.post(
  '/exams',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.SCHOOL_ADMIN, UserRoleEnum.PRINCIPAL, UserRoleEnum.VICE_PRINCIPAL),
  createExam
);
router.post(
  '/exams/marks',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.TEACHER, UserRoleEnum.SCHOOL_ADMIN),
  enterExamMarks
);

// Fees
router.get('/fees/invoices', getAllInvoices);
router.post(
  '/fees/pay',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.SCHOOL_ADMIN, UserRoleEnum.ACCOUNTANT),
  recordPayment
);

// Notices
router.get('/notices', getAllNotices);
router.post(
  '/notices',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.SCHOOL_ADMIN, UserRoleEnum.PRINCIPAL, UserRoleEnum.TEACHER),
  createNotice
);

// Settings
router.get('/settings', getSettings);
router.put(
  '/settings',
  authorizeRoles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.SCHOOL_ADMIN),
  updateSettings
);

export default router;
