import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import RC_Logo1 from '../../assets/RC_Logo1.png';

export default function Footer() {
  return (
    <footer className="bg-white  border-t border-border  pt-10 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src={RC_Logo1} alt="RujukCepat Logo" className="h-14 md:h-16 w-auto object-contain" />
            </Link>
            <p className="text-muted  text-sm leading-relaxed">
              Platform integrasi layanan kesehatan yang menghubungkan rumah sakit, pasien, dan apotek dalam satu sistem digital terpadu.
            </p>

          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-text  mb-4">Layanan</h4>
            <ul className="space-y-3">
              <li><Link to="/cari-rs" className="text-sm text-muted hover:text-accent  transition-colors">Cari Rumah Sakit</Link></li>
              <li><Link to="/cari-rs" className="text-sm text-muted hover:text-accent  transition-colors">Cari Dokter Spesialis</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-accent  transition-colors">Informasi Ketersediaan Bed</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-accent  transition-colors">Integrasi Apotek</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text  mb-4">Informasi</h4>
            <ul className="space-y-3">
              <li><Link to="/tentang" className="text-sm text-muted hover:text-accent  transition-colors">Tentang Kami</Link></li>
              <li><Link to="/hubungi-kami" className="text-sm text-muted hover:text-accent  transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-text  mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted ">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Gedung Kemenkes Lt. 3<br/>Jl. H.R. Rasuna Said Kav 4-9<br/>Jakarta Selatan 12950</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted ">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>1-500-567 (Halo Kemenkes)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted ">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>halo@rujukcepat.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border  flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted ">
            &copy; {new Date().getFullYear()} RujukCepat. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-muted ">
            <Link to="#" className="hover:text-accent  transition-colors">Syarat & Ketentuan</Link>
            <Link to="#" className="hover:text-accent  transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
