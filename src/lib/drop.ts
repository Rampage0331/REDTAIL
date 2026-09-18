// Set this to an ISO date string (e.g. "2026-10-17T23:59:59-07:00") when a
// close date is decided. While it is null, the drop is treated as open
// indefinitely and no close date is shown anywhere on the site.
export const DROP_CLOSES_AT: string | null = null;

export function isDropClosed(): boolean {
  if (!DROP_CLOSES_AT) return false;
  return Date.now() > new Date(DROP_CLOSES_AT).getTime();
}

export function getDropCloseDateLabel(): string | null {
  if (!DROP_CLOSES_AT) return null;
  return new Date(DROP_CLOSES_AT).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// The clause used in "MADE TO ORDER — ..." messaging across the site.
// Falls back to generic language until a real close date is set.
export function getDropClosingPhrase(): string {
  const dateLabel = getDropCloseDateLabel();
  return dateLabel ? `ORDERING CLOSES ${dateLabel.toUpperCase()}` : "SHIPS AFTER THE DROP CLOSES";
}
