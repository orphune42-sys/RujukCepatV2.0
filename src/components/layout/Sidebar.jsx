import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, LayoutDashboard, Search, FileText, Pill, User,
  PlusCircle, Calendar, MapPin, Inbox, CheckCircle, Clock, CheckSquare,
  LogOut, X
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const { role, setRole } = useAppStore();
  const navigate = useNavigate();

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
          { icon: <Inbox size={20} />, label: 'Rujukan Masuk', path: '/admin-rs/rujukan/masuk' },
          { icon: <CheckCircle size={20} />, label: 'Rujukan Aktif', path: '/admin-rs/rujukan/aktif' },
          { icon: <HeartPulse size={20} />, label: 'Ketersediaan', path: '/admin-rs/ketersediaan' },
          { icon: <Calendar size={20} />, label: 'Jadwal Dokter', path: '/admin-rs/jadwal-dokter' },
          { icon: <MapPin size={20} />, label: 'Rekomendasi', path: '/admin-rs/rekomendasi' },
        ];
      case 'admin_apotek':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin-apotek' },
          { icon: <Inbox size={20} />, label: 'Transaksi', path: '/admin-apotek/transaksi' },
          { icon: <Clock size={20} />, label: 'Riwayat', path: '/admin-apotek/riwayat' },
        ];
      default:
        return [];
    }
  };

  const menu = getMenuByRole();

  return (
    <>
      {isOpen && <button type="button" aria-label="Tutup menu" onClick={onClose} className="fixed inset-0 z-30 bg-black/45 backdrop-blur-sm lg:hidden" />}
      <aside className={`fixed inset-y-3 left-3 right-3 z-40 flex w-auto flex-col rounded-2xl border border-border bg-white/95 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 dark:border-border-dark dark:bg-[#15241b]/95 sm:inset-y-8 sm:left-1/2 sm:right-auto sm:w-[min(30rem,calc(100vw-4rem))] sm:-translate-x-1/2 lg:static lg:z-auto lg:my-6 lg:ml-6 lg:w-64 lg:translate-x-0 lg:rounded-2xl lg:border lg:border-border lg:bg-white/90 lg:shadow-lg lg:shadow-black/5 lg:backdrop-blur-lg lg:opacity-100 lg:pointer-events-auto lg:scale-100 ${isOpen ? 'translate-x-0 opacity-100 pointer-events-auto sm:-translate-x-1/2 sm:scale-100' : '-translate-x-[calc(100%+1rem)] opacity-0 pointer-events-none sm:-translate-x-1/2 sm:scale-95'}`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-border dark:border-border-dark">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-accent dark:text-primary" />
          <span className="font-bold text-xl tracking-tight text-text dark:text-text-dark">
            Rujuk<span className="text-accent dark:text-primary">Cepat</span>
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
                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-secondary dark:bg-[#1c3626] text-accent dark:text-primary' 
                    : 'text-muted hover:bg-gray-50 dark:hover:bg-white/5 hover:text-text dark:hover:text-text-dark'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border dark:border-border-dark">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          Keluar
        </button>
      </div>
      </aside>
    </>
  );
}
