'use client';

import React, { useState } from 'react';
import { MOCK_INVOICES } from '../../lib/api';
import { DollarSign, Plus, CheckCircle, Clock, AlertCircle, FileText, Download } from 'lucide-react';

export function FeeManagementView() {
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const markAsPaid = (invId: string) => {
    setInvoices(
      invoices.map((inv) => (inv.id === invId ? { ...inv, status: 'PAID' } : inv))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Fee & Invoicing Management</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Collect tuition fees, issue receipts, track due balances & payment history</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md">
            <Plus className="w-4 h-4" /> Issue Fee Invoice
          </button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] uppercase font-bold text-gray-400">Total Collected</p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">$245,000</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] uppercase font-bold text-gray-400">Pending Dues</p>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">$32,400</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] uppercase font-bold text-gray-400">Next Payment Deadline</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white mt-2">August 15, 2026</p>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 font-semibold border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="py-3 px-4">Invoice No</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Fee Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{inv.invoiceNo}</td>
                <td className="py-3.5 px-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{inv.student?.user?.firstName} {inv.student?.user?.lastName}</p>
                  <p className="text-[10px] text-gray-400">Roll: {inv.student?.rollNo}</p>
                </td>
                <td className="py-3.5 px-4">{inv.feeStructure?.feeCategory?.name}</td>
                <td className="py-3.5 px-4 font-extrabold text-gray-900 dark:text-white">${inv.netAmount.toLocaleString()}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      inv.status === 'PAID'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  {inv.status !== 'PAID' && (
                    <button
                      onClick={() => markAsPaid(inv.id)}
                      className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 shadow-sm"
                    >
                      Record Cash Payment
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-semibold hover:bg-gray-200"
                  >
                    Print Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-4">

            <div className="text-xs space-y-2">
              <div className="flex justify-between"><span>Student:</span><strong className="text-gray-900">{selectedInvoice.student?.user?.firstName} {selectedInvoice.student?.user?.lastName}</strong></div>
              <div className="flex justify-between"><span>Category:</span><strong>{selectedInvoice.feeStructure?.feeCategory?.name}</strong></div>
              <div className="flex justify-between"><span>Amount Paid:</span><strong className="text-emerald-600 font-extrabold text-sm">${selectedInvoice.netAmount}</strong></div>
              <div className="flex justify-between"><span>Status:</span><strong className="text-emerald-600">{selectedInvoice.status}</strong></div>
            </div>
            <button onClick={() => setSelectedInvoice(null)} className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
