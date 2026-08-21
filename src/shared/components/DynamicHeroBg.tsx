import React, { useEffect, useRef } from 'react';
import { useApp } from '../../core/context/AppContext';
import { HERO_THEMES } from '../../core/config/themeConfig';

export const DynamicHeroBg: React.FC = () => {
  const { activeThemeId } = useApp();
  const activeTheme = HERO_THEMES.find(t => t.id === activeThemeId) || HERO_THEMES[0];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Seed floating network nodes
    const nodeCount = Math.min(Math.floor(width / 50), 30);
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw floating nodes & connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw Node Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme.primaryColor;
        ctx.globalAlpha = 0.4;
        ctx.fill();

        // Connect nearby nodes with subtle lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = activeTheme.primaryColor;
            ctx.globalAlpha = (1 - dist / 140) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeThemeId]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
