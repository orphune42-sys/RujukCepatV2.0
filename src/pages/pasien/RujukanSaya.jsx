import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, MapPin, ChevronRight, FileText } from 'lucide-react';
import FilterPills from '../../components/shared/FilterPills';

export default function RujukanSaya() {
  const [filter, setFilter] = useState('Semua');
  const navigate = useNavigate();
  const filters = ['Semua', 'Aktif', 'Selesai', 'Dibatalkan'];
  const referrals = [
    { id: 1, status: 'Aktif' },
    { id: 2, status: 'Selesai' },
    { id: 3, status: 'Dibatalkan' },
  ];
  const visibleReferrals = referrals.filter((referral) => filter === 'Semua' || referral.status === filter);

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rujukan Saya</h1>
          <p className="text-gray-500 mt-1">Kelola riwayat rujukan dan kunjungan Anda.</p>
        </div>

        <FilterPills
          items={filters}
          activeItem={filter}
          onSelect={setFilter}
        />
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-4">
        {visibleReferrals.map(({ id: item, status }) => (
          <motion.div variants={slideUp} key={item}>
            <Card hover className="cursor-pointer group" role="link" tabIndex={0} onClick={() => navigate(`/pasien/rujukan/RJ-20261015-${item}A`)} onKeyDown={(event) => event.key === 'Enter' && navigate(`/pasien/rujukan/RJ-20261015-${item}A`)}>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-stretch">
                  <div className="p-4 lg:p-6 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-accent p-2 text-white">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nomor Rujukan</p>
                          <p className="font-semibold text-gray-900">RJ-20261015-{item}A</p>
                        </div>
                      </div>
                      <Badge variant={status === 'Aktif' || status === 'Selesai' ? "success" : "default"}>
                        {status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="font-medium text-lg text-gray-900">Poli Penyakit Dalam</p>
                        <div className="flex items-center gap-1 text-gray-500 mt-1 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>RSUD Kota Malang</span>
                        </div>
                      </div>
                      <div className="lg:text-right">
                        <p className="font-medium text-gray-900">Jadwal Kunjungan</p>
                        <div className="flex items-center lg:justify-end gap-1 text-gray-500 mt-1 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>15 Okt 2026, 09:00 WIB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 lg:w-32 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100 group-hover:bg-secondary/20 transition-colors">
                    <span className="text-accent font-medium flex items-center">
                      Detail <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {visibleReferrals.length === 0 && <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted">Tidak ada rujukan dengan status ini.</p>}
      </motion.div>
    </motion.div>
  );
}
