import type { Metadata } from 'next'

// This route exists only so third-party directories (sellwithboost.com) can verify
// the Locksy listing. It carries no editorial content, so it is explicitly kept out
// of search indexes — otherwise it reads as a thin, outbound-link-only page.
export const metadata: Metadata = {
  // Layout's title template appends " | Locksy"; the brand is omitted here so it
  // is not stated twice. (Cosmetic on this route — it is noindexed below.)
  title: 'Listing Verification',
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background">
      {/* Third-party badge images are kept as-is; only the page wrapper uses theme tokens. */}
      <a
        href="https://peerpush.com/p/locksy-tab-locker-and-password-protection"
        target="_blank"
        rel="noopener noreferrer"
        title="Locksy: Launching Soon on PeerPush"
      >
        <img
          src="https://peerpush.com/p/locksy-tab-locker-and-password-protection/badge.png"
          alt="Locksy: Launching Soon on PeerPush"
          style={{ height: '40px', width: 'auto' }}
        />
      </a>
      <a href="https://sellwithboost.com" target="_blank" rel="noopener noreferrer">
        <img src="https://sellwithboost.com/badge/listing.svg" alt="Listed on Sell With boost" style={{ height: '40px', width: 'auto' }} />
      </a>
    </div>
  );
}
