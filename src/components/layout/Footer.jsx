import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a120e] border-t border-border dark:border-border-dark pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-accent dark:text-primary" />
              <span className="font-bold text-xl tracking-tight text-text dark:text-text-dark">
                Rujuk<span className="text-accent dark:text-primary">Cepat</span>
              </span>
            </Link>
            <p className="text-muted dark:text-gray-400 text-sm leading-relaxed">
              Platform integrasi layanan kesehatan yang menghubungkan rumah sakit, pasien, dan apotek dalam satu sistem digital terpadu untuk mempercepat akses informasi dan proses rujukan medis.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted hover:text-accent dark:hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-accent dark:hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-accent dark:hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-text dark:text-text-dark mb-4">Layanan</h4>
            <ul className="space-y-3">
              <li><Link to="/cari-rs" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Cari Rumah Sakit</Link></li>
              <li><Link to="/cari-rs" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Cari Dokter Spesialis</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Informasi Ketersediaan Bed</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Integrasi Apotek</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text dark:text-text-dark mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              <li><Link to="/tentang" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="/hubungi-kami" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Hubungi Kami</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Karir</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-accent dark:hover:text-primary transition-colors">Blog & Berita</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-text dark:text-text-dark mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted dark:text-gray-400">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Gedung Kemenkes Lt. 3<br/>Jl. H.R. Rasuna Said Kav 4-9<br/>Jakarta Selatan 12950</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted dark:text-gray-400">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>1-500-567 (Halo Kemenkes)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted dark:text-gray-400">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>halo@rujukcepat.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border dark:border-border-dark flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted dark:text-gray-500">
            &copy; {new Date().getFullYear()} RujukCepat. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-muted dark:text-gray-500">
            <Link to="#" className="hover:text-accent dark:hover:text-primary transition-colors">Syarat & Ketentuan</Link>
            <Link to="#" className="hover:text-accent dark:hover:text-primary transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
