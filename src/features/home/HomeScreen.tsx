import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { GigCard } from '../../shared/components/GigCard';
import { Gig } from '../../shared/types/domain';
import { ShieldAlert, Zap, Radio, ChevronLeft, ChevronRight, Triangle, Battery, Signal, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  onSelectGig: (gig: Gig) => void;
  onNavigateToPost: () => void;
  onOpenRewards?: () => void;
  onOpenMap?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectGig, onNavigateToPost }) => {
  const { filteredGigs, gigs, currentUser, selectedCategory, setSelectedCategory } = useApp();
  const [activeFnsmTab, setActiveFnsmTab] = useState<'ACTIVITIES' | 'URGENT_TASKS'>('ACTIVITIES');

  // Filter Gigs for Activities vs Urgent Tasks
  const activitiesGigs = filteredGigs.filter(g => g.urgency !== 'URGENT');
  const urgentGigs = filteredGigs.filter(g => g.urgency === 'URGENT');
  const displayedGigs = activeFnsmTab === 'ACTIVITIES' ? activitiesGigs : urgentGigs;

  const myActiveMission = gigs.find(
    g => (g.acceptedBy === currentUser.id || g.posterId === currentUser.id) &&
         (g.status === 'ACCEPTED' || g.status === 'IN_PROGRESS')
  );

  return (
    <div className="pb-28 pt-1 px-3 max-w-md mx-auto space-y-3 font-fnsm">
      {/* 1. TOP PHONE STATUS BAR (Matches PS4 FNSM App top bar) */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2 py-0.5 border-b border-white/10">
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>FNSM OS v4.2</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-slate-200">
          <span>83%</span>
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      {/* 2. DISPATCH COMMS QUOTE HEADER CARD */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black">
        {/* City Subways/Bridge Background Photo */}
        <div className="h-28 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80"
            alt="City comms dispatch"
            className="w-full h-full object-cover brightness-75 contrast-125 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent" />
          
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#05070D]/90 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-orbitron font-bold border border-cyan-500/40 shadow-md">
            <Radio className="w-3 h-3 animate-pulse text-[#FF2A54]" />
            <span>DISPATCH COMMS</span>
          </div>
        </div>

        {/* Live Dispatch Quote Text */}
        <div className="p-3 bg-[#05070D] border-t border-cyan-500/20 text-xs text-slate-200 space-y-1">
          <p className="font-orbitron font-bold text-cyan-300 flex items-start gap-1.5 leading-relaxed">
            <span className="text-[#FF2A54] font-black">►</span>
            <span>Live help dispatch active in {currentUser.cityName}. Neighbors requesting immediate support!</span>
          </p>
        </div>
      </div>

      {/* 3. SLANTED POLYGON TABS (Matches PS4 FNSM App Tabs) */}
      <div className="flex items-center justify-between bg-[#05070D] p-1 rounded-xl border border-cyan-500/30">
        <button
          onClick={() => setActiveFnsmTab('ACTIVITIES')}
          className="p-2 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 flex items-center justify-center gap-2">
          {/* ACTIVITIES TAB */}
          <button
            onClick={() => setActiveFnsmTab('ACTIVITIES')}
            className={`flex-1 py-2 px-3 rounded-lg font-orbitron font-black text-xs transition-all flex items-center justify-center gap-1.5 uppercase ${
              activeFnsmTab === 'ACTIVITIES'
                ? 'fnsm-tab-active shadow-[0_0_15px_rgba(255,42,84,0.5)]'
                : 'fnsm-tab-inactive'
            }`}
          >
            <span className="text-sm">🤝</span>
            <span>ACTIVITIES</span>
            <span className="text-[10px] bg-black/40 px-1.5 rounded ml-1 font-mono">
              {activitiesGigs.length}
            </span>
          </button>

          {/* URGENT TASKS TAB */}
          <button
            onClick={() => setActiveFnsmTab('URGENT_TASKS')}
            className={`flex-1 py-2 px-3 rounded-lg font-orbitron font-black text-xs transition-all flex items-center justify-center gap-1.5 uppercase ${
              activeFnsmTab === 'URGENT_TASKS'
                ? 'fnsm-tab-active shadow-[0_0_15px_rgba(255,42,84,0.5)]'
                : 'fnsm-tab-inactive'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
            <span>URGENT TASKS</span>
            <span className="text-[10px] bg-black/40 px-1.5 rounded ml-1 font-mono">
              {urgentGigs.length}
            </span>
          </button>
        </div>

        <button
          onClick={() => setActiveFnsmTab('URGENT_TASKS')}
          className="p-2 text-slate-400 hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ACTIVE MISSION BANNER (IF ACCEPTED) */}
      {myActiveMission && (
        <div
          onClick={() => onSelectGig(myActiveMission)}
          className="glass-card rounded-xl p-3 border-2 border-[#00E5FF] bg-[#00E5FF]/10 flex items-center justify-between cursor-pointer animate-pulse"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <div>
              <span className="text-[10px] font-black text-[#00E5FF] uppercase tracking-wider block">
                ACTIVE HERO MISSION IN PROGRESS
              </span>
              <h4 className="font-extrabold text-white text-xs truncate max-w-[220px]">
                {myActiveMission.title}
              </h4>
            </div>
          </div>

          <span className="text-[10px] bg-[#00E5FF] text-slate-950 px-2 py-1 rounded font-black">
            VIEW →
          </span>
        </div>
      )}

      {/* 4. FNSM GIGS LIST */}
      <div className="space-y-2.5">
        {displayedGigs.length === 0 ? (
          <div className="fnsm-app-container rounded-2xl p-8 text-center space-y-2">
            <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto" />
            <h3 className="font-black text-rose-400 text-sm tracking-wider">
              THERE ARE NO {activeFnsmTab} AVAILABLE
            </h3>
            <p className="text-xs text-slate-400">
              No tasks matched in this category. Be the hero to post one!
            </p>
            <button
              onClick={onNavigateToPost}
              className="mt-2 px-4 py-2 bg-white text-black font-extrabold text-xs rounded-xl hover:bg-slate-200"
            >
              + BROADCAST NEW MISSION
            </button>
          </div>
        ) : (
          displayedGigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              onSelect={onSelectGig}
              isAcceptedByMe={gig.acceptedBy === currentUser.id}
            />
          ))
        )}
      </div>

      {/* 5. CONTROLLER BOTTOM ACTION BAR (Matches PS4 Game Prompt) */}
      <div className="pt-2 flex items-center justify-around text-[11px] font-mono text-slate-400 border-t border-white/10">
        <span className="flex items-center gap-1 font-bold text-slate-300">
          <span className="w-4 h-4 rounded-full border border-blue-400 text-blue-400 flex items-center justify-center text-[9px] font-bold">Ⓧ</span>
          SELECT MISSION
        </span>

        <span className="flex items-center gap-1 font-bold text-slate-300">
          <span className="w-4 h-4 rounded-full border border-rose-400 text-rose-400 flex items-center justify-center text-[9px] font-bold">◯</span>
          CLOSE FNSM APP
        </span>
      </div>
    </div>
  );
};
