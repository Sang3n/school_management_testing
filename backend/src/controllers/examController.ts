import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient, ExamType } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllExams(req: AuthenticatedRequest, res: Response) {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        schedules: {
          include: {
            classSubject: {
              include: { class: true, subject: true, teacher: { include: { user: true } } },
            },
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });

    return res.json({ exams });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createExam(req: AuthenticatedRequest, res: Response) {
  try {
    const { name, type, startDate, endDate, description } = req.body;
    if (!name || !type || !startDate || !endDate) {
      return res.status(400).json({ error: 'Name, type, start date, and end date are required' });
    }

    const exam = await prisma.exam.create({
      data: {
        name,
        type: type as ExamType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description,
      },
    });

    return res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function enterExamMarks(req: AuthenticatedRequest, res: Response) {
  try {
    const { examScheduleId, marksData } = req.body;
    // marksData: Array of { studentId: string, marksObtained: number }

    if (!examScheduleId || !marksData || !Array.isArray(marksData)) {
      return res.status(400).json({ error: 'examScheduleId and marksData array required' });
    }

    const ops = marksData.map((item) => {
      const marks = Number(item.marksObtained);
      let grade = 'F';
      let gpa = 0.0;

      if (marks >= 90) { grade = 'A+'; gpa = 4.0; }
      else if (marks >= 80) { grade = 'A'; gpa = 3.7; }
      else if (marks >= 70) { grade = 'B'; gpa = 3.0; }
      else if (marks >= 60) { grade = 'C'; gpa = 2.0; }
      else if (marks >= 50) { grade = 'D'; gpa = 1.0; }

      return prisma.examResult.upsert({
        where: {
          examScheduleId_studentId: {
            examScheduleId,
            studentId: item.studentId,
          },
        },
        update: {
          marksObtained: marks,
          grade,
          gpa,
          remarks: item.remarks || null,
        },
        create: {
          examScheduleId,
          studentId: item.studentId,
          marksObtained: marks,
          grade,
          gpa,
          remarks: item.remarks || null,
        },
      });
    });

    await prisma.$transaction(ops);

    return res.json({ message: 'Exam marks submitted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
