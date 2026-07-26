'use client';

import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navbar } from '../../components/layout/Navbar';
import { FeeManagementView } from '../../components/fees/FeeManagementView';

export default function FeesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          <FeeManagementView />
        </main>
      </div>
    </div>
  );
}
