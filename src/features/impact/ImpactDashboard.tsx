import React from 'react';
import { Leaf, Recycle, Clock, MapPin, ArrowLeft, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

interface ImpactDashboardProps {
  onBack: () => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ onBack }) => {
  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4 font-fnsm text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-lg bg-[#0B1120]/80 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-white flex items-center gap-1.5 text-xs font-bold font-orbitron transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ⓛ1 BACK</span>
        </button>

        <div className="text-right">
          <h1 className="font-orbitron font-extrabold text-white text-base tracking-widest uppercase flex items-center gap-1.5 justify-end">
            <Leaf className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            TRICITY GREEN IMPACT
          </h1>
          <p className="text-[10px] text-emerald-400 font-bold tracking-wider font-orbitron">
            SUSTAINABILITY & CARBON METRICS
          </p>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="fnsm-app-container rounded-2xl p-5 border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-[#05070D] to-transparent text-center space-y-2 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div className="w-10 h-10 rounded-xl bg-[#05070D] border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-300 shadow-md">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <h2 className="font-orbitron font-extrabold text-white text-base tracking-wider uppercase">
          TRICITY COMMUNITY ECO-METRICS
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
          Every micro-mission reduces urban carbon emissions and builds community resilience across Kharar, Mohali, Chandigarh & Panchkula.
        </p>
      </div>

      {/* 4 Core Impact Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Metric 1 */}
        <div className="fnsm-app-container p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
          <div className="flex items-center justify-between text-emerald-400">
            <Leaf className="w-5 h-5" />
            <span className="text-[10px] font-orbitron font-extrabold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/30">CO2 SAVED</span>
          </div>
          <span className="font-orbitron font-black text-white text-xl block tracking-wider">184.5 kg</span>
          <p className="text-[10px] text-slate-400">Via walking & cycling errand tasks</p>
        </div>

        {/* Metric 2 */}
        <div className="fnsm-app-container p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 space-y-1">
          <div className="flex items-center justify-between text-cyan-400">
            <Recycle className="w-5 h-5" />
            <span className="text-[10px] font-orbitron font-extrabold bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">REPAIRED</span>
          </div>
          <span className="font-orbitron font-black text-white text-xl block tracking-wider">92 Items</span>
          <p className="text-[10px] text-slate-400">Kept out of local landfills</p>
        </div>

        {/* Metric 3 */}
        <div className="fnsm-app-container p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-orbitron font-extrabold bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30">HELP HOURS</span>
          </div>
          <span className="font-orbitron font-black text-white text-xl block tracking-wider">410 Hours</span>
          <p className="text-[10px] text-slate-400">Neighborhood assistance given</p>
        </div>

        {/* Metric 4 */}
        <div className="fnsm-app-container p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-1">
          <div className="flex items-center justify-between text-purple-400">
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-orbitron font-extrabold bg-purple-500/20 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">SECTORS</span>
          </div>
          <span className="font-orbitron font-black text-white text-xl block tracking-wider">32 Sectors</span>
          <p className="text-[10px] text-slate-400">Connected in Tricity region</p>
        </div>
      </div>

      {/* Sustainable Neighborhood Badges */}
      <div className="fnsm-app-container p-4 rounded-2xl border border-emerald-500/30 space-y-3">
        <h3 className="font-orbitron font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-400" />
          COMMUNITY GREEN BADGES
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-[#05070D] rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚲</span>
              <div>
                <h4 className="font-orbitron font-bold text-white text-xs">Zero-Emission Commuter</h4>
                <p className="text-[10px] text-slate-400">Completed 10 tasks via walking/biking</p>
              </div>
            </div>
            <span className="text-[10px] font-orbitron font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">UNLOCKED</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#05070D] rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛠️</span>
              <div>
                <h4 className="font-orbitron font-bold text-white text-xs">Circular Economy Hero</h4>
                <p className="text-[10px] text-slate-400">Assisted in 5 repair or assembly missions</p>
              </div>
            </div>
            <span className="text-[10px] font-orbitron font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">UNLOCKED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

