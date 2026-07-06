"use client";
import { useState, useEffect, useRef } from "react";
import MonitorFrame from "../MonitorFrame";

const A = "#F5A030";

function tint(hex: string) {
  const c = hex.replace("#","");
  const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
  return `rgba(${r},${g},${b},0.12)`;
}

function CountNum({ to, fmt, dur = 1300 }: { to: number; fmt: (v: number) => string; dur?: number }) {
  const [v, setV] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    let start = 0;
    let done = false;
    const finish = () => { if (!done) { done = true; setV(to); } };
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1-p, 3);
      setV(to * e);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else done = true;
    };
    raf.current = requestAnimationFrame(step);
    const safety = setTimeout(finish, dur + 500);
    return () => { cancelAnimationFrame(raf.current); clearTimeout(safety); };
  }, [to, dur]);
  return <span>{fmt(v)}</span>;
}

function NavBar({ view, setView, mobile }: { view: number; setView: (v:number)=>void; mobile: boolean }) {
  const labels = ["Visão geral","Vendas","Equipe","Config"];
  const items = labels.map((label,i) => ({
    label, active: (i===0||i===1) && view===i, onClick: (i===0||i===1) ? ()=>setView(i) : undefined,
  }));
  if (mobile) {
    return (
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 12px", borderBottom:"1px solid rgba(0,0,0,0.06)", background:"#FAFAF9", overflowX:"auto" }}>
        <span style={{ width:14, height:14, borderRadius:4, background:A, flexShrink:0 }} />
        {items.map((it,i) => (
          <button key={i} onClick={it.onClick} style={{ flexShrink:0, display:"inline-flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, border:"none", whiteSpace:"nowrap", background: it.active ? tint(A) : "transparent", color: it.active ? A : "#8A8378", fontFamily:"var(--font-geist-sans)", fontSize:12.5, fontWeight: it.active ? 600 : 500, cursor: it.onClick ? "pointer" : "default" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background: it.active ? A : "#CFC9BF", flexShrink:0 }} />
            {it.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div style={{ borderRight:"1px solid rgba(0,0,0,0.06)", background:"#FAFAF9", padding:"14px 11px", display:"flex", flexDirection:"column", gap:3, minWidth:150 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 8px 12px" }}>
        <span style={{ width:16, height:16, borderRadius:5, background:A }} />
        <span className="font-display" style={{ fontWeight:700, fontSize:13, letterSpacing:"-0.02em", color:"#1A1917" }}>Dashboard</span>
      </div>
      {items.map((it,i) => (
        <div key={i} onClick={it.onClick} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:7, background: it.active ? tint(A) : "transparent", color: it.active ? A : "#8A8378", fontFamily:"var(--font-geist-sans)", fontSize:12.5, fontWeight: it.active ? 600 : 500, cursor: it.onClick ? "pointer" : "default" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background: it.active ? A : "#CFC9BF" }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}

export default function SystemDashboard({ mobile }: { mobile: boolean }) {
  const [view, setView] = useState(0);
  const fmtK = (v: number) => "R$ " + v.toFixed(1).replace(".",",") + "k";

  function card(title: string, inner: React.ReactNode) {
    return (
      <div style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"13px 14px", display:"flex", flexDirection:"column" }}>
        <div className="font-sans" style={{ fontSize:11.5, fontWeight:600, color:"#6B6760", marginBottom:10 }}>{title}</div>
        {inner}
      </div>
    );
  }

  const BARS = [16,22,13,27,19,31];
  const kpiCard = card("Resumo", (
    <div>
      <div style={{ display:"flex", gap:18 }}>
        {[["142","Clientes"],["R$ 84k","Receita"]].map((s,i) => (
          <div key={i}>
            <div className="font-display tnum" style={{ fontWeight:700, fontSize:21, color:"#1A1917", letterSpacing:"-0.02em" }}>{s[0]}</div>
            <div className="font-sans" style={{ fontSize:10.5, color:"#8A8378", marginTop:3 }}>{s[1]}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:38, marginTop:12 }}>
        {BARS.map((b,i) => (
          <div key={i} style={{ width:9, height:b, borderRadius:3, background: i===BARS.length-1 ? A : tint(A), transformOrigin:"bottom", animation:`cerneBarGrow 0.6s var(--ease-out) ${0.15+i*0.08}s both` }} />
        ))}
      </div>
    </div>
  ));

  const SEGS = [["Serviços",A,45,-90],["Comércio","#3DAA7E",30,72],["Saúde","#5B8EF5",25,180]] as const;
  const donutCard = card("Por setor", (
    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
      <svg width="74" height="74" viewBox="0 0 42 42">
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#EEE9E1" strokeWidth="6" />
        {SEGS.map((sg,i) => (
          <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={sg[1]} strokeWidth="6" strokeLinecap="butt" pathLength={100} transform={`rotate(${sg[3]} 21 21)`} style={{ ["--len" as string]: sg[2], strokeDasharray:`${sg[2]} 100`, animation:`cerneArc 0.8s var(--ease-out) ${0.3+i*0.22}s both` }} />
        ))}
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {SEGS.map((sg,i) => (
          <div key={i} className="font-sans" style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, color:"#6B6760" }}>
            <span style={{ width:8, height:8, borderRadius:2, background:sg[1] }} />{sg[0]}
          </div>
        ))}
      </div>
    </div>
  ));

  const tableCard = card("Projetos", (
    <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
      {[["Mercado Vila Nova","Ativo","#3DAA7E"],["Studio Marave","Em dia","#3DAA7E"],["Construtora Pilar","Atenção",A]].map((r,i) => (
        <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span className="font-sans" style={{ fontSize:12, color:"#1A1917" }}>{r[0]}</span>
          <span className="font-sans" style={{ fontSize:10, fontWeight:600, color:r[2], background:tint(r[2]), padding:"3px 8px", borderRadius:99 }}>{r[1]}</span>
        </div>
      ))}
    </div>
  ));

  const feedCard = card("Atividade", (
    <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
      {[["Novo cliente cadastrado","2min"],["Proposta enviada","1h"],["Pagamento recebido","3h"]].map((f,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, flexShrink:0 }} />
          <span className="font-sans" style={{ fontSize:11.5, color:"#1A1917", flex:1 }}>{f[0]}</span>
          <span className="font-mono" style={{ fontSize:9.5, color:"#A89F92" }}>{f[1]}</span>
        </div>
      ))}
    </div>
  ));

  const overview = (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"auto auto", gap:12, minHeight:348 }}>
      {kpiCard}{donutCard}{tableCard}{feedCard}
    </div>
  );

  // Vendas view
  const REV_PTS = [[0,96],[46,88],[91,92],[137,70],[183,74],[229,48],[274,40],[320,22]];
  const lineD = "M" + REV_PTS.map(p => p.join(" ")).join(" L ");
  const revCard = (
    <div style={{ gridColumn:"1 / -1", border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"14px 16px 10px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:12 }}>
        <span className="font-sans" style={{ fontSize:13, fontWeight:600, color:"#1A1917" }}>Receita por mês</span>
        <span className="font-mono" style={{ fontSize:11, fontWeight:600, color:"#3DAA7E" }}>+27%</span>
      </div>
      <svg viewBox="0 0 320 130" style={{ width:"100%", height:168, overflow:"visible" }}>
        {[20,55,90,125].map((y,i) => <line key={i} x1={0} y1={y} x2={320} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />)}
        <path d={lineD + " L 320 130 L 0 130 Z"} fill={`rgba(245,160,48,0.13)`} style={{ opacity:0, animation:"cerneFadeIn 0.9s ease 0.7s forwards" }} />
        <path d={lineD} fill="none" stroke={A} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray:1, animation:"cerneDrawLine 1.5s var(--ease-out) forwards" }} />
        <circle cx="320" cy="22" r="3.6" fill={A} style={{ opacity:0, animation:"cerneFadeIn 0.5s ease 1.5s forwards" }} />
      </svg>
      <div className="font-mono" style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#A89F92", marginTop:6 }}>
        {["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago"].map((m,i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );

  const TOP = [["Oficina Tovar",18],["Studio Marave",12],["Auto Center Trevo",8.9],["Padaria S. Jorge",6.5]] as const;
  const topMax = TOP[0][1];
  const topCard = card("Top clientes", (
    <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
      {TOP.map((t,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span className="font-mono" style={{ fontSize:11, fontWeight:600, color:"#B6AEA2", width:12, flexShrink:0 }}>{i+1}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:5 }}>
              <span className="font-sans" style={{ fontSize:12, color:"#1A1917" }}>{t[0]}</span>
              <span className="font-mono tnum" style={{ fontSize:11, fontWeight:600, color:A }}>{fmtK(t[1])}</span>
            </div>
            <div style={{ height:5, borderRadius:3, background:"#EEE9E1", overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:3, background:A, width:(t[1]/topMax*100)+"%", transformOrigin:"left", animation:`cerneGrowX 0.7s var(--ease-out) ${0.15+i*0.1}s both` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ));

  const statCard = (
    <div style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"13px 14px", display:"flex", flexDirection:"column", justifyContent:"center", gap:4 }}>
      <div className="font-sans" style={{ fontSize:11.5, fontWeight:600, color:"#6B6760" }}>Ticket médio</div>
      <div className="font-display tnum" style={{ fontWeight:700, fontSize:27, color:"#1A1917", letterSpacing:"-0.03em", lineHeight:1.05 }}>
        <CountNum to={6.1} fmt={fmtK} />
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:2 }}>
        <span className="font-mono" style={{ fontSize:11, fontWeight:600, color:"#3DAA7E" }}>+8%</span>
        <span className="font-sans" style={{ fontSize:10.5, color:"#8A8378" }}>vs. mês anterior</span>
      </div>
    </div>
  );

  const vendas = (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"auto auto", gap:12, minHeight:348 }}>
      {revCard}{topCard}{statCard}
    </div>
  );

  return (
    <MonitorFrame url="painel.cerne.app">
      <div style={ mobile ? { display:"flex", flexDirection:"column", height:400 } : { display:"grid", gridTemplateColumns:"150px 1fr", height:348 }}>
        <NavBar view={view} setView={setView} mobile={mobile} />
        <div key={view} style={{ padding: mobile ? 14 : 18, animation:"cerneFadeIn 180ms ease", overflowY:"auto", minHeight:0 }}>
          {view === 0 ? overview : vendas}
        </div>
      </div>
    </MonitorFrame>
  );
}
