import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { CITIES_SEED, LOCALITIES_SEED } from '../../core/config/citiesData';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { AuthModal } from '../../features/auth/AuthModal';
import { DailyBountiesModal } from '../../features/bounties/DailyBountiesModal';
import { HeroCursorSelectorModal } from './HeroCursorSelectorModal';
import { MapPin, Zap, UserCheck, ShieldAlert, Gift, ChevronDown, CheckCircle2, Mic, Bell, Trophy, UserPlus, Leaf, Sparkles, Hexagon, Wand2 } from 'lucide-react';

interface HeaderNavProps {
  onOpenRewards: () => void;
  onOpenAdmin: () => void;
  onOpenNotifications: () => void;
  onOpenLeaderboard: () => void;
  onOpenImpact: () => void;
  onOpenReels: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ 
  onOpenRewards, 
  onOpenAdmin,
  onOpenNotifications,
  onOpenLeaderboard,
  onOpenImpact,
  onOpenReels
}) => {
  const { 
    currentUser, 
    allUsers, 
    switchUser, 
    selectedCityId, 
    setSelectedCityId, 
    selectedLocalityId, 
    setSelectedLocalityId,
    activeHeroCursor
  } = useApp();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBountiesModal, setShowBountiesModal] = useState(false);
  const [showCursorModal, setShowCursorModal] = useState(false);

  const activeCity = CITIES_SEED.find(c => c.id === selectedCityId) || CITIES_SEED[0];
  const activeLocalities = LOCALITIES_SEED.filter(l => l.cityId === selectedCityId);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 max-w-md mx-auto px-2 pt-2 pb-1 font-fnsm">
      <div className="fnsm-app-container rounded-2xl px-3 py-2 flex items-center justify-between shadow-2xl border border-cyan-500/30 relative bg-[#05070D]/95">
        
        {/* Left: Tricity Region Selector */}
        <button
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-1.5 bg-[#05070D] hover:bg-slate-900 border border-cyan-500/30 px-2.5 py-1 rounded-xl transition-all"
        >
          <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] font-orbitron font-extrabold text-white uppercase tracking-wider block">
              {activeCity.name}
            </span>
            <span className="text-[8px] text-cyan-400 font-orbitron flex items-center gap-0.5 font-bold">
              TRICITY REGION <ChevronDown className="w-2.5 h-2.5" />
            </span>
          </div>
        </button>

        {/* Right Action Widgets: Hero Cursor, Voice, Reels, Spin, Notifications, Credits & Profile */}
        <div className="flex items-center gap-1">
          {/* Hero Cursor Selector Trigger */}
          <button
            onClick={() => setShowCursorModal(true)}
            className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:scale-105 transition-all shadow-[0_0_10px_rgba(0,229,255,0.3)]"
            title="Switch Marvel Hero Cursor (Spider-Man, Miles, Gwen, Wolverine, Cap)"
          >
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          {/* Voice Mic Button */}
          <button
            onClick={() => setShowVoiceModal(true)}
            className="p-1.5 rounded-lg bg-[#05070D] border border-cyan-500/30 text-white hover:border-cyan-400 transition-all"
            title="AI Voice Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </button>

          {/* Hero Reels Feed */}
          <button
            onClick={onOpenReels}
            className="p-1.5 rounded-lg bg-[#FF2A54]/20 border border-[#FF2A54]/40 text-[#FF2A54] hover:scale-105 transition-all"
            title="Gen-Z Hero Reels Feed"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#FF2A54]" />
          </button>

          {/* Spin Wheel */}
          <button
            onClick={() => setShowBountiesModal(true)}
            className="p-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:scale-105 transition-all shadow-md"
            title="Daily Hero Spin Wheel"
          >
            <Gift className="w-3.5 h-3.5 fill-slate-950" />
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="p-1.5 rounded-lg bg-[#05070D] border border-cyan-500/30 text-white relative hover:border-cyan-400"
            title="Activity Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF2A54] animate-ping" />
          </button>

          {/* Rewards Credit Counter */}
          <button
            onClick={onOpenRewards}
            className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-xl text-amber-400 hover:bg-amber-500/20 transition-all font-orbitron font-extrabold text-xs"
          >
            <span>{currentUser.totalCredits}</span>
            <Hexagon className="w-3.5 h-3.5 fill-amber-400/30 text-amber-400" />
          </button>

          {/* Profile User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-7 h-7 rounded-full border-2 border-cyan-400/50 overflow-hidden hover:border-cyan-300 transition-all shadow-[0_0_10px_rgba(0,229,255,0.3)]"
            >
              <img src={currentUser.profileImageUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 fnsm-app-container rounded-2xl p-2 shadow-2xl border border-cyan-500/40 z-50 bg-[#05070D]">
                <div className="px-2 py-1 border-b border-cyan-500/20 mb-1">
                  <p className="text-[9px] text-cyan-400 font-orbitron font-extrabold uppercase tracking-wider">
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
                    className={`w-full text-left px-2 py-1.5 rounded-xl flex items-center justify-between text-xs transition-colors font-fnsm ${
                      u.id === currentUser.id 
                        ? 'bg-cyan-500/20 text-white font-bold border border-cyan-500/30' 
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img src={u.profileImageUrl} alt={u.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="truncate">{u.name}</span>
                    </div>

                    {u.role === 'ADMIN' ? (
                      <span className="text-[8px] bg-purple-500/20 text-purple-300 px-1 py-0.5 rounded font-bold font-orbitron">ADMIN</span>
                    ) : u.id === currentUser.id ? (
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    ) : null}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs font-orbitron font-bold text-rose-400 hover:bg-slate-900 rounded-xl flex items-center gap-2 border-t border-cyan-500/20 mt-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Command Panel</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs font-orbitron font-bold text-cyan-400 hover:bg-slate-900 rounded-xl flex items-center gap-2"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Full Phone/Email Login</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setShowCursorModal(true);
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs font-orbitron font-bold text-amber-300 hover:bg-slate-900 rounded-xl flex items-center gap-2"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch Marvel Hero Cursor</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="fnsm-app-container max-w-sm w-full rounded-2xl p-5 border border-cyan-500/40 shadow-2xl bg-[#05070D] text-white space-y-3 font-fnsm">
            <h3 className="font-orbitron font-extrabold text-white text-base flex items-center gap-2 uppercase tracking-wider">
              <MapPin className="w-5 h-5 text-cyan-400" />
              SELECT TRICITY REGION RADAR
            </h3>
            <p className="text-xs text-slate-400 font-fnsm">
              Choose your primary city and neighborhood area for activity discovery.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-orbitron font-extrabold text-cyan-300 uppercase tracking-wider">TARGET CITY</label>
              <select
                value={selectedCityId}
                onChange={(e) => {
                  setSelectedCityId(e.target.value);
                  const firstLoc = LOCALITIES_SEED.find(l => l.cityId === e.target.value);
                  if (firstLoc) setSelectedLocalityId(firstLoc.id);
                }}
                className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white font-orbitron font-bold focus:outline-none focus:border-cyan-400"
              >
                {CITIES_SEED.map((city) => (
                  <option key={city.id} value={city.id}>{city.name} ({city.state})</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black rounded-xl text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              SAVE RADAR REGION →
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

      {/* Daily Bounties Modal */}
      <DailyBountiesModal
        isOpen={showBountiesModal}
        onClose={() => setShowBountiesModal(false)}
      />

      {/* Hero Cursor Selector Modal */}
      <HeroCursorSelectorModal
        isOpen={showCursorModal}
        onClose={() => setShowCursorModal(false)}
      />
    </header>
  );
};

