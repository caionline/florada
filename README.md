# Handoff: Florada — app de reviews de cannabis medicinal

## Overview
**Florada** é um web-app responsivo onde pacientes de cannabis medicinal avaliam strains/cultivares, associações/fornecedores, óleos e — crucialmente — **lotes específicos com laudo (COA)**. É um "Leafly nacional", focado no mercado associativo brasileiro.

O diferencial central: cada avaliação é atrelada ao **lote** que o paciente recebeu da associação, com THC/CBD do laudo verificado e terpenos. Pacientes filtram e descobrem strains **pela condição médica que tratam** (dor, ansiedade, epilepsia, etc.), não por marketing.

## About the Design Files
Os arquivos deste bundle são **referências de design feitas em HTML/React (Babel in-browser)** — protótipos que mostram a aparência e o comportamento pretendidos, **não código de produção para copiar diretamente**.

A tarefa é **recriar estes designs no ambiente do seu codebase** (React, Vue, Next, etc.) usando os padrões, libs e design system já estabelecidos lá. Se ainda não houver ambiente, escolha o framework mais adequado (recomendação: **React + Vite + TypeScript**, com um state manager leve e React Router) e implemente os designs nele.

O protótipo usa React 18 via CDN com Babel standalone (transpila JSX no browser) — ótimo para prototipar, **não** para produção. Migre o JSX para um build real (Vite/Next) e troque os dados mock por API.

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, raios, sombras e interações estão finais. Recrie pixel-perfect usando as libs do seu codebase. As **fotos de flor são placeholders** (tiles listrados com legenda mono) — devem ser substituídas por imagens reais de inflorescência.

---

## Design Tokens

Todos os tokens estão definidos como CSS custom properties em `:root` dentro de `Florada.html`. Cores em **oklch** (tom quente, neutro creme + primária sálvia + acento âmbar).

### Cores — tema claro (default "salvia")
| Token | Valor oklch | Uso |
|---|---|---|
| `--bg` | `oklch(0.975 0.013 92)` | Fundo da página (creme) |
| `--bg-2` | `oklch(0.955 0.016 92)` | Fundo alternativo |
| `--surface` | `oklch(0.995 0.005 95)` | Cards, superfícies |
| `--surface-2` | `oklch(0.982 0.011 92)` | Superfície secundária / zebra |
| `--ink` | `oklch(0.27 0.022 80)` | Texto principal |
| `--ink-soft` | `oklch(0.44 0.02 80)` | Texto secundário |
| `--muted` | `oklch(0.56 0.018 85)` | Texto terciário / legendas |
| `--line` | `oklch(0.9 0.012 90)` | Bordas suaves |
| `--line-2` | `oklch(0.84 0.016 88)` | Bordas mais marcadas |
| `--primary` | `oklch(0.5 0.072 152)` | Verde sálvia (ação principal) |
| `--primary-deep` | `oklch(0.38 0.06 152)` | Verde escuro (hover/texto) |
| `--primary-soft` | `oklch(0.93 0.03 152)` | Verde claro (bordas selecionadas) |
| `--primary-tint` | `oklch(0.96 0.018 152)` | Verde tint (fundos selecionados) |
| `--accent` | `oklch(0.68 0.13 56)` | Âmbar/terracota (CTA secundário, sabores) |
| `--accent-deep` | `oklch(0.55 0.12 48)` | Âmbar escuro |
| `--accent-soft` | `oklch(0.94 0.04 70)` | Âmbar tint |
| `--star` | `oklch(0.72 0.13 75)` | Estrelas de avaliação |

### Cores — tema escuro (modo noturno, ver `applyTheme` em `main.jsx`)
`--bg oklch(0.21 0.012 250)`, `--surface oklch(0.25 0.013 250)`, `--ink oklch(0.95 0.008 250)`, `--line oklch(0.34 0.012 250)`, etc. (neutro frio azulado).

### Temas alternativos (tweakable)
- **salvia** (default): primária `0.5 0.072 152`, acento `0.68 0.13 56`
- **terracota**: primária `0.55 0.11 40`, acento `0.62 0.09 200` (azul)
- **ametista**: primária `0.5 0.1 300`, acento `0.68 0.13 95`

### Cores por tipo de strain (`TYPE_META` em `data.jsx`)
| Tipo | Label | Tint |
|---|---|---|
| `indica` | Índica | `oklch(0.62 0.10 300)` (roxo) |
| `sativa` | Sativa | `oklch(0.72 0.12 70)` (amarelo) |
| `hibrida` | Híbrida | `oklch(0.6 0.09 150)` (verde) |
| `cbd` | Rica em CBD | `oklch(0.66 0.11 40)` (laranja) |

