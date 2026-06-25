"use client";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(56px,9vw,104px) 0 clamp(64px,11vw,120px)",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="grid-bg grid-bg-fade"
        style={{ position: "absolute", inset: 0 }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "0 var(--gutter)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Animated rings */}
        <div
          style={{
            position: "relative",
            width: "min(280px, 88vw)",
            height: "min(280px, 88vw)",
            display: "grid",
            placeItems: "center",
            marginBottom: "clamp(28px,5vw,48px)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 62%)",
            }}
          />
          <div aria-hidden style={{ position: "absolute", width: 210, height: 210, borderRadius: "50%", border: "1px solid var(--accent)", opacity: 0.16 }} />
          <div aria-hidden style={{ position: "absolute", width: 162, height: 162, borderRadius: "50%", border: "1px solid var(--accent)", opacity: 0.24 }} />
          <div aria-hidden style={{ position: "absolute", width: 116, height: 116, borderRadius: "50%", border: "1px solid var(--accent)", opacity: 0.34 }} />
          <div aria-hidden style={{ position: "absolute", width: 210, height: 210, borderRadius: "50%", border: "1.5px dashed var(--accent)", opacity: 0.4, animation: "cerneSpin 38s linear infinite" }} />
          <div aria-hidden style={{ position: "absolute", width: 162, height: 162, borderRadius: "50%", border: "1.5px dashed var(--accent)", opacity: 0.3, animation: "cerneSpinRev 28s linear infinite" }} />
          <div aria-hidden style={{ position: "absolute", width: 116, height: 116, borderRadius: "50%", border: "2px solid var(--accent)", opacity: 0.5, animation: "cerneRingPulse 3.6s var(--ease-out) infinite" }} />
          <svg
            width="76"
            height="76"
            viewBox="0 0 100 100"
            fill="none"
            style={{ position: "relative", color: "var(--accent)", animation: "cernePulse 4s ease-in-out infinite" }}
          >
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="138 82" transform="rotate(140 50 50)" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="38 182" transform="rotate(58 50 50)" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </div>

        {/* Badge */}
        <span
          className="font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-card)",
            fontSize: 13,
            color: "var(--text-body)",
            marginBottom: 26,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
          cerne sistemas
        </span>

        <h1
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "var(--display-md)",
            letterSpacing: "-0.04em",
            lineHeight: 1.04,
            color: "var(--text-heading)",
            maxWidth: "18ch",
            margin: "0 0 22px",
          }}
        >
          Sistemas que fazem sentido para o seu negócio.
        </h1>

        <p
          className="font-sans"
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: 1.6,
            color: "var(--text-body)",
            maxWidth: 540,
            margin: "0 0 34px",
          }}
        >
          CRM, financeiro, agenda e dashboard — num só lugar, sem complicação.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#showcase"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
            style={{ height: 52, padding: "0 28px", fontSize: 16 }}
          >
            Ver na prática →
          </a>
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 52,
              padding: "0 28px",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid var(--border-default)",
              background: "transparent",
              color: "var(--text-body)",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  );
}
