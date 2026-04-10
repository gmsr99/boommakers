# BoomMakers Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate BoomMakers website with new brand color (orange), campaign section, 3-service grid, portfolio with client assets, and client logos bar — targeting Portuguese clinics and SMEs.

**Architecture:** New sections added as individual JSX files in `src/components/sections/`. Global CSS and Tailwind config updated first so all color changes cascade. App.jsx restructured to new section order. Old sections (StatsBar, Problem, AutomationDemo) removed.

**Tech Stack:** React 18, Tailwind CSS, Framer Motion, react-intersection-observer, Lenis

---

## File Map

### Modified files
- `tailwind.config.js` — add real orange `#F97316`, indigo `#6366F1`, fix shadows
- `src/index.css` — btn-primary orange, gradient-text orange, shadow-orange real glow, gradient-border orange
- `src/App.jsx` — restructure section order, remove old imports
- `src/components/layout/Navbar.jsx` — add Portfólio link
- `src/components/layout/Footer.jsx` — update links + tagline
- `src/components/sections/Hero.jsx` — new copy, service badges, orange CTAs, static right panel
- `src/components/sections/Contact.jsx` — add "Sites / Web" to sectors list
- `src/components/sections/Sectors.jsx` — minor copy tweak for PMEs/clinics
- `src/components/sections/HowItWorks.jsx` — update step numbers/accent color
- `src/components/sections/Pricing.jsx` — btn colors cascade from CSS, minor badge tweak

### New files
- `src/components/sections/Campanha.jsx` — 50% discount campaign section
- `src/components/sections/Servicos.jsx` — 3-service grid (Sites, Automação, Apps)
- `src/components/sections/Portfolio.jsx` — client work showcase with screenshots + logos
- `src/components/sections/LogosClientes.jsx` — client logo bar with hover effect

---

## Task 1: Design Tokens — Tailwind + CSS

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Update tailwind.config.js**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA6C0A',
        },
        accent2: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
        },
        dark: { DEFAULT: '#0A0A0A', 100: '#111111', 200: '#1A1A1A', 300: '#242424' },
        card: '#141414',
        border: '#242424',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-orange': 'pulse-orange 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,115,22,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(249,115,22,0.25)' },
        },
        'pulse-orange': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(249,115,22,0)' },
        },
      },
      boxShadow: {
        'orange': '0 0 30px rgba(249,115,22,0.25)',
        'orange-lg': '0 0 60px rgba(249,115,22,0.35)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update src/index.css design tokens**

Replace only the `@layer components` block and the `/* Cursor */` and other CSS sections — keep `@import` and `@tailwind` directives. Full file replacement:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; }
  body { @apply bg-dark text-white antialiased; overflow-x: hidden; }
  ::selection { background: rgba(249,115,22,0.25); color: #fff; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #F97316; border-radius: 2px; }
}

@media (hover: hover) and (pointer: fine) {
  html, body, body * {
    cursor: none !important;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-accent text-dark font-semibold px-6 py-3 rounded-xl
           transition-all duration-200 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-orange active:scale-95 select-none cursor-none;
  }
  .btn-ghost {
    @apply inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-6 py-3 rounded-xl
           transition-all duration-200 hover:bg-white/5 hover:border-white/30 hover:-translate-y-0.5 select-none cursor-none;
  }
  .btn-dark {
    @apply inline-flex items-center gap-2 border border-border text-gray-400 font-semibold px-6 py-3 rounded-xl
           transition-all duration-200 hover:border-white/20 hover:text-white select-none cursor-none;
  }
  .card {
    @apply bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-white/10;
  }
  .tag {
    @apply inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-widest
           bg-white/5 border border-white/10 rounded-full px-3 py-1;
  }
  .tag-orange {
    @apply inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-widest
           bg-accent/10 border border-accent/25 rounded-full px-3 py-1;
  }
  .tag-indigo {
    @apply inline-flex items-center gap-1.5 text-accent2 text-xs font-bold uppercase tracking-widest
           bg-accent2/10 border border-accent2/25 rounded-full px-3 py-1;
  }
  .gradient-text {
    background: linear-gradient(135deg, #F97316 0%, #FBBF24 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glass { background: rgba(14,14,14,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
  .grid-overlay {
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .gradient-border {
    position: relative; background: #141414; border-radius: 16px;
  }
  .gradient-border::before {
    content: ''; position: absolute; inset: -1px; border-radius: 17px;
    background: linear-gradient(135deg, rgba(249,115,22,0.35), transparent 50%, rgba(249,115,22,0.08));
    z-index: -1;
  }
}

/* Cursor */
.cursor-dot, .cursor-ring {
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
  border-radius: 50%; transform: translate(-50%,-50%);
}
.cursor-dot { width: 6px; height: 6px; background: #F97316; }
.cursor-ring {
  width: 28px; height: 28px; border: 1.5px solid rgba(249,115,22,0.5);
  transition: width 0.25s, height 0.25s, border-color 0.25s;
  z-index: 9998;
}
.cursor-ring.expanded { width: 50px; height: 50px; border-color: rgba(249,115,22,0.9); }

/* Orbs */
@keyframes orb { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-15px) scale(1.08)} }
@keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,18px) scale(0.92)} }
.orb-1 { animation: orb 9s ease-in-out infinite; }
.orb-2 { animation: orb2 12s ease-in-out infinite; }

