import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const scenarios = [
  {
    id: 'barbearia',
    label: 'Barbearia',
    trigger: { label: 'Cliente pede marcação', sub: 'WhatsApp / Link / QR Code' },
    steps: [
      { label: 'Pedido processado', sub: 'Verifica disponibilidade em tempo real', color: '#F5F5F5' },
      { label: 'Slot confirmado', sub: 'Calendário actualizado automaticamente', color: '#D4D4D8' },
      { label: 'Confirmação enviada', sub: 'WhatsApp com data, hora e barbeiro', color: '#A3A3A3' },
    ],
    output: { label: 'Resumo atualizado', sub: 'Agenda, cliente e números sincronizados', color: '#E5E5E5' },
    stats: [
      { n: '-60%', label: 'no-shows' },
      { n: '24/7', label: 'marcações' },
      { n: '0 min', label: 'manual' },
    ],
  },
  {
    id: 'clinica',
    label: 'Clínica',
    trigger: { label: 'Pedido de consulta recebido', sub: 'Email / Site / WhatsApp' },
    steps: [
      { label: 'Triagem automática', sub: 'Urgência detectada, especialidade identificada', color: '#F5F5F5' },
      { label: 'Ficha criada', sub: 'Dados do paciente organizados automaticamente', color: '#D4D4D8' },
      { label: 'Lembrete 24h antes', sub: 'SMS + WhatsApp personalizados', color: '#A3A3A3' },
    ],
    output: { label: 'Resumo mensal preparado', sub: 'Faltas, carga e seguimento consolidados', color: '#E5E5E5' },
    stats: [
      { n: '-40%', label: 'no-shows' },
      { n: '3×', label: 'eficiência' },
      { n: '8h', label: 'poupadas/sem' },
    ],
  },
  {
    id: 'imobiliaria',
    label: 'Imobiliária',
    trigger: { label: 'Novo lead recebido', sub: 'Idealista / Sapo / Site próprio' },
    steps: [
      { label: 'Lead qualificado', sub: 'Budget, urgência e localização organizados automaticamente', color: '#F5F5F5' },
      { label: 'Matching inteligente', sub: 'Imóveis sugeridos com base no perfil', color: '#D4D4D8' },
      { label: 'Follow-up automático', sub: 'Contacto agendado com o consultor certo', color: '#A3A3A3' },
    ],
    output: { label: 'Pipeline atualizado', sub: 'Lead organizado e próximo passo definido', color: '#E5E5E5' },
    stats: [
      { n: '3×', label: 'conversão' },
      { n: '<5min', label: 'resposta' },
      { n: '0', label: 'leads perdidos' },
    ],
  },
]

// Animated flow node
function FlowNode({ label, sub, color, animate: show, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay, ease: 'backOut' }}
      className="flex items-center gap-3 bg-dark-200 border border-border rounded-xl p-3"
    >
      <div className="w-3 h-3 rounded-full shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
      </div>
      <div className="min-w-0">
        <p className="text-white text-sm font-semibold leading-tight">{label}</p>
        <p className="text-gray-500 text-xs mt-0.5 leading-tight">{sub}</p>
      </div>
    </motion.div>
  )
}

// Animated connector arrow
function Arrow({ show, delay = 0, color = '#F5F5F5' }) {
  return (
    <div className="flex justify-center my-1.5">
      <motion.div
        initial={{ opacity: 0, y: -4 }} animate={show ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay }}
        className="flex flex-col items-center gap-0.5"
      >
        <div className="w-px h-4" style={{ background: `linear-gradient(to bottom, transparent, ${color})` }} />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M6 8L0.803848 0.5L11.1962 0.5L6 8Z" fill={color} fillOpacity="0.7" />
        </svg>
      </motion.div>
    </div>
  )
}

