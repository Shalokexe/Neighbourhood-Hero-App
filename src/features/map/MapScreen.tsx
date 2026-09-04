import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Gig } from '../../shared/types/domain';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Zap, ShieldAlert, Hexagon, Crosshair } from 'lucide-react';

// Custom FNSM Spider Pin Markers
const createFnsmPinIcon = (category: string, isUrgent: boolean) => {
  const color = isUrgent ? '#FF2A54' : '#00E5FF';
  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; inset: 0; border-radius: 50%; background: ${color}33; border: 2px solid ${color}; box-shadow: 0 0 15px ${color}; animate: ping 2s infinite;"></div>
      <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: #000; border: 1.5px solid ${color}; display: flex; align-items: center; justify-content: center; font-size: 13px;">
        ${isUrgent ? '⚠️' : '🕷️'}
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'fnsm-custom-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
};

interface MapScreenProps {
  onSelectGig: (gig: Gig) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onSelectGig }) => {
  const { filteredGigs, radiusKm, setRadiusKm, currentUser } = useApp();
  const [selectedMapGig, setSelectedMapGig] = useState<Gig | null>(null);

  // User Map Center (Default Kharar/Mohali coordinates)
  const centerLat = 30.7485;
  const centerLng = 76.6578;

  return (
    <div className="relative w-full h-[calc(100vh-140px)] font-fnsm overflow-hidden">
      {/* 1. CONTRASTY & TRANSLUCENT SPIDER-MAN MAP */}
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        className="w-full h-full translucent-map-tiles z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />

        {/* User Location Radar Radius Circle */}
        <Circle
          center={[centerLat, centerLng]}
          radius={radiusKm * 1000}
          pathOptions={{
            color: '#FF2A54',
            fillColor: '#FF2A54',
            fillOpacity: 0.08,
            weight: 1.5,
            dashArray: '5, 10'
          }}
        />

        {/* User Home Location Marker */}
        <Marker
          position={[centerLat, centerLng]}
          icon={createFnsmPinIcon('User', false)}
        />

        {/* Gig Pins */}
        {filteredGigs.map((gig) => {
          if (!gig.latitude || !gig.longitude) return null;
          const isUrgent = gig.urgency === 'URGENT';
          return (
            <Marker
              key={gig.id}
              position={[gig.latitude, gig.longitude]}
              icon={createFnsmPinIcon(gig.category, isUrgent)}
              eventHandlers={{
                click: () => setSelectedMapGig(gig)
              }}
            />
          );
        })}
      </MapContainer>

      {/* 2. SPIDER RADAR RADIUS SELECTOR OVERLAY */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="glass-card p-1.5 rounded-xl border border-white/20 flex items-center gap-1 pointer-events-auto bg-black/80">
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-2.5 py-1 rounded-lg font-black text-xs transition-all ${
                radiusKm === r
                  ? 'bg-[#FF2A54] text-white shadow-[0_0_10px_rgba(255,42,84,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r} KM
            </button>
          ))}
        </div>

        <div className="glass-card px-3 py-1.5 rounded-xl border border-[#00E5FF]/40 text-[#00E5FF] font-black text-xs flex items-center gap-1.5 bg-black/80">
          <Crosshair className="w-3.5 h-3.5 animate-spin" />
          <span>RADAR ACTIVE</span>
        </div>
      </div>

      {/* 3. SELECTED GIG TRANSLUCENT FNSM GAME CARD PREVIEW */}
      {selectedMapGig && (
        <div className="absolute bottom-4 left-4 right-4 z-20 fnsm-app-container rounded-2xl p-4 border border-[#00E5FF] shadow-2xl space-y-2 bg-black/90 animate-bounce-short">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-[#00E5FF] uppercase tracking-wider">
              {selectedMapGig.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-black">
              <span>+{selectedMapGig.creditReward}</span>
              <Hexagon className="w-3.5 h-3.5 fill-amber-400" />
            </div>
          </div>

          <h4 className="font-black text-white text-sm uppercase">
            {selectedMapGig.title}
          </h4>

          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <span className="text-[11px] text-slate-400">
              Distance: ~{selectedMapGig.distanceKm || 0.8} KM
            </span>

            <button
              onClick={() => onSelectGig(selectedMapGig)}
              className="px-4 py-1.5 bg-gradient-to-r from-[#FF2A54] to-[#00E5FF] text-slate-950 font-black text-xs rounded-xl shadow-lg hover:scale-105"
            >
              ACCEPT MISSION →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
