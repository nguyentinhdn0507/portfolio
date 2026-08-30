'use client';

import { useEffect } from 'react';

/**
 * AnimatedFavicon
 * - In Production: Animates a glowing, rotating quantum orb on the browser tab favicon.
 * - In Local Development: Keeps the default Next.js favicon intact.
 * - Auto-pauses when the browser tab is hidden to optimize CPU and battery.
 */
export default function AnimatedFavicon() {
  useEffect(() => {
    // Only run animated favicon in production environment
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    let frame = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, 32, 32);

      const cx = 16;
      const cy = 16;
      const time = frame * 0.08;

      // 1. Outer Rotating Gradient Ring
      const grad = ctx.createLinearGradient(
        cx + Math.cos(time) * 14,
        cy + Math.sin(time) * 14,
        cx + Math.cos(time + Math.PI) * 14,
        cy + Math.sin(time + Math.PI) * 14
      );
      grad.addColorStop(0, '#38bdf8'); // Cyan
      grad.addColorStop(0.5, '#818cf8'); // Indigo
      grad.addColorStop(1, '#c084fc'); // Purple

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 3;
      ctx.stroke();
      ctx.restore();

      // 2. Pulsing Central Core
      const pulseRadius = 4.5 + Math.sin(time * 2) * 1.2;
      const coreGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, pulseRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.5, '#38bdf8');
      coreGrad.addColorStop(1, '#6366f1');

      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // 3. Orbiting Sparkle Satellite
      const satX = cx + Math.cos(-time * 1.5) * 8.5;
      const satY = cy + Math.sin(-time * 1.5) * 8.5;
      ctx.beginPath();
      ctx.arc(satX, satY, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 2;
      ctx.fill();

      if (link) {
        link.href = canvas.toDataURL('image/png');
      }

      frame++;
    };

    const startAnimation = () => {
      if (!intervalId) {
        intervalId = setInterval(draw, 60); // Smooth ~16fps, low power consumption
      }
    };

    const stopAnimation = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startAnimation();

    // Pause when tab is not visible
    const handleVisibility = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stopAnimation();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return null;
}
