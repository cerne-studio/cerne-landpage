"use client";
import React from "react";

function goContact(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}

const STEPS = [
  {
    n: "01",
    title: "Conversa de diagnóstico",
    body: "30 minutos para entender como o seu negócio funciona hoje — clientes, agenda, financeiro e gargalos.",
  },
  {
    n: "02",
    title: "Sistema montado para você",
    body: "Nossa equipe configura tudo com os dados reais do seu negócio. Você não instala, não configura, não treina sozinho.",
  },
  {
    n: "03",
    title: "Onboarding com a sua equipe",
    body: "Uma sessão ao vivo para apresentar o sistema a quem vai usar. Ninguém fica perdido no primeiro dia.",
  },
  {
    n: "04",
    title: "Suporte e evolução contínua",
    body: "O sistema cresce com o negócio. Se precisar de ajuste, você fala com uma pessoa — não abre ticket.",
  },
] as const;

export default function Processo() {
  return (
    <section
      id="processo"
      style={{
        position: "relative",
        background: "var(--surface-band)",
        padding: "clamp(80px,13vw,132px) 0",
      }}
    >
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,64px)" }}>
          <span className="section-label">COMO FUNCIONA</span>
          <h2
            className="font-display"
            style={{ fontWeight: 700, fontSize: "var(--display-sm)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-heading)", maxWidth: "18ch", margin: "14px auto 0" }}
          >
            De zero ao ar em menos de uma semana.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(16px,3vw,28px)",
          }}
        >
          {STEPS.map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 22,
                    right: "-14px",
                    width: "28px",
                    height: 2,
                    background: "var(--border-default)",
                    zIndex: 1,
                  }}
                  className="connector"
                />
              )}
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 16,
                  padding: "clamp(20px,3.5vw,28px)",
                  boxShadow: "var(--shadow-sm)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "var(--accent)",
                    marginBottom: 16,
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3
                  className="font-display"
                  style={{ fontWeight: 700, fontSize: "var(--text-xl)", letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-heading)", marginBottom: 10 }}
                >
                  {s.title}
                </h3>
                <p className="font-sans" style={{ fontSize: "var(--text-base)", lineHeight: 1.65, color: "var(--text-body)", margin: 0 }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "clamp(40px,6vw,56px)" }}>
          <a href="#contato" onClick={goContact} className="btn-primary">
            Começar agora
          </a>
        </div>
      </div>
    </section>
  );
}
