'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../../lib/api';
import { CalendarCheck, Save, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export function AttendanceMarker() {
  const [date, setDate] = useState('2026-07-27');
  const [selectedClass, setSelectedClass] = useState('G10');
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE'>>({
    s1: 'PRESENT',
    s2: 'PRESENT',
    s3: 'LATE',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleStatus = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE') => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Daily Student Attendance Register</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mark daily presence, absence, leaves, and late arrivals per section</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20"
        >
          <Save className="w-4 h-4" /> Save Attendance Log
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" /> Attendance recorded and synced successfully!
        </div>
      )}

      {/* Selector controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Attendance Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Target Class & Section</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="G10">Grade 10 - Section A</option>
              <option value="G11">Grade 11 - Section B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Table */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 font-semibold border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="py-3 px-4">Roll No</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4 text-center">Attendance Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {MOCK_STUDENTS.map((student) => {
              const status = attendance[student.id] || 'PRESENT';
              return (
                <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{student.rollNo}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{student.user.firstName} {student.user.lastName}</p>
                    <p className="text-[10px] text-gray-400">{student.admissionNo}</p>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
                      {[
                        { key: 'PRESENT', label: 'Present', color: 'bg-emerald-500 text-white' },
                        { key: 'ABSENT', label: 'Absent', color: 'bg-rose-500 text-white' },
                        { key: 'LATE', label: 'Late', color: 'bg-amber-500 text-white' },
                        { key: 'LEAVE', label: 'Leave', color: 'bg-indigo-500 text-white' },
                      ].map((item) => {
                        const isSelected = status === item.key;
                        return (
                          <button
                            key={item.key}
                            onClick={() => toggleStatus(student.id, item.key as any)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              isSelected ? `${item.color} shadow-sm` : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
