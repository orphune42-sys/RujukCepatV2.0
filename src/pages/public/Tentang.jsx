import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Target, Shield, Users, Activity, Map, Clock, ShieldCheck } from 'lucide-react';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';

export default function Tentang() {
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
