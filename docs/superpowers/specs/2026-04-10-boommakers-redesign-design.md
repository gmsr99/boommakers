# BoomMakers Website Redesign — Design Spec
**Date:** 2026-04-10  
**Approach:** BoomMakers Elevated (Abordagem C)

---

## Objective

Elevate the BoomMakers website to be more professional, institutional, and appealing to Portuguese clinics and SMEs (PMEs). Add web development and app services alongside existing automation, introduce a new client acquisition campaign (50% discount), and add a portfolio section with real client work.

**Reference site:** Digital Xperience (digitalxperience.pt) — dark + amber, bold typography, services grid, portfolio, partners logos.

---

## Visual Identity

### Color System
| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Page background (keep) |
| `--color-accent` | `#F97316` | Primary accent — CTAs, borders, highlights (replaces gold `#D9C27A`) |
| `--color-accent-2` | `#6366F1` | Secondary accent — service badges, tags |
| `--color-white` | `#FFFFFF` | Primary text, headings |
| `--color-gray-*` | `#A3A3A3`, `#525252`, `#262626` | Keep existing scale |

**Remove:** `#D9C27A` (gold) — replaced by `#F97316` throughout.

### Component Changes
- `btn-primary` → orange background `#F97316`, dark text `#0A0A0A`
- `gradient-text` → orange-to-amber gradient (`#F97316` → `#FBBF24`)
- `shadow-orange` → real orange glow: `0 0 30px rgba(249,115,22,0.25)`
- `gradient-border::before` → uses orange in gradient
- `.tag` → two variants: orange (campaign/highlight), indigo (services/tech)

### Typography
- Font: Inter (unchanged)
- Hero title: `font-black`, very large, orange gradient on key word
- Section titles: `font-black`, 4xl–5xl
- Body: `text-gray-400`, relaxed line-height

---

## Page Structure (new order)

```
Navbar          ← add "Portfólio" link, update CTA color
Hero            ← reformulate copy and visual
Campanha 50%    ← NEW — immediately after Hero
Serviços        ← NEW — 3 equal service cards
Portfólio       ← NEW — client work showcase
Sectores        ← keep, minor copy adjustments
Como funciona   ← keep
ROI Calculator  ← keep
Preços          ← keep
Logos Clientes  ← NEW — logo bar social proof
Contacto        ← keep, add "Sites" to sector list
Footer          ← update links + tagline
```

**Removed sections:** StatsBar, Problem, AutomationDemo — replaced by the new higher-value sections.

---

## Section Specs

### Navbar
- Add nav link: `{ label: 'Portfólio', href: '#portfolio' }`
- `btn-primary` → orange
- Logo: keep

