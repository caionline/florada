// ============================================================
// Florada — dados mock
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

const ASSOCIATIONS = [
  { id: "abrace", name: "Abrace Esperança", city: "João Pessoa", uf: "PB", members: 18400, strains: 12, rating: 4.8, reviews: 2310, verified: true, since: 2016, blurb: "Pioneira no cultivo associativo no Nordeste, com laudo em todos os lotes." },
  { id: "apepi", name: "APEPI", city: "Rio de Janeiro", uf: "RJ", members: 9600, strains: 8, rating: 4.7, reviews: 1420, verified: true, since: 2014, blurb: "Foco em pacientes com epilepsia e TEA. Acompanhamento médico próprio." },
  { id: "cultive", name: "Cultive", city: "Campinas", uf: "SP", members: 12200, strains: 10, rating: 4.6, reviews: 1880, verified: true, since: 2015, blurb: "Ampla variedade de cultivares e óleos full spectrum padronizados." },
  { id: "cannab", name: "Cannab Brasil", city: "Florianópolis", uf: "SC", members: 5400, strains: 6, rating: 4.5, reviews: 760, verified: true, since: 2018, blurb: "Produção rastreada lote a lote, com QR code no frasco." },
  { id: "verde", name: "Verde Vida", city: "Belo Horizonte", uf: "MG", members: 4100, strains: 5, rating: 4.4, reviews: 540, verified: false, since: 2020, blurb: "Associação jovem em expansão, forte em flor de THC para dor." },
];

// Lotes: cada um traz laudo (COA) com THC/CBD reais daquele lote
function lote(id, assoc, code, thc, cbd, date, terps, verified) {
  return { id, assoc, code, thc, cbd, date, terps, verified };
}

const STRAINS = [
  {
    id: "charlotte",
    name: "Charlotte's Angel",
    type: "cbd",
    genetics: "Harlequin × Cannatonic",
    thc: "1–4%", cbd: "10–16%",
    rating: 4.9, reviews: 412,
    flavors: ["Cítrico", "Pinho", "Terroso"],
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
    lotes: [
      lote("ch-1", "abrace", "L-2406-A", 2.1, 13.4, "abr/2025", ["Mirceno", "Pineno"], true),
      lote("ch-2", "apepi", "L-CA-118", 1.6, 11.8, "mar/2025", ["Pineno", "Cariofileno"], true),
      lote("ch-3", "cultive", "L-7741", 3.2, 14.9, "mai/2025", ["Limoneno", "Mirceno"], true),
    ],
  },
  {
    id: "acdc",
    name: "ACDC",
    type: "cbd",
    genetics: "Cannatonic pheno",
    thc: "1–6%", cbd: "12–20%",
    rating: 4.8, reviews: 356,
    flavors: ["Terroso", "Doce", "Madeira"],
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
    lotes: [
      lote("ac-1", "cultive", "L-7702", 4.0, 17.2, "abr/2025", ["Mirceno", "Cariofileno"], true),
      lote("ac-2", "verde", "VV-031", 5.5, 14.0, "mai/2025", ["Mirceno", "Humuleno"], false),
    ],
  },
  {
    id: "harlequin",
    name: "Harlequin",
    type: "hibrida",
    genetics: "Colombian × Thai × Swiss",
    thc: "5–9%", cbd: "8–12%",
    rating: 4.7, reviews: 289,
    flavors: ["Manga", "Almíscar", "Terroso"],
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
    lotes: [
      lote("ha-1", "abrace", "L-2402-H", 7.4, 9.1, "fev/2025", ["Mirceno", "Pineno"], true),
      lote("ha-2", "cannab", "CB-209", 6.2, 10.5, "abr/2025", ["Limoneno", "Mirceno"], true),
    ],
  },
  {
    id: "northern",
    name: "Northern Lights",
    type: "indica",
    genetics: "Afghani × Thai",
    thc: "16–21%", cbd: "<1%",
    rating: 4.7, reviews: 521,
    flavors: ["Doce", "Picante", "Pinho"],
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
    lotes: [
      lote("nl-1", "verde", "VV-044", 19.2, 0.4, "mai/2025", ["Mirceno", "Cariofileno"], true),
      lote("nl-2", "cannab", "CB-221", 17.8, 0.6, "abr/2025", ["Mirceno", "Linalol"], true),
    ],
  },
  {
    id: "sourdiesel",
    name: "Sour Diesel",
    type: "sativa",
    genetics: "Chemdawg × Super Skunk",
    thc: "18–24%", cbd: "<1%",
    rating: 4.5, reviews: 388,
    flavors: ["Diesel", "Cítrico", "Herbal"],
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
    lotes: [
      lote("sd-1", "cultive", "L-7758", 21.0, 0.5, "mai/2025", ["Limoneno", "Cariofileno"], true),
    ],
  },
  {
    id: "granddaddy",
    name: "Granddaddy Purple",
    type: "indica",
    genetics: "Purple Urkle × Big Bud",
    thc: "17–23%", cbd: "<1%",
    rating: 4.6, reviews: 304,
    flavors: ["Uva", "Frutas", "Doce"],
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
    lotes: [
      lote("gd-1", "abrace", "L-2405-G", 20.4, 0.3, "abr/2025", ["Mirceno", "Linalol"], true),
      lote("gd-2", "verde", "VV-051", 18.1, 0.5, "mai/2025", ["Mirceno", "Humuleno"], false),
    ],
  },
  {
    id: "cbg",
    name: "White CBG",
    type: "cbd",
    genetics: "CBG-rico (linhagem própria)",
    thc: "<1%", cbd: "1% / CBG 14%",
    rating: 4.4, reviews: 142,
    flavors: ["Limão", "Herbal", "Pinho"],
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
    lotes: [
      lote("cbg-1", "apepi", "L-CBG-07", 0.5, 1.2, "mar/2025", ["Pineno", "Limoneno"], true),
    ],
  },
  {
    id: "blueberry",
    name: "Blueberry",
    type: "indica",
    genetics: "Afghani × Thai × Purple Thai",
    thc: "15–20%", cbd: "<1%",
    rating: 4.6, reviews: 267,
    flavors: ["Mirtilo", "Doce", "Frutas"],
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
    lotes: [
      lote("bb-1", "cannab", "CB-230", 18.4, 0.4, "mai/2025", ["Mirceno", "Pineno"], true),
      lote("bb-2", "cultive", "L-7766", 16.9, 0.5, "abr/2025", ["Mirceno", "Limoneno"], true),
    ],
  },
];

