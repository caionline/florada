// ============================================================
// Canabica — telas (parte 2): Avaliar, Comparar, Perfil
// ============================================================

// ---- ESCREVER AVALIAÇÃO DE PRODUTO ------------------------------------
function WriteReview({ presetStrain, go, addReview }) {
  const [strainId, setStrainId] = useState(presetStrain || PRODUCTS[0].id);
  const s = productById(strainId);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [effs, setEffs] = useState(new Set());
  const [form, setForm] = useState("vapor");
  const [cond, setCond] = useState("");
  const [flavor, setFlavor] = useState(new Set());
  const [dose, setDose] = useState("");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const toggle = (set, setter, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n); };
  const valid = rating > 0 && cond && text.trim().length > 12;

  const submit = () => {
    addReview({
      id: "u" + Date.now(), product: strainId, author: "Você", initials: "VC",
      rating, date: "agora", helpful: 0, condition: cond, form,
      effects: [...effs], flavor: [...flavor], dose: dose || "—", text: text.trim(),
    });
    setDone(true);
  };

  const FLAVORS = ["Cítrico","Terroso","Doce","Pinho","Frutas","Picante","Herbal","Madeira","Diesel","Manga"];

  if (done) return (
    <div className="wrap" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 560, textAlign: "center" }}>
      <div className="fade-up card" style={{ padding: 44 }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--primary-tint)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}><Icon name="check" size={34}/></div>
        <h1 style={{ fontSize: 26, marginBottom: 10 }}>Avaliação publicada!</h1>
        <p style={{ color: "var(--muted)", fontSize: 15.5, marginBottom: 24, lineHeight: 1.5 }}>Obrigado por contribuir. Seu relato sobre <strong style={{ color: "var(--ink)" }}>{s.name}</strong> ajuda outros pacientes a escolherem com segurança.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => go("strain", strainId)}>Ver o produto</button>
          <button className="btn btn-ghost" onClick={() => go("profile")}>Meu perfil</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 20, paddingBottom: 70, maxWidth: 720 }}>
      <button onClick={() => go("back")} className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }}><Icon name="back" size={16}/> Voltar</button>
      <h1 style={{ fontSize: 30, marginBottom: 6 }}>Avaliar um produto</h1>
      <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 28 }}>Seu relato é anônimo para outros pacientes. Quanto mais específico, mais útil.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* produto */}
        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>1 · O que você usou</div>
          <label style={{ display: "block" }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-soft)" }}>Produto</div>
            <select value={strainId} onChange={e => setStrainId(e.target.value)} style={fieldStyle}>
              {PRODUCTS.map(x => { const a = assocById(x.assoc); return <option key={x.id} value={x.id}>{x.name} — {a.name}</option>; })}
            </select>
          </label>
        </div>

        {/* rating */}
        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>2 · Sua nota geral</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }} onMouseLeave={() => setHover(0)}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onMouseEnter={() => setHover(i)} onClick={() => setRating(i)} style={{ color: (hover || rating) >= i ? "var(--star)" : "var(--line-2)", padding: 2 }}>
                <Icon name="star" size={36}/>
              </button>
            ))}
            <span style={{ marginLeft: 10, fontWeight: 700, fontSize: 16, color: "var(--ink-soft)" }}>{["", "Ruim","Fraca","Boa","Muito boa","Excelente"][hover || rating]}</span>
          </div>
        </div>

        {/* condition + form */}
        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>3 · Para que e como você usou</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--ink-soft)" }}>Condição tratada</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {CONDITIONS.map(c => <button key={c.id} className={"chip" + (cond === c.id ? " on" : "")} style={{ cursor: "pointer" }} onClick={() => setCond(c.id)}>{c.label}</button>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--ink-soft)" }}>Forma de uso</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {USAGE_FORMS.map(f => <button key={f.id} className={"chip" + (form === f.id ? " on" : "")} style={{ cursor: "pointer" }} onClick={() => setForm(f.id)}>{f.label}</button>)}
            </div>
          </div>
        </div>

        {/* effects + flavor */}
        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>4 · Efeitos sentidos <span style={{ textTransform: "none", fontWeight: 500, color: "var(--muted)" }}>(opcional)</span></div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
            {EFFECTS.map(e => <EffectTag key={e.id} id={e.id} on={effs.has(e.id)} onClick={() => toggle(effs, setEffs, e.id)}/>)}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--ink-soft)" }}>Sabor & aroma</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {FLAVORS.map(f => <button key={f} className={"chip" + (flavor.has(f) ? " on" : "")} style={{ cursor: "pointer" }} onClick={() => toggle(flavor, setFlavor, f)}>{f}</button>)}
          </div>
        </div>

        {/* dose + text */}
        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>5 · Seu relato</div>
          <label style={{ display: "block", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-soft)" }}>Dose & horário <span style={{ fontWeight: 500, color: "var(--muted)" }}>(ajuda muito!)</span></div>
            <input value={dose} onChange={e => setDose(e.target.value)} placeholder="ex: 0,1 g vaporizado às 21h" style={fieldStyle}/>
          </label>
          <label style={{ display: "block" }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-soft)" }}>Como foi sua experiência?</div>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={5} placeholder="Conte o que sentiu, em quanto tempo fez efeito, se ajudou na sua condição…" style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.5 }}/>
            <div style={{ fontSize: 12, color: text.trim().length > 12 ? "var(--muted)" : "var(--accent-deep)", marginTop: 5 }}>{text.trim().length < 13 ? "Mínimo de algumas palavras" : `${text.trim().length} caracteres`}</div>
          </label>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn btn-primary" disabled={!valid} onClick={submit} style={{ opacity: valid ? 1 : .5, cursor: valid ? "pointer" : "not-allowed", padding: "13px 26px" }}>Publicar avaliação</button>
          {!valid && <span style={{ fontSize: 13, color: "var(--muted)" }}>Preencha nota, condição e relato.</span>}
        </div>
      </div>
    </div>
  );
}
const fieldStyle = { width: "100%", padding: "11px 13px", borderRadius: 10, border: "1px solid var(--line-2)", background: "var(--surface)", fontSize: 14.5, color: "var(--ink)", outline: "none" };

