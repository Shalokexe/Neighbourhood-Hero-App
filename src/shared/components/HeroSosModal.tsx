import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Radio, Phone, MapPin, X, CheckCircle2, Siren, Volume2 } from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { soundService } from '../../core/services/soundService';

interface HeroSosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeroSosModal: React.FC<HeroSosModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, selectedCityId, postGig, triggerCelebration } = useApp();
  const [sosCategory, setSosCategory] = useState<'BLOOD' | 'MEDICAL' | 'ACCIDENT' | 'SAFETY'>('BLOOD');
  const [detailsText, setDetailsText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen) return null;

  const handleBroadcastSos = () => {
    if (isBroadcasting) return;
    setIsBroadcasting(true);

    // Play alert sound
    soundService.playRadarPingSound();

    setTimeout(() => {
      let title = '🚨 URGENT EMERGENCY BLOOD DONOR NEEDED';
      let cat: any = 'Medical Emergency 🩸';

      if (sosCategory === 'MEDICAL') {
        title = '🚨 URGENT MEDICAL EMERGENCY ASSISTANCE';
        cat = 'Medical Emergency 🩸';
      } else if (sosCategory === 'ACCIDENT') {
        title = '🚨 ROADSIDE ACCIDENT EMERGENCY DISPATCH';
        cat = 'Public Safety 🛡️';
      } else if (sosCategory === 'SAFETY') {
        title = '🚨 CRITICAL PUBLIC SAFETY / LIGHT OUTAGE RISK';
        cat = 'Public Safety 🛡️';
      }

      postGig({
        title,
        description: detailsText || `Emergency SOS broadcasted from ${currentUser.localityName}, ${currentUser.cityName}. Immediate community hero assistance requested!`,
        category: cat,
        cityId: selectedCityId,
        cityName: currentUser.cityName,
        localityId: currentUser.localityId,
        localityName: currentUser.localityName,
        approxAddress: `${currentUser.localityName}, ${currentUser.cityName}`,
        latitude: 30.745,
        longitude: 76.652,
        creditReward: 250,
        urgency: 'URGENT',
        estimatedDuration: 'Immediate'
      });

      triggerCelebration({
        title: '🚨 EMERGENCY SOS RADAR BROADCASTED!',
        subtitle: `Alert dispatched to 18 verified heroes within 3.5km radius in ${currentUser.cityName}!`,
        credits: 250
      });

      setIsBroadcasting(false);
      setBroadcastSent(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in font-fnsm">
      <div className="relative w-full max-w-md bg-[#05070D] border-2 border-rose-500/80 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.4)]">
        
        {/* TOP FLASHING EMERGENCY SOS BANNER */}
        <div className="p-4 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2.5 z-10">
            <div className="p-2 rounded-xl bg-black/40 border border-white/30 text-rose-300 animate-pulse">
              <Siren className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-orbitron font-black text-sm uppercase tracking-widest block">
                  HERO EMERGENCY SOS RADAR
                </span>
                <span className="text-[9px] bg-black/50 border border-rose-300 px-1.5 py-0.5 rounded font-mono font-bold animate-ping">
                  LIVE 📡
                </span>
              </div>
              <p className="text-[10px] text-rose-100/90 font-mono">
                Instant broadcast to 18 nearby verified heroes in {currentUser.cityName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="z-10 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto text-slate-200">
          
          {broadcastSent ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-orbitron font-black text-white text-base tracking-wider uppercase">
                EMERGENCY RADAR SIGNAL DISPATCHED!
              </h3>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Emergency signal was sent to all active neighborhood heroes. Coordination room opened in chat!
              </p>

              <button
                onClick={() => {
                  setBroadcastSent(false);
                  onClose();
                }}
                className="mt-2 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-orbitron font-black text-xs rounded-xl transition-all shadow-lg uppercase"
              >
                OPEN DISPATCH ROOM →
              </button>
            </div>
          ) : (
            <>
              {/* SELECT SOS TYPE */}
              <div className="space-y-2">
                <label className="text-xs font-orbitron font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>1. SELECT EMERGENCY CATEGORY</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSosCategory('BLOOD')}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      sosCategory === 'BLOOD'
                        ? 'bg-rose-500/25 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg block mb-1">🩸</span>
                    <span className="font-bold text-xs block">O+ / Blood Donor</span>
                    <span className="text-[9px] opacity-75">Urgent hospital blood need</span>
                  </button>

                  <button
                    onClick={() => setSosCategory('MEDICAL')}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      sosCategory === 'MEDICAL'
                        ? 'bg-rose-500/25 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg block mb-1">🏥</span>
                    <span className="font-bold text-xs block">Medical Aid</span>
                    <span className="text-[9px] opacity-75">Immediate hospital escort</span>
                  </button>

                  <button
                    onClick={() => setSosCategory('ACCIDENT')}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      sosCategory === 'ACCIDENT'
                        ? 'bg-rose-500/25 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg block mb-1">🚗</span>
                    <span className="font-bold text-xs block">Road Incident</span>
                    <span className="text-[9px] opacity-75">Vehicle breakdown / rescue</span>
                  </button>

                  <button
                    onClick={() => setSosCategory('SAFETY')}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      sosCategory === 'SAFETY'
                        ? 'bg-rose-500/25 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg block mb-1">🛡️</span>
                    <span className="font-bold text-xs block">Public Safety</span>
                    <span className="text-[9px] opacity-75">Night hazard / blackout</span>
                  </button>
                </div>
              </div>

              {/* LOCATION & DETAILS */}
              <div className="space-y-2">
                <label className="text-xs font-orbitron font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>2. LOCATION & DESCRIPTION</span>
                </label>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10 text-xs font-mono flex items-center justify-between text-slate-300">
                  <span>Target Area:</span>
                  <span className="font-bold text-cyan-300">{currentUser.localityName}, {currentUser.cityName}</span>
                </div>

                <textarea
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  placeholder="Provide urgent details (e.g., Civil Hospital Kharar Emergency Room, Blood unit required immediately)..."
                  className="w-full h-20 p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>

              {/* ACTION BROADCAST BUTTON */}
              <button
                onClick={handleBroadcastSos}
                disabled={isBroadcasting}
                className="w-full py-4 px-4 rounded-xl font-orbitron font-black text-sm text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 transition-all shadow-[0_0_30px_rgba(244,63,94,0.6)] flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
              >
                <Radio className="w-5 h-5 text-white animate-ping" />
                <span>{isBroadcasting ? 'DISPATCHING SOS RADAR...' : 'BROADCAST EMERGENCY SOS RADAR (250 REWARD)'}</span>
              </button>
            </>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-3 bg-[#05070D] border-t border-rose-500/20 text-center flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency Audio Siren Active</span>
          </span>
          <span className="text-rose-400 font-bold">24/7 HERO DISPATCH</span>
        </div>

      </div>
    </div>
  );
};