// ----- Reviews ---------------------------------------------------------
function rv(o) { return o; }
const REVIEWS = [
  rv({ id: "r1", strain: "charlotte", lote: "ch-1", author: "Marina R.", initials: "MR", rating: 5, date: "12 mai 2025", helpful: 47, condition: "ansiedade", form: "oleo", effects: ["calmante", "foco"], flavor: ["Cítrico"], dose: "0,5 ml · 2x/dia", text: "Mudou minha rotina. Tomo de manhã e consigo trabalhar sem aquela névoa de ansiedade. O lote da Abrace veio com laudo certinho, 13% de CBD como prometido. Zero psicoatividade." }),
  rv({ id: "r2", strain: "charlotte", lote: "ch-3", author: "Paulo Henrique", initials: "PH", rating: 4, date: "28 abr 2025", helpful: 31, condition: "epilepsia", form: "oleo", effects: ["calmante"], flavor: ["Terroso"], dose: "1 ml · noite", text: "Uso para o meu filho (autorização Anvisa). Reduziu bastante as crises. Esse lote da Cultive tinha um pouco mais de THC (3,2%), notei ele mais sonolento — fiquei de olho." }),
  rv({ id: "r3", strain: "northern", lote: "nl-1", author: "Dani S.", initials: "DS", rating: 5, date: "02 mai 2025", helpful: 58, condition: "insonia", form: "vapor", effects: ["sono", "relaxante"], flavor: ["Doce", "Pinho"], dose: "0,1 g · 21h", text: "Pra quem tem insônia crônica: isso aqui é um abraço. Vaporizo meia hora antes de dormir e apago. A flor da Verde Vida veio densa e cheirosa." }),
  rv({ id: "r4", strain: "acdc", lote: "ac-1", author: "Cláudia M.", initials: "CM", rating: 5, date: "19 abr 2025", helpful: 64, condition: "fibromialgia", form: "vapor", effects: ["alivio_dor", "calmante"], flavor: ["Terroso", "Doce"], dose: "0,15 g · manhã", text: "Fibromialgia há 9 anos. ACDC foi a primeira coisa que me deu função sem me derrubar. Consigo cuidar da casa. Lote da Cultive impecável, alto CBD." }),
  rv({ id: "r5", strain: "sourdiesel", lote: "sd-1", author: "Rafa T.", initials: "RT", rating: 4, date: "07 mai 2025", helpful: 22, condition: "depressao", form: "vapor", effects: ["energia", "criativo"], flavor: ["Cítrico"], dose: "0,1 g · manhã", text: "Tomo cuidado por ser bem cerebral — em dia ruim de ansiedade evito. Mas pra apatia e falta de vontade, me tira da cama. Não usar à noite!" }),
  rv({ id: "r6", strain: "harlequin", lote: "ha-1", author: "Beatriz L.", initials: "BL", rating: 5, date: "23 abr 2025", helpful: 39, condition: "dor", form: "vapor", effects: ["alivio_dor", "feliz"], flavor: ["Manga"], dose: "0,12 g · tarde", text: "Equilíbrio perfeito pra dor de coluna durante o trabalho. Alivia e ainda fico de bom humor, sem ficar 'chapada'. Recomendo pra quem tá começando na flor." }),
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
function assocById(id) { return ASSOCIATIONS.find(a => a.id === id); }
function strainById(id) { return STRAINS.find(s => s.id === id); }
function reviewsForStrain(id) { return REVIEWS.filter(r => r.strain === id); }

Object.assign(window, {
  CONDITIONS, EFFECTS, USAGE_FORMS, TYPE_META, ASSOCIATIONS, STRAINS, REVIEWS,
  COMMON_EFFECT_BG, condLabel, effLabel, formLabel, assocById, strainById, reviewsForStrain,
});
