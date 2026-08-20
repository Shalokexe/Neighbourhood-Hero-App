import React from 'react';
import { Gig } from '../types/domain';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { formatApproximateLocation } from '../../core/services/geoService';
import * as Icons from 'lucide-react';

interface GigCardProps {
  gig: Gig;
  onSelect: (gig: Gig) => void;
}

export const GigCard: React.FC<GigCardProps> = ({ gig, onSelect }) => {
  const catConfig = CATEGORY_ICONS[gig.category] || CATEGORY_ICONS['Other'];
  
  // Dynamically render category Lucide icon
  const IconComponent = (Icons as any)[catConfig.icon] || Icons.Layers;

  // Urgency badge styling
  const urgencyColorMap: Record<string, string> = {
    'URGENT': 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse',
    'TODAY': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'SOON': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'FLEXIBLE': 'bg-slate-700/40 text-slate-300 border-slate-600/30'
  };

  const timeAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${Math.max(diffMins, 1)}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  return (
    <div 
      onClick={() => onSelect(gig)}
      className="glass-card glass-card-hover rounded-2xl p-4 cursor-pointer relative overflow-hidden group border border-white/10 hover:border-[#00E5FF]/40"
    >
      {/* Category Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1" 
        style={{ backgroundColor: catConfig.color }}
      />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{ backgroundColor: catConfig.bg, color: catConfig.color }}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
              {gig.category}
            </span>
            <h3 className="font-heading font-bold text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-[#00E5FF] transition-colors">
              {gig.title}
            </h3>
          </div>
        </div>

        {/* Credit Yield Badge */}
        <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 px-2.5 py-1 rounded-xl flex items-center gap-1 shrink-0">
          <Icons.Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-heading font-extrabold text-amber-300 text-xs">
            +{gig.creditReward}
          </span>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed">
        {gig.description}
      </p>

      {/* Meta Row: Distance & Location */}
      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 pb-3 border-b border-white/5 flex-wrap">
        <div className="flex items-center gap-1">
          <Icons.MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>{formatApproximateLocation(gig.localityName, gig.cityName, gig.distanceKm)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icons.Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{gig.estimatedDuration}</span>
        </div>
      </div>

      {/* Footer Row: Poster Info & CTA */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img 
            src={gig.posterAvatar} 
            alt={gig.posterName}
            className="w-6 h-6 rounded-full object-cover border border-white/10"
          />
          <span className="text-xs text-slate-300 truncate max-w-[100px]">
            {gig.posterName}
          </span>
          <div className="flex items-center gap-0.5 text-amber-400 text-xs font-semibold">
            <Icons.Star className="w-3 h-3 fill-amber-400" />
            <span>{gig.posterRating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {gig.budget && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
              ₹{gig.budget}
            </span>
          )}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${urgencyColorMap[gig.urgency]}`}>
            {gig.urgency}
          </span>
        </div>
      </div>
    </div>
  );
};
