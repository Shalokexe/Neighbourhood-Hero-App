import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { LevelProgressBar } from '../../shared/components/LevelProgressBar';
import { BADGE_DEFINITIONS } from '../../core/config/levelConfig';
import { HERO_THEMES, PROFILE_BANNERS } from '../../core/config/themeConfig';
import { 
  Shield, Star, Zap, Award, History, CheckCircle2, 
  MapPin, UserCheck, Edit3, Lock, HeartHandshake, Hexagon, Sparkles, Sliders
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

  const [activeSubTab, setActiveSubTab] = useState<'themes' | 'badges' | 'ledger' | 'about'>('themes');
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
    <div className="pb-28 pt-1 px-3 max-w-md mx-auto space-y-3 font-fnsm">
      {/* FNSM HERO SUIT & TECH STATS DOSSIER HEADER */}
      <div className={`fnsm-app-container rounded-3xl p-5 border border-white/20 relative overflow-hidden bg-black text-white ${activeBannerObj.bgStyle}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={currentUser.profileImageUrl} 
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 shadow-lg"
                style={{ borderColor: activeThemeObj.primaryColor }}
              />
              {currentUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00E5FF] text-slate-950 rounded-full flex items-center justify-center border-2 border-black">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading font-black text-white text-lg uppercase tracking-wide">
                  {currentUser.name}
                </h1>
                <span className="text-[9px] bg-[#FF2A54] text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                  LVL {currentUser.level}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold mt-0.5">
                <span className="flex items-center gap-1 text-[#00E5FF]">
                  <MapPin className="w-3.5 h-3.5" />
                  {currentUser.localityName}, {currentUser.cityName}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {currentUser.rating} ({currentUser.ratingCount} Gigs)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-xl bg-slate-900 border border-white/20 text-slate-300 hover:text-white"
            title="Edit Hero Bio"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Level Progression Progress Bar */}
        <LevelProgressBar lifetimeCredits={currentUser.lifetimeCredits} />

        {/* Hero Bio Quote */}
        {currentUser.bio && (
          <p className="text-xs text-slate-300 italic pt-2 border-t border-white/10 mt-3">
            "{currentUser.bio}"
          </p>
        )}
      </div>

      {/* FNSM SUB-TABS NAVIGATION */}
      <div className="flex items-center justify-around bg-slate-950 p-1 rounded-xl border border-white/10 text-xs font-black">
        {[
          { id: 'themes', label: 'SUITS & THEMES', icon: Sparkles },
          { id: 'badges', label: 'BADGES', icon: Award },
          { id: 'ledger', label: 'XP AUDIT', icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                isActive
                  ? 'fnsm-tab-active shadow-[0_0_10px_rgba(255,42,84,0.5)]'
                  : 'fnsm-tab-inactive'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO SUITS & THEMES CONSOLE */}
      {activeSubTab === 'themes' && (
        <div className="space-y-3">
          <h3 className="text-xs font-black text-[#00E5FF] uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4" />
            EQUIPPED HERO COLOR SCHEMES
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {HERO_THEMES.map((theme) => {
              const isUnlocked = unlockedThemeIds.includes(theme.id);
              const isEquipped = activeThemeId === theme.id;
              const canUnlock = currentUser.totalCredits >= (theme.creditCost || 0) && currentUser.level >= (theme.requiredLevel || 1);

              return (
                <div
                  key={theme.id}
                  className={`fnsm-app-container rounded-2xl p-3.5 border transition-all flex items-center justify-between ${
                    isEquipped
                      ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                      : 'border-white/10 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/20 shadow-md flex items-center justify-center font-black text-xs text-slate-950"
                      style={{ background: theme.bgGradient }}
                    >
                      🕷️
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-xs">{theme.name}</h4>
                        {isEquipped && (
                          <span className="text-[9px] bg-[#00E5FF] text-slate-950 px-1.5 py-0.5 rounded font-black uppercase">
                            EQUIPPED
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{theme.tagline}</p>
                    </div>
                  </div>

                  <div>
                    {isEquipped ? (
                      <span className="text-xs text-[#00E5FF] font-black">ACTIVE</span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => setUserTheme(theme.id)}
                        className="px-3 py-1.5 bg-white text-black font-black text-xs rounded-xl hover:bg-slate-200"
                      >
                        EQUIP
                      </button>
                    ) : (
                      <button
                        disabled={!canUnlock}
                        onClick={() => unlockTheme(theme.id)}
                        className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 ${
                          canUnlock
                            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Lock className="w-3 h-3" />
                        <span>{theme.creditCost} CR</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: UNLOCKED BADGES */}
      {activeSubTab === 'badges' && (
        <div className="grid grid-cols-2 gap-2.5">
          {BADGE_DEFINITIONS.map((badge) => {
            const isUnlocked = unlockedBadgeIds.has(badge.id);
            const IconComponent = (Icons as any)[badge.iconName] || Icons.Award;

            return (
              <div
                key={badge.id}
                className={`fnsm-app-container p-3 rounded-2xl border transition-all ${
                  isUnlocked ? 'border-amber-400/40 bg-amber-500/5' : 'border-white/10 opacity-50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-amber-400 mb-2">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">{badge.name}</h4>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{badge.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: AUDIT LEDGER */}
      {activeSubTab === 'ledger' && (
        <div className="space-y-2">
          {creditTransactions.map((tx) => (
            <div key={tx.id} className="fnsm-app-container p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white text-xs">{tx.reason}</h4>
                <span className="text-[9px] text-slate-500">{new Date(tx.createdAt).toLocaleTimeString()}</span>
              </div>

              <span className={`font-black text-xs ${tx.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {tx.amount >= 0 ? `+${tx.amount}` : tx.amount} CR
              </span>
            </div>
          ))}
        </div>
      )}

      {/* EDIT BIO MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="fnsm-app-container max-w-sm w-full rounded-3xl p-5 border border-white/20 bg-black text-white space-y-3">
            <h3 className="font-heading font-black text-white text-sm">EDIT HERO BIO</h3>
            <textarea
              rows={3}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
            />
            <button
              onClick={handleSaveProfile}
              className="w-full py-2.5 bg-white text-black font-black text-xs rounded-xl"
            >
              SAVE BIO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
