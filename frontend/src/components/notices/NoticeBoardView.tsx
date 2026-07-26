'use client';

import React, { useState } from 'react';
import { MOCK_NOTICES } from '../../lib/api';
import { Bell, Plus, Pin, Calendar, User } from 'lucide-react';

export function NoticeBoardView() {
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', targetRoles: 'ALL', isImportant: false });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: 'n-' + Date.now(),
      title: newNotice.title,
      content: newNotice.content,
      targetRoles: newNotice.targetRoles,
      isImportant: newNotice.isImportant,
      createdAt: new Date().toISOString().split('T')[0],
      author: { firstName: 'Admin', lastName: 'Office', role: 'SCHOOL_ADMIN' },
    };
    setNotices([created, ...notices]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">School Notice Board & Circulars</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Broadcast announcements to students, parents, faculty & administrative staff</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md"
        >
          <Plus className="w-4 h-4" /> Post New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden"
          >
            {n.isImportant && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{n.title}</h3>
                  {n.isImportant && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-[10px] font-bold">
                      IMPORTANT
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{n.content}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-[10px] font-semibold shrink-0">
                Audience: {n.targetRoles}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-gray-400" /> Issued by: {n.author?.firstName} {n.author?.lastName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" /> Date: {n.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Post New Circular</h3>
            <form onSubmit={handlePost} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Notice Title"
                required
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border"
              />
              <textarea
                placeholder="Content details..."
                rows={4}
                required
                value={newNotice.content}
                onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="w-1/2 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold">Cancel</button>
                <button type="submit" className="w-1/2 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
