import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, ArrowUpRight, Check, RotateCcw, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import MapView from '../../components/shared/MapView';
import mockHospitals from '../../data/hospitals.json';

const MotionLink = motion(Link);



export default function CariRumahSakit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const hospitals = mockHospitals;
  const facilityTypes = ['Rumah Sakit', 'Puskesmas', 'Klinik', 'Apotek', 'Laboratorium'];

  const getFacilityCategory = (type) => {
    const normalizedType = type.toLowerCase();
    if (normalizedType.includes('rumah sakit') || normalizedType.includes('rs')) return 'Rumah Sakit';
    if (normalizedType.includes('puskesmas')) return 'Puskesmas';
    if (normalizedType.includes('klinik')) return 'Klinik';
    if (normalizedType.includes('apotek')) return 'Apotek';
    if (normalizedType.includes('laboratorium')) return 'Laboratorium';
    return type;
  };

  const toggleFacilityType = (type) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  };

  const filteredHospitals = hospitals.filter(h =>
    (h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedTypes.length === 0 || selectedTypes.includes(getFacilityCategory(h.type)))
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-white dark:bg-background-dark">
      {/* Header & Search */}
      <div className="relative z-10 bg-white/90 dark:bg-[#15241b]/90 backdrop-blur-sm border-b border-border dark:border-border-dark pt-10 pb-7">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark">Cari Fasilitas Kesehatan</h1>
              <p className="text-sm text-muted mt-1">Temukan RS, klinik, atau apotek terdekat dari Anda</p>
            </div>
            <div className="flex items-center gap-2 bg-secondary dark:bg-[#1c3626] p-1 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-black/30 text-accent dark:text-primary shadow-sm' : 'text-muted hover:text-text'}`}
              >
                Daftar
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${viewMode === 'map' ? 'bg-white dark:bg-black/30 text-accent dark:text-primary shadow-sm' : 'text-muted hover:text-text'}`}
              >
                Peta
              </button>
            </div>
          </div>

          <div className="flex gap-3 relative">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Cari nama RS, fasilitas kesehatan, atau lokasi..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-border dark:border-border-dark bg-[#f8faf9] dark:bg-[#0a120e] text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/60 transition-shadow text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              aria-expanded={isFilterOpen}
              aria-controls="facility-filter"
              className="h-12 px-5 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-[#1c3626] text-sm font-semibold flex items-center gap-2 hover:bg-secondary dark:hover:bg-[#243d2e] transition-colors text-text dark:text-text-dark"
            >
              <Filter className="h-4 w-4" /> Filter
              {selectedTypes.length > 0 && (
                <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-primary text-[11px] text-accent font-bold">
                  {selectedTypes.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Tutup filter"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <motion.div
                    id="facility-filter"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute z-20 right-0 top-14 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border dark:border-border-dark bg-white dark:bg-[#15241b] p-4 shadow-xl"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h2 className="font-bold text-text dark:text-text-dark">Jenis fasilitas</h2>
                        <p className="text-xs text-muted mt-0.5">Pilih fasilitas yang ingin ditampilkan</p>
                      </div>
                      <button type="button" onClick={() => setIsFilterOpen(false)} className="p-1 text-muted hover:text-text dark:hover:text-text-dark" aria-label="Tutup">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      {facilityTypes.map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleFacilityType(type)}
                            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isSelected ? 'bg-primary/20 text-accent dark:text-primary' : 'text-text dark:text-text-dark hover:bg-secondary dark:hover:bg-[#1c3626]'}`}
                          >
                            {type}
                            <span className={`grid place-items-center h-5 w-5 rounded-md border ${isSelected ? 'border-accent bg-accent text-white dark:border-primary dark:bg-primary dark:text-[#15301e]' : 'border-border dark:border-border-dark'}`}>
                              {isSelected && <Check className="h-3.5 w-3.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between border-t border-border dark:border-border-dark mt-3 pt-3">
                      <button type="button" onClick={() => setSelectedTypes([])} disabled={selectedTypes.length === 0} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed">
                        <RotateCcw className="h-3.5 w-3.5" /> Reset
                      </button>
                      <button type="button" onClick={() => setIsFilterOpen(false)} className="text-xs font-bold text-accent dark:text-primary">Terapkan</button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted mb-6"
              >
                Menampilkan{' '}
                <span className="font-bold text-accent dark:text-primary">{filteredHospitals.length}</span>{' '}
                fasilitas kesehatan
              </motion.p>

              <div className="space-y-4">
                {filteredHospitals.map((hospital, i) => {
                  const igd = { text: 'text-green-600 dark:text-green-400', bg: 'bg-white dark:bg-[#15241b]', border: 'border-none' };
                  const icu = { text: 'text-red-500', bg: 'bg-white dark:bg-[#15241b]', border: 'border-none' };
                  const inap = { text: 'text-blue-500', bg: 'bg-white dark:bg-[#15241b]', border: 'border-none' };

                  return (
                    <motion.div
                      key={hospital.id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link to={`/rs/${hospital.id}`} className="group block">
                        <div className="w-full bg-white dark:bg-[#15241b] rounded-2xl border border-border dark:border-border-dark shadow-sm group-hover:shadow-lg group-hover:border-primary/30 dark:group-hover:border-primary/40 transition-all duration-300 overflow-hidden">
                          <div className="flex flex-col sm:flex-row">

                            {/* Image — tall left panel */}
                            <div className="relative sm:w-56 lg:w-64 h-48 sm:h-auto flex-shrink-0">
                              <img
                                src={hospital.image}
                                alt={hospital.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
                              {/* Class badge */}
                              <span className="absolute top-3 left-3 bg-primary text-[#1a2e22] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                                Kelas {hospital.class}
                              </span>
                            </div>

                            {/* Main content */}
                            <div className="flex-1 p-5 lg:p-6 flex flex-col gap-4 min-w-0">

                              {/* Row 1: name + rating */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h3 className="text-lg lg:text-xl font-bold text-text dark:text-text-dark group-hover:text-accent dark:group-hover:text-primary transition-colors truncate">
                                    {hospital.name}
                                  </h3>
                                  <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {hospital.type} · {hospital.address}
                                  </p>
                                </div>

                              </div>

                              {/* Row 2: Bed availability */}
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { label: 'IGD', val: hospital.availability.igd, c: igd },
                                  { label: 'ICU', val: hospital.availability.icu, c: icu },
                                  { label: 'Rawat Inap', val: hospital.availability.rawatInap, c: inap },
                                ].map(({ label, val, c }) => (
                                  <div key={label} className={`flex flex-col items-center justify-center py-3 rounded-xl border ${c.bg} ${c.border}`}>
                                    <span className={`text-xl font-bold leading-none ${c.text}`}>{val}</span>
                                    <span className="text-[10px] text-muted mt-1 font-semibold uppercase tracking-widest">{label}</span>
                                    <span className="text-[9px] text-muted/60">Bed</span>
                                  </div>
                                ))}
                              </div>

                              {/* Row 3: Specialties + CTA */}
                              <div className="flex items-center justify-between gap-3 mt-auto">
                                <div></div>
                                <span className="flex items-center gap-1 text-sm font-bold text-accent dark:text-primary shrink-0 group-hover:gap-2 transition-all">
                                  Detail <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                              </div>

                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[70vh] min-h-[500px] rounded-2xl overflow-hidden border border-border dark:border-border-dark shadow-sm"
            >
              <MapView hospitals={filteredHospitals} height="100%" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
