'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type AdminOrderRow = {
  id: string;
  ref: string;
  createdAt: string;
  name: string;
  place: string;
  items: string[];
  labelStatus: string | null;
  labelError: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  carrier: string | null;
};

type Result = { ok: boolean; message: string };

async function post(path: string, orderId: string): Promise<Result> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: Boolean(data.ok), message: data.message ?? `Request failed (${res.status})` };
  } catch {
    return { ok: false, message: 'Network error — check your connection and try again' };
  }
}

export default function OrdersBoard({ rows }: { rows: AdminOrderRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, Result>>({});

  const ready = rows.filter((r) => r.labelStatus === null || r.labelStatus === 'failed');
  const attention = rows.filter((r) => r.labelStatus === 'purchasing' || r.labelStatus === 'print_failed');
  const shipped = rows.filter((r) => r.labelStatus === 'printed');

  async function run(path: string, ids: string[]) {
    for (const id of ids) {
      setBusy(id);
      const result = await post(path, id);
      setResults((prev) => ({ ...prev, [id]: result }));
    }
    setBusy(null);
    router.refresh();
  }

  async function shipAll() {
    const count = ready.length;
    const ok = window.confirm(
      `Buy and print ${count} shipping label${count === 1 ? '' : 's'}? Each one charges real postage to your Shippo account (unless it's in test mode) and emails the customer their tracking number.`,
    );
    if (ok) await run('/api/admin/ship', ready.map((r) => r.id));
  }

  return (
    <div className="space-y-12">
      <Section
        title={`READY TO SHIP (${ready.length})`}
        action={
          ready.length > 0 ? (
            <button
              type="button"
              onClick={shipAll}
              disabled={busy !== null}
              className="px-6 py-3 bg-[#8b1212] text-stone-100 text-xs tracking-[0.2em] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? 'WORKING…' : `BUY & PRINT ${ready.length} LABEL${ready.length === 1 ? '' : 'S'}`}
            </button>
          ) : null
        }
        rows={ready}
        empty="No orders waiting to ship."
        busy={busy}
        results={results}
        rowAction={(r) => ({
          label: r.labelStatus === 'failed' ? 'RETRY' : 'SHIP',
          onClick: () => {
            if (window.confirm(`Buy and print the label for order ${r.ref}?`)) run('/api/admin/ship', [r.id]);
          },
        })}
      />

      {attention.length > 0 && (
        <Section
          title={`NEEDS ATTENTION (${attention.length})`}
          rows={attention}
          empty=""
          busy={busy}
          results={results}
          rowAction={(r) =>
            r.labelStatus === 'print_failed'
              ? { label: 'REPRINT', onClick: () => run('/api/admin/reprint', [r.id]) }
              : null
          }
          note="“Purchasing” means a label purchase started but never finished. Check Shippo's Transactions page before doing anything, so you don't pay for the same label twice."
        />
      )}

      <Section
        title={`SHIPPED (${shipped.length})`}
        rows={shipped}
        empty="Nothing shipped yet."
        busy={busy}
        results={results}
        rowAction={(r) => ({ label: 'REPRINT', onClick: () => run('/api/admin/reprint', [r.id]) })}
      />
    </div>
  );
}

function Section({
  title,
  action,
  rows,
  empty,
  busy,
  results,
  rowAction,
  note,
}: {
  title: string;
  action?: React.ReactNode;
  rows: AdminOrderRow[];
  empty: string;
  busy: string | null;
  results: Record<string, Result>;
  rowAction: (r: AdminOrderRow) => { label: string; onClick: () => void } | null;
  note?: string;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-xs tracking-[0.2em] text-stone-500">{title}</h2>
        {action}
      </div>
      {note && <p className="text-stone-500 text-xs mb-4 max-w-2xl leading-relaxed">{note}</p>}
      {rows.length === 0 ? (
        <p className="text-stone-500 text-sm">{empty}</p>
      ) : (
        <div className="overflow-x-auto border border-stone-800">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-800 text-[11px] tracking-[0.15em] text-stone-500">
                <th className="px-4 py-3 font-medium">ORDER</th>
                <th className="px-4 py-3 font-medium">CUSTOMER</th>
                <th className="px-4 py-3 font-medium">ITEMS</th>
                <th className="px-4 py-3 font-medium">STATUS</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const act = rowAction(r);
                const result = results[r.id];
                return (
                  <tr key={r.id} className="border-b border-stone-800/60 last:border-b-0 align-top">
                    <td className="px-4 py-3">
                      <div className="text-stone-100 tabular-nums">#{r.ref}</div>
                      <div className="text-stone-600 text-xs">{new Date(r.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-stone-200">{r.name}</div>
                      <div className="text-stone-500 text-xs">{r.place}</div>
                    </td>
                    <td className="px-4 py-3 text-stone-300">
                      {r.items.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <StatusCell row={r} />
                      {result && (
                        <div className={`text-xs mt-1 ${result.ok ? 'text-green-500' : 'text-red-500'}`}>{result.message}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {act && (
                        <button
                          type="button"
                          onClick={act.onClick}
                          disabled={busy !== null}
                          className="px-4 py-2 border border-stone-700 text-stone-300 text-xs tracking-[0.15em] hover:border-stone-400 hover:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {busy === r.id ? '…' : act.label}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function StatusCell({ row }: { row: AdminOrderRow }) {
  switch (row.labelStatus) {
    case null:
      return <span className="text-stone-400">Waiting</span>;
    case 'purchasing':
      return <span className="text-amber-500">Purchasing (stuck?)</span>;
    case 'failed':
      return (
        <div>
          <span className="text-red-500">Label failed</span>
          {row.labelError && <div className="text-stone-500 text-xs mt-1 break-words">{row.labelError}</div>}
        </div>
      );
    case 'print_failed':
      return (
        <div>
          <span className="text-amber-500">Label bought, print failed</span>
          {row.labelError && <div className="text-stone-500 text-xs mt-1 break-words">{row.labelError}</div>}
        </div>
      );
    case 'printed':
      return (
        <div>
          <span className="text-green-500">Printed</span>
          {row.trackingNumber && (
            <div className="text-xs mt-1">
              {row.trackingUrl ? (
                <a href={row.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-stone-400 underline">
                  {row.carrier ? `${row.carrier} ` : ''}{row.trackingNumber}
                </a>
              ) : (
                <span className="text-stone-400">{row.trackingNumber}</span>
              )}
            </div>
          )}
        </div>
      );
    default:
      return <span className="text-stone-400">{row.labelStatus}</span>;
  }
}