// ---- ESCREVER AVALIAÇÃO DE ASSOCIAÇÃO ----------------------------------
function WriteAssocReview({ presetAssoc, go, addAssocReview }) {
  const [assocId, setAssocId] = useState(presetAssoc || ASSOCIATIONS[0].id);
  const a = assocById(assocId);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [deliveryDays, setDeliveryDays] = useState("");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const valid = rating > 0 && text.trim().length > 12;

  const submit = () => {
    addAssocReview({
      id: "ua" + Date.now(), assoc: assocId, author: "Você", initials: "VC",
      rating, date: "agora", helpful: 0, deliveryDays: Number(deliveryDays) || null, text: text.trim(),
    });
    setDone(true);
  };

  if (done) return (
    <div className="wrap" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 560, textAlign: "center" }}>
      <div className="fade-up card" style={{ padding: 44 }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--primary-tint)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}><Icon name="check" size={34}/></div>
        <h1 style={{ fontSize: 26, marginBottom: 10 }}>Avaliação publicada!</h1>
        <p style={{ color: "var(--muted)", fontSize: 15.5, marginBottom: 24, lineHeight: 1.5 }}>Obrigado por contribuir. Seu relato sobre a <strong style={{ color: "var(--ink)" }}>{a.name}</strong> ajuda outros pacientes a escolherem com segurança.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => go("assoc", assocId)}>Ver a associação</button>
          <button className="btn btn-ghost" onClick={() => go("profile")}>Meu perfil</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 20, paddingBottom: 70, maxWidth: 720 }}>
      <button onClick={() => go("back")} className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }}><Icon name="back" size={16}/> Voltar</button>
      <h1 style={{ fontSize: 30, marginBottom: 6 }}>Avaliar uma associação</h1>
      <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 28 }}>Foque na experiência de compra: atendimento, entrega, comunicação — não no produto.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>1 · Associação</div>
          <select value={assocId} onChange={e => setAssocId(e.target.value)} style={fieldStyle}>
            {ASSOCIATIONS.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>2 · Sua nota geral</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }} onMouseLeave={() => setHover(0)}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onMouseEnter={() => setHover(i)} onClick={() => setRating(i)} style={{ color: (hover || rating) >= i ? "var(--star)" : "var(--line-2)", padding: 2 }}>
                <Icon name="star" size={36}/>
              </button>
            ))}
            <span style={{ marginLeft: 10, fontWeight: 700, fontSize: 16, color: "var(--ink-soft)" }}>{["", "Ruim","Fraca","Boa","Muito boa","Excelente"][hover || rating]}</span>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div className="label-cap" style={{ marginBottom: 12 }}>3 · Sua experiência</div>
          <label style={{ display: "block", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-soft)" }}>Dias até a entrega <span style={{ fontWeight: 500, color: "var(--muted)" }}>(opcional)</span></div>
            <input type="number" value={deliveryDays} onChange={e => setDeliveryDays(e.target.value)} placeholder="ex: 7" style={fieldStyle}/>
          </label>
          <label style={{ display: "block" }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-soft)" }}>Como foi a compra?</div>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={5} placeholder="Conte sobre atendimento, prazo, comunicação…" style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.5 }}/>
            <div style={{ fontSize: 12, color: text.trim().length > 12 ? "var(--muted)" : "var(--accent-deep)", marginTop: 5 }}>{text.trim().length < 13 ? "Mínimo de algumas palavras" : `${text.trim().length} caracteres`}</div>
          </label>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn btn-primary" disabled={!valid} onClick={submit} style={{ opacity: valid ? 1 : .5, cursor: valid ? "pointer" : "not-allowed", padding: "13px 26px" }}>Publicar avaliação</button>
          {!valid && <span style={{ fontSize: 13, color: "var(--muted)" }}>Preencha nota e relato.</span>}
        </div>
      </div>
    </div>
  );
}

