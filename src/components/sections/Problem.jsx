import ScrollReveal from '../ui/ScrollReveal'

const problems = [
  {
    title: 'Tempo perdido em tarefas repetitivas',
    desc: 'Agendamentos, confirmações, follow-ups e relatórios feitos à mão todos os dias. O teu tempo vale mais do que isso.',
    stat: '12h/sem', statLabel: 'perdidas em média',
  },
  {
    title: 'Leads que ficam sem resposta',
    desc: 'Quando a resposta depende de alguém estar disponível, metade das oportunidades fica pelo caminho sem ninguém dar por isso.',
    stat: '78%', statLabel: 'compram ao primeiro a responder',
  },
  {
    title: 'Dados dispersos, sem visibilidade',
    desc: 'Faturas, contratos, fichas de clientes em Excel, WhatsApp e papel. Nunca sabes ao certo o que está a acontecer.',
    stat: '40%', statLabel: 'de erros em processos manuais',
  },
  {
    title: 'Gestão às cegas, sem dados',
    desc: 'Sem visibilidade sobre o que entra, o que falha e o que rende, acabas a decidir com base no feeling e não no que está a acontecer.',
    stat: '3×', statLabel: 'mais decisões certas com dados',
  },
]

export default function Problem() {
  return (
    <section className="py-24 bg-dark-100" id="problema">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="tag mx-auto mb-4">O Problema</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            O teu negócio perde{' '}
            <span className="gradient-text">tempo e dinheiro</span>
            <br />todos os dias
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Muitos negócios lidam com os mesmos bloqueios todos os dias e acabam por normalizar o que já devia estar resolvido.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="group relative card overflow-hidden h-full" data-hover>
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange rounded-l-2xl
                  transition-all duration-300 group-hover:w-1.5" />

                <div className="pl-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="text-right shrink-0">
                      <div className="text-white text-xl font-black">{p.stat}</div>
                      <div className="text-gray-500 text-xs">{p.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
