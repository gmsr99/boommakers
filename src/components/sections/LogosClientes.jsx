import ScrollReveal from '../ui/ScrollReveal'

const clients = [
  { name: 'Golden Move', logo: '/Clientes/Golden Move/Logo/Logo_GoldenMove_Transparente_V1-03.png' },
  { name: 'EmpatIA', logo: '/Clientes/EmpatIA/Logo/Logo EmpatIA_provisorio.png' },
  { name: 'NexSeed', logo: '/Clientes/NexSeed/Logo/logo_nexseed.png' },
  { name: 'BPM RAP Nova Escola', logo: '/Clientes/App BPM RAP Nova Escola/Logo/logo_fundo_transparente.png' },
  { name: 'Bordados do Sr. Lucas', logo: '/Clientes/Bordados do Sr. Lucas/Logo/Sr.Lucas_Logo (1).png' },
  { name: 'ClinicBel', logo: '/Clientes/ClinicBel/Logo/logo-clinicbel.jpg' },
  { name: 'MF Profissional', logo: '/Clientes/MFProfissional/Logo/LOGO-MF-PROFISSINAL-3.png' },
]

export default function LogosClientes() {
  return (
    <section className="py-16 bg-dark border-t border-border relative" id="clientes">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">Já confiam em nós</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {clients.map((c) => (
              <div
                key={c.name}
                className="group flex items-center justify-center"
                title={c.name}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-10 md:h-12 w-auto object-contain
                    filter grayscale opacity-40
                    group-hover:grayscale-0 group-hover:opacity-100
                    transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