### Cores por efeito (`COMMON_EFFECT_BG` em `data.jsx`)
relaxante `oklch(0.6 0.08 290)`, calmante `oklch(0.6 0.08 240)`, alivio_dor `oklch(0.62 0.1 30)`, sono `oklch(0.5 0.07 280)`, foco `oklch(0.6 0.09 200)`, energia `oklch(0.7 0.12 70)`, euforico `oklch(0.68 0.12 350)`, apetite `oklch(0.66 0.11 45)`, criativo `oklch(0.62 0.1 320)`, feliz `oklch(0.72 0.11 95)`.

### Tipografia
- **Títulos** (`--font-head`): `"Schibsted Grotesk"`, pesos 400–900. `line-height: 1.08`, `letter-spacing: -0.02em`, weight 700+.
- **Corpo** (`--font-body`): `"Hanken Grotesk"`, pesos 400–700. `line-height: 1.5`.
- **Mono/dados** (`--font-mono`): `"Space Mono"`, 400/700. Usado em códigos de lote (L-2406-A), THC/CBD %, datas.
- Escala usada: h1 hero `clamp(28px,5vw,42px)`; h1 detalhe `clamp(30px,5vw,42px)`; h2 seção `22px`; h3 card `17–18px`; corpo `14.5–16px`; legendas `12–13px`; `.label-cap` = 11.5px uppercase, `letter-spacing 0.07em`, weight 700.

### Espaçamento / forma
- Raios: `--radius: 16px`, `--radius-sm: 10px`, `--radius-lg: 24px` (modo "reto": 6/4/8px).
- Sombras: `--shadow-sm`, `--shadow`, `--shadow-lg` (todas em oklch com alpha baixo — ver `:root`).
- Gaps de grid: cards 18px, seções 24–28px.
- `--maxw: 1180px` (container `.wrap`, padding lateral 24px → 16px no mobile).
- Botões: pill (`border-radius: 999px`), padding `11px 18px` (sm: `7px 13px`).
- Chips: pill, padding `5px 11px`, fonte 12.5px weight 600.

---

## Screens / Views

Navegação é por estado (não há rotas reais). Estado `route` + `param` em `App` (`main.jsx`), com pilha `stack` para "Voltar". **Implemente com rotas reais** (`/`, `/descobrir`, `/strain/:id`, `/avaliar`, `/comparar`, `/perfil`).

### 1. Feed / Início (`FeedScreen`, screens.jsx)
- **Propósito**: descoberta. Landing logada.
- **Layout**: container 1180px. Hero (gradiente `--primary-deep`→`--primary`, raio lg, padding 40×36, listras diagonais a 14% opacidade), com badge "Avaliações com laudo de lote verificado", h1, parágrafo e 2 CTAs. Abaixo: faixa de chips "Encontre pelo que você trata" (Todas + 9 condições, filtro toggle). Grid de strains `repeat(auto-fill, minmax(248px,1fr))` gap 18. Seção "Associações em destaque": grid `minmax(320px,1fr)`.
- **Comportamento**: clicar chip de condição filtra e reordena por eficácia naquela condição; senão ordena por rating.

### 2. Descobrir / Busca (`SearchScreen`, screens.jsx)
- **Propósito**: busca e filtro avançado.
- **Layout**: grid `262px 1fr` gap 28. Sidebar sticky (top 84) com Filtros: Condição (lista), Tipo (chips), Efeitos desejados (chips de efeito). Coluna direita: barra de busca (pill, ícone lupa, 46px alt) + select de ordenação; contador de resultados; grid de cards `minmax(240px,1fr)`. **No mobile (≤760px) a sidebar vira estática e o grid colapsa em 1 coluna.**
- **Filtros**: texto (nome/genética/sabor), condição (1), tipo (multi), efeitos (multi — strain precisa ter TODOS os efeitos marcados). Ordenação: rating / nº reviews / eficácia p/ condição. Estado vazio com ícone + mensagem.

