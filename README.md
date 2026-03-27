# BoomMakers — Website

Website oficial da BoomMakers, construído em React 18 + Vite + Tailwind CSS com animações em Framer Motion.

---

## Stack

| Tecnologia | Versão | Para quê |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 | Build tool + dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 12 | Animações declarativas |
| Lenis | 1 | Smooth scroll |
| Supabase JS | 2 | Backend (leads + formulário) |
| react-type-animation | 3 | Efeito typewriter no Hero |
| react-countup | 6 | Contadores animados |

---

## Estrutura do projecto

```
boommakers-web/
├── src/
│   ├── App.jsx                          # Root — monta todas as secções
│   ├── index.css                        # CSS global + classes custom
│   ├── lib/
│   │   └── supabase.js                  # Cliente Supabase + submitLead()
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx               # Sticky nav + mobile hamburger
│       │   └── Footer.jsx               # Rodapé com links e contacto
│       ├── ui/
│       │   ├── CustomCursor.jsx         # Cursor personalizado (desktop)
│       │   ├── ScrollReveal.jsx         # Animação de entrada ao scroll
│       │   └── AnimatedCounter.jsx      # Contador animado com InView
│       └── sections/
│           ├── Hero.jsx                 # Canvas partículas + live feed
│           ├── StatsBar.jsx             # Barra de métricas laranja
│           ├── Problem.jsx              # Problemas dos clientes
│           ├── HowItWorks.jsx           # 4 passos do processo
│           ├── AutomationDemo.jsx       # Demo interativa de automação
│           ├── Sectors.jsx              # Tabs por setor
│           ├── ROICalculator.jsx        # Calculadora de ROI com sliders
│           ├── Pricing.jsx              # 3 planos + toggle anual/mensal
│           └── Contact.jsx             # Formulário multi-step 3 passos
├── supabase/
│   └── migrations/
│       └── 001_initial.sql             # Schema completo (leads, demos, RLS)
├── .env.example                        # Template de variáveis de ambiente
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Instalação e arranque local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as keys do Supabase (ver secção abaixo)

# 3. Arrancar em desenvolvimento
npm run dev
# → http://localhost:5173

# 4. Build de produção
npm run build
# → gera /dist (pasta para deploy)

# 5. Preview do build local
npm run preview
```

---

## Configurar o Supabase

**1. Criar projecto** — supabase.com → New project

**2. Correr a migration** — SQL Editor → colar conteúdo de `supabase/migrations/001_initial.sql` → Run

Cria: tabelas `leads` e `demo_requests`, índices, políticas RLS, view `pipeline_summary`.

**3. Obter as keys** — Settings → API:
- Project URL → `VITE_SUPABASE_URL`
- anon / public key → `VITE_SUPABASE_ANON_KEY`

**4. Preencher o .env:**
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

> O site funciona sem Supabase configurado — o formulário faz log no console e simula sucesso. Ideal para testes locais.

---

## Deploy rápido (Vercel)

```bash
npm i -g vercel
vercel --prod
```

Definir no painel da Vercel: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

Funciona também em Netlify, Cloudflare Pages — qualquer plataforma que sirva SPAs a partir da pasta `/dist`.

---

## Funcionalidades principais

- **Hero dinâmico** — canvas com rede de partículas interativa (repulsão com rato), live feed de eventos, typewriter animation por setor
- **ROI Calculator** — 6 sliders, cálculo em tempo real com `useMemo`, payback em meses
- **Demo de automação** — fluxo passo a passo animado (barbearia / clínica / imobiliária)
- **Sectors tabs** — conteúdo, preçário e CTA específicos por setor
- **Formulário multi-step** — 3 passos (setor → dores → contacto), integração Supabase
- **Custom cursor** — dot + ring com lerp interpolation, desativado em mobile
- **Smooth scroll** — Lenis lazy-loaded com easing exponencial

---

## Equipa

| Papel | Pessoa |
|---|---|
| Tech Lead | Gil Ribeiro — ribeiro.gil4@gmail.com |
| Criativo | Elton Malta |
| Director | Claude (BoomMakers AI Director) |
