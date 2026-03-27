import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { submitLead } from '../../lib/supabase'

const sectors = ['Barbearia', 'Clínica / Saúde', 'Imobiliária', 'Restauração / Turismo', 'Outro']
const pains = [
  'Agendamentos manuais / WhatsApp',
  'Muitas faltas sem aviso',
  'Leads sem resposta rápida',
  'Tarefas repetitivas que consomem tempo',
  'Falta de dados / relatórios',
  'Documentos processados manualmente',
]

const Step = ({ children, active }) => (
  <AnimatePresence mode="wait">
    {active && (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export default function Contact() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    sector: '', painPoints: [], name: '', email: '', phone: '', company: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const totalSteps = 3

  const togglePain = (pain) => {
    setData(d => ({
      ...d,
      painPoints: d.painPoints.includes(pain)
        ? d.painPoints.filter(p => p !== pain)
        : [...d.painPoints, pain],
    }))
  }

  const handleSubmit = async () => {
    if (!data.name || !data.email) { setError('Nome e email são obrigatórios.'); return }
    setSubmitting(true)
    setError('')
    const result = await submitLead(data)
    setSubmitting(false)
    if (result.success) setDone(true)
    else setError('Erro ao enviar. Tenta novamente ou envia email para ribeiro.gil4@gmail.com')
  }

  const ProgressBar = () => (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-dark-300">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: step > i ? '100%' : step === i + 1 ? '50%' : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </div>
      ))}
      <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{step}/{totalSteps}</span>
    </div>
  )

  if (done) {
    return (
      <section className="py-24 bg-dark" id="contacto">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
            <h2 className="text-4xl font-black text-white mb-4">Recebemos o teu pedido!</h2>
            <p className="text-gray-400 text-lg mb-6">
              Vamos responder em menos de 24 horas para perceber o contexto e combinar o próximo passo contigo.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold">
              ribeiro.gil4@gmail.com
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-dark relative overflow-hidden" id="contacto">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left, text */}
          <ScrollReveal>
            <div className="tag mb-6">Vamos conversar</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Conta-nos onde o teu processo{' '}
              <span className="gradient-text">está a prender</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Em 30 minutos conseguimos perceber o que está a consumir tempo, o que pode ser simplificado e se faz sentido avançar.
            </p>

            <div className="space-y-4">
              {[
                'Conversa direta, sem rodeios nem proposta genérica',
                'Resposta rápida para não ficar em banho-maria',
                'Primeira análise sem compromisso',
                'Falamos de impacto real antes de falar de ferramentas',
              ].map(text => (
                <div key={text} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-gray-500 text-sm mb-3">Ou contacta directamente:</p>
              <a href="mailto:ribeiro.gil4@gmail.com"
                className="text-white hover:text-gray-300 transition-colors font-semibold block">
                ribeiro.gil4@gmail.com
              </a>
            </div>
          </ScrollReveal>

          {/* Right, multi-step form */}
          <ScrollReveal delay={0.2}>
            <div className="gradient-border p-6 md:p-8">
              <ProgressBar />

              {/* Step 1, Sector */}
              <Step active={step === 1}>
                <h3 className="text-white font-bold text-xl mb-2">Qual é o teu sector?</h3>
                <p className="text-gray-500 text-sm mb-6">Isto ajuda-nos a perceber melhor o contexto da tua operação.</p>
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {sectors.map(s => (
                    <button key={s} onClick={() => setData(d => ({ ...d, sector: s }))}
                      data-hover
                      className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                        data.sector === s
                          ? 'bg-white text-dark'
                          : 'bg-dark-300 border border-border text-gray-300 hover:border-white/20'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
                <button onClick={() => data.sector && setStep(2)}
                  disabled={!data.sector}
                  className={`btn-primary w-full justify-center ${!data.sector ? 'opacity-50 cursor-not-allowed' : ''}`}
                  data-hover>
                  Continuar →
                </button>
              </Step>

              {/* Step 2, Pain points */}
              <Step active={step === 2}>
                <h3 className="text-white font-bold text-xl mb-2">Quais são as maiores dores?</h3>
                <p className="text-gray-500 text-sm mb-6">Selecciona uma ou mais para irmos diretos ao ponto na conversa.</p>
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {pains.map(pain => (
                    <button key={pain} onClick={() => togglePain(pain)} data-hover
                      className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition-all flex items-center gap-3 ${
                        data.painPoints.includes(pain)
                          ? 'bg-white/10 border border-white/25 text-white'
                          : 'bg-dark-300 border border-border text-gray-300 hover:border-white/20'
                      }`}>
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                        data.painPoints.includes(pain) ? 'bg-white' : 'border border-gray-600'
                      }`}>
                        {data.painPoints.includes(pain) && <span className="text-dark text-xs">✓</span>}
                      </div>
                      {pain}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-dark flex-1 justify-center" data-hover>← Voltar</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 justify-center" data-hover>Continuar →</button>
                </div>
              </Step>

              {/* Step 3, Contact info */}
              <Step active={step === 3}>
                <h3 className="text-white font-bold text-xl mb-2">Como te contactamos?</h3>
                <p className="text-gray-500 text-sm mb-6">Deixa os teus dados e seguimos contigo em menos de 24 horas.</p>
                <div className="space-y-4 mb-6">
                  {[
                    { key: 'name', label: 'Nome *', type: 'text', placeholder: 'O teu nome' },
                    { key: 'email', label: 'Email *', type: 'email', placeholder: 'email@empresa.pt' },
                    { key: 'phone', label: 'Telefone', type: 'tel', placeholder: '+351 9XX XXX XXX' },
                    { key: 'company', label: 'Empresa / Negócio', type: 'text', placeholder: 'Nome da empresa' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs text-gray-400 mb-1.5 block font-medium">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={data[key]}
                        onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
                        className="w-full bg-dark-300 border border-border rounded-xl px-4 py-3 text-white text-sm
                          placeholder-gray-600 focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Mensagem (opcional)</label>
                    <textarea
                      placeholder="Conta-nos brevemente o que mais te preocupa..."
                      value={data.message}
                      onChange={e => setData(d => ({ ...d, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-dark-300 border border-border rounded-xl px-4 py-3 text-white text-sm
                        placeholder-gray-600 focus:outline-none focus:border-white/25 transition-colors resize-none"
                    />
                  </div>
                </div>

                {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-dark flex-1 justify-center" data-hover>← Voltar</button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className={`btn-primary flex-1 justify-center ${submitting ? 'opacity-70' : ''}`} data-hover>
                    {submitting ? 'A enviar...' : 'Enviar pedido →'}
                  </button>
                </div>
              </Step>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
