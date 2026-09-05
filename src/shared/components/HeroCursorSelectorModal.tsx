import React from 'react';
import { useApp, HeroCursorType } from '../../core/context/AppContext';
import { X, CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';

interface HeroCursorSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HERO_CURSOR_OPTIONS: {
  id: HeroCursorType;
  name: string;
  heroName: string;
  universe: string;
  icon: string;
  description: string;
  themeColor: string;
  borderColor: string;
}[] = [
  {
    id: 'spiderman',
    name: 'Peter Parker',
    heroName: 'Classic Spider-Man',
    universe: 'Earth-616',
    icon: '🕷️',
    description: 'Classic Red & Blue web-shooter emblem with Web Thwip sound effects.',
    themeColor: '#FF2A54',
    borderColor: '#00E5FF'
  },
  {
    id: 'miles',
    name: 'Miles Morales',
    heroName: 'Spin / Spider-Man',
    universe: 'Earth-1610',
    icon: '⚡',
    description: 'Stealth Black suit with Venom Blast bio-electric voltage shockwave.',
    themeColor: '#111318',
    borderColor: '#FF2A54'
  },
  {
    id: 'gwen',
    name: 'Gwen Stacy',
    heroName: 'Ghost-Spider',
    universe: 'Earth-65',
    icon: '💖',
    description: 'Neon Pink & White Ghost Suit with dimensional portal ripple.',
    themeColor: '#FF80BF',
    borderColor: '#00E5FF'
  },
  {
    id: 'wolverine',
    name: 'Logan',
    heroName: 'Wolverine (X-Men)',
    universe: 'Earth-616',
    icon: '⚔️',
    description: 'Adamantium Claws slash cursor with metallic Snikt audio effects!',
    themeColor: '#EAB308',
    borderColor: '#1E293B'
  },
  {
    id: 'captain_america',
    name: 'Steve Rogers',
    heroName: 'Captain America',
    universe: 'Earth-616',
    icon: '🛡️',
    description: 'Vibranium Shield emblem with kinetic ricochet pulse sound.',
    themeColor: '#2563EB',
    borderColor: '#EF4444'
  }
];

export const HeroCursorSelectorModal: React.FC<HeroCursorSelectorModalProps> = ({ isOpen, onClose }) => {
  const { activeHeroCursor, setHeroCursor } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="fnsm-app-container max-w-sm w-full rounded-2xl p-5 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,229,255,0.25)] space-y-4 relative overflow-hidden text-white font-fnsm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#05070D] border border-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-orbitron font-extrabold text-white text-sm tracking-wider uppercase">
                HERO CURSOR SELECTOR
              </h3>
              <p className="text-[10px] text-cyan-400 font-orbitron font-bold tracking-wider">
                SELECT YOUR MARVEL HERO EMBLEM
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cursors List */}
        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
          {HERO_CURSOR_OPTIONS.map((hero) => {
            const isSelected = activeHeroCursor === hero.id;
            return (
              <button
                key={hero.id}
                onClick={() => {
                  setHeroCursor(hero.id);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 relative ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                    : 'bg-[#05070D]/80 border-slate-700 hover:border-slate-500 hover:bg-[#05070D]'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md border"
                  style={{ backgroundColor: hero.themeColor, borderColor: hero.borderColor }}
                >
                  {hero.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-orbitron font-bold text-white text-xs truncate">
                      {hero.heroName}
                    </h4>
                    <span className="text-[9px] font-orbitron font-extrabold text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                      {hero.universe}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                    {hero.description}
                  </p>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black text-xs rounded-xl uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
        >
          CONFIRM HERO CURSOR →
        </button>
      </div>
    </div>
  );
};
