import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient, AttendanceStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function markStudentAttendance(req: AuthenticatedRequest, res: Response) {
  try {
    const { date, classId, sectionId, attendanceData } = req.body;
    // attendanceData is array of { studentId: string, status: AttendanceStatus, remarks?: string }

    if (!date || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({ error: 'Date and attendance records array required' });
    }

    const attendanceDate = new Date(date);

    const ops = attendanceData.map((item) => {
      return prisma.attendanceStudent.upsert({
        where: {
          studentId_date: {
            studentId: item.studentId,
            date: attendanceDate,
          },
        },
        update: {
          status: item.status as AttendanceStatus,
          remarks: item.remarks || null,
        },
        create: {
          studentId: item.studentId,
          date: attendanceDate,
          status: item.status as AttendanceStatus,
          remarks: item.remarks || null,
        },
      });
    });

    await prisma.$transaction(ops);

    return res.json({ message: 'Attendance recorded successfully', count: attendanceData.length });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getAttendanceByClassAndDate(req: AuthenticatedRequest, res: Response) {
  try {
    const { classId, sectionId, date } = req.query;

    if (!classId || !sectionId || !date) {
      return res.status(400).json({ error: 'classId, sectionId, and date parameters required' });
    }

    const targetDate = new Date(String(date));

    const students = await prisma.student.findMany({
      where: {
        classId: String(classId),
        sectionId: String(sectionId),
      },
      include: {
        user: { select: { firstName: true, lastName: true } },
        attendances: {
          where: { date: targetDate },
        },
      },
      orderBy: { rollNo: 'asc' },
    });

    return res.json({ students });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