### 3. Detalhe da strain (`StrainDetail` + `LotesPanel`, screens.jsx)
- **Propósito**: tudo sobre uma cultivar; ponto de entrada para avaliar.
- **Layout cabeçalho**: **flexbox com wrap** (NÃO grid — ver nota de bug abaixo). Imagem `flex: 1 1 280px; max-width: 360px; height: 280px`. Info `flex: 2 1 360px`. Info contém: TypeBadge + genética (mono), h1 grande, estrelas+contagem, blurb, 3 `CannaPill` (THC/CBD/disponível em N assoc.), botões (Avaliar/Salvar/Share).
- **Abas**: "Efeitos & uso" | "Lotes & laudos" | "Avaliações (N)". Borda inferior, aba ativa com `border-bottom: 2.5px solid --primary`.
  - **Efeitos & uso**: 2 cards lado a lado (`.two-col`, colapsa em ≤920px). Esquerda: barras de "Efeitos relatados" (label 120px + track 7px + % mono) e chips de sabor. Direita: barras "Ajuda mais com" (condições) + nota informativa.
  - **Lotes & laudos**: grid `1fr 1.3fr`. Esquerda: lista de cards de lote selecionáveis (selecionado = borda `--primary` 2px + fundo tint), cada um com código mono, selo "Laudo verificado"/"Sem laudo", associação, cidade/UF, data, THC/CBD. Direita: painel de laudo (COA) do lote selecionado — header com ícone flask, 3 CannaPill (THC/CBD/razão CBD:THC), terpenos (chips com ícone gota), botões "Ver laudo (PDF)" e "Avaliar este lote".
  - **Avaliações**: botão "Escrever avaliação" + lista de `ReviewCard`.

### 4. Escrever avaliação (`WriteReview`, screens2.jsx)
- **Propósito**: formulário de review, anônimo para outros pacientes.
- **Layout**: coluna única max 720px. 5 cards numerados:
  1. **O que você usou**: select strain + select lote/associação (lote reseta ao trocar strain).
  2. **Nota geral**: 5 estrelas clicáveis (36px) com hover + label ("Ruim".."Excelente").
  3. **Para que e como**: chips de condição (single-select) + chips de forma de uso (single-select).
  4. **Efeitos sentidos** (opcional): chips de efeito (multi) + chips de sabor (multi).
  5. **Seu relato**: input de dose/horário + textarea (mín. 13 chars, contador).
- **Validação**: `rating > 0 && condição && relato.trim().length > 12`. Botão desabilitado (opacity 0.5) até válido. Ao publicar → tela de sucesso (ícone check, CTAs "Ver a strain" / "Meu perfil"). A review entra em `userReviews` e aparece no perfil.

### 5. Comparar (`CompareScreen`, screens2.jsx)
- **Propósito**: comparação lado a lado antes de escolher.
- **Layout**: toggle segmentado "Associações" | "Lotes de uma strain".
  - **Associações**: chips para escolher até 3; tabela grid (`170px repeat(N, minmax(170px,1fr))`) com linhas: Nota geral (estrelas), Avaliações, Membros, Strains ofertadas, Desde, Laudo em todo lote (check/—). Linhas zebradas. Scroll horizontal em telas estreitas.
  - **Lotes**: select de strain; tabela comparando todos os lotes daquela strain: THC, CBD, razão CBD:THC, colheita, terpenos, laudo.

### 6. Perfil (`ProfileScreen`, screens2.jsx)
- **Propósito**: relatos e salvos do usuário.
- **Layout**: card de header (avatar 76px, nome, "Paciente desde…", chips de condições acompanhadas + "+ condição", 3 stats: avaliações/salvas/úteis). Abas "Minhas avaliações (N)" | "Salvas (N)". Aba reviews: lista de `ReviewCard` (com `showStrain`) ou estado vazio com CTA. Aba salvas: grid de StrainCard ou estado vazio.

---

## Componentes (components.jsx)
- `Icon({name,size,stroke})` — set de ícones SVG stroke (home, search, compare, user, bell, star, leaf, check, shield, drop, flask, map, chevron, back, filter, plus, heart/heartfill, thumb, share, doc, info, close). **No seu codebase, troque por sua lib de ícones** (lucide/heroicons).
- `Mark({size})` — logo (círculo verde + folha branca + ponto âmbar). Placeholder — substitua pelo logo real.
- `Stars({value,size,showNum,count})` — estrelas com preenchimento fracionário.
- `TypeBadge({type})` — chip colorido por tipo de strain.
- `BudTile({type,label,icon})` — **placeholder de imagem** (gradiente tint + listras + ícone + legenda mono). **Substituir por `<img>` real.**
- `EffectBar({label,pct,color})` — barra de progresso de efeito.
- `CannaPill({k,v,accent})` — pílula de dado de canabinoide.
- `StrainCard({strain,onOpen,fav,onFav})` — card de strain (imagem, badge, fav heart, nome+rating, THC/CBD chips, blurb 2 linhas, efeito+condição no rodapé).
- `EffectTag({id,on,onClick})` — chip de efeito (com bolinha colorida quando off).
- `ReviewCard({r,showStrain})` — card de avaliação (autor, data, condição, estrelas, texto, chips de efeito/forma/sabor, faixa de lote+laudo, dose, botão "Útil").
- `AssocRow({assoc,onOpen})` — linha de associação.
- `SectionHead({title,sub,action})` — cabeçalho de seção.