// ---- COMPARAR ---------------------------------------------------------
function CompareScreen({ go }) {
  const [mode, setMode] = useState("assoc");
  const [picks, setPicks] = useState(["abrace", "cultive", "apepi"]);
  const [strainId, setStrainId] = useState("charlotte-abrace");

  const togglePick = (id) => setPicks(p => p.includes(id) ? p.filter(x => x !== id) : (p.length < 3 ? [...p, id] : p));
  const cols = picks.map(assocById);

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 24, paddingBottom: 70 }}>
      <SectionHead title="Comparar" sub="Coloque associações lado a lado antes de escolher"/>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
        {ASSOCIATIONS.map(a => (
          <button key={a.id} className={"chip" + (picks.includes(a.id) ? " on" : "")} style={{ cursor: "pointer", padding: "8px 14px" }} onClick={() => togglePick(a.id)}>
            {picks.includes(a.id) && <Icon name="check" size={13}/>} {a.name}
          </button>
        ))}
        <span style={{ alignSelf: "center", fontSize: 12.5, color: "var(--muted)" }}>até 3</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div className="card" style={{ display: "grid", gridTemplateColumns: `170px repeat(${cols.length}, minmax(170px, 1fr))`, minWidth: 170 + cols.length * 170, overflow: "hidden" }}>
          <CompCell head label=""/>
          {cols.map(a => <CompCell head key={a.id} label={<div><div style={{ fontWeight: 700, fontSize: 15 }}>{a.name}</div><div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{a.city}/{a.uf}</div></div>}/>)}
          {[
            ["Nota geral", a => <Stars value={a.rating} size={14} showNum/>],
            ["Avaliações", a => <span>{a.reviews.toLocaleString("pt-BR")}</span>],
            ["Membros", a => <span>{a.members.toLocaleString("pt-BR")}</span>],
            ["Produtos ofertados", a => <span>{productsForAssoc(a.id).length}</span>],
            ["Desde", a => <span className="mono">{a.founded}</span>],
            ["Prazo médio de entrega", a => <span className="mono">{a.avgDeliveryDays} dias</span>],
          ].map(([label, render], ri) => (
            <React.Fragment key={label}>
              <CompCell rowLabel zebra={ri%2===1} label={label}/>
              {cols.map(a => <CompCell key={a.id} zebra={ri%2===1} label={render(a)}/>)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
function CompCell({ label, head, rowLabel, zebra }) {
  return (
    <div style={{
      padding: "14px 16px",
      borderBottom: head ? "1px solid var(--line-2)" : "1px solid var(--line)",
      background: head ? "var(--surface-2)" : (zebra ? "var(--surface-2)" : "var(--surface)"),
      fontWeight: rowLabel ? 600 : (head ? 700 : 500),
      fontSize: rowLabel ? 13.5 : 14,
      color: rowLabel ? "var(--muted)" : "var(--ink)",
      display: "flex", alignItems: "center",
    }}>{label}</div>
  );
}

// ---- PERFIL -----------------------------------------------------------
function ProfileScreen({ go, favs, userReviews, toggleFav }) {
  const [tab, setTab] = useState("reviews");
  const myReviews = userReviews;
  const savedStrains = PRODUCTS.filter(s => favs.has(s.id));
  const conditions = ["dor", "ansiedade", "insonia"];

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 26, paddingBottom: 70 }}>
      {/* header */}
      <div className="card" style={{ padding: 26, marginBottom: 26, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <div className="avatar-btn" style={{ width: 76, height: 76, fontSize: 28 }}>VC</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Você</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>Paciente desde 2023 · João Pessoa, PB</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {conditions.map(c => <span key={c} className="chip" style={{ background: "var(--primary-tint)", borderColor: "var(--primary-soft)", color: "var(--primary-deep)" }}><Icon name="heart" size={13}/> {condLabel(c)}</span>)}
            <button className="chip" style={{ cursor: "pointer", borderStyle: "dashed" }}><Icon name="plus" size={13}/> condição</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 26, textAlign: "center" }}>
          {[[myReviews.length, "avaliações"], [savedStrains.length, "salvas"], [128, "úteis"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "var(--font-head)", color: "var(--primary-deep)" }}>{n}</div>
              <div className="label-cap" style={{ fontSize: 10.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", marginBottom: 22 }}>
        {[["reviews", `Minhas avaliações (${myReviews.length})`], ["saved", `Salvas (${savedStrains.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "11px 16px", fontWeight: 700, fontSize: 14.5, color: tab === k ? "var(--primary-deep)" : "var(--muted)", borderBottom: tab === k ? "2.5px solid var(--primary)" : "2.5px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>

      {tab === "reviews" && (
        <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
          {myReviews.length === 0 ? (
            <div className="card" style={{ padding: 40, textAlign: "center" }}>
              <Icon name="starline" size={30} style={{ color: "var(--muted)", opacity: .5 }}/>
              <p style={{ fontWeight: 600, marginTop: 12 }}>Você ainda não avaliou nada.</p>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 18 }}>Compartilhe sua experiência e ajude a comunidade.</p>
              <button className="btn btn-primary" onClick={() => go("write")}><Icon name="plus" size={16}/> Escrever primeira avaliação</button>
            </div>
          ) : myReviews.map(r => <ReviewCard key={r.id} r={r} showStrain/>)}
        </div>
      )}

      {tab === "saved" && (
        savedStrains.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center", maxWidth: 760 }}>
            <Icon name="heart" size={30} style={{ color: "var(--muted)", opacity: .5 }}/>
            <p style={{ fontWeight: 600, marginTop: 12 }}>Nenhuma strain salva.</p>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Toque no coração de qualquer card para salvar aqui.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
            {savedStrains.map(s => <StrainCard key={s.id} strain={s} onOpen={(id) => go("strain", id)} fav onFav={toggleFav}/>)}
          </div>
        )
      )}
    </div>
  );
}

Object.assign(window, { WriteReview, WriteAssocReview, CompareScreen, ProfileScreen });
