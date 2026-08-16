import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { slideUp } from '../../utils/animations';
import { Calendar as CalendarIcon, Clock, Search, Stethoscope } from 'lucide-react';

const doctorSchedules = [
  { id: 1, name: 'dr. Lintang Siddiq, Sp.PD', spesialis: 'Penyakit Dalam', hari: 'Senin, Rabu, Jumat', jam: '08:00 - 14:00', status: 'Tersedia', initial: 'LS' },
  { id: 2, name: 'dr. Eka Wahyu, Sp.B', spesialis: 'Bedah Umum', hari: 'Selasa, Kamis', jam: '10:00 - 16:00', status: 'Operasi', initial: 'EW' },
  { id: 3, name: 'dr. Salsabila Nadhira, Sp.N', spesialis: 'Neurologi', hari: 'Senin - Jumat', jam: '09:00 - 15:00', status: 'Tersedia', initial: 'SN' },
  { id: 4, name: 'dr. Muhammad Maulidan, Sp.OG', spesialis: 'Kandungan', hari: 'Rabu, Sabtu', jam: '13:00 - 18:00', status: 'Cuti', initial: 'MM' },
  { id: 5, name: 'dr. Rindra Ramadhani, Sp.J', spesialis: 'Jantung', hari: 'Senin, Kamis', jam: '08:00 - 12:00', status: 'Tersedia', initial: 'RR' },
];

export default function JadwalDokter() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctorSchedules.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.spesialis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Tersedia':
        return 'bg-emerald-50  text-emerald-700  border-emerald-200 ';
      case 'Operasi':
        return 'bg-amber-50  text-amber-700  border-amber-200 ';
      case 'Cuti':
        return 'bg-rose-50  text-rose-700  border-rose-200 ';
      default:
        return 'bg-gray-50  text-gray-700  border-gray-200 ';
    }
  };

  return (
    <motion.div
      className="space-y-8 max-w-7xl mx-auto sm:p-2 lg:p-6"
      initial="initial"
      animate="animate"
      variants={slideUp}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-950  tracking-tight">Jadwal Praktik Dokter</h1>
          <p className="text-gray-500  mt-1.5 text-sm md:text-base">Pantau ketersediaan real-time dan jadwal dokter spesialis faskes.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Cari dokter atau spesialis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-[#f8faf9] pl-11 pr-4 text-sm text-text placeholder:text-muted/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDoctors.map((doc) => (
          <Card key={doc.id} className="overflow-hidden border border-border/80  rounded-3xl shadow-sm hover:shadow-md hover:border-[#9ccda5]/50 transition-all duration-300">
            <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
              {/* Doctor Profile Info */}
              <div className="md:col-span-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
                  {doc.initial}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-950  tracking-tight">{doc.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-accent  uppercase tracking-wider">
                    <Stethoscope className="w-3.5 h-3.5" />
                    {doc.spesialis}
                  </div>
                </div>
              </div>

              {/* Days */}
              <div className="md:col-span-3 flex items-center gap-2.5 text-gray-600  font-medium">
                <CalendarIcon className="w-4.5 h-4.5 text-accent shrink-0" />
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-500 leading-none">Hari Kerja</p>
                  <p className="text-sm font-semibold">{doc.hari}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="md:col-span-2 flex items-center gap-2.5 text-gray-600  font-medium">
                <Clock className="w-4.5 h-4.5 text-accent shrink-0" />
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-500 leading-none">Jam Praktik</p>
                  <p className="text-sm font-semibold">{doc.jam}</p>
                </div>
              </div>

              {/* Status */}
              <div className="md:col-span-2 flex items-center justify-end">
                <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${getStatusStyle(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white  rounded-3xl border border-dashed border-border py-12 text-gray-500 ">
            Tidak ada dokter yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </motion.div>
  );
}