export default function AutomationDemo() {
  const [active, setActive] = useState('barbearia')
  const [phase, setPhase] = useState(0)
  const timerRef = useRef(null)

  const scenario = scenarios.find(s => s.id === active)

  const restart = () => {
    setPhase(0)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPhase(p => {
        if (p >= 4) { clearInterval(timerRef.current); return 4 }
        return p + 1
      })
    }, 900)
  }

  useEffect(() => {
    restart()
    return () => clearInterval(timerRef.current)
  }, [active])

  return (
    <section className="py-24 bg-dark-100 relative" id="demo">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <div className="tag mx-auto mb-4">Demo Interactiva</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Vê como um fluxo destes{' '}
            <span className="gradient-text">funciona na prática</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Escolhe um cenário e vê como o trabalho passa de pedido recebido para tarefa resolvida.
          </p>
        </ScrollReveal>

        {/* Scenario tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              data-hover
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                active === s.id
                  ? 'bg-white text-dark shadow-orange'
                  : 'bg-dark-200 border border-border text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Flow visualization */}
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Exemplo de fluxo</h3>
              <button onClick={restart} className="btn-dark text-xs px-3 py-1.5 gap-1.5" data-hover>
                ↺ Reiniciar
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} className="space-y-0">

                {/* Trigger */}
                <FlowNode {...scenario.trigger} color="#F5F5F5" animate={phase >= 0} />
                <Arrow show={phase >= 1} delay={0} />

                {/* Steps */}
                {scenario.steps.map((step, i) => (
                  <div key={step.label}>
                    <FlowNode {...step} animate={phase >= i + 1} delay={0} />
                    {i < scenario.steps.length - 1 && <Arrow show={phase >= i + 2} color={scenario.steps[i + 1].color} />}
                  </div>
                ))}
                <Arrow show={phase >= 4} color={scenario.output.color} />

                {/* Output */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'backOut' }}
                  className="rounded-xl p-3 border"
                  style={{ background: `${scenario.output.color}10`, borderColor: `${scenario.output.color}30` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: scenario.output.color }} />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: scenario.output.color }}>{scenario.output.label}</p>
                      <p className="text-gray-400 text-xs">{scenario.output.sub}</p>
                    </div>
                    {phase >= 4 && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
                        className="ml-auto w-6 h-6 rounded-full bg-white flex items-center justify-center text-dark text-xs font-bold">
                        ✓
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Time indicator */}
                {phase >= 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500 font-mono">
                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.35)]" />
                    exemplo concluído em <span className="text-white">4.2 segundos</span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stats + explanation */}
          <div className="space-y-5">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-3">
              {scenario.stats.map(({ n, label }) => (
                <div key={label} className="gradient-border p-4 text-center">
                  <div className="text-2xl font-black text-white">{n}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* What this means */}
            <div className="card">
              <h4 className="text-white font-bold mb-3">Na operação do dia a dia</h4>
              {active === 'barbearia' && (
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>As marcações deixam de depender de alguém atender o telefone</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>Os lembretes saem a tempo e reduzem faltas evitáveis</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>O histórico do cliente fica centralizado e fácil de consultar</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>Os números da operação ficam visíveis sem folhas soltas</li>
                </ul>
              )}
              {active === 'clinica' && (
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>A receção ganha tempo para tratar do que exige atenção humana</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>Os lembretes deixam de depender de memória ou rotina manual</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>A informação do paciente entra organizada desde o primeiro contacto</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>Os relatórios passam a sair com menos trabalho administrativo</li>
                </ul>
              )}
              {active === 'imobiliaria' && (
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>Os pedidos recebem resposta rapidamente, mesmo fora de horas</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>O consultor recebe informação já tratada, não um bloco de texto solto</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>O próximo passo fica definido logo no arranque do lead</li>
                  <li className="flex gap-2"><span className="text-white/70 shrink-0">→</span>O acompanhamento deixa de depender só de memória e boa vontade</li>
                </ul>
              )}
            </div>

            <button onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary w-full justify-center text-base py-3.5" data-hover>
              Falar sobre o meu caso →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