/* Feed items */
@keyframes feed-in { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
.feed-item { animation: feed-in 0.35s ease forwards; }

/* SVG path draw */
@keyframes draw { to{stroke-dashoffset:0} }
.draw-path { animation: draw 1.2s ease forwards; }

/* Shimmer */
@keyframes shimmer {
  0%{background-position:-200% center} 100%{background-position:200% center}
}
.shimmer {
  background: linear-gradient(90deg, transparent 25%, rgba(249,115,22,0.06) 50%, transparent 75%);
  background-size: 200% auto; animation: shimmer 2.5s linear infinite;
}

/* Noise */
.noise::after {
  content:''; position:absolute; inset:0; pointer-events:none; opacity:0.3;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}

/* Floating animation */
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.float { animation: float 5s ease-in-out infinite; }
.float-2 { animation: float 7s ease-in-out infinite 1s; }

/* Campaign pulse border */
@keyframes campaign-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
.campaign-glow::before {
  content: ''; position: absolute; inset: -1px; border-radius: 17px;
  background: linear-gradient(135deg, rgba(249,115,22,0.7), rgba(251,191,36,0.4) 50%, rgba(249,115,22,0.2));
  z-index: -1;
  animation: campaign-pulse 2.5s ease-in-out infinite;
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -20
```

Expected: build succeeds, no errors.

- [ ] **Step 4: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add tailwind.config.js src/index.css && git commit -m "feat: update design tokens — orange accent, indigo secondary, btn-primary orange"
```

---

## Task 2: Navbar Update

**Files:**
- Modify: `src/components/layout/Navbar.jsx`

- [ ] **Step 1: Add Portfólio link to links array and update CTA**

In `Navbar.jsx`, replace the `links` array and CTA button:

```jsx
const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços', href: '#precos' },
]
```

The CTA `btn-primary` button already picks up orange from CSS — no change needed there.

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/layout/Navbar.jsx && git commit -m "feat: add Portfólio and Serviços nav links"
```

---

## Task 3: Hero Rewrite

**Files:**
- Modify: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Rewrite Hero.jsx**

Replace the entire file:

```jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let mouse = { x: w / 2, y: h / 2 }
    let raf

    const N = Math.floor((w * h) / 14000)
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    const onMouse = (e) => { const rect = canvas.getBoundingClientRect(); mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top } }
    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouse)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) { p.vx += (dx / dist) * 0.08; p.vy += (dy / dist) * 0.08 }
        p.vx *= 0.99; p.vy *= 0.99
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${p.opacity * 0.35})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.18
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(249,115,22,${alpha})`
            ctx.lineWidth = 0.8; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', onResize); canvas.removeEventListener('mousemove', onMouse); cancelAnimationFrame(raf) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const services = [
  { icon: '🌐', label: 'Sites & Lojas Online', desc: 'Design moderno que converte' },
  { icon: '⚡', label: 'Automação de Processos', desc: 'Menos trabalho, mais resultados' },
  { icon: '📱', label: 'Apps à Medida', desc: 'Ferramentas para o teu negócio' },
]

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark noise">
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
        <ParticleCanvas />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none orb-1"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none orb-2"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <div className="tag-orange mb-6">
                Equipa jovem · Web · Automação · Apps
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-none tracking-tight mb-2">
                <span className="gradient-text block" style={{ lineHeight: 1.05 }}>O parceiro digital</span>
                <span className="block text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mt-2 text-white">
                  das PMEs portuguesas
                </span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 mb-8">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Criamos soluções digitais para{' '}
                <span className="text-white font-semibold">
                  <TypeAnimation
                    sequence={[
                      'clínicas.', 2000,
                      'barbearias.', 2000,
                      'imobiliárias.', 2000,
                      'restaurantes.', 2000,
                      'PMEs portuguesas.', 2500,
                      'empresas em crescimento.', 2000,
                    ]}
                    wrapper="span"
                    speed={60}
                    repeat={Infinity}
                  />
                </span>
              </p>
              <p className="text-gray-400 text-base mt-3">
                Sites, automação e apps que reduzem custos, atraem mais clientes e libertam a tua equipa para o que realmente importa.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('#campanha')} className="btn-primary text-base px-7 py-3.5" data-hover>
                Ver campanha 50% →
              </button>
              <button onClick={() => scrollTo('#servicos')} className="btn-ghost text-base px-7 py-3.5" data-hover>
                Conhecer os serviços
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-6">
              {[
                { n: '2–4', label: 'semanas para primeiro entregável' },
                { n: '7+', label: 'clientes e projetos lançados' },
                { n: '24/7', label: 'automações a correr sem a equipa' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-2xl font-black text-accent">{n}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — service cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:flex flex-col gap-4"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
                className="gradient-border p-5 flex items-center gap-4 hover:shadow-orange transition-shadow duration-300"
                data-hover
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-base">{s.label}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{s.desc}</div>
                </div>
                <div className="ml-auto text-accent opacity-60">→</div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-2 p-4 rounded-xl border border-accent/20 bg-accent/5 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="text-sm text-accent font-semibold">Campanha ativa — 50% desconto em sites</span>
              <button onClick={() => scrollTo('#campanha')} className="ml-auto text-xs text-accent/70 hover:text-accent transition-colors cursor-none" data-hover>
                Ver →
              </button>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-600 uppercase tracking-widest">Descobre mais</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-accent/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/sections/Hero.jsx && git commit -m "feat: rewrite Hero — new positioning, service cards, orange accent"
```

