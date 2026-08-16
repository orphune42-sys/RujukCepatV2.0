import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HeartPulse, LayoutDashboard, Search, FileText, Pill, User,
  PlusCircle, Calendar, MapPin, Inbox, Clock, LogOut, X
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function Sidebar({ isOpen = false, onClose = () => { } }) {
  const { role, setRole } = useAppStore();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setRole('guest');
    navigate('/');
  };

  const getMenuByRole = () => {
    switch (role) {
      case 'pasien':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/pasien' },
          { icon: <Search size={20} />, label: 'Cari Layanan', path: '/pasien/cari-layanan' },
          { icon: <FileText size={20} />, label: 'Rujukan Saya', path: '/pasien/rujukan' },
          { icon: <Pill size={20} />, label: 'Layanan Obat', path: '/pasien/obat' },
          { icon: <User size={20} />, label: 'Profil', path: '/pasien/profil' },
        ];
      case 'admin_rs':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin-rs' },
          { icon: <PlusCircle size={20} />, label: 'Buat Rujukan', path: '/admin-rs/buat-rujukan' },
          { icon: <Inbox size={20} />, label: 'Daftar Rujukan', path: '/admin-rs/rujukan' },
          { icon: <HeartPulse size={20} />, label: 'Ketersediaan', path: '/admin-rs/ketersediaan' },
          { icon: <Calendar size={20} />, label: 'Jadwal Dokter', path: '/admin-rs/jadwal-dokter' },
          { icon: <MapPin size={20} />, label: 'Rekomendasi', path: '/admin-rs/rekomendasi' },
          { icon: <User size={20} />, label: 'Profil', path: '/admin-rs/profil' },
        ];
      case 'admin_apotek':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin-apotek' },
          { icon: <Inbox size={20} />, label: 'Transaksi', path: '/admin-apotek/transaksi' },
          { icon: <Clock size={20} />, label: 'Riwayat', path: '/admin-apotek/riwayat' },
          { icon: <User size={20} />, label: 'Profil', path: '/admin-apotek/profil' },
        ];
      default:
        return [];
    }
  };

  const menu = getMenuByRole();

  return (
    <>
      {isOpen && <button type="button" aria-label="Tutup menu" onClick={onClose} className="fixed inset-0 z-30 bg-black/45 backdrop-blur-sm lg:hidden" />}
      <aside className={`fixed inset-y-3 left-3 right-3 z-40 flex w-auto flex-col rounded-2xl border border-border bg-white/95 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 sm:inset-y-8 sm:left-1/2 sm:right-auto sm:w-[min(30rem,calc(100vw-4rem))] sm:-translate-x-1/2 lg:static lg:z-auto lg:my-6 lg:ml-6 lg:w-64 lg:translate-x-0 lg:rounded-2xl lg:border lg:border-border lg:bg-white/90 lg:shadow-lg lg:shadow-black/5 lg:backdrop-blur-lg lg:opacity-100 lg:pointer-events-auto lg:scale-100 ${isOpen ? 'translate-x-0 opacity-100 pointer-events-auto sm:-translate-x-1/2 sm:scale-100' : '-translate-x-[calc(100%+1rem)] opacity-0 pointer-events-none sm:-translate-x-1/2 sm:scale-95'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border ">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-accent " />
            <span className="font-bold text-xl tracking-tight text-text ">
              Rujuk<span className="text-accent ">Cepat</span>
            </span>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup menu" className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-secondary lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={onClose}
                end={item.path === `/${role.replace('_', '-')}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-muted hover:bg-gray-50 hover:text-text'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-border ">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>
      <AnimatePresence>
        {isLogoutDialogOpen && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="sidebar-logout-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsLogoutDialogOpen(false); }}>
            <motion.div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl " initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 12 }}>
              <h2 id="sidebar-logout-title" className="text-xl font-bold text-text ">Keluar dari akun?</h2>
              <p className="mt-2 text-sm text-muted ">Anda perlu masuk kembali untuk mengakses dashboard dan layanan.</p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setIsLogoutDialogOpen(false)} className="h-11 rounded-lg border border-border px-4 font-medium text-text hover:bg-secondary  ">Batal</button>
                <button type="button" onClick={handleLogout} className="h-11 rounded-lg bg-red-500 px-4 font-medium text-white hover:bg-red-600">Ya, Keluar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
