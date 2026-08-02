'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchDashboardData } from '../../lib/api';
import { AnalyticsCards } from '../../components/dashboard/AnalyticsCards';
import { OverviewCharts } from '../../components/dashboard/OverviewCharts';
import { UserPlus, Calendar, Award, Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { currentRole, user } = useAuth();
  const [data, setData] = useState<any>(null);

  const CAN_ADMIT_STUDENTS = ['SUPER_ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'ACCOUNTANT'].includes(currentRole);

  useEffect(() => {
    fetchDashboardData().then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center text-xs">Loading SMS Dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
              {currentRole.replace('_', ' ')} PORTAL
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          </div>
          <h1 className="text-2xl font-extrabold mt-1 tracking-tight">
            Welcome back, {user?.firstName || 'Administrator'}!
          </h1>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {CAN_ADMIT_STUDENTS && (
            <Link
              href="/students"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5" /> Admission
            </Link>
          )}

          <Link
            href="/attendance"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md"
          >
            <Calendar className="w-3.5 h-3.5" /> Mark Attendance
          </Link>
        </div>
      </div>

      {/* Analytics Counter Cards */}
      <AnalyticsCards counters={data.counters} />

      {/* Recharts Revenue & Attendance Analytics */}
      <OverviewCharts />

      {/* Bottom Grid: Recent Notices & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notice Board Feed */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-500" /> Recent School Notices
            </h3>
            <Link href="/notices" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentNotices.map((n: any) => (
              <div key={n.id} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 dark:text-white">{n.title}</h4>
                  <span className="text-[10px] text-gray-400">{n.createdAt}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{n.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Examination Schedule */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" /> Upcoming Examinations
            </h3>
            <Link href="/exams" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              View Schedules
            </Link>
          </div>
          <div className="space-y-3">
            {data.upcomingExams.map((e: any) => (
              <div key={e.id} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{e.name}</h4>
                  <p className="text-[10px] text-gray-400">Type: {e.type} • Starts: {e.startDate}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-bold text-[10px]">
                  Scheduled
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
