'use client';
import { useState, FormEvent } from 'react';

export default function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-xs tracking-[0.2em] text-stone-400">YOU&apos;RE ON THE LIST</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 md:items-start w-full">
      <p className="text-xs tracking-[0.2em] text-stone-600">GET NOTIFIED OF FUTURE DROPS</p>
      <div className="flex gap-2 w-full max-w-xs">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL ADDRESS"
          className="flex-1 min-w-0 bg-transparent border border-stone-700 px-4 py-2 text-xs tracking-widest text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-stone-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-accent px-4 py-2 text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? '...' : 'JOIN'}
        </button>
      </div>
      {status === 'error' && <p className="text-red-500 text-xs">Something went wrong. Try again.</p>}
    </form>
  );
}
