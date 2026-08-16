import React from 'react';
import FacilityProfile from '../../components/shared/FacilityProfile';

export default function Profil() {
  return <FacilityProfile title="Profil Rumah Sakit" description="Kelola informasi fasilitas dan akun rumah sakit Anda." initialProfile={{ name: 'RSUP Dr. Sardjito', type: 'Rumah Sakit Umum Pusat', registrationNumber: 'RS-001-3471', personInCharge: 'Dr. Andi Pratama', email: 'admin@rsupsardjito.id', phone: '0274-631190', address: 'Jl. Kesehatan No. 1, Sleman, DI Yogyakarta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qE0c1msns5qEa3RUbUwueqn0B2YdJewUFpVA3EtibJNrbhR-9cAhXdI&s=10' }} />;
}
