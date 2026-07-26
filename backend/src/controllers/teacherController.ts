import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient, UserRoleEnum } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function getAllTeachers(req: AuthenticatedRequest, res: Response) {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, avatar: true } },
        classes: true,
        subjects: { include: { subject: true } },
      },
    });

    return res.json({ teachers });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createTeacher(req: AuthenticatedRequest, res: Response) {
  try {
    const { firstName, lastName, email, qualification, experienceYrs, salary, department } = req.body;

    if (!firstName || !lastName || !email || !qualification) {
      return res.status(400).json({ error: 'Missing required teacher fields' });
    }

    const defaultPassword = await bcrypt.hash('teacher123', 10);
    const employeeId = 'EMP-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          username: email.split('@')[0] + Math.floor(Math.random() * 100),
          password: defaultPassword,
          role: UserRoleEnum.TEACHER,
          firstName,
          lastName,
        },
      });

      const teacher = await tx.teacher.create({
        data: {
          userId: user.id,
          employeeId,
          qualification,
          experienceYrs: Number(experienceYrs) || 0,
          salary: Number(salary) || 50000,
          department,
        },
      });

      return { user, teacher };
    });

    return res.status(201).json({ message: 'Teacher created successfully', teacher: result.teacher });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
