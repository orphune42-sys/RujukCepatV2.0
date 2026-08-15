import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer, fadeIn } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, MapPin, Building, Building2, Home, Stethoscope, Pill, Navigation, ArrowRight } from 'lucide-react';

const services = [
  { id: 'RS-001', name: 'RSUD Dr. Saiful Anwar', type: 'rumah-sakit', distance: '2.5 km', address: 'Jl. Jaksa Agung Suprapto No. 2', queue: '12 Orang', rooms: '8 Kamar', available: true },
  { id: 'RS-002', name: 'RS Lavalette', type: 'rumah-sakit', distance: '4.1 km', address: 'Jl. W.R. Supratman No. 10', queue: '5 Orang', rooms: '12 Kamar', available: true },
  { id: 'PKM-001', name: 'Puskesmas Dinoyo', type: 'puskesmas', distance: '3.2 km', address: 'Jl. MT. Haryono No. 134', queue: '7 Orang', rooms: '4 Ruang', available: true },
  { id: 'KLINIK-001', name: 'Klinik Rawat Inap Brawijaya', type: 'klinik', distance: '2.8 km', address: 'Jl. Veteran No. 8', queue: '9 Orang', rooms: '6 Ruang', available: true },
  { id: 'APOTEK-001', name: 'Apotek K24 Soekarno Hatta', type: 'apotek', distance: '1.6 km', address: 'Jl. Soekarno Hatta No. 8', queue: '3 Orang', rooms: 'Obat tersedia', available: true },
];

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

  const getServiceIcon = (type) => {
    switch (type) {
      case 'rumah-sakit':
        return <Building2 className="w-6 h-6 text-accent dark:text-primary" />;
      case 'puskesmas':
        return <Home className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'klinik':
        return <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'apotek':
        return <Pill className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      default:
        return <Building className="w-6 h-6 text-gray-600 dark:text-gray-400" />;
    }
  };

  const visibleServices = services.filter((service) =>
    (activeTab === 'semua' || service.type === activeTab) && `${service.name} ${service.address}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="max-w-7xl mx-auto space-y-8 sm:p-2 lg:p-6" variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={slideUp} className="space-y-2">
        <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Cari Layanan Kesehatan</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Temukan rumah sakit, klinik, puskesmas, dan apotik terdekat dengan informasi ketersediaan real-time.</p>
      </motion.div>

      <motion.form variants={slideUp} className="flex flex-col sm:flex-row gap-3" onSubmit={(event) => event.preventDefault()}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="search" 
            value={searchTerm} 
            onChange={(event) => setSearchTerm(event.target.value)} 
            placeholder="Cari nama faskes, alamat, atau jenis layanan..." 
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15241b] text-gray-950 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm font-medium text-sm" 
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
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === tab.id 
                ? 'bg-accent dark:bg-primary text-white dark:text-[#0f1913] shadow-md shadow-accent/15' 
                : 'bg-white dark:bg-[#15241b] text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1c3626] hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleServices.map((service) => (
          <Card key={service.id} hover className="flex flex-col border border-border/80 dark:border-border-dark/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-secondary/50 dark:bg-black/35 rounded-2xl border border-border/10">
                    {getServiceIcon(service.type)}
                  </div>
                  <Badge variant={service.available ? 'success' : 'warning'} className="font-extrabold uppercase text-[10px] tracking-widest px-2.5 py-1">
                    {service.available ? 'Tersedia' : 'Penuh'}
                  </Badge>
                </div>
                <h3 className="font-bold text-xl text-gray-950 dark:text-white mb-2 tracking-tight line-clamp-1">{service.name}</h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-accent dark:text-primary" />
                  <span className="truncate">{service.distance} · {service.address}</span>
                </div>
              </div>
              
              <div className="space-y-3.5 pt-4 border-t border-gray-100 dark:border-gray-850">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400 uppercase tracking-wider">Antrean Saat Ini</span>
                  <span className="text-gray-900 dark:text-white">{service.queue}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400 uppercase tracking-wider">Ketersediaan Ruang</span>
                  <span className="text-gray-900 dark:text-white">{service.rooms}</span>
                </div>
                <div className="flex gap-2.5 mt-5">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl text-xs font-bold py-3" 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name)}`, '_blank', 'noopener,noreferrer')}
                  >
                    <Navigation className="w-3.5 h-3.5 mr-1.5" /> Rute
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 rounded-xl text-xs font-bold py-3 flex items-center justify-center gap-1" 
                    onClick={() => navigate(`/pasien/detailrs/${service.id}`)}
                  >
                    Pilih <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {visibleServices.length === 0 && <p className="col-span-full rounded-2xl border border-dashed border-border p-12 text-center text-muted font-medium text-sm">Layanan tidak ditemukan.</p>}
      </motion.div>
    </motion.div>
  );
}
