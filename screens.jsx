// ============================================================
// Canabica — telas (parte 1): Feed, Busca, Detalhe
// ============================================================

// ---- FEED -------------------------------------------------------------
function FeedScreen({ go, favs, toggleFav }) {
  const [cond, setCond] = useState(null);
  const list = useMemo(() => {
    let l = [...PRODUCTS];
    if (cond) l = l.filter(s => s.conditions.some(c => c.id === cond)).sort((a,b) => {
      const av = a.conditions.find(c=>c.id===cond).pct, bv = b.conditions.find(c=>c.id===cond).pct;
      return bv - av;
    });
    else l.sort((a,b) => b.rating - a.rating);
    return l;
  }, [cond]);

  const topAssoc = [...ASSOCIATIONS].sort((a,b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 26, paddingBottom: 60 }}>
      {/* HERO */}
      <div className="fade-up" style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", padding: "40px 36px", marginBottom: 30, background: "linear-gradient(120deg, var(--primary-deep), var(--primary))", color: "white" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .14, background: "repeating-linear-gradient(115deg, transparent 0 28px, white 28px 29px)" }}/>
        <div style={{ position: "relative", maxWidth: 640 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 999, background: "oklch(1 0 0 / .16)", fontSize: 12.5, fontWeight: 600, marginBottom: 16 }}>
            <Icon name="shield" size={14}/> Avaliações reais, separadas por produto e por associação
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, lineHeight: 1.03, marginBottom: 12 }}>A experiência real de cada paciente, produto a produto.</h1>
          <p style={{ fontSize: 16.5, opacity: .92, lineHeight: 1.5, marginBottom: 22, maxWidth: 540 }}>Compare cultivares, óleos e associações pela condição que você trata — não por marketing. Escrito por quem usa cannabis medicinal de verdade.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn" style={{ background: "white", color: "var(--primary-deep)" }} onClick={() => go("search")}><Icon name="search" size={17}/> Buscar por condição</button>
            <button className="btn" style={{ background: "oklch(1 0 0 / .15)", color: "white", backdropFilter: "blur(4px)" }} onClick={() => go("write")}><Icon name="plus" size={17}/> Avaliar um produto</button>
          </div>
        </div>
      </div>

      {/* QUICK CONDITIONS */}
      <div style={{ marginBottom: 30 }}>
        <div className="label-cap" style={{ marginBottom: 11 }}>Encontre pelo que você trata</div>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          <button className={"chip" + (cond === null ? " on" : "")} style={{ padding: "8px 15px", fontSize: 13.5, cursor: "pointer" }} onClick={() => setCond(null)}>Todas</button>
          {CONDITIONS.map(c => (
            <button key={c.id} className={"chip" + (cond === c.id ? " on" : "")} style={{ padding: "8px 15px", fontSize: 13.5, cursor: "pointer" }} onClick={() => setCond(c.id)}>{c.label}</button>
          ))}
        </div>
      </div>

      {/* TRENDING STRAINS */}
      <SectionHead
        title={cond ? `Melhores para ${condLabel(cond).toLowerCase()}` : "Em alta esta semana"}
        sub={cond ? "Ordenadas pela eficácia relatada nessa condição" : "As cultivares mais bem avaliadas pela comunidade"}
        action={<button className="btn btn-ghost btn-sm hide-mobile" onClick={() => go("search")}>Ver todas <Icon name="chevron" size={15}/></button>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 18, marginBottom: 44 }}>
        {list.map(s => <StrainCard key={s.id} strain={s} onOpen={(id) => go("strain", id)} fav={favs.has(s.id)} onFav={toggleFav}/>)}
      </div>

      {/* ASSOCIATIONS */}
      <SectionHead title="Associações em destaque" sub="Melhor avaliadas em qualidade de atendimento e entrega" action={<button className="btn btn-ghost btn-sm hide-mobile" onClick={() => go("compare")}>Comparar <Icon name="compare" size={15}/></button>}/>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
        {topAssoc.map(a => <AssocRow key={a.id} assoc={a} onOpen={(id) => go("assoc", id)}/>)}
      </div>
    </div>
  );
}

