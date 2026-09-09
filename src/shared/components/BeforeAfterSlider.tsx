import React, { useState } from 'react';
import { Sparkles, Calendar, Users, MapPin, ShieldCheck } from 'lucide-react';

interface TransformationItem {
  id: string;
  title: string;
  location: string;
  date: string;
  volunteers: number;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

const DEMO_TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'trans_ajit_sarovar',
    title: 'Ajit Sarovar Lake Waterfront Plastic Cleanup',
    location: 'Ajit Sarovar, Kharar Sector 125',
    date: 'Sunday Hustle Drive • Sep 6',
    volunteers: 48,
    beforeImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'BEFORE: 340KG PLASTIC DEBRIS',
    afterLabel: 'AFTER: RESTORED LAKEFRONT',
    description: '48 local heroes gathered on Sunday morning to clear plastic waste, bottles, and restore the Ajit Sarovar lake ecosystem.'
  },
  {
    id: 'trans_storm_drain',
    title: 'Phase 7 Monsoon Storm Drain Clearance',
    location: 'Phase 7 Industrial Junction, Mohali',
    date: 'Urgent Action • Sep 4',
    volunteers: 18,
    beforeImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'BEFORE: DRAINAGE BLOCKAGE',
    afterLabel: 'AFTER: FREE-FLOW WATERWAY',
    description: 'Cleared heavy silt, debris, and plastic bags blocking monsoon runoff, preventing severe neighborhood street flooding.'
  },
  {
    id: 'trans_green_belt',
    title: 'Sector 70 Green Belt Tree Plantation',
    location: 'Sector 70 Community Park, Mohali',
    date: 'Green Drive • Aug 30',
    volunteers: 32,
    beforeImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'BEFORE: BARREN DUMPING GROUND',
    afterLabel: 'AFTER: 120 SAPLINGS PLANTED',
    description: 'Transformed an abandoned soil patch into a thriving urban mini-forest with 120 native saplings planted.'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100

  const activeItem = DEMO_TRANSFORMATIONS[selectedIdx];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (offset / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="space-y-3 font-fnsm">
      {/* Transformation Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {DEMO_TRANSFORMATIONS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedIdx(idx);
              setSliderPosition(50);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-orbitron font-extrabold whitespace-nowrap transition-all border ${
              selectedIdx === idx
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'bg-[#05070D] text-slate-400 border-white/10 hover:border-white/30'
            }`}
          >
            <span>{idx === 0 ? '🌊 AJIT SAROVAR' : idx === 1 ? '🌊 STORM DRAIN' : '🌿 SECTOR 70'}</span>
          </button>
        ))}
      </div>

      {/* Main Before/After Interactive Comparison Card */}
      <div className="fnsm-app-container rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#05070D] shadow-2xl relative">
        
        {/* Header Info */}
        <div className="p-3 border-b border-cyan-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-orbitron font-bold text-cyan-400 uppercase tracking-widest block">
              PROOF OF WORK • CIVIC TRANSFORMATION
            </span>
            <h3 className="font-extrabold text-white text-xs truncate max-w-[240px]">
              {activeItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono">
            <Users className="w-3 h-3 text-emerald-400" />
            <span>{activeItem.volunteers} SQUAD</span>
          </div>
        </div>

        {/* Drag Comparison Visualizer Container */}
        <div
          className="relative h-56 w-full cursor-ew-resize select-none overflow-hidden touch-none"
          onMouseMove={handleSliderMove}
          onTouchMove={handleSliderMove}
        >
          {/* AFTER IMAGE (Base background layer) */}
          <img
            src={activeItem.afterImage}
            alt={activeItem.afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-emerald-950/80 border border-emerald-400/60 px-2 py-0.5 rounded text-[9px] font-orbitron font-extrabold text-emerald-300 shadow-md">
            {activeItem.afterLabel}
          </div>

          {/* BEFORE IMAGE (Clipped overlay layer) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={activeItem.beforeImage}
              alt={activeItem.beforeLabel}
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="absolute top-2 left-2 bg-rose-950/80 border border-rose-400/60 px-2 py-0.5 rounded text-[9px] font-orbitron font-extrabold text-rose-300 shadow-md">
              {activeItem.beforeLabel}
            </div>
          </div>

          {/* DRAG HANDLE BAR & ICON */}
          <div
            className="absolute top-0 bottom-0 z-20 flex items-center justify-center -ml-3 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-white text-slate-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.8)] flex items-center justify-center font-black text-xs">
              ↔
            </div>
          </div>
        </div>

        {/* Card Footer & Details */}
        <div className="p-3 bg-[#05070D] space-y-1.5 border-t border-cyan-500/20">
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {activeItem.description}
          </p>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{activeItem.location}</span>
            </span>
            <span className="text-amber-400 font-bold">{activeItem.date}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
