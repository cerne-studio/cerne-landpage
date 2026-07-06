"use client";
import { useState, useRef } from "react";
import MonitorFrame from "../MonitorFrame";

const A = "#3DAA7E";
const ORDER = ["Prospecção", "Proposta", "Fechamento"] as const;
type ColKey = (typeof ORDER)[number];

interface Card { id: string; name: string; val: string }
interface Col  { key: ColKey; cards: Card[] }

const INITIAL: Col[] = [
  { key: "Prospecção", cards: [{ id:"c1", name:"Mercado Vila Nova", val:"R$ 4,2k" }, { id:"c2", name:"Auto Center Trevo", val:"R$ 8,9k" }, { id:"c3", name:"Pet Mondo", val:"R$ 2,1k" }] },
  { key: "Proposta",   cards: [{ id:"c4", name:"Studio Marave", val:"R$ 12k" }, { id:"c5", name:"Salão Lumière", val:"R$ 3,8k" }] },
  { key: "Fechamento", cards: [{ id:"c6", name:"Padaria S. Jorge", val:"R$ 6,5k" }, { id:"c7", name:"Oficina Tovar", val:"R$ 18k" }] },
];

function tint(hex: string) {
  const c = hex.replace("#","");
  const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
  return `rgba(${r},${g},${b},0.12)`;
}

