import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CTASection from '@/components/cta-section'
import GuideToc from './guide-toc'
import { guideContent, type GuideBlock } from '@/lib/guide-data'
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema, jsonLdHowToInstall } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Locksy User Guide — How to Lock and Protect Browser Tabs',
  'Learn how to install, configure, lock, automate, hide, and troubleshoot Locksy browser tab protection. Complete step-by-step user guide for Chrome, Firefox, Edge, and more.',
  '/guide',
  [
    'Locksy user guide',
    'how to lock browser tabs',
    'Locksy tutorial',
    'browser tab password protection',
    'Locksy setup guide',
    'tab locking extension guide'
  ]
)

function renderBlock(block: GuideBlock, index: number) {
  if (block.type === 'steps') {
    return (
      <ol key={index} className="space-y-4">
        {block.items.map((item, stepIndex) => (
          <li key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-black text-white">
              {stepIndex + 1}
            </span>
            <div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    )
  }

  if (block.type === 'table') {
    return (
      <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-muted/50 px-5 py-4 font-bold text-foreground">{block.caption}</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/50">
                {block.head.map((heading) => <th key={heading} className="px-5 py-3 font-bold text-foreground">{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border/60 last:border-0 align-top">
                  {row.map((cell, cellIndex) => <td key={cellIndex} className="px-5 py-4 leading-relaxed text-muted-foreground">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (block.type === 'callout') {
    const toneClass = block.tone === 'warning'
      ? 'border-amber-500/30 bg-amber-500/10'
      : block.tone === 'pro'
        ? 'border-violet-500/30 bg-violet-500/10'
        : 'border-primary/30 bg-primary/10'
    const icon = block.tone === 'warning' ? '⚠️' : block.tone === 'pro' ? '💎' : '💡'
    return (
      <aside key={index} className={`rounded-2xl border p-5 ${toneClass}`}>
        <div className="flex gap-3">
          <span className="text-xl" aria-hidden="true">{icon}</span>
          <div><h3 className="font-bold text-foreground">{block.title}</h3><p className="mt-1 leading-relaxed text-muted-foreground">{block.body}</p></div>
        </div>
      </aside>
    )
  }

  if (block.type === 'prose') {
    return <p key={index} className="leading-8 text-muted-foreground">{block.body}</p>
  }

  return (
    <div key={index} className="space-y-3">
      {block.items.map((item) => (
        <details key={item.q} className="group rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
          <summary className="cursor-pointer list-none font-bold text-foreground marker:hidden">{item.q}<span className="float-right text-muted-foreground group-open:rotate-45 transition-transform">+</span></summary>
          <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export default function GuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'User Guide', url: '/guide' }
  ])
  const faqItems = guideContent.chapters
    .flatMap((chapter) => chapter.blocks)
    .filter((block): block is Extract<GuideBlock, { type: 'qa' }> => block.type === 'qa')
    .flatMap((block) => block.items.map((item) => ({ question: item.q, answer: item.a })))
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowToInstall) }} />

      <Header />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <header className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">📖 Complete User Guide</div>
            <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">Everything you need to know about <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Locksy</span></h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Install it, lock your first tab, automate protection, secure whole websites, catch snoopers, and understand exactly what Locksy does behind the scenes.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="/locksy-user-guide.pdf" download className="btn-primary inline-flex items-center gap-2">⬇️ Download PDF</a>
              <span className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground">Version {guideContent.version} · Updated {guideContent.updated}</span>
            </div>
          </header>

          <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
            <GuideToc chapters={guideContent.chapters} />
            <div className="min-w-0 space-y-14">
              {guideContent.chapters.map((chapter) => (
                <section key={chapter.id} id={chapter.id} className="scroll-mt-28">
                  <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl shadow-lg" aria-hidden="true">{chapter.icon}</div>
                    <div><p className="text-sm font-bold uppercase tracking-wider text-primary">Chapter {chapter.num}</p><h2 className="text-3xl font-black tracking-tight text-foreground">{chapter.title}</h2></div>
                  </div>
                  <p className="mb-7 text-lg leading-8 text-muted-foreground">{chapter.intro}</p>
                  <div className="space-y-5">{chapter.blocks.map(renderBlock)}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <CTASection />
      <Footer />
    </>
  )
}
