'use client';
import { useState } from 'react';

export default function HawkBanner() {
  const [flown, setFlown] = useState(false);

  if (flown) return null;

  return (
    <div
      className="absolute inset-x-0 pointer-events-none"
      style={{ top: '110px', height: '260px', zIndex: 5 }}
    >
      <div
        onAnimationEnd={() => setFlown(true)}
        style={{
          animation: 'hawkFly 7s linear 1 forwards',
          position: 'absolute',
          top: 0,
          willChange: 'transform',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hawk.png"
          alt=""
          style={{
            width: '260px',
            height: 'auto',
            display: 'block',
            animation: 'hawkBob 1.4s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
}
