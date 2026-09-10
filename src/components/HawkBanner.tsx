'use client';

export default function HawkBanner() {
  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none"
      style={{ zIndex: 6, height: '340px' }}
    >
      <div
        style={{
          animation: 'hawkFly 16s linear infinite',
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
