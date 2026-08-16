import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { slideUp, staggerContainer } from '../../utils/animations';
import { Navigation } from 'lucide-react';
import MapView from '../../components/shared/MapView';
import hospitalData from '../../data/hospitals.json';

export default function RekomendasiFasilitas() {
  const navigate = useNavigate();
  const [selectedFacilityId, setSelectedFacilityId] = useState(hospitalData[0]?.id);
  const selectedFacility = useMemo(
    () => hospitalData.find((facility) => facility.id === selectedFacilityId) ?? hospitalData[0],
    [selectedFacilityId]
  );

  return (
    <motion.div
      className="space-y-6 max-w-7xl mx-auto flex flex-col sm:p-2 lg:h-[calc(100vh-5rem)] lg:p-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Fasilitas</h1>
        <p className="text-gray-500">Temukan fasilitas kesehatan terdekat yang tersedia untuk rujukan.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:flex-1 lg:min-h-0">
        {/* List Fasilitas */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 pr-2 lg:overflow-y-auto custom-scrollbar">
          {hospitalData.map((facility, index) => (
            <motion.div key={facility.id} variants={slideUp} custom={index}>
              <Card hover onClick={() => setSelectedFacilityId(facility.id)} className={`cursor-pointer border-l-4 ${selectedFacilityId === facility.id ? 'border-l-[#9ccda5]' : 'border-l-transparent hover:border-l-[#9ccda5]'}`}>
                <CardContent className="p-4 flex gap-4">
                  {/* Foto Faskes */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-gray-100">
                    <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{facility.name}</h3>
                    <p className="text-xs text-[#9ccda5] font-medium">{facility.type}{facility.class ? ` Kelas ${facility.class}` : ''}</p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {index + 1}.{' '}{index + 2} km</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                        {facility.availability.rawatInap !== undefined ? `${facility.availability.rawatInap} Bed Tersedia` : (facility.availability.status ?? 'Tersedia')}
                      </span>
                      <Button
                        size="sm"
                        variant="primary"
                        className="h-7 px-3 text-xs font-bold rounded-lg"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/admin-rs/detailrs/${facility.id}`);
                        }}
                      >
                        Pilih
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={slideUp} className="h-[400px] w-full lg:h-auto lg:w-2/3 lg:flex-1">
          <MapView hospitals={hospitalData} height="100%" center={[selectedFacility.lat, selectedFacility.lng]} zoom={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}