## Interactions & Behavior
- **Navegação**: `go(name, param)` empilha em `stack`; `go("back")` desempilha; sempre `scrollTo(0,0)`. → trocar por router.
- **Favoritos**: `Set` em `favs` (default contém `acdc`, `northern`). Toggle pelo heart em cards/detalhe.
- **Reviews do usuário**: `addReview` faz prepend em `userReviews`; refletido no perfil e contadores.
- **Entrada animada**: keyframe `fadeUp` anima **apenas transform** (translateY 13→0), gateado em `@media (prefers-reduced-motion: no-preference)`. **Importante**: base sempre visível (sem opacity:0) para não sumir em print/PDF/reduced-motion.
- **Hover de card**: translateY(-2px) + shadow + borda.
- **Responsivo**: ≤920px `.two-col` colapsa; cabeçalho de detalhe usa flex-wrap (colapsa sozinho); ≤860px nav some e aparece bottom-nav mobile (`.mobilenav`, 5 itens) + `.pad-bottom`; ≤760px sidebar de busca vira estática.

## State Management
Estado local em `App` (`main.jsx`): `route`, `param`, `stack`, `favs (Set)`, `userReviews (array)`. Telas têm estado próprio (filtros, aba ativa, lote selecionado, campos do form). **Em produção**: rotas reais + fetch de strains/lotes/reviews/associações da API; favoritos e reviews persistidos no backend; auth real (hoje o usuário é fixo "VC / Você").

## Modelo de dados (data.jsx)
- `CONDITIONS` (9), `EFFECTS` (10), `USAGE_FORMS` (5), `TYPE_META` (4 tipos).
- `ASSOCIATIONS`: `{id,name,city,uf,members,strains,rating,reviews,verified,since,blurb}`.
- `STRAINS`: `{id,name,type,genetics,thc,cbd,rating,reviews,flavors[],effects[{id,pct}],conditions[{id,pct}],blurb,lotes[]}`.
- `lote`: `{id,assoc,code,thc(num),cbd(num),date,terps[],verified}`.
- `REVIEWS`: `{id,strain,lote,author,initials,rating,date,helpful,condition,form,effects[],flavor[],dose,text}`.
- Helpers: `condLabel`, `effLabel`, `formLabel`, `assocById`, `strainById`, `reviewsForStrain`.

## Tweaks (main.jsx)
Painel de tweaks (toolbar) com: **Tema** (salvia/terracota/ametista), **Modo noturno**, **Cantos** (arredondado/reto), **Tamanho do texto** (14–19px). `applyTheme()` seta as CSS vars no `:root`. Útil como referência de temas; não precisa portar.

## Assets
- **Fontes**: Google Fonts — Schibsted Grotesk, Hanken Grotesk, Space Mono.
- **Ícones**: SVG inline (recriar com lib do projeto).
- **Imagens de flor**: nenhuma real — placeholders. Providenciar fotos de inflorescência por strain (e por lote, idealmente).
- **Logo**: placeholder `Mark` — substituir.

## Files
- `Florada.html` — shell, tokens CSS (`:root`), fontes, estilos globais, media queries, carrega os scripts.
- `data.jsx` — dados mock + constantes + helpers.
- `components.jsx` — componentes compartilhados.
- `screens.jsx` — Feed, Busca, Detalhe (+ LotesPanel).
- `screens2.jsx` — Escrever avaliação, Comparar, Perfil.
- `main.jsx` — App (navegação/estado) + Header + MobileNav + Tweaks + temas.
- `tweaks-panel.jsx` — shell do painel de tweaks (infra de protótipo; não portar).

## Nota de implementação importante
O cabeçalho do detalhe foi feito com **flexbox + wrap** (não CSS grid) de propósito: um grid `minmax(0,320px) 1fr` colapsava de forma inconsistente em larguras intermediárias. Ao recriar, prefira flex-wrap ou grid com `auto-fit/minmax` bem testado. Animações de entrada nunca devem partir de `opacity:0` sem garantir o estado final visível (quebra em print/PDF/reduced-motion).
