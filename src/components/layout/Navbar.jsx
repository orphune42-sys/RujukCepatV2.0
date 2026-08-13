import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, Sun, Moon } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import Button from '../ui/Button';
import LoginModal from '../shared/LoginModal';

export default function Navbar() {
  const { isDarkMode, toggleDarkMode, role } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    setActiveHash(location.hash || '#beranda');
  }, [location]);

  const publicLinks = [
    { name: 'Beranda', path: '#beranda' },
    { name: 'Cari Rumah Sakit', path: '#cari-rs' },
    { name: 'Tentang', path: '#tentang' },
    { name: 'Hubungi Kami', path: '#hubungi-kami' },
  ];

  const handleLinkClick = (hash) => {
    setIsMobileMenuOpen(false);
    setActiveHash(hash);
  };

  return (
    <header className="fixed top-3 left-3 right-3 md:top-6 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-5xl z-50 bg-white/90 dark:bg-[#15241b]/90 backdrop-blur-lg border border-border/50 dark:border-border-dark/50 rounded-2xl md:rounded-full shadow-lg shadow-black/5 transition-all duration-300">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setActiveHash('#beranda')} className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary/30 transition-colors">
              <HeartPulse className="h-5 w-5 md:h-6 md:w-6 text-accent dark:text-primary" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-text dark:text-text-dark">
              Rujuk<span className="text-accent dark:text-primary">Cepat</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {publicLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-semibold transition-colors hover:text-accent dark:hover:text-primary ${
                  activeHash === link.path 
                    ? 'text-accent dark:text-primary' 
                    : 'text-muted dark:text-gray-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-muted hover:bg-secondary dark:hover:bg-[#1c3626] rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {role !== 'guest' ? (
              <Link to={`/${role.replace('_', '-')}`}>
                <Button variant="primary" className="rounded-full px-6">Dashboard</Button>
              </Link>
            ) : (
              <Button variant="primary" className="rounded-full px-6" onClick={() => setIsLoginModalOpen(true)}>Masuk</Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-muted bg-secondary/50 dark:bg-black/20 rounded-full"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className="p-2 text-text dark:text-text-dark bg-secondary/50 dark:bg-black/20 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[110%] left-0 right-0 bg-white dark:bg-[#15241b] border border-border dark:border-border-dark rounded-2xl shadow-xl py-4 px-4 overflow-hidden">
          <nav className="flex flex-col gap-2">
            {publicLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-semibold py-3 px-4 rounded-xl transition-colors ${
                  activeHash === link.path 
                    ? 'bg-secondary dark:bg-[#1c3626] text-accent dark:text-primary' 
                    : 'text-muted dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1c3626]/50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-border dark:border-border-dark">
              {role !== 'guest' ? (
                <Link to={`/${role.replace('_', '-')}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl">Masuk Dashboard</Button>
                </Link>
              ) : (
                <Button className="w-full rounded-xl" onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}>Masuk</Button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
}
