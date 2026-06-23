"use client";
import { useState } from "react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  function goContact(e: React.MouseEvent) {
    e.preventDefault();
    setOpen(false);
    scrollTo("contato");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "color-mix(in srgb, var(--surface-page) 84%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <nav
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          height: 70,
          padding: "0 var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <span
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: 23,
            letterSpacing: "-0.05em",
            color: "var(--text-heading)",
          }}
        >
          cerne
        </span>

        {/* Desktop CTA */}
        <div
          className="hidden-mobile"
          style={{ display: "flex", alignItems: "center", gap: 20 }}
        >
          <a href="#contato" onClick={goContact} className="btn-primary" style={{ height: 36, padding: "0 16px", fontSize: 14 }}>
            Falar com especialista
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-card)",
            color: "var(--text-body)",
            cursor: "pointer",
          }}
          className="show-mobile"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--surface-page)",
            padding: "18px var(--gutter) 22px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <a
            href="#contato"
            onClick={goContact}
            className="btn-primary"
            style={{ height: 48, fontSize: 15 }}
          >
            Falar com especialista
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: inline-flex !important; }
        }
        @media (min-width: 761px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
