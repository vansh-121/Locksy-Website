// Single source of truth for FAQ data
// Used by both the FAQ component and structured data

export interface FAQItem {
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    question: "Is Locksy really free?",
    answer: "Yes, 100% free with no hidden fees, premium tiers, or subscriptions. It will always be free.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed! Just install the extension, set your password, and start locking tabs.",
  },
  {
    question: "What happens if I forget my password?",
    answer: "For security reasons, passwords cannot be recovered. You'll need to reset your password, which will unlock all currently locked tabs.",
  },
  {
    question: "Does it work in incognito mode?",
    answer: 'Yes! Just enable "Allow in Incognito" in your browser\'s extension settings. Your master password works in both normal and incognito windows.',
  },
  {
    question: "Is my password safe?",
    answer: "Absolutely. We use SHA-256 encryption (military-grade) and never store your actual password - only an encrypted hash.",
  },
  {
    question: "Can someone bypass the lock?",
    answer: "No. Locksy has 8+ security layers that prevent all known bypass methods, including DevTools inspection and DOM tampering.",
  },
  {
    question: "Which browsers are supported?",
    answer: "Locksy works on all Chromium-based browsers including Google Chrome, Microsoft Edge, Brave, Opera, Comet, Vivaldi, Arc, and many more. You can install it from the Chrome Web Store or Edge Add-ons store.",
  },
]
