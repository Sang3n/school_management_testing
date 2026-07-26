'use client';

import React from 'react';
import {
  GraduationCap,
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Building,
} from 'lucide-react';

interface StatsProps {
  counters: {
    totalStudents: number;
    totalTeachers: number;
    totalParents: number;
    totalClasses: number;
    totalSubjects: number;
    attendanceRate: string;
    totalFeesCollected: number;
    totalPendingFees: number;
  };
}

export function AnalyticsCards({ counters }: StatsProps) {
  const cards = [
    {
      title: 'Total Active Students',
      value: counters.totalStudents.toLocaleString(),
      change: '+4.2% from last term',
      icon: GraduationCap,
      color: 'bg-indigo-500',
    },
    {
      title: 'Faculty Teachers',
      value: counters.totalTeachers,
      change: '86 Full-time Staff',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Attendance Today',
      value: counters.attendanceRate,
      change: '1,238 Present Today',
      icon: UserCheck,
      color: 'bg-emerald-500',
    },
    {
      title: 'Fees Collected (YTD)',
      value: `$${counters.totalFeesCollected.toLocaleString()}`,
      change: '92% Collection Rate',
      icon: DollarSign,
      color: 'bg-violet-500',
    },
    {
      title: 'Pending Tuition Fees',
      value: `$${counters.totalPendingFees.toLocaleString()}`,
      change: 'Due by Aug 15th',
      icon: AlertCircle,
      color: 'bg-rose-500',
    },
    {
      title: 'Active Classes & Sections',
      value: `${counters.totalClasses} Classes`,
      change: 'Grade 1 to Grade 12',
      icon: Building,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {card.title}
              </span>
              <div
                className={`w-10 h-10 rounded-xl ${card.color} text-white flex items-center justify-center shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {card.value}
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>{card.change}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
