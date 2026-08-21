import React, { useEffect, useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { HERO_THEMES } from '../../core/config/themeConfig';

export const CustomCursor: React.FC = () => {
  const { activeThemeId } = useApp();
  const activeTheme = HERO_THEMES.find(t => t.id === activeThemeId) || HERO_THEMES[0];

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
        target.closest('.leaflet-marker-icon')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
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

  // Smooth lag animation for trailing outer glow ring
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
      {/* Inner Precision Pointer Dot */}
      <div
        className="fixed w-3 h-3 rounded-full transition-transform duration-75 ease-out shadow-lg"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.7 : isHovered ? 1.5 : 1})`,
          backgroundColor: activeTheme.primaryColor,
          boxShadow: `0 0 10px ${activeTheme.primaryColor}`
        }}
      />

      {/* Outer Trailing Energy Pulse Ring */}
      <div
        className="fixed w-8 h-8 rounded-full border border-opacity-60 transition-transform duration-100 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : isHovered ? 2.2 : 1})`,
          borderColor: activeTheme.primaryColor,
          backgroundColor: isHovered ? `${activeTheme.primaryColor}15` : 'transparent',
          boxShadow: isHovered ? `0 0 25px ${activeTheme.primaryColor}` : 'none'
        }}
      />
    </div>
  );
};
