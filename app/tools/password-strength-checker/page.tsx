import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/metadata'
import PasswordStrengthCheckerClient from './password-strength-checker-client'

export const metadata: Metadata = generatePageMetadata(
  'Password Strength & Entropy Checker – Test PBKDF2 Crack Time',
  'Free client-side password strength meter. See your password\'s entropy in bits, estimated GPU brute-force time, and how 600,000 PBKDF2 iterations change the maths. Nothing is transmitted.',
  '/tools/password-strength-checker',
  [
    'password strength checker',
    'password entropy calculator',
    'how long to crack my password',
    'pbkdf2 crack time calculator',
    'password strength meter offline',
    'bits of entropy password'
  ]
)

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Free Security Tools', url: '/tools' },
  { name: 'Password Strength Checker', url: '/tools/password-strength-checker' }
])

const faqSchema = generateFAQSchema([
  {
    question: 'Is my password safe to test here?',
    answer: 'Yes. Calculations are performed locally inside your browser memory. We never store, log, or send your passwords across the internet.'
  },
  {
    question: 'Why does password length matter more than complex symbols?',
    answer: 'Every additional character exponentially multiplies the possible combinations, creating a much stronger defense against automated brute-force attempts than simply adding a symbol.'
  },
  {
    question: 'What is the difference between a password and a passphrase?',
    answer: 'A passphrase uses multiple random words (e.g. "correct-horse-battery-staple") which provides high entropy while remaining much easier for humans to remember and type accurately.'
  },
  {
    question: 'What is PBKDF2 key stretching?',
    answer: 'PBKDF2 is a cryptographic key-derivation function that performs hundreds of thousands of hashing rounds, dramatically slowing down brute-force attacks.'
  }
])

export default function PasswordStrengthCheckerPage() {
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
      <PasswordStrengthCheckerClient />
    </>
  )
}
