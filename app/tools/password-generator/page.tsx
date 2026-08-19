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
    question: 'Are these passwords sent to a server?',
    answer: 'No. Generation happens in your browser via the Web Crypto API. There is no network request involved in producing or displaying them, and nothing is written to storage — which you can verify yourself by opening your browser\'s network panel and clicking Generate.'
  },
  {
    question: 'Could two people get the same password?',
    answer: 'At 16 characters there are roughly 4 × 10^31 possibilities. If every person alive generated a password every second for the age of the universe, a collision would still be wildly improbable. Each browser also draws from its own operating-system entropy pool, so there is no shared seed to worry about.'
  },
  {
    question: 'Should I enable "avoid ambiguous characters"?',
    answer: 'Only if you expect to read the password off a screen and retype it — the option removes l, 1, I, O and 0, which are easy to confuse in many fonts. It shrinks the alphabet from 94 to 89, costing about one bit at 16 characters. That is a rounding error, so choose based on convenience rather than security.'
  },
  {
    question: 'A site rejected my generated password. Now what?',
    answer: 'Some services still impose short maximum lengths or ban particular symbols — usually a sign of questionable password handling behind the scenes. Turn off the symbol class or shorten the length until it is accepted. A 16-character alphanumeric password is still about 95 bits, which is perfectly respectable.'
  },
  {
    question: 'How long should my password be?',
    answer: 'With all four character classes enabled the alphabet is 94 characters, worth about 6.55 bits per position. Twelve characters gives roughly 79 bits and is a sensible floor; 16 characters gives roughly 105 bits and is the right answer for almost everything. Past 100 bits, brute force is no longer the attack anyone would attempt.'
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
