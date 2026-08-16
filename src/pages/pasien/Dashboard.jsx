import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { FileText, Pill, Clock, ChevronRight } from 'lucide-react';
import NotificationMenu from '../../components/shared/NotificationMenu';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isReferralCancelled, setIsReferralCancelled] = useState(false);

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-8 sm:p-2 lg:p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Greeting Header */}
      <motion.div variants={slideUp} className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-950 tracking-tight">Halo, Eka Wahyu</h1>
          <p className="text-gray-500 text-sm md:text-base">Berikut adalah ringkasan informasi rujukan dan kesehatan Anda hari ini.</p>
        </div>
        <div className="shrink-0">
          <NotificationMenu role="pasien" />
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Referral Card */}
        <motion.div variants={slideUp} className="lg:col-span-2">
          <Card className="h-full border border-border/80 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <CardHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-border/50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Rujukan Aktif
                </CardTitle>
                <Badge variant={isReferralCancelled ? 'default' : 'primary'} className="font-extrabold uppercase text-[10px] tracking-widest px-2.5 py-1 shrink-0">
                  {isReferralCancelled ? 'Dibatalkan' : 'Menunggu Konfirmasi'}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">Rumah Sakit Tujuan</p>
                      <p className="font-bold text-lg text-gray-950">RSUP Dr. Sardjito</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">Poliklinik Tujuan</p>
                      <p className="font-semibold text-gray-800">Poli Penyakit Dalam</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">Jadwal Kunjungan</p>
                      <div className="flex items-center gap-2 mt-1 bg-secondary/30 p-3 rounded-2xl border border-border/30">
                        <Clock className="w-4 h-4 text-accent shrink-0" />
                        <p className="text-sm font-semibold text-gray-800">Senin, 15 Okt 2026 · 09:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="px-6 py-5 border-t border-border/50 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl text-xs font-bold py-3"
                onClick={() => setIsReferralCancelled(true)}
                disabled={isReferralCancelled}
              >
                Batalkan Rujukan
              </Button>
              <Button
                variant="primary"
                className="flex-1 rounded-xl text-xs font-bold py-3 flex items-center justify-center gap-1 shadow-md shadow-primary/10"
                onClick={() => navigate('/pasien/rujukan/RJ-20261015-1A')}
              >
                Lihat Detail
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Active Medications */}
        <motion.div variants={slideUp}>
          <Card className="h-full border border-border/80 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <CardHeader className="px-6 py-5 border-b border-border/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Pill className="w-5 h-5 text-accent" />
                Obat Aktif
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 p-6 flex-1">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 p-4 border border-border/10">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-950">Paracetamol 500mg</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">3x Sehari - Sesudah makan</p>
                </div>
                <Badge variant="warning" className="shrink-0 text-[10px] font-extrabold uppercase px-2 py-0.5 whitespace-nowrap">Tersisa 2 hari</Badge>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 p-4 border border-border/10">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-950">Amoxicillin</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">3x Sehari - Habiskan</p>
                </div>
                <Badge variant="success" className="shrink-0 text-[10px] font-extrabold uppercase px-2 py-0.5 whitespace-nowrap">Tersisa 5 hari</Badge>
              </div>
            </CardContent>

            <div className="px-6 py-4 border-t border-border/50 bg-gray-50/50">
              <Button
                variant="ghost"
                className="w-full text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 hover:text-accent"
                onClick={() => navigate('/pasien/obat')}
              >
                Lihat Semua Obat <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
