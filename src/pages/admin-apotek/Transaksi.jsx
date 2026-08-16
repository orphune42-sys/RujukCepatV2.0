import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, Eye } from 'lucide-react';

const statuses = ['Semua', 'Menunggu', 'Diproses', 'Siap Diambil', 'Selesai'];

const mockTransactions = [
  { id: 'TRX-001', date: '12 Aug 2026 09:00', patient: 'Ahmad Dahlan', doctor: 'Dr. Sarah', status: 'Menunggu' },
  { id: 'TRX-002', date: '12 Aug 2026 09:30', patient: 'Siti Aminah', doctor: 'Dr. Budi', status: 'Diproses' },
  { id: 'TRX-003', date: '12 Aug 2026 10:15', patient: 'Joko Widodo', doctor: 'Dr. Sarah', status: 'Siap Diambil' },
  { id: 'TRX-004', date: '12 Aug 2026 11:00', patient: 'Megawati', doctor: 'Dr. Anton', status: 'Selesai' },
];

const getBadgeVariant = (status) => {
  switch (status) {
    case 'Menunggu': return 'warning';
    case 'Diproses': return 'info';
    case 'Siap Diambil': return 'primary';
    case 'Selesai': return 'success';
    default: return 'default';
  }
};

const Transaksi = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const navigate = useNavigate();

  const filtered = activeTab === 'Semua'
    ? mockTransactions
    : mockTransactions.filter(t => t.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 ">Daftar Transaksi</h1>
          <p className="text-slate-500 ">Kelola pesanan dan resep obat pasien.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari ID/Pasien..."
              className="pl-10 pr-4 py-2 bg-white  border border-slate-200  rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5] "
            />
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === status
                ? 'bg-accent text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200   '
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
        {filtered.map((trx) => (
          <motion.div key={trx.id} variants={slideUp}>
            <Card className="border-0 shadow-sm bg-white  hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900 ">{trx.id}</span>
                    <Badge variant={getBadgeVariant(trx.status)}>{trx.status}</Badge>
                  </div>
                  <p className="text-slate-500  text-sm">Pasien: <span className="font-medium text-slate-700 ">{trx.patient}</span></p>
                  <p className="text-slate-400  text-xs">{trx.date} • {trx.doctor}</p>
                </div>
                <Button onClick={() => navigate(`/admin-apotek/transaksi/${trx.id}`)} className="w-full sm:w-auto gap-2">
                  <Eye size={16} /> Detail
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 ">
            Tidak ada transaksi ditemukan.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Transaksi;
