import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';

import CariRumahSakit from './CariRumahSakit';
import Tentang from './Tentang';
import HubungiKami from './HubungiKami';
import HeroIllustration from '../../assets/medical.svg';

/**
 * Wraps children with a fade+slide+blur reveal triggered ONCE when entering viewport.
 * `id` is forwarded directly to the DOM element so IntersectionObserver can find it.
 */
function SectionReveal({ children, id, className = '', delay = 0 }) {
  const ref = useRef(null);
  // once: false → re-animates every time section enters viewport
  // margin negative membuat animasi trigger saat element sudah masuk cukup ke layar
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`scroll-mt-24 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div id="beranda" className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 overflow-hidden">
        {/* Background Base */}
        <div className="absolute inset-0 bg-white dark:bg-[#0a1710] z-0" />
        
        {/* Huge Wavy Background Shape (Matches Reference) */}
        <div className="absolute bottom-0 right-0 w-full md:w-[150%] lg:w-[120%] z-0 text-[#f0f9f3] dark:text-primary/10 pointer-events-none" style={{ right: '-10%', bottom: '-10%' }}>
          <svg viewBox="0 0 1440 600" className="w-full h-auto drop-shadow-xl" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,450 C300,550 500,200 900,300 C1200,400 1440,50 1440,50 L1440,600 L0,600 Z"></path>
          </svg>
        </div>
        
        {/* Secondary wave layer for depth */}
        <div className="absolute bottom-0 right-0 w-full md:w-[140%] lg:w-[110%] z-0 text-primary/10 dark:text-primary/5 pointer-events-none" style={{ right: '-5%', bottom: '-5%' }}>
          <svg viewBox="0 0 1440 600" className="w-full h-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 C400,600 600,100 1000,250 C1300,350 1440,150 1440,150 L1440,600 L0,600 Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-text dark:text-text-dark mb-6 leading-[1.15]"
                initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Akses Layanan Kesehatan<br />
                <span className="text-accent dark:text-primary">Lebih Cepat &amp; Terpadu</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted dark:text-gray-400 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                Platform integrasi layanan kesehatan yang menghubungkan rumah sakit, pasien,
                dan apotek dalam satu sistem digital terpadu.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to="/register">
                  <Button size="lg" className="group shadow-lg shadow-primary/25">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a href="#cari-fk">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border-gray-200">
                    Cari Rumah Sakit
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Cartoon Illustration */}
            <div className="relative w-full flex justify-center items-center">
              <motion.img
                src={HeroIllustration}
                alt="Healthcare Collaboration"
                className="w-full max-w-[500px] h-auto drop-shadow-2xl"
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
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



    </div>
  );
}
