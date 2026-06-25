"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import SystemCRM from "./systems/SystemCRM";
import SystemFinance from "./systems/SystemFinance";
import SystemCalendar from "./systems/SystemCalendar";
import SystemDashboard from "./systems/SystemDashboard";

const SYSTEMS = [
  { name: "CRM · Cliente360",   tag: "Cada cliente, do primeiro contato ao fechamento — num funil que sua equipe entende.", accent: "#3DAA7E" },
  { name: "Financeiro",          tag: "Receitas, despesas e saldo, atualizados em tempo real — sem planilha paralela.", accent: "#5B8EF5" },
  { name: "Agenda · AgendaPro",  tag: "A semana inteira da sua equipe num olhar — sem choque de horário.", accent: "#A07BF5" },
  { name: "Dashboard",           tag: "Os números do negócio reunidos num só painel, prontos para decidir.", accent: "#F5A030" },
];

function tf(offset: number, isMobile: boolean): React.CSSProperties {
  if (isMobile) {
    if (offset === 0) return { position:"relative", width:"100%", opacity:1, transform:"none", zIndex:2, transition:"opacity 300ms var(--ease-out)" };
    return { position:"absolute", top:0, left:0, width:"100%", opacity:0, pointerEvents:"none", zIndex:1, transition:"opacity 300ms var(--ease-out)" };
  }
  const a = Math.abs(offset);
  const sign = Math.sign(offset);
  let tx=0, sc=1, ry=0, op=1, z=40, br=1, blur=0;
  if      (a===0) { tx=0;       sc=1;    ry=0;          op=1;    z=40; br=1;    blur=0; }
  else if (a===1) { tx=sign*60; sc=0.7;  ry=-sign*28;   op=0.52; z=30; br=0.44; blur=0.7; }
  else if (a===2) { tx=sign*100;sc=0.52; ry=-sign*32;   op=0.26; z=20; br=0.3;  blur=1.5; }
  else            { tx=sign*126;sc=0.45; ry=-sign*34;   op=0.1;  z=10; br=0.24; blur=2.2; }
  return {
    position:"absolute", top:"50%", left:"50%",
    width:"min(780px, 92vw)",
    transform:`translate(-50%,-50%) translateX(${tx}%) scale(${sc}) rotateY(${ry}deg)`,
    opacity:op, zIndex:z, filter:`brightness(${br}) blur(${blur}px)`,
    transformStyle:"preserve-3d",
    transition:"transform 620ms var(--ease-out), opacity 620ms var(--ease-out), filter 620ms var(--ease-out)",
    cursor: a===0 ? "default" : "pointer",
    pointerEvents: a > 2 ? "none" : "auto",
  };
}

export default function SistemaShowcase() {
  const [active, setActive]   = useState(0);
  const [isMob, setIsMob]     = useState(false);
  const pausedRef             = useRef(false);
  const resumeRef             = useRef<ReturnType<typeof setTimeout>>();
  const txRef                 = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMob(window.innerWidth <= 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => { pausedRef.current = false; }, 6000);
  }, []);

  const goTo = useCallback((i: number) => {
    pause();
    setActive(Math.max(0, Math.min(SYSTEMS.length-1, i)));
  }, [pause]);

  // Auto-cycle every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) setActive(a => (a+1) % SYSTEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) {
    txRef.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (txRef.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - txRef.current;
    txRef.current = null;
    if (Math.abs(dx) > 45) goTo(active + (dx < 0 ? 1 : -1));
  }

  const dotStyle = (on: boolean): React.CSSProperties => ({
    width: on ? 26 : 9, height: 9, borderRadius: 99, border: "none", padding: 0, cursor: "pointer",
    background: on ? "var(--accent)" : "var(--border-default)",
    transition: "width 280ms var(--ease-out), background-color 280ms var(--ease-out)",
  });

  return (
    <section
      id="showcase"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#141210",
        padding: "clamp(72px,12vw,132px) 0 clamp(56px,9vw,96px)",
      }}
    >
      {/* Grid bg */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage: "radial-gradient(110% 70% at 50% 18%, black 18%, transparent 70%)",
          maskImage: "radial-gradient(110% 70% at 50% 18%, black 18%, transparent 70%)",
        }}
      />
      <div aria-hidden style={{ position:"absolute", top:"4%", left:"50%", transform:"translateX(-50%)", width:720, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(61,170,126,0.10) 0%, transparent 65%)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ position:"relative", maxWidth:"var(--container)", margin:"0 auto", padding:"0 var(--gutter)", textAlign:"center", marginBottom:"clamp(32px,5vw,56px)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              borderRadius: "var(--radius-pill)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.025em",
              background: "color-mix(in srgb, var(--mint) 10%, transparent)",
              color: "var(--mint)",
              border: "1px solid color-mix(in srgb, var(--mint) 20%, transparent)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--mint)",
                animation: "cernePulse 1.8s var(--ease-out) infinite",
              }}
            />
            Demo interativa — explore à vontade
          </div>
        </div>
        <span className="font-sans" style={{ fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", color:"#3DAA7E" }}>NA PRÁTICA</span>
        <h2 className="font-display" style={{ fontWeight:700, fontSize:"var(--display-sm)", letterSpacing:"-0.03em", lineHeight:1.1, color:"#F3F1ED", maxWidth:"16ch", margin:"14px auto 0" }}>
          O sistema que você vai usar, de verdade.
        </h2>
      </div>

      {/* 3D stage */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={
          isMob
            ? { position:"relative", width:"100%", maxWidth:"100vw", padding:"0 16px", marginBottom:24, overflow:"hidden" }
            : { position:"relative", height:"clamp(370px,50vw,540px)", perspective:"2100px", marginBottom:40 }
        }
      >
        {[<SystemCRM key="crm" mobile={isMob} />, <SystemFinance key="fin" mobile={isMob} />, <SystemCalendar key="cal" mobile={isMob} />, <SystemDashboard key="dash" mobile={isMob} />].map((child, i) => (
          <div key={i} onClick={i !== active ? () => goTo(i) : undefined} style={tf(i - active, isMob)}>
            {child}
          </div>
        ))}
      </div>

      {/* Caption + controls */}
      <div style={{ position:"relative", maxWidth:"var(--container)", margin:"0 auto", padding:"0 var(--gutter)", display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>
        <div style={{ textAlign:"center", minHeight:56 }}>
          <div className="font-display" style={{ fontWeight:600, fontSize:20, letterSpacing:"-0.02em", color:"#F3F1ED" }}>{SYSTEMS[active].name}</div>
          <div className="font-sans" style={{ fontSize:14.5, color:"#A8A095", marginTop:4, maxWidth:440 }}>{SYSTEMS[active].tag}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={() => goTo(active-1)} aria-label="Anterior" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:42, height:42, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.06)", color:"#F3F1ED", cursor:"pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div style={{ display:"flex", gap:9 }}>
            {SYSTEMS.map((_,i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={SYSTEMS[i].name} style={dotStyle(i===active)} />
            ))}
          </div>
          <button onClick={() => goTo(active+1)} aria-label="Próximo" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:42, height:42, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.06)", color:"#F3F1ED", cursor:"pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
