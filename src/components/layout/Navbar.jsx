import React, { useState } from 'react';
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

  const publicLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Cari Rumah Sakit', path: '/cari-rs' },
    { name: 'Tentang', path: '/tentang' },
    { name: 'Hubungi Kami', path: '/hubungi-kami' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#15241b]/80 backdrop-blur-md border-b border-border dark:border-border-dark transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
              <HeartPulse className="h-6 w-6 text-accent dark:text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-text dark:text-text-dark">
              Rujuk<span className="text-accent dark:text-primary">Cepat</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent dark:hover:text-primary ${
                  isActive(link.path) 
                    ? 'text-accent dark:text-primary' 
                    : 'text-muted dark:text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-muted hover:bg-secondary dark:hover:bg-[#1c3626] rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {role !== 'guest' ? (
              <Link to={`/${role.replace('_', '-')}`}>
                <Button variant="primary">Masuk Dashboard</Button>
              </Link>
            ) : (
              <Button variant="primary" onClick={() => setIsLoginModalOpen(true)}>Masuk</Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-muted"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className="p-2 text-text dark:text-text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#15241b] border-b border-border dark:border-border-dark py-4 px-4">
          <nav className="flex flex-col gap-4">
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 px-4 rounded-lg transition-colors ${
                  isActive(link.path) 
                    ? 'bg-secondary dark:bg-[#1c3626] text-accent dark:text-primary' 
                    : 'text-muted dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1c3626]/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border dark:border-border-dark">
              {role !== 'guest' ? (
                <Link to={`/${role.replace('_', '-')}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Masuk Dashboard</Button>
                </Link>
              ) : (
                <Button className="w-full" onClick={() => {
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
