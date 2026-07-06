"use client";
import { useState } from "react";
import MonitorFrame from "../MonitorFrame";

const A = "#5B8EF5";

function tint(hex: string) {
  const c = hex.replace("#","");
  const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
  return `rgba(${r},${g},${b},0.12)`;
}

function NavBar({ items, mobile }: { items: Array<{label:string;active:boolean;onClick?:()=>void}>; mobile: boolean }) {
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
        <span className="font-display" style={{ fontWeight:700, fontSize:13, letterSpacing:"-0.02em", color:"#1A1917" }}>Financeiro</span>
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

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul"];
const fmtK = (v: number) => "R$ " + v.toFixed(1).replace(".",",") + "k";

export default function SystemFinance({ mobile }: { mobile: boolean }) {
  const [view, setView] = useState(0);

  const kpis = [
    ["Receita", 84.2, "+12%", A],
    ["Despesas", 51.8, "-4%", "#6B6760"],
    ["Saldo", 32.4, "+27%", "#3DAA7E"],
  ] as const;

  // view 0 — overview
  const overview = (
    <div key="o" style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"16px 16px 10px", animation:"cerneFadeIn 180ms ease" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <span className="font-sans" style={{ fontSize:13, fontWeight:600, color:"#1A1917" }}>Receita vs. despesas</span>
        <div style={{ display:"flex", gap:12 }}>
          {[["Receita", A], ["Despesas","#C9B79B"]].map(([l,c],i) => (
            <span key={i} className="font-sans" style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:10.5, color:"#6B6760" }}>
              <span style={{ width:8, height:8, borderRadius:2, background:c }} />{l}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 320 110" style={{ width:"100%", height:138, overflow:"visible" }}>
        {[30,60,90].map((y,i) => <line key={i} x1={0} y1={y} x2={320} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />)}
        <path d="M0 78 L53 64 L106 70 L160 48 L213 54 L266 32 L320 24 L320 110 L0 110 Z" fill={`rgba(91,142,245,0.14)`} style={{ opacity:0, animation:"cerneFadeIn 0.9s ease 0.5s forwards" }} />
        <path d="M0 92 L53 88 L106 84 L160 86 L213 78 L266 80 L320 72" fill="none" stroke="#C9B79B" strokeWidth={2} strokeDasharray="4 4" strokeLinecap="round" style={{ opacity:0, animation:"cerneFadeIn 0.7s ease 0.7s forwards" }} />
        <path d="M0 78 L53 64 L106 70 L160 48 L213 54 L266 32 L320 24" fill="none" stroke={A} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray:1, animation:"cerneDrawLine 1.4s var(--ease-out) forwards" }} />
      </svg>
      <div className="font-mono" style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#A89F92", marginTop:6 }}>
        {MONTHS.map((m,i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );

  // view 1 — receitas
  const recSrc = [["Serviços",48],["Produtos",26],["Recorrência",18],["Outros",8]] as const;
  const receitas = (
    <div key="r" style={{ display:"flex", flexDirection:"column", gap:12, animation:"cerneFadeIn 180ms ease" }}>
      <div style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"16px 16px 10px" }}>
        <div className="font-sans" style={{ fontSize:13, fontWeight:600, color:"#1A1917", marginBottom:12 }}>Entradas por mês</div>
        <svg viewBox="0 0 320 110" style={{ width:"100%", height:120, overflow:"visible" }}>
          {[30,60,90].map((y,i) => <line key={i} x1={0} y1={y} x2={320} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />)}
          <path d="M0 84 L53 72 L106 76 L160 52 L213 44 L266 30 L320 18 L320 110 L0 110 Z" fill="rgba(61,170,126,0.13)" style={{ opacity:0, animation:"cerneFadeIn 0.8s ease 0.5s forwards" }} />
          <path d="M0 84 L53 72 L106 76 L160 52 L213 44 L266 30 L320 18" fill="none" stroke="#3DAA7E" strokeWidth={2.4} strokeLinecap="round" pathLength={1} style={{ strokeDasharray:1, animation:"cerneDrawLine 1.4s var(--ease-out) forwards" }} />
        </svg>
        <div className="font-mono" style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#A89F92", marginTop:6 }}>
          {MONTHS.map((m,i) => <span key={i}>{m}</span>)}
        </div>
      </div>
      <div style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"13px 14px" }}>
        <div className="font-sans" style={{ fontSize:11.5, fontWeight:600, color:"#6B6760", marginBottom:10 }}>Fontes de receita</div>
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {recSrc.map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span className="font-sans" style={{ fontSize:12, color:"#1A1917", width:86, flexShrink:0 }}>{s[0]}</span>
              <div style={{ flex:1, height:7, borderRadius:4, background:"#EEE9E1", overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:4, background:"#3DAA7E", width:s[1]+"%", transformOrigin:"left", animation:`cerneGrowX 0.7s var(--ease-out) ${0.1+i*0.1}s both` }} />
              </div>
              <span className="font-mono tnum" style={{ fontSize:11, fontWeight:600, color:"#3DAA7E", width:30, textAlign:"right" }}>{s[1]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // view 2 — despesas
  const expSrc = [["Folha",42,"#E2698F"],["Fornecedores",28,"#F5A030"],["Aluguel",17,A],["Impostos",13,"#A07BF5"]] as const;
  const despesas = (
    <div key="d" style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"16px 16px 14px", animation:"cerneFadeIn 180ms ease" }}>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:16 }}>
        <span className="font-sans" style={{ fontSize:13, fontWeight:600, color:"#1A1917" }}>Despesas por categoria</span>
        <span className="font-mono tnum" style={{ fontSize:11, fontWeight:600, color:"#6B6760" }}>R$ 51,8k</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
        {expSrc.map((s,i) => (
          <div key={i}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
              <span className="font-sans" style={{ fontSize:12, color:"#1A1917" }}>{s[0]}</span>
              <span className="font-mono tnum" style={{ fontSize:11, fontWeight:600, color:s[2] }}>{s[1]}%</span>
            </div>
            <div style={{ height:9, borderRadius:5, background:"#EEE9E1", overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:5, background:s[2], width:s[1]+"%", transformOrigin:"left", animation:`cerneGrowX 0.7s var(--ease-out) ${0.1+i*0.1}s both` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const navLabels = ["Visão geral","Receitas","Despesas","Fluxo"];
  const items = navLabels.map((label, i) => ({
    label, active: i <= 2 && view === i,
    onClick: i <= 2 ? () => setView(i) : undefined,
  }));

  const main = view === 1 ? receitas : view === 2 ? despesas : overview;

  return (
    <MonitorFrame url="financeiro.cerne.app">
      <div style={ mobile ? { display:"flex", flexDirection:"column", height:400 } : { display:"grid", gridTemplateColumns:"150px 1fr", height:348 }}>
        <NavBar items={items} mobile={mobile} />
        <div style={{ padding: mobile ? 14 : 18, overflowY:"auto", minHeight:0 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
            {kpis.map((k,i) => (
              <div key={i} style={{ border:"1px solid rgba(0,0,0,0.07)", borderRadius:11, padding:"13px 14px" }}>
                <div className="font-sans" style={{ fontSize:11.5, color:"#8A8378", marginBottom:6 }}>{k[0]}</div>
                <div className="font-display tnum" style={{ fontWeight:700, fontSize:19, color:"#1A1917", letterSpacing:"-0.02em", display:"block" }}>{fmtK(k[1])}</div>
                <div className="font-mono" style={{ fontSize:11, fontWeight:600, color:k[3], marginTop:4 }}>{k[2]}</div>
              </div>
            ))}
          </div>
          <div key={view}>{main}</div>
        </div>
      </div>
    </MonitorFrame>
  );
}
