import React from 'react';
import { calculateHeroLevel } from '../../core/services/creditEngine';
import { Shield, Zap, Award } from 'lucide-react';

interface LevelProgressBarProps {
  lifetimeCredits: number;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ lifetimeCredits }) => {
  const levelInfo = calculateHeroLevel(lifetimeCredits);

  return (
    <div className="glass-card rounded-2xl p-4 border border-[#00E5FF]/20 relative overflow-hidden bg-gradient-to-r from-[#121826] via-[#162035] to-[#121826]">
      {/* Background Subtle Pulse Ring */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#00E5FF]/10 blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00E5FF] to-[#2563EB] p-0.5 shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#080B12] rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00E5FF]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase">
                LEVEL {levelInfo.level}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="text-xs text-slate-400 font-medium">HERO STATUS</span>
            </div>
            <h4 className="font-heading font-extrabold text-white text-base">
              {levelInfo.levelName}
            </h4>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 justify-end text-amber-400 font-heading font-bold text-sm">
            <Zap className="w-4 h-4 fill-amber-400" />
            <span>{levelInfo.currentXp} XP</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Next: {levelInfo.nextLevelXp} XP
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#FF2A54] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,229,255,0.6)]"
          style={{ width: `${levelInfo.progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
        <span>{levelInfo.progressPercent}% to next rank</span>
        <span>Keep completing missions to level up!</span>
      </div>
    </div>
  );
};
