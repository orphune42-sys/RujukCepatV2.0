import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { slideUp, staggerContainer } from '../../utils/animations';
import { FileText, Users, CheckCircle, Clock } from 'lucide-react';
import NotificationMenu from '../../components/shared/NotificationMenu';
import StatCard from '../../components/shared/StatCard';

const statCards = [
  { title: 'Rujukan Masuk', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Rujukan Aktif', value: '5', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  { title: 'Selesai Hari Ini', value: '18', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { title: 'Pasien IGD', value: '24', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const bedStats = [
  { type: 'IGD', available: 5, total: 20 },
  { type: 'ICU', available: 2, total: 10 },
  { type: 'Rawat Inap', available: 45, total: 150 },
];

export default function Dashboard() {
  return (
    <motion.div
      className="space-y-6 sm:p-2 lg:p-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin RS</h1>
          <p className="text-gray-500">Ringkasan aktivitas dan ketersediaan rumah sakit hari ini.</p>
        </div>
        <NotificationMenu role="admin_rs" />
      </div>

      <StatCard stats={statCards} />

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <motion.div variants={slideUp} className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Ketersediaan Tempat Tidur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bedStats.map((bed, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700">{bed.type}</span>
                    <span className="text-gray-900">{bed.available} / {bed.total} Tersedia</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-accent h-2.5 rounded-full"
                      style={{ width: `${((bed.total - bed.available) / bed.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Aktivitas Terkini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="rounded-full bg-accent p-2 text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Rujukan baru dari Puskesmas Melati</p>
                      <p className="text-xs text-gray-500">10 menit yang lalu</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
