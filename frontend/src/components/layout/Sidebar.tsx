'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  BookOpen,
  DollarSign,
  ClipboardList,
  Library,
  Bus,
  Home,
  Bell,
  FileBarChart,
  Settings,
  ShieldCheck,
  School,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Students & Admissions', href: '/students', icon: GraduationCap },
  { label: 'Teachers & Staff', href: '/teachers', icon: Users },
  { label: 'Attendance', href: '/attendance', icon: CalendarCheck },
  { label: 'Exams & Grades', href: '/exams', icon: ClipboardList },
  { label: 'Fees & Invoicing', href: '/fees', icon: DollarSign },
  { label: 'Notice Board', href: '/notices', icon: Bell },
  { label: 'Library', href: '/library', icon: Library },
  { label: 'Transport', href: '/transport', icon: Bus },
  { label: 'Hostel', href: '/hostel', icon: Home },
  { label: 'Reports & Analytics', href: '/reports', icon: FileBarChart },
  { label: 'School Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole } = useAuth();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between h-screen sticky top-0 transition-colors duration-200 z-30">
      <div>
        {/* Brand Logo - Click to return to Dashboard */}
        <Link
          href="/dashboard"
          className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 gap-3 hover:opacity-80 transition-opacity"
          title="Return to Dashboard Overview"
        >
          <School className="w-7 h-7 text-indigo-600" />
          <span className="text-lg font-bold text-gray-900 dark:text-white">Pathaibhara</span>
        </Link>

        {/* Current Role Tag */}
        <div className="px-4 py-3 mx-3 my-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div className="overflow-hidden">
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">
              Active Portal
            </p>
            <p className="text-xs font-semibold text-gray-900 dark:text-gray-200 truncate">
              {currentRole.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="px-3 py-2 space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          v2.5.0 Production Ready
        </p>
      </div>
    </aside>
  );
}
