import AnimatedCounter from '../ui/AnimatedCounter'

const stats = [
  { prefix: '-', n: 60, suffix: '%', label: 'faltas e no-shows', detail: 'em clínicas e barbearias' },
  { prefix: '', n: 3, suffix: '×', label: 'mais leads convertidos', detail: 'resposta automática em <5min' },
  { prefix: '', n: 8, suffix: 'h', label: 'poupadas por semana', detail: 'por colaborador' },
  { prefix: '€', n: 2.4, suffix: '×', label: 'ROI médio 1.º mês', detail: 'calculado com dados reais', decimals: 1 },
]

export default function StatsBar() {
  return (
    <div className="bg-dark-100 border-y border-border relative overflow-hidden">
      {/* Shimmer */}
      <div className="absolute inset-0 shimmer pointer-events-none opacity-60" />
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10 relative z-10">
        {stats.map(({ prefix, n, suffix, label, detail, decimals }) => (
          <div key={label} className="text-center px-6 py-2">
            <div className="text-white text-3xl font-black">
              <AnimatedCounter end={n} prefix={prefix} suffix={suffix} decimals={decimals || 0} duration={2} />
            </div>
            <div className="text-gray-200 text-xs font-semibold mt-1 uppercase tracking-wide">{label}</div>
            <div className="text-gray-500 text-xs mt-0.5">{detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
