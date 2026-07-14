"use client";

export default function Footer() {
  const year = 2026;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <footer
      style={{
        background: "#141210",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "clamp(40px,6vw,60px) 0 clamp(28px,4vw,40px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "0 var(--gutter)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 32,
        }}
      >
        {/* Brand */}
        <div style={{ minWidth: 180 }}>
          <div className="font-display" style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.03em", color: "#F3F1ED", marginBottom: 8 }}>
            cerne
          </div>
          <p className="font-sans" style={{ fontSize: 13.5, lineHeight: 1.6, color: "#6B6760", maxWidth: 220, margin: 0 }}>
            Sistema sob medida pro seu jeito de trabalhar.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,5vw,64px)" }}>
          <div>
            <div className="font-sans" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#A8A095", marginBottom: 14 }}>
              Produto
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["#showcase", "Sistemas"], ["#contato", "Diagnóstico gratuito"]].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans"
                  style={{ fontSize: 13.5, color: "#6B6760", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F3F1ED")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B6760")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-sans" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#A8A095", marginBottom: 14 }}>
              Empresa
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["#", "Sobre"], ["#", "Blog"]].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans"
                  style={{ fontSize: 13.5, color: "#6B6760", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F3F1ED")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B6760")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-sans" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#A8A095", marginBottom: 14 }}>
              Legal
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[[`${basePath}/privacidade`, "Privacidade"], ["#", "Termos"]].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans"
                  style={{ fontSize: 13.5, color: "#6B6760", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F3F1ED")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B6760")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "var(--container)",
          margin: "clamp(32px,4vw,44px) auto 0",
          padding: "clamp(16px,3vw,20px) var(--gutter) 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span className="font-sans" style={{ fontSize: 12.5, color: "#4A4540" }}>
          © {year} cerne sistemas
        </span>
        <span className="font-sans" style={{ fontSize: 12.5, color: "#4A4540" }}>
          Construído linha a linha. No Brasil.
        </span>
      </div>

      <div
        style={{
          maxWidth: "var(--container)",
          margin: "clamp(16px,2vw,20px) auto 0",
          padding: "0 var(--gutter)",
          textAlign: "center",
        }}
      >
        <p className="font-sans" style={{ fontSize: 11.5, color: "#4A4540", lineHeight: 1.6, margin: 0 }}>
          MURILO RODRIGUES ABRAO — CNPJ 58.342.758/0001-98<br />
          Rua Reuclydes da Cunha, 138, Apto 52, Gonzaga — Santos/SP, CEP 11.065-100<br />
          (13) 99120-7337
        </p>
      </div>
    </footer>
  );
}
