const niches = [
  { label: "Pet shop",          path: "M9 11a1.6 1.6 0 1 0 0 .01M15 11a1.6 1.6 0 1 0 0 .01M7 15a1.6 1.6 0 1 0 0 .01M17 15a1.6 1.6 0 1 0 0 .01M12 14c-1.8 0-3 1.4-3 2.8 0 1 .8 1.7 1.8 1.7h2.4c1 0 1.8-.7 1.8-1.7 0-1.4-1.2-2.8-3-2.8z" },
  { label: "Clínica",           path: "M12 5v14M5 12h14" },
  { label: "Padaria",           path: "M4 11h16v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 11l2-5h12l2 5" },
  { label: "Escritório contábil",path: "M7 4h7l4 4v12H7zM14 4v4h4M9 13h6M9 16h6" },
  { label: "Salão",             path: "M6 6l8 8M6 18l8-8M6 6a2.5 2.5 0 1 0 0 .01M6 18a2.5 2.5 0 1 0 0 .01" },
  { label: "Auto center",       path: "M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M5 13h14v4H5zM7 17v1.5M17 17v1.5" },
  { label: "Restaurante",       path: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" },
  { label: "Academia",          path: "M6.5 6.5h11M6.5 17.5h11M3 12h18M8 12v-3.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V12M8 12v3.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V12" },
  { label: "Farmácia",          path: "M12 5v14M5 12h14M8 8l8 8M16 8l-8 8" },
  { label: "Imobiliária",       path: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9 21V12h6v9" },
  { label: "Escola",            path: "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5" },
  { label: "Loja de roupa",     path: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" },
];

function NichePill({ label, path }: { label: string; path: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 11,
        padding: "9px 17px 9px 13px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-card)",
        whiteSpace: "nowrap",
        boxShadow: "var(--shadow-xs)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: 7,
          background: "var(--accent-tint)",
          color: "var(--accent)",
          flexShrink: 0,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d={path} />
        </svg>
      </span>
      <span
        className="font-sans"
        style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Marquee() {
  const doubled = [...niches, ...niches];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--surface-band)",
        padding: "clamp(20px,3vw,28px) 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 14,
          width: "max-content",
          animation: "cerneMarquee 28s linear infinite",
        }}
      >
        {doubled.map((n, i) => (
          <NichePill key={i} label={n.label} path={n.path} />
        ))}
      </div>
    </div>
  );
}
