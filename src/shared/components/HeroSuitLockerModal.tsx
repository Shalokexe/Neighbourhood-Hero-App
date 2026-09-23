import React, { useState } from 'react';
import { X, Zap, Shield, Lock, CheckCircle2, Sparkles, Hexagon, Flame } from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { HERO_SUITS_ROSTER, HeroSuit } from '../../core/config/suitsData';
import { soundService } from '../../core/services/soundService';
import confetti from 'canvas-confetti';

interface HeroSuitLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeroSuitLockerModal: React.FC<HeroSuitLockerModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, awardBonusCredits, triggerCelebration } = useApp();

  const equippedSuitId = currentUser.equippedSuitId || 'suit_classic';
  const unlockedSuitIds = currentUser.unlockedSuitIds || ['suit_classic'];

  const [selectedSuitId, setSelectedSuitId] = useState<string>(equippedSuitId);

  if (!isOpen) return null;

  const activeSuit = HERO_SUITS_ROSTER.find(s => s.id === selectedSuitId) || HERO_SUITS_ROSTER[0];
  const isUnlocked = unlockedSuitIds.includes(activeSuit.id);
  const isEquipped = equippedSuitId === activeSuit.id;

  const playSuitSound = (soundType: string) => {
    switch (soundType) {
      case 'web': soundService.playWebThwipSound(); break;
      case 'venom': soundService.playVenomBlastSound(); break;
      case 'gwen': soundService.playGwenPortalSound(); break;
      case 'shield': soundService.playShieldClackSound(); break;
      case 'hulk': soundService.playHulkSmashSound(); break;
      case 'claw': soundService.playClawSlashSound(); break;
      default: soundService.playClickSound();
    }
  };

  const handleEquipSuit = (suit: HeroSuit) => {
    playSuitSound(suit.soundType);

    updateUserProfile({
      equippedSuitId: suit.id
    });

    triggerCelebration({
      title: `🕷️ ${suit.name.toUpperCase()} EQUIPPED!`,
      subtitle: `Perk Active: ${suit.perkBonus}`,
      credits: 0
    });
  };

  const handleUnlockSuit = (suit: HeroSuit) => {
    if (currentUser.totalCredits < suit.creditCost) {
      soundService.playClickSound();
      alert(`Insufficient Credits! You need ${suit.creditCost - currentUser.totalCredits} more Civic Credits to unlock ${suit.name}. Complete community drives to earn credits!`);
      return;
    }

    playSuitSound(suit.soundType);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Deduct credits & unlock suit
    awardBonusCredits(-suit.creditCost, `Unlocked Hero Suit: ${suit.name}`);

    const newUnlocked = [...unlockedSuitIds, suit.id];
    updateUserProfile({
      unlockedSuitIds: newUnlocked,
      equippedSuitId: suit.id
    });

    triggerCelebration({
      title: `🎉 ${suit.name.toUpperCase()} UNLOCKED & EQUIPPED!`,
      subtitle: `Perk Unlocked: ${suit.perkBonus}`,
      credits: suit.creditCost
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-fnsm">
      <div className="relative w-full max-w-md bg-[#05070D] border-2 border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.3)]">
        
        {/* HEADER */}
        <div className="p-4 bg-gradient-to-r from-cyan-900/40 via-[#05070D] to-purple-900/40 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-orbitron font-extrabold text-white text-xs uppercase tracking-widest block">
                  HERO SUIT & EMBLEM LOCKER
                </span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 font-mono px-1.5 py-0.5 rounded border border-cyan-500/40 font-bold">
                  FNSM TECH
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <span>Available Credits:</span>
                <span className="font-bold text-amber-400 flex items-center gap-0.5">
                  {currentUser.totalCredits} <Hexagon className="w-3 h-3 fill-amber-400/30 text-amber-400 inline" />
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/40 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUIT SELECTION CAROUSEL TABS */}
        <div className="p-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none bg-[#05070D]">
          {HERO_SUITS_ROSTER.map((suit) => {
            const isSuitUnlocked = unlockedSuitIds.includes(suit.id);
            const isSuitEquipped = equippedSuitId === suit.id;
            const isSelected = selectedSuitId === suit.id;

            return (
              <button
                key={suit.id}
                onClick={() => {
                  setSelectedSuitId(suit.id);
                  soundService.playClickSound();
                }}
                className={`relative p-2 rounded-xl border flex flex-col items-center justify-center min-w-[72px] transition-all font-mono ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105'
                    : 'bg-slate-900/60 border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 mb-1">
                  <img src={suit.previewImage} alt={suit.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] font-bold text-slate-200 truncate max-w-[65px] text-center">
                  {suit.name.split(' ')[0]}
                </span>

                {isSuitEquipped && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[8px] font-bold shadow-md">
                    ✓
                  </span>
                )}

                {!isSuitUnlocked && (
                  <Lock className="w-3 h-3 text-amber-400 absolute top-1 left-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE SELECTED SUIT DISPLAY CARD */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto font-fnsm text-slate-200">
          
          {/* Suit Holographic Preview Box */}
          <div className="relative h-48 rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-2xl group">
            <img
              src={activeSuit.previewImage}
              alt={activeSuit.name}
              className="w-full h-full object-cover brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-black/40" />

            {/* Top Badge */}
            <div className="absolute top-2 left-2 bg-[#05070D]/90 border border-cyan-500/50 px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-extrabold text-cyan-300 shadow-md">
              {activeSuit.character}
            </div>

            {isEquipped && (
              <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-orbitron font-black text-[9px] px-2 py-0.5 rounded shadow-lg uppercase">
                ACTIVE SUIT EQUIPPED
              </div>
            )}

            {/* Bottom Suit Title Overlay */}
            <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#05070D]/90 rounded-xl border border-cyan-500/30">
              <h3 className="font-orbitron font-black text-white text-sm tracking-wider uppercase">
                {activeSuit.name}
              </h3>
              <p className="text-[11px] text-slate-300 font-sans line-clamp-2">
                {activeSuit.description}
              </p>
            </div>
          </div>

          {/* PERK BADGE */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
              <div>
                <span className="font-orbitron font-bold text-amber-300 block text-xs">
                  {activeSuit.perkName}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  {activeSuit.perkBonus}
                </span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          {isEquipped ? (
            <div className="py-3 px-4 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-orbitron font-bold text-xs text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>CURRENTLY EQUIPPED IN NEIGHBORHOOD</span>
            </div>
          ) : isUnlocked ? (
            <button
              onClick={() => handleEquipSuit(activeSuit)}
              className="w-full py-3.5 px-4 rounded-xl font-orbitron font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.6)] flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
              <span>EQUIP {activeSuit.name.toUpperCase()}</span>
            </button>
          ) : (
            <button
              onClick={() => handleUnlockSuit(activeSuit)}
              className="w-full py-3.5 px-4 rounded-xl font-orbitron font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
            >
              <Lock className="w-5 h-5 text-slate-950" />
              <span>UNLOCK FOR {activeSuit.creditCost} CIVIC CREDITS ⬡</span>
            </button>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-3 bg-[#05070D] border-t border-cyan-500/20 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-orbitron font-bold text-slate-300 uppercase tracking-wider transition-all"
          >
            CLOSE SUIT LOCKER
          </button>
        </div>

      </div>
    </div>
  );
};
