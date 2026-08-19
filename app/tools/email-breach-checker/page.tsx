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
    question: 'Do you store the email address I search for?',
    answer: 'No. Your email search is never saved, stored, or logged on our servers.'
  },
  {
    question: 'Will this show my leaked passwords?',
    answer: 'No. The tool only checks for the presence of your email in known security breach incident lists, never the leaked passwords.'
  },
  {
    question: 'What should I do if my email was found in a breach?',
    answer: 'Immediately change the password for the affected service, update any other accounts sharing that password, and enable two-factor authentication.'
  },
  {
    question: 'What does a clean result mean?',
    answer: 'A clean result means your email address was not found in known public breach records indexed by this tool.'
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
