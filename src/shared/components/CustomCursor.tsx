import React, { useEffect, useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { HERO_THEMES } from '../../core/config/themeConfig';
import { soundService } from '../../core/services/soundService';

interface WebBurst {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const { activeThemeId } = useApp();
  const activeTheme = HERO_THEMES.find(t => t.id === activeThemeId) || HERO_THEMES[0];

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [webBursts, setWebBursts] = useState<WebBurst[]>([]);

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
      soundService.playWebThwipSound();

      // Trigger Web Shoot burst at click location
      const newBurst: WebBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };

      setWebBursts(prev => [...prev.slice(-6), newBurst]);

      // Remove web burst after animation finishes
      setTimeout(() => {
        setWebBursts(prev => prev.filter(b => b.id !== newBurst.id));
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
  }, []);

  // Smooth lag animation for trailing outer web target ring
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

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* CLICK ANIMATED SPIDER-WEB SHOOT BURST EFFECTS */}
      {webBursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed pointer-events-none z-[9998]"
          style={{ left: `${burst.x}px`, top: `${burst.y}px` }}
        >
          {/* Expanding Web Emoji Mesh */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl animate-ping opacity-90 filter drop-shadow-[0_0_10px_#00E5FF]">
            🕸️
          </div>

          {/* Expanding Radial Web Shockwave Ring */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-cyan-400 animate-ping opacity-75 shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
        </div>
      ))}

      {/* Spider Icon Pointer Dot */}
      <div
        className="fixed w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-75 ease-out shadow-lg text-xs"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.7 : isHovered ? 1.4 : 1})`,
          backgroundColor: activeTheme.primaryColor === '#FFFFFF' ? '#FF2A54' : activeTheme.primaryColor,
          boxShadow: `0 0 12px ${activeTheme.primaryColor === '#FFFFFF' ? '#FF2A54' : activeTheme.primaryColor}`
        }}
      >
        🕷️
      </div>

      {/* Outer Web Shooter Target Ring */}
      <div
        className="fixed w-9 h-9 rounded-full border border-opacity-70 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : isHovered ? 2.0 : 1})`,
          borderColor: activeTheme.primaryColor === '#FFFFFF' ? '#00E5FF' : activeTheme.primaryColor,
          backgroundColor: isHovered ? `${activeTheme.primaryColor}20` : 'transparent',
          boxShadow: isHovered ? `0 0 20px ${activeTheme.primaryColor}` : 'none'
        }}
      >
        <span className="text-[10px] opacity-40">🕸️</span>
      </div>
    </div>
  );
};
