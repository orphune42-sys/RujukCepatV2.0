import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MapPin, Phone, Building, CheckCircle2, Circle, Clock, FileText, Download } from 'lucide-react';

export default function DetailRujukan() {
  const timeline = [
    { status: 'Rujukan Dibuat', time: '12 Okt 2026, 08:30 WIB', description: 'Rujukan diterbitkan oleh Puskesmas Umbulharjo', completed: true },
    { status: 'Diverifikasi RS', time: '12 Okt 2026, 14:00 WIB', description: 'Rujukan telah diterima dan diverifikasi oleh RSUP Dr. Sardjito', completed: true },
    { status: 'Menunggu Kunjungan', time: '15 Okt 2026, 09:00 WIB', description: 'Silakan datang sesuai jadwal ke Poli Penyakit Dalam', completed: false, current: true },
    { status: 'Selesai', time: '-', description: 'Pemeriksaan telah selesai dilakukan', completed: false }
  ];

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Rujukan</h1>
            <Badge variant="primary">Aktif</Badge>
          </div>
          <p className="text-gray-500 dark:text-gray-400">No. RJ-20261015-1A</p>
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2"/> Unduh Surat Rujukan</Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={slideUp} className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Tujuan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-secondary/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">RSUP Dr. Sardjito</h3>
                  <p className="text-gray-500 dark:text-gray-400">Poli Penyakit Dalam • dr. Handoko, Sp.PD</p>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      Jl. Kesehatan No.1, Senayan, Sleman, DIY
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      (0274) 587333
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jadwal Kunjungan</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">Kamis, 15 Okt 2026</p>
                  <p className="text-gray-600 dark:text-gray-300">09:00 - 11:00 WIB</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Antrean Saat Ini</p>
                  <p className="font-bold text-3xl text-accent">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catatan Rujukan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-900 dark:text-white">Pasien mengeluh nyeri perut bagian bawah berulang sejak 3 hari lalu. Hasil lab darah menunjukkan leukosit tinggi. Mohon evaluasi lanjutan dan USG abdomen.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Diagnosa Awal: K52.9 Noninfective gastroenteritis and colitis, unspecified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Status Rujukan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l-2 border-gray-100 dark:border-gray-800 space-y-8 mt-2">
                {timeline.map((step, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-[35px] top-1 bg-white dark:bg-[#15241b]">
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      ) : step.current ? (
                        <Clock className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                      )}
                    </span>
                    <div>
                      <h4 className={`font-semibold ${step.current ? 'text-yellow-600 dark:text-yellow-500' : step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {step.status}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{step.time}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{step.description}</p>
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
