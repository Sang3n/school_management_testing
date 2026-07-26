import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient, Gender, UserRoleEnum } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function getAllStudents(req: AuthenticatedRequest, res: Response) {
  try {
    const { search, classId, sectionId, house, page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const whereClause: any = {};

    if (classId) whereClause.classId = String(classId);
    if (sectionId) whereClause.sectionId = String(sectionId);
    if (house) whereClause.house = String(house);

    if (search) {
      whereClause.OR = [
        { studentIdCode: { contains: String(search), mode: 'insensitive' } },
        { admissionNo: { contains: String(search), mode: 'insensitive' } },
        { rollNo: { contains: String(search), mode: 'insensitive' } },
        { user: { firstName: { contains: String(search), mode: 'insensitive' } } },
        { user: { lastName: { contains: String(search), mode: 'insensitive' } } },
        { user: { email: { contains: String(search), mode: 'insensitive' } } },
      ];
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: whereClause,
        include: {
          user: { select: { firstName: true, lastName: true, email: true, phone: true, avatar: true } },
          class: true,
          section: true,
          parent: { include: { user: { select: { firstName: true, lastName: true, phone: true } } } },
        },
        skip,
        take,
        orderBy: { rollNo: 'asc' },
      }),
      prisma.student.count({ where: whereClause }),
    ]);

    return res.json({
      students,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getStudentById(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, avatar: true, createdAt: true } },
        academicYear: true,
        class: true,
        section: true,
        parent: { include: { user: true } },
        attendances: { take: 30, orderBy: { date: 'desc' } },
        examResults: { include: { examSchedule: { include: { classSubject: { include: { subject: true } } } } } },
        feeInvoices: { include: { feeStructure: { include: { feeCategory: true } } } },
        bookIssues: { include: { book: true } },
      },
    });

    if (!student) return res.status(404).json({ error: 'Student profile not found' });

    return res.json({ student });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createStudentAdmission(req: AuthenticatedRequest, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      dob,
      bloodGroup,
      nationality,
      religion,
      address,
      classId,
      sectionId,
      academicYearId,
      house,
      allergies,
      medicalNotes,
      emergencyContact,
    } = req.body;

    if (!firstName || !lastName || !email || !classId || !sectionId || !academicYearId) {
      return res.status(400).json({ error: 'Required student fields missing' });
    }

    const defaultPassword = await bcrypt.hash('student123', 10);
    const admissionNo = 'ADM-' + Math.floor(10000 + Math.random() * 90000);
    const studentIdCode = 'STU-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);
    const rollNo = String(Math.floor(1000 + Math.random() * 9000));

    // Create User & Student Profile in Transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          username: email.split('@')[0] + Math.floor(Math.random() * 100),
          password: defaultPassword,
          role: UserRoleEnum.STUDENT,
          firstName,
          lastName,
        },
      });

      const student = await tx.student.create({
        data: {
          userId: user.id,
          studentIdCode,
          admissionNo,
          rollNo,
          gender: gender || Gender.MALE,
          dob: new Date(dob || '2012-01-01'),
          bloodGroup,
          nationality: nationality || 'American',
          religion,
          address,
          academicYearId,
          classId,
          sectionId,
          house,
          allergies,
          medicalNotes,
          emergencyContact,
        },
      });

      return { user, student };
    });

    return res.status(201).json({
      message: 'Student admitted successfully',
      student: result.student,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
