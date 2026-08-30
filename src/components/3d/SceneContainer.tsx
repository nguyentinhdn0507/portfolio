'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Three.js canvas with SSR disabled
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] lg:min-h-[480px] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <div className="absolute w-12 h-12 rounded-full border-2 border-cyan-400/30 border-b-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
    </div>
  ),
});

export default function SceneContainer() {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[480px] relative">
      <HeroCanvas />
    </div>
  );
}
