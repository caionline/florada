// ============================================================
// Florada — app principal (navegação + chrome + tweaks)
// ============================================================

const THEMES = {
  salvia:    { primary: "0.5 0.072 152", deep: "0.38 0.06 152", soft: "0.93 0.03 152", tint: "0.96 0.018 152", accent: "0.68 0.13 56", adeep: "0.55 0.12 48", asoft: "0.94 0.04 70" },
  terracota: { primary: "0.55 0.11 40", deep: "0.43 0.1 38", soft: "0.93 0.035 45", tint: "0.96 0.02 45", accent: "0.62 0.09 200", adeep: "0.5 0.09 215", asoft: "0.93 0.035 210" },
  ametista:  { primary: "0.5 0.1 300", deep: "0.4 0.09 300", soft: "0.93 0.035 305", tint: "0.96 0.02 305", accent: "0.68 0.13 95", adeep: "0.56 0.12 95", asoft: "0.94 0.045 100" },
};

function applyTheme(name, dark, scale, sharp) {
  const root = document.documentElement.style;
  const t = THEMES[name] || THEMES.salvia;
  root.setProperty("--primary", `oklch(${t.primary})`);
  root.setProperty("--primary-deep", `oklch(${t.deep})`);
  root.setProperty("--primary-soft", `oklch(${dark ? "0.4 0.05 152" : t.soft})`);
  root.setProperty("--primary-tint", `oklch(${dark ? "0.28 0.03 152" : t.tint})`);
  root.setProperty("--accent", `oklch(${t.accent})`);
  root.setProperty("--accent-deep", `oklch(${t.adeep})`);
  root.setProperty("--accent-soft", `oklch(${dark ? "0.32 0.04 60" : t.asoft})`);

  if (dark) {
    root.setProperty("--bg", "oklch(0.21 0.012 250)");
    root.setProperty("--bg-2", "oklch(0.24 0.014 250)");
    root.setProperty("--surface", "oklch(0.25 0.013 250)");
    root.setProperty("--surface-2", "oklch(0.29 0.014 250)");
    root.setProperty("--ink", "oklch(0.95 0.008 250)");
    root.setProperty("--ink-soft", "oklch(0.82 0.01 250)");
    root.setProperty("--muted", "oklch(0.64 0.012 250)");
    root.setProperty("--line", "oklch(0.34 0.012 250)");
    root.setProperty("--line-2", "oklch(0.42 0.014 250)");
  } else {
    root.setProperty("--bg", "oklch(0.975 0.013 92)");
    root.setProperty("--bg-2", "oklch(0.955 0.016 92)");
    root.setProperty("--surface", "oklch(0.995 0.005 95)");
    root.setProperty("--surface-2", "oklch(0.982 0.011 92)");
    root.setProperty("--ink", "oklch(0.27 0.022 80)");
    root.setProperty("--ink-soft", "oklch(0.44 0.02 80)");
    root.setProperty("--muted", "oklch(0.56 0.018 85)");
    root.setProperty("--line", "oklch(0.9 0.012 90)");
    root.setProperty("--line-2", "oklch(0.84 0.016 88)");
  }
  root.setProperty("--radius", sharp ? "6px" : "16px");
  root.setProperty("--radius-sm", sharp ? "4px" : "10px");
  root.setProperty("--radius-lg", sharp ? "8px" : "24px");
  document.body.style.fontSize = (scale || 16) + "px";
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tema": "salvia",
  "noturno": false,
  "cantos": "arredondado",
  "fonte": 16
}/*EDITMODE-END*/;

function FloradaTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTheme(t.tema, t.noturno, t.fonte, t.cantos === "reto"); }, [t.tema, t.noturno, t.fonte, t.cantos]);
  return (
    <TweaksPanel>
      <TweakSection label="Aparência" />
      <TweakColor label="Tema" value={THEMES[t.tema] ? `oklch(${THEMES[t.tema].primary})` : ""}
        options={Object.keys(THEMES).map(k => `oklch(${THEMES[k].primary})`)}
        onChange={(v) => { const k = Object.keys(THEMES).find(k => `oklch(${THEMES[k].primary})` === v); if (k) setTweak("tema", k); }} />
      <TweakToggle label="Modo noturno" value={t.noturno} onChange={(v) => setTweak("noturno", v)} />
      <TweakRadio label="Cantos" value={t.cantos} options={["arredondado", "reto"]} onChange={(v) => setTweak("cantos", v)} />
      <TweakSection label="Tipografia" />
      <TweakSlider label="Tamanho do texto" value={t.fonte} min={14} max={19} step={1} unit="px" onChange={(v) => setTweak("fonte", v)} />
    </TweaksPanel>
  );
}

// ---- Header -----------------------------------------------------------
function Header({ route, go }) {
  const items = [["feed","Início","home"],["search","Descobrir","search"],["compare","Comparar","compare"]];
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <button className="brand" onClick={() => go("feed")}>
          <span className="mark"><Mark size={30}/></span> Florada
        </button>
        <nav className="nav">
          {items.map(([k, label]) => (
            <button key={k} className={route === k ? "active" : ""} onClick={() => go(k)}>{label}</button>
          ))}
        </nav>
        <div className="topbar-spacer"/>
        <button className="btn btn-accent btn-sm hide-mobile" onClick={() => go("write")}><Icon name="plus" size={16}/> Avaliar</button>
        <button className="iconbtn hide-mobile"><Icon name="bell" size={20}/></button>
        <button className="avatar-btn" onClick={() => go("profile")} title="Meu perfil">VC</button>
      </div>
    </header>
  );
}

// ---- Mobile bottom nav ------------------------------------------------
function MobileNav({ route, go }) {
  const items = [["feed","Início","home"],["search","Buscar","search"],["write","Avaliar","plus"],["compare","Comparar","compare"],["profile","Perfil","user"]];
  return (
    <nav className="mobilenav">
      {items.map(([k, label, icon]) => (
        <button key={k} className={route === k ? "active" : ""} onClick={() => go(k)}>
          <Icon name={icon} size={22}/> {label}
        </button>
      ))}
    </nav>
  );
}

// ---- App --------------------------------------------------------------
function App() {
  const [route, setRoute] = useState("feed");
  const [param, setParam] = useState(null);
  const [stack, setStack] = useState([]);
  const [favs, setFavs] = useState(new Set(["acdc", "northern"]));
  const [userReviews, setUserReviews] = useState([]);

  const go = (name, p = null) => {
    if (name === "back") {
      setStack(s => {
        const ns = [...s]; const prev = ns.pop();
        if (prev) { setRoute(prev.route); setParam(prev.param); }
        else { setRoute("feed"); setParam(null); }
        return ns;
      });
      window.scrollTo(0, 0);
      return;
    }
    setStack(s => [...s, { route, param }]);
    setRoute(name); setParam(p);
    window.scrollTo(0, 0);
  };

  const toggleFav = (id) => setFavs(f => { const n = new Set(f); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const addReview = (r) => setUserReviews(rs => [r, ...rs]);

  const topRoute = ["feed","search","compare","profile"].includes(route) ? route : "";

  return (
    <>
      <Header route={topRoute} go={go} />
      <main key={route + (param || "")}>
        {route === "feed" && <FeedScreen go={go} favs={favs} toggleFav={toggleFav} />}
        {route === "search" && <SearchScreen go={go} favs={favs} toggleFav={toggleFav} />}
        {route === "strain" && <StrainDetail id={param} go={go} favs={favs} toggleFav={toggleFav} />}
        {route === "write" && <WriteReview presetStrain={param} go={go} addReview={addReview} />}
        {route === "compare" && <CompareScreen go={go} />}
        {route === "profile" && <ProfileScreen go={go} favs={favs} userReviews={userReviews} toggleFav={toggleFav} />}
      </main>
      <MobileNav route={topRoute || route} go={go} />
      <FloradaTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
