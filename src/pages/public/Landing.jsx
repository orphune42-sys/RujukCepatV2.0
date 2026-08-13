import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';

import CariRumahSakit from './CariRumahSakit';
import Tentang from './Tentang';
import HubungiKami from './HubungiKami';

/**
 * Wraps children with a fade+slide+blur reveal triggered ONCE when entering viewport.
 * `id` is forwarded directly to the DOM element so IntersectionObserver can find it.
 */
function SectionReveal({ children, id, className = '', delay = 0 }) {
  const ref = useRef(null);
  // once: false → re-animates every time section enters viewport
  const inView = useInView(ref, { once: false, margin: '-5% 0px -5% 0px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`scroll-mt-24 ${className}`}
      initial={{ opacity: 0, y: 70, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 70, filter: 'blur(10px)' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div id="beranda" className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40 dark:bg-[#0d1f15]/70 z-0" />
        {/* Animated orb */}
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full z-0"
          style={{ background: 'radial-gradient(circle, rgba(74,177,90,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text dark:text-text-dark mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 50, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Akses Layanan Kesehatan<br />
            <span className="text-accent dark:text-primary">Lebih Cepat &amp; Terpadu</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Platform integrasi layanan kesehatan yang menghubungkan rumah sakit, pasien,
            dan apotek dalam satu sistem digital terpadu.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button size="lg" className="group shadow-lg shadow-primary/25">
              Daftar Sekarang
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <a href="#cari-fk">
              <Button variant="outline" size="lg" className="w-full sm:w-auto backdrop-blur-sm">
                Cari Rumah Sakit
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            {[
              { val: '150+', label: 'Fasilitas Kesehatan' },
              { val: '50k+', label: 'Pasien Terdaftar' },
              { val: '10k+', label: 'Rujukan Berhasil' },
              { val: '99%',  label: 'Tingkat Kepuasan' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.75 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent dark:text-primary">{s.val}</p>
                <p className="text-xs text-muted uppercase tracking-widest mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Cari RS — id DIRECTLY on motion.div ── */}
      <SectionReveal id="cari-fk">
        <CariRumahSakit />
      </SectionReveal>

      {/* ── Tentang ── */}
      <SectionReveal id="tentang" delay={0}>
        <Tentang />
      </SectionReveal>

      {/* ── Hubungi Kami ── */}
      <SectionReveal id="hubungi-kami" delay={0}>
        <HubungiKami />
      </SectionReveal>

      {/* ── CTA Banner ── */}
      <SectionReveal delay={0}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-accent dark:bg-[#204a35] z-0" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
            style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
          />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Memulai Perjalanan Sehat Anda?</h2>
            <p className="text-lg text-[#ddefe3] mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna lainnya yang telah merasakan kemudahan akses layanan kesehatan terpadu.
            </p>
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 border-none shadow-xl">
              Buat Akun Sekarang
            </Button>
          </div>
        </div>
      </SectionReveal>

    </div>
  );
}