// ---- BUSCA / FILTRO ---------------------------------------------------
function SearchScreen({ go, favs, toggleFav }) {
  const [q, setQ] = useState("");
  const [cond, setCond] = useState(null);
  const [effs, setEffs] = useState(new Set());
  const [types, setTypes] = useState(new Set());
  const [sort, setSort] = useState("rating");

  const toggle = (set, setter, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n); };

  const results = useMemo(() => {
    let l = PRODUCTS.filter(s => {
      if (q && !(`${s.name} ${s.genetics} ${s.flavors.join(" ")}`.toLowerCase().includes(q.toLowerCase()))) return false;
      if (cond && !s.conditions.some(c => c.id === cond)) return false;
      if (effs.size && ![...effs].every(e => s.effects.some(x => x.id === e))) return false;
      if (types.size && !types.has(s.type)) return false;
      return true;
    });
    if (sort === "rating") l.sort((a,b) => b.rating - a.rating);
    if (sort === "reviews") l.sort((a,b) => b.reviews - a.reviews);
    if (sort === "cond" && cond) l.sort((a,b) => (b.conditions.find(c=>c.id===cond)?.pct||0) - (a.conditions.find(c=>c.id===cond)?.pct||0));
    return l;
  }, [q, cond, effs, types, sort]);

  const activeCount = (cond ? 1 : 0) + effs.size + types.size;

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 24, paddingBottom: 60, display: "grid", gridTemplateColumns: "262px 1fr", gap: 28, alignItems: "start" }}>
      {/* FILTERS */}
      <aside className="card filters-aside" style={{ padding: 18, position: "sticky", top: 84, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="filter" size={17}/> Filtros</h3>
          {activeCount > 0 && <button onClick={() => { setCond(null); setEffs(new Set()); setTypes(new Set()); }} style={{ fontSize: 12.5, color: "var(--accent-deep)", fontWeight: 600 }}>Limpar ({activeCount})</button>}
        </div>

        <div>
          <div className="label-cap" style={{ marginBottom: 9 }}>Condição</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {CONDITIONS.map(c => (
              <button key={c.id} onClick={() => setCond(cond === c.id ? null : c.id)} style={{ textAlign: "left", padding: "7px 10px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, background: cond === c.id ? "var(--primary-tint)" : "transparent", color: cond === c.id ? "var(--primary-deep)" : "var(--ink-soft)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {c.label} {cond === c.id && <Icon name="check" size={15}/>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="label-cap" style={{ marginBottom: 9 }}>Tipo</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {Object.keys(TYPE_META).map(t => (
              <button key={t} className={"chip" + (types.has(t) ? " on" : "")} style={{ cursor: "pointer" }} onClick={() => toggle(types, setTypes, t)}>{TYPE_META[t].label}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="label-cap" style={{ marginBottom: 9 }}>Efeitos desejados</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {EFFECTS.map(e => <EffectTag key={e.id} id={e.id} on={effs.has(e.id)} onClick={() => toggle(effs, setEffs, e.id)}/>)}
          </div>
        </div>
      </aside>

      {/* RESULTS */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: 999, height: 46 }}>
            <Icon name="search" size={19} style={{ color: "var(--muted)" }}/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar strain, genética, sabor…" style={{ border: "none", outline: "none", background: "transparent", flex: 1, fontSize: 15, color: "var(--ink)" }}/>
            {q && <button onClick={() => setQ("")} style={{ color: "var(--muted)" }}><Icon name="close" size={16}/></button>}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ height: 46, padding: "0 14px", borderRadius: 999, border: "1px solid var(--line-2)", background: "var(--surface)", fontSize: 14, fontWeight: 600, color: "var(--ink-soft)" }}>
            <option value="rating">Mais bem avaliadas</option>
            <option value="reviews">Mais avaliadas</option>
            {cond && <option value="cond">Eficácia p/ condição</option>}
          </select>
        </div>

        <div style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 14 }}>{results.length} {results.length === 1 ? "resultado" : "resultados"}{cond && <> para <strong style={{ color: "var(--ink-soft)" }}>{condLabel(cond)}</strong></>}</div>

        {results.length === 0 ? (
          <div className="card" style={{ padding: 48, textAlign: "center", color: "var(--muted)" }}>
            <Icon name="search" size={32} style={{ opacity: .4 }}/>
            <p style={{ marginTop: 12, fontWeight: 600 }}>Nada encontrado com esses filtros.</p>
            <p style={{ fontSize: 14 }}>Tente afrouxar os efeitos ou o tipo.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
            {results.map(s => <StrainCard key={s.id} strain={s} onOpen={(id) => go("strain", id)} fav={favs.has(s.id)} onFav={toggleFav}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ---- DETALHE DO PRODUTO ------------------------------------------------
function StrainDetail({ id, go, favs, toggleFav }) {
  const s = productById(id);
  const [tab, setTab] = useState("sobre");
  const reviews = reviewsForProduct(id);
  if (!s) return null;
  const fav = favs.has(s.id);
  const assoc = assocById(s.assoc);

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 18, paddingBottom: 60 }}>
      <button onClick={() => go("back")} className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }}><Icon name="back" size={16}/> Voltar</button>

      {/* HEADER */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginBottom: 30, alignItems: "flex-start" }} className="detail-head">
        <BudTile type={s.type} style={{ height: 280, width: 320, flex: "1 1 280px", maxWidth: 360 }} label={`foto da flor · ${s.name}`}/>
        <div style={{ flex: "2 1 360px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <TypeBadge type={s.type}/>
            <span style={{ fontSize: 13, color: "var(--muted)" }} className="mono">{s.genetics}</span>
          </div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 800, marginBottom: 10 }}>{s.name}</h1>
          <button onClick={() => go("assoc", assoc.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--primary-deep)", marginBottom: 14 }}>
            <Icon name="shield" size={15}/> {assoc.name}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
            <Stars value={s.rating} size={20} showNum/>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>{s.reviews} avaliações de pacientes</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", marginBottom: 20, maxWidth: 560, textWrap: "pretty" }}>{s.blurb}</p>

          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <CannaPill k="THC" v={s.thc}/>
            <CannaPill k="CBD" v={s.cbd} accent/>
            <CannaPill k="Preço médio" v={`R$ ${s.avgPrice}`}/>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => go("write", s.id)}><Icon name="plus" size={17}/> Avaliar este produto</button>
            <button className="btn btn-ghost" onClick={() => toggleFav(s.id)} style={{ color: fav ? "var(--accent-deep)" : "var(--ink)" }}><Icon name={fav ? "heartfill" : "heart"} size={17}/> {fav ? "Salva" : "Salvar"}</button>
            <button className="btn btn-ghost"><Icon name="share" size={17}/></button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", marginBottom: 24 }}>
        {[["sobre","Efeitos & uso"],["reviews",`Avaliações (${reviews.length})`]].map(([k,label]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "11px 16px", fontWeight: 700, fontSize: 14.5, color: tab === k ? "var(--primary-deep)" : "var(--muted)", borderBottom: tab === k ? "2.5px solid var(--primary)" : "2.5px solid transparent", marginBottom: -1 }}>{label}</button>
        ))}
      </div>

      {tab === "sobre" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 17, marginBottom: 16 }}>Efeitos relatados</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {s.effects.map(e => <EffectBar key={e.id} label={effLabel(e.id)} pct={e.pct} color={COMMON_EFFECT_BG[e.id]}/>)}
            </div>
            <h3 style={{ fontSize: 17, margin: "24px 0 12px" }}>Sabor & aroma</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.flavors.map(f => <span key={f} className="chip" style={{ color: "var(--accent-deep)", borderColor: "var(--accent-soft)", padding: "7px 13px" }}>{f}</span>)}
            </div>
            <h3 style={{ fontSize: 17, margin: "24px 0 12px" }}>Terpenos</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.terps.map(t => <span key={t} className="chip" style={{ padding: "7px 13px" }}><Icon name="drop" size={13}/> {t}</span>)}
            </div>
          </div>
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 17, marginBottom: 16 }}>Ajuda mais com</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {s.conditions.map(c => <EffectBar key={c.id} label={condLabel(c.id)} pct={c.pct} color="var(--primary)"/>)}
            </div>
            <div style={{ marginTop: 22, padding: 14, background: "var(--surface-2)", borderRadius: 12, display: "flex", gap: 11, alignItems: "start" }}>
              <Icon name="info" size={18} style={{ color: "var(--muted)", flex: "none", marginTop: 1 }}/>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.45 }}>Percentuais baseados em {s.reviews} relatos de pacientes. Não substituem orientação médica — converse com seu prescritor.</p>
            </div>
          </div>
        </div>
      )}

      {tab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
          <button className="btn btn-accent" style={{ alignSelf: "start" }} onClick={() => go("write", s.id)}><Icon name="plus" size={17}/> Escrever avaliação</button>
          {reviews.length === 0 && <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>Ainda sem avaliações. Seja o primeiro!</div>}
          {reviews.map(r => <ReviewCard key={r.id} r={r}/>)}
        </div>
      )}
    </div>
  );
}

