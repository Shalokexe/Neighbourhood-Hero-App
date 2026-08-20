import React from 'react';
import { useApp } from '../../core/context/AppContext';
import { GigCard } from '../../shared/components/GigCard';
import { LevelProgressBar } from '../../shared/components/LevelProgressBar';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { Gig } from '../../shared/types/domain';
import { Search, Filter, Compass, Zap, Gift, Shield } from 'lucide-react';

interface HomeScreenProps {
  onSelectGig: (gig: Gig) => void;
  onOpenRewards: () => void;
  onOpenMap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectGig,
  onOpenRewards,
  onOpenMap
}) => {
  const {
    currentUser,
    filteredGigs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedUrgency,
    setSelectedUrgency
  } = useApp();

  const categoriesList = ['All', ...Object.keys(CATEGORY_ICONS)];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-5">
      {/* Top Greeting Hero Banner */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#00E5FF] uppercase">
            {getGreeting()}, {currentUser.name.split(' ')[0]}
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white leading-tight">
            What can you help with today?
          </h1>
        </div>

        <button
          onClick={onOpenMap}
          className="bg-gradient-to-tr from-[#00E5FF]/20 to-[#2563EB]/20 border border-[#00E5FF]/40 p-2.5 rounded-2xl flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform"
          title="Open Map View"
        >
          <Compass className="w-5 h-5 text-[#00E5FF] animate-pulse" />
          <span className="text-[9px] font-bold text-[#00E5FF] mt-0.5">MAP</span>
        </button>
      </div>

      {/* Hero Level Progress Teaser */}
      <LevelProgressBar lifetimeCredits={currentUser.lifetimeCredits} />

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search missions (e.g. groceries, tutor, dog walking)..."
          className="w-full bg-[#121826] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold uppercase tracking-wider text-[10px]">Categories</span>
          <span>{filteredGigs.length} available</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#00E5FF] text-slate-950 border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)] font-bold'
                    : 'bg-[#121826] text-slate-300 border-white/10 hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nearby Missions Feed Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <h2 className="font-heading font-extrabold text-slate-100 text-lg">
            NEARBY MISSIONS
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'URGENT', 'TODAY'].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUrgency(u)}
              className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider transition-colors ${
                selectedUrgency === u
                  ? 'bg-white/15 text-[#00E5FF] border border-[#00E5FF]/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Cards Feed */}
      {filteredGigs.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center border border-white/10 space-y-3">
          <Shield className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="font-heading font-bold text-slate-200">No missions found</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Try expanding your search query, switching categories, or changing your city filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedUrgency('All');
            }}
            className="px-4 py-2 bg-slate-800 text-[#00E5FF] font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              onSelect={onSelectGig}
            />
          ))}
        </div>
      )}

      {/* Local Rewards Teaser Card */}
      <div 
        onClick={onOpenRewards}
        className="glass-card rounded-2xl p-4 border border-amber-500/30 cursor-pointer bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent hover:border-amber-500/60 transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-slate-100 text-sm">
              Local Rewards Available
            </h4>
            <p className="text-[11px] text-slate-400">
              Exchange your Gig Credits for local café vouchers & stickers.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-amber-400 hover:underline">
          STORE →
        </span>
      </div>
    </div>
  );
};
