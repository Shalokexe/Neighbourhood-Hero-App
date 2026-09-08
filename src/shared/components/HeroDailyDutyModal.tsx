import React, { useState } from 'react';
import { Flame, Calendar, Award, CheckCircle2, Zap, Shield, Sparkles, X, ChevronRight, Lock } from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { soundService } from '../../core/services/soundService';
import confetti from 'canvas-confetti';

interface HeroDailyDutyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeroDailyDutyModal: React.FC<HeroDailyDutyModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, awardBonusCredits, triggerCelebration } = useApp();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);

  if (!isOpen) return null;

  const currentStreak = currentUser.currentStreak || 5;
  const longestStreak = currentUser.longestStreak || 12;
  const streakMultiplier = currentUser.streakMultiplier || 1.25;

  const todayStr = new Date().toISOString().split('T')[0];
  const hasClaimedDate = currentUser.lastCheckInDate?.startsWith(todayStr);
  const canClaim = !hasClaimedDate && !claimedToday;

  const handleClaimCheckIn = () => {
    if (!canClaim || isClaiming) return;
    setIsClaiming(true);

    const bonusCredits = 50 + (currentStreak * 10);
    const newStreak = currentStreak + 1;
    const newMultiplier = Math.min(2.0, Math.round((1 + newStreak * 0.05) * 100) / 100);

    setTimeout(() => {
      soundService.playCompleteSound();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {
        // ignore fallback
      }

      awardBonusCredits(bonusCredits, `Daily Civic Patrol Streak Check-In (Day ${newStreak})`);

      updateUserProfile({
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, longestStreak),
        lastCheckInDate: new Date().toISOString(),
        streakMultiplier: newMultiplier
      });

      triggerCelebration({
        title: `🔥 STREAK DAY ${newStreak} CLAIMED!`,
        subtitle: `You earned +${bonusCredits} Civic Credits! Daily multiplier increased to ${newMultiplier}x!`,
        credits: bonusCredits
      });

      setClaimedToday(true);
      setIsClaiming(false);
    }, 600);
  };

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const todayDayIdx = (new Date().getDay() + 6) % 7; // 0=Mon, 6=Sun

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-fnsm">
      <div className="relative w-full max-w-md bg-[#05070D] border-2 border-amber-500/50 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.3)]">
        
        {/* TOP GLOWING STREAK HEADER */}
        <div className="relative p-5 bg-gradient-to-br from-amber-600/30 via-rose-600/20 to-[#05070D] border-b border-amber-500/30 text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-slate-400 hover:text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-orbitron font-extrabold text-amber-300 uppercase tracking-widest mb-2 shadow-inner">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>DAILY CIVIC DUTY STREAK</span>
          </div>

          {/* FLAME STREAK DISPLAY */}
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="relative">
              <Flame className="w-14 h-14 text-amber-400 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-bounce" />
              <Sparkles className="w-5 h-5 text-yellow-200 absolute -top-1 -right-1 animate-spin" />
            </div>

            <div className="text-left">
              <div className="text-4xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-400 tracking-wider">
                {claimedToday ? currentStreak + 1 : currentStreak} DAYS
              </div>
              <p className="text-xs text-amber-200/80 font-mono flex items-center gap-1">
                <span>Longest Record:</span>
                <span className="font-extrabold text-amber-300">{longestStreak} Days</span>
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-black/60 border border-cyan-500/40 px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 mt-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Streak Multiplier:</span>
            <span className="font-bold text-white">{streakMultiplier}x XP & Credits</span>
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* CLAIM BUTTON AREA */}
          <div className="rounded-xl p-4 border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-rose-500/10 space-y-2 text-center">
            {canClaim ? (
              <button
                onClick={handleClaimCheckIn}
                disabled={isClaiming}
                className="w-full py-3.5 px-4 rounded-xl font-orbitron font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 active:scale-95"
              >
                <Flame className="w-5 h-5 text-slate-950 fill-amber-950" />
                <span>{isClaiming ? 'RECORDING CIVIC PATROL...' : `CLAIM DAY ${currentStreak + 1} PATROL BONUS (+${50 + (currentStreak * 10)} CREDITS)`}</span>
              </button>
            ) : (
              <div className="py-3 px-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-orbitron font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>TODAY'S CIVIC PATROL RECORDED! COME BACK TOMORROW!</span>
              </div>
            )}
            <p className="text-[11px] text-slate-400 font-mono">
              Daily check-ins keep your neighborhood radar active & increase mission credit rewards.
            </p>
          </div>

          {/* WEEKLY HUSTLE CALENDAR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-orbitron font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>WEEKLY PATROL CALENDAR</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono">SUNDAY = HUSTLE DAY 🧹</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {daysOfWeek.map((day, idx) => {
                const isToday = idx === todayDayIdx;
                const isPast = idx < todayDayIdx;
                const isSunday = idx === 6;

                let bgStyle = 'bg-slate-900/60 border-slate-800 text-slate-500';
                if (isPast || (isToday && !canClaim)) {
                  bgStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                } else if (isToday && canClaim) {
                  bgStyle = 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse';
                } else if (isSunday) {
                  bgStyle = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                }

                return (
                  <div
                    key={day}
                    className={`rounded-lg p-2 border text-center font-mono space-y-1 transition-all ${bgStyle}`}
                  >
                    <span className="text-[10px] font-bold block">{day}</span>
                    <div className="flex items-center justify-center">
                      {isPast || (isToday && !canClaim) ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isSunday ? (
                        <span className="text-xs">🧹</span>
                      ) : isToday ? (
                        <Flame className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 opacity-40" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STREAK MILESTONES & BADGE REWARDS */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-orbitron font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>STREAK MILESTONES & EMBLEM UNLOCKS</span>
            </h4>

            <div className="space-y-1.5 text-xs font-mono">
              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${currentStreak >= 3 ? 'bg-amber-500/15 border-amber-400/40 text-amber-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="font-bold block">3-Day Patrol Scout</span>
                    <span className="text-[10px] opacity-75">+100 Civic Credits Bonus</span>
                  </div>
                </div>
                {currentStreak >= 3 ? <span className="text-xs font-bold text-emerald-400">UNLOCKED</span> : <Lock className="w-4 h-4" />}
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${currentStreak >= 5 ? 'bg-amber-500/15 border-amber-400/40 text-amber-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <span className="font-bold block">5-Day Civic Guardian</span>
                    <span className="text-[10px] opacity-75">1.25x Credit Multiplier on Drives</span>
                  </div>
                </div>
                {currentStreak >= 5 ? <span className="text-xs font-bold text-emerald-400">UNLOCKED</span> : <Lock className="w-4 h-4" />}
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${currentStreak >= 7 ? 'bg-amber-500/15 border-amber-400/40 text-amber-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">👑</span>
                  <div>
                    <span className="font-bold block">7-Day Neighborhood Legend</span>
                    <span className="text-[10px] opacity-75">+500 Civic Credits & Exclusive Emblem</span>
                  </div>
                </div>
                {currentStreak >= 7 ? <span className="text-xs font-bold text-emerald-400">UNLOCKED</span> : <Lock className="w-4 h-4" />}
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-3 bg-[#05070D] border-t border-amber-500/20 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-orbitron font-bold text-slate-200 uppercase tracking-wider transition-all"
          >
            CLOSE PATROL LOG
          </button>
        </div>

      </div>
    </div>
  );
};
