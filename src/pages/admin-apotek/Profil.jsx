import React from 'react';
import FacilityProfile from '../../components/shared/FacilityProfile';

export default function Profil() {
  return <FacilityProfile title="Profil Apotek" description="Kelola informasi fasilitas dan akun apotek Anda." initialProfile={{ name: 'Apotek Kimia Farma', type: 'Apotek', registrationNumber: 'SIA-3573-024', personInCharge: 'Apt. Rina Kusuma, S.Farm.', email: 'admin@kimiafarma-apotek.id', phone: '0341-567890', address: 'Jl. Soekarno Hatta No. 8, Kota Malang, Jawa Timur', image: 'https://apotek-k24.com/images/blog/16777494720240618045331yunita.isnacara%20buka%20franchise.jpg' }} />;
}
