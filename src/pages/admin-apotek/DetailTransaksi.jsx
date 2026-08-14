import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animations';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ArrowLeft, Printer, CheckCircle, Package, Check } from 'lucide-react';

const DetailTransaksi = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:p-2 lg:p-6">
      <motion.div variants={slideUp} initial="initial" animate="animate" className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2 h-auto rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              TRX-001
              <Badge variant="warning">Menunggu</Badge>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">12 Aug 2026, 09:00 WIB</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 dark:border-slate-800 dark:bg-slate-900">
          <Printer size={18} /> Cetak Struk
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={slideUp} initial="initial" animate="animate" className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg">Detail Resep</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="pb-3 font-medium">Nama Obat</th>
                      <th className="pb-3 font-medium">Dosis/Aturan</th>
                      <th className="pb-3 font-medium text-center">Jumlah</th>
                      <th className="pb-3 font-medium text-right">Harga</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-4 text-slate-900 dark:text-white font-medium">Paracetamol 500mg</td>
                      <td className="py-4 text-slate-500 dark:text-slate-400">3 x 1 sesudah makan</td>
                      <td className="py-4 text-center text-slate-700 dark:text-slate-300">10 tab</td>
                      <td className="py-4 text-right text-slate-900 dark:text-white">Rp 5.000</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-900 dark:text-white font-medium">Amoxicillin 500mg</td>
                      <td className="py-4 text-slate-500 dark:text-slate-400">3 x 1 sesudah makan (habiskan)</td>
                      <td className="py-4 text-center text-slate-700 dark:text-slate-300">15 tab</td>
                      <td className="py-4 text-right text-slate-900 dark:text-white">Rp 15.000</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-t border-slate-200 dark:border-slate-800">
                    <tr>
                      <td colSpan="3" className="py-4 text-right font-medium text-slate-500 dark:text-slate-400">Total</td>
                      <td className="py-4 text-right font-bold text-slate-900 dark:text-white text-lg">Rp 20.000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} initial="initial" animate="animate" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg">Informasi Pasien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Nama Pasien</p>
                <p className="font-medium text-slate-900 dark:text-white">Ahmad Dahlan</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">No. Rekam Medis</p>
                <p className="font-medium text-slate-900 dark:text-white">RM-99281</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Dokter Peresep</p>
                <p className="font-medium text-slate-900 dark:text-white">Dr. Sarah, Sp.PD</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-[#9ccda5]/10 dark:bg-[#9ccda5]/5 border border-[#9ccda5]/30">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-900 dark:text-emerald-400">Aksi Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#9ccda5] hover:bg-[#8bb893] text-emerald-950 font-medium gap-2 border-0">
                <Package size={18} /> Proses Resep
              </Button>
              <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 gap-2">
                <CheckCircle size={18} /> Siap Diambil
              </Button>
              <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 gap-2">
                <Check size={18} /> Selesai
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailTransaksi;
