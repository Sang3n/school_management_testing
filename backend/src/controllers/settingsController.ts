import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSettings(req: AuthenticatedRequest, res: Response) {
  try {
    let settings = await prisma.schoolSettings.findUnique({ where: { id: '1' } });
    if (!settings) {
      settings = await prisma.schoolSettings.create({ data: { id: '1' } });
    }
    return res.json({ settings });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function updateSettings(req: AuthenticatedRequest, res: Response) {
  try {
    const data = req.body;
    const settings = await prisma.schoolSettings.upsert({
      where: { id: '1' },
      update: data,
      create: { id: '1', ...data },
    });
    return res.json({ message: 'Settings updated successfully', settings });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
