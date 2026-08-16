import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { slideUp } from '../../utils/animations';
import { User, Activity, MapPin, Check, CheckCircle2, X } from 'lucide-react';

const steps = [
  { id: 1, name: 'Data Pasien', icon: User },
  { id: 2, name: 'Kondisi Medis', icon: Activity },
  { id: 3, name: 'Fasilitas Tujuan', icon: MapPin },
];
const formInputClass = 'h-11 w-full rounded-xl border border-border bg-[#f8faf9] px-4 py-2 text-sm text-text transition-all placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/60';

export default function BuatRujukan() {
  const [currentStep, setCurrentStep] = useState(1);
  const [gender, setGender] = useState('Laki-laki');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const closeSuccessModal = () => {
    setIsSuccessOpen(false);
    setCurrentStep(1);
  };

  return (
    <motion.div
      className="w-full max-w-none space-y-6 sm:p-2 lg:p-6"
      initial="initial"
      animate="animate"
      variants={slideUp}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 ">Buat Rujukan Baru</h1>
        <p className="text-gray-500 ">Formulir pembuatan rujukan pasien ke fasilitas kesehatan lain.</p>
      </div>

      {/* Stepper */}
      <div className="relative mb-8 grid grid-cols-3">
        <div className="absolute left-[16.6667%] right-[16.6667%] top-6 z-0 h-0.5 rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2.5">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center border-4 border-white transition-colors ${
                  isActive || isCompleted
                    ? 'bg-accent text-white shadow-sm shadow-accent/30'
                    : 'bg-secondary text-accent shadow-sm'
                }`}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
              </div>
              <span className={`text-base font-semibold ${isActive ? 'text-accent' : 'text-muted'}`}>
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
                    <label className="text-sm font-medium text-gray-700 ">Nomor Rekam Medis</label>
                    <input type="text" className={formInputClass} placeholder="Masukkan No. RM" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Nama Pasien</label>
                    <input type="text" className={formInputClass} placeholder="Nama Lengkap" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Tanggal Lahir</label>
                    <input type="date" className={formInputClass} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Jenis Kelamin</label>
                    <Select value={gender} onChange={setGender} ariaLabel="Jenis kelamin" buttonClassName="h-10 rounded-xl border-border bg-[#f8faf9] focus:ring-primary/60" options={[{ value: 'Laki-laki', label: 'Laki-laki' }, { value: 'Perempuan', label: 'Perempuan' }]} />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Diagnosis Awal</label>
                    <input type="text" className={formInputClass} placeholder="Masukkan diagnosis" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Catatan Medis Tambahan</label>
                    <textarea rows={4} className={`${formInputClass} h-auto min-h-[120px] resize-y py-3`} placeholder="Detail kondisi pasien..."></textarea>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Pilih Rumah Sakit Tujuan</label>
                    <input type="text" placeholder="Masukkan nama rumah sakit tujuan" className={formInputClass}/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Prioritas Rujukan</label>
                    <div className="flex gap-4">
                      {['Rutin', 'Segera', 'Darurat'].map((p) => (
                        <label key={p} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="priority" className="accent-accent focus:ring-primary" />
                          <span className="text-sm text-gray-700 ">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="justify-between bg-transparent border-t border-gray-100 ">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Kembali
          </Button>
          <Button
            variant="primary"
            onClick={currentStep === steps.length ? () => setIsSuccessOpen(true) : nextStep}
          >
            {currentStep === steps.length ? 'Buat Rujukan' : 'Selanjutnya'}
          </Button>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {isSuccessOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#102719]/45 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="referral-success-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSuccessModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl "
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={closeSuccessModal} className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:bg-secondary hover:text-text  " aria-label="Tutup notifikasi">
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary/20 text-accent ">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 id="referral-success-title" className="text-2xl font-bold text-text ">Rujukan berhasil dibuat</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted ">Rujukan pasien telah berhasil dibuat dan siap diteruskan ke fasilitas kesehatan tujuan.</p>
              <Button type="button" onClick={closeSuccessModal} className="mt-7 w-full justify-center">Kembali</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
