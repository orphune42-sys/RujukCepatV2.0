import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Target, Shield, Users } from 'lucide-react';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';

export default function Tentang() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 bg-white dark:bg-[#15241b] border-b border-border dark:border-border-dark">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={slideUp} className="flex justify-center mb-6">
              <div className="bg-primary/20 p-4 rounded-2xl">
                <HeartPulse className="h-12 w-12 text-accent dark:text-primary" />
              </div>
            </motion.div>
            <motion.h1 variants={slideUp} className="text-4xl font-bold text-text dark:text-text-dark mb-4">
              Tentang RujukCepat
            </motion.h1>
            <motion.p variants={slideUp} className="text-xl text-muted dark:text-gray-400">
              Menghubungkan fasilitas kesehatan untuk pelayanan pasien yang lebih baik, cepat, dan transparan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Misi */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#15241b] p-8 rounded-2xl shadow-sm border border-border dark:border-border-dark text-center"
            >
              <Target className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text dark:text-text-dark mb-3">Visi Kami</h3>
              <p className="text-muted dark:text-gray-400 leading-relaxed">
                Menjadi platform integrasi layanan kesehatan digital nomor satu di Indonesia yang mendobrak batas geografis dan birokrasi.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#15241b] p-8 rounded-2xl shadow-sm border border-border dark:border-border-dark text-center"
            >
              <Shield className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text dark:text-text-dark mb-3">Keamanan</h3>
              <p className="text-muted dark:text-gray-400 leading-relaxed">
                Infrastruktur kami dibangun dengan standar keamanan medis tertinggi untuk melindungi privasi data rekam medis pasien.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#15241b] p-8 rounded-2xl shadow-sm border border-border dark:border-border-dark text-center"
            >
              <Users className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text dark:text-text-dark mb-3">Kolaborasi</h3>
              <p className="text-muted dark:text-gray-400 leading-relaxed">
                Kami percaya pada kekuatan kolaborasi antar rumah sakit, apotek, dan pemangku kebijakan untuk melayani masyarakat.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cerita Kami */}
      <section className="py-20 bg-white dark:bg-[#15241b] border-t border-border dark:border-border-dark">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert max-w-none text-muted dark:text-gray-400"
          >
            <h2 className="text-3xl font-bold text-text dark:text-text-dark text-center mb-8">Perjalanan Kami</h2>
            <p>
              Berawal dari permasalahan antrean panjang pasien rujukan di rumah sakit rujukan tingkat pusat, RujukCepat diinisiasi pada tahun 2026 sebagai solusi digital untuk menjembatani komunikasi antar fasilitas kesehatan.
            </p>
            <p>
              Kami melihat bahwa seringkali pasien tiba di rumah sakit tujuan namun kamar ICU atau fasilitas yang dibutuhkan ternyata penuh. Dengan RujukCepat, rumah sakit perujuk dapat melihat ketersediaan fasilitas secara real-time dan melakukan booking rujukan sebelum pasien diberangkatkan.
            </p>
            <p>
              Kini, di versi 2.0, RujukCepat telah mengintegrasikan ribuan rumah sakit, klinik, dan jaringan apotek di seluruh Indonesia, memudahkan pasien untuk tidak hanya mendapatkan rujukan layanan medis, tetapi juga kepastian pengambilan obat tanpa perlu mengantre.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
