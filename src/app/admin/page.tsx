import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { getProductById } from '@/lib/products';
import { ThemeSetter } from '@/components/ThemeSetter';
import OrdersBoard, { type AdminOrderRow } from '@/components/admin/OrdersBoard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Orders | REDTAIL Admin',
  robots: { index: false, follow: false },
};

type CartItem = { id: string; color: string; size: string; quantity: number };

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    where: { status: 'paid' },
    orderBy: { createdAt: 'asc' },
  });

  const rows: AdminOrderRow[] = orders.map((o) => {
    const items = parseJson<CartItem[]>(o.cartJson, []);
    const address = parseJson<{ city?: string; state?: string; country?: string }>(o.shippingJson, {});
    return {
      id: o.id,
      ref: o.id.slice(-6).toUpperCase(),
      createdAt: o.createdAt.toISOString(),
      name: o.shippingName ?? '(no name)',
      place: [address.city, address.state, address.country].filter(Boolean).join(', ') || '(no address)',
      items: items.map((i) => `${i.quantity}× ${getProductById(i.id)?.name ?? i.id} ${i.size}`),
      labelStatus: o.labelStatus,
      labelError: o.labelError,
      trackingNumber: o.trackingNumber,
      trackingUrl: o.trackingUrl,
      carrier: o.carrier,
    };
  });

  const ready = orders.filter((o) => o.labelStatus === null || o.labelStatus === 'failed');
  const tally = new Map<string, number>();
  for (const o of ready) {
    for (const item of parseJson<CartItem[]>(o.cartJson, [])) {
      const key = `${getProductById(item.id)?.name ?? item.id} — ${item.size}`;
      tally.set(key, (tally.get(key) ?? 0) + item.quantity);
    }
  }
  const tallyRows = [...tally.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div>
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">ADMIN</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100">ORDERS</h1>
        </div>

        {process.env.SHIPPO_API_TOKEN?.startsWith('shippo_test_') && (
          <div className="border border-amber-500/60 bg-amber-500/10 px-5 py-4 text-sm text-amber-400">
            <strong>SHIPPO TEST MODE.</strong> Labels printed here are free samples and cannot be mailed.
            Switch to the live Shippo key before shipping real orders.
          </div>
        )}
        {!process.env.SHIPPO_API_TOKEN && (
          <div className="border border-red-500/60 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            <strong>Shippo isn&apos;t connected.</strong> Label buttons will fail until SHIPPO_API_TOKEN is set.
          </div>
        )}

        <section>
          <h2 className="text-xs tracking-[0.2em] text-stone-500 mb-4">TO MAKE FOR UNSHIPPED ORDERS</h2>
          {tallyRows.length === 0 ? (
            <p className="text-stone-500 text-sm">Nothing waiting.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {tallyRows.map(([label, qty]) => (
                <li key={label} className="flex justify-between border border-stone-800 px-4 py-3 text-sm">
                  <span className="text-stone-300">{label}</span>
                  <span className="text-stone-100 tabular-nums">{qty}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <OrdersBoard rows={rows} />
      </div>
    </div>
  );
}
