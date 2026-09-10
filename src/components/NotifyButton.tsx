'use client';
import { useState } from 'react';

export default function NotifyButton() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to email service (Mailchimp, Klaviyo, etc.)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="w-full py-5 border border-stone-800 text-center space-y-1">
        <p className="text-xs tracking-[0.3em]" style={{ color: 'var(--color-accent)', transition: 'color 0.8s ease' }}>
          YOU&apos;RE IN THE HUNT.
        </p>
        <p className="text-stone-600 text-xs tracking-wider">We&apos;ll reach out when it&apos;s time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <p className="text-xs tracking-[0.3em] text-stone-600">GET NOTIFIED WHEN WE LAUNCH</p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="flex-1 bg-transparent border border-stone-700 px-4 py-3 text-xs tracking-wider text-stone-100 placeholder:text-stone-700 focus:outline-none focus:border-stone-500 transition-colors duration-300"
        />
        <button
          type="submit"
          className="btn-accent px-6 py-3 text-xs tracking-[0.25em] whitespace-nowrap"
        >
          JOIN THE HUNT
        </button>
      </div>
    </form>
  );
}
