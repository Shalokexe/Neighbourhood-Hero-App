import React from 'react';
import { Leaf, Recycle, Clock, MapPin, ArrowLeft, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

interface ImpactDashboardProps {
  onBack: () => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ onBack }) => {
  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#121826] border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-white text-base flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          SUSTAINABILITY & IMPACT
        </h1>
      </div>

      {/* Hero Banner Card */}
      <div className="glass-card rounded-3xl p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-[#080B12] text-center space-y-2 relative overflow-hidden">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <h2 className="font-heading font-extrabold text-white text-lg">
          TRICITY COMMUNITY IMPACT
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
          Every micro-task completed reduces urban carbon footprint and connects neighbors across Kharar, Mohali, Chandigarh & Panchkula.
        </p>
      </div>

      {/* 4 Core Impact Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Metric 1 */}
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
          <div className="flex items-center justify-between text-emerald-400">
            <Leaf className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">CO2 SAVED</span>
          </div>
          <span className="font-heading font-black text-white text-xl block">184.5 kg</span>
          <p className="text-[10px] text-slate-400">Via walking & cycling errand tasks</p>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 space-y-1">
          <div className="flex items-center justify-between text-[#00E5FF]">
            <Recycle className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-[#00E5FF]/20 px-2 py-0.5 rounded text-cyan-300">ITEMS REPAIRED</span>
          </div>
          <span className="font-heading font-black text-white text-xl block">92 Items</span>
          <p className="text-[10px] text-slate-400">Kept out of local landfills</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">HELP HOURS</span>
          </div>
          <span className="font-heading font-black text-white text-xl block">410 Hours</span>
          <p className="text-[10px] text-slate-400">Neighborhood assistance given</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 space-y-1">
          <div className="flex items-center justify-between text-purple-400">
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">SECTORS</span>
          </div>
          <span className="font-heading font-black text-white text-xl block">32 Sectors</span>
          <p className="text-[10px] text-slate-400">Connected in Tricity region</p>
        </div>
      </div>

      {/* Sustainable Neighborhood Badges */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
        <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-400" />
          COMMUNITY GREEN BADGES
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚲</span>
              <div>
                <h4 className="font-bold text-white text-xs">Zero-Emission Commuter</h4>
                <p className="text-[10px] text-slate-400">Completed 10 tasks via walking/biking</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">UNLOCKED</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛠️</span>
              <div>
                <h4 className="font-bold text-white text-xs">Circular Economy Hero</h4>
                <p className="text-[10px] text-slate-400">Assisted in 5 repair or assembly missions</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">UNLOCKED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
