import ScrollReveal from '../ui/ScrollReveal'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tag: 'Para começar',
    desc: 'Para atacar um problema concreto sem montar demasiado de uma vez.',
    features: [
      '1-2 processos automatizados',
      'Integrações com ferramentas existentes',
      'Lembretes automáticos básicos',
      'Dashboard de monitorização',
      '30 dias de suporte incluídos',
      'Relatório mensal de valor gerado',
    ],
    cta: 'Falar sobre este plano →',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tag: 'Mais escolhido',
    desc: 'Para equipas que já sabem onde estão os bloqueios e querem resolver várias frentes.',
    badge: 'Mais escolhido',
    features: [
      'Tudo do Starter',
      '3-5 processos automatizados',
      'WhatsApp API integrado',
      'Dashboard avançado com KPIs',
      'Lembretes e follow-ups automáticos',
      'Suporte WhatsApp prioritário',
      'Relatório quinzenal detalhado',
    ],
    cta: 'Ver se faz sentido →',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tag: 'Operações maiores',
    desc: 'Para operações com mais volume, mais integrações e maior exigência no acompanhamento.',
    features: [
      'Tudo do Pro',
      'Processos ilimitados',
      'Automações avançadas e decisões assistidas',
      'Integração com sistema de loyalty',
      'Reviews automáticas Google',
      'API custom / integrações avançadas',
      'Reunião mensal de estratégia',
      'SLA garantido',
    ],
    cta: 'Falar sobre este plano →',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section className="py-24 bg-dark relative" id="precos">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <div className="tag mx-auto mb-4">Planos</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Simples de perceber,{' '}
            <span className="gradient-text">justo para o teu negócio.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Cada projeto tem o seu orçamento. Escolhe o nível de serviço e falamos de números sem compromisso.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl p-6 transition-all duration-300 h-full flex flex-col ${
                  plan.highlight
                    ? 'border-2 border-accent/40 shadow-orange bg-dark-200'
                    : 'card'
                }`}
                data-hover
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap
                    bg-accent text-dark text-xs font-bold px-4 py-1 rounded-full shadow-orange">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <div className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">{plan.name}</div>
                  <div className="text-xs text-accent font-semibold mt-2 mb-3">{plan.tag}</div>
                  <p className="text-gray-400 text-sm">{plan.desc}</p>
                </div>

                <div className="h-px bg-border mb-5" />

                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <span className="text-accent mt-0.5 shrink-0 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className={plan.highlight ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'}
                  data-hover
                >
                  {plan.cta}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Se ainda não sabes qual o plano certo, começamos pelo problema a resolver, não pelo orçamento.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Orçamento personalizado · Sem compromisso inicial · Preços transparentes
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
