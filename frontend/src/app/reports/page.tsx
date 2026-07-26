'use client';

import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navbar } from '../../components/layout/Navbar';
import { ReportsView } from '../../components/reports/ReportsView';

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          <ReportsView />
        </main>
      </div>
    </div>
  );
}
