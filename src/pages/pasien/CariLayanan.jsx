import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer, fadeIn } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, MapPin, Building, ActivitySquare, UserRound, Navigation } from 'lucide-react';

export default function CariLayanan() {
  const [activeTab, setActiveTab] = useState('rumah-sakit');

  const tabs = [
    { id: 'rumah-sakit', label: 'Rumah Sakit', icon: Building },
    { id: 'igd', label: 'IGD Darurat', icon: ActivitySquare },
    { id: 'spesialis', label: 'Spesialis', icon: UserRound },
  ];

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cari Layanan Kesehatan</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Temukan fasilitas dan layanan terdekat dengan Anda.</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={slideUp} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari nama rumah sakit, fasilitas kesehatan, atau layanan..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15241b] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>
        <Button variant="primary" size="lg" className="px-6">Cari</Button>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={slideUp} className="flex overflow-x-auto pb-2 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-[#1a3826]' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-secondary dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Results */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} hover className="flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary/50 dark:bg-black/20 rounded-lg">
                  <Building className="w-6 h-6 text-accent" />
                </div>
                <Badge variant={item % 2 === 0 ? "success" : "warning"}>
                  {item % 2 === 0 ? "Tersedia" : "Penuh"}
                </Badge>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">RSUD Kota Malang</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                <span>2.5 km • Jl. Wirosaban No. 1</span>
              </div>
              
              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Antrean IGD</span>
                  <span className="font-medium text-gray-900 dark:text-white">12 Orang</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kamar Kosong</span>
                  <span className="font-medium text-gray-900 dark:text-white">8 Kamar</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1"><Navigation className="w-4 h-4 mr-2" /> Rute</Button>
                  <Button variant="primary" className="flex-1">Pilih</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
