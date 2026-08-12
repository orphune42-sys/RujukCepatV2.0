import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Building2 } from 'lucide-react';
import Button from '../ui/Button';

// Fix Leaflet's default icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom Icon for hospitals
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapView({ hospitals = [], height = "400px", center = [-7.7956, 110.3695], zoom = 12 }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-border dark:border-border-dark z-0 relative" style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {hospitals.map((hospital) => (
          <Marker 
            key={hospital.id} 
            position={[hospital.lat, hospital.lng]}
            icon={hospitalIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[200px]">
                <h3 className="font-bold text-sm mb-1">{hospital.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{hospital.type} - Kelas {hospital.class}</p>
                
                <div className="flex gap-2 text-xs mb-3 font-medium bg-gray-50 p-2 rounded">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-gray-500">IGD</span>
                    <span className="text-green-600">{hospital.availability.igd}</span>
                  </div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-gray-500">ICU</span>
                    <span className="text-red-500">{hospital.availability.icu}</span>
                  </div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-gray-500">Rawat Inap</span>
                    <span className="text-blue-500">{hospital.availability.rawatInap}</span>
                  </div>
                </div>

                <Button variant="primary" size="sm" className="w-full h-8 text-xs">
                  Lihat Detail
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
