'use client';

import React, { useState } from 'react';
import { MOCK_TEACHERS } from '../../lib/api';
import { Plus, Users, Mail, Phone, Award, DollarSign, Download } from 'lucide-react';

export function TeacherList() {
  const [teachers, setTeachers] = useState(MOCK_TEACHERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    qualification: 'M.Sc.',
    experienceYrs: '5',
    salary: '60000',
    department: 'Mathematics',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: 't-' + Date.now(),
      employeeId: 'EMP-2025-' + Math.floor(100 + Math.random() * 900),
      qualification: newTeacher.qualification,
      experienceYrs: Number(newTeacher.experienceYrs),
      salary: Number(newTeacher.salary),
      department: newTeacher.department,
      user: {
        firstName: newTeacher.firstName || 'Teacher',
        lastName: newTeacher.lastName || 'Staff',
        email: newTeacher.email || `teacher.${Date.now()}@sms.edu`,
        phone: '+1 555-0199',
      },
    };
    setTeachers([created, ...teachers]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Faculty & Academic Staff</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Manage teachers, qualifications, department allocations & payroll</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm">
            <Download className="w-3.5 h-3.5" /> Staff Directory CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> Add Teacher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                {teacher.user.firstName[0]}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{teacher.user.firstName} {teacher.user.lastName}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold">
                  {teacher.department} Department
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Employee ID:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{teacher.employeeId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Qualification:</span>
                <span className="font-semibold">{teacher.qualification}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Experience:</span>
                <span className="font-semibold">{teacher.experienceYrs} Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Salary:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">${teacher.salary.toLocaleString()}/yr</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Add Faculty Member</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="First Name"
                required
                value={newTeacher.firstName}
                onChange={(e) => setNewTeacher({ ...newTeacher, firstName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={newTeacher.lastName}
                onChange={(e) => setNewTeacher({ ...newTeacher, lastName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <input
                type="text"
                placeholder="Qualification (e.g. M.Sc. Mathematics)"
                value={newTeacher.qualification}
                onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="w-1/2 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold">Cancel</button>
                <button type="submit" className="w-1/2 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md">Add Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
