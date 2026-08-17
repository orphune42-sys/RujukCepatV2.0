import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MapPin, Phone, CheckCircle2, Circle, Clock, Download, ArrowLeft } from 'lucide-react';

const hospitalImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qE0c1msns5qEa3RUbUwueqn0B2YdJewUFpVA3EtibJNrbhR-9cAhXdI&s=10';

export default function DetailRujukan() {
  const navigate = useNavigate();
  const downloadReferral = () => {
    const letter = new Blob(['SURAT RUJUKAN\nNomor: RJ-20261015-1A\nTujuan: RSUP Dr. Sardjito\nPoli: Penyakit Dalam'], { type: 'text/plain' });
    const url = URL.createObjectURL(letter);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'surat-rujukan-RJ-20261015-1A.txt';
    link.click();
    URL.revokeObjectURL(url);
  };
  const timeline = [
    { status: 'Rujukan Dibuat', time: '12 Okt 2026, 08:30 WIB', description: 'Rujukan diterbitkan oleh Puskesmas Cidasea', completed: true },
    { status: 'Diverifikasi RS', time: '12 Okt 2026, 14:00 WIB', description: 'Rujukan telah diterima dan diverifikasi oleh RS Umum Lavalette', completed: true },
    { status: 'Menunggu Kunjungan', time: '15 Okt 2026, 09:00 WIB', description: 'Silakan datang sesuai jadwal ke Poli Penyakit Dalam', completed: false, current: true },
    { status: 'Selesai', time: '-', description: 'Pemeriksaan telah selesai dilakukan', completed: false }
  ];

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={slideUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-semibold text-gray-500 hover:text-accent mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali
          </button>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 ">Detail Rujukan</h1>
            <Badge variant="success">Aktif</Badge>
          </div>
          <p className="text-gray-500">No. RJ-20261015-1A</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto" onClick={downloadReferral}><Download className="w-4 h-4 mr-2"/> Unduh Surat Rujukan</Button>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Tujuan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
                  <img src={hospitalImage} alt="RSUP Dr. Sardjito" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 ">RSUP Dr. Sardjito</h3>
                  <p className="text-gray-500 ">Poli Penyakit Dalam • dr. Handoko, Sp.PD</p>

                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center text-sm text-gray-600 ">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      Jl. Kesehatan No.1, Senayan, Sleman, DIY
                    </div>
                    <div className="flex items-center text-sm text-gray-600 ">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      (0274) 587333
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50  p-4 rounded-xl border border-gray-100  flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500  mb-1">Jadwal Kunjungan</p>
                  <p className="font-semibold text-gray-900  text-lg">Kamis, 15 Okt 2026</p>
                  <p className="text-gray-600 ">09:00 - 11:00 WIB</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500  mb-1">Antrean Saat Ini</p>
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
              <div>
                <p className="text-gray-900 ">Pasien mengeluh nyeri perut bagian bawah berulang sejak 3 hari lalu. Hasil lab darah menunjukkan leukosit tinggi. Mohon evaluasi lanjutan dan USG abdomen.</p>
                <p className="text-sm text-gray-500  mt-2">Diagnosa Awal: K52.9 Noninfective gastroenteritis and colitis, unspecified</p>
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
              <div className="relative pl-6 border-l-2 border-gray-100  space-y-8 mt-2">
                {timeline.map((step, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-[35px] top-1 bg-white ">
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      ) : step.current ? (
                        <Clock className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 " />
                      )}
                    </span>
                    <div>
                      <h4 className={`font-semibold ${step.current ? 'text-yellow-600 ' : step.completed ? 'text-gray-900 ' : 'text-gray-400'}`}>
                        {step.status}
                      </h4>
                      <p className="text-xs text-gray-500  mt-1">{step.time}</p>
                      <p className="text-sm text-gray-600  mt-2">{step.description}</p>
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
