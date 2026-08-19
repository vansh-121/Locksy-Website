import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/metadata'
import EmailBreachCheckerClient from './email-breach-checker-client'

export const metadata: Metadata = generatePageMetadata(
  'Email Data Breach Checker – Free Public Leak Lookup',
  'Check whether your email address appears in publicly disclosed data breaches, plus a plain explanation of what the result means, what the lookup sends, and what to fix first.',
  '/tools/email-breach-checker',
  [
    'email breach checker',
    'has my email been leaked',
    'data breach lookup',
    'check email in data breach free',
    'credential stuffing protection',
    'was my password leaked'
  ]
)

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Free Security Tools', url: '/tools' },
  { name: 'Email Breach Checker', url: '/tools/email-breach-checker' }
])

const faqSchema = generateFAQSchema([
  {
    question: 'Do you store the address I search for?',
    answer: 'We do not — there is no backend here to store it in, and nothing is written to local storage. The address is, however, sent to a third-party public breach API in order to perform the lookup, which is what makes the check possible at all.'
  },
  {
    question: 'Will this show me the leaked password?',
    answer: 'No, and you should distrust any free tool that offers to. The index returns the names of the breached services only. A site willing to hand you plaintext credentials for an arbitrary address is telling you something about its own ethics.'
  },
  {
    question: 'A breach is listed from years ago. Do I still need to act?',
    answer: 'If the password from that era is genuinely dead everywhere, no. Old dumps stay in circulation indefinitely and get re-tried whenever a new credential-stuffing campaign spins up, so the only thing that makes an old breach harmless is that the credentials no longer work anywhere.'
  },
  {
    question: 'What does a clean result actually prove?',
    answer: 'That the address does not appear in the dumps this index has processed. Breaches routinely go undetected for months before disclosure, plenty are never disclosed, and stolen data is often traded privately long before it reaches a public corpus. Read it as "nothing known yet" rather than "never exposed."'
  },
  {
    question: 'Does using email aliases or a catch-all domain help?',
    answer: 'It helps a great deal. A distinct address per service means a breach exposes one alias rather than the identifier tying all your accounts together, and it tells you exactly which company leaked your data. It does not protect the password, so treat it as compartmentalisation rather than a substitute for unique credentials.'
  }
])

export default function EmailBreachCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmailBreachCheckerClient />
    </>
  )
}
