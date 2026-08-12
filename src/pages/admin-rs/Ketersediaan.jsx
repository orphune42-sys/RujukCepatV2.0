import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { staggerContainer, slideUp } from '../../utils/animations';
import { Bed, Activity, Stethoscope } from 'lucide-react';

const bedData = [
  { id: 'igd', name: 'IGD (Instalasi Gawat Darurat)', icon: Activity, total: 25, available: 5, color: 'text-red-500', bg: 'bg-red-500' },
  { id: 'icu', name: 'ICU (Intensive Care Unit)', icon: Stethoscope, total: 15, available: 2, color: 'text-purple-500', bg: 'bg-purple-500' },
  { id: 'ranap-umum', name: 'Rawat Inap Umum', icon: Bed, total: 100, available: 32, color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'ranap-anak', name: 'Rawat Inap Anak', icon: Bed, total: 40, available: 12, color: 'text-emerald-500', bg: 'bg-emerald-500' },
  { id: 'ranap-maternitas', name: 'Maternitas / Kebidanan', icon: Bed, total: 30, available: 8, color: 'text-pink-500', bg: 'bg-pink-500' },
];

export default function Ketersediaan() {
  return (
    <motion.div 
      className="p-6 space-y-6 max-w-7xl mx-auto"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ketersediaan Tempat Tidur</h1>
        <p className="text-gray-500 dark:text-gray-400">Pantau kapasitas ruangan dan ketersediaan tempat tidur secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bedData.map((room) => {
          const occupancyRate = ((room.total - room.available) / room.total) * 100;
          
          return (
            <motion.div key={room.id} variants={slideUp}>
              <Card hover className="h-full flex flex-col justify-between">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${room.color}`}>
                      <room.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tersedia</p>
                      <h3 className={`text-3xl font-bold ${room.available < 5 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        {room.available}
                      </h3>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{room.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Terisi: {room.total - room.available}</span>
                      <span className="text-gray-500 dark:text-gray-400">Total: {room.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${room.bg} transition-all duration-500`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
