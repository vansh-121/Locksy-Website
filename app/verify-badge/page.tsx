import type { Metadata } from 'next'

// This route exists only so third-party directories (sellwithboost.com) can verify
// the Locksy listing. It carries no editorial content, so it is explicitly kept out
// of search indexes — otherwise it reads as a thin, outbound-link-only page.
export const metadata: Metadata = {
  title: 'Listing Verification – Locksy',
  description: 'Third-party listing verification badge for Locksy.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://www.locksy.dev/verify-badge',
  },
}

export default function VerifyPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <a href="https://sellwithboost.com" target="_blank" rel="noopener noreferrer">
        <img src="https://sellwithboost.com/badge/listing.svg" alt="Listed on Sell With boost" style={{ height: '40px', width: 'auto' }} />
      </a>
    </div>
  );
}
