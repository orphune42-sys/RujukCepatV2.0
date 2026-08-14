import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, Stethoscope, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ isOpen, onClose, initialMode = 'login' }) {
  const [activeTab, setActiveTab] = useState('pasien');
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  // Ref untuk wrapper — kita set pointer-events:none segera saat close
  const wrapperRef = useRef(null);
  const { setRole } = useAppStore();
  const navigate = useNavigate();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setActiveTab('pasien');
      if (wrapperRef.current) {
        wrapperRef.current.style.pointerEvents = 'auto';
      }
    }
  }, [isOpen, initialMode]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    // Langsung matikan pointer-events pada wrapper supaya exit animation tidak memblokir klik
    if (wrapperRef.current) {
      wrapperRef.current.style.pointerEvents = 'none';
    }
    onClose();
  };

  const handleSubmit = (e) => {
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

  const modalContent = (
    <div ref={wrapperRef}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className="relative w-full max-w-[420px] bg-white dark:bg-[#0f1a13] rounded-[24px] shadow-2xl overflow-hidden border border-border dark:border-border-dark flex flex-col max-h-[90vh]"
            >
              <div className="relative flex items-center justify-center p-6 shrink-0">
                {mode === 'register' && (
                  <button
                    onClick={() => setMode('login')}
                    type="button"
                    className="absolute left-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary dark:bg-[#1c3626] text-text dark:text-text-dark transition-transform active:scale-75"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h2 className="text-xl font-semibold tracking-tight text-text dark:text-text-dark">
                  {mode === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                </h2>
                <button
                  onClick={handleClose}
                  type="button"
                  className="absolute right-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary dark:bg-[#1c3626] text-text dark:text-text-dark transition-transform active:scale-75"
                >
                  <X className="h-5 w-5 opacity-75" />
                </button>
              </div>

              <div className="px-6 pb-6 overflow-y-auto custom-scrollbar">
                <div className="relative flex p-1 bg-secondary/70 dark:bg-[#1c3626]/50 rounded-[16px] mb-6 shrink-0">
                  {roles.map((r) => {
                    const isActive = activeTab === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setActiveTab(r.id)}
                        className={`relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 text-[10px] sm:text-sm font-medium rounded-xl transition-colors duration-200 z-10 ${
                          isActive
                            ? 'text-accent dark:text-primary'
                            : 'text-muted hover:text-text dark:hover:text-text-dark'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-white dark:bg-[#204a35] rounded-xl shadow-sm border border-border/50 dark:border-border-dark/50"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 leading-none">
                          {r.icon}
                          <span>{r.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.form
                    key={mode}
                    initial={{ opacity: 0, x: mode === 'register' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === 'register' ? -20 : 20 }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {mode === 'register' && (
                      <div>
                        <label className="sr-only">Nama Lengkap</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <UserPlus className="h-5 w-5 text-muted dark:text-gray-500" />
                          </div>
                          <input
                            type="text"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/40 dark:bg-[#15241b] border border-transparent focus:border-accent focus:ring-1 focus:ring-accent dark:focus:border-primary dark:focus:ring-primary rounded-2xl outline-none transition-all placeholder:text-muted dark:placeholder:text-gray-500 text-text dark:text-text-dark text-sm"
                            placeholder="Nama Lengkap"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="sr-only">Email / Username</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-muted dark:text-gray-500" />
                        </div>
                        <input
                          type="text"
                          className="w-full h-12 pl-12 pr-4 bg-secondary/40 dark:bg-[#15241b] border border-transparent focus:border-accent focus:ring-1 focus:ring-accent dark:focus:border-primary dark:focus:ring-primary rounded-2xl outline-none transition-all placeholder:text-muted dark:placeholder:text-gray-500 text-text dark:text-text-dark text-sm"
                          placeholder="Email atau username"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="sr-only">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-muted dark:text-gray-500" />
                        </div>
                        <input
                          type="password"
                          className="w-full h-12 pl-12 pr-4 bg-secondary/40 dark:bg-[#15241b] border border-transparent focus:border-accent focus:ring-1 focus:ring-accent dark:focus:border-primary dark:focus:ring-primary rounded-2xl outline-none transition-all placeholder:text-muted dark:placeholder:text-gray-500 text-text dark:text-text-dark text-sm"
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>

                    {mode === 'register' && (
                      <div>
                        <label className="sr-only">Konfirmasi Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-muted dark:text-gray-500" />
                          </div>
                          <input
                            type="password"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/40 dark:bg-[#15241b] border border-transparent focus:border-accent focus:ring-1 focus:ring-accent dark:focus:border-primary dark:focus:ring-primary rounded-2xl outline-none transition-all placeholder:text-muted dark:placeholder:text-gray-500 text-text dark:text-text-dark text-sm"
                            placeholder="Konfirmasi password"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-accent dark:bg-primary px-2.5 text-base font-medium text-white dark:text-[#0f1a13] transition-all active:scale-95 shadow-sm hover:opacity-90"
                      >
                        {mode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                      </button>
                    </div>

                    {mode === 'login' && (
                      <button
                        type="button"
                        className="w-full text-sm text-muted dark:text-gray-400 hover:text-text dark:hover:text-text-dark transition-colors py-1"
                      >
                        Lupa password?
                      </button>
                    )}

                    <div className="text-center text-sm text-muted mt-2">
                      {mode === 'login' ? (
                        <>
                          Belum punya akun?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('register')}
                            className="text-accent dark:text-primary hover:underline font-medium"
                          >
                            Daftar
                          </button>
                        </>
                      ) : (
                        <>
                          Sudah punya akun?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('login')}
                            className="text-accent dark:text-primary hover:underline font-medium"
                          >
                            Masuk
                          </button>
                        </>
                      )}
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
