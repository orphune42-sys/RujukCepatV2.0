import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionWaveBackground from '../../components/shared/SectionWaveBackground';

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

function SlideIn({ children, delay = 0, direction = 'left', className = '' }) {
  const [ref, inView] = useScrollAnimation();
  const x = direction === 'left' ? -50 : 50;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={inView
        ? { opacity: 1, x: 0 }
        : { opacity: 0, x }
      }
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const contactItems = [
  {
    Icon: MapPin,
    title: 'Kantor Pusat',
    lines: ['Gedung Kemenkes Lt. 3', 'Jl. H.R. Rasuna Said Kav 4-9', 'Jakarta Selatan 12950'],
  },
  {
    Icon: Phone,
    title: 'Telepon',
    lines: ['1-500-567 (Halo Kemenkes)', 'Senin – Jumat, 08:00–16:00 WIB'],
  },
  {
    Icon: Mail,
    title: 'Email',
    lines: ['halo@rujukcepat.go.id', 'support@rujukcepat.go.id'],
  },
];

const inputClass =
  'w-full h-11 px-4 rounded-xl border border-border  bg-[#f8faf9]  text-text  focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all placeholder:text-muted/50 text-sm';

export default function HubungiKami() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div className="relative isolate overflow-hidden bg-white  pt-24 pb-24">
      <SectionWaveBackground />
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-5xl">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text  mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted  max-w-2xl mx-auto leading-relaxed">
            Ada pertanyaan terkait integrasi fasilitas kesehatan atau kendala teknis?
            Tim kami siap membantu.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Contact Info ── */}
          <SlideIn direction="left" delay={0.1} className="lg:col-span-2">
            <div className="bg-white  rounded-2xl border border-border  shadow-sm p-8 space-y-8">
              {contactItems.map(({ Icon, title, lines }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4"
                >
                  <motion.div
                    className="shrink-0 bg-primary/15  p-3 rounded-xl h-fit"
                    whileHover={{ scale: 1.12, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="h-5 w-5 text-accent " />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-text  mb-1">{title}</h3>
                    {lines.map((l, j) => (
                      <p key={j} className="text-sm text-muted ">{l}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </SlideIn>

          {/* ── Form ── */}
          <SlideIn direction="right" delay={0.2} className="lg:col-span-3">
            <div className="bg-white  rounded-2xl border border-border  shadow-sm p-8">
              <h3 className="text-2xl font-bold text-text  mb-7">Kirim Pesan</h3>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsSuccessOpen(true); }}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-text">Nama Lengkap</label>
                    <input type="text" className={inputClass} placeholder="Masukkan nama Anda" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-text">Email</label>
                    <input type="email" className={inputClass} placeholder="Masukkan email Anda" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-text">Subjek</label>
                  <input type="text" className={inputClass} placeholder="Topik pesan Anda" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-text">Pesan</label>
                  <textarea
                    className={`${inputClass} h-auto min-h-[140px] resize-y py-3`}
                    placeholder="Jelaskan kendala atau pertanyaan Anda secara detail..."
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full md:w-auto gap-2 shadow-md shadow-primary/20" size="lg">
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </motion.div>
              </form>
            </div>
          </SlideIn>

        </div>
      </div>

      {isSuccessOpen && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-[#102719]/45 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsSuccessOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative w-full max-w-md rounded-3xl bg-white  p-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" onClick={() => setIsSuccessOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:bg-secondary hover:text-text  " aria-label="Tutup notifikasi">
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-accent text-white ">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 id="success-title" className="text-2xl font-bold text-text ">Pesan berhasil dikirim</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted ">Terima kasih sudah menghubungi kami. Tim RujukCepat akan meninjau pesan Anda dan segera merespons.</p>
            <Button type="button" onClick={() => setIsSuccessOpen(false)} className="mt-7 w-full justify-center">Kembali</Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
