import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, Stethoscope } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function LoginModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('pasien');
  const { setRole } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setRole(activeTab);
    onClose();
    navigate(`/${activeTab.replace('_', '-')}`);
  };

  const roles = [
    { id: 'pasien', label: 'Pasien', icon: <User className="h-5 w-5" /> },
    { id: 'admin_rs', label: 'Admin RS', icon: <Shield className="h-5 w-5" /> },
    { id: 'admin_apotek', label: 'Admin Apotek', icon: <Stethoscope className="h-5 w-5" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-[#15241b] rounded-2xl shadow-2xl z-50 overflow-hidden border border-border dark:border-border-dark"
          >
            <div className="flex justify-between items-center p-6 border-b border-border dark:border-border-dark">
              <h2 className="text-2xl font-bold text-text dark:text-text-dark">Masuk ke Akun</h2>
              <button onClick={onClose} className="p-2 text-muted hover:bg-secondary dark:hover:bg-[#1c3626] rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex p-1 bg-secondary dark:bg-[#1c3626] rounded-lg mb-6">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveTab(r.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === r.id 
                        ? 'bg-white dark:bg-[#204a35] text-accent dark:text-primary shadow-sm' 
                        : 'text-muted hover:text-text dark:hover:text-text-dark'
                    }`}
                  >
                    {r.icon}
                    <span className="hidden sm:inline">{r.label}</span>
                  </button>
                ))}
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Email / Username</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-white dark:bg-[#0a120e] border border-border dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text dark:text-text-dark transition-colors" 
                    placeholder="Masukkan email Anda" 
                    defaultValue={`demo@${activeTab}.com`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 bg-white dark:bg-[#0a120e] border border-border dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text dark:text-text-dark transition-colors" 
                    placeholder="••••••••" 
                    defaultValue="password123"
                    required
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full">Masuk</Button>
                </div>
                <div className="text-center text-sm text-muted mt-4">
                  Belum punya akun? <a href="#" className="text-accent dark:text-primary hover:underline">Daftar sekarang</a>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
