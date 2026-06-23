"use client";
import React from "react";

function goContact(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}

const STATS = [
  { n: "8",   unit: "semanas", label: "do levantamento ao sistema no ar" },
  { n: "100", unit: "%",       label: "sob medida para o processo real" },
  { n: "7",   unit: "camadas", label: "de qualidade em cada entrega" },
] as const;

export default function Stats() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--surface-page)",
        padding: "clamp(80px,13vw,132px) 0",
      }}
    >
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,64px)" }}>
          <span className="section-label">RESULTADOS</span>
          <h2
            className="font-display"
            style={{ fontWeight: 700, fontSize: "var(--display-sm)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-heading)", maxWidth: "20ch", margin: "14px auto 0" }}
          >
            Números de quem já está usando.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(16px,3vw,28px)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 20,
                padding: "clamp(24px,4vw,36px) clamp(20px,3vw,28px)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span
                    className="font-display tnum"
                    style={{
                      fontWeight: 800,
                      fontSize: "clamp(60px,10vw,84px)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "var(--accent)",
                    }}
                  >
                    {s.n}
                  </span>
                  {s.unit === "%" && (
                    <span
                      className="font-display"
                      style={{ fontWeight: 700, fontSize: "clamp(28px,5vw,42px)", letterSpacing: "-0.03em", color: "var(--accent)", opacity: 0.7 }}
                    >
                      %
                    </span>
                  )}
                </div>
                {s.unit !== "%" && (
                  <span
                    className="font-mono"
                    style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.75 }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <p className="font-sans" style={{ fontSize: "var(--text-base)", lineHeight: 1.6, color: "var(--text-body)", margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "clamp(40px,6vw,56px)" }}>
          <p className="font-sans" style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
            Baseado em dados reais dos primeiros clientes cerne.
          </p>
          <a href="#contato" onClick={goContact} className="btn-outline">
            Quero esses resultados
          </a>
        </div>
      </div>
    </section>
  );
}
