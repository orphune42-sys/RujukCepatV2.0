import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const notificationsByRole = {
  pasien: [
    { title: 'Rujukan menunggu konfirmasi', description: 'RSUP Dr. Sardjito sedang meninjau rujukan Anda.', time: '10 menit lalu' },
    { title: 'Pengingat jadwal kunjungan', description: 'Kunjungan Anda dijadwalkan pada 15 Okt 2026.', time: '1 jam lalu' },
  ],
  admin_rs: [
    { title: 'Rujukan baru masuk', description: 'Eka Wahyu dirujuk dari Puskesmas Cisadea.', time: '10 menit lalu' },
    { title: 'Ketersediaan ICU diperbarui', description: 'Tersisa 2 dari 10 tempat tidur ICU.', time: '30 menit lalu' },
    { title: 'Jadwal dokter berubah', description: 'Jadwal Poli Penyakit Dalam telah diperbarui.', time: '1 jam lalu' },
  ],
  admin_apotek: [
    { title: 'Resep baru diterima', description: 'TRX-20260812-004 menunggu untuk diproses.', time: '5 menit lalu' },
    { title: 'Stok obat menipis', description: 'Paracetamol 500mg perlu segera diisi ulang.', time: '45 menit lalu' },
  ],
};

export default function NotificationMenu({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = notificationsByRole[role] ?? [];

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Buka notifikasi"
        aria-expanded={isOpen}
        className="relative grid h-11 w-11 place-items-center rounded-xl bg-accent text-white shadow-sm transition-colors hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-white shadow-xl  ">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 ">
            <h2 className="font-semibold text-text ">Notifikasi</h2>
            <button type="button" onClick={() => setIsOpen(false)} className="flex items-center gap-1 text-xs font-medium text-accent hover:underline ">
              Tutup
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.title} className="border-b border-border px-4 py-3 last:border-0 ">
                <p className="text-sm font-semibold text-text ">{notification.title}</p>
                <p className="mt-1 text-sm text-muted ">{notification.description}</p>
                <p className="mt-2 text-xs text-muted/80 ">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
