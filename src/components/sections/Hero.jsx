import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

// ── Canvas Particle Network ──────────────────────────────────────────────────
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

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouse)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => {
        // Gentle mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.vx += (dx / dist) * 0.08
          p.vy += (dy / dist) * 0.08
        }
        p.vx *= 0.99; p.vy *= 0.99
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0

        // Draw node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.6})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.25
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.7})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// Live Automation Feed
const feedEvents = [
  { title: 'Marcação confirmada', sub: 'Barbearia Style, Rafael Costa · 15h30', color: '#F5F5F5', delay: 0 },
  { title: 'Lembrete preparado', sub: 'Mensagem agendada para 24h antes', color: '#E5E5E5', delay: 3200 },
  { title: 'Pedido de review enviado', sub: 'Depois do serviço, sem intervenção manual', color: '#D4D4D4', delay: 6000 },
  { title: 'Resumo semanal fechado', sub: 'Consultas, faltas e carga por equipa', color: '#A3A3A3', delay: 9000 },
  { title: 'Lead triado', sub: 'Pedido encaminhado para follow-up', color: '#737373', delay: 12000 },
  { title: 'Dados registados', sub: 'Cliente e histórico atualizados', color: '#F5F5F5', delay: 15000 },
]

function LiveFeed() {
  const [visible, setVisible] = useState([feedEvents[0]])
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    let timers = []

    const startCycle = () => {
      setVisible([feedEvents[0]])
      setCounter(1)
      // Clear any pending timers from the previous cycle before scheduling new ones
      timers.forEach(clearTimeout)
      timers = feedEvents.slice(1).map((ev) =>
        setTimeout(() => {
          setVisible(prev => [ev, ...prev].slice(0, 4))
          setCounter(c => c + 1)
        }, ev.delay)
      )
    }

    startCycle()
    const loop = setInterval(startCycle, 20000)

    return () => { timers.forEach(clearTimeout); clearInterval(loop) }
  }, [])

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.35)] inline-block" />
          <span className="text-xs text-gray-400 font-mono">EXEMPLO DE FLUXO</span>
        </div>
        <span className="text-xs font-mono text-white/80">{counter} ações no cenário</span>
      </div>

      {/* Feed */}
      <div className="space-y-2 overflow-hidden" style={{ maxHeight: 280 }}>
        {visible.map((ev, i) => (
          <motion.div key={`${ev.title}-${counter}-${i}`}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass border border-border rounded-xl p-3 flex items-start gap-3"
          >
            <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: ev.color }} />
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{ev.title}</p>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{ev.sub}</p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ev.color }} />
          </motion.div>
        ))}
      </div>

      {/* Counter badge */}
      <div className="mt-3 flex items-center gap-2 px-1">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-mono text-gray-500">
          fluxo ilustrativo para mostrar a operação
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
    </div>
  )
}

// Hero
export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark noise">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

      {/* Canvas particles */}
      <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
        <ParticleCanvas />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none orb-1"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none orb-2"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left, Text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <div className="tag mb-6">
                Processos mais leves, equipa mais disponivel.
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-none tracking-tight mb-2">
                <span className="gradient-text block" style={{ lineHeight: 1.05 }}>BOOM</span>
                <span className="text-white block text-4xl md:text-5xl xl:text-6xl font-bold tracking-[0.15em] mt-1">MAKERS</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 mb-8">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Tiramos trabalho repetitivo de cima de{' '}
                <span className="text-white font-semibold">
                  <TypeAnimation
                    sequence={[
                      'barbearias.', 2000,
                      'clínicas dentárias.', 2000,
                      'imobiliárias.', 2000,
                      'restaurantes.', 2000,
                      'escritórios.', 2000,
                    ]}
                    wrapper="span"
                    speed={60}
                    repeat={Infinity}
                  />
                </span>
              </p>
              <p className="text-gray-400 text-base mt-3">
                Agendamentos, respostas, follow-ups e organização interna passam a correr com menos esforço e menos falhas.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('#contacto')} className="btn-primary text-base px-7 py-3.5" data-hover>
                Marcar conversa →
              </button>
              <button onClick={() => scrollTo('#como-funciona')} className="btn-ghost text-base px-7 py-3.5" data-hover>
                Perceber o processo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-6">
              {[
                { n: '2–4', label: 'semanas para primeira versão' },
                { n: 'ROI', label: 'acompanhado desde o início' },
                { n: '24/7', label: 'fluxos a correr sem depender da equipa' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-2xl font-black text-white">{n}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right, Live feed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:block"
          >
            <div className="gradient-border p-5 shadow-orange">
              <LiveFeed />
            </div>

            {/* Mini stats row below feed */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { label: '-60% no-shows' },
                { label: '3× mais leads' },
                { label: '8h poupadas/sem' },
              ].map(({ label }) => (
                <div key={label} className="glass border border-border rounded-xl px-3 py-2.5 text-center">
                  <div className="text-xs text-gray-300 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-600 uppercase tracking-widest">Descobre mais</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
