'use client';
import Image from 'next/image';

export default function HawkBanner() {
  return (
    <div
      className="absolute inset-x-0 top-0 h-56 pointer-events-none overflow-hidden"
      style={{ zIndex: 6 }}
    >
      <div
        style={{
          animation: 'hawkFly 16s linear infinite',
          position: 'absolute',
          top: '32px',
          willChange: 'transform',
        }}
      >
        <Image
          src="/images/hawk.png"
          alt=""
          width={280}
          height={280}
          style={{
            mixBlendMode: 'screen',
            opacity: 0.92,
          }}
          priority
        />
      </div>
    </div>
  );
}
