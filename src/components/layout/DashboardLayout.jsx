import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import useAppStore from '../../store/useAppStore';

export default function DashboardLayout() {
  const { role } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If somehow a guest tries to access dashboard, redirect
  if (role === 'guest') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background dark:bg-background-dark overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden h-16 bg-white dark:bg-[#15241b] border-b border-border dark:border-border-dark flex items-center justify-between px-4 shrink-0">
          <span className="font-bold text-lg text-text dark:text-text-dark">Rujuk<span className="text-accent dark:text-primary">Cepat</span></span>
          <button
            type="button"
            onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
            aria-label={isSidebarOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isSidebarOpen}
            className="grid h-10 w-10 place-items-center rounded-lg text-text hover:bg-secondary dark:text-text-dark dark:hover:bg-[#1c3626]"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
