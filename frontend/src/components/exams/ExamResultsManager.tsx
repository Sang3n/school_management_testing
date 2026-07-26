'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../../lib/api';
import { Award, Plus, FileText, Printer, CheckCircle } from 'lucide-react';

export function ExamResultsManager() {
  const [selectedExam, setSelectedExam] = useState('Midterm Examination 2026');
  const [marks, setMarks] = useState<Record<string, number>>({
    s1: 92.5,
    s2: 88.0,
    s3: 76.0,
  });
  const [showReportCardModal, setShowReportCardModal] = useState<any>(null);

  const calculateGrade = (m: number) => {
    if (m >= 90) return { grade: 'A+', gpa: 4.0 };
    if (m >= 80) return { grade: 'A', gpa: 3.7 };
    if (m >= 70) return { grade: 'B', gpa: 3.0 };
    if (m >= 60) return { grade: 'C', gpa: 2.0 };
    return { grade: 'F', gpa: 0.0 };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Exam Schedules & Report Cards</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enter examination marks, auto-compute GPA & generate printable report cards</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md">
          <Plus className="w-4 h-4" /> Create Exam Schedule
        </button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Mathematics - Midterm Marks Entry</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-bold">
            Max Marks: 100
          </span>
        </div>
        <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 font-semibold">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Marks Obtained (100)</th>
              <th className="py-3 px-4">Calculated Grade</th>
              <th className="py-3 px-4">GPA</th>
              <th className="py-3 px-4 text-right">Report Card</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {MOCK_STUDENTS.map((student) => {
              const val = marks[student.id] || 85;
              const { grade, gpa } = calculateGrade(val);
              return (
                <tr key={student.id}>
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{student.user.firstName} {student.user.lastName}</td>
                  <td className="py-3.5 px-4">
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => setMarks({ ...marks, [student.id]: Number(e.target.value) })}
                      className="w-24 px-3 py-1 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-extrabold text-xs">
                      {grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{gpa.toFixed(1)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setShowReportCardModal(student)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100"
                    >
                      Print Report Card
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showReportCardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-3xl p-8 max-w-xl w-full shadow-2xl space-y-4">

            <div className="text-xs space-y-1">
              <p><strong>Student Name:</strong> {showReportCardModal.user.firstName} {showReportCardModal.user.lastName}</p>
              <p><strong>Roll No:</strong> {showReportCardModal.rollNo} • <strong>Class:</strong> Grade 10 A</p>
            </div>
            <table className="w-full text-xs text-left border">
              <thead className="bg-gray-100 font-bold">
                <tr><th className="p-2 border">Subject</th><th className="p-2 border">Marks</th><th className="p-2 border">Grade</th></tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border font-semibold">Mathematics</td><td className="p-2 border">92.5</td><td className="p-2 border font-bold text-emerald-600">A+</td></tr>
                <tr><td className="p-2 border font-semibold">Physics</td><td className="p-2 border">88.0</td><td className="p-2 border font-bold text-emerald-600">A</td></tr>
                <tr><td className="p-2 border font-semibold">English</td><td className="p-2 border">95.0</td><td className="p-2 border font-bold text-emerald-600">A+</td></tr>
              </tbody>
            </table>
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-xs font-bold">Cumulative GPA: <span className="text-indigo-600">3.92</span></p>
              <button onClick={() => setShowReportCardModal(null)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
