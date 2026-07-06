"use client";

function goContato(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}

const PILLARS = [
  {
    num: "01",
    title: "Diagnóstico antes de qualquer linha de código",
    body: "Todo projeto começa com uma semana mergulhado no seu negócio — fluxos, gargalos, o que realmente precisa mudar. Quando o dev abre o editor, não tem dúvida sobre o que construir. Sem retrabalho. Sem surpresa na entrega. É isso que reduz o tempo pela metade.",
    wide: true,
    accent: "var(--accent)",
  },
  {
    num: "02",
    title: "Tecnologia com julgamento humano",
    body: "Usamos IA e ferramentas internas para acelerar partes técnicas — geração de código, testes automatizados, revisão. Mas cada decisão passa por um dev sênior que entende o contexto do seu negócio. Velocidade de ferramenta, critério humano.",
    wide: false,
    accent: "var(--accent)",
  },
  {
    num: "03",
    title: "Nada genérico. Nada quebrado.",
    body: "Não adaptamos templates. Não reutilizamos código de outros projetos. Cada sistema nasce do zero para o seu fluxo. Parece mais difícil assim — é o que garante que funciona de verdade e não quebra em 3 meses.",
    wide: false,
    accent: "var(--accent)",
  },
];

export default function Stats() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--paper-deep)",
        padding: "clamp(80px,13vw,132px) 0",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div style={{ position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(40px,7vw,64px)", maxWidth: 600 }}>
          <span className="section-label">COMO A CERNE FUNCIONA</span>
          <h2
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: "var(--display-sm)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "var(--text-heading)",
              margin: "14px 0 16px",
            }}
          >
            Você não paga por funcionalidade que não vai usar.
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Não é promessa e não é só IA. É um jeito de trabalhar que construímos ao longo de vários projetos reais — e que garante que o que a gente entrega funciona.
          </p>
        </div>

        {/* Pillars grid */}
        <div
          className="pillars-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(12px,2vw,18px)",
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={i}
              style={{
                gridColumn: p.wide ? "1 / -1" : undefined,
                background: "var(--surface-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 18,
                padding: "clamp(28px,4vw,44px) clamp(24px,3.5vw,40px)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: p.wide ? "row" : "column",
                alignItems: p.wide ? "flex-start" : "flex-start",
                gap: p.wide ? "clamp(32px,6vw,72px)" : 20,
              }}
            >
              {/* Number */}
              <div
                className="font-mono"
                style={{
                  flexShrink: 0,
                  fontSize: p.wide ? "clamp(52px,8vw,80px)" : 36,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "var(--accent)",
                  opacity: 0.18,
                  userSelect: "none",
                  ...(p.wide ? {} : { marginBottom: -8 }),
                }}
              >
                {p.num}
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: p.wide ? "var(--text-2xl)" : "clamp(17px,2vw,20px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: "var(--text-heading)",
                    margin: "0 0 12px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--text-body)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom commitment */}
        <div
          style={{
            marginTop: "clamp(40px,6vw,56px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            textAlign: "center",
          }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-muted)",
              maxWidth: 480,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            A Cerne só aceita projetos que consegue entregar bem.{" "}
            <span style={{ color: "var(--text-heading)", fontWeight: 500 }}>
              Se não for o caso, a gente fala antes.
            </span>
          </p>
          <a href="#contato" onClick={goContato} className="btn-primary">
            Falar com a equipe →
          </a>
        </div>
      </div>
    </section>
  );
}
