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
                data-hover
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
                >
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
