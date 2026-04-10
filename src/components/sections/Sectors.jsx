import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const sectors = [
  {
    id: 'barbearia',
    label: 'Barbearias',
    tagline: 'Onde já conhecemos bem a operação',
    desc: 'Quando tudo passa por mensagens, chamadas e memória da equipa, a agenda começa a mandar no negócio.',
    features: [
      'App de marcações online 24/7 (QR code + link)',
      'Lembretes automáticos via WhatsApp, -60% no-shows',
      'Ficha de cliente: histórico, preferências, última visita',
      'Dashboard por barbeiro: receita, horários de pico, fidelidade',
      'Sistema de loyalty e reativação de clientes inativos',
      'Reviews automáticas no Google após cada serviço',
    ],
    color: '#F5F5F5',
    roi: 'Retorno típico: 2.5× no 1.º mês',
  },
  {
    id: 'clinica',
    label: 'Clínicas',
    tagline: 'Saúde & Bem-estar',
    desc: 'Clínicas que acumulam trabalho administrativo, faltas evitáveis e demasiadas tarefas que ainda passam pela receção.',
    features: [
      'Agendamento automático via WhatsApp, site e email',
      'Lembretes personalizados 24h e 2h antes, -40% no-shows',
      'Triagem inicial automática com formulário inteligente',
      'Ficha do paciente: historial clínico, alergias, preferências',
      'Relatórios mensais de produtividade automáticos',
      'Follow-up pós-consulta e agendamento de revisão',
    ],
    color: '#D4D4D8',
    roi: 'Retorno típico: 3× no 1.º mês',
  },
  {
    id: 'imobiliaria',
    label: 'Imobiliárias',
    tagline: 'Resposta rápida sem perder contexto',
    desc: 'Quando entram muitos pedidos ao mesmo tempo, o problema raramente é falta de leads. É falta de tempo para lhes pegar bem.',
    features: [
      'Captura e qualificação automática de leads',
      'Resposta em menos de 5 minutos, sempre, 24/7',
      'Matching inteligente cliente-imóvel com base no perfil',
      'Follow-up automatizado até à decisão de compra',
      'CRM com histórico completo de interacções',
      'Relatórios de conversão e pipeline automáticos',
    ],
    color: '#A3A3A3',
    roi: 'Retorno típico: 4× no 1.º mês',
  },
  {
    id: 'restauracao',
    label: 'Restauração',
    tagline: 'Hotéis, restaurantes, turismo',
    desc: 'Reservas, reviews e seguimento ao cliente acabam muitas vezes espalhados por várias ferramentas e pessoas.',
    features: [
      'Gestão automática de reservas e lista de espera',
      'Respostas automáticas a reviews (Google, TripAdvisor)',
      'Análise de satisfação com NPS automático',
      'Relatórios de ocupação e receita por período',
      'Alertas de review negativa para resposta rápida',
      'Campanhas automáticas de reactivação de clientes',
    ],
    color: '#737373',
    roi: 'Retorno típico: 2× no 1.º mês',
  },
]

export default function Sectors() {
  const [active, setActive] = useState('barbearia')
  const sector = sectors.find(s => s.id === active)

  return (
    <section className="py-24 bg-dark relative" id="setores">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <div className="tag-orange mx-auto mb-4">Setores</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Setores onde os processos{' '}
            <span className="gradient-text">pesam mais</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Clínicas, PMEs e negócios locais que querem crescer sem deixar os processos para trás.
          </p>
        </ScrollReveal>

        {/* Sector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {sectors.map(s => (
            <motion.button
              key={s.id}
              onClick={() => setActive(s.id)}
              data-hover
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                active === s.id
                  ? 'bg-white text-dark shadow-orange'
                  : 'bg-dark-200 border border-border text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {s.label}
            </motion.button>
          ))}
        </div>

        {/* Sector content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Left: features */}
            <div className="lg:col-span-3 gradient-border p-6">
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-widest">{sector.tagline}</div>
                <h3 className="text-white text-2xl font-black">{sector.label}</h3>
                <p className="text-gray-400 text-sm mt-1">{sector.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sector.features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: sector.color }}>✓</span>
                    <span>{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: ROI + CTA */}
            <div className="lg:col-span-2 space-y-4">
              {/* ROI card */}
              <div className="card text-center">
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Impacto esperado</div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold mb-4"
                  style={{ background: `${sector.color}15`, color: sector.color, border: `1px solid ${sector.color}30` }}>
                  {sector.roi}
                </div>

                <div className="h-px bg-border my-3" />

                <div className="text-xs text-gray-500">Orçamento adaptado a cada projeto.</div>
                <div className="text-xs text-gray-600 mt-1">Sem custos fixos escondidos.</div>
              </div>

              {/* USPs */}
              <div className="card space-y-3">
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Porquê a BoomMakers</div>
                {[
                  'Montagem ajustada ao teu processo',
                  'Primeira versão em 2–4 semanas',
                  'Ajustes e acompanhamento no arranque',
                  'Impacto medido com números simples',
                ].map(item => (
                  <div key={item} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary w-full justify-center py-3.5 text-base" data-hover
              >
                Falar sobre este caso →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
