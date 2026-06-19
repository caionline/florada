// ============================================================
// Canabica — dados mock
// ============================================================

const CONDITIONS = [
  { id: "dor", label: "Dor crônica", emoji: null },
  { id: "ansiedade", label: "Ansiedade", emoji: null },
  { id: "insonia", label: "Insônia", emoji: null },
  { id: "epilepsia", label: "Epilepsia", emoji: null },
  { id: "fibromialgia", label: "Fibromialgia", emoji: null },
  { id: "depressao", label: "Depressão", emoji: null },
  { id: "enxaqueca", label: "Enxaqueca", emoji: null },
  { id: "autismo", label: "TEA (autismo)", emoji: null },
  { id: "nausea", label: "Náusea / apetite", emoji: null },
];

const EFFECTS = [
  { id: "relaxante", label: "Relaxante" },
  { id: "calmante", label: "Calmante" },
  { id: "alivio_dor", label: "Alívio de dor" },
  { id: "sono", label: "Indutor de sono" },
  { id: "foco", label: "Foco" },
  { id: "energia", label: "Energia" },
  { id: "euforico", label: "Eufórico" },
  { id: "apetite", label: "Estimula apetite" },
  { id: "criativo", label: "Criativo" },
  { id: "feliz", label: "Bem-estar" },
];

const USAGE_FORMS = [
  { id: "vapor", label: "Vaporizador (flor)" },
  { id: "fumo", label: "Fumo" },
  { id: "oleo", label: "Óleo sublingual" },
  { id: "capsula", label: "Cápsula" },
  { id: "comestivel", label: "Comestível" },
];

// type -> swatch hue used in placeholder tiles
const TYPE_META = {
  indica: { label: "Índica", hue: 285, tint: "oklch(0.62 0.10 300)" },
  sativa: { label: "Sativa", hue: 55, tint: "oklch(0.72 0.12 70)" },
  hibrida: { label: "Híbrida", hue: 150, tint: "oklch(0.6 0.09 150)" },
  cbd: { label: "Rica em CBD", hue: 25, tint: "oklch(0.66 0.11 40)" },
};

// labels de produto (flor / concentrado / óleo etc.)
const LABEL_META = {
  flor: { label: "Flor" },
  oleo: { label: "Óleo" },
  concentrado: { label: "Concentrado" },
  capsula: { label: "Cápsula" },
};

// ----- Associações ------------------------------------------------------
const ASSOCIATIONS = [
  { id: "abrace", name: "Abrace Esperança", city: "João Pessoa", uf: "PB", address: "Rua das Trincheiras, 412", members: 18400, founded: 2016, cultivo: ["Flor", "Óleo"], site: "abraceesperanca.org.br", rating: 4.8, reviews: 312, avgDeliveryDays: 6 },
  { id: "apepi", name: "APEPI", city: "Rio de Janeiro", uf: "RJ", address: "Av. Atlântica, 1200", members: 9600, founded: 2014, cultivo: ["Óleo"], site: "apepi.org.br", rating: 4.7, reviews: 184, avgDeliveryDays: 9 },
  { id: "cultive", name: "Cultive", city: "Campinas", uf: "SP", address: "Rua Barão de Itapura, 850", members: 12200, founded: 2015, cultivo: ["Flor", "Óleo", "Concentrado"], site: "cultive.org.br", rating: 4.6, reviews: 241, avgDeliveryDays: 5 },
  { id: "cannab", name: "Cannab Brasil", city: "Florianópolis", uf: "SC", address: "Rua das Rendeiras, 220", members: 5400, founded: 2018, cultivo: ["Flor"], site: "cannabbrasil.org", rating: 4.5, reviews: 96, avgDeliveryDays: 8 },
  { id: "verde", name: "Verde Vida", city: "Belo Horizonte", uf: "MG", address: "Av. Afonso Pena, 3000", members: 4100, founded: 2020, cultivo: ["Flor"], site: "verdevida.org.br", rating: 4.1, reviews: 58, avgDeliveryDays: 14 },
];

