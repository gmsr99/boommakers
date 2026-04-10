import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const projects = [
  {
    id: 'golden-move',
    name: 'Golden Move',
    desc: 'Plataforma de fitness, bem-estar e acompanhamento personalizado',
    type: 'Website',
    typeColor: '#6366F1',
    image: '/Clientes/Golden Move/PC1.png',
    logo: '/Clientes/Golden Move/Logo/Logo_GoldenMove_Transparente_V1-03.png',
    mobileImage: '/Clientes/Golden Move/Mobile1.png',
  },
  {
    id: 'empatia',
    name: 'EmpatIA',
    desc: 'Aplicação de inteligência emocional e suporte psicológico digital',
    type: 'App',
    typeColor: '#F97316',
    image: '/Clientes/EmpatIA/PC1.png',
    logo: '/Clientes/EmpatIA/Logo/Logo EmpatIA_provisorio.png',
    mobileImage: '/Clientes/EmpatIA/Mobile1.png',
  },
  {
    id: 'nexseed',
    name: 'NexSeed',
    desc: 'Plataforma de investimento em startups e inovação tecnológica',
    type: 'Website',
    typeColor: '#6366F1',
    image: '/Clientes/NexSeed/PC1.png',
    logo: '/Clientes/NexSeed/Logo/logo_nexseed.png',
    mobileImage: '/Clientes/NexSeed/Mobile1.png',
  },
  {
    id: 'bpm-rap',
    name: 'BPM RAP Nova Escola',
    desc: 'Gestão escolar, acompanhamento académico e comunicação com encarregados',
    type: 'App',
    typeColor: '#F97316',
    image: '/Clientes/App BPM RAP Nova Escola/PC1.png',
    logo: '/Clientes/App BPM RAP Nova Escola/Logo/logo_fundo_transparente.png',
    mobileImage: '/Clientes/App BPM RAP Nova Escola/Mobile1.png',
  },
  {
    id: 'sr-lucas',
    name: 'Bordados do Sr. Lucas',
    desc: 'Loja online de bordados artesanais e personalizados',
    type: 'Website',
    typeColor: '#6366F1',
    image: '/Clientes/Bordados do Sr. Lucas/mobile1.png',
    logo: '/Clientes/Bordados do Sr. Lucas/Logo/Sr.Lucas_Logo (1).png',
    mobileImage: null,
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        className="gradient-border overflow-hidden group cursor-none h-full flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-hover
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video bg-dark-200">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Mobile overlay */}
          {project.mobileImage && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={hovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 right-3 w-16 rounded-lg overflow-hidden border-2 border-white/20 shadow-card"
            >
              <img src={project.mobileImage} alt={`${project.name} mobile`} className="w-full" />
            </motion.div>
          )}

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
              style={{ background: `${project.typeColor}25`, color: project.typeColor, border: `1px solid ${project.typeColor}50`, backdropFilter: 'blur(8px)' }}
            >
              {project.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-xl bg-dark-300 border border-border flex items-center justify-center overflow-hidden shrink-0">
            <img src={project.logo} alt={`${project.name} logo`} className="w-8 h-8 object-contain" />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-base truncate">{project.name}</div>
            <div className="text-gray-400 text-sm mt-1 leading-relaxed">{project.desc}</div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Portfolio() {
  return (
    <section className="py-24 bg-dark-100 relative" id="portfolio">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <div className="tag mx-auto mb-4">Portfólio</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Projetos que{' '}
            <span className="gradient-text">falam por si</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Alguns dos trabalhos que desenvolvemos para empresas e startups portuguesas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Queres ver o teu projeto aqui?{' '}
            <button
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-accent hover:text-accent-light transition-colors font-semibold cursor-none"
              data-hover
            >
              Fala connosco →
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
