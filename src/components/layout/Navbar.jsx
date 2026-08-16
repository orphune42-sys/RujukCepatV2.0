import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, Menu, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import Button from '../ui/Button';
import LoginModal from '../shared/LoginModal';

export default function Navbar() {
  const { role } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeHash, setActiveHash] = useState('/#beranda');

  useEffect(() => {
    const mode = new URLSearchParams(location.search).get('auth');
    if (mode === 'login' || mode === 'register') {
      setAuthMode(mode);
      setIsLoginModalOpen(true);
    }
  }, [location.search]);

  const openLogin = () => {
    setAuthMode('login');
    setIsLoginModalOpen(true);
  };

  const closeLogin = () => {
    setIsLoginModalOpen(false);
    if (location.search) navigate(location.pathname, { replace: true });
  };

  // Keep the active navigation item and URL hash aligned with the scroll position.
  useEffect(() => {
    const sectionIds = ['beranda', 'cari-fk', 'tentang', 'hubungi-kami'];

    const updateActiveSection = () => {
      const marker = window.scrollY + 160;
      let currentId = 'beranda';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) currentId = id;
      });

      const nextHash = `/#${currentId}`;
      setActiveHash((currentHash) => currentHash === nextHash ? currentHash : nextHash);
      if (window.location.hash !== `#${currentId}`) {
        window.history.replaceState(null, '', nextHash);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 72);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const handleLinkClick = (hash) => {
    setIsMobileMenuOpen(false);
    setActiveHash(hash);
  };

  const publicLinks = [
    { name: 'Beranda', path: '/#beranda' },
    { name: 'Cari Faskes', path: '/#cari-fk' },
    { name: 'Tentang Kami', path: '/#tentang' },
    { name: 'Hubungi Kami', path: '/#hubungi-kami' },
  ];

  return (
    <header className={`fixed top-3 left-3 right-3 md:left-1/2 md:-translate-x-1/2 z-50 bg-white/90  backdrop-blur-lg border border-border/50  rounded-2xl md:rounded-full shadow-lg shadow-black/5 transition-all duration-300 ${isScrolled ? 'md:top-4 md:w-[62%] md:max-w-4xl' : 'md:top-6 md:w-[90%] md:max-w-5xl'}`}>
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setActiveHash('#beranda')} className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary/30 transition-colors">
              <HeartPulse className="h-5 w-5 md:h-6 md:w-6 text-accent " />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-text ">
              Rujuk<span className="text-accent ">Cepat</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-6 lg:gap-8">
              {publicLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-sm font-semibold transition-colors hover:text-accent  ${
                    activeHash === link.path
                      ? 'text-accent '
                      : 'text-muted '
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex shrink-0">
              {role !== 'guest' ? (
                <Link to={`/${role.replace('_', '-')}`}>
                  <Button variant="primary" className="rounded-full px-6">Dashboard</Button>
                </Link>
              ) : (
                <Button variant="primary" className="rounded-full px-6" onClick={openLogin}>Masuk</Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="p-2 text-text  bg-secondary/50  rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[110%] left-0 right-0 bg-white  border border-border  rounded-2xl shadow-xl py-4 px-4 overflow-hidden">
          <nav className="flex flex-col gap-2">
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-semibold py-3 px-4 rounded-xl transition-colors ${
                  activeHash === link.path
                    ? 'bg-secondary  text-accent '
                    : 'text-muted  hover:bg-gray-50 '
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border ">
              {role !== 'guest' ? (
                <Link to={`/${role.replace('_', '-')}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl">Masuk Dashboard</Button>
                </Link>
              ) : (
                <Button className="w-full rounded-xl" onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLogin();
                }}>Masuk</Button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLogin}
        initialMode={authMode}
      />
    </header>
  );
}
