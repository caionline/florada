// ============================================================
// Florada — componentes compartilhados
// ============================================================
const { useState, useMemo, useEffect, useRef } = React;

// ---- Ícones (stroke simples) ------------------------------------------
function Icon({ name, size = 20, stroke = 1.8, style }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style };
  switch (name) {
    case "home": return <svg {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>;
    case "compare": return <svg {...p}><path d="M5 4v16M19 4v16"/><path d="M5 9h6M19 15h-6"/><path d="m8 6-3 3 3 3M16 12l3 3-3 3"/></svg>;
    case "user": return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg>;
    case "bell": return <svg {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>;
    case "star": return <svg {...p} fill="currentColor" stroke="none"><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 18l-5.8 3.05 1.1-6.5L2.6 9.9l6.5-.95z"/></svg>;
    case "starline": return <svg {...p}><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 18l-5.8 3.05 1.1-6.5L2.6 9.9l6.5-.95z"/></svg>;
    case "leaf": return <svg {...p}><path d="M11 20c-4 0-7-3-7-8 0-4.5 4-8 13-8 0 9-3.5 13-8 13-3 0-5-2-5-2"/><path d="M11 20c0-4 1.5-8 5-11"/></svg>;
    case "check": return <svg {...p}><path d="m4 12 5 5L20 6"/></svg>;
    case "shield": return <svg {...p}><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "drop": return <svg {...p}><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z"/></svg>;
    case "flask": return <svg {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 14h9"/></svg>;
    case "map": return <svg {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "chevron": return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case "back": return <svg {...p}><path d="m15 6-6 6 6 6"/></svg>;
    case "filter": return <svg {...p}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "heart": return <svg {...p}><path d="M12 20s-7-4.5-9.2-9C1.3 8 3 4.5 6.5 4.5c2 0 3.3 1.2 4 2.2.7-1 2-2.2 4-2.2C18 4.5 19.7 8 18.2 11 16 15.5 12 20 12 20Z"/></svg>;
    case "heartfill": return <svg {...p} fill="currentColor" stroke="none"><path d="M12 20s-7-4.5-9.2-9C1.3 8 3 4.5 6.5 4.5c2 0 3.3 1.2 4 2.2.7-1 2-2.2 4-2.2C18 4.5 19.7 8 18.2 11 16 15.5 12 20 12 20Z"/></svg>;
    case "thumb": return <svg {...p}><path d="M7 11v9H4v-9zM7 11l4-8c1.5 0 2.5 1 2.5 2.5V8h5a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.3 19H7"/></svg>;
    case "share": return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/></svg>;
    case "doc": return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>;
    case "info": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>;
    case "close": return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    default: return null;
  }
}

// ---- Logo mark (folha estilizada simples) -----------------------------
function Mark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="var(--primary)"/>
      <path d="M16 24c-5 0-8.5-3.6-8.5-9 0 0 4.5.4 7 3.2M16 24c5 0 8.5-3.6 8.5-9 0 0-4.5.4-7 3.2M16 24V11" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="9" r="2.4" fill="var(--accent)"/>
    </svg>
  );
}

// ---- Estrelas ---------------------------------------------------------
function Stars({ value, size = 15, showNum = false, count }) {
  const full = Math.floor(value);
  const frac = value - full;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ display: "inline-flex", gap: 1.5, color: "var(--star)" }}>
        {[0,1,2,3,4].map(i => {
          const fill = i < full ? 1 : (i === full ? frac : 0);
          return (
            <span key={i} style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
              <span style={{ position: "absolute", inset: 0, color: "var(--line-2)" }}><Icon name="star" size={size}/></span>
              <span style={{ position: "absolute", inset: 0, width: `${fill*100}%`, overflow: "hidden" }}><Icon name="star" size={size}/></span>
            </span>
          );
        })}
      </span>
      {showNum && <span style={{ fontWeight: 700, fontSize: size - 1 }}>{value.toFixed(1)}</span>}
      {count != null && <span style={{ color: "var(--muted)", fontSize: size - 2 }}>({count})</span>}
    </span>
  );
}

