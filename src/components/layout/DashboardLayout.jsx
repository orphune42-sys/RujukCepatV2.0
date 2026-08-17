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
    <div className="flex h-screen bg-background  overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden h-16 bg-white  border-b border-border  flex items-center justify-between px-4 shrink-0">
          <span className="font-bold text-lg text-[#009360]">Rujuk<span className="text-[#41c379]">Cepat</span></span>
          <button
            type="button"
            onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
            aria-label={isSidebarOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isSidebarOpen}
            className="grid h-10 w-10 place-items-center rounded-lg text-text hover:bg-secondary  "
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
