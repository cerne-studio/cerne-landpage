"use client";
import { useState } from "react";
import MonitorFrame from "../MonitorFrame";

const A = "#A07BF5";
const DAYS = ["Seg","Ter","Qua","Qui","Sex"];
const TODAY = 2;
const COLORS = ["#A07BF5","#3DAA7E","#5B8EF5","#F5A030","#E2698F"];

// [time, title, colorIdx, isNow, client, duration]
type Block = [string, string, number, boolean, string, string];
const BLOCKS: Block[][] = [
  [["09:00","Corte",0,false,"Marina Alves","30 min"],["14:00","Consulta",1,false,"Rafael Lima","45 min"]],
  [["10:30","Reunião",2,false,"Equipe interna","60 min"]],
  [["08:30","Avaliação",3,false,"Bruno Sato","30 min"],["13:00","Retorno",0,true,"Carla Nunes","20 min"],["16:00","Corte",1,false,"Diego Reis","30 min"]],
  [["11:00","Serviço",4,false,"Studio Marave","90 min"]],
  [["09:30","Consulta",2,false,"Paula Cruz","45 min"],["15:30","Encaixe",3,false,"Tiago Melo","25 min"]],
];

function tint(hex: string) {
  const c = hex.replace("#","");
  const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
  return `rgba(${r},${g},${b},0.12)`;
}

export default function SystemCalendar({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState<string | null>(null);

  const navItems = ["Agenda","Clientes","Serviços","Equipe"].map((l,i) => ({ label:l, active:i===0 }));

  function NavBar() {
    if (mobile) {
      return (
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 12px", borderBottom:"1px solid rgba(0,0,0,0.06)", background:"#FAFAF9", overflowX:"auto" }}>
          <span style={{ width:14, height:14, borderRadius:4, background:A, flexShrink:0 }} />
          {navItems.map((it,i) => (
            <div key={i} style={{ flexShrink:0, display:"inline-flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, whiteSpace:"nowrap", background: it.active ? tint(A) : "transparent", color: it.active ? A : "#8A8378", fontFamily:"var(--font-geist-sans)", fontSize:12.5, fontWeight: it.active ? 600 : 500 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background: it.active ? A : "#CFC9BF", flexShrink:0 }} />
              {it.label}
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={{ borderRight:"1px solid rgba(0,0,0,0.06)", background:"#FAFAF9", padding:"14px 11px", display:"flex", flexDirection:"column", gap:3, minWidth:150 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 8px 12px" }}>
          <span style={{ width:16, height:16, borderRadius:5, background:A }} />
          <span className="font-display" style={{ fontWeight:700, fontSize:13, letterSpacing:"-0.02em", color:"#1A1917" }}>AgendaPro</span>
        </div>
        {navItems.map((it,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:7, background: it.active ? tint(A) : "transparent", color: it.active ? A : "#8A8378", fontFamily:"var(--font-geist-sans)", fontSize:12.5, fontWeight: it.active ? 600 : 500 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background: it.active ? A : "#CFC9BF" }} />
            {it.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <MonitorFrame url="agendapro.cerne.app">
      <div style={ mobile ? { display:"flex", flexDirection:"column", minHeight:300 } : { display:"grid", gridTemplateColumns:"150px 1fr", minHeight:348 }}>
        <NavBar />
        <div style={{ padding: mobile ? 14 : 18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span className="font-display" style={{ fontWeight:600, fontSize:16, color:"#1A1917" }}>Esta semana</span>
            <span className="font-sans" style={{ fontSize:11.5, color:"#8A8378" }}>10 – 14 jun</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
            {DAYS.map((d,di) => (
              <div key={di}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"var(--font-geist-sans)", fontSize:11, fontWeight:600, color: di===TODAY ? A : "#6B6760", paddingBottom:8, borderBottom: di===TODAY ? `1.5px solid ${A}` : "1px solid rgba(0,0,0,0.06)", marginBottom:8 }}>
                  {di===TODAY && <span style={{ width:5, height:5, borderRadius:"50%", background:A }} />}
                  {d}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:7, minHeight:172 }}>
                  {BLOCKS[di].map((b,k) => {
                    const cur = b[3];
                    const id = `${di}-${k}`;
                    const isOpen = open === id;
                    const bc = COLORS[b[2]];
                    const alignRight = di >= 3;
                    const openUp = k === BLOCKS[di].length-1 && k > 0;
                    return (
                      <div
                        key={k + (isOpen ? "_o" : "_c")}
                        onClick={(e) => { e.stopPropagation(); setOpen(isOpen ? null : id); }}
                        style={{ position:"relative", borderRadius:8, padding:"8px 9px", cursor:"pointer", background: isOpen ? bc : tint(bc), borderLeft:`3px solid ${bc}`, boxShadow: isOpen ? "0 6px 16px rgba(0,0,0,0.14)" : "none", animation: cur && !isOpen ? "cerneAgendaPulse 2.2s var(--ease-out) infinite" : "none", zIndex: isOpen ? 20 : 1 }}
                      >
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <span className="font-mono" style={{ fontSize:9.5, color: isOpen ? "#fff" : bc, fontWeight:600 }}>{b[0]}</span>
                          {cur && <span className="font-sans" style={{ fontSize:8, fontWeight:700, color: isOpen ? bc : "#fff", background: isOpen ? "#fff" : A, padding:"1px 6px", borderRadius:99, letterSpacing:"0.05em" }}>AGORA</span>}
                        </div>
                        <div className="font-sans" style={{ fontSize:11, color: isOpen ? "#fff" : "#1A1917", fontWeight:500, marginTop:3 }}>{b[1]}</div>
                        {isOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position:"absolute", [alignRight ? "right" : "left"]:0, [openUp ? "bottom" : "top"]:"calc(100% + 7px)", width:168, padding:"12px 13px", background:"#fff", borderRadius:10, border:"1px solid rgba(0,0,0,0.08)", boxShadow:"0 12px 30px rgba(0,0,0,0.18)", zIndex:40, textAlign:"left", animation:"cernePopIn 180ms var(--ease-out)" }}
                          >
                            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:9 }}>
                              <span style={{ width:22, height:22, borderRadius:"50%", background:tint(bc), color:bc, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-sora)", fontWeight:700, fontSize:11, flexShrink:0 }}>{b[4].charAt(0)}</span>
                              <span className="font-sans" style={{ fontSize:12.5, fontWeight:600, color:"#1A1917", lineHeight:1.2 }}>{b[4]}</span>
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                              <div className="font-sans" style={{ display:"flex", alignItems:"center", gap:7, fontSize:11.5, color:"#6B6760" }}>
                                <span style={{ width:6, height:6, borderRadius:2, background:bc, flexShrink:0 }} />{b[1]}
                              </div>
                              <div className="font-mono" style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, color:"#8A8378" }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                                {b[0]} · {b[5]}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MonitorFrame>
  );
}
