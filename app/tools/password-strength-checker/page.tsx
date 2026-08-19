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
    question: 'Is it safe to type my real password here?',
    answer: 'The page never transmits it — there is no form submission, no analytics call carrying the value, and no server involved in scoring. It lives in a React state variable and disappears when you navigate away. That said, the habit of typing real passwords into websites is one worth breaking, so testing a structurally similar variant is a reasonable precaution.'
  },
  {
    question: 'Why does adding length help more than adding symbols?',
    answer: 'Length multiplies; character variety only adds. Each extra character multiplies the search space by the whole pool size, whereas adding the symbol class grows the pool from 62 to 94 — a single fixed gain. Eight more lowercase letters beats one exclamation mark by a wide margin.'
  },
  {
    question: 'Is a passphrase better than random characters?',
    answer: 'For anything you must memorise, usually yes. Four or five genuinely random words reach the same bit range as a shorter random string while being far easier to recall and type accurately. The catch is that the words must be genuinely random — a memorable phrase from a song or film is not.'
  },
  {
    question: 'What does PBKDF2 with 600,000 iterations actually do?',
    answer: 'It repeatedly re-hashes your password — 600,000 rounds of HMAC-SHA-256 — before the result is used as an encryption key. You wait a fraction of a second once. An attacker pays that cost on every single guess across billions of attempts, which is what makes offline cracking uneconomical.'
  },
  {
    question: 'My password scored well. Am I done?',
    answer: 'Not quite. Two questions remain: is it unique to this one account, and what happens to the session after you have logged in? A strong password reused across services fails the moment any one of them is breached, and no password protects a tab that is already open on an unattended screen.'
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
