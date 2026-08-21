import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Trophy, Award, Zap, Star, Shield, ArrowLeft, Users, Crown } from 'lucide-react';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const { allUsers, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'individual' | 'squads'>('individual');

  // Sort users by lifetime credits
  const sortedHeroes = [...allUsers].sort((a, b) => b.lifetimeCredits - a.lifetimeCredits);
  const top1 = sortedHeroes[0];
  const top2 = sortedHeroes[1];
  const top3 = sortedHeroes[2];

  const squadSeeds = [
    { name: 'Sunny Enclave Squad', city: 'Kharar', members: 42, totalMissions: 184, totalCredits: 6850 },
    { name: 'Phase 3B2 Heroes', city: 'Mohali', members: 38, totalMissions: 162, totalCredits: 5920 },
    { name: 'Sector 15 Campus Guild', city: 'Chandigarh', members: 54, totalMissions: 210, totalCredits: 8140 },
    { name: 'Panchkula Champions', city: 'Panchkula', members: 29, totalMissions: 115, totalCredits: 4200 }
  ];

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
          <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
          TRICITY LEADERBOARD
        </h1>
      </div>

      {/* Sub Tabs: Individual Heroes vs Squads */}
      <div className="flex items-center justify-around glass-card rounded-2xl p-1 border border-white/10">
        <button
          onClick={() => setActiveTab('individual')}
          className={`flex-1 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'individual'
              ? 'bg-amber-400 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.4)]'
              : 'text-slate-400'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>TOP HEROES</span>
        </button>

        <button
          onClick={() => setActiveTab('squads')}
          className={`flex-1 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'squads'
              ? 'bg-amber-400 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.4)]'
              : 'text-slate-400'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>LOCAL SQUADS</span>
        </button>
      </div>

      {/* TAB 1: INDIVIDUAL HEROES PODIUM & LIST */}
      {activeTab === 'individual' && (
        <div className="space-y-4">
          {/* Top 3 Podium Card */}
          <div className="glass-card rounded-3xl p-4 border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-950 to-[#080B12] text-center space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              THIS WEEK'S TRICITY CHAMPIONS
            </h3>

            <div className="flex items-end justify-center gap-3 pt-2">
              {/* Rank 2 - Silver */}
              {top2 && (
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 rounded-full border-2 border-slate-300 overflow-hidden relative shadow-lg">
                    <img src={top2.profileImageUrl} alt={top2.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-300 mt-1 truncate max-w-[80px]">
                    {top2.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-amber-300 font-bold">🥈 #{2}</span>
                  <div className="w-full h-16 bg-slate-800/80 rounded-t-xl mt-1 flex items-center justify-center font-bold text-xs text-slate-300">
                    {top2.lifetimeCredits} CR
                  </div>
                </div>
              )}

              {/* Rank 1 - Gold */}
              {top1 && (
                <div className="flex flex-col items-center flex-1 -top-3 relative">
                  <div className="w-16 h-16 rounded-full border-2 border-amber-400 overflow-hidden relative shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    <img src={top1.profileImageUrl} alt={top1.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-extrabold text-amber-300 mt-1 truncate max-w-[90px]">
                    {top1.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-black text-amber-400">👑 #1 HERO</span>
                  <div className="w-full h-24 bg-gradient-to-b from-amber-500/30 to-amber-600/10 rounded-t-xl mt-1 flex items-center justify-center font-black text-sm text-amber-300 border-t border-amber-400/40">
                    {top1.lifetimeCredits} CR
                  </div>
                </div>
              )}

              {/* Rank 3 - Bronze */}
              {top3 && (
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-700 overflow-hidden relative shadow-lg">
                    <img src={top3.profileImageUrl} alt={top3.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-300 mt-1 truncate max-w-[80px]">
                    {top3.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-amber-600 font-bold">🥉 #{3}</span>
                  <div className="w-full h-12 bg-slate-800/80 rounded-t-xl mt-1 flex items-center justify-center font-bold text-xs text-slate-300">
                    {top3.lifetimeCredits} CR
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Ranked List */}
          <div className="space-y-2">
            {sortedHeroes.map((hero, index) => {
              const isMe = hero.id === currentUser.id;
              return (
                <div
                  key={hero.id}
                  className={`glass-card rounded-2xl p-3 border flex items-center justify-between transition-all ${
                    isMe ? 'border-[#00E5FF] bg-[#00E5FF]/10' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-heading font-extrabold text-xs ${
                      index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : index === 2 ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      #{index + 1}
                    </span>

                    <img src={hero.profileImageUrl} alt={hero.name} className="w-9 h-9 rounded-full object-cover" />

                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-white text-xs">{hero.name}</h4>
                        {isMe && <span className="text-[9px] bg-[#00E5FF]/20 text-[#00E5FF] px-1 rounded">YOU</span>}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {hero.localityName}, {hero.cityName} · Level {hero.level}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-heading font-extrabold text-amber-300 text-xs block">
                      {hero.lifetimeCredits} XP
                    </span>
                    <span className="text-[9px] text-slate-500">{hero.ratingCount} Gigs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: NEIGHBORHOOD SQUADS */}
      {activeTab === 'squads' && (
        <div className="space-y-3">
          {squadSeeds.map((squad, i) => (
            <div
              key={squad.name}
              className="glass-card rounded-2xl p-4 border border-white/10 hover:border-amber-500/30 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-400">#{i + 1}</span>
                  <h4 className="font-heading font-bold text-white text-sm">{squad.name}</h4>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">
                  {squad.city}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/5 text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Members</span>
                  <span className="font-bold text-slate-200">{squad.members} Heroes</span>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Missions</span>
                  <span className="font-bold text-cyan-300">{squad.totalMissions} Done</span>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Score</span>
                  <span className="font-bold text-amber-300">{squad.totalCredits} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
