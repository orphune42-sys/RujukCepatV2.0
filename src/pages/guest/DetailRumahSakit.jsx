import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Activity, BedDouble, Shield, ArrowLeft, HeartPulse } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MapView from '../../components/shared/MapView';
import { staggerContainer, slideUp, fadeIn } from '../../utils/animations';
import mockHospitals from '../../data/hospitals.json';

export default function DetailRumahSakit() {
  const { id } = useParams();
  const hospital = mockHospitals.find(h => h.id === id) || mockHospitals[0];
  const isHospital = hospital.type.toLowerCase().includes('rumah sakit') || hospital.type.toLowerCase().includes('rs');

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen pb-20">
      {/* Header / Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <img 
          src={hospital.image} 
          alt={hospital.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 pt-16 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-8">
            <Link to="/#cari-fk" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Pencarian
            </Link>
            
            <motion.div initial="initial" animate="animate" variants={fadeIn}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {isHospital && hospital.class && (
                  <Badge variant="primary" className="bg-primary text-[#1a2e22]">
                    Kelas {hospital.class}
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-yellow-400 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-medium">
                  <Star className="h-4 w-4 fill-current" /> {hospital.rating}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{hospital.name}</h1>
              <p className="text-gray-200 text-lg flex items-center gap-2 max-w-2xl">
                <MapPin className="h-5 w-5 shrink-0" /> {hospital.address}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="space-y-8">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-8">
              
              {/* Ketersediaan */}
              <motion.section variants={slideUp}>
                <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
                  Informasi Ketersediaan
                </h2>
                <div className="flex flex-col gap-4">
                  <Card className="bg-white dark:bg-[#15241b] border-none shadow-sm transition-all hover:shadow-md">
                    <CardContent className="p-6 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-muted dark:text-gray-400 mb-0">IGD</h3>
                      <p className="text-4xl font-bold text-green-600 dark:text-green-400">{hospital.availability.igd} <span className="text-base font-normal">Bed</span></p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-[#15241b] border-none shadow-sm transition-all hover:shadow-md">
                    <CardContent className="p-6 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-muted dark:text-gray-400 mb-0">ICU</h3>
                      <p className="text-4xl font-bold text-red-500">{hospital.availability.icu} <span className="text-base font-normal">Bed</span></p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-[#15241b] border-none shadow-sm transition-all hover:shadow-md">
                    <CardContent className="p-6 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-muted dark:text-gray-400 mb-0">Rawat Inap</h3>
                      <p className="text-4xl font-bold text-blue-500">{hospital.availability.rawatInap} <span className="text-base font-normal">Bed</span></p>
                    </CardContent>
                  </Card>
                </div>
              </motion.section>

            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#15241b] border-none shadow-sm sticky top-[90px]">
              <CardContent className="p-8">
                <Link to="/login" className="block">
                  <Button size="lg" className="w-full mb-8 text-lg py-6 shadow-lg shadow-primary/20">
                    Buat Rujukan
                  </Button>
                </Link>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Kontak</h4>
                    <p className="flex items-center gap-2 text-text dark:text-gray-300 font-medium text-lg">
                      <Phone className="h-5 w-5 text-primary" /> {hospital.phone}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-border dark:border-border-dark">
                    <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Lokasi</h4>
                    <div className="rounded-xl overflow-hidden shadow-sm h-[320px] border border-border dark:border-border-dark relative">
                      <MapView hospitals={[hospital]} height="100%" center={[hospital.lat, hospital.lng]} zoom={15} />
                    </div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-3 text-accent dark:text-primary text-sm font-medium flex items-center hover:underline"
                    >
                      Buka di Google Maps <ArrowLeft className="h-4 w-4 ml-1 rotate-135" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
