import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAppStore from '../../store/useAppStore';

export default function DashboardLayout() {
  const { role } = useAppStore();

  // If somehow a guest tries to access dashboard, redirect
  if (role === 'guest') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background dark:bg-background-dark overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header (Sidebar toggle would go here) */}
        <header className="md:hidden h-16 bg-white dark:bg-[#15241b] border-b border-border dark:border-border-dark flex items-center px-4">
          <span className="font-bold text-lg text-text dark:text-text-dark">RujukCepat</span>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
