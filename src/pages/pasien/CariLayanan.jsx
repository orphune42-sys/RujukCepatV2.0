import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer, fadeIn } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, MapPin } from 'lucide-react';
import facilities from '../../data/hospitals.json';

const services = [
  { id: 'RS-001', name: 'RSUD Dr. Saiful Anwar', type: 'rumah-sakit', distance: '2.5 km', address: 'Jl. Jaksa Agung Suprapto No. 2', queue: '12 Orang', rooms: '8 Kamar', available: true },
  { id: 'RS-002', name: 'RS Lavalette', type: 'rumah-sakit', distance: '4.1 km', address: 'Jl. W.R. Supratman No. 10', queue: '5 Orang', rooms: '12 Kamar', available: true },
  { id: 'PKM-001', name: 'Puskesmas Dinoyo', type: 'puskesmas', distance: '3.2 km', address: 'Jl. MT. Haryono No. 134', queue: '7 Orang', rooms: '4 Ruang', available: true },
  { id: 'KLINIK-001', name: 'Klinik Rawat Inap Brawijaya', type: 'klinik', distance: '2.8 km', address: 'Jl. Veteran No. 8', queue: '9 Orang', rooms: '6 Ruang', available: true },
  { id: 'APOTEK-001', name: 'Apotek K24 Soekarno Hatta', type: 'apotek', distance: '1.6 km', address: 'Jl. Soekarno Hatta No. 8', queue: '3 Orang', rooms: 'Obat tersedia', available: true },
].map((service) => {
  const fac = facilities.find((facility) => facility.id === service.id);
  return {
    ...service,
    image: fac?.image,
    class: fac?.class,
    facilityType: fac?.type || (service.type === 'rumah-sakit' ? 'Rumah Sakit' : service.type.charAt(0).toUpperCase() + service.type.slice(1)),
  };
});

export default function CariLayanan() {
  const [activeTab, setActiveTab] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const tabs = [
    { id: 'semua', label: 'Semua' },
    { id: 'rumah-sakit', label: 'Rumah Sakit' },
    { id: 'puskesmas', label: 'Puskesmas' },
    { id: 'klinik', label: 'Klinik' },
    { id: 'apotek', label: 'Apotek' },
  ];

  const visibleServices = services.filter((service) =>
    (activeTab === 'semua' || service.type === activeTab) &&
    `${service.name} ${service.address}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="max-w-7xl mx-auto space-y-8 sm:p-2 lg:p-6" variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={slideUp} className="space-y-2">
        <h1 className="text-3xl font-black text-gray-950 tracking-tight">Cari Layanan Kesehatan</h1>
        <p className="text-gray-500 text-sm md:text-base">Temukan rumah sakit, klinik, puskesmas, dan apotik terdekat dengan informasi ketersediaan real-time.</p>
      </motion.div>

      <motion.form variants={slideUp} className="flex flex-col sm:flex-row gap-3" onSubmit={(event) => event.preventDefault()}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Cari nama faskes, alamat, atau jenis layanan..."
            className="h-12 w-full rounded-xl border border-border bg-[#f8faf9] pl-11 pr-4 text-sm text-text placeholder:text-muted/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/60"
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="px-8 rounded-2xl font-bold shadow-md shadow-primary/10">Cari Faskes</Button>
      </motion.form>

      <motion.div variants={slideUp} className="flex overflow-x-auto pb-2 gap-2.5 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-accent text-white shadow-md shadow-accent/15'
                : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 min-[1800px]:grid-cols-3 gap-6">
        {visibleServices.map((service) => (
          <Card key={service.id} hover className="flex flex-col border border-border/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {/* Full-width image at top of card */}
            <div className="relative w-full h-44 overflow-hidden">
              <img src={service.image} alt={`Foto ${service.name}`} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="bg-[#9ccda5] text-[#0f1913] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {service.class ? `Kelas ${service.class}` : service.facilityType}
                </span>
              </div>
            </div>

            <CardContent className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-950 mb-1.5 tracking-tight line-clamp-1">{service.name}</h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-accent" />
                  <span className="truncate">{service.distance} · {service.address}</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Antrean Saat Ini</span>
                  <span className="text-gray-900">{service.queue}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Ketersediaan Ruang</span>
                  <span className="text-gray-900">{service.rooms}</span>
                </div>
                <div className="mt-5">
                  <Button
                    variant="primary"
                    className="h-12 w-full rounded-xl text-sm font-bold flex items-center justify-center gap-1"
                    onClick={() => navigate(`/pasien/detailrs/${service.id}`)}
                  >
                    Pilih
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {visibleServices.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-12 text-center text-muted font-medium text-sm">
            Layanan tidak ditemukan.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
