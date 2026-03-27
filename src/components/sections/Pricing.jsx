import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 200,
    setup: 400,
    desc: 'Para atacar um problema concreto sem montar demasiado de uma vez.',
    features: [
      '1–2 processos automatizados',
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
    price: 350,
    setup: 600,
    desc: 'Para equipas que já sabem onde estão os bloqueios e querem resolver várias frentes.',
    badge: 'Mais escolhido',
    features: [
      'Tudo do Starter',
      '3–5 processos automatizados',
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
    price: 550,
    setup: 900,
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
  const [annual, setAnnual] = useState(false)

  const getPrice = (p) => annual ? Math.round(p * 0.8) : p

  return (
    <section className="py-24 bg-dark relative" id="precos">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <div className="tag mx-auto mb-4">Preços</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Subscrição mensal.{' '}
            <span className="gradient-text">Sem surpresas.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Valores simples, setup claro e margem para começar pequeno antes de expandir.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${annual ? 'bg-white' : 'bg-dark-300 border border-border'}`}
              data-hover
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${annual ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-gray-500'}`}>
              Anual <span className="text-white/70 text-xs font-bold">-20%</span>
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl p-6 transition-all duration-300 h-full flex flex-col ${
                  plan.highlight
                    ? 'border-2 border-white/25 shadow-orange bg-dark-200'
                    : 'card'
                }`}
                data-hover
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap
                    bg-white text-dark text-xs font-bold px-4 py-1 rounded-full shadow-orange">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <div className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mt-2 mb-1">
                    <span className="text-4xl font-black text-white">€{getPrice(plan.price)}</span>
                    <span className="text-gray-500 text-sm">/mês</span>
                  </div>
                  {annual && (
                    <div className="text-xs text-gray-600 line-through">€{plan.price}/mês</div>
                  )}
                  <div className="text-gray-500 text-xs mt-1">+ €{plan.setup} setup único</div>
                  <p className="text-gray-400 text-sm mt-3">{plan.desc}</p>
                </div>

                <div className="h-px bg-border mb-5" />

                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <span className="text-white mt-0.5 shrink-0 font-bold">✓</span>
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

        {/* Note */}
        <ScrollReveal className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Se ainda não sabes qual o plano certo, começamos pelo problema a resolver e não pela mensalidade.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Pagamento mensal · Cancela quando quiseres · Sem contratos anuais obrigatórios
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
