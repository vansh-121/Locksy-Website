import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/metadata'
import PasswordGeneratorClient from './password-generator-client'

export const metadata: Metadata = generatePageMetadata(
  'Free Random Password Generator – Cryptographically Secure & Offline',
  'Generate high-entropy random passwords in your browser using crypto.getRandomValues(). Adjustable length up to 64 characters, no server, nothing logged or transmitted.',
  '/tools/password-generator',
  [
    'random password generator',
    'secure password generator',
    'cryptographic password generator',
    'offline password generator',
    'strong password generator 64 characters',
    'crypto.getRandomValues password'
  ]
)

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Free Security Tools', url: '/tools' },
  { name: 'Password Generator', url: '/tools/password-generator' }
])

const faqSchema = generateFAQSchema([
  {
    question: 'Are my generated passwords sent to any server?',
    answer: 'No. Passwords are generated completely locally in your browser memory and are never sent over the internet or saved to any server.'
  },
  {
    question: 'How long should a strong password be?',
    answer: 'We recommend at least 16 characters for critical accounts. Using a combination of uppercase, lowercase, numbers, and symbols ensures high security against brute-force attacks.'
  },
  {
    question: 'What is the "Avoid Ambiguous Characters" setting?',
    answer: 'It removes visually similar characters like "1", "l", "I", "0", and "O" so passwords are easier to read and manually type.'
  },
  {
    question: 'How should I store my generated passwords?',
    answer: 'Store your generated passwords in a reputable password manager so you do not need to memorize complex strings.'
  }
])

export default function PasswordGeneratorPage() {
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
      <PasswordGeneratorClient />
    </>
  )
}
