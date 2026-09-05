import React, { useEffect, useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { soundService } from '../../core/services/soundService';

interface HeroClickEffect {
  id: number;
  x: number;
  y: number;
  type: string;
}

export const CustomCursor: React.FC = () => {
  const { activeHeroCursor } = useApp();

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [clickEffects, setClickEffects] = useState<HeroClickEffect[]>([]);

  useEffect(() => {
    // Detect touch device (iOS / Android) -> Hide custom mouse cursor on touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering over interactive elements
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.glass-card-hover') ||
        target.closest('.leaflet-marker-icon') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);

      // Play Sound depending on active hero cursor
      switch (activeHeroCursor) {
        case 'miles':
          soundService.playVenomBlastSound();
          break;
        case 'gwen':
          soundService.playGwenPortalSound();
          break;
        case 'wolverine':
          soundService.playClawSlashSound();
          break;
        case 'captain_america':
          soundService.playShieldClackSound();
          break;
        case 'spiderman':
        default:
          soundService.playWebThwipSound();
          break;
      }

      // Trigger Click Effect Burst at location
      const newEffect: HeroClickEffect = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        type: activeHeroCursor
      };

      setClickEffects(prev => [...prev.slice(-6), newEffect]);

      // Remove burst effect after animation finishes
      setTimeout(() => {
        setClickEffects(prev => prev.filter(b => b.id !== newEffect.id));
      }, 500);
    };

    const onMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [activeHeroCursor]);

  // Smooth lag animation for trailing outer target ring
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId: number;

    const followMouse = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25
      }));
      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice) return null;

  // Hero Cursor Config Mapping
  const cursorConfigs = {
    spiderman: {
      icon: '🕷️',
      bgColor: '#FF2A54',
      borderColor: '#00E5FF',
      shadowColor: '#FF2A54',
      trailIcon: '🕸️',
      burstIcon: '🕸️'
    },
    miles: {
      icon: '⚡',
      bgColor: '#111318',
      borderColor: '#FF2A54',
      shadowColor: '#00E5FF',
      trailIcon: '⚡',
      burstIcon: '⚡'
    },
    gwen: {
      icon: '💖',
      bgColor: '#FF80BF',
      borderColor: '#00E5FF',
      shadowColor: '#FF80BF',
      trailIcon: '✨',
      burstIcon: '💖'
    },
    wolverine: {
      icon: '⚔️',
      bgColor: '#EAB308',
      borderColor: '#1E293B',
      shadowColor: '#EAB308',
      trailIcon: '💥',
      burstIcon: '⚔️'
    },
    captain_america: {
      icon: '🛡️',
      bgColor: '#2563EB',
      borderColor: '#EF4444',
      shadowColor: '#2563EB',
      trailIcon: '🌟',
      burstIcon: '🛡️'
    }
  };

  const currentConfig = cursorConfigs[activeHeroCursor] || cursorConfigs.spiderman;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* CLICK ANIMATED HERO BURST EFFECTS */}
      {clickEffects.map((burst) => (
        <div
          key={burst.id}
          className="fixed pointer-events-none z-[9998]"
          style={{ left: `${burst.x}px`, top: `${burst.y}px` }}
        >
          {/* Expanding Hero Emoji Mesh */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl animate-ping opacity-90 filter drop-shadow-[0_0_10px_#00E5FF]">
            {currentConfig.burstIcon}
          </div>

          {/* Expanding Radial Shockwave Ring */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 animate-ping opacity-75 shadow-lg"
            style={{ borderColor: currentConfig.borderColor }}
          />
        </div>
      ))}

      {/* Hero Icon Pointer Dot */}
      <div
        className="fixed w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-75 ease-out shadow-lg text-xs"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.7 : isHovered ? 1.4 : 1})`,
          backgroundColor: currentConfig.bgColor,
          boxShadow: `0 0 14px ${currentConfig.shadowColor}`
        }}
      >
        {currentConfig.icon}
      </div>

      {/* Outer Hero Target Ring */}
      <div
        className="fixed w-9 h-9 rounded-full border border-opacity-70 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : isHovered ? 2.0 : 1})`,
          borderColor: currentConfig.borderColor,
          backgroundColor: isHovered ? `${currentConfig.borderColor}20` : 'transparent',
          boxShadow: isHovered ? `0 0 20px ${currentConfig.borderColor}` : 'none'
        }}
      >
        <span className="text-[10px] opacity-40">{currentConfig.trailIcon}</span>
      </div>
    </div>
  );
};