// ---- Tipo (badge) -----------------------------------------------------
function TypeBadge({ type, small }) {
  const m = TYPE_META[type];
  return (
    <span className="chip" style={{ background: "var(--surface)", borderColor: m.tint, color: m.tint, fontSize: small ? 11.5 : 12.5, fontWeight: 700 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: m.tint }}/>
      {m.label}
    </span>
  );
}

// ---- Placeholder de imagem da flor ------------------------------------
function BudTile({ type, label = "foto da flor", style, rounded = "var(--radius-sm)", icon = "leaf" }) {
  const m = TYPE_META[type];
  const base = m ? m.tint : "var(--primary)";
  return (
    <div className="ph" data-ph={label} style={{
      background: `linear-gradient(135deg, color-mix(in oklch, ${base} 26%, var(--surface)), color-mix(in oklch, ${base} 12%, var(--surface)))`,
      borderRadius: rounded, ...style,
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: .5, background: `repeating-linear-gradient(135deg, transparent 0 11px, color-mix(in oklch, ${base} 22%, transparent) 11px 12px)` }}/>
      <span style={{ color: base, opacity: .7, position: "relative" }}><Icon name={icon} size={Math.min(46, (parseInt(style?.height)||120)*0.34)} stroke={1.4}/></span>
    </div>
  );
}

// ---- Barra de efeito --------------------------------------------------
function EffectBar({ label, pct, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 120, flex: "none", fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)" }}>{label}</div>
      <div className="bar-track" style={{ flex: 1 }}>
        <div className="bar-fill" style={{ width: `${pct}%`, background: color || "var(--primary)" }}/>
      </div>
      <div className="mono" style={{ width: 38, textAlign: "right", fontSize: 12.5, color: "var(--muted)" }}>{pct}%</div>
    </div>
  );
}

// ---- Pílula de canabinoide (laudo) ------------------------------------
function CannaPill({ k, v, accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 14px", borderRadius: 12, background: accent ? "var(--accent-soft)" : "var(--primary-tint)", minWidth: 64 }}>
      <span className="mono" style={{ fontSize: 17, fontWeight: 700, color: accent ? "var(--accent-deep)" : "var(--primary-deep)" }}>{v}</span>
      <span className="label-cap" style={{ fontSize: 10 }}>{k}</span>
    </div>
  );
}

