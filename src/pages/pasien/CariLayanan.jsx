import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer, fadeIn } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, MapPin, Building, Navigation } from 'lucide-react';

const services = [
  { id: 1, name: 'RSUD Kota Malang', type: 'rumah-sakit', distance: '2.5 km', address: 'Jl. Wirosaban No. 1', queue: '12 Orang', rooms: '8 Kamar', available: false },
  { id: 2, name: 'RSUP Dr. Sardjito', type: 'rumah-sakit', distance: '4.1 km', address: 'Jl. Kesehatan No. 1', queue: '5 Orang', rooms: '12 Kamar', available: true },
  { id: 3, name: 'IGD RS Umum Lavalette', type: 'igd', distance: '3.2 km', address: 'Jl. WR. Supratman No. 10', queue: '7 Orang', rooms: '4 Kamar', available: true },
  { id: 4, name: 'Poli Penyakit Dalam', type: 'spesialis', distance: '2.8 km', address: 'RS Universitas Brawijaya', queue: '9 Orang', rooms: '6 Kamar', available: true },
];

export default function CariLayanan() {
  const [activeTab, setActiveTab] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const tabs = [
    { id: 'semua', label: 'Semua' },
    { id: 'rumah-sakit', label: 'Rumah Sakit' },
    { id: 'igd', label: 'IGD Darurat' },
    { id: 'spesialis', label: 'Spesialis' },
  ];
  const visibleServices = services.filter((service) =>
    (activeTab === 'semua' || service.type === activeTab) && `${service.name} ${service.address}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6" variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={slideUp}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cari Layanan Kesehatan</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Temukan fasilitas dan layanan terdekat dengan Anda.</p>
      </motion.div>

      <motion.form variants={slideUp} className="flex flex-col sm:flex-row gap-2" onSubmit={(event) => event.preventDefault()}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Cari nama rumah sakit, fasilitas kesehatan, atau layanan..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15241b] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm" />
        </div>
        <Button type="submit" variant="primary" size="lg" className="px-6">Cari</Button>
      </motion.form>

      <motion.div variants={slideUp} className="flex overflow-x-auto pb-2 gap-2">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${activeTab === tab.id ? 'bg-accent text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-secondary dark:hover:bg-gray-700'}`}>
            {tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibleServices.map((service) => (
          <Card key={service.id} hover className="flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary/50 dark:bg-black/20 rounded-lg"><Building className="w-6 h-6 text-accent" /></div>
                <Badge variant={service.available ? 'success' : 'warning'}>{service.available ? 'Tersedia' : 'Penuh'}</Badge>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{service.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3"><MapPin className="w-4 h-4 shrink-0" /><span>{service.distance} · {service.address}</span></div>
              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Antrean IGD</span><span className="font-medium text-gray-900 dark:text-white">{service.queue}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Kamar Kosong</span><span className="font-medium text-gray-900 dark:text-white">{service.rooms}</span></div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button variant="outline" className="flex-1" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name)}`, '_blank', 'noopener,noreferrer')}><Navigation className="w-4 h-4 mr-2" /> Rute</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate(`/pasien/rujukan/RJ-20261015-${service.id}A`)}>Pilih</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {visibleServices.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-muted">Layanan tidak ditemukan.</p>}
      </motion.div>
    </motion.div>
  );
}
