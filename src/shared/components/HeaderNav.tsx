import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { CITIES_SEED, LOCALITIES_SEED } from '../../core/config/citiesData';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { AuthModal } from '../../features/auth/AuthModal';
import { DailyBountiesModal } from '../../features/bounties/DailyBountiesModal';
import { MapPin, Zap, UserCheck, ShieldAlert, Gift, ChevronDown, CheckCircle2, Mic, Bell, Trophy, UserPlus, Leaf } from 'lucide-react';

interface HeaderNavProps {
  onOpenRewards: () => void;
  onOpenAdmin: () => void;
  onOpenNotifications: () => void;
  onOpenLeaderboard: () => void;
  onOpenImpact: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ 
  onOpenRewards, 
  onOpenAdmin,
  onOpenNotifications,
  onOpenLeaderboard,
  onOpenImpact
}) => {
  const { 
    currentUser, 
    allUsers, 
    switchUser, 
    selectedCityId, 
    setSelectedCityId, 
    selectedLocalityId, 
    setSelectedLocalityId 
  } = useApp();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBountiesModal, setShowBountiesModal] = useState(false);

  const activeCity = CITIES_SEED.find(c => c.id === selectedCityId) || CITIES_SEED[0];
  const activeLocalities = LOCALITIES_SEED.filter(l => l.cityId === selectedCityId);

  return (
    <header className="sticky top-0 z-30 bg-[#080B12]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Brand & City Selector */}
        <div className="flex items-center gap-2.5">
          {/* Brand Shield Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2A54] via-[#00E5FF] to-[#2563EB] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#080B12] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00E5FF] fill-[#00E5FF]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="font-heading font-black text-sm tracking-wider text-white">
                HERO<span className="text-[#00E5FF]">APP</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.2 bg-[#00E5FF]/10 text-[#00E5FF] rounded border border-[#00E5FF]/20">
                TRICITY
              </span>
            </div>

            {/* City Selector Trigger */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-[#00E5FF] transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#00E5FF]" />
              <span className="font-medium truncate max-w-[120px]">
                {activeCity.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Action Widgets: Voice, Spin Wheel, Impact, Leaderboard, Notifications, Rewards & Auth */}
        <div className="flex items-center gap-1.5">
          {/* AI Voice Assistant Mic Trigger */}
          <button
            onClick={() => setShowVoiceModal(true)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-xl text-white transition-all flex items-center gap-1"
            title="Open AI Voice Assistant"
          >
            <Mic className="w-4 h-4 text-white animate-pulse" />
          </button>

          {/* Daily Spin Wheel & Bounties Trigger */}
          <button
            onClick={() => setShowBountiesModal(true)}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 p-2 rounded-xl transition-all shadow-md hover:scale-105"
            title="Daily Hero Spin Wheel & Bounties"
          >
            <Gift className="w-4 h-4 fill-slate-950" />
          </button>

          {/* Impact & Sustainability Trigger */}
          <button
            onClick={onOpenImpact}
            className="bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-xl text-emerald-400 transition-all"
            title="Community Sustainability & Impact Dashboard"
          >
            <Leaf className="w-4 h-4 fill-emerald-400" />
          </button>

          {/* Leaderboard Trophy Trigger */}
          <button
            onClick={onOpenLeaderboard}
            className="bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-xl text-amber-400 transition-all"
            title="View Tricity Leaderboard & Squads"
          >
            <Trophy className="w-4 h-4 fill-amber-400" />
          </button>

          {/* Activity Center Bell Indicator */}
          <button
            onClick={onOpenNotifications}
            className="bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-xl text-white transition-all relative"
            title="Activity Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF2A54] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF2A54]" />
          </button>

          {/* Rewards Credits Badge */}
          <button
            onClick={onOpenRewards}
            className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
            title="Open Rewards Store"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-heading font-extrabold text-amber-300 text-xs">
              {currentUser.totalCredits}
            </span>
          </button>

          {/* Admin Dashboard Trigger (If Admin user) */}
          {currentUser.role === 'ADMIN' && (
            <button
              onClick={onOpenAdmin}
              className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 p-1.5 rounded-xl text-purple-300 transition-all"
              title="Admin Moderation Dashboard"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          )}

          {/* Demo User Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-8 h-8 rounded-full overflow-hidden border border-[#00E5FF]/40 focus:outline-none ring-2 ring-transparent hover:ring-[#00E5FF]/30 transition-all"
            >
              <img 
                src={currentUser.profileImageUrl} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 shadow-2xl border border-white/10 z-50">
                <div className="px-2 py-1.5 border-b border-white/5 mb-1">
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                    TEST DEMO PROFILES
                  </p>
                </div>
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                      u.id === currentUser.id 
                        ? 'bg-[#00E5FF]/10 text-[#00E5FF] font-semibold' 
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img src={u.profileImageUrl} alt={u.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="truncate">{u.name}</span>
                    </div>
                    {u.role === 'ADMIN' ? (
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                    ) : u.id === currentUser.id ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                    ) : null}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full text-left px-2.5 py-2 text-xs font-semibold text-[#00E5FF] hover:bg-slate-800 rounded-xl flex items-center gap-2 border-t border-white/5 mt-1"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Phone OTP / Email Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/10 shadow-2xl">
            <h3 className="font-heading font-bold text-slate-100 text-lg mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00E5FF]" />
              Select Tricity Launch Region
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Choose your primary city and neighborhood area for mission discovery.
            </p>

            {/* City Selection Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {CITIES_SEED.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCityId(city.id);
                    setSelectedLocalityId('all');
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedCityId === city.id
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF] font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="text-sm font-heading">{city.name}</div>
                  <div className="text-[10px] text-slate-400">{city.state}</div>
                </button>
              ))}
            </div>

            {/* Locality Selector Dropdown */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Neighborhood Locality
              </label>
              <select
                value={selectedLocalityId}
                onChange={(e) => setSelectedLocalityId(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="all">All Localities in {activeCity.name}</option>
                {activeLocalities.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full py-2.5 bg-[#00E5FF] text-slate-950 font-heading font-bold rounded-xl text-sm hover:bg-[#00B0FF] transition-colors"
            >
              SAVE LOCATION PREFERENCE
            </button>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />

      {/* Phone / Email Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Daily Bounties & Spin Wheel Modal */}
      <DailyBountiesModal
        isOpen={showBountiesModal}
        onClose={() => setShowBountiesModal(false)}
      />
    </header>
  );
};