interface NavItem { label: string; active: boolean; onClick?: () => void }
function NavBar({ brand, accent, items, mobile }: { brand: string; accent: string; items: NavItem[]; mobile: boolean }) {
  if (mobile) {
    return (
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 12px", borderBottom:"1px solid rgba(0,0,0,0.06)", background:"#FAFAF9", overflowX:"auto" }}>
        <span style={{ width:14, height:14, borderRadius:4, background:accent, flexShrink:0 }} />
        {items.map((it,i) => (
          <button key={i} onClick={it.onClick} style={{ flexShrink:0, display:"inline-flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, border:"none", whiteSpace:"nowrap", background: it.active ? tint(accent) : "transparent", color: it.active ? accent : "#8A8378", fontFamily:"var(--font-geist-sans)", fontSize:12.5, fontWeight: it.active ? 600 : 500, cursor: it.onClick ? "pointer" : "default" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background: it.active ? accent : "#CFC9BF", flexShrink:0 }} />
            {it.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div style={{ borderRight:"1px solid rgba(0,0,0,0.06)", background:"#FAFAF9", padding:"14px 11px", display:"flex", flexDirection:"column", gap:3, minWidth:150 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 8px 12px" }}>
        <span style={{ width:16, height:16, borderRadius:5, background:accent, flexShrink:0 }} />
        <span className="font-display" style={{ fontWeight:700, fontSize:13, letterSpacing:"-0.02em", color:"#1A1917" }}>{brand}</span>
      </div>
      {items.map((it,i) => (
        <div key={i} onClick={it.onClick} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:7, background: it.active ? tint(accent) : "transparent", color: it.active ? accent : "#8A8378", fontFamily:"var(--font-geist-sans)", fontSize:12.5, fontWeight: it.active ? 600 : 500, cursor: it.onClick ? "pointer" : "default" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background: it.active ? accent : "#CFC9BF" }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}

export default function SystemCRM({ mobile }: { mobile: boolean }) {
  const [cols, setCols]     = useState<Col[]>(INITIAL);
  const [drag, setDrag]     = useState<{ id: string; from: ColKey } | null>(null);
  const [over, setOver]     = useState<ColKey | null>(null);
  const [colView, setColView] = useState(0);
  const scRef = useRef<HTMLDivElement>(null);

  function moveTo(id: string, toKey: ColKey) {
    setCols(prev => {
      let moved: Card | null = null;
      const stripped = prev.map(c => ({ ...c, cards: c.cards.filter(x => { if (x.id === id) { moved = x; return false; } return true; }) }));
      if (!moved) return prev;
      return stripped.map(c => c.key === toKey ? { ...c, cards: [...c.cards, moved!] } : c);
    });
  }

  function advance(id: string, fromKey: ColKey) {
    const i = ORDER.indexOf(fromKey);
    if (i < ORDER.length - 1) moveTo(id, ORDER[i+1]);
  }

  function scrollToCol(i: number) {
    if (scRef.current) scRef.current.scrollTo({ left: i * scRef.current.clientWidth * 0.86, behavior:"smooth" });
  }

  const chevR = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
  const check = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );

  const items: NavItem[] = [
    { label:"Painel", active:false }, { label:"Clientes", active:false },
    { label:"Negócios", active:true }, { label:"Tarefas", active:false },
  ];

  return (
    <MonitorFrame url="cliente360.cerne.app">
      <div style={ mobile ? { display:"flex", flexDirection:"column", height:400 } : { display:"grid", gridTemplateColumns:"150px 1fr", height:348 }}>
        <NavBar brand="Cliente360" accent={A} items={items} mobile={mobile} />
        <div style={{ padding: mobile ? 14 : 18, overflowY:"auto", minHeight:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <span className="font-display" style={{ fontWeight:600, fontSize:16, color:"#1A1917" }}>Negócios</span>
            <span className="font-sans" style={{ fontSize:12.5, fontWeight:600, color:"#fff", background:A, padding:"6px 13px", borderRadius:8, cursor:"pointer" }}>+ Novo</span>
          </div>
          <div className="font-sans" style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14, fontSize:11.5, color:"#9A938A" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={mobile ? "M5 12h14M13 6l6 6-6 6" : "M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"} />
            </svg>
            {mobile ? "Toque na seta para avançar" : "Arraste os cards entre as colunas"}
          </div>

          {/* Columns */}
          {mobile ? (
            <div ref={scRef} onScroll={(e) => { const el = e.currentTarget; const i = Math.round(el.scrollLeft / (el.clientWidth * 0.86)); setColView(Math.max(0, Math.min(ORDER.length-1, i))); }} style={{ display:"flex", gap:10, overflowX:"auto", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", paddingBottom:2 }}>
              {cols.map(col => (
                <div key={col.key} style={{ flex:"0 0 84%", scrollSnapAlign:"center", borderRadius:11, padding:8, background:"#FAFAF9", border:"1px solid rgba(0,0,0,0.05)" }}>
                  <ColHeader col={col} accent={A} />
                  <div style={{ display:"flex", flexDirection:"column", gap:9, minHeight:96 }}>
                    {col.cards.map((cd,k) => <CardEl key={cd.id} col={col} cd={cd} k={k} mobile={true} drag={null} advance={advance} A={A} tint={tint} chevR={chevR} check={check} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, alignItems:"start" }}>
              {cols.map(col => (
                <div key={col.key}
                  onDragOver={(e) => { e.preventDefault(); if (over !== col.key) setOver(col.key); }}
                  onDragLeave={() => { if (over === col.key) setOver(null); }}
                  onDrop={(e) => { e.preventDefault(); if (drag) { moveTo(drag.id, col.key); setDrag(null); setOver(null); } }}
                  style={{ borderRadius:11, padding:6, background: over === col.key ? tint(A) : "transparent", outline: over === col.key ? `1.5px dashed ${A}` : "1.5px dashed transparent", transition:"background-color 150ms ease" }}
                >
                  <ColHeader col={col} accent={A} />
                  <div style={{ display:"flex", flexDirection:"column", gap:9, minHeight:96 }}>
                    {col.cards.map((cd,k) => <CardEl key={cd.id} col={col} cd={cd} k={k} mobile={false} drag={drag} onDragStart={(id,from) => setDrag({id,from})} onDragEnd={() => { setDrag(null); setOver(null); }} advance={advance} A={A} tint={tint} chevR={chevR} check={check} />)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {mobile && (
            <div style={{ display:"flex", justifyContent:"center", gap:7, marginTop:12 }}>
              {ORDER.map((k,i) => (
                <button key={i} onClick={() => scrollToCol(i)} style={{ width: i===colView ? 22 : 7, height:7, borderRadius:99, border:"none", padding:0, cursor:"pointer", background: i===colView ? A : "#D8D3CA", transition:"width 240ms var(--ease-out), background-color 240ms var(--ease-out)" }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MonitorFrame>
  );
}

function ColHeader({ col, accent }: { col: Col; accent: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, padding:"0 4px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:accent }} />
        <span className="font-sans" style={{ fontSize:11, fontWeight:600, color:"#6B6760", textTransform:"uppercase", letterSpacing:"0.04em" }}>{col.key}</span>
      </div>
      <span className="font-mono" style={{ fontSize:10, color:"#B6AEA2" }}>{col.cards.length}</span>
    </div>
  );
}

interface CardProps {
  col: Col; cd: Card; k: number; mobile: boolean;
  drag: { id: string; from: ColKey } | null;
  advance: (id: string, from: ColKey) => void;
  A: string; tint: (h: string) => string;
  chevR: React.ReactNode; check: React.ReactNode;
  onDragStart?: (id: string, from: ColKey) => void;
  onDragEnd?: () => void;
}

function CardEl({ col, cd, k, mobile, drag, advance, A, tint, chevR, check, onDragStart, onDragEnd }: CardProps) {
  const isDragged = drag?.id === cd.id;
  const hasNext = ORDER.indexOf(col.key) < ORDER.length - 1;
  return (
    <div
      draggable={!mobile}
      onDragStart={mobile ? undefined : () => onDragStart?.(cd.id, col.key)}
      onDragEnd={mobile ? undefined : onDragEnd}
      style={{ border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:"11px 12px", background:"#fff", cursor: mobile ? "default" : "grab", opacity: isDragged ? 0.4 : 1, animation: isDragged ? "none" : `cerneBreathe 3.6s ease ${k * 0.6}s infinite` }}
    >
      <div className="font-sans" style={{ fontSize:12.5, fontWeight:600, color:"#1A1917", marginBottom:8, lineHeight:1.25 }}>{cd.name}</div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span className="font-mono" style={{ fontSize:11, fontWeight:600, color:A }}>{cd.val}</span>
        {hasNext ? (
          <button onClick={(e) => { e.stopPropagation(); advance(cd.id, col.key); }} style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:24, height:24, borderRadius:"50%", border:"none", background:A, color:"#fff", cursor:"pointer", padding:0 }}>{chevR}</button>
        ) : (
          <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:24, height:24, borderRadius:"50%", background:tint(A), color:A }}>{check}</span>
        )}
      </div>
    </div>
  );
}
