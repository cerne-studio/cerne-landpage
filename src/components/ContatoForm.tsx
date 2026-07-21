"use client";
import { useState, useId } from "react";

const SEGMENTS = ["Pet shop","Clínica","Padaria","Contabilidade","Salão","Auto center","Restaurante","Academia","Farmácia","Imobiliária","Escola","Loja","Outro"] as const;
type Segment = typeof SEGMENTS[number];

const PROCESSES = ["CRM / Clientes","Financeiro","Agenda","Dashboard","Tudo junto"] as const;
type Process = typeof PROCESSES[number];

const WHATSAPP_NUMBER = "5511999999999"; // número fictício para teste — trocar pelo número real antes de publicar

export default function ContatoForm() {
  const id = useId();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segment, setSegment] = useState<Segment | "">("");
  const [whatsapp, setWhatsapp] = useState("");
  const [procs, setProcs] = useState<Process[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function toggleProc(p: Process) {
    setProcs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    const message = [
      "Olá! Quero o diagnóstico gratuito da Cerne.",
      "",
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      `Segmento: ${segment}`,
      `WhatsApp: ${whatsapp}`,
      `Necessidade: ${procs.length ? procs.join(", ") : "Não especificado"}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    setStatus("done");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.06)",
    color: "#F3F1ED",
    fontFamily: "var(--font-geist-sans)",
    fontSize: 14.5,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 200ms",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-geist-sans)",
    fontSize: 12,
    fontWeight: 600,
    color: "#A8A095",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 7,
  };

  if (status === "done") {
    return (
      <section
        id="contato"
        style={{ background: "#141210", padding: "clamp(80px,13vw,132px) 0", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden style={{ position:"absolute", top:"10%", left:"50%", transform:"translateX(-50%)", width:600, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(31,107,80,0.12) 0%, transparent 65%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth: 520, margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:80, height:80, borderRadius:"50%", border:"2px solid var(--accent)", marginBottom:28, animation:"cerneBreathe 2s ease-in-out infinite" }}>
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#3DAA7E" strokeWidth="2" fill="none" style={{ animation:"cerneCheckRing 0.6s var(--ease-out) forwards" }} />
              <path d="M13 24.5L20.5 32L35 17" stroke="#3DAA7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ animation:"cerneCheckMark 0.4s var(--ease-out) 0.35s both" }} />
            </svg>
          </div>
          <h2 className="font-display" style={{ fontWeight:700, fontSize:"var(--display-sm)", letterSpacing:"-0.03em", color:"#F3F1ED", marginBottom:14 }}>
            Quase lá!
          </h2>
          <p className="font-sans" style={{ fontSize:16, lineHeight:1.65, color:"#A8A095" }}>
            Abrimos o WhatsApp com sua mensagem pronta. É só enviar para a gente começar a conversa.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contato"
      style={{ background: "#141210", padding: "clamp(80px,13vw,132px) 0", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden style={{ position:"absolute", top:"10%", left:"50%", transform:"translateX(-50%)", width:700, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(31,107,80,0.10) 0%, transparent 65%)", pointerEvents:"none" }} />

      <div style={{ position:"relative", maxWidth:"var(--container)", margin:"0 auto", padding:"0 var(--gutter)" }}>
        <div style={{ textAlign:"center", marginBottom:"clamp(40px,6vw,56px)" }}>
          <span className="font-sans" style={{ fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", color:"#3DAA7E" }}>CONTATO</span>
          <h2 className="font-display" style={{ fontWeight:700, fontSize:"var(--display-sm)", letterSpacing:"-0.03em", lineHeight:1.1, color:"#F3F1ED", maxWidth:"18ch", margin:"14px auto 0" }}>
            Vamos montar o sistema para o seu negócio.
          </h2>
          <p className="font-sans" style={{ fontSize:16, color:"#A8A095", marginTop:14, maxWidth:460, margin:"14px auto 0" }}>
            Preencha abaixo e nossa equipe entra em contato em até uma hora.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth:560, margin:"0 auto", display:"flex", flexDirection:"column", gap:20 }}>
          <div>
            <label htmlFor={`${id}-nome`} style={labelStyle}>Nome</label>
            <input
              id={`${id}-nome`}
              type="text"
              required
              placeholder="Seu nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="cerne-input"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor={`${id}-empresa`} style={labelStyle}>Empresa</label>
            <input
              id={`${id}-empresa`}
              type="text"
              required
              placeholder="Nome do negócio"
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              className="cerne-input"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor={`${id}-segmento`} style={labelStyle}>Segmento</label>
            <select
              id={`${id}-segmento`}
              required
              value={segment}
              onChange={e => setSegment(e.target.value as Segment)}
              className="cerne-input"
              style={{ ...inputStyle, appearance: "none", cursor:"pointer", color: segment ? "#F3F1ED" : "#6B6760" }}
            >
              <option value="" disabled style={{ color:"#6B6760", background:"#141210" }}>Selecione o segmento</option>
              {SEGMENTS.map(s => (
                <option key={s} value={s} style={{ background:"#1E1C19", color:"#F3F1ED" }}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${id}-whatsapp`} style={labelStyle}>WhatsApp</label>
            <input
              id={`${id}-whatsapp`}
              type="tel"
              required
              placeholder="(00) 00000-0000"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              className="cerne-input"
              style={inputStyle}
            />
          </div>

          <div>
            <span style={labelStyle}>O que você precisa?</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:2 }}>
              {PROCESSES.map(p => {
                const on = procs.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleProc(p)}
                    style={{
                      padding:"8px 14px",
                      borderRadius:99,
                      border: `1px solid ${on ? "var(--accent)" : "rgba(255,255,255,0.12)"}`,
                      background: on ? "rgba(31,107,80,0.18)" : "rgba(255,255,255,0.04)",
                      color: on ? "#3DAA7E" : "#A8A095",
                      fontFamily:"var(--font-geist-sans)",
                      fontSize:13,
                      fontWeight: on ? 600 : 500,
                      cursor:"pointer",
                      transition:"background-color 180ms var(--ease-out), border-color 180ms var(--ease-out), color 180ms var(--ease-out)",
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary"
            style={{
              marginTop:8,
              width:"100%",
              cursor: status === "sending" ? "wait" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sending" ? "Enviando…" : "Quero o meu diagnóstico gratuito"}
          </button>

          <p className="font-sans" style={{ fontSize:12, color:"#6B6760", textAlign:"center", margin:0 }}>
            Sem compromisso. Sem cartão. Só uma conversa.
          </p>
          <p className="font-sans" style={{ fontSize:11.5, color:"#6B6760", textAlign:"center", margin:0, lineHeight:1.5 }}>
            Ao enviar, você concorda com o uso dos seus dados para esse contato, conforme nossa{" "}
            <a href={`${basePath}/privacidade`} style={{ color:"#A8A095", textDecoration:"underline" }}>Política de Privacidade</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
