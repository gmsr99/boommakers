import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../ui/ScrollReveal'

const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Sentamo-nos contigo, percebemos onde a operação emperra e escolhemos o primeiro processo que realmente vale a pena mexer.',
    detail: 'Sessão inicial para perceber prioridades, gargalos e impacto',
  },
  {
    n: '02',
    title: 'Construção',
    desc: 'Montamos o fluxo, ligamos as ferramentas certas e testamos tudo até ficar sólido no dia a dia.',
    detail: 'Ferramentas e integrações ajustadas ao teu processo',
  },
  {
    n: '03',
    title: 'Lançamento',
    desc: 'Pomos a solução a correr no terreno, alinhamos a equipa e afinamos o que for preciso nas primeiras semanas.',
    detail: 'Acompanhamento próximo nos primeiros 30 dias',
  },
  {
    n: '04',
    title: 'Crescimento',
    desc: 'Depois de estabilizar o primeiro caso, medimos o impacto e decidimos onde faz sentido continuar a melhorar.',
    detail: 'ROI medido e reportado todos os meses',
  },
]

function StepCard({ step, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative"
      data-hover
    >
      {/* Connector line to next step */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4, ease: 'easeInOut' }}
          className="absolute top-8 w-full h-px bg-gradient-to-r from-accent/30 to-border origin-left
            hidden lg:block z-0" style={{ width: 'calc(100% - 64px)', left: '50%', marginLeft: '32px' }}
        />
      )}

      <div className="relative z-10 gradient-border transition-all duration-300 group-hover:shadow-orange p-5 h-full">
        {/* Step number */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-mono font-bold text-dark text-sm shadow-orange">
            {step.n}
          </div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">Passo</div>
        </div>

        <h3 className="text-white font-bold text-xl mb-3 transition-colors">
          {step.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.desc}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono border-t border-border pt-3">
          <span>→</span>
          <span>{step.detail}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden" id="como-funciona">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="tag mx-auto mb-4">Como Funciona</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            De zero a automação em{' '}
            <span className="gradient-text">4 passos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Um processo simples, com prioridade ao que resolve problemas reais e não ao que fica bonito numa proposta.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>

        {/* Trust indicators */}
        <ScrollReveal className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Trabalho ajustado ao teu processo real',
            'Decisões tomadas contigo, sem caixas fechadas',
            'Acompanhamento claro e resposta rápida',
          ].map(text => (
            <div key={text} className="flex items-center gap-3 bg-dark-200 border border-border rounded-xl px-5 py-4">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="text-gray-300 text-sm font-medium">{text}</span>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
