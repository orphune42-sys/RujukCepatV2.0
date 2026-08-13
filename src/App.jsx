import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from './store/useAppStore';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Landing from './pages/public/Landing';
import CariRumahSakit from './pages/public/CariRumahSakit';
import DetailRumahSakit from './pages/public/DetailRumahSakit';
import Tentang from './pages/public/Tentang';
import HubungiKami from './pages/public/HubungiKami';

// Pasien Pages
import PasienDashboard from './pages/pasien/Dashboard';
import PasienCariLayanan from './pages/pasien/CariLayanan';
import PasienRujukanSaya from './pages/pasien/RujukanSaya';
import PasienDetailRujukan from './pages/pasien/DetailRujukan';
import PasienLayananObat from './pages/pasien/LayananObat';
import PasienProfil from './pages/pasien/Profil';

// Admin RS Pages
import AdminRSDashboard from './pages/admin-rs/Dashboard';
import AdminRSBuatRujukan from './pages/admin-rs/BuatRujukan';
import AdminRSRujukanList from './pages/admin-rs/RujukanList';
import AdminRSKetersediaan from './pages/admin-rs/Ketersediaan';
import AdminRSJadwalDokter from './pages/admin-rs/JadwalDokter';
import AdminRSRekomendasiFasilitas from './pages/admin-rs/RekomendasiFasilitas';

// Admin Apotek Pages
import AdminApotekDashboard from './pages/admin-apotek/Dashboard';
import AdminApotekTransaksi from './pages/admin-apotek/Transaksi';
import AdminApotekDetailTransaksi from './pages/admin-apotek/DetailTransaksi';
import AdminApotekRiwayatTransaksi from './pages/admin-apotek/RiwayatTransaksi';

// Welcome Screen
import WelcomeScreen from './components/shared/WelcomeScreen';

function App() {
  const { isDarkMode, role } = useAppStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Simulate initial loading for welcome screen
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Middleware / Guard - in a real app, this would check auth tokens
  const RequireRole = ({ children, allowedRole }) => {
    if (role !== allowedRole) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen relative flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path="cari-rs" element={<Navigate to="/#cari-rs" replace />} />
            <Route path="rs/:id" element={<DetailRumahSakit />} />
            <Route path="tentang" element={<Navigate to="/#tentang" replace />} />
            <Route path="hubungi-kami" element={<Navigate to="/#hubungi-kami" replace />} />
          </Route>

          {/* Pasien Routes */}
          <Route 
            path="/pasien" 
            element={
              <RequireRole allowedRole="pasien">
                <DashboardLayout />
              </RequireRole>
            }
          >
            <Route index element={<PasienDashboard />} />
            <Route path="cari-layanan" element={<PasienCariLayanan />} />
            <Route path="rujukan" element={<PasienRujukanSaya />} />
            <Route path="rujukan/:id" element={<PasienDetailRujukan />} />
            <Route path="obat" element={<PasienLayananObat />} />
            <Route path="profil" element={<PasienProfil />} />
          </Route>

          {/* Admin RS Routes */}
          <Route 
            path="/admin-rs" 
            element={
              <RequireRole allowedRole="admin_rs">
                <DashboardLayout />
              </RequireRole>
            }
          >
            <Route index element={<AdminRSDashboard />} />
            <Route path="buat-rujukan" element={<AdminRSBuatRujukan />} />
            <Route path="rujukan/:status" element={<AdminRSRujukanList />} />
            <Route path="ketersediaan" element={<AdminRSKetersediaan />} />
            <Route path="jadwal-dokter" element={<AdminRSJadwalDokter />} />
            <Route path="rekomendasi" element={<AdminRSRekomendasiFasilitas />} />
          </Route>

          {/* Admin Apotek Routes */}
          <Route 
            path="/admin-apotek" 
            element={
              <RequireRole allowedRole="admin_apotek">
                <DashboardLayout />
              </RequireRole>
            }
          >
            <Route index element={<AdminApotekDashboard />} />
            <Route path="transaksi" element={<AdminApotekTransaksi />} />
            <Route path="transaksi/:id" element={<AdminApotekDetailTransaksi />} />
            <Route path="riwayat" element={<AdminApotekRiwayatTransaksi />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <AnimatePresence>
          {isInitialLoading && <WelcomeScreen />}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