// ----- Produtos -----------------------------------------------------------
// cada produto pertence a UMA associação específica
const PRODUCTS = [
  {
    id: "charlotte-abrace",
    name: "Charlotte's Angel",
    assoc: "abrace",
    type: "cbd",
    label: "oleo",
    genetics: "Harlequin × Cannatonic",
    thc: "1–4%", cbd: "10–16%",
    avgPrice: 280,
    rating: 4.9, reviews: 162,
    flavors: ["Cítrico", "Pinho", "Terroso"],
    terps: ["Mirceno", "Pineno"],
    effects: [
      { id: "calmante", pct: 88 },
      { id: "alivio_dor", pct: 74 },
      { id: "foco", pct: 61 },
    ],
    conditions: [
      { id: "ansiedade", pct: 82 },
      { id: "epilepsia", pct: 70 },
      { id: "dor", pct: 64 },
    ],
    blurb: "CBD dominante com THC mínimo. Clareza mental sem psicoatividade — a porta de entrada mais comum para novos pacientes.",
  },
  {
    id: "acdc-cultive",
    name: "ACDC",
    assoc: "cultive",
    type: "cbd",
    label: "oleo",
    genetics: "Cannatonic pheno",
    thc: "1–6%", cbd: "12–20%",
    avgPrice: 310,
    rating: 4.8, reviews: 148,
    flavors: ["Terroso", "Doce", "Madeira"],
    terps: ["Mirceno", "Cariofileno"],
    effects: [
      { id: "alivio_dor", pct: 84 },
      { id: "calmante", pct: 79 },
      { id: "foco", pct: 55 },
    ],
    conditions: [
      { id: "dor", pct: 80 },
      { id: "fibromialgia", pct: 72 },
      { id: "ansiedade", pct: 66 },
    ],
    blurb: "Referência para dor crônica e fibromialgia. Alívio físico mantendo a cabeça funcional para o dia a dia.",
  },
  {
    id: "harlequin-abrace",
    name: "Harlequin",
    assoc: "abrace",
    type: "hibrida",
    label: "flor",
    genetics: "Colombian × Thai × Swiss",
    thc: "5–9%", cbd: "8–12%",
    avgPrice: 190,
    rating: 4.7, reviews: 121,
    flavors: ["Manga", "Almíscar", "Terroso"],
    terps: ["Mirceno", "Pineno"],
    effects: [
      { id: "relaxante", pct: 76 },
      { id: "alivio_dor", pct: 71 },
      { id: "feliz", pct: 64 },
    ],
    conditions: [
      { id: "dor", pct: 73 },
      { id: "ansiedade", pct: 68 },
      { id: "enxaqueca", pct: 52 },
    ],
    blurb: "Proporção equilibrada CBD:THC. Relaxa sem sedar — boa para uso diurno em dor moderada.",
  },
  {
    id: "northern-verde",
    name: "Northern Lights",
    assoc: "verde",
    type: "indica",
    label: "flor",
    genetics: "Afghani × Thai",
    thc: "16–21%", cbd: "<1%",
    avgPrice: 210,
    rating: 4.7, reviews: 203,
    flavors: ["Doce", "Picante", "Pinho"],
    terps: ["Mirceno", "Cariofileno"],
    effects: [
      { id: "sono", pct: 89 },
      { id: "relaxante", pct: 85 },
      { id: "alivio_dor", pct: 70 },
    ],
    conditions: [
      { id: "insonia", pct: 86 },
      { id: "dor", pct: 68 },
      { id: "ansiedade", pct: 60 },
    ],
    blurb: "Índica clássica de efeito corporal profundo. Uso noturno para insônia e dor que tira o sono.",
  },
  {
    id: "sourdiesel-cultive",
    name: "Sour Diesel",
    assoc: "cultive",
    type: "sativa",
    label: "flor",
    genetics: "Chemdawg × Super Skunk",
    thc: "18–24%", cbd: "<1%",
    avgPrice: 230,
    rating: 4.5, reviews: 138,
    flavors: ["Diesel", "Cítrico", "Herbal"],
    terps: ["Limoneno", "Cariofileno"],
    effects: [
      { id: "energia", pct: 82 },
      { id: "foco", pct: 75 },
      { id: "criativo", pct: 70 },
    ],
    conditions: [
      { id: "depressao", pct: 71 },
      { id: "enxaqueca", pct: 58 },
      { id: "nausea", pct: 50 },
    ],
    blurb: "Sativa energizante e cerebral. Indicada para fadiga, apatia e dias de baixa disposição.",
  },
  {
    id: "granddaddy-abrace",
    name: "Granddaddy Purple",
    assoc: "abrace",
    type: "indica",
    label: "flor",
    genetics: "Purple Urkle × Big Bud",
    thc: "17–23%", cbd: "<1%",
    avgPrice: 220,
    rating: 4.6, reviews: 109,
    flavors: ["Uva", "Frutas", "Doce"],
    terps: ["Mirceno", "Linalol"],
    effects: [
      { id: "relaxante", pct: 87 },
      { id: "sono", pct: 80 },
      { id: "apetite", pct: 66 },
    ],
    conditions: [
      { id: "insonia", pct: 78 },
      { id: "dor", pct: 70 },
      { id: "nausea", pct: 55 },
    ],
    blurb: "Índica roxa de aroma frutado intenso. Relaxamento muscular e estímulo de apetite.",
  },
  {
    id: "cbg-apepi",
    name: "White CBG",
    assoc: "apepi",
    type: "cbd",
    label: "oleo",
    genetics: "CBG-rico (linhagem própria)",
    thc: "<1%", cbd: "1% / CBG 14%",
    avgPrice: 300,
    rating: 4.4, reviews: 64,
    flavors: ["Limão", "Herbal", "Pinho"],
    terps: ["Pineno", "Limoneno"],
    effects: [
      { id: "foco", pct: 72 },
      { id: "calmante", pct: 64 },
      { id: "alivio_dor", pct: 58 },
    ],
    conditions: [
      { id: "ansiedade", pct: 60 },
      { id: "dor", pct: 55 },
      { id: "autismo", pct: 48 },
    ],
    blurb: "Rica em CBG, o 'canabinoide mãe'. Sem psicoatividade, foco e clareza com alívio leve.",
  },
  {
    id: "blueberry-cannab",
    name: "Blueberry",
    assoc: "cannab",
    type: "indica",
    label: "flor",
    genetics: "Afghani × Thai × Purple Thai",
    thc: "15–20%", cbd: "<1%",
    avgPrice: 195,
    rating: 4.6, reviews: 87,
    flavors: ["Mirtilo", "Doce", "Frutas"],
    terps: ["Mirceno", "Pineno"],
    effects: [
      { id: "relaxante", pct: 83 },
      { id: "feliz", pct: 72 },
      { id: "sono", pct: 68 },
    ],
    conditions: [
      { id: "ansiedade", pct: 70 },
      { id: "insonia", pct: 65 },
      { id: "depressao", pct: 54 },
    ],
    blurb: "Aroma marcante de mirtilo. Relaxamento bem-humorado, boa para fim de tarde e ansiedade.",
  },
];

