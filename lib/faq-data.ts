// Single source of truth for FAQ data
// Used by both the FAQ component and structured data

export interface FAQItem {
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    question: "What is Domain Lock?",
    answer: "Domain Lock lets you lock all tabs matching a domain pattern (like *.google.com or github.com). New tabs matching locked domains are automatically protected, and locks persist across browser restarts. You can manage unlock preferences for each domain.",
  },
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
    answer: "Absolutely. We use PBKDF2 with 600,000 iterations (military-grade) and never store your actual password - only an encrypted hash. 120 years crack resistance with timing attack protection.",
  },
  {
    question: "Can someone bypass the lock?",
    answer: "No. Locksy has 8+ security layers that prevent all known bypass methods, including DevTools inspection and DOM tampering.",
  },
  {
    question: "How do wildcard domain patterns work?",
    answer: "Use *.example.com to lock all subdomains of example.com (like mail.example.com, docs.example.com). Or use just example.com to lock only that specific domain. Wildcard patterns give you flexible, powerful protection.",
  },
  {
    question: "Which browsers are supported?",
    answer: "Locksy works on all major browsers including Firefox, Google Chrome, Microsoft Edge, Brave, Opera, Comet, Vivaldi, Arc, and many more. You can install it from the Firefox Add-ons, Chrome Web Store or Edge Add-ons store.",
  },
  {
    question: "How do I password protect a tab in Chrome?",
    answer: "Click the Locksy icon in your Chrome toolbar, or use the keyboard shortcut Alt+Shift+9 to instantly lock the current tab. You'll need to set your password first if it's your first time using Locksy.",
  },
  {
    question: "Can I lock multiple tabs at once?",
    answer: "Yes! Use Alt+Shift+8 to lock all open tabs at once, or use Domain Lock to automatically protect all tabs matching a specific domain pattern.",
  },
  {
    question: "Does Locksy slow down my browser?",
    answer: "No! Locksy is ultra-lightweight and has zero performance impact. It only activates when you lock tabs and uses minimal resources.",
  },
  {
    question: "How is Locksy different from password managers?",
    answer: "Password managers store your passwords, while Locksy locks your actual browser tabs with encryption. Use both together for complete security - password managers for credentials, Locksy for tab protection.",
  },
  {
    question: "Can I use Locksy on my work computer?",
    answer: "Absolutely! Locksy is perfect for shared or work computers. Lock sensitive tabs when stepping away, and no one can access them without your password. It's 100% offline and private.",
  },
  {
    question: "What is PBKDF2 encryption?",
    answer: "PBKDF2 is a key derivation function that applies 600,000 iterations of SHA-256 hashing to your password, making it virtually impossible to crack. This is military-grade encryption exceeding OWASP 2023 security standards.",
  },
  {
    question: "Is Locksy open source?",
    answer: "Yes! Locksy is completely open source. You can inspect the code, contribute, or verify the security yourself on GitHub. Transparency is core to our privacy-first approach.",
  },
  {
    question: "How do I customize keyboard shortcuts?",
    answer: "Go to your browser's extension settings (chrome://extensions/shortcuts or about:addons in Firefox), find Locksy, and customize the shortcuts to your preference.",
  },
]