// ---- Card de strain ---------------------------------------------------
function StrainCard({ strain, onOpen, fav, onFav }) {
  const topEff = strain.effects[0];
  const topCond = strain.conditions[0];
  return (
    <button onClick={() => onOpen(strain.id)} className="card" style={{ textAlign: "left", padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform .12s, box-shadow .15s, border-color .15s", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "var(--line-2)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--line)"; }}>
      <div style={{ position: "relative" }}>
        <BudTile type={strain.type} style={{ height: 150 }} rounded="0" label={`flor · ${strain.name}`}/>
        <div style={{ position: "absolute", top: 10, left: 10 }}><TypeBadge type={strain.type} small/></div>
        <div onClick={(e) => { e.stopPropagation(); onFav && onFav(strain.id); }} className="iconbtn" style={{ position: "absolute", top: 8, right: 8, background: "oklch(1 0 0 / .85)", color: fav ? "var(--accent-deep)" : "var(--ink-soft)", width: 34, height: 34 }}>
          <Icon name={fav ? "heartfill" : "heart"} size={17}/>
        </div>
      </div>
      <div style={{ padding: "13px 15px 15px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>{strain.name}</h3>
          <Stars value={strain.rating} size={13} showNum/>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span className="chip mono" style={{ fontSize: 11, padding: "3px 8px" }}>THC {strain.thc}</span>
          <span className="chip mono" style={{ fontSize: 11, padding: "3px 8px" }}>CBD {strain.cbd}</span>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{strain.blurb}</p>
        <div style={{ marginTop: "auto", paddingTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, borderTop: "1px solid var(--line)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "var(--primary-deep)" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: COMMON_EFFECT_BG[topEff.id] || "var(--primary)" }}/>
            {effLabel(topEff.id)}
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>p/ {condLabel(topCond.id)}</span>
        </div>
      </div>
    </button>
  );
}

// ---- Tag de efeito clicável ------------------------------------------
function EffectTag({ id, on, onClick }) {
  return (
    <button className={"chip" + (on ? " on" : "")} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {!on && <span style={{ width: 8, height: 8, borderRadius: 999, background: COMMON_EFFECT_BG[id] || "var(--primary)" }}/>}
      {effLabel(id)}
    </button>
  );
}

// ---- Card de review ---------------------------------------------------
function ReviewCard({ r, showStrain }) {
  const [helpful, setHelpful] = useState(false);
  const s = strainById(r.strain);
  const lote = s?.lotes.find(l => l.id === r.lote);
  const assoc = lote && assocById(lote.assoc);
  return (
    <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div className="avatar-btn" style={{ background: "var(--surface-2)", color: "var(--primary-deep)", border: "1px solid var(--line-2)" }}>{r.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{r.author}</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.date} · trata <strong style={{ color: "var(--ink-soft)" }}>{condLabel(r.condition)}</strong></div>
        </div>
        <Stars value={r.rating} size={15}/>
      </div>

      {showStrain && s && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--primary-deep)" }}>
          <Icon name="leaf" size={15}/> {s.name}
        </div>
      )}

      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-soft)", textWrap: "pretty" }}>{r.text}</p>

      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {r.effects.map(e => <EffectTag key={e} id={e}/>)}
        <span className="chip">{formLabel(r.form)}</span>
        {r.flavor.map(f => <span key={f} className="chip" style={{ color: "var(--accent-deep)", borderColor: "var(--accent-soft)" }}>{f}</span>)}
      </div>

      {lote && assoc && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "var(--surface-2)", borderRadius: 10, fontSize: 12.5 }}>
          <Icon name="doc" size={15} style={{ color: "var(--muted)" }}/>
          <span style={{ color: "var(--ink-soft)" }}>Lote <span className="mono" style={{ fontWeight: 700 }}>{lote.code}</span> · {assoc.name}</span>
          <span className="mono" style={{ marginLeft: "auto", color: "var(--muted)" }}>THC {lote.thc}% · CBD {lote.cbd}%</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: "var(--muted)" }}>
        <span style={{ fontSize: 12.5 }}>Dose: <span className="mono" style={{ color: "var(--ink-soft)" }}>{r.dose}</span></span>
        <button onClick={() => setHelpful(h => !h)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: helpful ? "var(--primary-deep)" : "var(--muted)" }}>
          <Icon name="thumb" size={16}/> Útil ({r.helpful + (helpful ? 1 : 0)})
        </button>
      </div>
    </div>
  );
}

// ---- Selo de associação ----------------------------------------------
function AssocRow({ assoc, onOpen }) {
  return (
    <button onClick={() => onOpen && onOpen(assoc.id)} className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, textAlign: "left", cursor: onOpen ? "pointer" : "default", width: "100%" }}>
      <BudTile type="hibrida" icon="shield" style={{ width: 52, height: 52, flex: "none" }} label=""/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{assoc.name}</span>
          {assoc.verified && <span style={{ color: "var(--primary)", display: "inline-flex" }} title="Verificada"><Icon name="shield" size={15}/></span>}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{assoc.city} · {assoc.uf} · {assoc.members.toLocaleString("pt-BR")} membros</div>
      </div>
      <div style={{ textAlign: "right", flex: "none" }}>
        <Stars value={assoc.rating} size={13} showNum/>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{assoc.reviews} avaliações</div>
      </div>
    </button>
  );
}

// ---- Section heading --------------------------------------------------
function SectionHead({ title, sub, action }) {
  return (
    <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>{title}</h2>
        {sub && <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 3 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

Object.assign(window, {
  Icon, Mark, Stars, TypeBadge, BudTile, EffectBar, CannaPill,
  StrainCard, EffectTag, ReviewCard, AssocRow, SectionHead,
});
