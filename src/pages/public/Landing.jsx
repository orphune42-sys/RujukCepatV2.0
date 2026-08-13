import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Map, Clock, ShieldCheck, ArrowRight, Hospital, FileText, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';

import CariRumahSakit from './CariRumahSakit';
import Tentang from './Tentang';
import HubungiKami from './HubungiKami';

export default function Landing() {
  const features = [
    {
      icon: <Map className="h-6 w-6 text-primary" />,
      title: "Pencarian Fasilitas Terdekat",
      description: "Temukan rumah sakit, klinik, atau apotek terdekat dari lokasi Anda dengan ketersediaan real-time."
    },
    {
      icon: <Activity className="h-6 w-6 text-accent" />,
      title: "Rujukan Terintegrasi",
      description: "Proses rujukan antar faskes yang seamless tanpa perlu membawa berkas fisik."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Estimasi Layanan",
      description: "Dapatkan estimasi waktu tunggu, jadwal dokter, dan kesiapan obat di apotek."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-accent" />,
      title: "Keamanan Data Medis",
      description: "Data rekam medis dijamin kerahasiaannya dan hanya dapat diakses oleh pihak berwenang."
    }
  ];

  const stats = [
    { value: "150+", label: "Fasilitas Kesehatan" },
    { value: "50k+", label: "Pasien Terdaftar" },
    { value: "10k+", label: "Rujukan Berhasil" },
    { value: "99%", label: "Tingkat Kepuasan" },
  ];

  return (
    <div id="beranda" className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 dark:bg-[#15241b]/50 z-0" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent dark:from-primary/5 z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              
              <motion.h1 variants={slideUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text dark:text-text-dark mb-6 leading-tight">
                Akses Layanan Kesehatan Lebih Cepat & Terpadu
              </motion.h1>
              
              <motion.p variants={slideUp} className="text-lg text-muted dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                Platform integrasi layanan kesehatan yang menghubungkan rumah sakit, pasien, dan apotek dalam satu sistem digital terpadu.
              </motion.p>
              
              <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group w-full sm:w-auto">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <a href="#cari-rs" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Cari Rumah Sakit
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tenaga Medis" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="bg-white/90 dark:bg-[#15241b]/90 backdrop-blur-sm rounded-xl p-4 flex items-center shadow-lg w-full max-w-sm">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Rujukan Diterima</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">RSUP Dr. Sardjito • 10 menit lalu</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-[#0a120e] border-y border-border dark:border-border-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border dark:divide-border-dark">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center px-4"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</h3>
                <p className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background dark:bg-background-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4">Layanan Digital Terintegrasi</h2>
            <p className="text-lg text-muted dark:text-gray-400">
              Menghubungkan seluruh ekosistem kesehatan untuk memberikan pengalaman terbaik bagi pasien dan tenaga medis.
            </p>
          </div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <Card key={index} hover className="border-none shadow-md bg-white dark:bg-[#15241b]">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-secondary dark:bg-[#1c3626] flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text dark:text-text-dark">{feature.title}</h3>
                  <p className="text-muted dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <div id="cari-rs" className="scroll-mt-24">
        <CariRumahSakit />
      </div>

      <div id="tentang" className="scroll-mt-24">
        <Tentang />
      </div>

      <div id="hubungi-kami" className="scroll-mt-24">
        <HubungiKami />
      </div>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent dark:bg-[#204a35] z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Memulai Perjalanan Sehat Anda?</h2>
          <p className="text-lg text-[#ddefe3] mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna lainnya yang telah merasakan kemudahan akses layanan kesehatan terpadu.
          </p>
          <Button size="lg" className="bg-white text-accent hover:bg-gray-100 border-none shadow-xl">
            Buat Akun Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
}
