import { create } from 'zustand';

// Roles: 'guest', 'pasien', 'admin_rs', 'admin_apotek'

const useAppStore = create((set) => ({
  role: 'guest',
  isDarkMode: false,
  
  setRole: (newRole) => set({ role: newRole }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Dummy user data
  user: {
    name: 'Budi Santoso',
    id: 'P-10293',
    insurance: 'BPJS Kesehatan',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  
  // Dummy RS Admin data
  adminRs: {
    hospitalName: 'RSUP Dr. Sardjito',
    hospitalId: 'RS-001',
    name: 'Dr. Andi'
  },
  
  // Dummy Apotek Admin data
  adminApotek: {
    pharmacyName: 'Apotek Kimia Farma',
    pharmacyId: 'AP-001',
    name: 'Apt. Rina'
  }
}));

export default useAppStore;
