import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Activity, Pill, Clock, ChevronRight, Search, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isReferralCancelled, setIsReferralCancelled] = useState(false);
  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp} className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Halo, Eka Wahyu</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Berikut adalah ringkasan kesehatan Anda hari ini.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Referral Card */}
        <motion.div variants={slideUp} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Rujukan Aktif
              </CardTitle>
              <Badge variant={isReferralCancelled ? 'default' : 'primary'} className="shrink-0">{isReferralCancelled ? 'Dibatalkan' : 'Menunggu Konfirmasi'}</Badge>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">RS Tujuan</p>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">RSUP Dr. Sardjito</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Poli Tujuan</p>
                    <p className="font-medium text-gray-900 dark:text-white">Poli Penyakit Dalam</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Jadwal Kunjungan</p>
                    <div className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2 mt-1">
                      <Clock className="mt-0.5 w-4 h-4 text-accent" />
                      <p className="font-medium leading-6 text-gray-900 dark:text-white">Senin, 15 Okt 2026 · 09:00 WIB</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-3">
                  <Button variant="outline" className="w-full" onClick={() => setIsReferralCancelled(true)} disabled={isReferralCancelled}>Batalkan</Button>
                  <Button variant="primary" className="w-full" onClick={() => navigate('/pasien/rujukan/RJ-20261015-1A')}>Lihat Detail</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Medications */}
        <motion.div variants={slideUp}>
          <Card className="h-full">
            <CardHeader className="px-4 py-4 sm:px-6">
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-accent" />
                Obat Aktif
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-6">
              <div className="flex flex-col items-start gap-2 rounded-lg bg-secondary/50 p-3 dark:bg-black/20 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">Paracetamol 500mg</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">3x Sehari - Sesudah makan</p>
                </div>
                <Badge variant="warning" className="shrink-0 whitespace-nowrap">Tersisa 2 hari</Badge>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-lg bg-secondary/50 p-3 dark:bg-black/20 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">Amoxicillin</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">3x Sehari - Habiskan</p>
                </div>
                <Badge variant="success" className="shrink-0 whitespace-nowrap">Tersisa 5 hari</Badge>
              </div>
              <Button variant="ghost" className="w-full mt-2" onClick={() => navigate('/pasien/obat')}>
                Lihat Semua Obat <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={slideUp}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card hover className="cursor-pointer" onClick={() => navigate('/pasien/cari-layanan')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">Cari Layanan</p>
            </CardContent>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/pasien/cari-layanan')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <PlusCircle className="w-6 h-6 text-accent" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">Buat Rujukan</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
