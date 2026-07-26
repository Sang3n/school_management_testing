import { PrismaClient, UserRoleEnum, Gender, AttendanceStatus, FeeStatus, ExamType, BookStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting SMS database seeding...');

  // 1. Password Hash for all seed accounts
  const passwordHash = await bcrypt.hash('password123', 10);

  // 2. School Settings
  await prisma.schoolSettings.upsert({
    where: { id: '1' },
    update: {},

      motto: 'Empowering Minds, Shaping Futures',
      email: 'contact@horizonacademy.edu',
      phone: '+1 (800) 555-0199',
      address: '100 University Avenue, Boston, MA 02115',
      currency: '$',
      currentYear: '2025-2026',
    },
  });

  // 3. Academic Year
  const academicYear = await prisma.academicYear.upsert({
    where: { year: '2025-2026' },
    update: {},
    create: {
      year: '2025-2026',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2026-06-30'),
      isCurrent: true,
    },
  });

  // 4. Create Users for all 10 Roles
  const rolesData = [
    { email: 'superadmin@sms.edu', username: 'superadmin', role: UserRoleEnum.SUPER_ADMIN, firstName: 'Alexander', lastName: 'Vance' },
    { email: 'admin@sms.edu', username: 'admin', role: UserRoleEnum.SCHOOL_ADMIN, firstName: 'Sarah', lastName: 'Jenkins' },
    { email: 'principal@sms.edu', username: 'principal', role: UserRoleEnum.PRINCIPAL, firstName: 'Dr. Robert', lastName: 'Langdon' },
    { email: 'viceprincipal@sms.edu', username: 'viceprincipal', role: UserRoleEnum.VICE_PRINCIPAL, firstName: 'Elena', lastName: 'Rostova' },
    { email: 'accountant@sms.edu', username: 'accountant', role: UserRoleEnum.ACCOUNTANT, firstName: 'Marcus', lastName: 'Goldman' },
    { email: 'teacher@sms.edu', username: 'teacher', role: UserRoleEnum.TEACHER, firstName: 'Emily', lastName: 'Watson' },
    { email: 'librarian@sms.edu', username: 'librarian', role: UserRoleEnum.LIBRARIAN, firstName: 'Arthur', lastName: 'Pendelton' },
    { email: 'receptionist@sms.edu', username: 'receptionist', role: UserRoleEnum.RECEPTIONIST, firstName: 'Clara', lastName: 'Oswald' },
    { email: 'student@sms.edu', username: 'student', role: UserRoleEnum.STUDENT, firstName: 'Ethan', lastName: 'Hunt' },
    { email: 'parent@sms.edu', username: 'parent', role: UserRoleEnum.PARENT, firstName: 'Jonathan', lastName: 'Hunt' },
  ];

  const createdUsers: Record<string, any> = {};

  for (const user of rolesData) {
    const u = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        username: user.username,
        password: passwordHash,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: '+1 555-010' + Math.floor(Math.random() * 90 + 10),
      },
    });
    createdUsers[user.role] = u;
  }

  // 5. Teacher Profile
  const teacherProfile = await prisma.teacher.upsert({
    where: { userId: createdUsers[UserRoleEnum.TEACHER].id },
    update: {},
    create: {
      userId: createdUsers[UserRoleEnum.TEACHER].id,
      employeeId: 'EMP-2025-001',
      qualification: 'M.Sc. Advanced Mathematics',
      experienceYrs: 8,
      salary: 65000,
      department: 'Mathematics & Science',
    },
  });

  // 6. Parent Profile
  const parentProfile = await prisma.parent.upsert({
    where: { userId: createdUsers[UserRoleEnum.PARENT].id },
    update: {},
    create: {
      userId: createdUsers[UserRoleEnum.PARENT].id,
      occupation: 'Senior Software Engineer',
      address: '742 Evergreen Terrace, Springfield',
    },
  });

  // 7. Classes & Sections
  const grade10 = await prisma.class.create({
    data: {
      name: 'Grade 10',
      code: 'G10',
      academicYearId: academicYear.id,
      classTeacherId: teacherProfile.id,
    },
  });

  const sectionA = await prisma.section.create({
    data: {
      name: 'Section A',
      classId: grade10.id,
      capacity: 35,
    },
  });

  // 8. Student Profile
  const studentProfile = await prisma.student.upsert({
    where: { userId: createdUsers[UserRoleEnum.STUDENT].id },
    update: {},
    create: {
      userId: createdUsers[UserRoleEnum.STUDENT].id,
      studentIdCode: 'STU-2025-001',
      admissionNo: 'ADM-10045',
      rollNo: '1001',
      gender: Gender.MALE,
      dob: new Date('2010-04-12'),
      bloodGroup: 'O+',
      nationality: 'American',
      religion: 'Christianity',
      address: '742 Evergreen Terrace, Springfield',
      academicYearId: academicYear.id,
      classId: grade10.id,
      sectionId: sectionA.id,
      house: 'Gryffindor',
      parentId: parentProfile.id,
      allergies: 'Peanuts',
      medicalNotes: 'Asthma inhaler required during sports',
      emergencyContact: '+1 555-999-8888',
    },
  });

  // 9. Subjects & Class Subjects
  const mathSubject = await prisma.subject.upsert({
    where: { code: 'MATH-10' },
    update: {},
    create: {
      name: 'Mathematics',
      code: 'MATH-10',
      credits: 4,
      isPractical: false,
    },
  });

  const classSubject = await prisma.classSubject.create({
    data: {
      classId: grade10.id,
      subjectId: mathSubject.id,
      teacherId: teacherProfile.id,
    },
  });

  // 10. Sample Attendance
  await prisma.attendanceStudent.create({
    data: {
      studentId: studentProfile.id,
      date: new Date('2026-07-25'),
      status: AttendanceStatus.PRESENT,
      remarks: 'On time',
    },
  });

  // 11. Fee Category & Invoice
  const feeCategory = await prisma.feeCategory.upsert({
    where: { name: 'Tuition Fee - Q3' },
    update: {},
    create: {
      name: 'Tuition Fee - Q3',
      description: 'Quarterly Academic Tuition Fee',
    },
  });

  const feeStructure = await prisma.feeStructure.create({
    data: {
      feeCategoryId: feeCategory.id,
      amount: 1200.0,
      dueDate: new Date('2026-08-15'),
    },
  });

  await prisma.feeInvoice.create({
    data: {
      invoiceNo: 'INV-2026-0098',
      studentId: studentProfile.id,
      feeStructureId: feeStructure.id,
      amount: 1200.0,
      discount: 100.0,
      netAmount: 1100.0,
      status: FeeStatus.UNPAID,
      dueDate: new Date('2026-08-15'),
    },
  });

  // 12. Exam, Schedule & Result
  const exam = await prisma.exam.create({
    data: {
      name: 'Midterm Examination 2026',
      type: ExamType.MIDTERM,
      startDate: new Date('2026-10-10'),
      endDate: new Date('2026-10-20'),
      description: 'First Semester Midterm Exams',
    },
  });

  const examSchedule = await prisma.examSchedule.create({
    data: {
      examId: exam.id,
      classSubjectId: classSubject.id,
      examDate: new Date('2026-10-12'),
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      roomNo: 'Hall 3B',
      maxMarks: 100,
      passMarks: 40,
    },
  });

  await prisma.examResult.create({
    data: {
      examScheduleId: examSchedule.id,
      studentId: studentProfile.id,
      marksObtained: 92.5,
      grade: 'A+',
      gpa: 4.0,
      remarks: 'Outstanding performance',
    },
  });

  // 13. Library Book
  const bookCategory = await prisma.bookCategory.upsert({
    where: { name: 'Science & Fiction' },
    update: {},
    create: { name: 'Science & Fiction' },
  });

  await prisma.book.upsert({
    where: { isbn: '978-0131103627' },
    update: {},
    create: {
      title: 'The C Programming Language',
      isbn: '978-0131103627',
      author: 'Brian W. Kernighan, Dennis M. Ritchie',
      publisher: 'Prentice Hall',
      copies: 5,
      categoryId: bookCategory.id,
      status: BookStatus.AVAILABLE,
    },
  });

  // 14. Notices
  await prisma.notice.create({
    data: {
      title: 'Welcome to Academic Year 2025-2026',
      content: 'We are delighted to welcome all students, parents, and faculty members to the new academic term. Orientation starts on Sept 1st.',
      targetRoles: 'ALL',
      authorId: createdUsers[UserRoleEnum.SCHOOL_ADMIN].id,
      isImportant: true,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('🔑 All accounts created with default password: "password123"');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
