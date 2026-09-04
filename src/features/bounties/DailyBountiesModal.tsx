import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Gift, Zap, Sparkles, CheckCircle2, X, Award, Flame, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyBountiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyBountiesModal: React.FC<DailyBountiesModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, awardBonusCredits } = useApp();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [claimedSpin, setClaimedSpin] = useState(false);
  const [spinReward, setSpinReward] = useState<number | null>(null);

  const [quests, setQuests] = useState([
    { id: 'q1', title: 'Complete 1 Errand Task', reward: 15, progress: 1, total: 1, isClaimed: true },
    { id: 'q2', title: 'Post a Mission in your Locality', reward: 20, progress: 0, total: 1, isClaimed: false },
    { id: 'q3', title: 'Maintain 3-Day Mission Streak 🔥', reward: 30, progress: 2, total: 3, isClaimed: false }
  ]);

  if (!isOpen) return null;

  const handleSpinWheel = () => {
    if (isSpinning || claimedSpin) return;

    setIsSpinning(true);
    // Random spin between 1440 and 2160 degrees
    const randomDegree = 1440 + Math.floor(Math.random() * 720);
    setRotationDegrees(randomDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setClaimedSpin(true);

      const rewardsPool = [10, 15, 25, 50, 15, 20];
      const reward = rewardsPool[Math.floor(Math.random() * rewardsPool.length)];
      setSpinReward(reward);

      // Award Credits via App Context
      awardBonusCredits(reward, `Daily Spin Wheel Reward (+${reward} Credits)`);

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }, 3000);
  };

  const handleClaimQuest = (questId: string, reward: number) => {
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, isClaimed: true } : q));
    awardBonusCredits(reward, `Daily Bounty Quest Completed (+${reward} Credits)`);
    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/20 shadow-2xl space-y-4 relative overflow-hidden bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-600 p-0.5 flex items-center justify-center">
              <Gift className="w-4 h-4 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm">
                DAILY BOUNTIES & SPIN
              </h3>
              <p className="text-[10px] text-slate-400">
                Log in daily to claim free credits & rewards
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SPIN WHEEL SECTION */}
        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 text-center space-y-3 bg-gradient-to-b from-amber-500/10 to-transparent">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            DAILY HERO SPIN WHEEL
          </h4>

          <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
            {/* Pointer */}
            <div className="absolute -top-2 z-10 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-[14px] border-t-amber-400 filter drop-shadow-md" />

            {/* Wheel Canvas */}
            <div
              className="w-full h-full rounded-full border-4 border-amber-400 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform duration-[3000ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
              style={{ transform: `rotate(${rotationDegrees}deg)` }}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFC72C_0_60deg,#121826_60_120deg,#00E5FF_120_180deg,#FF2A54_180_240deg,#A855F7_240_300deg,#10B981_300_360deg)] opacity-80" />
              <div className="w-12 h-12 rounded-full bg-black border-2 border-white flex items-center justify-center font-black text-xs text-amber-300 z-10">
                HERO
              </div>
            </div>
          </div>

          {spinReward !== null && (
            <div className="text-xs font-extrabold text-amber-300 animate-bounce">
              🎉 YOU WON +{spinReward} GIG CREDITS!
            </div>
          )}

          <button
            onClick={handleSpinWheel}
            disabled={isSpinning || claimedSpin}
            className={`w-full py-2.5 rounded-xl font-heading font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
              claimedSpin
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : isSpinning
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:scale-[1.02] shadow-lg'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{claimedSpin ? 'SPIN CLAIMED TODAY' : isSpinning ? 'SPINNING...' : 'SPIN WHEEL FOR FREE CREDITS'}</span>
          </button>
        </div>

        {/* DAILY QUESTS LIST */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            TODAY'S HERO QUESTS
          </h4>

          {quests.map((quest) => (
            <div
              key={quest.id}
              className="glass-card p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs"
            >
              <div>
                <h5 className="font-bold text-white text-xs">{quest.title}</h5>
                <span className="text-[10px] text-slate-400">
                  Progress: {quest.progress}/{quest.total} · Reward: +{quest.reward} CR
                </span>
              </div>

              {quest.isClaimed ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> CLAIMED
                </span>
              ) : quest.progress >= quest.total ? (
                <button
                  onClick={() => handleClaimQuest(quest.id, quest.reward)}
                  className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-lg hover:bg-amber-300"
                >
                  CLAIM
                </button>
              ) : (
                <span className="text-[10px] text-slate-500 font-semibold">IN PROGRESS</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
