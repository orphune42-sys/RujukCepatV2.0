import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, Download, Calendar } from 'lucide-react';

const mockHistory = [
  { id: 'TRX-005', date: '11 Aug 2026', patient: 'Lestari', total: 'Rp 45.000', status: 'Selesai' },
  { id: 'TRX-006', date: '11 Aug 2026', patient: 'Hasanudin', total: 'Rp 120.000', status: 'Selesai' },
  { id: 'TRX-007', date: '10 Aug 2026', patient: 'Dewi Sartika', total: 'Rp 15.000', status: 'Dibatalkan' },
  { id: 'TRX-008', date: '10 Aug 2026', patient: 'Kartini', total: 'Rp 85.000', status: 'Selesai' },
  { id: 'TRX-009', date: '09 Aug 2026', patient: 'Sudirman', total: 'Rp 210.000', status: 'Selesai' },
];

const getBadgeVariant = (status) => {
  if (status === 'Selesai') return 'success';
  if (status === 'Dibatalkan') return 'danger';
  return 'default';
};

const RiwayatTransaksi = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Riwayat Transaksi</h1>
          <p className="text-slate-500 dark:text-slate-400">Lihat semua riwayat transaksi apotek yang telah selesai.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari transaksi..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5] dark:text-white"
            />
          </div>
          <Button variant="outline" className="gap-2 dark:border-slate-800 dark:bg-slate-900">
            <Calendar size={18} /> Rentang Waktu
          </Button>
          <Button variant="outline" className="gap-2 dark:border-slate-800 dark:bg-slate-900">
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

      <motion.div variants={slideUp} initial="initial" animate="animate">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">ID Transaksi</th>
                  <th className="px-6 py-4 font-medium">Tanggal</th>
                  <th className="px-6 py-4 font-medium">Pasien</th>
                  <th className="px-6 py-4 font-medium">Total Harga</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockHistory.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.id}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.date}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{row.patient}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{row.total}</td>
                    <td className="px-6 py-4">
                      <Badge variant={getBadgeVariant(row.status)}>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">Menampilkan 1-5 dari 45 data</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="dark:border-slate-800 dark:bg-slate-900">Sebelumnya</Button>
              <Button variant="outline" size="sm" className="dark:border-slate-800 dark:bg-slate-900">Selanjutnya</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default RiwayatTransaksi;
