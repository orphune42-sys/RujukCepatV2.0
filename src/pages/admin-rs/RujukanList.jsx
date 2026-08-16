import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { slideUp } from '../../utils/animations';
import { Search } from 'lucide-react';

const mockData = [
  {
    id: 'RJ-20231001-01', pasien: 'Eka Wahyu', asal: 'Puskesmas Cisadea', tanggal: '2023-10-01', status: 'Masuk', prioritas: 'Segera',
    noRm: 'RM-240183', tanggalLahir: '12 Mei 1986', jenisKelamin: 'Laki-laki', tujuan: 'RSUD Dr. Saiful Anwar',
    diagnosis: 'Pneumonia komunitas', catatan: 'Sesak napas sejak dua hari, membutuhkan evaluasi dokter spesialis paru.', waktuDibuat: '1 Okt 2023, 09.30 WIB',
  },
  {
    id: 'RJ-20231001-02', pasien: 'Lintang Siddiq', asal: 'Klinik Bunga Melati', tanggal: '2023-10-01', status: 'Aktif', prioritas: 'Rutin',
    noRm: 'RM-240184', tanggalLahir: '23 Agustus 1992', jenisKelamin: 'Perempuan', tujuan: 'RSUD Dr. Saiful Anwar',
    diagnosis: 'Kontrol pasca operasi', catatan: 'Kontrol lanjutan sesuai jadwal dokter bedah.', waktuDibuat: '1 Okt 2023, 08.15 WIB',
  },
  { id: 'RJ-20231001-03', pasien: 'Salsabila Nadhira', asal: 'RSUD Kota Malang', tanggal: '2023-10-01', status: 'Diproses', prioritas: 'Darurat' },
  { id: 'RJ-20230928-01', pasien: 'Rindra Ramadhani', asal: 'Puskesmas Mojolangu', tanggal: '2023-09-28', status: 'Riwayat', prioritas: 'Rutin' },
];

export default function RujukanList() {
  const filteredData = mockData.filter((item) => ['Masuk', 'Aktif'].includes(item.status));
  const [selectedReferral, setSelectedReferral] = useState(null);
  const getStatusVariant = (status) => (status === 'Aktif' ? 'success' : 'info');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Darurat': return 'bg-red-100 text-red-700  ';
      case 'Segera': return 'bg-amber-100 text-amber-700  ';
      default: return 'bg-emerald-100 text-emerald-700  ';
    }
  };

  return (
    <motion.div
      className="space-y-6 sm:p-2 lg:p-6"
      initial="initial"
      animate="animate"
      variants={slideUp}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 ">Daftar Rujukan</h1>
          <p className="text-gray-500 ">Kelola dan pantau rujukan masuk serta rujukan aktif.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pasien atau ID..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300  bg-white  text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]"
            />
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200  bg-gray-50 ">
                <th className="p-4 text-sm font-medium text-gray-500 ">ID Rujukan</th>
                <th className="p-4 text-sm font-medium text-gray-500 ">Pasien</th>
                <th className="p-4 text-sm font-medium text-gray-500 ">Fasilitas Asal</th>
                <th className="p-4 text-sm font-medium text-gray-500 ">Tanggal</th>
                <th className="p-4 text-sm font-medium text-gray-500 ">Status</th>
                <th className="p-4 text-sm font-medium text-gray-500 ">Prioritas</th>
                <th className="p-4 text-sm font-medium text-gray-500 ">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200  text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50  transition-colors">
                    <td className="p-4 font-medium text-gray-900 ">{item.id}</td>
                    <td className="p-4 text-gray-700 ">{item.pasien}</td>
                    <td className="p-4 text-gray-700 ">{item.asal}</td>
                    <td className="p-4 text-gray-700 ">{item.tanggal}</td>
                    <td className="p-4">
                      <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.prioritas)}`}>
                        {item.prioritas}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="primary" onClick={() => setSelectedReferral(item)}>
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500 ">
                    Tidak ada data rujukan masuk atau aktif.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {selectedReferral && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="referral-detail-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedReferral(null);
            }}
          >
            <motion.div
              className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl "
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted">Detail Rujukan</p>
                  <h2 id="referral-detail-title" className="mt-1 text-xl font-bold text-text ">{selectedReferral.id}</h2>
                </div>
                <Badge variant={getStatusVariant(selectedReferral.status)}>{selectedReferral.status}</Badge>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <section>
                  <h3 className="text-sm font-bold text-text ">Informasi Pasien</h3>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div><dt className="text-muted">Nama pasien</dt><dd className="mt-1 font-semibold text-text ">{selectedReferral.pasien}</dd></div>
                    <div><dt className="text-muted">No. rekam medis</dt><dd className="mt-1 font-semibold text-text ">{selectedReferral.noRm}</dd></div>
                    <div><dt className="text-muted">Tanggal lahir / jenis kelamin</dt><dd className="mt-1 font-semibold text-text ">{selectedReferral.tanggalLahir} · {selectedReferral.jenisKelamin}</dd></div>
                  </dl>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-text ">Informasi Rujukan</h3>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div><dt className="text-muted">Fasilitas asal</dt><dd className="mt-1 font-semibold text-text ">{selectedReferral.asal}</dd></div>
                    <div><dt className="text-muted">Fasilitas tujuan</dt><dd className="mt-1 font-semibold text-text ">{selectedReferral.tujuan}</dd></div>
                    <div><dt className="text-muted">Dibuat pada</dt><dd className="mt-1 font-semibold text-text ">{selectedReferral.waktuDibuat}</dd></div>
                  </dl>
                </section>
              </div>
              <section className="mt-6 rounded-xl bg-secondary/50 p-4 ">
                <h3 className="text-sm font-bold text-text ">Kondisi Medis</h3>
                <p className="mt-2 text-sm font-semibold text-text ">{selectedReferral.diagnosis}</p>
                <p className="mt-1 text-sm text-muted ">{selectedReferral.catatan}</p>
              </section>
              <div className="mt-4 flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm ">
                <span className="text-muted">Prioritas penanganan</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityColor(selectedReferral.prioritas)}`}>{selectedReferral.prioritas}</span>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setSelectedReferral(null)}>Tutup</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
