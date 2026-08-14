import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { slideUp } from '../../utils/animations';
import { User, Activity, MapPin, Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'Data Pasien', icon: User },
  { id: 2, name: 'Kondisi Medis', icon: Activity },
  { id: 3, name: 'Fasilitas Tujuan', icon: MapPin },
];

export default function BuatRujukan() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto space-y-6"
      initial="initial"
      animate="animate"
      variants={slideUp}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Rujukan Baru</h1>
        <p className="text-gray-500 dark:text-gray-400">Formulir pembuatan rujukan pasien ke fasilitas kesehatan lain.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative mb-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 rounded-full">
          <div 
            className="h-full bg-[#9ccda5] transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-[#0f1913] transition-colors ${
                  isActive || isCompleted 
                    ? 'bg-[#9ccda5] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`text-sm font-medium ${isActive ? 'text-[#9ccda5]' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Rekam Medis</label>
                    <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]" placeholder="Masukkan No. RM" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Pasien</label>
                    <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]" placeholder="Nama Lengkap" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Lahir</label>
                    <input type="date" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kelamin</label>
                    <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]">
                      <option>Laki-laki</option>
                      <option>Perempuan</option>
                    </select>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Diagnosis Awal</label>
                    <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]" placeholder="Masukkan diagnosis" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Catatan Medis Tambahan</label>
                    <textarea rows={4} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]" placeholder="Detail kondisi pasien..."></textarea>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Rumah Sakit Tujuan</label>
                    <input type="text" placeholder="Masukkan nama rumah sakit tujuan" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1913] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9ccda5]"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prioritas Rujukan</label>
                    <div className="flex gap-4">
                      {['Rutin', 'Segera', 'Darurat'].map((p) => (
                        <label key={p} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="priority" className="text-[#9ccda5] focus:ring-[#9ccda5]" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="justify-between bg-transparent border-t border-gray-100 dark:border-gray-800">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
          >
            Kembali
          </Button>
          <Button 
            variant="primary" 
            onClick={currentStep === steps.length ? () => alert('Rujukan berhasil dibuat!') : nextStep}
          >
            {currentStep === steps.length ? 'Buat Rujukan' : 'Selanjutnya'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
