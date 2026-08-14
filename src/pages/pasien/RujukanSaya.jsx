import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Filter, Calendar, MapPin, ChevronRight, Activity } from 'lucide-react';

export default function RujukanSaya() {
  const [filter, setFilter] = useState('Semua');
  const filters = ['Semua', 'Aktif', 'Selesai', 'Dibatalkan'];

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rujukan Saya</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola riwayat rujukan dan kunjungan Anda.</p>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-gray-400 mr-2" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-primary text-[#1a3826]' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-4">
        {[1, 2, 3].map((item) => (
          <motion.div variants={slideUp} key={item}>
            <Card hover className="cursor-pointer group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="p-4 md:p-6 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-secondary/50 rounded-lg">
                          <Activity className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Nomor Rujukan</p>
                          <p className="font-semibold text-gray-900 dark:text-white">RJ-20261015-{item}A</p>
                        </div>
                      </div>
                      <Badge variant={item === 1 ? "primary" : item === 2 ? "success" : "default"}>
                        {item === 1 ? "Aktif" : item === 2 ? "Selesai" : "Dibatalkan"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="font-medium text-lg text-gray-900 dark:text-white">Poli Penyakit Dalam</p>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>RSUD Kota Malang</span>
                        </div>
                      </div>
                      <div className="md:text-right">
                        <p className="font-medium text-gray-900 dark:text-white">Jadwal Kunjungan</p>
                        <div className="flex items-center md:justify-end gap-1 text-gray-500 dark:text-gray-400 mt-1 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>15 Okt 2026, 09:00 WIB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/20 p-4 md:w-32 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 group-hover:bg-secondary/20 transition-colors">
                    <span className="text-accent font-medium flex items-center">
                      Detail <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
