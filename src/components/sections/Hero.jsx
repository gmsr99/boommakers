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
    return () => {
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
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
