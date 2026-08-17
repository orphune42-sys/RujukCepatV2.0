import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { slideUp } from '../../utils/animations';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ArrowLeft, Printer } from 'lucide-react';

const DetailTransaksi = () => {
  const navigate = useNavigate();
  const { id = 'TRX-001' } = useParams();

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6">
      <motion.div variants={slideUp} initial="initial" animate="animate" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <Button variant="ghost" onClick={() => navigate('/admin-apotek/transaksi')} className="p-2 h-auto rounded-full hover:bg-slate-100 shrink-0 mt-1 sm:mt-0">
            <ArrowLeft size={20} className="text-slate-600 " />
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="truncate">{id}</span>
              <Badge variant="warning" className="shrink-0">Menunggu</Badge>
            </h1>
            <p className="text-slate-500 text-sm mt-1 sm:mt-0">12 Aug 2026, 09:00 WIB</p>
          </div>
        </div>
        <Button variant="primary" className="gap-2 shrink-0 whitespace-nowrap self-start sm:self-auto">
          <Printer size={18} /> Cetak Struk
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={slideUp} initial="initial" animate="animate" className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm bg-white ">
            <CardHeader>
              <CardTitle className="text-lg">Detail Resep</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap">Nama Obat</th>
                      <th className="pb-3 pr-4 font-medium min-w-[150px]">Dosis/Aturan</th>
                      <th className="pb-3 px-4 font-medium text-center whitespace-nowrap">Jumlah</th>
                      <th className="pb-3 pl-4 font-medium text-right whitespace-nowrap">Harga</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="align-top sm:align-middle">
                      <td className="py-4 pr-4 text-slate-900 font-medium whitespace-nowrap">Paracetamol 500mg</td>
                      <td className="py-4 pr-4 text-slate-500">3 x 1 sesudah makan</td>
                      <td className="py-4 px-4 text-center text-slate-700 whitespace-nowrap">10 tab</td>
                      <td className="py-4 pl-4 text-right text-slate-900 whitespace-nowrap">Rp 5.000</td>
                    </tr>
                    <tr className="align-top sm:align-middle">
                      <td className="py-4 pr-4 text-slate-900 font-medium whitespace-nowrap">Amoxicillin 500mg</td>
                      <td className="py-4 pr-4 text-slate-500">3 x 1 sesudah makan (habiskan)</td>
                      <td className="py-4 px-4 text-center text-slate-700 whitespace-nowrap">15 tab</td>
                      <td className="py-4 pl-4 text-right text-slate-900 whitespace-nowrap">Rp 15.000</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-t border-slate-200 ">
                    <tr>
                      <td colSpan="3" className="py-4 pr-4 text-right font-medium text-slate-500 ">Total</td>
                      <td className="py-4 pl-4 text-right font-bold text-slate-900  text-lg">Rp 20.000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} initial="initial" animate="animate" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white ">
            <CardHeader>
              <CardTitle className="text-lg">Informasi Pasien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 ">Nama Pasien</p>
                <p className="font-medium text-slate-900 ">Ahmad Dahlan</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 ">No. Rekam Medis</p>
                <p className="font-medium text-slate-900 ">RM-99281</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 ">Dokter Peresep</p>
                <p className="font-medium text-slate-900 ">Dr. Sarah, Sp.PD</p>
              </div>
            </CardContent>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default DetailTransaksi;
