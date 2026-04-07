import { useEffect, useRef } from 'react'

/* ─── scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── diamond divider ─── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12">
      <div className="h-px w-16 bg-roxo/20" />
      <div className="w-2.5 h-2.5 rotate-45 bg-roxo/30" />
      <div className="h-px w-16 bg-roxo/20" />
    </div>
  )
}

/* ─── section label ─── */
function SectionLabel({ number, text }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-roxo">{number}</span>
      <div className="h-px flex-1 bg-roxo/15" />
      <span className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-cinza">{text}</span>
    </div>
  )
}

/* ─── service card ─── */
function ServiceCard({ icon, title, description, deliverables, delay = 0 }) {
  return (
    <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(123,44,191,0.08)]" style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-display text-xl text-midnight mb-3">{title}</h3>
      <p className="font-body text-[15px] text-cinza leading-relaxed mb-4">{description}</p>
      <ul className="space-y-1.5">
        {deliverables.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] text-preto/70">
            <span className="text-roxo mt-0.5">{'\u2713'}</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── combo card ─── */
function ComboCard({ title, subtitle, items, highlight, delay = 0 }) {
  return (
    <div className={`reveal rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-1.5 ${highlight ? 'bg-midnight text-white border-roxo/30 hover:shadow-[0_20px_60px_rgba(39,39,87,0.3)]' : 'bg-white border-cinza-light/40 hover:shadow-[0_20px_60px_rgba(123,44,191,0.08)]'}`} style={{ transitionDelay: `${delay}ms` }}>
      {highlight && <div className="inline-block bg-roxo text-white text-[11px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">Recomendado</div>}
      <h3 className={`font-display text-xl mb-2 ${highlight ? 'text-white' : 'text-midnight'}`}>{title}</h3>
      <p className={`font-body text-[13px] mb-5 ${highlight ? 'text-white/60' : 'text-cinza'}`}>{subtitle}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`flex items-start gap-2 text-[14px] ${highlight ? 'text-white/80' : 'text-preto/70'}`}>
            <span className={highlight ? 'text-roxo-light' : 'text-roxo'}>{'\u2713'}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── stat block ─── */
function Stat({ value, label, delay = 0 }) {
  return (
    <div className="reveal text-center" style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-4xl md:text-5xl text-roxo mb-2">{value}</div>
      <div className="font-body text-[13px] text-cinza tracking-wide uppercase">{label}</div>
    </div>
  )
}

/* ─── projection table ─── */
function ProjectionTable() {
  const rows = [
    { metric: 'Score Digital', m0: '12 / 100', m3: '55 / 100', m6: '78 / 100', color0: 'text-red-500', color3: 'text-yellow-600', color6: 'text-verde' },
    { metric: 'Pacientes do digital/mês', m0: '0', m3: '15 \u2013 21', m6: '30 \u2013 50', color0: 'text-red-500', color3: 'text-yellow-600', color6: 'text-verde' },
    { metric: 'Receita adicional/mês', m0: 'R$ 0', m3: 'R$ 5 \u2013 7 mil', m6: 'R$ 10 \u2013 17 mil', color0: 'text-red-500', color3: 'text-yellow-600', color6: 'text-verde' },
    { metric: 'Posição Google Maps', m0: 'Invisível', m3: 'Top 5', m6: 'Top 3', color0: 'text-red-500', color3: 'text-yellow-600', color6: 'text-verde' },
    { metric: 'Ocupação da agenda', m0: '~70%', m3: '~80%', m6: '85%+', color0: 'text-cinza', color3: 'text-yellow-600', color6: 'text-verde' },
  ]
  return (
    <div className="reveal overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-roxo/20">
            <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 pr-4">Indicador</th>
            <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 px-4 text-center">Hoje</th>
            <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 px-4 text-center">3 meses</th>
            <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 px-4 text-center">6 meses</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-cinza-light/30">
              <td className="font-body text-[14px] text-preto py-3.5 pr-4">{r.metric}</td>
              <td className={`font-body text-[14px] font-semibold py-3.5 px-4 text-center ${r.color0}`}>{r.m0}</td>
              <td className={`font-body text-[14px] font-semibold py-3.5 px-4 text-center ${r.color3}`}>{r.m3}</td>
              <td className={`font-body text-[14px] font-semibold py-3.5 px-4 text-center ${r.color6}`}>{r.m6}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── main app ─── */
export default function App() {
  const pageRef = useReveal()

  return (
    <div ref={pageRef} className="min-h-screen bg-cream">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/92 backdrop-blur-xl border-b border-roxo/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-roxo flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="font-display text-lg text-midnight">Pulso</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problema" className="font-body text-[13px] text-cinza hover:text-roxo transition-colors tracking-wide">O Problema</a>
            <a href="#servicos" className="font-body text-[13px] text-cinza hover:text-roxo transition-colors tracking-wide">Serviços</a>
            <a href="#caso" className="font-body text-[13px] text-cinza hover:text-roxo transition-colors tracking-wide">Caso Real</a>
            <a href="#entregas" className="font-body text-[13px] text-cinza hover:text-roxo transition-colors tracking-wide">Entregas</a>
            <a href="#combos" className="font-body text-[13px] text-cinza hover:text-roxo transition-colors tracking-wide">Combos</a>
            <a href="#contato" className="font-body text-[13px] bg-roxo text-white px-5 py-2 rounded-full hover:bg-roxo-dark transition-colors tracking-wide">Agendar Conversa</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #7B2CBF 0%, transparent 50%), radial-gradient(circle at 70% 30%, #272757 0%, transparent 50%)'}} />
        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="overflow-hidden mb-2">
            <p className="hero-line hero-line-1 font-body text-[12px] tracking-[0.2em] uppercase text-roxo font-semibold">Assessoria de Marketing para Clínicas Médicas</p>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 className="hero-line hero-line-2 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-midnight">
              Transforme marketing em um sistema previsível de captação de pacientes
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <p className="hero-line hero-line-3 font-body text-lg md:text-xl text-cinza leading-relaxed max-w-[700px] mx-auto">
              Diagnóstico, presença digital, tráfego pago, social media e automações — tudo integrado para clínicas que querem crescer com dados, não com sorte.
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line hero-line-3 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#caso" className="font-body text-[14px] bg-roxo text-white px-8 py-3.5 rounded-full hover:bg-roxo-dark transition-all hover:shadow-lg tracking-wide">Ver Caso Real</a>
              <a href="#servicos" className="font-body text-[14px] border-2 border-roxo/20 text-midnight px-8 py-3.5 rounded-full hover:border-roxo/40 transition-all tracking-wide">Conhecer Serviços</a>
            </div>
          </div>
        </div>
        <a href="#problema" className="absolute bottom-8 float">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" strokeWidth="2"><path d="M12 5v14m-7-7l7 7 7-7"/></svg>
        </a>
      </section>

      <Divider />

      {/* O PROBLEMA */}
      <section id="problema" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="01" text="O Problema" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-6 max-w-[700px]">
          Clínicas excelentes que ninguém encontra
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Médicos com décadas de experiência, avaliações perfeitas e agenda ociosa. O motivo é simples: quem procura no Google não os encontra. A demanda existe — o que falta é um sistema para capturá-la.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat value="46%" label="das buscas no Google são locais" delay={0} />
          <Stat value="72%" label="dos pacientes pesquisam antes de agendar" delay={100} />
          <Stat value="3" label="clínicas no Map Pack captam 80% dos cliques" delay={200} />
          <Stat value="R$ 88k" label="receita perdida por ano sem presença digital" delay={300} />
        </div>
      </section>

      <Divider />

      {/* SERVIÇOS */}
      <section id="servicos" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="02" text="Serviços" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          11 entregas que cobrem toda a jornada
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Do diagnóstico à automação com IA — cada entrega foi desenhada para resolver um gargalo específico da clínica médica.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard icon={'\uD83D\uDD0D'} title="Diagnóstico Completo" description="Auditoria comercial + digital com score 0-100. Identifica exatamente onde a clínica perde pacientes." deliverables={['Relatório 10-15 páginas', 'Score digital 0-100', 'Mapa de oportunidades', 'Receita perdida estimada']} delay={0} />
          <ServiceCard icon={'\uD83D\uDCC8'} title="Pesquisa de Marketing" description="Inteligência de mercado: persona, keywords com volume e CPC, análise de 5-10 concorrentes." deliverables={['Persona detalhada', '50-100 keywords mapeadas', 'Mapa de concorrentes', 'Análise de sazonalidade']} delay={100} />
          <ServiceCard icon={'\uD83D\uDCCD'} title="Google Meu Negócio" description="Criação/otimização do perfil para aparecer no Map Pack — as 3 primeiras posições do Google Maps." deliverables={['Perfil verificado e otimizado', '1-2 posts/semana', 'Gestão de avaliações 24h', 'Relatório mensal de insights']} delay={200} />
          <ServiceCard icon={'\uD83C\uDF10'} title="Criação de Site" description="Site institucional mobile-first com SEO, PageSpeed 85+ e conformidade CFM." deliverables={['6-8 páginas otimizadas', 'SEO on-page completo', 'Schema MedicalClinic', 'GA4 + Search Console']} delay={0} />
          <ServiceCard icon={'\u26A1'} title="Landing Pages" description="Páginas de conversão focadas: 8-15% de conversão vs. 2-5% do site geral." deliverables={['LP por procedimento/campanha', 'Headline + copy + FAQ', 'Formulário ou botão WhatsApp', 'A/B testing configurado']} delay={100} />
          <ServiceCard icon={'\uD83D\uDE80'} title="Tráfego Pago" description="Google Ads + Meta Ads com otimização 2-3x por semana. Resultados visíveis na semana 2." deliverables={['Campanhas Google + Meta', '4-8 criativos/mês', 'Remarketing ativo', 'Dashboard em tempo real']} delay={200} />
          <ServiceCard icon={'\uD83D\uDCAC'} title="Auditoria Comercial" description="Análise do funil de vendas com cliente oculto. Reduzir tempo de resposta de 4h para 15min dobra a conversão." deliverables={['Score de atendimento 0-100', 'Scripts WhatsApp e telefone', 'Fluxo de automação', 'Treinamento da equipe']} delay={0} />
          <ServiceCard icon={'\uD83D\uDCF7'} title="Social Media" description="Instagram completo: 12-20 posts + Reels + Stories por mês com gestão de comunidade." deliverables={['Setup de perfil otimizado', 'Calendário editorial mensal', 'Gestão de comentários e DMs', 'Relatório de engajamento']} delay={100} />
          <ServiceCard icon={'\uD83C\uDFA8'} title="Criativos" description="Peças visuais + vídeos editados para feed e anúncios. Roteiros prontos para gravação." deliverables={['10-20 peças estáticas/mês', '4-8 vídeos editados/mês', 'Roteiros de Reels', 'Variações A/B para ads']} delay={200} />
          <ServiceCard icon={'\uD83E\uDD16'} title="IA e Automações" description="Bot WhatsApp 24h, qualificação de leads, notificações automáticas, CRM integrado." deliverables={['Bot de triagem WhatsApp', 'Qualificação automática', 'Notificações paciente+equipe', 'CRM configurado']} delay={0} />
          <ServiceCard icon={'\uD83D\uDCDA'} title="Consultoria Estratégica" description="Mapeamento de processos, rituais de gestão, treinamento comercial, pesquisa de clima e NPS." deliverables={['Mapeamento de processos', 'Rituais e métricas definidos', 'Treinamento de equipe', 'NPS automatizado']} delay={100} />
        </div>
      </section>

      <Divider />

      {/* CASO REAL */}
      <section id="caso" className="py-20 bg-midnight">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <SectionLabel number="03" text="Caso Real" />
          <h2 className="reveal font-display text-3xl md:text-4xl text-white mb-4 max-w-[700px]">
            Ortopedista em Ceilândia — Score 12/100
          </h2>
          <p className="reveal font-body text-lg text-white/60 leading-relaxed max-w-[700px] mb-12">
            Médico com 5 estrelas, 36 avaliações positivas, 30+ anos de experiência — e zero presença digital. Nenhum site, nenhum Instagram, Google Meu Negócio básico. Pacientes que o procuram no Google simplesmente não o encontram.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="reveal bg-midnight-deep rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="font-body text-[12px] tracking-wider uppercase text-white/50 font-semibold">Situação Atual</span>
              </div>
              <ul className="space-y-3">
                {['Score digital: 12/100', 'Sem site institucional', 'Sem perfil no Instagram', 'GMB desotimizado — não aparece no Map Pack', 'Zero campanhas de tráfego pago', 'Sem landing page para procedimentos', 'Atendimento via telefone fixo apenas', 'Pacientes 100% por indicação'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/70 text-[14px]">
                    <span className="text-red-400 mt-0.5">{'\u2717'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal bg-midnight-deep rounded-2xl p-8 border border-roxo/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-verde" />
                <span className="font-body text-[12px] tracking-wider uppercase text-white/50 font-semibold">Com Pulso (6 meses)</span>
              </div>
              <ul className="space-y-3">
                {['Score digital: 78/100', 'Site otimizado com SEO e Schema', 'Instagram ativo com 16+ posts/mês', 'Top 3 no Google Maps para 5 termos', 'Google Ads + Meta Ads gerando 30-50 leads/mês', '3 landing pages de alta conversão', 'Bot WhatsApp 24h qualificando leads', '30-50 novos pacientes/mês via digital'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/70 text-[14px]">
                    <span className="text-verde mt-0.5">{'\u2713'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="font-display text-3xl text-roxo-light">5.0 {'\u2605'}</div>
              <div className="font-body text-[12px] text-white/40 tracking-wider uppercase mt-1">Avaliação média</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl text-roxo-light">36</div>
              <div className="font-body text-[12px] text-white/40 tracking-wider uppercase mt-1">Avaliações positivas</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl text-roxo-light">30+</div>
              <div className="font-body text-[12px] text-white/40 tracking-wider uppercase mt-1">Anos de experiência</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl text-red-400">0</div>
              <div className="font-body text-[12px] text-white/40 tracking-wider uppercase mt-1">Pacientes via digital</div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ENTREGAS — SHOWCASE */}
      <section id="entregas" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="04" text="Entregas" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          Veja o que entregamos — de verdade
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Estes são exemplos reais produzidos para o caso do ortopedista. Identidade visual, site, landing page, posts e criativos — tudo pronto para uso.
        </p>

        {/* Site Institucional */}
        <div className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-roxo/10 flex items-center justify-center">
              <span className="text-xl">{'\uD83C\uDF10'}</span>
            </div>
            <div>
              <h3 className="font-display text-xl text-midnight">Site Institucional</h3>
              <p className="font-body text-[13px] text-cinza">8 páginas, mobile-first, SEO, Schema MedicalClinic</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cinza-light/40 overflow-hidden bg-white">
            <iframe
              src="https://oguidomingos.github.io/site-clinica-modelo/"
              className="w-full h-[500px] md:h-[600px] border-0"
              title="Site Institucional — Clínica Modelo"
              loading="lazy"
            />
            <div className="px-6 py-4 border-t border-cinza-light/30 flex items-center justify-between">
              <span className="font-body text-[12px] text-cinza">Site completo com serviços, depoimentos, FAQ e agendamento</span>
              <a href="https://oguidomingos.github.io/site-clinica-modelo/" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-roxo hover:text-roxo-dark transition-colors">Abrir em nova aba {'\u2197'}</a>
            </div>
          </div>
        </div>

        {/* Landing Page */}
        <div className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-roxo/10 flex items-center justify-center">
              <span className="text-xl">{'\u26A1'}</span>
            </div>
            <div>
              <h3 className="font-display text-xl text-midnight">Landing Page de Conversão</h3>
              <p className="font-body text-[13px] text-cinza">Alta conversão para procedimento específico (Infiltração)</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cinza-light/40 overflow-hidden bg-white">
            <iframe
              src="https://oguidomingos.github.io/lp-clinica-modelo/"
              className="w-full h-[500px] md:h-[600px] border-0"
              title="Landing Page — Infiltração"
              loading="lazy"
            />
            <div className="px-6 py-4 border-t border-cinza-light/30 flex items-center justify-between">
              <span className="font-body text-[12px] text-cinza">LP focada em conversão: headline magnética, benefícios, social proof, CTA</span>
              <a href="https://oguidomingos.github.io/lp-clinica-modelo/" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-roxo hover:text-roxo-dark transition-colors">Abrir em nova aba {'\u2197'}</a>
            </div>
          </div>
        </div>

        {/* Identidade Visual */}
        <div className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-roxo/10 flex items-center justify-center">
              <span className="text-xl">{'\uD83C\uDFA8'}</span>
            </div>
            <div>
              <h3 className="font-display text-xl text-midnight">Identidade Visual</h3>
              <p className="font-body text-[13px] text-cinza">Logo, paleta, tipografia, mockups profissionais</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cinza-light/40 overflow-hidden bg-white">
            <iframe
              src="https://oguidomingos.github.io/pulso-clinica-brand/"
              className="w-full h-[500px] md:h-[600px] border-0"
              title="Identidade Visual — Clínica Modelo"
              loading="lazy"
            />
            <div className="px-6 py-4 border-t border-cinza-light/30 flex items-center justify-between">
              <span className="font-body text-[12px] text-cinza">Manual de identidade visual com logo, cores, tipografia e mockups</span>
              <a href="https://oguidomingos.github.io/pulso-clinica-brand/" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-roxo hover:text-roxo-dark transition-colors">Abrir em nova aba {'\u2197'}</a>
            </div>
          </div>
        </div>

        {/* Posts + Criativos */}
        <div className="reveal grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-cinza-light/40">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{'\uD83D\uDCF7'}</span>
              <h3 className="font-display text-xl text-midnight">Posts Instagram</h3>
            </div>
            <p className="font-body text-[14px] text-cinza mb-4">24 posts profissionais produzidos: carrosséis educativos, provas sociais, dicas e institucionais.</p>
            <ul className="space-y-2 mb-6">
              {['8 carrosséis educativos (5 cards cada)', '8 posts de dicas e prevenção', '4 posts de prova social', '4 posts institucionais'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-preto/70">
                  <span className="text-roxo">{'\u2713'}</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://drive.google.com/drive/folders/1BqqFi6I7oNTTBvLdoF9t1d-mao9faS_L" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-roxo hover:text-roxo-dark transition-colors inline-flex items-center gap-1">
              Ver 24 posts no Drive {'\u2197'}
            </a>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-cinza-light/40">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{'\uD83D\uDE80'}</span>
              <h3 className="font-display text-xl text-midnight">Criativos Meta Ads</h3>
            </div>
            <p className="font-body text-[14px] text-cinza mb-4">6 criativos prontos para campanhas no Facebook e Instagram: feed (1:1) e stories (9:16).</p>
            <ul className="space-y-2 mb-6">
              {['Dor no joelho — feed + stories', 'Infiltração articular — feed + stories', 'Institucional clínica — feed + stories'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-preto/70">
                  <span className="text-roxo">{'\u2713'}</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://drive.google.com/drive/folders/18l-6UX_61HO22kx5bLEi3dUIjpqc3xPP" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-roxo hover:text-roxo-dark transition-colors inline-flex items-center gap-1">
              Ver 6 criativos no Drive {'\u2197'}
            </a>
          </div>
        </div>

        {/* Planejamento */}
        <div className="reveal mt-6 bg-white rounded-2xl p-8 border border-cinza-light/40">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{'\uD83D\uDCCB'}</span>
            <h3 className="font-display text-xl text-midnight">Planejamento Estratégico</h3>
          </div>
          <p className="font-body text-[14px] text-cinza mb-4">Documento completo com copy de 8 posts, calendário editorial, tom de voz e diretrizes de conteúdo para Instagram.</p>
          <a href="https://docs.google.com/document/d/1U5afJ8JEqe6b4S_lh8TQmjQr9FBY1jb5/edit" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-roxo hover:text-roxo-dark transition-colors inline-flex items-center gap-1">
            Ver documento de planejamento {'\u2197'}
          </a>
        </div>
      </section>

      <Divider />

      {/* PROJEÇÃO */}
      <section id="projecao" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="05" text="Projeção" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          De invisível a referência em 6 meses
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Projeção baseada em benchmarks reais de clínicas médicas que implementaram um sistema completo de marketing digital.
        </p>
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-cinza-light/40">
          <ProjectionTable />
        </div>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <div className="reveal bg-white rounded-2xl p-6 border border-cinza-light/40 text-center">
            <div className="font-display text-2xl text-roxo mb-1">R$ 10 – 17k</div>
            <div className="font-body text-[13px] text-cinza">Receita adicional/mês no M6</div>
          </div>
          <div className="reveal bg-white rounded-2xl p-6 border border-cinza-light/40 text-center" style={{transitionDelay:'100ms'}}>
            <div className="font-display text-2xl text-roxo mb-1">ROAS 5x+</div>
            <div className="font-body text-[13px] text-cinza">Retorno sobre investimento em ads</div>
          </div>
          <div className="reveal bg-white rounded-2xl p-6 border border-cinza-light/40 text-center" style={{transitionDelay:'200ms'}}>
            <div className="font-display text-2xl text-verde mb-1">85%+</div>
            <div className="font-body text-[13px] text-cinza">Ocupação da agenda no M6</div>
          </div>
        </div>
      </section>

      <Divider />

      {/* COMBOS */}
      <section id="combos" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="06" text="Combos" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          Escolha o modelo ideal para a clínica
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Cada combo é uma combinação estratégica de serviços. Todos incluem diagnóstico e pesquisa de marketing como base.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComboCard title="Só Tráfego" subtitle="Para quem já tem site e Instagram" items={['Google Ads + Meta Ads', 'Landing pages por campanha', '8-12 criativos/mês', 'Otimização 2-3x/semana', 'Relatório mensal completo']} delay={0} />
          <ComboCard title="Só Social Media" subtitle="Para construir autoridade no Instagram" items={['16 posts + 8 Reels/mês', '20 Stories/mês', '16 peças visuais + 8 vídeos', 'Calendário editorial', 'Gestão de comunidade']} delay={100} />
          <ComboCard title="Site + Presença Digital" subtitle="Fundação para quem começa do zero" items={['Site institucional 6-8 páginas', 'Google Meu Negócio completo', 'SEO básico + Blog 2 posts/mês', 'WhatsApp + agendamento', 'Relatório mensal']} highlight delay={200} />
          <ComboCard title="Captação Total" subtitle="Tráfego pago + orgânico integrados" items={['Google Ads + Meta Ads', '16 posts + 8 Reels + 20 stories/mês', 'Landing pages + criativos', 'Dashboard unificado', 'Reunião estratégica mensal']} delay={0} />
          <ComboCard title="Autoridade + Conteúdo" subtitle="Para médicos que querem virar referência" items={['Instagram completo', '20 peças visuais + 8 vídeos/mês', 'Roteiros para gravação', 'Legendas em todos os vídeos', 'Relatório de crescimento']} delay={100} />
          <ComboCard title="Consultoria + 90 dias" subtitle="Diagnóstico + execução imediata" items={['Diagnóstico comercial + digital', 'Pesquisa + scripts de venda', 'GMB + site ou LP entregues', 'Primeiras campanhas ativas', 'Roadmap priorizado 90 dias']} delay={200} />
        </div>
      </section>

      <Divider />

      {/* PACOTES */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="07" text="Pacotes Completos" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          Recorrência mensal — resultados contínuos
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Planos desenhados para acompanhar o crescimento da clínica. Contrato mínimo de 6 meses — marketing precisa de consistência.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40">
            <h3 className="font-display text-2xl text-midnight mb-1">Pulso Starter</h3>
            <p className="font-body text-[13px] text-cinza mb-6">Para clínicas começando no digital</p>
            <ul className="space-y-2 mb-8">
              {['Diagnóstico completo', 'GMB + manutenção mensal', '12 posts/mês + 10 stories', '12 peças visuais/mês', 'Relatório mensal'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-preto/70">
                  <span className="text-roxo">{'\u2713'}</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contato" className="block text-center font-body text-[14px] border-2 border-roxo/20 text-midnight px-6 py-3 rounded-full hover:border-roxo/40 transition-all">Consultar valores</a>
          </div>
          <div className="reveal bg-midnight rounded-2xl p-8 border border-roxo/30 relative" style={{transitionDelay:'100ms'}}>
            <div className="absolute -top-3 left-8 bg-roxo text-white text-[11px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full">Popular</div>
            <h3 className="font-display text-2xl text-white mb-1">Pulso Growth</h3>
            <p className="font-body text-[13px] text-white/50 mb-6">Para acelerar a captação de pacientes</p>
            <ul className="space-y-2 mb-8">
              {['Tudo do Starter +', 'Pesquisa de marketing completa', 'Site institucional', 'Google Ads + Meta Ads', '16 posts + 8 Reels/mês', 'Landing page por campanha', 'Auditoria comercial + scripts', 'Reunião estratégica mensal'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-white/80">
                  <span className="text-roxo-light">{'\u2713'}</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contato" className="block text-center font-body text-[14px] bg-roxo text-white px-6 py-3 rounded-full hover:bg-roxo-dark transition-all">Consultar valores</a>
          </div>
          <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40" style={{transitionDelay:'200ms'}}>
            <h3 className="font-display text-2xl text-midnight mb-1">Pulso Pro</h3>
            <p className="font-body text-[13px] text-cinza mb-6">Para dominar o mercado local</p>
            <ul className="space-y-2 mb-8">
              {['Tudo do Growth +', 'SEO avançado + 4 blog posts/mês', 'Email marketing + CRM + automações', 'Gestão de reputação online', 'Bot IA + qualificação automática', 'Multi-plataforma (IG + TikTok + YT)', 'Dashboard em tempo real', 'Reuniões quinzenais'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-preto/70">
                  <span className="text-roxo">{'\u2713'}</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contato" className="block text-center font-body text-[14px] border-2 border-roxo/20 text-midnight px-6 py-3 rounded-full hover:border-roxo/40 transition-all">Consultar valores</a>
          </div>
        </div>
      </section>

      <Divider />

      {/* COMO FUNCIONA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="08" text="Processo" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-12 max-w-[700px]">
          Do diagnóstico aos resultados em 5 etapas
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Conversa inicial', desc: 'Entendemos a clínica, os objetivos e os gargalos atuais.' },
            { step: '02', title: 'Diagnóstico', desc: 'Auditoria comercial + digital com score e mapa de oportunidades.' },
            { step: '03', title: 'Plano de ação', desc: 'Estratégia personalizada com cronograma e metas claras.' },
            { step: '04', title: 'Execução', desc: 'Time especializado implementa tudo com aprovação do médico.' },
            { step: '05', title: 'Resultados', desc: 'Otimização contínua com métricas, relatórios e reuniões.' },
          ].map((item, i) => (
            <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 rounded-full bg-roxo/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-lg text-roxo">{item.step}</span>
              </div>
              <h4 className="font-display text-lg text-midnight mb-2">{item.title}</h4>
              <p className="font-body text-[13px] text-cinza leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* DIFERENCIAIS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="09" text="Diferenciais" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-12 max-w-[700px]">
          Por que Pulso — e não qualquer agência
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '\u2696', title: 'Conformidade CFM', desc: 'Toda comunicação segue a Resolução 2.336/2023. Sem riscos éticos.' },
            { icon: '\uD83D\uDCCA', title: 'Foco em agenda', desc: 'KPI principal é pacientes agendados — não curtidas ou seguidores.' },
            { icon: '\uD83C\uDFE5', title: 'Especialistas em saúde', desc: 'Entendemos jornada do paciente, compliance e linguagem médica.' },
            { icon: '\uD83E\uDD16', title: 'IA integrada', desc: 'Bot 24h, qualificação automática e dashboards inteligentes.' },
          ].map((item, i) => (
            <div key={i} className="reveal bg-white rounded-2xl p-6 border border-cinza-light/40 text-center" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-display text-lg text-midnight mb-2">{item.title}</h4>
              <p className="font-body text-[13px] text-cinza leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* KPIs */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="10" text="Métricas" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          O que medimos — e entregamos
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Transparência total. Cada indicador é acompanhado em dashboard e reportado mensalmente.
        </p>
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { value: '+30%', label: 'Leads qualificados em 90 dias' },
            { value: '< R$30', label: 'Custo por lead (CPL)' },
            { value: '25-40%', label: 'Conversão lead → consulta' },
            { value: '4.7+', label: 'Nota no Google' },
            { value: '< 15%', label: 'Taxa de no-show' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-cinza-light/40 text-center">
              <div className="font-display text-2xl text-roxo mb-1">{item.value}</div>
              <div className="font-body text-[12px] text-cinza">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section id="contato" className="py-24 bg-midnight relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #7B2CBF 0%, transparent 70%)'}} />
        <div className="relative max-w-[700px] mx-auto px-6 md:px-12 text-center">
          <h2 className="reveal font-display text-3xl md:text-4xl text-white mb-4">
            Pronto para transformar a captação da clínica?
          </h2>
          <p className="reveal font-body text-lg text-white/60 leading-relaxed mb-10">
            O diagnóstico inicial é gratuito. Em 30 minutos, mostramos exatamente onde a clínica está perdendo pacientes e o que fazer primeiro.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/5561999999999?text=Quero%20agendar%20o%20diagn%C3%B3stico%20gratuito%20Pulso" target="_blank" rel="noopener noreferrer" className="font-body text-[14px] bg-roxo text-white px-8 py-3.5 rounded-full hover:bg-roxo-dark transition-all hover:shadow-lg tracking-wide inline-flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Agendar Diagnóstico Gratuito
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-cream border-t border-roxo/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-roxo flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <span className="font-display text-sm text-midnight">Pulso</span>
              <span className="font-body text-[12px] text-cinza ml-2">por Trion Marketing</span>
            </div>
            <p className="font-body text-[12px] text-cinza">
              Assessoria de marketing especializada em clínicas médicas
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
