import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { slideUp } from '../../utils/animations';
import { Search, Filter } from 'lucide-react';

const mockData = [
  { id: 'RJ-20231001-01', pasien: 'Eka Wahyu', asal: 'Puskesmas Melati', tanggal: '2023-10-01', status: 'Masuk', prioritas: 'Segera' },
  { id: 'RJ-20231001-02', pasien: 'Lintang Siddiq', asal: 'Klinik Sehat', tanggal: '2023-10-01', status: 'Aktif', prioritas: 'Rutin' },
  { id: 'RJ-20231001-03', pasien: 'Salsabila Nadhira', asal: 'RSUD Kota', tanggal: '2023-10-01', status: 'Diproses', prioritas: 'Darurat' },
  { id: 'RJ-20230928-01', pasien: 'Rindra Ramadhani', asal: 'Puskesmas Mawar', tanggal: '2023-09-28', status: 'Riwayat', prioritas: 'Rutin' },
];

export default function RujukanList() {
  const { status } = useParams();
  
  // Format the status string for display
  const displayStatus = status 
    ? status.charAt(0).toUpperCase() + status.slice(1) 
    : 'Semua';

  // Filter data based on the route param (if applicable)
  const filteredData = status 
    ? mockData.filter(item => item.status.toLowerCase() === status.toLowerCase())
    : mockData;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Darurat': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Segera': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    }
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial="initial"
      animate="animate"
      variants={slideUp}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar Rujukan: {displayStatus}</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola dan pantau rujukan pasien masuk ke rumah sakit.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari pasien atau ID..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]"
            />
          </div>
          <button className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/20">
                <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID Rujukan</th>
                <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Pasien</th>
                <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Fasilitas Asal</th>
                <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal</th>
                <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Prioritas</th>
                <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{item.id}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{item.pasien}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{item.asal}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{item.tanggal}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.prioritas)}`}>
                        {item.prioritas}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-[#9ccda5] hover:text-[#7bb085] font-medium transition-colors">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada data rujukan untuk status ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
