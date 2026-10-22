export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} aria-label="Ducati Panigale concept">
      <svg className="brand-mark__shield" viewBox="0 0 46 52" aria-hidden="true">
        <path d="M23 2 43 10v17c0 11-8 18-20 23C11 45 3 38 3 27V10Z" fill="currentColor" />
        <path d="M13 19h9c8 0 12 3 12 8s-4 8-12 8h-9Zm7 5v6h3c3 0 4-1 4-3s-1-3-4-3Z" fill="#090909" />
      </svg>
      <span className="brand-mark__type">
        <strong>DUCATI</strong>
        {!compact && <small>PANIGALE V4 / MY27</small>}
      </span>
    </span>
  );
}
