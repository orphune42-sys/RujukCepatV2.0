import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { slideUp } from '../../utils/animations';
import { Calendar as CalendarIcon, Clock, User, Filter, Search } from 'lucide-react';

const doctorSchedules = [
  { id: 1, name: 'dr. Andi Pratama, Sp.PD', spesialis: 'Penyakit Dalam', hari: 'Senin, Rabu, Jumat', jam: '08:00 - 14:00', status: 'Tersedia' },
  { id: 2, name: 'dr. Budi Santoso, Sp.B', spesialis: 'Bedah Umum', hari: 'Selasa, Kamis', jam: '10:00 - 16:00', status: 'Operasi' },
  { id: 3, name: 'dr. Citra Lestari, Sp.A', spesialis: 'Anak', hari: 'Senin - Jumat', jam: '09:00 - 15:00', status: 'Tersedia' },
  { id: 4, name: 'dr. Dian Sastro, Sp.OG', spesialis: 'Kandungan', hari: 'Rabu, Sabtu', jam: '13:00 - 18:00', status: 'Cuti' },
  { id: 5, name: 'dr. Eko Purnomo, Sp.J', spesialis: 'Jantung', hari: 'Senin, Kamis', jam: '08:00 - 12:00', status: 'Tersedia' },
];

export default function JadwalDokter() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctorSchedules.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.spesialis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="p-6 space-y-6 max-w-7xl mx-auto"
      initial="initial"
      animate="animate"
      variants={slideUp}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jadwal Dokter</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola dan lihat jadwal praktik dokter spesialis.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari dokter atau spesialis..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]"
            />
          </div>
          <button className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDoctors.map((doc) => (
          <Card key={doc.id} className="overflow-hidden hover:border-[#9ccda5]/50 transition-colors">
            <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{doc.name}</h3>
                  <p className="text-sm font-medium text-[#9ccda5]">{doc.spesialis}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full md:w-auto">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{doc.hari}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{doc.jam}</span>
                </div>
              </div>

              <div className="w-full md:w-32 flex md:justify-end">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  doc.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  doc.status === 'Operasi' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {doc.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Tidak ada dokter yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </motion.div>
  );
}
