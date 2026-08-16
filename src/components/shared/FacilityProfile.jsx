import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Bell, Shield, Edit2, FileText, Mail, MapPin, Phone, Settings, X, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { slideUp, staggerContainer } from '../../utils/animations';

const fieldClass = 'w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-text outline-none transition-shadow focus:ring-2 focus:ring-primary';

export default function FacilityProfile({ title, description, initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const startEditing = () => {
    setDraft(profile);
    setIsEditing(true);
  };
  const saveProfile = (event) => {
    event.preventDefault();
    setProfile(draft);
    setIsEditing(false);
    setMessage('Profil fasilitas berhasil diperbarui.');
  };
  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const handlePhotoChange = (event) => {
    const [file] = event.target.files;
    if (file) updateDraft('image', URL.createObjectURL(file));
  };

  return (
    <motion.div className="mx-auto max-w-7xl space-y-6 sm:p-2 lg:p-6" variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={slideUp}>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-gray-500">{description}</p>
      </motion.div>

      <motion.div variants={slideUp}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                {profile.image ? <img src={profile.image} alt={`Foto ${profile.name}`} className="h-full w-full object-cover" /> : <div className="grid h-full w-full place-items-center text-accent"><Building2 className="h-11 w-11" /></div>}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="mt-1 text-gray-500">{profile.type}</p>
                <span className="mt-3 inline-flex rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-accent">Fasilitas terverifikasi</span>
              </div>
              <Button variant="outline" className="w-full shrink-0 md:w-auto" onClick={startEditing}><Edit2 className="mr-2 h-4 w-4" />Edit Profil</Button>
            </div>
            {message && <p role="status" className="mt-5 rounded-lg bg-secondary/60 p-3 text-sm text-accent">{message}</p>}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div variants={slideUp} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-accent" />Informasi Fasilitas</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <ProfileValue label="Nama Fasilitas" value={profile.name} />
                <ProfileValue label="Jenis Fasilitas" value={profile.type} />
                <ProfileValue label="Nomor Registrasi" value={profile.registrationNumber} icon={FileText} />
                <ProfileValue label="Penanggung Jawab" value={profile.personInCharge} />
                <ProfileValue label="Email" value={profile.email} icon={Mail} />
                <ProfileValue label="Nomor Telepon" value={profile.phone} icon={Phone} />
                <ProfileValue label="Alamat" value={profile.address} icon={MapPin} className="sm:col-span-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp}>
          <Card className="h-full">
            <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-accent" />Pengaturan Akun</CardTitle></CardHeader>
            <CardContent className="space-y-1 p-3">
              <SettingButton icon={Bell} label="Notifikasi" onClick={() => setMessage('Pengaturan notifikasi dibuka.')} />
              <SettingButton icon={Shield} label="Privasi & Keamanan" onClick={() => setMessage('Pengaturan privasi dan keamanan dibuka.')} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setIsEditing(false); }}>
            <motion.form onSubmit={saveProfile} className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }}>
              <button type="button" onClick={() => setIsEditing(false)} className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:bg-secondary" aria-label="Tutup"><X className="h-5 w-5" /></button>
              <h2 className="text-xl font-bold text-text">Edit Profil Fasilitas</h2>
              <p className="mt-1 text-sm text-muted">Perbarui data fasilitas dan kontak penanggung jawab.</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-secondary">
                  {draft.image ? <img src={draft.image} alt="Pratinjau foto fasilitas" className="h-full w-full object-cover" /> : <div className="grid h-full w-full place-items-center text-accent"><Building2 className="h-8 w-8" /></div>}
                </div>
                <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-text hover:bg-secondary"><Camera className="h-4 w-4" />Ganti Foto<input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" /></label>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField label="Nama Fasilitas"><input value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} required className={fieldClass} /></ProfileField>
                <ProfileField label="Penanggung Jawab"><input value={draft.personInCharge} onChange={(event) => updateDraft('personInCharge', event.target.value)} required className={fieldClass} /></ProfileField>
                <ProfileField label="Email"><input type="email" value={draft.email} onChange={(event) => updateDraft('email', event.target.value)} required className={fieldClass} /></ProfileField>
                <ProfileField label="Nomor Telepon"><input type="tel" value={draft.phone} onChange={(event) => updateDraft('phone', event.target.value)} required className={fieldClass} /></ProfileField>
                <ProfileField label="Nomor Registrasi"><input value={draft.registrationNumber} onChange={(event) => updateDraft('registrationNumber', event.target.value)} required className={fieldClass} /></ProfileField>
                <ProfileField label="Alamat" className="sm:col-span-2"><textarea rows="3" value={draft.address} onChange={(event) => updateDraft('address', event.target.value)} required className={`${fieldClass} resize-none`} /></ProfileField>
              </div>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Batal</Button><Button type="submit">Simpan Perubahan</Button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProfileValue({ label, value, icon: Icon, className = '' }) {
  return <div className={className}><p className="flex items-center gap-1.5 text-sm text-gray-500">{Icon && <Icon className="h-3.5 w-3.5" />}{label}</p><p className="mt-1 font-medium text-gray-900">{value}</p></div>;
}

function ProfileField({ label, children, className = '' }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm text-gray-600">{label}</span>{children}</label>;
}

function SettingButton({ icon: Icon, label, onClick }) {
  return <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-gray-700 transition-colors hover:bg-gray-50"><Icon className="h-5 w-5 text-gray-400" /><span className="font-medium">{label}</span></button>;
}
