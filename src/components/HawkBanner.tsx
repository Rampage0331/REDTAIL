'use client';
import { useState, useEffect } from 'react';

// Hawk body, head, and tail — constant across all frames
const BODY_PATHS = [
  // Main body
  "M 75,35 C 85,27 108,26 118,32 C 125,37 125,47 118,52 C 108,55 85,52 75,45 Z",
  // Head / beak
  "M 75,39 C 67,35 57,33 54,37 C 53,42 58,45 67,44 Z",
  // Tail fan
  "M 118,39 C 126,34 136,31 143,34 C 145,41 143,48 136,48 C 126,47 118,45 Z",
];

// Wing paths per frame [leftWing, rightWing]
const FRAMES = [
  // Frame 1: Wings raised (upstroke peak)
  [
    "M 80,36 C 58,18 28,9 6,13 C 16,22 48,32 80,41",
    "M 112,36 C 134,18 164,9 186,13 C 176,22 144,32 112,41",
  ],
  // Frame 2: Wings level (glide)
  [
    "M 80,39 C 52,35 22,33 4,35 C 16,38 50,41 80,43",
    "M 112,39 C 140,35 170,33 188,35 C 176,38 142,41 112,43",
  ],
  // Frame 3: Wings down (downstroke)
  [
    "M 80,41 C 56,53 28,61 6,57 C 18,49 50,44 80,45",
    "M 112,41 C 136,53 164,61 186,57 C 174,49 142,44 112,45",
  ],
  // Frame 4: Wings recovering (mid-upstroke)
  [
    "M 80,37 C 55,24 26,18 6,22 C 18,28 50,34 80,41",
    "M 112,37 C 137,24 166,18 186,22 C 174,28 142,34 112,41",
  ],
];

export default function HawkBanner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), 135);
    return () => clearInterval(id);
  }, []);

  const [left, right] = FRAMES[frame];

  return (
    <div
      className="absolute inset-x-0 top-0 h-48 pointer-events-none overflow-hidden"
      style={{ zIndex: 6 }}
    >
      <div
        style={{
          animation: 'hawkFly 14s linear infinite',
          position: 'absolute',
          top: '56px',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 200 80"
          width="260"
          height="104"
          style={{
            fill: 'var(--color-accent)',
            opacity: 0.55,
            filter: 'drop-shadow(0 0 6px var(--color-accent))',
            transition: 'fill 0.8s ease, filter 0.8s ease',
          }}
        >
          {BODY_PATHS.map((d, i) => <path key={i} d={d} />)}
          <path d={left} />
          <path d={right} />
        </svg>
      </div>
    </div>
  );
}
