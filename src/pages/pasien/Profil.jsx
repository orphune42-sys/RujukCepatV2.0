import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { User, Settings, CreditCard, Bell, Shield, LogOut, Edit2, Camera } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function Profil() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profile, setProfile] = useState({
    name: 'Eka Wahyu',
    birthDate: '15 Agustus 1985 (38 Tahun)',
    gender: 'Laki-laki',
    bloodType: 'O+',
    phone: '0812-3456-7890',
    address: 'Jl. Bendungan Sigura-Gura No. 19 A, Sumbersari, Lowokwaru, Malang',
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const { setRole } = useAppStore();
  const navigate = useNavigate();
  const showMessage = (text) => setMessage(text);
  const startEditing = () => {
    setDraftProfile(profile);
    setIsEditModalOpen(true);
    setMessage('');
  };
  const cancelEditing = () => {
    setDraftProfile(profile);
    setIsEditModalOpen(false);
  };
  const saveProfile = (event) => {
    event.preventDefault();
    setProfile(draftProfile);
    setIsEditModalOpen(false);
    showMessage('Perubahan profil berhasil disimpan.');
  };
  const updateDraft = (field, value) => setDraftProfile((current) => ({ ...current, [field]: value }));
  const handlePhotoChange = (event) => {
    const [file] = event.target.files;
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };
  const confirmLogout = () => {
    setRole('guest');
    navigate('/');
  };
  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-6 sm:p-2 lg:p-6"
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
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-secondary text-3xl font-bold text-accent">
                {profilePhoto ? <img src={profilePhoto} alt={`Foto ${profile.name}`} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center">{profile.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</div>}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">NIK: 3404012345678901</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <Badge variant="primary" className="px-3 py-1 text-sm">Pasien BPJS</Badge>
                  <Badge variant="success" className="px-3 py-1 text-sm">Akun Terverifikasi</Badge>
                </div>
              </div>
              <Button variant="outline" className="shrink-0 w-full md:w-auto" onClick={startEditing}><Edit2 className="w-4 h-4 mr-2" /> Edit Profil</Button>
            </div>
            {message && <p role="status" className="mt-5 rounded-lg bg-secondary/60 p-3 text-sm text-accent">{message}</p>}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 items-stretch lg:grid-cols-3 gap-6">
        <motion.div variants={slideUp} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <ProfileValue label="Nama Lengkap" value={profile.name} />
                <ProfileValue label="Tanggal Lahir" value={profile.birthDate} />
                <ProfileValue label="Jenis Kelamin" value={profile.gender} />
                <ProfileValue label="Golongan Darah" value={profile.bloodType} />
                <ProfileValue label="Nomor Telepon" value={profile.phone} />
                <ProfileValue label="Alamat Lengkap" value={profile.address} className="sm:col-span-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} className="lg:col-span-1">
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Pengaturan
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-3">
              <button type="button" onClick={() => showMessage('Pengaturan notifikasi dibuka.')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left text-gray-700 dark:text-gray-200">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Notifikasi</span>
                </div>
              </button>
              <button type="button" onClick={() => showMessage('Pengaturan privasi & keamanan dibuka.')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left text-gray-700 dark:text-gray-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Privasi & Keamanan</span>
                </div>
              </button>
              <button type="button" onClick={() => setIsLogoutDialogOpen(true)} className="mt-auto w-full flex items-center justify-between border-t border-gray-100 p-3 pt-4 text-left text-red-600 transition-colors hover:bg-red-50 dark:border-gray-800 dark:text-red-400 dark:hover:bg-red-900/20">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={slideUp} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-accent" />Asuransi & Penjamin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary bg-primary/5 p-4 sm:flex-row sm:items-center dark:bg-primary/10">
                <div><p className="mb-1 text-sm text-gray-500 dark:text-gray-400">BPJS Kesehatan</p><p className="text-lg font-bold tracking-widest text-gray-900 dark:text-white">0001 2345 6789 0</p><p className="mt-1 text-sm font-medium text-primary">Kelas 1 - Aktif</p></div>
                <Button variant="outline" size="sm" onClick={() => showMessage('Silakan hubungi layanan BPJS untuk perubahan penjamin.')}>Ganti Penjamin</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" onMouseDown={(event) => { if (event.target === event.currentTarget) cancelEditing(); }}>
            <motion.form onSubmit={saveProfile} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#15241b]" initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 12 }}>
              <h2 id="edit-profile-title" className="text-xl font-bold text-text dark:text-text-dark">Edit Profil</h2>
              <p className="mt-1 text-sm text-muted dark:text-gray-400">Perbarui data pribadi dan foto profil Anda.</p>
              <div className="mt-5 flex items-center gap-4"><div className="h-20 w-20 overflow-hidden rounded-full bg-secondary">{profilePhoto ? <img src={profilePhoto} alt="Pratinjau foto profil" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-2xl font-bold text-accent">{profile.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</div>}</div><label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-text hover:bg-secondary dark:border-border-dark dark:text-text-dark"><Camera className="h-4 w-4" /> Ganti Foto<input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" /></label></div>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField label="Nama Lengkap"><Input value={draftProfile.name} onChange={(event) => updateDraft('name', event.target.value)} required /></ProfileField>
                <ProfileField label="Nomor Telepon"><Input type="tel" value={draftProfile.phone} onChange={(event) => updateDraft('phone', event.target.value)} required /></ProfileField>
                <ProfileField label="Tanggal Lahir"><Input value={draftProfile.birthDate} onChange={(event) => updateDraft('birthDate', event.target.value)} required /></ProfileField>
                <ProfileField label="Jenis Kelamin"><Select value={draftProfile.gender} onChange={(value) => updateDraft('gender', value)} options={[{ value: 'Laki-laki', label: 'Laki-laki' }, { value: 'Perempuan', label: 'Perempuan' }]} ariaLabel="Jenis kelamin" /></ProfileField>
                <ProfileField label="Golongan Darah"><Select value={draftProfile.bloodType} onChange={(value) => updateDraft('bloodType', value)} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bloodType) => ({ value: bloodType, label: bloodType }))} ariaLabel="Golongan darah" /></ProfileField>
                <ProfileField label="Alamat Lengkap" className="sm:col-span-2"><textarea value={draftProfile.address} onChange={(event) => updateDraft('address', event.target.value)} required rows="3" className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary dark:border-border-dark dark:bg-[#0a120e] dark:text-text-dark" /></ProfileField>
              </div>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={cancelEditing}>Batal</Button><Button type="submit">Simpan Perubahan</Button></div>
            </motion.form>
          </motion.div>
        )}
        {isLogoutDialogOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="logout-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsLogoutDialogOpen(false); }}>
            <motion.div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#15241b]" initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 12 }}>
              <h2 id="logout-title" className="text-xl font-bold text-text dark:text-text-dark">Keluar dari akun?</h2>
              <p className="mt-2 text-sm text-muted dark:text-gray-400">Anda perlu masuk kembali untuk mengakses informasi dan layanan pasien.</p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>Batal</Button>
                <Button variant="danger" onClick={confirmLogout}>Ya, Keluar</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProfileValue({ label, value, className = '' }) {
  return <div className={className}><p className="text-sm text-gray-500 dark:text-gray-400">{label}</p><p className="font-medium text-gray-900 dark:text-white">{value}</p></div>;
}

function ProfileField({ label, children, className = '' }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">{label}</span>{children}</label>;
}
