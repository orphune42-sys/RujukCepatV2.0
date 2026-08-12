import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star, ChevronRight, Activity, BedDouble } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MapView from '../../components/shared/MapView';
import { staggerContainer, slideUp } from '../../utils/animations';
import mockHospitals from '../../data/hospitals.json';

export default function CariRumahSakit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Normally we would fetch this from an API
  const hospitals = mockHospitals;

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen">
      {/* Header & Search */}
      <div className="bg-white dark:bg-[#15241b] border-b border-border dark:border-border-dark pt-8 pb-6 sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark">Cari Fasilitas Kesehatan</h1>
            
            <div className="flex items-center gap-2 bg-secondary dark:bg-[#1c3626] p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-black/20 text-accent dark:text-primary shadow-sm' : 'text-muted'}`}
              >
                Daftar
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'map' ? 'bg-white dark:bg-black/20 text-accent dark:text-primary shadow-sm' : 'text-muted'}`}
              >
                Peta
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <input 
                type="text" 
                placeholder="Cari nama RS, spesialisasi, atau lokasi..." 
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-border dark:border-border-dark bg-background dark:bg-[#0a120e] text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 hidden md:flex">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {viewMode === 'list' ? (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 hidden lg:block">
              <Card className="sticky top-[140px]">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filter
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-muted">Tipe Fasilitas</h4>
                      <div className="space-y-2">
                        {['Rumah Sakit Umum', 'Klinik Utama', 'Puskesmas', 'Apotek'].map(type => (
                          <label key={type} className="flex items-center gap-2 text-sm text-text dark:text-gray-300">
                            <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300" />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-muted">Kelas RS</h4>
                      <div className="flex flex-wrap gap-2">
                        {['A', 'B', 'C', 'D'].map(kelas => (
                          <div key={kelas} className="w-10 h-10 rounded-lg border border-border dark:border-border-dark flex items-center justify-center text-sm hover:border-primary hover:text-primary cursor-pointer transition-colors">
                            {kelas}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-9">
              <motion.div 
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="space-y-4"
              >
                <div className="text-sm text-muted mb-2">Menampilkan {filteredHospitals.length} fasilitas kesehatan</div>
                
                {filteredHospitals.map(hospital => (
                  <motion.div key={hospital.id} variants={slideUp}>
                    <Card hover className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative">
                          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                          <Badge variant="primary" className="absolute top-3 right-3 shadow-md">
                            Kelas {hospital.class}
                          </Badge>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-text dark:text-text-dark mb-1">{hospital.name}</h3>
                              <p className="text-sm text-muted flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {hospital.type}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md text-sm font-medium">
                              <Star className="h-4 w-4 fill-current" /> {hospital.rating}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted dark:text-gray-400 mb-4 line-clamp-2">
                            {hospital.address}
                          </p>

                          <div className="grid grid-cols-3 gap-2 mb-5">
                            <div className="bg-gray-50 dark:bg-black/20 p-2 rounded-lg text-center border border-border/50 dark:border-border-dark/50">
                              <div className="text-xs text-muted mb-1 flex items-center justify-center gap-1">
                                <Activity className="h-3 w-3" /> IGD
                              </div>
                              <div className="font-semibold text-green-600 dark:text-green-400">{hospital.availability.igd} Bed</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-black/20 p-2 rounded-lg text-center border border-border/50 dark:border-border-dark/50">
                              <div className="text-xs text-muted mb-1 flex items-center justify-center gap-1">
                                <Activity className="h-3 w-3" /> ICU
                              </div>
                              <div className="font-semibold text-red-500">{hospital.availability.icu} Bed</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-black/20 p-2 rounded-lg text-center border border-border/50 dark:border-border-dark/50">
                              <div className="text-xs text-muted mb-1 flex items-center justify-center gap-1">
                                <BedDouble className="h-3 w-3" /> Inap
                              </div>
                              <div className="font-semibold text-blue-500">{hospital.availability.rawatInap} Bed</div>
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {hospital.specialties.slice(0, 3).map((spec, idx) => (
                                <Badge key={idx} variant="default" className="text-[10px]">
                                  {spec}
                                </Badge>
                              ))}
                              {hospital.specialties.length > 3 && (
                                <Badge variant="default" className="text-[10px]">+{hospital.specialties.length - 3}</Badge>
                              )}
                            </div>
                            <Link to={`/rs/${hospital.id}`}>
                              <Button variant="outline" size="sm">
                                Detail <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full h-[70vh] min-h-[500px]"
          >
            <MapView hospitals={filteredHospitals} height="100%" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
