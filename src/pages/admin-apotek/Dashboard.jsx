import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Pill, Clock, Activity, CheckCircle2 } from 'lucide-react';
import NotificationMenu from '../../components/shared/NotificationMenu';

const Dashboard = () => {
  const stats = [
    { title: 'Total Transaksi Hari Ini', value: '45', icon: Pill, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Menunggu', value: '12', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { title: 'Diproses', value: '18', icon: Activity, color: 'text-[#9ccda5]', bg: 'bg-[#9ccda5]/20 dark:bg-[#9ccda5]/10' },
    { title: 'Selesai', value: '15', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Apotek</h1>
          <p className="text-slate-500 dark:text-slate-400">Ringkasan transaksi hari ini.</p>
        </div>
        <NotificationMenu role="admin_apotek" />
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={slideUp}>
              <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div variants={slideUp} initial="initial" animate="animate">
         <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Aktivitas Terkini</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-[#9ccda5]"></div>
                         <div>
                            <p className="font-medium text-slate-900 dark:text-white">TRX-20260812-00{i}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Pasien: Eka Wahyu</p>
                         </div>
                       </div>
                       <span className="text-sm text-slate-500 dark:text-slate-400">10 menit yang lalu</span>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
