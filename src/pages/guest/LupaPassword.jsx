import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, HeartPulse } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function LupaPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-8 w-8 text-accent" />
            <span className="font-bold text-2xl tracking-tight text-[#009360]">
              Rujuk<span className="text-[#41c379]">Cepat</span>
            </span>
          </div>
        </div>

        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-center text-text mb-2">Lupa Password?</h1>
            <p className="text-center text-muted mb-8 text-sm">
              Masukkan alamat email yang terdaftar, kami akan mengirimkan instruksi untuk mengatur ulang password Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="sr-only">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-secondary/40 border border-transparent focus:border-accent focus:ring-1 focus:ring-accent rounded-2xl outline-none transition-all placeholder:text-muted text-text text-sm"
                    placeholder="Masukkan alamat email"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 rounded-2xl">
                Kirim Instruksi
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">Cek Email Anda</h1>
            <p className="text-muted mb-8 text-sm">
              Kami telah mengirimkan instruksi reset password ke <br/><span className="font-medium text-text">{email}</span>
            </p>
            <Button onClick={() => navigate('/')} className="w-full h-12 rounded-2xl">
              Kembali ke Beranda
            </Button>
          </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </motion.div>
    </div>
  );
}