---

## Task 4: Campanha Section (NEW)

**Files:**
- Create: `src/components/sections/Campanha.jsx`

- [ ] **Step 1: Create Campanha.jsx**

```jsx
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const pillars = [
  { icon: '✓', text: 'Design moderno, responsivo e otimizado para mobile' },
  { icon: '✓', text: 'Entrega em 3 a 4 semanas após briefing' },
  { icon: '✓', text: 'Acordo de manutenção e suporte mensal incluído' },
]

export default function Campanha() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="py-16 bg-dark relative overflow-hidden" id="campanha">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="campaign-glow gradient-border relative p-8 md:p-12">

            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tag-orange text-sm px-4 py-1.5">
                🔥 Campanha de Angariação
              </span>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                Vagas limitadas · Válida até preenchimento
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  O teu site profissional com{' '}
                  <span className="gradient-text">50% de desconto</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Para empresas sem site ou com site desatualizado. A tua presença online merece melhor — e nós ajudamos a chegar lá, com manutenção e acompanhamento profissional incluídos.
                </p>

                <div className="space-y-4 mb-8">
                  {pillars.map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-accent text-xs font-bold">{icon}</span>
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => scrollTo('#contacto')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center shadow-orange"
                  data-hover
                >
                  Quero aproveitar esta campanha →
                </motion.button>

                <p className="text-gray-600 text-xs mt-4">
                  Sem compromisso inicial · Resposta em menos de 24h · Preços transparentes
                </p>
              </div>

              {/* Right — pricing visual */}
              <div className="flex flex-col gap-4">
                <div className="bg-dark-200 border border-border rounded-2xl p-6 text-center">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Preço normal</div>
                  <div className="text-3xl font-black text-gray-500 line-through mb-1">€1.200+</div>
                  <div className="text-gray-600 text-sm">Site institucional completo</div>
                </div>

                <div className="bg-accent/10 border-2 border-accent/40 rounded-2xl p-6 text-center relative overflow-hidden shadow-orange">
                  <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-black px-4 py-1.5 rounded-bl-xl">
                    CAMPANHA
                  </div>
                  <div className="text-xs font-mono text-accent uppercase tracking-widest mb-3">Preço campanha</div>
                  <div className="text-5xl font-black text-white mb-1">€600+</div>
                  <div className="text-accent text-sm font-semibold">+ manutenção mensal incluída</div>
                  <div className="mt-4 pt-4 border-t border-accent/20 text-xs text-gray-400">
                    Poupas até 50% no investimento inicial
                  </div>
                </div>

                <div className="bg-dark-200 border border-border rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent2/10 border border-accent2/20 flex items-center justify-center shrink-0">
                    <span className="text-accent2 text-sm">🤝</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Acompanhamento mensal</div>
                    <div className="text-gray-500 text-xs mt-0.5">Manutenção, atualizações e suporte incluídos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/sections/Campanha.jsx && git commit -m "feat: add Campanha section — 50% discount campaign with pricing visual"
```

