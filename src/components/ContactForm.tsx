'use client';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return <p className="text-stone-300 tracking-wide">Message sent — we&apos;ll get back to you soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-xs tracking-[0.2em] text-stone-600 mb-3">NAME</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-transparent border border-stone-800 px-4 py-4 text-stone-100 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder:text-stone-700"
        />
      </div>
      <div>
        <label className="block text-xs tracking-[0.2em] text-stone-600 mb-3">EMAIL</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent border border-stone-800 px-4 py-4 text-stone-100 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder:text-stone-700"
        />
      </div>
      <div>
        <label className="block text-xs tracking-[0.2em] text-stone-600 mb-3">MESSAGE</label>
        <textarea
          rows={6}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full bg-transparent border border-stone-800 px-4 py-4 text-stone-100 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder:text-stone-700 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-10 py-4 bg-[#8b1212] text-stone-100 text-xs tracking-[0.3em] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'SENDING…' : 'SEND IT'}
      </button>
      {status === 'error' && <p className="text-red-500 text-xs tracking-widest">{errorMessage}</p>}
    </form>
  );
}
