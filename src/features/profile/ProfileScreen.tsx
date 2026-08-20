import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { LevelProgressBar } from '../../shared/components/LevelProgressBar';
import { BADGE_DEFINITIONS } from '../../core/config/levelConfig';
import { HERO_THEMES, PROFILE_BANNERS } from '../../core/config/themeConfig';
import { 
  Shield, Star, Zap, Award, History, CheckCircle2, 
  MapPin, UserCheck, Edit3, Lock, HeartHandshake 
} from 'lucide-react';
import * as Icons from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    currentUser, 
    creditTransactions, 
    updateUserProfile,
    activeThemeId,
    activeBannerId,
    unlockedThemeIds,
    unlockedBannerIds,
    setUserTheme,
    setUserBanner,
    unlockTheme,
    unlockBanner
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'badges' | 'themes' | 'ledger' | 'about'>('badges');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBio, setEditBio] = useState(currentUser.bio || '');

  const unlockedBadgeIds = new Set(currentUser.badges.map(b => b.badgeId));

  const activeThemeObj = HERO_THEMES.find(t => t.id === activeThemeId) || HERO_THEMES[0];
  const activeBannerObj = PROFILE_BANNERS.find(b => b.id === activeBannerId) || PROFILE_BANNERS[0];

  const handleSaveProfile = () => {
    updateUserProfile({ bio: editBio });
    setShowEditModal(false);
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Top Player Hero Profile Card */}
      <div className={`glass-card rounded-3xl p-5 border border-[#00E5FF]/30 relative overflow-hidden ${activeBannerObj.bgStyle}`}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={currentUser.profileImageUrl} 
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 shadow-lg"
                style={{ borderColor: activeThemeObj.primaryColor }}
              />
              {currentUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00E5FF] text-slate-950 rounded-full flex items-center justify-center border-2 border-[#080B12]">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading font-extrabold text-white text-lg">
                  {currentUser.name}
                </h1>
              </div>

              <p className="text-xs font-semibold" style={{ color: activeThemeObj.primaryColor }}>
                Level {currentUser.level} Hero · {activeThemeObj.name}
              </p>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <MapPin className="w-3 h-3 text-[#00E5FF]" />
                <span>{currentUser.localityName}, {currentUser.cityName}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-white/10"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Level XP Progress Bar */}
        <LevelProgressBar lifetimeCredits={currentUser.lifetimeCredits} />

        {/* Player Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
          <div className="bg-slate-800/40 p-2 rounded-xl">
            <div className="flex items-center justify-center gap-0.5 text-amber-400 text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{currentUser.rating}</span>
            </div>
            <span className="text-[9px] text-slate-400 block uppercase font-semibold">Rating</span>
          </div>

          <div className="bg-slate-800/40 p-2 rounded-xl">
            <span className="text-xs font-extrabold text-cyan-300 block">{currentUser.ratingCount}</span>
            <span className="text-[9px] text-slate-400 block uppercase font-semibold">Missions</span>
          </div>

          <div className="bg-slate-800/40 p-2 rounded-xl">
            <span className="text-xs font-extrabold text-amber-300 block">{currentUser.totalCredits}</span>
            <span className="text-[9px] text-slate-400 block uppercase font-semibold">Credits</span>
          </div>

          <div className="bg-slate-800/40 p-2 rounded-xl">
            <span className="text-xs font-extrabold text-purple-300 block">{currentUser.badges.length}</span>
            <span className="text-[9px] text-slate-400 block uppercase font-semibold">Badges</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Badges / Themes & Banners / Ledger / About */}
      <div className="flex items-center justify-around glass-card rounded-2xl p-1 border border-white/10 overflow-x-auto">
        {[
          { id: 'badges', label: 'BADGES', icon: Award },
          { id: 'themes', label: 'THEMES & BANNERS', icon: Shield },
          { id: 'ledger', label: 'CREDITS', icon: History },
          { id: 'about', label: 'ABOUT', icon: UserCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-heading font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#00E5FF] text-slate-950 font-extrabold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BADGES GRID */}
      {activeSubTab === 'badges' && (
        <div className="grid grid-cols-2 gap-2.5">
          {BADGE_DEFINITIONS.map((badge) => {
            const isUnlocked = unlockedBadgeIds.has(badge.id);
            const IconComp = (Icons as any)[badge.iconName] || Icons.Award;

            return (
              <div
                key={badge.id}
                className={`glass-card rounded-2xl p-3.5 border transition-all ${
                  isUnlocked
                    ? 'border-[#00E5FF]/40 bg-gradient-to-b from-[#00E5FF]/10 to-transparent'
                    : 'border-white/5 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isUnlocked ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  {isUnlocked ? (
                    <span className="text-[9px] font-bold bg-[#00E5FF]/20 text-[#00E5FF] px-1.5 py-0.2 rounded uppercase">UNLOCKED</span>
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600" />
                  )}
                </div>

                <h4 className="font-heading font-bold text-slate-100 text-xs mb-0.5">
                  {badge.name}
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: THEMES & BANNERS CUSTOMIZATION HUB */}
      {activeSubTab === 'themes' && (
        <div className="space-y-4">
          {/* Hero Themes Section */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
            <h3 className="font-heading font-extrabold text-white text-sm flex items-center justify-between">
              <span>Hero Color Schemes</span>
              <span className="text-[10px] text-[#00E5FF]">Active: {activeThemeObj.name}</span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {HERO_THEMES.map((theme) => {
                const isUnlocked = unlockedThemeIds.includes(theme.id);
                const isActive = activeThemeId === theme.id;
                const canAfford = currentUser.totalCredits >= (theme.creditCost || 0);

                return (
                  <div
                    key={theme.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                        : 'border-white/10 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xs shadow-md shrink-0"
                        style={{ background: theme.bgGradient }}
                      >
                        ⚡
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-slate-100 text-xs">
                          {theme.name}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {theme.tagline}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isActive ? (
                        <span className="text-[10px] font-extrabold bg-[#00E5FF] text-slate-950 px-2.5 py-1 rounded-xl uppercase">
                          ACTIVE
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => setUserTheme(theme.id)}
                          className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-[#00E5FF] px-3 py-1.5 rounded-xl border border-[#00E5FF]/30"
                        >
                          APPLY
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const res = unlockTheme(theme.id);
                            alert(res.message);
                          }}
                          disabled={!canAfford}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                            canAfford
                              ? 'bg-amber-400 text-slate-950 border-amber-400 hover:bg-amber-300'
                              : 'bg-slate-800 text-slate-500 border-white/5 cursor-not-allowed'
                          }`}
                        >
                          {theme.creditCost ? `UNLOCK (${theme.creditCost} CR)` : 'LOCKED'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profile Banners Section */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
            <h3 className="font-heading font-extrabold text-white text-sm flex items-center justify-between">
              <span>Profile Header Banners</span>
              <span className="text-[10px] text-[#00E5FF]">Active: {activeBannerObj.name}</span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {PROFILE_BANNERS.map((banner) => {
                const isUnlocked = unlockedBannerIds.includes(banner.id);
                const isActive = activeBannerId === banner.id;
                const canAfford = currentUser.totalCredits >= (banner.creditCost || 0);

                return (
                  <div
                    key={banner.id}
                    className={`p-3 rounded-2xl border transition-all space-y-2 ${
                      isActive
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                        : 'border-white/10 bg-slate-900/60'
                    }`}
                  >
                    <div className={`h-12 w-full rounded-xl ${banner.bgStyle} p-2 flex items-center justify-between`}>
                      <span className="text-xs font-heading font-bold text-white shadow-sm">
                        {banner.name}
                      </span>

                      {isActive ? (
                        <span className="text-[9px] font-extrabold bg-[#00E5FF] text-slate-950 px-2 py-0.5 rounded uppercase">
                          ACTIVE
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => setUserBanner(banner.id)}
                          className="text-[10px] font-bold bg-slate-950/80 text-[#00E5FF] px-2.5 py-1 rounded-lg border border-[#00E5FF]/40"
                        >
                          APPLY
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const res = unlockBanner(banner.id);
                            alert(res.message);
                          }}
                          disabled={!canAfford}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                            canAfford ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {banner.creditCost ? `${banner.creditCost} CR` : 'LOCKED'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREDIT TRANSACTIONS LEDGER */}
      {activeSubTab === 'ledger' && (
        <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="font-heading font-bold text-slate-100 text-sm">
              Auditable Transaction Ledger
            </h3>
            <span className="text-xs text-amber-400 font-extrabold">
              Balance: {currentUser.totalCredits} Credits
            </span>
          </div>

          <div className="space-y-2">
            {creditTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 bg-slate-900/60 rounded-xl border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-200 block">
                    {tx.reason}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(tx.createdAt).toLocaleDateString()} · {tx.type}
                  </span>
                </div>

                <span className={`font-heading font-extrabold ${
                  tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ABOUT HERO & INTERESTS */}
      {activeSubTab === 'about' && (
        <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-1">
              Hero Biography
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentUser.bio || 'No bio added yet.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-2">
              Preferred Categories
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded-xl border border-white/10"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Bio Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/10 space-y-3">
            <h3 className="font-heading font-bold text-white text-base">
              Edit Hero Profile Bio
            </h3>
            <textarea
              rows={3}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Tell neighbors about your skills and availability..."
              className="w-full bg-[#121826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
            />
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-2 bg-[#00E5FF] text-slate-950 text-xs font-bold rounded-xl"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
