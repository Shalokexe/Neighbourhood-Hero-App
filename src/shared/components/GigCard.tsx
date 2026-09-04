import React from 'react';
import { Gig } from '../types/domain';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { formatApproximateLocation } from '../../core/services/geoService';
import { Hexagon, Triangle, AlertCircle, ShieldAlert } from 'lucide-react';
import * as Icons from 'lucide-react';

interface GigCardProps {
  gig: Gig;
  onSelect: (gig: Gig) => void;
  isAcceptedByMe?: boolean;
}

export const GigCard: React.FC<GigCardProps> = ({ gig, onSelect, isAcceptedByMe = false }) => {
  const isUrgent = gig.urgency === 'URGENT';
  const categoryConfig = CATEGORY_ICONS[gig.category];
  const iconName = typeof categoryConfig === 'string' ? categoryConfig : categoryConfig?.icon || 'HelpCircle';
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  // Convert distance to game-style meters display (e.g. 537 M)
  const distanceMeters = Math.round((gig.distanceKm || 0.8) * 1000);

  return (
    <div
      onClick={() => onSelect(gig)}
      className={`cursor-pointer transition-all duration-200 rounded-lg p-3.5 relative overflow-hidden ${
        isUrgent ? 'fnsm-card-red' : 'fnsm-card-teal'
      }`}
    >
      {/* Top Header Row: Category Badge & FNSM Triangle Logo */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* FNSM Triangle Spider Logo Badge */}
          <div className="w-7 h-7 rounded-lg bg-black/80 border border-white/20 flex items-center justify-center relative shadow-md">
            <Triangle className={`w-5 h-5 ${isUrgent ? 'text-[#FF2A54] fill-[#FF2A54]/20' : 'text-[#00E5FF] fill-[#00E5FF]/20'}`} />
            <span className="absolute text-[9px]">🕷️</span>
          </div>

          <span className="font-fnsm font-extrabold text-[11px] uppercase tracking-wider text-slate-200">
            {gig.category}
          </span>
        </div>

        {/* Game Distance Metric & Hexagon Credit Reward Badge */}
        <div className="flex items-center gap-2 font-fnsm font-extrabold text-xs">
          <span className="text-slate-300 tracking-wider">
            {distanceMeters} M
          </span>
          <span className="text-slate-500 font-normal">|</span>
          <div className="flex items-center gap-1 text-amber-400 font-black">
            <span>{gig.creditReward}</span>
            <Hexagon className="w-4 h-4 text-amber-400 fill-amber-400/30" />
          </div>
        </div>
      </div>

      {/* Mission Title in All-Caps Orbitron Game Font */}
      <h3 className="font-fnsm font-black text-white text-sm uppercase tracking-wide leading-tight mb-1 text-shadow">
        {gig.title}
      </h3>

      {/* Location Subtext & Status */}
      <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold pt-1 border-t border-white/10">
        <span className="truncate max-w-[210px] text-slate-400">
          • {formatApproximateLocation(gig.localityName, gig.cityName, gig.distanceKm)}
        </span>

        {isAcceptedByMe ? (
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-extrabold tracking-wider uppercase">
            ACTIVE MISSION
          </span>
        ) : isUrgent ? (
          <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/40 px-2 py-0.5 rounded font-extrabold tracking-wider uppercase flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> URGENT
          </span>
        ) : (
          <span className="text-[10px] text-[#00E5FF] font-bold tracking-wider">
            AVAILABLE
          </span>
        )}
      </div>
    </div>
  );
};