---

## Task 5: Serviços Section (NEW)

**Files:**
- Create: `src/components/sections/Servicos.jsx`

- [ ] **Step 1: Create Servicos.jsx**

```jsx
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const services = [
  {
    id: 'sites',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    badge: 'Web',
    badgeClass: 'tag-indigo',
    title: 'Sites & Lojas Online',
    desc: 'Presença digital que converte visitantes em clientes. Design moderno, rápido e otimizado para aparecer no Google.',
    features: [
      'Landing pages e sites institucionais',
      'Lojas online (e-commerce)',
      'Otimização SEO incluída',
      'Adaptado a mobile e tablet',
    ],
    color: '#6366F1',
  },
  {
    id: 'automacao',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    badge: 'Automação',
    badgeClass: 'tag-orange',
    title: 'Automação de Processos',
    desc: 'Menos trabalho manual, mais tempo para o que realmente importa. Agendamentos, follow-ups e comunicações a correr sozinhas.',
    features: [
      'Agendamentos e lembretes automáticos',
      'Integrações WhatsApp e email',
      'Fluxos personalizados ao teu negócio',
      'Dashboard de monitorização',
    ],
    color: '#F97316',
  },
  {
    id: 'apps',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    badge: 'App',
    badgeClass: 'tag-indigo',
    title: 'Apps à Medida',
    desc: 'Ferramentas digitais feitas para o teu processo. Reduz custos operacionais e melhora a organização interna da equipa.',
    features: [
      'Apps web e mobile',
      'Gestão interna e dashboards',
      'Integração com sistemas existentes',
      'Formação e suporte incluídos',
    ],
    color: '#6366F1',
  },
]

export default function Servicos() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="py-24 bg-dark relative" id="servicos">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <div className="tag mx-auto mb-4">O que fazemos</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Soluções digitais para{' '}
            <span className="gradient-text">fazer crescer o teu negócio</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Da presença online à automação de processos — uma equipa, todas as frentes digitais.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="gradient-border p-6 h-full flex flex-col hover:shadow-orange"
                style={{ '--hover-color': s.color }}
                data-hover
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}>
                  {s.icon}
                </div>

                {/* Badge + Title */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={s.badgeClass}>{s.badge}</span>
                </div>
                <h3 className="text-white font-black text-xl mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: s.color }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo('#contacto')}
                  className="btn-ghost w-full justify-center text-sm"
                  style={{ borderColor: `${s.color}30` }}
                  data-hover
                >
                  Saber mais →
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/sections/Servicos.jsx && git commit -m "feat: add Serviços section — 3 equal service cards (Sites, Automação, Apps)"
```

---

## Task 6: Portfolio Section (NEW)

**Files:**
- Create: `src/components/sections/Portfolio.jsx`

