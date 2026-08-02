'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  Search,
  Moon,
  Sun,
  Bell,
  UserCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const ALL_ROLES: UserRole[] = [
  'SUPER_ADMIN',
  'SCHOOL_ADMIN',
  'PRINCIPAL',
  'VICE_PRINCIPAL',
  'ACCOUNTANT',
  'TEACHER',
  'LIBRARIAN',
  'RECEPTIONIST',
  'STUDENT',
  'PARENT',
];

export function Navbar() {
  const { user, currentRole, theme, toggleTheme, switchRole } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const IS_ADMIN = currentRole === 'SUPER_ADMIN' || currentRole === 'SCHOOL_ADMIN';

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Global Search Bar */}
      <div className="relative w-72 md:w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search student, teacher, class, roll no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-100 dark:bg-gray-800 border-none text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Button - Restricted to Super Admin & School Admin only */}
        {IS_ADMIN ? (
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>Switch Role: {currentRole}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Role Dropdown */}
            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Select Portal Context</p>
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {ALL_ROLES.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        currentRole === role
                          ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <span>{role.replace('_', ' ')}</span>
                      {currentRole === role && <UserCheck className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold">
            <span>🛡️ Role: {currentRole.replace('_', ' ')}</span>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle Dark / Light Mode"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white dark:ring-gray-900" />
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700">
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">System Notifications</h4>
                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="space-y-3 mt-3">
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-xs">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">Orientation Ceremony</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Welcome to Academic Term 2025-2026.</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">10 mins ago</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-xs">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">Q3 Fee Invoice Generated</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Tuition invoices have been sent out.</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">2 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
            {user?.firstName?.[0] || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
