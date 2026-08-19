import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/metadata'
import BrowserPrivacyScoreClient from './browser-privacy-score-client'

export const metadata: Metadata = generatePageMetadata(
  'Browser Privacy Score – Live WebRTC Leak & Fingerprint Test',
  'Free live browser privacy audit. Detects WebRTC IP leaks, Global Privacy Control signals, ad-blocker coverage and device fingerprint entropy using real browser APIs. Nothing is logged.',
  '/tools/browser-privacy-score',
  [
    'browser privacy test',
    'webrtc leak test',
    'browser fingerprint test',
    'global privacy control checker',
    'does my vpn leak my ip',
    'browser privacy score'
  ]
)

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Free Security Tools', url: '/tools' },
  { name: 'Browser Privacy Score', url: '/tools/browser-privacy-score' }
])

const faqSchema = generateFAQSchema([
  {
    question: 'What does the Browser Privacy Score test?',
    answer: 'It checks key aspects of your browser privacy including WebRTC leak exposure, Global Privacy Control (GPC) signal status, tracker blocker effectiveness, and referrer header policies.'
  },
  {
    question: 'Does private browsing / incognito mode make me 100% anonymous?',
    answer: 'No. Private browsing stops your computer from saving local cookies and history, but websites and network providers can still detect your IP address and device attributes.'
  },
  {
    question: 'What is a WebRTC leak?',
    answer: 'WebRTC is a browser technology used for real-time video/voice calling. If not properly configured, it can reveal your real IP address even when using certain VPN services.'
  },
  {
    question: 'How can I improve my browser privacy score?',
    answer: 'Enable Global Privacy Control in your browser settings, use a trusted content blocker, and ensure your browser has WebRTC IP leak protection enabled.'
  }
])

export default function BrowserPrivacyScorePage() {
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
      <BrowserPrivacyScoreClient />
    </>
  )
}
