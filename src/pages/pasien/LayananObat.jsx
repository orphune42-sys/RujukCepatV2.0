import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Pill, AlertCircle, PackageCheck, Truck } from 'lucide-react';

export default function LayananObat() {
  const [pickupMethod, setPickupMethod] = useState('pickup');
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp}>
        <h1 className="text-2xl font-bold text-gray-900 ">Layanan Obat</h1>
        <p className="text-gray-500  mt-1">Pantau status resep dan pengambilan obat Anda.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Prescription */}
        <motion.div variants={slideUp} className="space-y-6">
          <Card>
            <CardHeader className="px-4 py-4 sm:px-6 border-b border-gray-100 ">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center gap-2 leading-tight">
                  <Pill className="w-5 h-5 text-accent" />
                  Resep Hari Ini
                </CardTitle>
                <Badge variant="warning" className="shrink-0">Sedang Disiapkan</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-4  sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div className="min-w-0">
                  <p className="text-sm text-gray-500 ">Dari Kunjungan</p>
                  <p className="mt-1 font-semibold leading-6 text-gray-900 ">Poli Penyakit Dalam <span className="text-gray-400">·</span> RSUD Kota Malang</p>
                </div>
                <div className="border-t border-gray-200 pt-3  sm:border-0 sm:pt-0 sm:text-right">
                  <p className="text-sm text-gray-500 ">Estimasi Selesai</p>
                  <p className="mt-1 text-lg font-bold text-gray-900 ">11:30 WIB</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900  border-b border-gray-100  pb-2">Daftar Obat</h4>
                <div className="p-3 bg-secondary/30  rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 ">Paracetamol 500mg</p>
                    <p className="text-sm text-gray-500 ">10 Tablet • 3x Sehari (Sesudah makan)</p>
                  </div>
                </div>
                <div className="p-3 bg-secondary/30  rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 ">Amoxicillin 500mg</p>
                    <p className="text-sm text-gray-500 ">15 Tablet • 3x Sehari (Habiskan)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50  p-4 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 ">
                  Obat Anda sedang diracik oleh apoteker. Anda akan menerima notifikasi saat obat siap diambil.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Options */}
        <motion.div variants={slideUp} className="space-y-6">
          <Card>
            <CardHeader className="px-4 py-4 sm:px-6">
              <CardTitle>Opsi Pengambilan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-6">
              <label className={`grid grid-cols-[20px_minmax(0,1fr)] items-start gap-3 p-4 border rounded-xl cursor-pointer ${pickupMethod === 'pickup' ? 'border-primary bg-primary/5 ' : 'border-gray-200 '}`}>
                <input type="radio" name="pickup" value="pickup" checked={pickupMethod === 'pickup'} onChange={() => setPickupMethod('pickup')} className="mt-1 h-4 w-4 text-primary" />
                <div className="min-w-0">
                  <div className="flex items-start gap-2">
                    <PackageCheck className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold leading-6 text-gray-900 ">Ambil Sendiri di Apotek</h4>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-gray-500">Silakan datang ke Apotek Rawat Jalan lantai 1 RSUP Dr. Sardjito dengan menunjukkan nomor antrean.</p>
                </div>
              </label>

              <label className={`grid grid-cols-[20px_minmax(0,1fr)] items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${pickupMethod === 'delivery' ? 'border-primary bg-primary/5 ' : 'border-gray-200  hover:border-primary '}`}>
                <input type="radio" name="pickup" value="delivery" checked={pickupMethod === 'delivery'} onChange={() => setPickupMethod('delivery')} className="mt-1 h-4 w-4 text-primary" />
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-2">
                      <Truck className="w-5 h-5 text-gray-400 " />
                      <h4 className="font-semibold leading-6 text-gray-900 ">Kirim ke Rumah</h4>
                    </div>
                    <Badge variant="default" className="shrink-0">Rp 15.000</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-gray-500">Obat akan dikirimkan ke alamat yang terdaftar pada profil Anda via kurir rekanan.</p>
                </div>
              </label>

              <Button variant="primary" className="w-full mt-4" onClick={() => setIsConfirmed(true)}>{isConfirmed ? 'Pilihan Terkonfirmasi' : 'Konfirmasi Pilihan'}</Button>
              {isConfirmed && <p className="text-sm text-center text-accent ">{pickupMethod === 'pickup' ? 'Pengambilan di apotek telah dipilih.' : 'Pengiriman ke rumah telah dipilih.'}</p>}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
