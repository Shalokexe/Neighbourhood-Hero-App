import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Gig } from '../../shared/types/domain';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Navigation, Zap, ShieldAlert, Hexagon, Crosshair, 
  Sparkles, Filter, Users, Package, GraduationCap, AlertTriangle, X, MessageSquare
} from 'lucide-react';
import { soundService } from '../../core/services/soundService';

// Custom FNSM Holographic Pin Markers
const createFnsmPinIcon = (category: string, isUrgent: boolean, creditReward: number, isEvent?: boolean) => {
  const primaryColor = isUrgent ? '#FF2A54' : isEvent ? '#22C55E' : '#00E5FF';
  const badgeText = `+${creditReward} CR`;
  
  const iconEmoji = isUrgent 
    ? '⚠️' 
    : category.includes('Civic') 
    ? '🧹' 
    : category.includes('Emergency') 
    ? '🩸' 
    : category.includes('Environmental') 
    ? '🌿' 
    : category.includes('Safety') 
    ? '🛡️' 
    : category.includes('Animal') 
    ? '🐾' 
    : '🕷️';
  
  const html = `
    <div class="relative group cursor-pointer" style="width: 48px; height: 52px;">
      <!-- Glowing Sonar Pulse Ring -->
      <div style="position: absolute; top: 0; left: 7px; width: 34px; height: 34px; border-radius: 50%; background: ${primaryColor}30; border: 2px solid ${primaryColor}; box-shadow: 0 0 18px ${primaryColor};"></div>
      
      <!-- Icon Core -->
      <div style="position: absolute; top: 4px; left: 11px; width: 26px; height: 26px; border-radius: 50%; background: #05070D; border: 1.5px solid ${primaryColor}; display: flex; align-items: center; justify-content: center; font-size: 13px;">
        ${iconEmoji}
      </div>
      
      <!-- Credit Badge -->
      <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); background: #05070D; border: 1px solid ${primaryColor}; color: ${primaryColor}; font-size: 9px; font-weight: 900; font-family: Orbitron, sans-serif; padding: 1px 6px; border-radius: 6px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.9);">
        ${badgeText}
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'fnsm-custom-marker',
    iconSize: [48, 52],
    iconAnchor: [24, 26]
  });
};

interface MapScreenProps {
  onSelectGig: (gig: Gig) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onSelectGig }) => {
  const { filteredGigs, radiusKm, setRadiusKm, currentUser, userFriends } = useApp();
  const [selectedMapGig, setSelectedMapGig] = useState<Gig | null>(null);
  const [mapFilter, setMapFilter] = useState<'ALL' | 'CIVIC' | 'EMERGENCY' | 'EVENTS' | 'ALLIES'>('ALL');
  const [isScanning, setIsScanning] = useState<boolean>(true);

  // User Map Center (Kharar/Mohali coordinates)
  const centerLat = 30.7485;
  const centerLng = 76.6578;

  // Sound effect on radar activation
  useEffect(() => {
    soundService.playRadarPingSound();
    const interval = setInterval(() => {
      setIsScanning(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filtered Gigs for Radar Map
  const displayedGigs = filteredGigs.filter(gig => {
    if (mapFilter === 'CIVIC') return gig.category.includes('Civic') || gig.category.includes('Environmental');
    if (mapFilter === 'EMERGENCY') return gig.urgency === 'URGENT' || gig.category.includes('Emergency');
    if (mapFilter === 'EVENTS') return gig.isCommunityEvent === true;
    if (mapFilter === 'ALLIES') return userFriends.includes(gig.posterId);
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-140px)] font-fnsm overflow-hidden bg-[#05070D]">
      {/* 1. DARK MATTER SPIDER-MAN HOLOGRAPHIC MAP */}
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        className="w-full h-full translucent-map-tiles z-0 filter brightness-95 contrast-125"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* User Location Radar Radius Circle */}
        <Circle
          center={[centerLat, centerLng]}
          radius={radiusKm * 1000}
          pathOptions={{
            color: '#00E5FF',
            fillColor: '#00E5FF',
            fillOpacity: 0.08,
            weight: 2,
            dashArray: '6, 10'
          }}
        />

        {/* User Location Center Marker */}
        <Marker
          position={[centerLat, centerLng]}
          icon={createFnsmPinIcon('User', false, 0)}
        />

        {/* Dynamic Map Pins */}
        {displayedGigs.map((gig) => {
          if (!gig.latitude || !gig.longitude) return null;
          const isUrgent = gig.urgency === 'URGENT';
          return (
            <Marker
              key={gig.id}
              position={[gig.latitude, gig.longitude]}
              icon={createFnsmPinIcon(gig.category, isUrgent, gig.creditReward, gig.isCommunityEvent)}
              eventHandlers={{
                click: () => {
                  soundService.playRadarPingSound();
                  setSelectedMapGig(gig);
                }
              }}
            />
          );
        })}
      </MapContainer>

      {/* 2. HOLOGRAPHIC RADAR SCANNER SWEEP ANIMATION OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-[radial-gradient(circle_at_center,transparent_30%,#00E5FF15_70%,#05070D_100%)]">
        <div className={`w-full h-full border-t border-cyan-400/30 ${isScanning ? 'animate-pulse' : ''}`} />
      </div>

      {/* 3. RADAR CONTROLS & FILTER HUD (TOP BAR) */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-col gap-2 pointer-events-none">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Radius Selector */}
          <div className="fnsm-app-container p-1 rounded-xl border border-cyan-500/40 flex items-center gap-1 bg-[#05070D]/90 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            {[1, 3, 5, 10].map((r) => (
              <button
                key={r}
                onClick={() => {
                  soundService.playClickSound();
                  setRadiusKm(r);
                }}
                className={`px-2.5 py-1 rounded-lg font-orbitron font-extrabold text-[10px] transition-all ${
                  radiusKm === r
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r} KM
              </button>
            ))}
          </div>

          {/* Active Status Badge */}
          <div className="fnsm-app-container px-3 py-1.5 rounded-xl border border-cyan-400/50 text-cyan-400 font-orbitron font-extrabold text-[10px] flex items-center gap-1.5 bg-[#05070D]/90 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <Crosshair className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span className="tracking-wider">CIVIC RADAR ACTIVE</span>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
          {[
            { id: 'ALL', label: 'ALL MISSIONS', icon: MapPin },
            { id: 'CIVIC', label: 'CIVIC DRIVES 🧹', icon: Sparkles },
            { id: 'EMERGENCY', label: 'EMERGENCY 🩸', icon: AlertTriangle },
            { id: 'EVENTS', label: 'HUSTLE EVENTS 📅', icon: Filter },
            { id: 'ALLIES', label: 'ALLIES 👥', icon: Users }
          ].map((item) => {
            const isActive = mapFilter === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundService.playClickSound();
                  setMapFilter(item.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl border font-orbitron font-extrabold text-[10px] flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'bg-[#05070D]/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SELECTED GIG TRANSLUCENT FNSM HUD CARD PREVIEW */}
      {selectedMapGig && (
        <div className="absolute bottom-4 left-3 right-3 z-30 fnsm-app-container rounded-2xl p-4 border border-cyan-400/80 shadow-[0_0_30px_rgba(0,229,255,0.35)] space-y-3 bg-[#05070D]/95 text-white animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-orbitron font-extrabold text-cyan-400 uppercase tracking-wider text-[11px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {selectedMapGig.category}
              </span>
              {selectedMapGig.isCommunityEvent && (
                <span className="font-orbitron font-black text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                  {selectedMapGig.eventDate || 'COMMUNITY DRIVE'}
                </span>
              )}
              {selectedMapGig.urgency === 'URGENT' && (
                <span className="font-orbitron font-black text-crimson-400 text-[10px] bg-crimson-500/20 px-2 py-0.5 rounded border border-crimson-500/40 animate-pulse">
                  HIGH PRIORITY ⚠️
                </span>
              )}
            </div>

            <button
              onClick={() => setSelectedMapGig(null)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h4 className="font-orbitron font-black text-white text-sm uppercase tracking-wide">
              {selectedMapGig.title}
            </h4>
            <p className="text-xs text-slate-300 leading-tight mt-1 line-clamp-2">
              {selectedMapGig.description}
            </p>
          </div>

          {selectedMapGig.isCommunityEvent && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-orbitron">
              <span className="text-cyan-300 font-bold">VOLUNTEER SQUAD:</span>
              <span className="text-white font-extrabold">
                👥 {selectedMapGig.joinedVolunteersCount || 5} / {selectedMapGig.requiredVolunteers || 10} Heroes Joined
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-cyan-400">
                <img src={selectedMapGig.posterAvatar} alt={selectedMapGig.posterName} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-slate-300 text-[11px]">{selectedMapGig.posterName}</span>
              <span className="text-[10px] text-slate-500">• {selectedMapGig.localityName}</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-orbitron font-extrabold text-sm">
              <span>+{selectedMapGig.creditReward}</span>
              <Hexagon className="w-4 h-4 fill-amber-400" />
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playAcceptSound();
              onSelectGig(selectedMapGig);
            }}
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black text-xs rounded-xl uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-1.5"
          >
            <span>JOIN MISSION & DISPATCH</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
