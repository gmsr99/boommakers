import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import Hero from './components/sections/Hero'
import Campanha from './components/sections/Campanha'
import Servicos from './components/sections/Servicos'
import Portfolio from './components/sections/Portfolio'
import Sectors from './components/sections/Sectors'
import HowItWorks from './components/sections/HowItWorks'
import ROICalculator from './components/sections/ROICalculator'
import Pricing from './components/sections/Pricing'
import LogosClientes from './components/sections/LogosClientes'
import Contact from './components/sections/Contact'

export default function App() {
  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }).catch(() => {})
    return () => { if (lenis) lenis.destroy() }
  }, [])

  return (
    <div className="bg-dark min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Campanha />
        <Servicos />
        <Portfolio />
        <Sectors />
        <HowItWorks />
        <ROICalculator />
        <Pricing />
        <LogosClientes />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
