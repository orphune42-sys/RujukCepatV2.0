import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowLeft, Activity, Stethoscope, Bed } from 'lucide-react';
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
  const isApotek = hospital.type.toLowerCase().includes('apotek');
  const isAdminRsRoute = location.pathname.startsWith('/admin-rs');
  const isPasienRoute = location.pathname.startsWith('/pasien');
  const backPath = isAdminRsRoute ? "/admin-rs/rekomendasi" : isPasienRoute ? "/pasien/cari-layanan" : "/#cari-fk";
  const availabilityRooms = [
    { id: 'igd', name: 'IGD (Instalasi Gawat Darurat)', icon: Activity, available: hospital.availability?.igd ?? 0, total: hospital.availability?.totalIgd ?? 25 },
    { id: 'icu', name: 'ICU (Intensive Care Unit)', icon: Stethoscope, available: hospital.availability?.icu ?? 0, total: hospital.availability?.totalIcu ?? 15 },
    { id: 'rawat-inap', name: 'Rawat Inap', icon: Bed, available: hospital.availability?.rawatInap ?? 0, total: hospital.availability?.totalRawatInap ?? 100 },
  ];

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

      <div className="w-full max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 md:px-6 mt-8">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-8">

              {/* Ketersediaan */}
              <motion.section variants={slideUp}>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-bold text-gray-950">
                    {isApotek ? "Daftar Obat Tersedia" : "Kapasitas & Ketersediaan Ruangan"}
                  </h2>
                </div>
                {isApotek ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Card className="p-4 flex items-center justify-between border border-border shadow-sm rounded-xl">
                        <div>
                          <p className="font-bold text-gray-900">Paracetamol 500mg</p>
                          <p className="text-xs text-gray-500">Stok: 150 Strip</p>
                        </div>
                        <Badge variant="success" className="bg-green-100 text-green-700">Tersedia</Badge>
                     </Card>
                     <Card className="p-4 flex items-center justify-between border border-border shadow-sm rounded-xl">
                        <div>
                          <p className="font-bold text-gray-900">Amoxicillin 500mg</p>
                          <p className="text-xs text-gray-500">Stok: 85 Strip</p>
                        </div>
                        <Badge variant="success" className="bg-green-100 text-green-700">Tersedia</Badge>
                     </Card>
                     <Card className="p-4 flex items-center justify-between border border-border shadow-sm rounded-xl">
                        <div>
                          <p className="font-bold text-gray-900">Vitamin C 1000mg</p>
                          <p className="text-xs text-gray-500">Stok: 200 Botol</p>
                        </div>
                        <Badge variant="success" className="bg-green-100 text-green-700">Tersedia</Badge>
                     </Card>
                     <Card className="p-4 flex items-center justify-between border border-border shadow-sm rounded-xl bg-gray-50/50">
                        <div>
                          <p className="font-bold text-gray-400">Sirup OBH Combi 100ml</p>
                          <p className="text-xs text-gray-400">Stok: 0 Botol</p>
                        </div>
                        <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-100">Habis</Badge>
                     </Card>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {availabilityRooms.map((room) => {
                      const occupied = Math.max(0, room.total - room.available);
                      const occupancyRate = Math.min(100, (occupied / room.total) * 100);
                      const Icon = room.icon;

                      return (
                        <Card key={room.id} hover className="flex h-full flex-col justify-between">
                          <CardContent className="p-5 flex flex-col h-full">
                            <div className="mb-5 flex items-start justify-between">
                              <div className="rounded-xl bg-accent p-3 text-white"><Icon className="h-5 w-5" /></div>
                              <div className="text-right"><p className="text-xs font-medium uppercase tracking-wider text-gray-500">Tersedia</p><h3 className="text-3xl font-bold text-gray-900">{room.available}</h3></div>
                            </div>
                            <h3 className="mb-4 text-base font-semibold text-gray-900 flex-1">{room.name}</h3>
                            <div className="space-y-2 mt-auto"><div className="flex justify-between text-sm"><span className="text-gray-500">Terisi: {occupied}</span><span className="text-gray-500">Total: {room.total}</span></div><div className="h-2 w-full overflow-hidden rounded-full bg-gray-200"><div className="h-full bg-accent transition-all duration-500" style={{ width: `${occupancyRate}%` }} /></div></div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
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

                {role !== 'pasien' && (
                  <div className="pt-6 border-t border-border mt-6">
                    <Link to="/login" className="block">
                      <Button size="lg" className="w-full text-base py-4 shadow-lg shadow-primary/10 rounded-xl font-bold">
                        Buat Rujukan Resmi
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
