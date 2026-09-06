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
  imageSrc: string;
  description: string;
  themeColor: string;
  borderColor: string;
}[] = [
  {
    id: 'spiderman',
    name: 'Peter Parker',
    heroName: 'Classic Spider-Man',
    universe: 'MARVEL • 616',
    imageSrc: '/cursors/spiderman.png',
    description: 'Classic Red & Blue web-shooter emblem with Web Thwip sound effects.',
    themeColor: '#FF2A54',
    borderColor: '#00E5FF'
  },
  {
    id: 'miles',
    name: 'Miles Morales',
    heroName: 'Spider-Man (Miles)',
    universe: 'MARVEL • 1610',
    imageSrc: '/cursors/miles.png',
    description: 'Stealth Black suit mask with Venom Blast bio-electric shockwave.',
    themeColor: '#111318',
    borderColor: '#FF2A54'
  },
  {
    id: 'gwen',
    name: 'Gwen Stacy',
    heroName: 'Ghost-Spider (Gwen)',
    universe: 'MARVEL • 65',
    imageSrc: '/cursors/gwen.png',
    description: 'Neon Pink Ghost Suit mask with dimensional portal ripple.',
    themeColor: '#FF80BF',
    borderColor: '#00E5FF'
  },
  {
    id: 'hulk',
    name: 'Bruce Banner',
    heroName: 'The Incredible Hulk',
    universe: 'MARVEL • 616',
    imageSrc: '/cursors/hulk.png',
    description: 'Gamma Green Fist emblem with Hulk Smash ground pound sound.',
    themeColor: '#22C55E',
    borderColor: '#166534'
  },
  {
    id: 'captain_america',
    name: 'Steve Rogers',
    heroName: 'Captain America',
    universe: 'MARVEL • 616',
    imageSrc: '/cursors/captain_america.png',
    description: 'Vibranium Shield emblem with kinetic ricochet pulse sound.',
    themeColor: '#2563EB',
    borderColor: '#EF4444'
  },
  {
    id: 'batman',
    name: 'Bruce Wayne',
    heroName: 'Dark Knight Batman',
    universe: 'DC • GOTHAM',
    imageSrc: '/cursors/batman.png',
    description: 'Yellow & Black Bat Symbol emblem with Batarang Swish sound.',
    themeColor: '#EAB308',
    borderColor: '#1E293B'
  },
  {
    id: 'superman',
    name: 'Clark Kent',
    heroName: 'Man of Steel Superman',
    universe: 'DC • METROPOLIS',
    imageSrc: '/cursors/superman.png',
    description: 'Kryptonian S Shield emblem with Heat Vision beam audio.',
    themeColor: '#0284C7',
    borderColor: '#EF4444'
  },
  {
    id: 'flash',
    name: 'Barry Allen',
    heroName: 'The Flash',
    universe: 'DC • CENTRAL CITY',
    imageSrc: '/cursors/flash.png',
    description: 'Speedforce Lightning Bolt emblem with Speed Whoosh audio.',
    themeColor: '#EF4444',
    borderColor: '#FACC15'
  },
  {
    id: 'wolverine',
    name: 'Logan',
    heroName: 'Wolverine (X-Men)',
    universe: 'MARVEL • X-MEN',
    imageSrc: '/cursors/wolverine.png',
    description: 'Adamantium Claws slash cursor with metallic Snikt audio effects!',
    themeColor: '#EAB308',
    borderColor: '#1E293B'
  }
];

export const HeroCursorSelectorModal: React.FC<HeroCursorSelectorModalProps> = ({ isOpen, onClose }) => {
  const { activeHeroCursor, setHeroCursor } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="fnsm-app-container max-w-md w-full rounded-2xl p-5 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,229,255,0.25)] space-y-4 relative overflow-hidden text-white font-fnsm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#05070D] border border-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-orbitron font-extrabold text-white text-sm tracking-wider uppercase">
                HERO CURSOR SELECTOR
              </h3>
              <p className="text-[10px] text-cyan-400 font-orbitron font-bold tracking-wider">
                MARVEL & DC OFFICIAL EMBLEM CURSORS
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cursors Grid / List */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
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
                  className="w-11 h-11 rounded-full overflow-hidden p-0.5 shrink-0 shadow-md border bg-black/50 flex items-center justify-center"
                  style={{ borderColor: hero.borderColor }}
                >
                  <img 
                    src={hero.imageSrc} 
                    alt={hero.heroName} 
                    className="w-full h-full object-cover rounded-full"
                  />
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
