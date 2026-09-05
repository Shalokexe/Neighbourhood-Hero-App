import React, { useState } from 'react';
import { Heart, Zap, MessageSquare, Share2, Sparkles, User, CheckCircle2, ArrowLeft } from 'lucide-react';

export interface HeroReel {
  id: string;
  heroName: string;
  heroAvatar: string;
  heroLevel: number;
  missionTitle: string;
  locality: string;
  videoUrl: string;
  likes: number;
  propsCount: number;
  commentsCount: number;
  isLiked?: boolean;
}

const REELS_SEED: HeroReel[] = [
  {
    id: 'reel_1',
    heroName: 'Simran Kaur',
    heroAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    heroLevel: 5,
    missionTitle: 'Groceries Delivered to Uncle in Sector 125 🛒',
    locality: 'Sector 125, Kharar',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-delivery-person-giving-a-package-41618-large.mp4',
    likes: 142,
    propsCount: 88,
    commentsCount: 24
  },
  {
    id: 'reel_2',
    heroName: 'Arjun Mehta',
    heroAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    heroLevel: 6,
    missionTitle: 'Fixed WiFi Router & Python Setup 💻',
    locality: 'Sector 17, Chandigarh',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4',
    likes: 215,
    propsCount: 160,
    commentsCount: 42
  },
  {
    id: 'reel_3',
    heroName: 'Prakriti Sharma',
    heroAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    heroLevel: 4,
    missionTitle: 'Morning Dog Walk with Bruno in Phase 3B2 🐕',
    locality: 'Phase 3B2, Mohali',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-with-her-dog-in-a-park-41315-large.mp4',
    likes: 310,
    propsCount: 205,
    commentsCount: 56
  }
];

interface HeroReelsFeedProps {
  onBack: () => void;
}

export const HeroReelsFeed: React.FC<HeroReelsFeedProps> = ({ onBack }) => {
  const [reels, setReels] = useState<HeroReel[]>(REELS_SEED);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeReel = reels[currentIndex];

  const handleToggleLike = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const isLiked = !r.isLiked;
        return {
          ...r,
          isLiked,
          likes: isLiked ? r.likes + 1 : r.likes - 1
        };
      }
      return r;
    }));
  };

  const handleGiveProps = (reelId: string) => {
    setReels(prev => prev.map(r => r.id === reelId ? { ...r, propsCount: r.propsCount + 1 } : r));
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4 font-fnsm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#121826] border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-white text-base flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#FF2A54]" />
          HERO REELS FEED
        </h1>
      </div>

      {/* Video Reel Container Card */}
      <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
        <video
          key={activeReel.id}
          src={activeReel.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        {/* Top Overlay Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <img src={activeReel.heroAvatar} alt={activeReel.heroName} className="w-9 h-9 rounded-full border-2 border-[#00E5FF] object-cover" />
          <div>
            <h4 className="font-bold text-white text-xs flex items-center gap-1">
              {activeReel.heroName}
              <CheckCircle2 className="w-3 h-3 text-[#00E5FF]" />
            </h4>
            <span className="text-[10px] text-slate-300">{activeReel.locality} · Level {activeReel.heroLevel}</span>
          </div>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-4 left-4 right-16 space-y-1">
          <span className="text-[10px] font-black text-[#00E5FF] bg-black/60 px-2 py-0.5 rounded border border-[#00E5FF]/40 uppercase">
            COMMUNITY MISSION HIGHLIGHT
          </span>
          <h3 className="font-extrabold text-white text-sm leading-tight text-shadow">
            {activeReel.missionTitle}
          </h3>
        </div>

        {/* Right Floating Action Icons */}
        <div className="absolute bottom-6 right-3 flex flex-col items-center gap-4 text-white">
          {/* Like Heart Button */}
          <button
            onClick={() => handleToggleLike(activeReel.id)}
            className="flex flex-col items-center gap-0.5 group"
          >
            <div className={`p-3 rounded-full bg-black/60 border border-white/20 transition-transform group-hover:scale-110 ${activeReel.isLiked ? 'text-[#FF2A54] border-[#FF2A54]' : ''}`}>
              <Heart className={`w-5 h-5 ${activeReel.isLiked ? 'fill-[#FF2A54]' : ''}`} />
            </div>
            <span className="text-[10px] font-extrabold">{activeReel.likes}</span>
          </button>

          {/* Hero Props Button */}
          <button
            onClick={() => handleGiveProps(activeReel.id)}
            className="flex flex-col items-center gap-0.5 group"
          >
            <div className="p-3 rounded-full bg-black/60 border border-white/20 text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 fill-amber-400" />
            </div>
            <span className="text-[10px] font-extrabold">{activeReel.propsCount}</span>
          </button>

          {/* Comments Count */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="p-3 rounded-full bg-black/60 border border-white/20 text-slate-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold">{activeReel.commentsCount}</span>
          </div>
        </div>
      </div>

      {/* Reel Selector Slider Controls */}
      <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-2xl border border-white/10 text-xs">
        <button
          onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : reels.length - 1))}
          className="px-3 py-1.5 bg-slate-800 rounded-xl font-bold text-slate-300 hover:text-white"
        >
          ← PREV REEL
        </button>

        <span className="font-extrabold text-[#00E5FF]">
          REEL {currentIndex + 1} OF {reels.length}
        </span>

        <button
          onClick={() => setCurrentIndex(prev => (prev < reels.length - 1 ? prev + 1 : 0))}
          className="px-3 py-1.5 bg-slate-800 rounded-xl font-bold text-slate-300 hover:text-white"
        >
          NEXT REEL →
        </button>
      </div>
    </div>
  );
};
