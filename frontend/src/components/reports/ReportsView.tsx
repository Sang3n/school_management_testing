'use client';

import React, { useState } from 'react';
import { FileBarChart, Download, FileText, Printer, CheckCircle } from 'lucide-react';

export function ReportsView() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const triggerDownload = (reportType: string) => {
    setDownloadSuccess(`Generated and downloaded ${reportType}`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Institutional Reports & Analytics Exporter</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Generate, audit, preview & export PDF/CSV data reports across all modules</p>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-500" /> {downloadSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { title: 'Student Enrollment & Admission Report', desc: 'Complete demographics, gender split & class lists' },
          { title: 'Attendance Analytics & Defaulters', desc: 'Monthly student presence, absence trends & leave logs' },
          { title: 'Fee Collection & Defaulter Summary', desc: 'Outstanding balances, collected revenues & invoice receipts' },
          { title: 'Academic Performance & GPA Ranking', desc: 'Class-wise mark summaries, grade distribution & rank cards' },
          { title: 'Faculty & Payroll Report', desc: 'Teacher attendance, salary schedules & department allocations' },
          { title: 'Library Circulation Audit', desc: 'Book issues, overdue fines & book inventory catalog' },
        ].map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-3">
                <FileBarChart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
            </div>
            <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => triggerDownload(`${item.title} (PDF)`)}
                className="w-1/2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button
                onClick={() => triggerDownload(`${item.title} (CSV)`)}
                className="w-1/2 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> Excel / CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
