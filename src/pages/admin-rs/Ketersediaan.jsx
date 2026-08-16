import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { staggerContainer, slideUp } from '../../utils/animations';
import { Bed, Activity, Stethoscope } from 'lucide-react';

const bedData = [
  { id: 'igd', name: 'IGD (Instalasi Gawat Darurat)', icon: Activity, total: 25, available: 5, bg: 'bg-accent' },
  { id: 'icu', name: 'ICU (Intensive Care Unit)', icon: Stethoscope, total: 15, available: 2, bg: 'bg-accent' },
  { id: 'ranap', name: 'Rawat Inap', icon: Bed, total: 100, available: 32, bg: 'bg-accent' },
];

export default function Ketersediaan() {
  return (
    <motion.div
      className="space-y-6 max-w-7xl mx-auto sm:p-2 lg:p-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ketersediaan Tempat Tidur</h1>
        <p className="text-gray-500">Pantau kapasitas ruangan dan ketersediaan tempat tidur secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bedData.map((room) => {
          const occupancyRate = ((room.total - room.available) / room.total) * 100;

          return (
            <motion.div key={room.id} variants={slideUp}>
              <Card hover className="h-full flex flex-col justify-between">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="rounded-xl bg-accent p-3 text-white">
                      <room.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tersedia</p>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {room.available}
                      </h3>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{room.name}</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Terisi: {room.total - room.available}</span>
                      <span className="text-gray-500">Total: {room.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
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