- [ ] **Step 1: Create Portfolio.jsx**

Note on asset paths: all paths are relative to `public/`, so in JSX use `/Clientes/...`.
File `Bordados do Sr. Lucas/Logo/Sr.Lucas_Logo (1).png` has a space — encode as `%20` or use template literal with encodeURIComponent; simplest is to just use the raw path since browsers handle it. Use backtick paths carefully.

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const projects = [
  {
    id: 'golden-move',
    name: 'Golden Move',
    desc: 'Plataforma de fitness, bem-estar e acompanhamento personalizado',
    type: 'Website',
    typeColor: '#6366F1',
    image: '/Clientes/Golden Move/PC1.png',
    logo: '/Clientes/Golden Move/Logo/Logo_GoldenMove_Transparente_V1-03.png',
    mobileImage: '/Clientes/Golden Move/Mobile1.png',
  },
  {
    id: 'empatia',
    name: 'EmpatIA',
    desc: 'Aplicação de inteligência emocional e suporte psicológico digital',
    type: 'App',
    typeColor: '#F97316',
    image: '/Clientes/EmpatIA/PC1.png',
    logo: '/Clientes/EmpatIA/Logo/Logo EmpatIA_provisorio.png',
    mobileImage: '/Clientes/EmpatIA/Mobile1.png',
  },
  {
    id: 'nexseed',
    name: 'NexSeed',
    desc: 'Plataforma de investimento em startups e inovação tecnológica',
    type: 'Website',
    typeColor: '#6366F1',
    image: '/Clientes/NexSeed/PC1.png',
    logo: '/Clientes/NexSeed/Logo/logo_nexseed.png',
    mobileImage: '/Clientes/NexSeed/Mobile1.png',
  },
  {
    id: 'bpm-rap',
    name: 'BPM RAP Nova Escola',
    desc: 'Gestão escolar, acompanhamento académico e comunicação com encarregados',
    type: 'App',
    typeColor: '#F97316',
    image: '/Clientes/App BPM RAP Nova Escola/PC1.png',
    logo: '/Clientes/App BPM RAP Nova Escola/Logo/logo_fundo_transparente.png',
    mobileImage: '/Clientes/App BPM RAP Nova Escola/Mobile1.png',
  },
  {
    id: 'sr-lucas',
    name: 'Bordados do Sr. Lucas',
    desc: 'Loja online de bordados artesanais e personalizados',
    type: 'Website',
    typeColor: '#6366F1',
    image: '/Clientes/Bordados do Sr. Lucas/mobile1.png',
    logo: '/Clientes/Bordados do Sr. Lucas/Logo/Sr.Lucas_Logo (1).png',
    mobileImage: null,
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        className="gradient-border overflow-hidden group cursor-none h-full flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-hover
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video bg-dark-200">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Mobile overlay */}
          {project.mobileImage && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={hovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 right-3 w-16 rounded-lg overflow-hidden border-2 border-white/20 shadow-card"
            >
              <img src={project.mobileImage} alt={`${project.name} mobile`} className="w-full" />
            </motion.div>
          )}

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
              style={{ background: `${project.typeColor}20`, color: project.typeColor, border: `1px solid ${project.typeColor}40` }}
            >
              {project.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-xl bg-dark-300 border border-border flex items-center justify-center overflow-hidden shrink-0">
            <img src={project.logo} alt={`${project.name} logo`} className="w-8 h-8 object-contain" />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-base truncate">{project.name}</div>
            <div className="text-gray-400 text-sm mt-1 leading-relaxed">{project.desc}</div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Portfolio() {
  return (
    <section className="py-24 bg-dark-100 relative" id="portfolio">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <div className="tag mx-auto mb-4">Portfólio</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Projetos que{' '}
            <span className="gradient-text">falam por si</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Alguns dos trabalhos que desenvolvemos para empresas e startups portuguesas.
          </p>
        </ScrollReveal>

        {/* Grid: 2 cols on md, 3 on lg — first card spans 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div key={p.id} className={i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Queres ver o teu projeto aqui?{' '}
            <button
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-accent hover:text-accent-light transition-colors font-semibold cursor-none"
              data-hover
            >
              Fala connosco →
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/sections/Portfolio.jsx && git commit -m "feat: add Portfolio section — 5 client projects with screenshots and logos"
```

---

## Task 7: LogosClientes Section (NEW)

**Files:**
- Create: `src/components/sections/LogosClientes.jsx`

- [ ] **Step 1: Create LogosClientes.jsx**

```jsx
import ScrollReveal from '../ui/ScrollReveal'

const clients = [
  { name: 'Golden Move', logo: '/Clientes/Golden Move/Logo/Logo_GoldenMove_Transparente_V1-03.png' },
  { name: 'EmpatIA', logo: '/Clientes/EmpatIA/Logo/Logo EmpatIA_provisorio.png' },
  { name: 'NexSeed', logo: '/Clientes/NexSeed/Logo/logo_nexseed.png' },
  { name: 'BPM RAP Nova Escola', logo: '/Clientes/App BPM RAP Nova Escola/Logo/logo_fundo_transparente.png' },
  { name: 'Bordados do Sr. Lucas', logo: '/Clientes/Bordados do Sr. Lucas/Logo/Sr.Lucas_Logo (1).png' },
  { name: 'ClinicBel', logo: '/Clientes/ClinicBel/Logo/logo-clinicbel.jpg' },
  { name: 'MF Profissional', logo: '/Clientes/MFProfissional/Logo/LOGO-MF-PROFISSINAL-3.png' },
]

export default function LogosClientes() {
  return (
    <section className="py-16 bg-dark border-t border-border relative" id="clientes">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">Já confiam em nós</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {clients.map((c) => (
              <div
                key={c.name}
                className="group flex items-center justify-center"
                title={c.name}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-10 md:h-12 w-auto object-contain
                    filter grayscale opacity-40
                    group-hover:grayscale-0 group-hover:opacity-100
                    transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/sections/LogosClientes.jsx && git commit -m "feat: add LogosClientes section — 7 client logos with grayscale hover"
```

---

## Task 8: App.jsx Restructure

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx with new section order**

```jsx
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import Hero from './components/sections/Hero'
import Campanha from './components/sections/Campanha'
import Servicos from './components/sections/Servicos'
import Portfolio from './components/sections/Portfolio'
import Sectors from './components/sections/Sectors'
import HowItWorks from './components/sections/HowItWorks'
import ROICalculator from './components/sections/ROICalculator'
import Pricing from './components/sections/Pricing'
import LogosClientes from './components/sections/LogosClientes'
import Contact from './components/sections/Contact'

export default function App() {
  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }).catch(() => {})
    return () => { if (lenis) lenis.destroy() }
  }, [])

  return (
    <div className="bg-dark min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Campanha />
        <Servicos />
        <Portfolio />
        <Sectors />
        <HowItWorks />
        <ROICalculator />
        <Pricing />
        <LogosClientes />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/App.jsx && git commit -m "feat: restructure App.jsx — new section order, remove StatsBar/Problem/AutomationDemo"
```

---

## Task 9: Minor Updates — Contact, Sectors, HowItWorks, Footer

**Files:**
- Modify: `src/components/sections/Contact.jsx`
- Modify: `src/components/sections/Sectors.jsx`
- Modify: `src/components/sections/HowItWorks.jsx`
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Contact.jsx — add "Sites / Web" sector**

In `Contact.jsx`, replace:
```js
const sectors = ['Barbearia', 'Clínica / Saúde', 'Imobiliária', 'Restauração / Turismo', 'Outro']
```
with:
```js
const sectors = ['Sites / Web', 'Automação de Processos', 'App à Medida', 'Clínica / Saúde', 'Barbearia', 'Imobiliária', 'Restauração / Turismo', 'Outro']
```

Also update the contact section heading copy. Replace:
```jsx
<h2 className="text-4xl md:text-5xl font-black text-white mb-6">
  Conta-nos onde o teu processo{' '}
  <span className="gradient-text">está a prender</span>
</h2>
```
with:
```jsx
<h2 className="text-4xl md:text-5xl font-black text-white mb-6">
  Vamos construir algo{' '}
  <span className="gradient-text">juntos</span>
</h2>
```

And replace the tag:
```jsx
<div className="tag mb-6">Vamos conversar</div>
```
with:
```jsx
<div className="tag-orange mb-6">Vamos conversar</div>
```

- [ ] **Step 2: Sectors.jsx — update section subtitle for PMEs**

Replace:
```jsx
<p className="text-gray-400 text-lg max-w-xl mx-auto">
  Trabalhamos melhor onde há repetição, follow-up e demasiadas tarefas a depender da equipa.
</p>
```
with:
```jsx
<p className="text-gray-400 text-lg max-w-xl mx-auto">
  Clínicas, PMEs e negócios locais que querem crescer sem deixar os processos para trás.
</p>
```

And the section tag in Sectors.jsx replace:
```jsx
<div className="tag mx-auto mb-4">Setores</div>
```
with:
```jsx
<div className="tag-orange mx-auto mb-4">Setores</div>
```

- [ ] **Step 3: HowItWorks.jsx — update step number circles to orange**

Replace the step number circle style:
```jsx
<div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-mono font-bold text-dark text-sm shadow-orange">
```
with:
```jsx
<div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-mono font-bold text-dark text-sm shadow-orange">
```

And the connector line color:
```jsx
className="absolute top-8 w-full h-px bg-gradient-to-r from-white/20 to-border origin-left
```
with:
```jsx
className="absolute top-8 w-full h-px bg-gradient-to-r from-accent/30 to-border origin-left
```

And the trust indicator dot:
```jsx
<span className="w-2 h-2 rounded-full bg-white shrink-0" />
```
with:
```jsx
<span className="w-2 h-2 rounded-full bg-accent shrink-0" />
```

- [ ] **Step 4: Footer.jsx — update links, tagline, logo**

Replace the `links` object:
```js
const links = {
  'Produto': ['Serviços', 'Portfólio', 'Como funciona', 'Preços', 'ROI Calculator'],
  'Empresa': ['Contacto'],
  'Legal': ['Privacidade', 'Termos'],
}
```

Replace the `scrollTo` map in Footer:
```js
const map = {
  'Serviços': '#servicos',
  'Portfólio': '#portfolio',
  'Como funciona': '#como-funciona',
  'Preços': '#precos',
  'ROI Calculator': '#roi',
  'Contacto': '#contacto',
}
```

Replace the footer tagline paragraph:
```jsx
<p className="text-gray-400 text-sm leading-relaxed max-w-xs">
  Sites, automação e apps para clínicas e PMEs portuguesas. A tua equipa digital de confiança.
</p>
```

Replace the bottom tagline:
```jsx
<p className="text-gray-600 text-xs">Sites · Automação · Apps — para PMEs portuguesas.</p>
```

Replace the logo mark color from white to orange:
```jsx
<div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-black text-dark text-sm">B</div>
```

- [ ] **Step 5: Verify build**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && npm run build 2>&1 | tail -10
```

- [ ] **Step 6: Commit all**

```bash
cd "/Users/gmsr44/Desktop/Outros Projetos/BoomMakers/06_Website/boommakers-web" && git add src/components/sections/Contact.jsx src/components/sections/Sectors.jsx src/components/sections/HowItWorks.jsx src/components/layout/Footer.jsx && git commit -m "feat: update Contact/Sectors/HowItWorks/Footer — orange accents, new copy, PMEs messaging"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Tailwind tokens ✓ | CSS tokens ✓ | Navbar ✓ | Hero ✓ | Campanha ✓ | Serviços ✓ | Portfólio ✓ | LogosClientes ✓ | App restructure ✓ | Contact Sites sector ✓ | Sectors PMEs copy ✓ | HowItWorks orange ✓ | Footer ✓ | Gold #D9C27A removed ✓
- [x] **Placeholder scan:** No TBD/TODO found
- [x] **Type consistency:** `scrollTo`, `gradient-border`, `tag-orange`, `tag-indigo`, `btn-primary`, `btn-ghost`, `btn-dark` used consistently across all tasks
- [x] **Asset paths:** All paths verified against actual file listing — spaces in filenames left as-is (browsers handle them), backtick paths not used
