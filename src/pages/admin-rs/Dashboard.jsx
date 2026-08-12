import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Activity, Users, Bed, CheckCircle, Clock } from 'lucide-react';

const statCards = [
  { title: 'Rujukan Masuk', value: '12', icon: Activity, color: 'text-blue-500' },
  { title: 'Rujukan Aktif', value: '5', icon: Clock, color: 'text-amber-500' },
  { title: 'Selesai Hari Ini', value: '18', icon: CheckCircle, color: 'text-emerald-500' },
  { title: 'Pasien IGD', value: '24', icon: Users, color: 'text-purple-500' },
];

const bedStats = [
  { type: 'IGD', available: 5, total: 20 },
  { type: 'ICU', available: 2, total: 10 },
  { type: 'Rawat Inap', available: 45, total: 150 },
];

export default function Dashboard() {
  return (
    <motion.div 
      className="p-6 space-y-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Admin RS</h1>
        <p className="text-gray-500 dark:text-gray-400">Ringkasan aktivitas dan ketersediaan rumah sakit hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div key={index} variants={slideUp}>
            <Card hover>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={slideUp}>
          <Card>
            <CardHeader>
              <CardTitle>Ketersediaan Tempat Tidur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bedStats.map((bed, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">{bed.type}</span>
                    <span className="text-gray-900 dark:text-white">{bed.available} / {bed.total} Tersedia</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-[#9ccda5] h-2.5 rounded-full" 
                      style={{ width: `${((bed.total - bed.available) / bed.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp}>
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terkini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div className="p-2 rounded-full bg-[#9ccda5]/20 text-[#9ccda5]">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Rujukan baru dari Puskesmas Melati</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">10 menit yang lalu</p>
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
