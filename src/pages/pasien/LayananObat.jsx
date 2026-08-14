import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Pill, AlertCircle, PackageCheck, Truck } from 'lucide-react';

export default function LayananObat() {
  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Layanan Obat</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Pantau status resep dan pengambilan obat Anda.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Prescription */}
        <motion.div variants={slideUp} className="space-y-6">
          <Card>
            <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-accent" />
                  Resep Hari Ini
                </CardTitle>
                <Badge variant="warning">Sedang Disiapkan</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dari Kunjungan</p>
                  <p className="font-medium text-gray-900 dark:text-white">Poli Penyakit Dalam - RSUD Kota Malang</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estimasi Selesai</p>
                  <p className="font-bold text-gray-900 dark:text-white">11:30 WIB</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Daftar Obat</h4>
                <div className="flex justify-between items-center p-3 bg-secondary/30 dark:bg-black/20 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Paracetamol 500mg</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">10 Tablet • 3x Sehari (Sesudah makan)</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 dark:bg-black/20 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Amoxicillin 500mg</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">15 Tablet • 3x Sehari (Habiskan)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Obat Anda sedang diracik oleh apoteker. Anda akan menerima notifikasi saat obat siap diambil.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Options */}
        <motion.div variants={slideUp} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Opsi Pengambilan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-start gap-4 p-4 border border-primary bg-primary/5 dark:bg-primary/10 rounded-xl cursor-pointer">
                <input type="radio" name="pickup" className="mt-1 w-4 h-4 text-primary" defaultChecked />
                <div>
                  <div className="flex items-center gap-2">
                    <PackageCheck className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ambil Sendiri di Apotek</h4>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Silakan datang ke Apotek Rawat Jalan lantai 1 RSUP Dr. Sardjito dengan menunjukkan nomor antrean.</p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-xl cursor-pointer transition-colors">
                <input type="radio" name="pickup" className="mt-1 w-4 h-4 text-primary" />
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Kirim ke Rumah</h4>
                    </div>
                    <Badge variant="default">Rp 15.000</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Obat akan dikirimkan ke alamat yang terdaftar pada profil Anda via kurir rekanan.</p>
                </div>
              </label>

              <Button variant="primary" className="w-full mt-4">Konfirmasi Pilihan</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
