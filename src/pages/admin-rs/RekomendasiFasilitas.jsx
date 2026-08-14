import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { slideUp, staggerContainer } from '../../utils/animations';
import { MapPin, Navigation, Star, Clock, Phone } from 'lucide-react';

const facilities = [
  { id: 1, name: 'RS Umum Daerah Dr. Saiful Anwar', type: 'Rumah Sakit Tipe A', distance: '2.3 km', time: '8 menit', rating: 4.8, availableBeds: 10, img: 'bg-blue-100' },
  { id: 2, name: 'RS Umum Lavalette', type: 'Rumah Sakit Tipe B', distance: '3.1 km', time: '10 menit', rating: 4.7, availableBeds: 8, img: 'bg-red-100' },
  { id: 3, name: 'RSIA Puri Bunda Malang', type: 'Rumah Sakit Ibu & Anak', distance: '4.5 km', time: '14 menit', rating: 4.7, availableBeds: 5, img: 'bg-pink-100' },
  { id: 4, name: 'Klinik Brawijaya Medical Center', type: 'Klinik Utama', distance: '1.0 km', time: '5 menit', rating: 4.5, availableBeds: 2, img: 'bg-green-100' },
];

export default function RekomendasiFasilitas() {
  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto flex flex-col sm:p-2 lg:h-[calc(100vh-5rem)] lg:p-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rekomendasi Fasilitas</h1>
        <p className="text-gray-500 dark:text-gray-400">Temukan fasilitas kesehatan terdekat yang tersedia untuk rujukan.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:flex-1 lg:min-h-0">
        {/* List Fasilitas */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 pr-2 lg:overflow-y-auto custom-scrollbar">
          {facilities.map((facility, index) => (
            <motion.div key={facility.id} variants={slideUp} custom={index}>
              <Card hover className="cursor-pointer border-l-4 border-l-transparent hover:border-l-[#9ccda5]">
                <CardContent className="p-4 flex gap-4">
                  <div className={`w-16 h-16 rounded-lg ${facility.img} dark:opacity-80 shrink-0 flex items-center justify-center`}>
                    <MapPin className="w-6 h-6 text-black/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{facility.name}</h3>
                    <p className="text-xs text-[#9ccda5] font-medium">{facility.type}</p>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {facility.distance}</span>
                      <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> {facility.rating}</span>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300">
                        {facility.availableBeds} Bed Tersedia
                      </span>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Pilih</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Map View Mock */}
        <motion.div variants={slideUp} className="w-full lg:w-2/3 flex-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden flex items-center justify-center min-h-[400px]">
          {/* Decorative Map Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="text-center z-10 p-6">
            <div className="w-16 h-16 bg-[#9ccda5]/20 text-[#9ccda5] rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <MapPin className="w-8 h-8 relative z-10" />
              <div className="absolute inset-0 bg-[#9ccda5] rounded-full animate-ping opacity-20"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Peta Interaktif</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">Pilih salah satu fasilitas di sebelah kiri untuk melihat lokasi detail dan rute pada peta.</p>
            
            <div className="inline-flex gap-4 p-4 bg-white dark:bg-[#0f1913] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-left">
               <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                 <Navigation className="w-5 h-5 text-blue-500" />
               </div>
               <div>
                 <p className="text-xs text-gray-500 font-medium">Lokasi Anda Saat Ini</p>
                 <p className="text-sm font-bold text-gray-900 dark:text-white">RS Pusat Kota</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
