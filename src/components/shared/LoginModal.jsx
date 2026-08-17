import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, Pill, Hospital, Mail, Lock, UserPlus, ArrowLeft, Phone, CalendarDays, Droplets, MapPin, Building2 } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import Select from '../ui/Select';

export default function LoginModal({ isOpen, onClose, initialMode = 'login' }) {
  const [activeTab, setActiveTab] = useState('pasien');
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [registrationGender, setRegistrationGender] = useState('');
  const [registrationBloodType, setRegistrationBloodType] = useState('');
  const [facilityClass, setFacilityClass] = useState('');
  const [registerStep, setRegisterStep] = useState(1);
  const [registerError, setRegisterError] = useState('');
  // Ref untuk wrapper — kita set pointer-events:none segera saat close
  const wrapperRef = useRef(null);
  const { setRole } = useAppStore();
  const navigate = useNavigate();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setActiveTab('pasien');
      setRegistrationGender('');
      setRegistrationBloodType('');
      setFacilityClass('');
      setRegisterStep(1);
      setRegisterError('');
      if (wrapperRef.current) {
        wrapperRef.current.style.pointerEvents = 'auto';
      }
    }
  }, [isOpen, initialMode]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    // Langsung matikan pointer-events pada wrapper supaya exit animation tidak memblokir klik
    if (wrapperRef.current) {
      wrapperRef.current.style.pointerEvents = 'none';
    }
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'register' && registerStep === 1) {
      if (activeTab === 'pasien' && (!registrationGender || !registrationBloodType)) {
        setRegisterError('Pilih jenis kelamin dan golongan darah terlebih dahulu.');
        return;
      }
      if (activeTab === 'admin_rs' && !facilityClass) {
        setRegisterError('Pilih kelas rumah sakit terlebih dahulu.');
        return;
      }
      setRegisterError('');
      setRegisterStep(2);
      return;
    }
    setRole(activeTab);
    onClose();
    navigate(`/${activeTab.replace('_', '-')}`);
  };

  const roles = [
    { id: 'pasien', label: 'Pasien', icon: <User className="h-5 w-5" /> },
    { id: 'admin_rs', label: 'Rumah Sakit', icon: <Hospital className="h-5 w-5" /> },
    { id: 'admin_apotek', label: 'Apotek', icon: <Pill className="h-5 w-5" /> },
  ];
  const isPatientRegistration = mode === 'register' && activeTab === 'pasien';
  const isFacilityRegistration = mode === 'register' && ['admin_rs', 'admin_apotek'].includes(activeTab);
  const isPersonalDataStep = mode === 'register' && registerStep === 1;
  const isCredentialStep = mode === 'login' || (mode === 'register' && registerStep === 2);

  const modalContent = (
    <div ref={wrapperRef}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className={`relative w-full ${mode === 'register' ? 'max-w-[640px]' : 'max-w-[420px]'} bg-white  rounded-[24px] shadow-2xl overflow-hidden border border-border  flex flex-col max-h-[90vh]`}
            >
              <div className="relative flex items-center justify-center p-6 shrink-0">
                {mode === 'register' && (
                  <button
                    onClick={() => registerStep === 2 ? setRegisterStep(1) : setMode('login')}
                    type="button"
                    className="absolute left-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary  text-text  transition-transform active:scale-75"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h2 className="text-xl font-semibold tracking-tight text-text ">
                  {mode === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                </h2>
                <button
                  onClick={handleClose}
                  type="button"
                  className="absolute right-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary  text-text  transition-transform active:scale-75"
                >
                  <X className="h-5 w-5 opacity-75" />
                </button>
              </div>

              <div className="px-6 pb-6 overflow-y-auto custom-scrollbar">
                <div className="relative flex p-1 bg-secondary/70  rounded-[16px] mb-6 shrink-0">
                  {roles.map((r) => {
                    const isActive = activeTab === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => { setActiveTab(r.id); setRegisterStep(1); setRegisterError(''); setFacilityClass(''); }}
                        className={`relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 text-[10px] sm:text-sm font-medium rounded-xl transition-colors duration-200 z-10 ${
                          isActive
                            ? 'text-accent '
                            : 'text-muted hover:text-text '
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-white  rounded-xl shadow-sm border border-border/50 "
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 leading-none">
                          {r.icon}
                          <span>{r.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.form
                    key={`${mode}-${registerStep}`}
                    initial={{ opacity: 0, x: mode === 'register' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === 'register' ? -20 : 20 }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {isPersonalDataStep && (
                      <>
                        {isPatientRegistration && <div>
                          <label className="sr-only">Nama Lengkap</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <UserPlus className="h-5 w-5 text-muted " />
                            </div>
                            <input type="text" className="w-full h-12 pl-12 pr-4 bg-secondary/40  border border-transparent focus:border-accent focus:ring-1 focus:ring-accent   rounded-2xl outline-none transition-all placeholder:text-muted  text-text  text-sm" placeholder="Nama Lengkap" required />
                          </div>
                        </div>}
                        {isPatientRegistration && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <RegisterField icon={<Phone className="h-5 w-5" />} type="tel" placeholder="Nomor telepon" required />
                          <RegisterField icon={<CalendarDays className="h-5 w-5" />} type="date" aria-label="Tanggal lahir" required />
                          <Select value={registrationGender} onChange={setRegistrationGender} icon={<User className="h-5 w-5" />} placeholder="Jenis kelamin" ariaLabel="Jenis kelamin" buttonClassName="h-12 rounded-2xl border-transparent bg-secondary/40 " options={[{ value: 'Laki-laki', label: 'Laki-laki' }, { value: 'Perempuan', label: 'Perempuan' }]} />
                          <Select value={registrationBloodType} onChange={setRegistrationBloodType} icon={<Droplets className="h-5 w-5" />} placeholder="Golongan darah" ariaLabel="Golongan darah" buttonClassName="h-12 rounded-2xl border-transparent bg-secondary/40 " options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bloodType) => ({ value: bloodType, label: bloodType }))} />
                          <div className="relative sm:col-span-2"><div className="absolute left-0 top-0 z-10 flex pt-3 pl-4 pointer-events-none"><MapPin className="h-5 w-5 text-muted " /></div><textarea aria-label="Alamat lengkap" required rows="3" placeholder="Alamat lengkap" className="w-full resize-none rounded-2xl border border-transparent bg-secondary/40 py-3 pl-12 pr-4 text-sm text-text outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent  " /></div>
                        </div>}
                        {isFacilityRegistration && <FacilityRegistrationFields role={activeTab} facilityClass={facilityClass} setFacilityClass={setFacilityClass} />}
                      </>
                    )}

                    {isPersonalDataStep && registerError && <p role="alert" className="text-sm text-red-600">{registerError}</p>}

                    {isCredentialStep && <>
                    <div>
                      <label className="sr-only">Email / Username</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-muted " />
                        </div>
                        <input
                          type="text"
                          className="w-full h-12 pl-12 pr-4 bg-secondary/40  border border-transparent focus:border-accent focus:ring-1 focus:ring-accent   rounded-2xl outline-none transition-all placeholder:text-muted  text-text  text-sm"
                          placeholder="Email atau username"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="sr-only">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-muted " />
                        </div>
                        <input
                          type="password"
                          className="w-full h-12 pl-12 pr-4 bg-secondary/40  border border-transparent focus:border-accent focus:ring-1 focus:ring-accent   rounded-2xl outline-none transition-all placeholder:text-muted  text-text  text-sm"
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>

                    {mode === 'register' && (
                      <div>
                        <label className="sr-only">Konfirmasi Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-muted " />
                          </div>
                          <input
                            type="password"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/40  border border-transparent focus:border-accent focus:ring-1 focus:ring-accent   rounded-2xl outline-none transition-all placeholder:text-muted  text-text  text-sm"
                            placeholder="Konfirmasi password"
                            required
                          />
                        </div>
                      </div>
                    )}
                    </>}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-accent  px-2.5 text-base font-medium text-white  transition-all active:scale-95 shadow-sm hover:opacity-90"
                      >
                        {mode === 'login' ? 'Masuk Sekarang' : registerStep === 1 ? 'Selanjutnya' : 'Daftar Sekarang'}
                      </button>
                    </div>

                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => { onClose(); navigate('/lupa-password'); }}
                        className="w-full text-sm text-muted  hover:text-text  transition-colors py-1"
                      >
                        Lupa password?
                      </button>
                    )}

                    <div className="text-center text-sm text-muted mt-2">
                      {mode === 'login' ? (
                        <>
                          Belum punya akun?{' '}
                          <button
                            type="button"
                            onClick={() => { setMode('register'); setRegisterStep(1); }}
                            className="text-accent  hover:underline font-medium"
                          >
                            Daftar
                          </button>
                        </>
                      ) : (
                        <>
                          Sudah punya akun?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('login')}
                            className="text-accent  hover:underline font-medium"
                          >
                            Masuk
                          </button>
                        </>
                      )}
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}

function RegisterField({ icon, ...props }) {
  return <div className="relative"><div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted ">{icon}</div><input className="h-12 w-full rounded-2xl border border-transparent bg-secondary/40 py-2 pl-12 pr-4 text-sm text-text outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent  " {...props} /></div>;
}

function FacilityRegistrationFields({ role, facilityClass, setFacilityClass }) {
  const isHospital = role === 'admin_rs';
  const facilityName = isHospital ? 'Nama rumah sakit' : 'Nama apotek';
  const licenseLabel = isHospital ? 'Nomor izin operasional' : 'Nomor izin apotek (SIA)';
  const personLabel = isHospital ? 'Nama penanggung jawab' : 'Nama apoteker penanggung jawab';
  const registrationNumberLabel = isHospital ? 'Nomor registrasi fasilitas' : 'Nomor STRA apoteker';

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="md:col-span-2"><RegisterField icon={<Building2 className="h-5 w-5" />} placeholder={facilityName} required /></div>
      {isHospital && <Select value={facilityClass} onChange={setFacilityClass} icon={<Shield className="h-5 w-5" />} placeholder="Kelas rumah sakit" ariaLabel="Kelas rumah sakit" buttonClassName="h-12 rounded-2xl border-transparent bg-secondary/40 " options={['Tipe A', 'Tipe B', 'Tipe C', 'Tipe D', 'Rumah Sakit Khusus'].map((facilityType) => ({ value: facilityType, label: facilityType }))} />}
      <RegisterField icon={<Phone className="h-5 w-5" />} type="tel" placeholder="Nomor telepon fasilitas" required />
      <div className={isHospital ? '' : 'md:col-span-2'}><RegisterField icon={<Shield className="h-5 w-5" />} placeholder={licenseLabel} required /></div>
      <RegisterField icon={<UserPlus className="h-5 w-5" />} placeholder={personLabel} required />
      <RegisterField icon={<Shield className="h-5 w-5" />} placeholder={registrationNumberLabel} required />
      <div className="relative md:col-span-2"><div className="pointer-events-none absolute left-0 top-0 z-10 flex pt-3 pl-4"><MapPin className="h-5 w-5 text-muted " /></div><textarea aria-label="Alamat fasilitas" required rows="3" placeholder="Alamat lengkap fasilitas" className="w-full resize-none rounded-2xl border border-transparent bg-secondary/40 py-3 pl-12 pr-4 text-sm text-text outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent  " /></div>
    </div>
  );
}
