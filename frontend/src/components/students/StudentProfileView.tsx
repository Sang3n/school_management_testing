'use client';

import React, { useState } from 'react';
import { Student } from '../../types';
import {
  X,
  User,
  GraduationCap,
  CalendarCheck,
  Award,
  DollarSign,
  HeartPulse,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface StudentProfileViewProps {
  student: Student;
  onClose: () => void;
}

export function StudentProfileView({ student, onClose }: StudentProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'marks' | 'fees'>('overview');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Profile Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold text-2xl ring-4 ring-white/10">
              {student.user.firstName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{student.user.firstName} {student.user.lastName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-semibold border border-emerald-400/30">
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-indigo-100 mt-0.5">
                Roll No: {student.rollNo} • Admission No: {student.admissionNo} • {student.class?.name} ({student.section?.name})
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
            {[
              { id: 'overview', label: 'Overview & Profile', icon: User },
              { id: 'attendance', label: 'Attendance Log', icon: CalendarCheck },
              { id: 'marks', label: 'Exams & Grades', icon: Award },
              { id: 'fees', label: 'Fee History', icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-md'
                      : 'text-indigo-100 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Gender & DOB</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {student.gender} • {student.dob}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Blood Group</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {student.bloodGroup || 'O+'}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] uppercase font-bold text-gray-400">House Allocation</p>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    {student.house || 'Gryffindor'}
                  </p>
                </div>
              </div>

              {/* Medical & Guardian Information */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-500" /> Medical & Allergy Alert
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Allergies:</strong> {student.allergies || 'None reported'}
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Medical Notes:</strong> {student.medicalNotes || 'No ongoing medical conditions noted.'}
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1 mt-1 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-rose-500" /> Emergency Hotline: {student.emergencyContact}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <span>Overall Term Attendance Rate</span>
                <span className="text-sm font-bold">96.5%</span>
              </div>
              <div className="space-y-2">
                {[
                  { date: '2026-07-25', status: 'PRESENT', remark: 'On time' },
                  { date: '2026-07-24', status: 'PRESENT', remark: 'On time' },
                  { date: '2026-07-23', status: 'LATE', remark: 'Arrived 10 mins late' },
                  { date: '2026-07-22', status: 'PRESENT', remark: 'On time' },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{log.date}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'marks' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-between text-xs font-bold">
                <span>Current Semester GPA</span>
                <span className="text-base font-extrabold">3.92 / 4.0</span>
              </div>
              <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 font-semibold">
                  <tr>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Marks</th>
                    <th className="p-2.5">Grade</th>
                    <th className="p-2.5">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold">Mathematics</td>
                    <td className="p-2.5">92.5 / 100</td>
                    <td className="p-2.5 text-emerald-600 font-bold">A+</td>
                    <td className="p-2.5">4.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Physics</td>
                    <td className="p-2.5">88.0 / 100</td>
                    <td className="p-2.5 text-emerald-600 font-bold">A</td>
                    <td className="p-2.5">3.7</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">English Literature</td>
                    <td className="p-2.5">95.0 / 100</td>
                    <td className="p-2.5 text-emerald-600 font-bold">A+</td>
                    <td className="p-2.5">4.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Quarterly Tuition Fee Q3</p>
                  <p className="text-[10px] text-gray-400">Invoice: INV-2026-0098 • Due: Aug 15, 2026</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-rose-600 text-sm">$1,100.00</p>
                  <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-[10px] font-bold">
                    UNPAID
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
