import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

export default function ROICalculator() {
  const [employees, setEmployees] = useState(3)
  const [hoursPerWeek, setHoursPerWeek] = useState(8)
  const [hourlyRate, setHourlyRate] = useState(12)
  const [noShowsPerMonth, setNoShowsPerMonth] = useState(10)
  const [avgTicket, setAvgTicket] = useState(25)
  const [plan, setPlan] = useState(350)

  const calc = useMemo(() => {
    const manualCostMonth = employees * hoursPerWeek * 4.3 * hourlyRate
    const noShowCostMonth = noShowsPerMonth * avgTicket
    const totalLost = manualCostMonth + noShowCostMonth
    const withBoom = totalLost * 0.4 // conservative: recover ~40% of total losses (real cases often higher)
    const roi = ((withBoom - plan) / plan) * 100
    const payback = plan / withBoom
    const annualGain = (withBoom - plan) * 12

    return {
      manualCostMonth: Math.round(manualCostMonth),
      noShowCostMonth: Math.round(noShowCostMonth),
      totalLost: Math.round(totalLost),
      recovered: Math.round(withBoom),
      net: Math.round(withBoom - plan),
      roi: Math.round(roi),
      payback: Math.max(0.3, payback).toFixed(1),
      annualGain: Math.round(annualGain),
    }
  }, [employees, hoursPerWeek, hourlyRate, noShowsPerMonth, avgTicket, plan])

  const Slider = ({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '', hint }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-400">{label}</label>
        <span className="text-white font-bold text-sm font-mono">{prefix}{value.toLocaleString('pt')}{suffix}</span>
      </div>
      {hint && <p className="text-xs text-gray-600 mb-2">{hint}</p>}
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #FFFFFF ${((value-min)/(max-min))*100}%, #242424 ${((value-min)/(max-min))*100}%)`,
          }}
        />
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-dark-100 relative overflow-hidden" id="roi">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <div className="tag mx-auto mb-4">Calculadora de ROI</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Quanto estás a{' '}
            <span className="gradient-text">perder por mês?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Ajusta os valores do teu negócio e vê exactamente o que a automação te pode devolver.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="gradient-border p-6 space-y-6">
            <h3 className="text-white font-bold text-lg mb-4">O teu negócio</h3>

            <Slider label="Colaboradores" value={employees} onChange={setEmployees}
              min={1} max={15} hint="Número de pessoas na equipa" />
            <Slider label="Horas/semana em tarefas manuais" value={hoursPerWeek} onChange={setHoursPerWeek}
              min={2} max={40} hint="Agendamentos, follow-ups, relatórios feitos à mão" suffix="h" />
            <Slider label="Custo/hora médio da equipa" value={hourlyRate} onChange={setHourlyRate}
              min={6} max={30} prefix="€" hint="Salário bruto / horas de trabalho" />

            <div className="h-px bg-border" />

            <Slider label="Faltas sem aviso por mês" value={noShowsPerMonth} onChange={setNoShowsPerMonth}
              min={0} max={60} hint="Clientes que não aparecem sem cancelar" />
            <Slider label="Ticket médio por serviço" value={avgTicket} onChange={setAvgTicket}
              min={10} max={200} prefix="€" />

            <div className="h-px bg-border" />

            {/* Plan selector */}
            <div>
              <label className="text-sm text-gray-400 block mb-3">Plano BoomMakers</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Starter', price: 200 },
                  { label: 'Pro', price: 350 },
                  { label: 'Premium', price: 550 },
                ].map(p => (
                  <button key={p.price} onClick={() => setPlan(p.price)} data-hover
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all text-center ${
                      plan === p.price
                        ? 'bg-white text-dark shadow-orange'
                        : 'bg-dark-300 border border-border text-gray-400 hover:border-white/20'
                    }`}>
                    <div>{p.label}</div>
                    <div className="font-mono text-xs mt-0.5 opacity-70">€{p.price}/mês</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Main result */}
            <motion.div
              className="gradient-border p-6 text-center relative overflow-hidden"
              key={calc.net}
            >
              <div className="absolute inset-0 shimmer opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-2 font-mono uppercase tracking-widest">
                  Ganho líquido estimado / mês
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={calc.net}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-6xl font-black text-white"
                  >
                    +€{calc.net.toLocaleString('pt')}
                  </motion.div>
                </AnimatePresence>
                <div className="text-gray-400 text-sm mt-2">
                  ROI de <span className="text-white font-bold">{calc.roi}%</span> · Payback em{' '}
                  <span className="text-white font-bold">{calc.payback} meses</span>
                </div>
              </div>
            </motion.div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Custo mão-de-obra', value: calc.manualCostMonth, prefix: '€', color: '#ef4444', sub: 'perdido em tarefas manuais' },
                { label: 'Faltas sem aviso', value: calc.noShowCostMonth, prefix: '€', color: '#f97316', sub: 'receita não realizada' },
                { label: 'Valor recuperado', value: calc.recovered, prefix: '€', color: '#22c55e', sub: 'com automação BoomMakers' },
                { label: 'Ganho anual est.', value: calc.annualGain, prefix: '€', color: '#F5F5F5', sub: 'nos 12 primeiros meses' },
              ].map(({ label, value, prefix, color, sub }) => (
                <motion.div key={label} className="card" animate={{ opacity: 1 }}>
                  <div className="text-xs text-gray-500 mb-1">{label}</div>
                  <div className="text-xl font-black" style={{ color }}>{prefix}{value.toLocaleString('pt')}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              Estimativa conservadora baseada em médias de clientes similares. Calculamos o ROI real no diagnóstico gratuito.
            </p>

            <button onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary w-full justify-center py-3.5 text-base" data-hover>
              Calcular ROI real no meu negócio →
            </button>
          </div>
        </div>
      </div>

      {/* Slider styles */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: #FFFFFF; cursor: pointer;
          box-shadow: 0 0 8px rgba(255,255,255,0.25);
          transition: box-shadow 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 16px rgba(255,255,255,0.4);
        }
        input[type=range]::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: #FFFFFF; cursor: pointer; border: none;
        }
      `}</style>
    </section>
  )
}
