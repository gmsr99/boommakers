import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Setores', href: '#setores' },
  { label: 'ROI', href: '#roi' },
  { label: 'Preços', href: '#precos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}) }}
             className="flex items-center gap-2 group select-none" data-hover>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-dark text-sm shadow-orange transition-shadow group-hover:shadow-orange-lg">
              B
            </div>
            <span className="font-black text-xl tracking-tight">
              <span className="text-white">BOOM</span>
              <span className="text-gray-400">MAKERS</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} data-hover
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium cursor-none">
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('#contacto')}
              className="btn-primary text-sm px-5 py-2.5 hidden md:inline-flex" data-hover>
              Falar connosco →
            </button>
            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-400 hover:text-white" data-hover>
              <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1' : 'mb-1'}`} />
              <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : 'mb-1'}`} />
              <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-border px-6 py-6 flex flex-col gap-4 md:hidden"
          >
            {links.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                className="text-left text-white font-medium text-lg border-b border-border pb-3">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#contacto')} className="btn-primary justify-center">
              Falar connosco →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