// ---- DETALHE DA ASSOCIAÇÃO ---------------------------------------------
function AssocDetail({ id, go }) {
  const a = assocById(id);
  const [tab, setTab] = useState("produtos");
  const reviews = reviewsForAssoc(id);
  const products = productsForAssoc(id);
  if (!a) return null;

  return (
    <div className="wrap pad-bottom" style={{ paddingTop: 18, paddingBottom: 60 }}>
      <button onClick={() => go("back")} className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }}><Icon name="back" size={16}/> Voltar</button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginBottom: 30, alignItems: "flex-start" }} className="detail-head">
        <BudTile type="hibrida" icon="shield" style={{ height: 280, width: 320, flex: "1 1 280px", maxWidth: 360 }} label=""/>
        <div style={{ flex: "2 1 360px", minWidth: 0 }}>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>{a.city} · {a.uf} · desde {a.founded}</span>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 800, margin: "8px 0 14px" }}>{a.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
            <Stars value={a.rating} size={20} showNum/>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>{a.reviews} avaliações de experiência de compra</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", marginBottom: 20, maxWidth: 560 }}>{a.address} · {a.members.toLocaleString("pt-BR")} membros · cultivo: {a.cultivo.join(", ")} · site: <span className="mono">{a.site}</span></p>

          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <CannaPill k="Membros" v={a.members.toLocaleString("pt-BR")}/>
            <CannaPill k="Prazo médio" v={`${a.avgDeliveryDays}d`} accent/>
            <CannaPill k="Produtos" v={products.length}/>
          </div>

          <button className="btn btn-primary" onClick={() => go("writeassoc", a.id)}><Icon name="plus" size={17}/> Avaliar esta associação</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", marginBottom: 24 }}>
        {[["produtos",`Produtos (${products.length})`],["reviews",`Avaliações de compra (${reviews.length})`]].map(([k,label]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "11px 16px", fontWeight: 700, fontSize: 14.5, color: tab === k ? "var(--primary-deep)" : "var(--muted)", borderBottom: tab === k ? "2.5px solid var(--primary)" : "2.5px solid transparent", marginBottom: -1 }}>{label}</button>
        ))}
      </div>

      {tab === "produtos" && (
        products.length === 0 ? <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>Nenhum produto cadastrado.</div> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
            {products.map(p => <StrainCard key={p.id} strain={p} onOpen={(id) => go("strain", id)} fav={false} onFav={() => {}}/>)}
          </div>
        )
      )}

      {tab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
          <button className="btn btn-accent" style={{ alignSelf: "start" }} onClick={() => go("writeassoc", a.id)}><Icon name="plus" size={17}/> Escrever avaliação</button>
          {reviews.length === 0 && <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>Ainda sem avaliações. Seja o primeiro!</div>}
          {reviews.map(r => <AssocReviewCard key={r.id} r={r}/>)}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { FeedScreen, SearchScreen, StrainDetail, AssocDetail });
