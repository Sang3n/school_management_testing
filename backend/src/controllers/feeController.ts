import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { PrismaClient, FeeStatus, PaymentMethod } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllInvoices(req: AuthenticatedRequest, res: Response) {
  try {
    const { status, studentId } = req.query;
    const where: any = {};

    if (status) where.status = status as FeeStatus;
    if (studentId) where.studentId = String(studentId);

    const invoices = await prisma.feeInvoice.findMany({
      where,
      include: {
        student: {
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
            class: true,
            section: true,
          },
        },
        feeStructure: { include: { feeCategory: true } },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ invoices });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function recordPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { invoiceId, amount, method, transactionNo, remarks } = req.body;

    if (!invoiceId || !amount) {
      return res.status(400).json({ error: 'invoiceId and payment amount are required' });
    }

    const invoice = await prisma.feeInvoice.findUnique({
      where: { id: invoiceId },
      include: { payments: true },
    });

    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const totalPaidSoFar = invoice.payments.reduce((acc, p) => acc + p.amount, 0) + Number(amount);
    let newStatus = invoice.status;

    if (totalPaidSoFar >= invoice.netAmount) {
      newStatus = FeeStatus.PAID;
    } else if (totalPaidSoFar > 0) {
      newStatus = FeeStatus.PARTIAL;
    }

    const result = await prisma.$transaction([
      prisma.payment.create({
        data: {
          invoiceId,
          amount: Number(amount),
          method: (method as PaymentMethod) || PaymentMethod.CASH,
          transactionNo: transactionNo || `TXN-${Date.now()}`,
          remarks,
        },
      }),
      prisma.feeInvoice.update({
        where: { id: invoiceId },
        data: { status: newStatus },
      }),
    ]);

    return res.json({ message: 'Payment recorded successfully', payment: result[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