// ----- Reviews de produto -------------------------------------------------
function rv(o) { return o; }
const PRODUCT_REVIEWS = [
  rv({ id: "r1", product: "charlotte-abrace", author: "Marina R.", initials: "MR", rating: 5, date: "12 mai 2025", helpful: 47, condition: "ansiedade", form: "oleo", effects: ["calmante", "foco"], flavor: ["Cítrico"], dose: "0,5 ml · 2x/dia", text: "Mudou minha rotina. Tomo de manhã e consigo trabalhar sem aquela névoa de ansiedade. Zero psicoatividade, e o efeito é bem consistente entre os frascos." }),
  rv({ id: "r2", product: "charlotte-abrace", author: "Paulo Henrique", initials: "PH", rating: 4, date: "28 abr 2025", helpful: 31, condition: "epilepsia", form: "oleo", effects: ["calmante"], flavor: ["Terroso"], dose: "1 ml · noite", text: "Uso para o meu filho (autorização Anvisa). Reduziu bastante as crises. Em alguns frascos notei ele um pouco mais sonolento — fico de olho na dose." }),
  rv({ id: "r3", product: "northern-verde", author: "Dani S.", initials: "DS", rating: 5, date: "02 mai 2025", helpful: 58, condition: "insonia", form: "vapor", effects: ["sono", "relaxante"], flavor: ["Doce", "Pinho"], dose: "0,1 g · 21h", text: "Pra quem tem insônia crônica: isso aqui é um abraço. Vaporizo meia hora antes de dormir e apago. A flor vem densa e cheirosa." }),
  rv({ id: "r4", product: "acdc-cultive", author: "Cláudia M.", initials: "CM", rating: 5, date: "19 abr 2025", helpful: 64, condition: "fibromialgia", form: "vapor", effects: ["alivio_dor", "calmante"], flavor: ["Terroso", "Doce"], dose: "0,15 g · manhã", text: "Fibromialgia há 9 anos. ACDC foi a primeira coisa que me deu função sem me derrubar. Consigo cuidar da casa de novo." }),
  rv({ id: "r5", product: "sourdiesel-cultive", author: "Rafa T.", initials: "RT", rating: 4, date: "07 mai 2025", helpful: 22, condition: "depressao", form: "vapor", effects: ["energia", "criativo"], flavor: ["Cítrico"], dose: "0,1 g · manhã", text: "Tomo cuidado por ser bem cerebral — em dia ruim de ansiedade evito. Mas pra apatia e falta de vontade, me tira da cama. Não usar à noite!" }),
  rv({ id: "r6", product: "harlequin-abrace", author: "Beatriz L.", initials: "BL", rating: 5, date: "23 abr 2025", helpful: 39, condition: "dor", form: "vapor", effects: ["alivio_dor", "feliz"], flavor: ["Manga"], dose: "0,12 g · tarde", text: "Equilíbrio perfeito pra dor de coluna durante o trabalho. Alivia e ainda fico de bom humor, sem ficar 'chapada'. Recomendo pra quem tá começando." }),
];

