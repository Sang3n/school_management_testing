'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../../lib/api';
import { Student } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Plus,
  Filter,
  UserCheck,
  Eye,
  MoreVertical,
  Download,
  Mail,
  Phone,
  Lock,
} from 'lucide-react';
import { AdmissionFormModal } from './AdmissionFormModal';
import { StudentProfileView } from './StudentProfileView';

export function StudentList() {
  const { currentRole } = useAuth();
  const CAN_ADMIT_STUDENTS = ['SUPER_ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'ACCOUNTANT'].includes(currentRole);

  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS as any);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [selectedStudentForView, setSelectedStudentForView] = useState<Student | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.includes(search) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || s.class?.code === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (newStudent: any) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Student Information & Directory
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage profiles, academic records, guardian details & admissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5 text-gray-500" /> Export CSV
          </button>
          {CAN_ADMIT_STUDENTS ? (
            <button
              onClick={() => setShowAdmissionModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Plus className="w-4 h-4" /> New Admission
            </button>
          ) : (
            <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold border border-gray-200 dark:border-gray-700">
              <Lock className="w-3.5 h-3.5" /> Admission Restricted
            </span>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student name, roll no, admission ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
            >
              <option value="ALL">All Classes</option>
              <option value="G10">Grade 10</option>
              <option value="G11">Grade 11</option>
              <option value="G12">Grade 12</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Student Info</th>
                <th className="py-3.5 px-4">Admission & Roll</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">House & Status</th>
                <th className="py-3.5 px-4">Medical Alert</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shadow-sm">
                        {student.user.firstName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {student.user.firstName} {student.user.lastName}
                        </p>
                        <p className="text-[10px] text-gray-400">{student.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-gray-900 dark:text-gray-200 font-semibold">{student.admissionNo}</p>
                    <p className="text-[10px] text-gray-400">Roll: {student.rollNo}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-[11px]">
                      {student.class?.name} - {student.section?.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold">
                        {student.house || 'General'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                        {student.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {student.allergies && student.allergies !== 'None' ? (
                      <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-[10px] font-bold">
                        ⚠️ {student.allergies}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px]">None</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudentForView(student)}
                      className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                      title="View Student Full Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admission Modal */}
      {showAdmissionModal && (
        <AdmissionFormModal
          onClose={() => setShowAdmissionModal(false)}
          onAddStudent={handleAddStudent}
        />
      )}

      {/* Profile Detail View Modal */}
      {selectedStudentForView && (
        <StudentProfileView
          student={selectedStudentForView}
          onClose={() => setSelectedStudentForView(null)}
        />
      )}
    </div>
  );
}
