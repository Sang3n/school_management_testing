import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllNotices(req: AuthenticatedRequest, res: Response) {
  try {
    const notices = await prisma.notice.findMany({
      include: {
        author: { select: { firstName: true, lastName: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ notices });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createNotice(req: AuthenticatedRequest, res: Response) {
  try {
    const { title, content, targetRoles = 'ALL', isImportant = false } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        targetRoles: Array.isArray(targetRoles) ? targetRoles.join(',') : targetRoles,
        isImportant: Boolean(isImportant),
        authorId: req.user!.userId,
      },
    });

    return res.status(201).json({ message: 'Notice posted successfully', notice });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