// ----- Reviews de associação (experiência de compra, separada do produto) -
const ASSOC_REVIEWS = [
  rv({ id: "a1", assoc: "abrace", author: "Marina R.", initials: "MR", rating: 5, date: "13 mai 2025", helpful: 28, deliveryDays: 5, text: "Pedido chegou embalado com cuidado, dentro do prazo informado. Atendimento por WhatsApp respondeu rápido quando tive dúvida sobre dosagem." }),
  rv({ id: "a2", assoc: "verde", author: "Dani S.", initials: "DS", rating: 3, date: "05 mai 2025", helpful: 19, deliveryDays: 16, text: "Produto é bom, mas a entrega atrasou bastante — disseram 7 dias e levou mais de duas semanas, sem aviso. Precisa melhorar a logística." }),
  rv({ id: "a3", assoc: "cultive", author: "Cláudia M.", initials: "CM", rating: 5, date: "20 abr 2025", helpful: 41, deliveryDays: 4, text: "Sempre rápido e com rastreio atualizado direto no app deles. Já sou associada há 2 anos e nunca tive problema com pedido." }),
  rv({ id: "a4", assoc: "apepi", author: "Paulo Henrique", initials: "PH", rating: 4, date: "29 abr 2025", helpful: 17, deliveryDays: 9, text: "Acompanhamento médico próprio é o diferencial. Entrega no prazo, mas o site de pedidos é meio confuso." }),
];

const COMMON_EFFECT_BG = {
  relaxante: "oklch(0.6 0.08 290)", calmante: "oklch(0.6 0.08 240)",
  alivio_dor: "oklch(0.62 0.1 30)", sono: "oklch(0.5 0.07 280)",
  foco: "oklch(0.6 0.09 200)", energia: "oklch(0.7 0.12 70)",
  euforico: "oklch(0.68 0.12 350)", apetite: "oklch(0.66 0.11 45)",
  criativo: "oklch(0.62 0.1 320)", feliz: "oklch(0.72 0.11 95)",
};

// helpers
function condLabel(id) { const c = CONDITIONS.find(x => x.id === id); return c ? c.label : id; }
function effLabel(id) { const e = EFFECTS.find(x => x.id === id); return e ? e.label : id; }
function formLabel(id) { const f = USAGE_FORMS.find(x => x.id === id); return f ? f.label : id; }
function labelLabel(id) { const l = LABEL_META[id]; return l ? l.label : id; }
function assocById(id) { return ASSOCIATIONS.find(a => a.id === id); }
function productById(id) { return PRODUCTS.find(p => p.id === id); }
function reviewsForProduct(id) { return PRODUCT_REVIEWS.filter(r => r.product === id); }
function reviewsForAssoc(id) { return ASSOC_REVIEWS.filter(r => r.assoc === id); }
function productsForAssoc(id) { return PRODUCTS.filter(p => p.assoc === id); }

Object.assign(window, {
  CONDITIONS, EFFECTS, USAGE_FORMS, TYPE_META, LABEL_META,
  ASSOCIATIONS, PRODUCTS, PRODUCT_REVIEWS, ASSOC_REVIEWS,
  COMMON_EFFECT_BG, condLabel, effLabel, formLabel, labelLabel,
  assocById, productById, reviewsForProduct, reviewsForAssoc, productsForAssoc,
});
