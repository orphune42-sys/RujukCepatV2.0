import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { User, Settings, CreditCard, Bell, Shield, LogOut, Edit2 } from 'lucide-react';

export default function Profil() {
  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profil Pasien</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola informasi data diri dan pengaturan akun Anda.</p>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div variants={slideUp}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-accent text-3xl font-bold">
                BS
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Eka Wahyu</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">NIK: 3404012345678901</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <Badge variant="primary" className="px-3 py-1 text-sm">Pasien BPJS</Badge>
                  <Badge variant="success" className="px-3 py-1 text-sm">Akun Terverifikasi</Badge>
                </div>
              </div>
              <Button variant="outline" className="shrink-0"><Edit2 className="w-4 h-4 mr-2" /> Edit Profil</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={slideUp} className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nama Lengkap</p>
                  <p className="font-medium text-gray-900 dark:text-white">Eka Wahyu</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tanggal Lahir</p>
                  <p className="font-medium text-gray-900 dark:text-white">15 Agustus 1985 (38 Tahun)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Jenis Kelamin</p>
                  <p className="font-medium text-gray-900 dark:text-white">Laki-laki</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Golongan Darah</p>
                  <p className="font-medium text-gray-900 dark:text-white">O+</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Alamat Lengkap</p>
                  <p className="font-medium text-gray-900 dark:text-white">Jl. Kaliurang KM 5, Gg. Kenari No. 12, Sleman, DI Yogyakarta</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                Asuransi & Penjamin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-primary bg-primary/5 dark:bg-primary/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">BPJS Kesehatan</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white tracking-widest">0001 2345 6789 0</p>
                  <p className="text-sm font-medium text-primary mt-1">Kelas 1 - Aktif</p>
                </div>
                <Button variant="outline" size="sm">Ganti Penjamin</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Pengaturan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left text-gray-700 dark:text-gray-200">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Notifikasi</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left text-gray-700 dark:text-gray-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Privasi & Keamanan</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400 mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
