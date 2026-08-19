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
    question: 'Does this scan send my IP address anywhere?',
    answer: 'Not to us — there is no endpoint here that receives scan results, and any address the probe surfaces is only held in page memory until you navigate away. But it is not sent nowhere: the WebRTC test contacts Google\'s public STUN server at stun.l.google.com:19302, and that server necessarily observes your public IP, because observing and reporting it back is how STUN works. Every browser-based WebRTC leak test has this property. That is why the scan does not start on its own and waits for you to press the button.'
  },
  {
    question: 'I use a VPN but my real IP still shows. Why?',
    answer: 'That is the classic WebRTC leak. WebRTC gathers candidate network paths at the operating-system level to enable direct peer-to-peer connections, which can sidestep the VPN tunnel entirely. Your traffic is still routed through the VPN; your address is simply being advertised alongside it.'
  },
  {
    question: 'Why is my score capped even in private browsing mode?',
    answer: 'Private windows discard cookies and history when closed. They do not change your screen resolution, your CPU core count, or how WebRTC negotiates connections — so the fingerprint and leak checks return the same results. Private browsing hides your activity from other people using your computer, not from the sites you visit.'
  },
  {
    question: 'Should blocked cookies count in my favour?',
    answer: 'Blocking cookies wholesale breaks most logins, so it is not advice we would give. The distinction worth caring about is first-party versus third-party: your bank setting a session cookie is necessary, an ad network setting one across two hundred sites is not. Modern browsers let you block the second without breaking the first.'
  },
  {
    question: 'How is the privacy score calculated?',
    answer: 'Every browser starts at a baseline of 40. No WebRTC leak adds 20 points, an active Global Privacy Control signal adds 15, a detected content blocker adds 15, and a restricted referrer adds 10, capped at 100. It is a weighted tally rather than a scientific measurement, which is why the formula is published rather than hidden.'
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
