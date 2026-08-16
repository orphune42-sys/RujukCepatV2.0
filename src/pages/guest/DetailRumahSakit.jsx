import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MapView from '../../components/shared/MapView';
import { staggerContainer, slideUp, fadeIn } from '../../utils/animations';
import mockHospitals from '../../data/hospitals.json';
import useAppStore from '../../store/useAppStore';

export default function DetailRumahSakit() {
  const { id } = useParams();
  const location = useLocation();
  const { role } = useAppStore();
  const hospital = mockHospitals.find(h => h.id === id) || mockHospitals[0];
  const isHospital = hospital.type.toLowerCase().includes('rumah sakit') || hospital.type.toLowerCase().includes('rs');
  const isAdminRsRoute = location.pathname.startsWith('/admin-rs');
  const isPasienRoute = location.pathname.startsWith('/pasien');
  const backPath = isAdminRsRoute ? "/admin-rs/rekomendasi" : isPasienRoute ? "/pasien/cari-layanan" : "/#cari-fk";

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header / Hero */}
      <div className="relative h-[300px] md:h-[420px] overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

        {/* Top Left Back Button */}
        <div className="absolute top-6 left-4 md:left-6 z-20">
          <Link
            to={backPath}
            className="inline-flex items-center text-white bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
          </Link>
        </div>

        <div className="absolute inset-0 pt-16 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-8">
            <motion.div initial="initial" animate="animate" variants={fadeIn}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {isHospital && hospital.class && (
                  <Badge variant="primary" className="bg-[#9ccda5] text-[#0f1913] hover:bg-[#b0dbb8] transition-colors font-bold px-3 py-1 text-xs">
                    Tipe Kelas {hospital.class}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-sm">{hospital.name}</h1>
              <p className="text-gray-200 text-sm md:text-base flex items-center gap-2 max-w-2xl bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-white/5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" /> {hospital.address}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-8">

              {/* Ketersediaan */}
              <motion.section variants={slideUp}>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-bold text-gray-950">Kapasitas & Ketersediaan Ruangan</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white border border-border shadow-sm hover:border-[#9ccda5]/40 transition-all duration-300">
                    <CardContent className="p-5 flex flex-col justify-between h-32">
                      <div>
                        <span className="text-sm font-semibold text-gray-500">IGD</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-extrabold text-gray-900">{hospital.availability?.igd ?? 0}</span>
                        <span className="text-sm text-gray-400">Bed</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border border-border shadow-sm hover:border-[#9ccda5]/40 transition-all duration-300">
                    <CardContent className="p-5 flex flex-col justify-between h-32">
                      <div>
                        <span className="text-sm font-semibold text-gray-500">ICU</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-extrabold text-gray-900">{hospital.availability?.icu ?? 0}</span>
                        <span className="text-sm text-gray-400">Bed</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border border-border shadow-sm hover:border-[#9ccda5]/40 transition-all duration-300">
                    <CardContent className="p-5 flex flex-col justify-between h-32">
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Rawat Inap</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-extrabold text-gray-900">{hospital.availability?.rawatInap ?? 0}</span>
                        <span className="text-sm text-gray-400">Bed</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.section>

              {/* Layanan Unggulan */}
              {hospital.specialties && hospital.specialties.length > 0 && (
                <motion.section variants={slideUp} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-950">Layanan & Poli Spesialis</h2>
                  <div className="bg-white border border-border p-6 rounded-2xl shadow-sm space-y-4">
                    <p className="text-sm text-gray-500">Fasilitas kesehatan ini menyediakan poliklinik dan dokter spesialis dengan keahlian khusus berikut:</p>
                    <div className="flex flex-wrap gap-2.5">
                      {hospital.specialties.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary/50 text-gray-800 text-sm font-semibold border border-border/50 hover:border-accent/40 transition-all cursor-default"
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-white border border-border shadow-md sticky top-[90px] rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-8 space-y-6">
                {role !== 'pasien' && (
                  <Link to="/login" className="block">
                    <Button size="lg" className="w-full text-base py-5 shadow-lg shadow-primary/10 rounded-xl font-bold">
                      Buat Rujukan Resmi
                    </Button>
                  </Link>
                )}

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kontak Hubungan Darurat</h4>
                    <a
                      href={`tel:${hospital.phone}`}
                      className="inline-flex items-center gap-2.5 text-accent font-bold text-xl hover:opacity-80 transition-opacity"
                    >
                      <Phone className="h-5 w-5" /> {hospital.phone}
                    </a>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Integrasi Peta Fasilitas</h4>
                    <div className="rounded-xl overflow-hidden shadow-sm h-[280px] border border-border relative">
                      <MapView hospitals={[hospital]} height="100%" center={[hospital.lat, hospital.lng]} zoom={15} />
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center text-accent text-sm font-semibold hover:underline"
                    >
                      Buka Rute Navigasi di Google Maps <ArrowLeft className="h-4 w-4 ml-1.5 rotate-[135deg]" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
