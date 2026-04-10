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
                  Para empresas sem site ou com site desatualizado. A tua presença online merece melhor, e nós ajudamos a chegar lá, com manutenção e acompanhamento profissional incluídos.
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

              {/* Right - discount visual */}
              <div className="flex flex-col gap-4">
                <div className="bg-accent/10 border-2 border-accent/40 rounded-2xl p-8 text-center relative overflow-hidden shadow-orange">
                  <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-black px-4 py-1.5 rounded-bl-xl">
                    CAMPANHA
                  </div>
                  <div className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Desconto de lançamento</div>
                  <div className="text-8xl font-black text-white mb-1 leading-none">50%</div>
                  <div className="text-accent text-base font-semibold mt-2">no investimento inicial</div>
                  <div className="mt-5 pt-5 border-t border-accent/20 text-sm text-gray-400">
                    Orçamento adaptado ao teu projeto, sem surpresas.
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

                <div className="bg-dark-200 border border-border rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-accent text-sm">📋</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Orçamento personalizado</div>
                    <div className="text-gray-500 text-xs mt-0.5">Cada projeto tem o seu preço justo</div>
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
