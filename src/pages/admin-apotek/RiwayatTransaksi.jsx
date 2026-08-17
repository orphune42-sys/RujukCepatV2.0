import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animations';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Calendar, RotateCcw } from 'lucide-react';
import SearchInput from '../../components/shared/SearchInput';
import { getBadgeVariant } from '../../utils/helpers';

const PAGE_SIZE = 5;
const mockHistory = [
  { id: 'TRX-005', date: '11 Aug 2026', dateValue: '2026-08-11', patient: 'Lestari', total: 'Rp 45.000', status: 'Selesai' },
  { id: 'TRX-006', date: '11 Aug 2026', dateValue: '2026-08-11', patient: 'Hasanudin', total: 'Rp 120.000', status: 'Selesai' },
  { id: 'TRX-007', date: '10 Aug 2026', dateValue: '2026-08-10', patient: 'Dewi Sartika', total: 'Rp 15.000', status: 'Dibatalkan' },
  { id: 'TRX-008', date: '10 Aug 2026', dateValue: '2026-08-10', patient: 'Kartini', total: 'Rp 85.000', status: 'Selesai' },
  { id: 'TRX-009', date: '09 Aug 2026', dateValue: '2026-08-09', patient: 'Sudirman', total: 'Rp 210.000', status: 'Selesai' },
  { id: 'TRX-010', date: '08 Aug 2026', dateValue: '2026-08-08', patient: 'Rahmawati', total: 'Rp 65.000', status: 'Selesai' },
  { id: 'TRX-011', date: '08 Aug 2026', dateValue: '2026-08-08', patient: 'Bambang', total: 'Rp 95.000', status: 'Selesai' },
  { id: 'TRX-012', date: '07 Aug 2026', dateValue: '2026-08-07', patient: 'Yuni Astuti', total: 'Rp 35.000', status: 'Dibatalkan' },
  { id: 'TRX-013', date: '06 Aug 2026', dateValue: '2026-08-06', patient: 'Hendra', total: 'Rp 150.000', status: 'Selesai' },
  { id: 'TRX-014', date: '05 Aug 2026', dateValue: '2026-08-05', patient: 'Maya Sari', total: 'Rp 75.000', status: 'Selesai' },
];



const RiwayatTransaksi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [page, setPage] = useState(1);

  const filteredHistory = useMemo(() => mockHistory.filter((row) => {
    const matchesSearch = `${row.id} ${row.patient}`.toLowerCase().includes(searchTerm.toLowerCase());
    const isAfterStart = !dateRange.start || row.dateValue >= dateRange.start;
    const isBeforeEnd = !dateRange.end || row.dateValue <= dateRange.end;
    return matchesSearch && isAfterStart && isBeforeEnd;
  }), [dateRange, searchTerm]);
  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleHistory = filteredHistory.slice(startIndex, startIndex + PAGE_SIZE);

  const updateSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };
  const updateDateRange = (field, value) => {
    setDateRange((current) => ({ ...current, [field]: value }));
    setPage(1);
  };
  const resetDateRange = () => {
    setDateRange({ start: '', end: '' });
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Riwayat Transaksi</h1>
          <p className="text-slate-500">Lihat semua riwayat transaksi apotek yang telah selesai.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SearchInput value={searchTerm} onChange={(event) => updateSearch(event.target.value)} placeholder="Cari transaksi..." className="flex-1 sm:flex-none sm:w-64" />
          <div className="relative">
            <Button onClick={() => setIsDateFilterOpen((open) => !open)} aria-expanded={isDateFilterOpen} className="h-12 gap-2 px-5 text-sm">
              <Calendar size={18} /> Rentang Waktu
            </Button>
            {isDateFilterOpen && (
              <div className="absolute right-0 z-30 mt-2 w-72 rounded-xl border border-border bg-white p-4 shadow-xl">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-text">Tanggal mulai<input type="date" value={dateRange.start} onChange={(event) => updateDateRange('start', event.target.value)} className="mt-1.5 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" /></label>
                  <label className="block text-sm font-medium text-text">Tanggal akhir<input type="date" min={dateRange.start || undefined} value={dateRange.end} onChange={(event) => updateDateRange('end', event.target.value)} className="mt-1.5 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" /></label>
                </div>
                <div className="mt-4 flex justify-between gap-2"><Button variant="ghost" size="sm" onClick={resetDateRange} className="gap-1.5"><RotateCcw size={14} /> Reset</Button><Button size="sm" onClick={() => setIsDateFilterOpen(false)}>Terapkan</Button></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div variants={slideUp} initial="initial" animate="animate">
        <Card className="border-0 shadow-sm bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full table-fixed text-sm text-left">
              <colgroup><col className="w-1/5" /><col className="w-1/5" /><col className="w-1/5" /><col className="w-1/5" /><col className="w-1/5" /></colgroup>
              <thead className="text-slate-500 bg-slate-50 border-b border-slate-200"><tr><th className="px-6 py-4 font-medium">ID Transaksi</th><th className="px-6 py-4 font-medium">Tanggal</th><th className="px-6 py-4 font-medium">Pasien</th><th className="px-6 py-4 font-medium">Total Harga</th><th className="px-6 py-4 font-medium">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {visibleHistory.map((row) => <tr key={row.id} className="hover:bg-slate-50 transition-colors"><td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">{row.id}</td><td className="whitespace-nowrap px-6 py-4 text-slate-500">{row.date}</td><td className="whitespace-nowrap px-6 py-4 text-slate-700">{row.patient}</td><td className="whitespace-nowrap px-6 py-4 text-slate-900 font-medium">{row.total}</td><td className="whitespace-nowrap px-6 py-4"><Badge variant={getBadgeVariant(row.status)}>{row.status}</Badge></td></tr>)}
                {visibleHistory.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">Tidak ada transaksi yang sesuai.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Menampilkan {filteredHistory.length ? startIndex + 1 : 0}-{Math.min(startIndex + PAGE_SIZE, filteredHistory.length)} dari {filteredHistory.length} data</p>
            <div className="flex gap-2"><Button variant="outline" className="h-11 px-4 text-sm" disabled={currentPage === 1} onClick={() => setPage((current) => current - 1)}>Sebelumnya</Button><Button className="h-11 px-4 text-sm" disabled={currentPage === totalPages} onClick={() => setPage((current) => current + 1)}>Selanjutnya</Button></div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default RiwayatTransaksi;
