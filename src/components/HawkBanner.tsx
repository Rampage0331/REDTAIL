'use client';
import { useState } from 'react';

export default function HawkBanner() {
  const [flown, setFlown] = useState(false);

  if (flown) return null;

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none"
      style={{ zIndex: 6, height: '340px' }}
    >
      <div
        onAnimationEnd={() => setFlown(true)}
        style={{
          animation: 'hawkFly 7s linear 1 forwards',
          position: 'absolute',
          top: '24px',
          willChange: 'transform',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hawk.png"
          alt=""
          style={{
            width: '300px',
            height: 'auto',
            display: 'block',
            mixBlendMode: 'screen',
            animation: 'hawkBob 1.4s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
}
