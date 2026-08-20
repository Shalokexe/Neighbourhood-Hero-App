import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Gig } from '../../shared/types/domain';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { LOCALITIES_SEED, CITIES_SEED } from '../../core/config/citiesData';
import { formatApproximateLocation, getMaskedCoordinates } from '../../core/services/geoService';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { MapPin, Navigation, Zap, Clock, ShieldCheck, X } from 'lucide-react';
import L from 'leaflet';

// Create custom leaflet markers
const createCustomMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #080B12;
        border: 2px solid ${color};
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px ${color}80;
      ">
        <div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

interface MapScreenProps {
  onSelectGig: (gig: Gig) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onSelectGig }) => {
  const { filteredGigs, radiusKm, setRadiusKm, selectedCityId } = useApp();
  const [selectedGigOnMap, setSelectedGigOnMap] = useState<Gig | null>(null);

  const activeCity = CITIES_SEED.find(c => c.id === selectedCityId) || CITIES_SEED[0];
  
  // Default map center according to selected city
  const cityCenters: Record<string, [number, number]> = {
    'city_kharar': [30.7432, 76.6621],
    'city_mohali': [30.7040, 76.7120],
    'city_chandigarh': [30.7340, 76.7770],
    'city_panchkula': [30.6890, 76.8580]
  };

  const centerCoords = cityCenters[selectedCityId] || cityCenters['city_kharar'];

  return (
    <div className="relative w-full h-[calc(100vh-130px)] max-w-md mx-auto overflow-hidden">
      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between gap-2">
        <div className="glass-card px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span className="text-xs font-bold text-slate-100">
            {activeCity.name}
          </span>
          <span className="text-[10px] text-slate-400">
            ({filteredGigs.length} missions)
          </span>
        </div>

        {/* Radius Options Filter */}
        <div className="glass-card p-1 rounded-xl border border-white/10 flex items-center gap-1">
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                radiusKm === r
                  ? 'bg-[#00E5FF] text-slate-950 font-extrabold shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}km
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Container */}
      <MapContainer
        center={centerCoords}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark-leaflet-tiles"
        />

        {/* Radius Circle Visualization */}
        <Circle
          center={centerCoords}
          radius={radiusKm * 1000}
          pathOptions={{
            color: '#00E5FF',
            fillColor: '#00E5FF',
            fillOpacity: 0.08,
            weight: 1.5,
            dashArray: '4, 8'
          }}
        />

        {/* Gig Markers */}
        {filteredGigs.map((gig) => {
          const catConfig = CATEGORY_ICONS[gig.category] || CATEGORY_ICONS['Other'];
          const markerIcon = createCustomMarkerIcon(catConfig.color);
          
          return (
            <Marker
              key={gig.id}
              position={[gig.latitude, gig.longitude]}
              icon={markerIcon}
              eventHandlers={{
                click: () => setSelectedGigOnMap(gig)
              }}
            >
              <Popup className="dark-popup">
                <div className="p-1 text-slate-900 font-sans">
                  <div className="font-bold text-xs">{gig.title}</div>
                  <div className="text-[10px] text-slate-600">+{gig.creditReward} Credits</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Selected Gig Drawer Overlay Sheet */}
      {selectedGigOnMap && (
        <div className="absolute bottom-4 left-3 right-3 z-[1000] glass-card rounded-2xl p-4 border border-[#00E5FF]/40 shadow-2xl animate-in slide-in-from-bottom duration-200">
          <button
            onClick={() => setSelectedGigOnMap(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider">
              {selectedGigOnMap.category}
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">
              +{selectedGigOnMap.creditReward} CREDITS
            </span>
          </div>

          <h3 className="font-heading font-bold text-white text-sm mb-1 line-clamp-1">
            {selectedGigOnMap.title}
          </h3>

          <p className="text-slate-300 text-xs line-clamp-2 mb-3">
            {selectedGigOnMap.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{formatApproximateLocation(selectedGigOnMap.localityName, selectedGigOnMap.cityName, selectedGigOnMap.distanceKm)}</span>
            </div>

            <button
              onClick={() => onSelectGig(selectedGigOnMap)}
              className="px-4 py-1.5 bg-[#00E5FF] text-slate-950 font-heading font-extrabold text-xs rounded-xl hover:bg-[#00B0FF] transition-colors"
            >
              VIEW MISSION →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
