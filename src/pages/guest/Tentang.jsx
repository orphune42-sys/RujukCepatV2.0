import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Users } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionWaveBackground from '../../components/shared/SectionWaveBackground';

/* ─── Reusable reveal primitives ─────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, inView] = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={inView
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.88, y: 24 }
      }
      transition={{ duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}

const missions = [
  {
    Icon: Target,
    title: 'Visi Kami',
    desc: 'Membangun jaringan rujukan kesehatan digital terdepan di Indonesia guna mempercepat penanganan medis kritis tanpa kendala administratif.',
  },
  {
    Icon: Shield,
    title: 'Keamanan Data',
    desc: 'Menerapkan standar enkripsi data medis tingkat tinggi untuk menjamin kerahasiaan dan privasi informasi rekam medis pasien.',
  },
  {
    Icon: Users,
    title: 'Sinergi & Kolaborasi',
    desc: 'Mengintegrasikan rumah sakit, klinik, dan apotek untuk menciptakan ekosistem pelayanan kesehatan yang terpadu dan responsif.',
  },
];

export default function Tentang() {
  return (
    <div className="relative isolate overflow-hidden bg-white ">
      <SectionWaveBackground />

      {/* ── Header ── */}
      <section className="relative z-10 pt-24 pb-16 bg-white/90  backdrop-blur-sm border-b border-border ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">

            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold text-text  mb-4">
                Tentang Kami
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-xl text-muted  leading-relaxed">
                RujukCepat adalah sistem rujukan medis terintegrasi yang menghubungkan berbagai tingkat fasilitas kesehatan demi pelayanan pasien yang cepat, efisien, dan transparan di seluruh Indonesia.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Misi ── */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text  mb-3">
              Nilai & Misi Kami
            </h2>
            <p className="text-muted  max-w-xl mx-auto">
              Fondasi yang menopang setiap keputusan dan inovasi yang kami hadirkan.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {missions.map(({ Icon, title, desc }, i) => (
              <ScaleIn key={title} delay={i * 0.12}>
                <motion.div
                  className="group relative bg-white  p-8 rounded-2xl border border-border  text-center overflow-hidden cursor-default"
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow bg on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent  mb-5 mx-auto"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="h-7 w-7 text-white " />
                  </motion.div>

                  <h3 className="text-xl font-bold text-text  mb-3">{title}</h3>
                  <p className="text-muted  leading-relaxed text-sm">{desc}</p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
