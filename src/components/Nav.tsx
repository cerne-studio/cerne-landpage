"use client";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Nav() {
  function goContact(e: React.MouseEvent) {
    e.preventDefault();
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

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="#contato" onClick={goContact} className="btn-primary btn-primary--sm">
            <span className="nav-cta-full">Falar com especialista</span>
            <span className="nav-cta-short">Contato</span>
          </a>
        </div>
      </nav>

      <style>{`
        .nav-cta-short { display: none; }
        @media (max-width: 520px) {
          .nav-cta-full { display: none; }
          .nav-cta-short { display: inline; }
        }
      `}</style>
    </header>
  );
}
