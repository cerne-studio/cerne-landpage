"use client";
import React from "react";

function goContact(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}

const PROFILES = [
  {
    label: "Perfil A",
    headline: "Você gerencia tudo na cabeça — e está cansado disso.",
    body: "Cada cliente, prazo e cobrança depende da sua memória. Quando a equipe cresce, a bagunça cresce junto.",
    solution: "Com o cerne, seu time trabalha com as mesmas informações — em tempo real, sem você precisar repetir nada.",
    accent: "#3DAA7E",
  },
  {
    label: "Perfil B",
    headline: "Você tem planilha, WhatsApp e caderninho — e nada conversa.",
    body: "São três sistemas que ninguém atualiza direito. Você perde histórico de clientes, erra cobrança e paga pra fechar o mês.",
    solution: "O cerne reúne tudo: clientes, finanças e agenda num único lugar que a equipe realmente usa.",
    accent: "#5B8EF5",
  },
  {
    label: "Perfil C",
    headline: "Você já tentou software — e jogou fora depois de 2 semanas.",
    body: "Sistemas genéricos pedem configuração que não acaba, treinamento que nunca fica pronto, e ainda custam caro.",
    solution: "O cerne é montado para o seu negócio antes de você abrir. Você começa usando no primeiro dia.",
    accent: "#F5A030",
  },
] as const;

export default function Profiles() {
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
          <span className="section-label">PARA QUEM É</span>
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "var(--display-sm)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-heading)", maxWidth: "20ch", margin: "14px auto 0" }}>
            Você se vê em algum desses?
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PROFILES.map((p, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 16,
                padding: "clamp(24px,4vw,32px)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-sm)",
                borderTop: `3px solid ${p.accent}`,
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: p.accent, textTransform: "uppercase", marginBottom: 14 }}
              >
                {p.label}
              </span>
              <h3
                className="font-display"
                style={{ fontWeight: 700, fontSize: "var(--text-xl)", letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-heading)", marginBottom: 12 }}
              >
                {p.headline}
              </h3>
              <p className="font-sans" style={{ fontSize: "var(--text-base)", lineHeight: 1.65, color: "var(--text-body)", flex: 1 }}>
                {p.body}
              </p>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 18,
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 3,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: p.accent,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.5L4 7.5L8.5 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="font-sans" style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--text-body)", margin: 0 }}>
                  {p.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "clamp(40px,6vw,56px)" }}>
          <a href="#contato" onClick={goContact} className="btn-primary">
            Quero ver o cerne para o meu negócio
          </a>
        </div>
      </div>
    </section>
  );
}
