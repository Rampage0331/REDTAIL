'use client';
import { useState, useEffect } from 'react';

// Hawk facing RIGHT, flying left → right
// ViewBox: 0 0 300 120 | Body centered at x=150 y=60
// Anatomy: head right (~x=225), tail fan left (~x=65), wings spread screen-left + screen-right

const BODY = [
  // Main body — elongated, wider in middle, tapers to head right + tail left
  "M 78,57 C 105,47 148,45 185,48 C 206,50 219,53 222,57 C 225,62 221,68 213,71 C 194,75 148,75 106,71 C 87,68 78,64 78,58 Z",
  // Head — rounded, beak pointing right
  "M 220,52 C 225,47 234,46 239,51 C 242,56 238,64 230,66 C 223,66 218,61 220,52 Z",
  // Tail fan — spreads left from body trailing edge
  "M 80,57 C 70,50 58,48 46,52 C 41,58 44,68 52,73 C 61,76 74,73 80,65 Z",
];

// Each frame = [leftWingPath, rightWingPath]
// Wings have fingered primaries (4 feathers at tips) via L-commands creating a serrated edge
// Frame 1=upstroke, 2=glide, 3=downstroke, 4=recovery
const FRAMES: [string, string][] = [
  // Frame 1 — UPSTROKE (tips raised high)
  [
    "M 110,54 C 85,42 54,28 20,18 C 13,17 7,17 4,19 L 8,22 L 6,26 L 12,24 L 12,28 L 18,26 L 18,30 L 24,28 L 25,32 C 52,40 84,49 110,60",
    "M 190,54 C 215,42 246,28 280,18 C 287,17 293,17 296,19 L 292,22 L 294,26 L 288,24 L 288,28 L 282,26 L 282,30 L 276,28 L 275,32 C 248,40 216,49 190,60",
  ],
  // Frame 2 — GLIDE (wings level with body)
  [
    "M 110,54 C 80,50 48,51 16,53 C 11,53 6,54 4,55 L 4,59 L 9,58 L 8,62 L 14,60 L 14,64 L 20,62 L 21,66 L 27,64 C 56,64 84,61 110,62",
    "M 190,54 C 220,50 252,51 284,53 C 289,53 294,54 296,55 L 296,59 L 291,58 L 292,62 L 286,60 L 286,64 L 280,62 L 279,66 L 273,64 C 244,64 216,61 190,62",
  ],
  // Frame 3 — DOWNSTROKE (tips pushed down)
  [
    "M 110,60 C 83,70 52,84 20,94 C 13,96 7,97 4,95 L 7,92 L 5,88 L 11,89 L 10,85 L 16,86 L 17,82 L 23,83 L 24,79 C 52,72 84,65 110,60",
    "M 190,60 C 217,70 248,84 280,94 C 287,96 293,97 296,95 L 293,92 L 295,88 L 289,89 L 290,85 L 284,86 L 283,82 L 277,83 L 276,79 C 248,72 216,65 190,60",
  ],
  // Frame 4 — RECOVERY (half-up, between upstroke and glide)
  [
    "M 110,54 C 84,46 52,37 18,31 C 12,30 6,30 4,32 L 7,35 L 5,39 L 11,37 L 11,41 L 17,39 L 17,43 L 23,41 L 24,45 C 52,50 84,54 110,60",
    "M 190,54 C 216,46 248,37 282,31 C 288,30 294,30 296,32 L 293,35 L 295,39 L 289,37 L 289,41 L 283,39 L 283,43 L 277,41 L 276,45 C 248,50 216,54 190,60",
  ],
];

export default function HawkBanner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), 130);
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
          animation: 'hawkFly 16s linear infinite',
          position: 'absolute',
          top: '44px',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 300 120"
          width="320"
          height="128"
          style={{
            fill: 'var(--color-accent)',
            opacity: 0.6,
            filter: 'drop-shadow(0 0 10px var(--color-accent))',
            transition: 'fill 0.8s ease, filter 0.8s ease',
          }}
        >
          {BODY.map((d, i) => <path key={`b${i}`} d={d} />)}
          <path d={left} />
          <path d={right} />
        </svg>
      </div>
    </div>
  );
}
