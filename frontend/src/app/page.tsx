'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { School, ArrowRight, ShieldCheck, Lock, Mail, Sparkles } from 'lucide-react';

const DEMO_ROLES: { role: UserRole; title: string; desc: string; color: string }[] = [
  { role: 'SUPER_ADMIN', title: 'Super Admin', desc: 'Full institutional access & system configs', color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400' },
  { role: 'SCHOOL_ADMIN', title: 'School Admin', desc: 'Admissions, staff & operational control', color: 'border-blue-500/50 bg-blue-500/10 text-blue-400' },
  { role: 'PRINCIPAL', title: 'Principal', desc: 'Academic oversight & performance metrics', color: 'border-purple-500/50 bg-purple-500/10 text-purple-400' },
  { role: 'VICE_PRINCIPAL', title: 'Vice Principal', desc: 'Discipline, schedules & daily supervision', color: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
  { role: 'ACCOUNTANT', title: 'Accountant', desc: 'Fee collection, invoices & financial logs', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
  { role: 'TEACHER', title: 'Teacher Portal', desc: 'Class attendance, homework & grade entry', color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' },
  { role: 'LIBRARIAN', title: 'Librarian', desc: 'Book catalog, issues & fine tracking', color: 'border-teal-500/50 bg-teal-500/10 text-teal-400' },
  { role: 'RECEPTIONIST', title: 'Receptionist', desc: 'Visitor logs, admissions & front desk', color: 'border-pink-500/50 bg-pink-500/10 text-pink-400' },
  { role: 'STUDENT', title: 'Student Portal', desc: 'View timetable, report cards & fees', color: 'border-rose-500/50 bg-rose-500/10 text-rose-400' },
  { role: 'PARENT', title: 'Parent Portal', desc: 'Child attendance, fee receipts & notices', color: 'border-violet-500/50 bg-violet-500/10 text-violet-400' },
];

export default function LoginPage() {
  const router = Router();
  const { loginAsRole } = useAuth();
  const [email, setEmail] = useState('superadmin@sms.edu');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('SUPER_ADMIN');
    router.push('/dashboard');
  };

  const handleDemoSelect = (role: UserRole) => {
    loginAsRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl z-10 space-y-8">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/30 mb-2">
            <School className="w-8 h-8 text-white" />
          </div>

          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Enterprise-grade SaaS platform for schools, colleges & educational institutions.
          </p>
        </div>

        {/* 1-Click Role Login Launcher */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
                1-Click Instant Demo Login (Choose Any of 10 Roles)
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">Pre-seeded credentials</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {DEMO_ROLES.map((item) => (
              <button
                key={item.role}
                onClick={() => handleDemoSelect(item.role)}
                className={`p-3.5 rounded-2xl border text-left transition-all hover:scale-[1.02] hover:shadow-lg ${item.color} group`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-opacity"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
