import Logo from '../ui/Logo'

const links = {
  'Produto': ['Serviços', 'Portfólio', 'Como funciona', 'Preços', 'ROI Calculator'],
  'Empresa': ['Contacto'],
  'Legal': ['Privacidade', 'Termos'],
}

export default function Footer() {
  const scrollTo = (href) => {
    const map = {
      'Serviços': '#servicos',
      'Portfólio': '#portfolio',
      'Como funciona': '#como-funciona',
      'Preços': '#precos',
      'ROI Calculator': '#roi',
      'Contacto': '#contacto',
    }
    const target = map[href]
    if (target) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-border bg-dark-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo size={32} />
              <span className="font-black text-xl"><span className="text-white">BOOM</span><span className="text-gray-400">MAKERS</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Sites, automação e apps para clínicas e PMEs portuguesas. A tua equipa digital de confiança.
            </p>
            <a href="mailto:geral@boommakers.pt" className="text-gray-400 text-sm hover:text-accent transition-colors mt-3 block">
              geral@boommakers.pt
            </a>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{section}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item)}
                      className="text-gray-400 text-sm hover:text-white transition-colors text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2026 BoomMakers. Todos os direitos reservados.</p>
          <p className="text-gray-600 text-xs">Sites · Automação · Apps para PMEs portuguesas.</p>
        </div>
      </div>
    </footer>
  )
}
