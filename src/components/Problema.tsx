"use client";
import { useEffect, useState } from "react";

const NOTES = [
  ["Cadê a planilha\nde junho?",  "#F5A030", "4%",  "8%",  "-7deg"],
  ["Cliente ligou —\nanotei no papel", "#5B8EF5","60%","2%","5deg"],
  ["Qual era o\ntotal mesmo?",    "#E2698F", "74%", "46%", "-4deg"],
  ["Manda no zap\ndepois",        "#3DAA7E", "6%",  "54%", "6deg"],
  ["Tá na cabeça\ndo João",       "#A07BF5", "40%", "64%", "-6deg"],
] as const;

export default function Problema() {
  const [isMob, setIsMob] = useState(false);
  useEffect(() => {
    const check = () => setIsMob(window.innerWidth <= 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--surface-page)",
        padding: "clamp(80px,13vw,132px) 0",
      }}
    >
      <div style={{ maxWidth:"var(--container)", margin:"0 auto", padding:"0 var(--gutter)", textAlign:"center" }}>
        <span className="section-label">POR QUE ISSO IMPORTA</span>
        <h2 className="font-display" style={{ fontWeight:700, fontSize:"var(--display-sm)", letterSpacing:"-0.03em", lineHeight:1.1, color:"var(--text-heading)", maxWidth:"18ch", margin:"14px auto 0" }}>
          Planilha, WhatsApp e caderninho não escalam.
        </h2>

        {/* Chaos map */}
        {isMob ? (
          <div style={{ maxWidth:480, margin:"clamp(32px,7vw,48px) auto 0" }}>
            <div className="font-mono" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"9px 15px", marginBottom:16, background:"var(--surface-card)", border:"1px solid var(--border-subtle)", borderRadius:99, boxShadow:"var(--shadow-sm)", fontSize:12, color:"var(--text-muted)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#25D366" }} />
              WhatsApp, planilha, papel…
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {NOTES.map((n,i) => (
                <div key={i} style={{ transform:`rotate(${n[4]})`, padding:"14px 14px 16px", background:"var(--surface-card)", borderRadius:10, borderTop:`3px solid ${n[1]}`, boxShadow:"var(--shadow-md)", fontFamily:"var(--font-geist-sans)", fontSize:13, fontWeight:500, lineHeight:1.4, color:"var(--text-heading)", whiteSpace:"pre-line", animation:`cerneFloat ${4+i*0.4}s ease-in-out ${i*0.3}s infinite` }}>
                  {n[0]}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ position:"relative", height:"clamp(340px,46vw,420px)", maxWidth:880, margin:"clamp(36px,6vw,56px) auto 0" }}>
            <svg aria-hidden viewBox="0 0 880 420" style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }}>
              {["M210 130 C 320 90, 380 200, 470 160","M620 140 C 540 210, 470 180, 430 250","M250 300 C 360 320, 400 250, 500 290","M640 300 C 600 250, 560 320, 470 320"].map((d,i) => (
                <path key={i} d={d} fill="none" stroke="var(--text-faint)" strokeWidth={1.5} strokeDasharray="5 6" strokeLinecap="round" />
              ))}
            </svg>
            {NOTES.map((n,i) => (
              <div key={i} style={{ position:"absolute", left:n[2], top:n[3], transform:`rotate(${n[4]})`, width:132, padding:"14px 14px 16px", background:"var(--surface-card)", borderRadius:10, borderTop:`3px solid ${n[1]}`, boxShadow:"var(--shadow-md)", fontFamily:"var(--font-geist-sans)", fontSize:13, fontWeight:500, lineHeight:1.4, color:"var(--text-heading)", whiteSpace:"pre-line", animation:`cerneFloat ${4+i*0.4}s ease-in-out ${i*0.3}s infinite` }}>
                {n[0]}
              </div>
            ))}
            <div className="font-mono" style={{ position:"absolute", left:"42%", top:"34%", transform:"translate(-50%,-50%) rotate(-3deg)", display:"inline-flex", alignItems:"center", gap:8, padding:"9px 15px", background:"var(--surface-card)", border:"1px solid var(--border-subtle)", borderRadius:99, boxShadow:"var(--shadow-sm)", fontSize:12, color:"var(--text-muted)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#25D366" }} />
              WhatsApp
            </div>
          </div>
        )}

        <p className="font-display" style={{ fontWeight:600, fontSize:"var(--text-2xl)", letterSpacing:"-0.02em", color:"var(--text-heading)", margin:"clamp(28px,5vw,44px) auto 0" }}>
          Existe jeito melhor.
        </p>
        <a href="#showcase" onClick={(e) => { e.preventDefault(); document.getElementById("showcase")?.scrollIntoView({ behavior:"smooth" }); }} className="btn-primary" style={{ marginTop: 24 }}>
          Ver como funciona →
        </a>
      </div>
    </section>
  );
}