### Hero
- Tag line: `Equipa jovem · Web · Automação · Apps`
- H1: **"O parceiro digital das PMEs portuguesas"**
- TypeAnimation subtitle: adds "PMEs" and "empresas em crescimento" to existing list
- 3 mini service badges below headline: `Sites Profissionais` · `Automação de Processos` · `Apps à Medida`
- CTA primary (orange): "Ver campanha →" (scrolls to #campanha)
- CTA ghost: "Conhecer os serviços" (scrolls to #servicos)
- Keep particle canvas background
- Right side: replace LiveFeed with a visual grid showing the 3 service icons with short labels (static, clean)
- Stats row: keep (2–4 semanas, ROI, 24/7)

### Campanha 50% (NEW — id="campanha")
- Full-width section, dark background with orange gradient border card
- Badge: `🔥 Campanha de Angariação — Vagas Limitadas`
- H2: **"O teu site profissional com 50% de desconto"**
- Subtitle: "Para empresas sem site ou com site desatualizado. Inclui acordo de manutenção e acompanhamento profissional."
- 3 value pillars in a row:
  - ✓ Design moderno e otimizado para mobile
  - ✓ Entrega em 3–4 semanas
  - ✓ Manutenção e suporte mensais incluídos
- Large orange CTA: "Quero aproveitar esta campanha →" (scrolls to #contacto)
- Footer note: "Sem compromisso inicial · Resposta em menos de 24h · Preços transparentes"
- Visual: subtle animated orange glow/pulse on card border

### Serviços (NEW — id="servicos")
- Tag: `O que fazemos`
- H2: **"Soluções digitais para fazer crescer o teu negócio"**
- 3-column equal grid of service cards:

**Card 1 — Sites & Lojas Online**
- Icon: globe/browser SVG
- Tag: indigo badge "Web"
- Title: "Sites & Lojas Online"
- Desc: "Presença digital que converte visitantes em clientes. Design moderno, rápido e otimizado."
- Features: Landing pages e sites institucionais · Lojas online (e-commerce) · Otimização SEO incluída
- CTA: "Saber mais →"

**Card 2 — Automação de Processos**
- Icon: lightning/zap SVG
- Tag: orange badge "Automação"
- Title: "Automação de Processos"
- Desc: "Menos trabalho manual, mais tempo para o que realmente importa no teu negócio."
- Features: Agendamentos e lembretes automáticos · Integrações WhatsApp e email · Fluxos personalizados
- CTA: "Saber mais →"

**Card 3 — Apps à Medida**
- Icon: mobile/app SVG
- Tag: indigo badge "App"
- Title: "Apps à Medida"
- Desc: "Ferramentas digitais feitas para o teu processo. Reduz custos e melhora a organização."
- Features: Apps web e mobile · Gestão interna e dashboards · Integração com sistemas existentes
- CTA: "Saber mais →"

All 3 CTAs scroll to #contacto.

### Portfólio (NEW — id="portfolio")
- Tag: `Trabalho real`
- H2: **"Projetos que falam por si"**
- Subtitle: "Alguns dos trabalhos que desenvolvemos para empresas portuguesas."

**Project cards** (5 cards with screenshots):
Each card has:
- Screenshot image (PC landscape preferred, mobile as secondary overlay)
- Client logo (top-left overlay or below image)
- Badge: "Website" / "App" / "Automação"
- Client name + one-line description

Projects:
1. **Golden Move** — `Golden Move/PC1.png` + logo — Badge: "Website" — "Plataforma de fitness e bem-estar"
2. **EmpatIA** — `EmpatIA/PC1.png` + logo — Badge: "App" — "Aplicação de inteligência emocional"
3. **NexSeed** — `NexSeed/PC1.png` + logo — Badge: "Website" — "Plataforma de investimento e inovação"
4. **App BPM RAP Nova Escola** — `App BPM RAP Nova Escola/PC1.png` + logo — Badge: "App" — "Gestão escolar e acompanhamento académico"
5. **Bordados do Sr. Lucas** — `Bordados do Sr. Lucas/mobile1.png` + logo — Badge: "Website" — "Loja online de bordados artesanais"

**Layout:** masonry-style grid or 2-3 columns. Cards use `gradient-border` style. Hover reveals description overlay with orange accent.

### Sectores (keep, minor adjustments)
- Add "Clínicas" more prominently to the tab labels
- Adjust copy to mention "PMEs" more broadly
- Keep tab interaction

### Como funciona (keep)
- No changes

### ROI Calculator (keep)
- No changes

### Preços (keep)
- Update button colors to orange

### Logos Clientes (NEW — id="clientes")
- Slim section, above Contact
- Label: "Já confiam em nós"
- 7 logos in a horizontal scrolling row (or flex-wrap centered)
- All logos in `grayscale` filter, full color on hover
- Logos: Golden Move, EmpatIA, NexSeed, App BPM RAP, Bordados Sr. Lucas, ClinicBel, MFProfissional

### Contacto (keep, minor)
- Add "Sites / Web" to the `sectors` array in Contact.jsx
- Update button to orange

### Footer
- Update tagline: "Sites, automação e apps para PMEs portuguesas."
- Add "Portfólio" to Produto links
- Update colors to orange

---

## Assets Map

```
public/Clientes/
├── Golden Move/
│   ├── Logo/Logo_GoldenMove_Transparente_V1-03.png
│   ├── PC1.png, PC2.png, Mobile1.png, Mobile2.png
├── EmpatIA/
│   ├── Logo/Logo EmpatIA_provisorio.png
│   ├── PC1.png, Mobile1.png, mobile2.png
├── NexSeed/
│   ├── Logo/logo_nexseed.png
│   ├── PC1.png, PC2.png, Mobile1.png
├── App BPM RAP Nova Escola/
│   ├── Logo/logo_fundo_transparente.png
│   ├── PC1.png, PC2.png, Mobile1.png
├── Bordados do Sr. Lucas/
│   ├── Logo/Sr.Lucas_Logo (1).png
│   ├── mobile1.png
├── ClinicBel/
│   └── Logo/logo-clinicbel.jpg
└── MFProfissional/
    └── Logo/LOGO-MF-PROFISSINAL-3.png
```

---

## Implementation Notes

- All new sections are new `.jsx` files in `src/components/sections/`
- CSS changes to `src/index.css`: update `btn-primary`, `gradient-text`, `shadow-orange`, `gradient-border`
- `tailwind.config.js`: add `accent` color (`#F97316`) and `accent2` (`#6366F1`) to theme
- `App.jsx`: add new sections in correct order, remove StatsBar/Problem/AutomationDemo imports
- `Navbar.jsx`: add Portfólio link, update CTA color
- `Footer.jsx`: update links and copy
- `Contact.jsx`: add "Sites / Web" to sectors list
- `Pricing.jsx`: update button styles to orange
- `Sectors.jsx`: adjust copy for clinics/PMEs

---

## Success Criteria

1. Site conveys institutional, modern, trustworthy tone appropriate for clinics and SMEs
2. Campaign section is immediately visible after Hero with clear value proposition
3. 3 services are equally prominent and clearly differentiated
4. Portfolio showcases real client work with screenshots and logos
5. All existing sections (Sectores, Como funciona, ROI, Preços, Contacto) preserved and functional
6. Orange `#F97316` fully replaces gold `#D9C27A` throughout
7. Client logos bar provides social proof
8. Contact form includes "Sites / Web" as a sector option
