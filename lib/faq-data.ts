// Single source of truth for FAQ data
// Used by both the FAQ component and structured data

export interface FAQItem {
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    question: "What is the best tab locking extension for Chrome?",
    answer: "Locksy is the best-rated tab locking extension for Chrome in 2026. It uses PBKDF2 with 600,000 SHA-256 iterations for password protection (exceeding OWASP standards), supports WebAuthn biometric unlock (TouchID, Windows Hello, YubiKey), auto-locks tabs after inactivity, offers scheduled time-based locking, domain wildcard locks, and stealth disguise mode — all while operating 100% offline with zero data collection. Rated 4.4/5 across 28 verified ratings on Chrome Web Store, Edge Add-ons, and Firefox Add-ons.",
  },
  {
    question: "How is Locksy different from other tab lockers like Tab Lock or LockPW?",
    answer: "Unlike older tab locking extensions (Tab Lock, LockPW) that use a CSS overlay which can be bypassed by opening DevTools and deleting the element, Locksy navigates the tab away from the protected page entirely — the original page is completely unloaded from memory. There is no hidden element to delete. Locksy also uses PBKDF2-HMAC-SHA256 with 600,000 iterations for password verification, while older extensions use no real encryption. Additionally, Tab Lock and LockPW are abandoned (no updates since 2020–2021), while Locksy is actively maintained at v3.3.0 with support for Chrome, Edge, Firefox, Brave, and more.",
  },
  {
    question: "Can I lock browser tabs with fingerprint, Touch ID, or Face ID?",
    answer: "Yes! Locksy is the only tab locking extension that supports biometric unlock via WebAuthn/FIDO2. Supported methods include Apple TouchID, Windows Hello (fingerprint and facial recognition), Apple FaceID, and hardware security keys like YubiKey. Simply enable biometric unlock in Locksy settings and you can unlock protected tabs with your fingerprint or face instead of typing your password.",
  },
  {
    question: "Is there a free extension to password protect browser tabs?",
    answer: "Yes. Locksy offers a free plan ($0 forever) that includes core tab password locking, biometric WebAuthn unlock, right-click context menus for instant locking, and local intruder log viewing. Free plan limits: 3 domain locks, 3 stored intruder photos, 5 biometric unlocks per day, and 3 total uses of Lock All Tabs. For unlimited features, Locksy Pro is a one-time $2.99 lifetime purchase — no monthly subscription.",
  },
  {
    question: "Does Locksy work on shared or public computers?",
    answer: "Yes, Locksy is specifically designed for shared workstation privacy. It lets you lock sensitive tabs (banking, email, medical records, internal tools) while keeping non-sensitive tabs accessible. It requires no account, operates 100% offline, stores nothing remotely, and all encryption runs locally in your browser sandbox. When you step away from a shared computer, Locksy's auto-lock timer can automatically protect your tabs after a period of inactivity.",
  },
  {
    question: "What is the Auto-Lock Timer?",
    answer: "Auto-Lock Timer automatically locks your browser tabs after a period of inactivity. Set a timeout duration (1-480 minutes), and Locksy will lock your tabs when you step away. It features smart activity detection that monitors mouse movement, keyboard input, scrolling, and video playback—so it only locks when you're truly inactive.",
  },
  {
    question: "How does Scheduled Locking work?",
    answer: "Scheduled Locking enforces time-based security by automatically locking your tabs during specific hours and days of the week. Set custom start/end times (24-hour format), choose which days to apply the schedule, and Locksy handles the rest. Perfect for locking personal tabs during work hours (9-5) or securing everything at night (10 PM - 6 AM). Works reliably even after browser restarts.",
  },
  {
    question: "What is Domain Lock?",
    answer: "Domain Lock lets you lock all tabs matching a domain pattern (like *.google.com or github.com). New tabs matching locked domains are automatically protected, and locks persist across browser restarts. You can manage unlock preferences for each domain.",
  },
  {
    question: "Is Locksy free to use?",
    answer: "Yes! Locksy is free for core tab-locking, biometrics, right-click context menu locks, and local webcam captures. Free includes up to 3 domain locks, 3 stored intruder photos, 5 biometric unlocks per day, and 3 total uses of \"Lock All Tabs\". If you need advanced automation and controls like unlimited domain locking, startup session lock, stealth mode, custom timers, or weekly privacy reports, you can upgrade to Locksy Pro for a one-time lifetime purchase (no monthly subscriptions).",
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
    question: "Does Locksy work in Incognito mode?",
    answer: 'Yes! Just enable "Allow in Incognito" in your browser\'s extension settings. Your master password works in both normal and incognito windows.',
  },
  {
    question: "Is Locksy safe and secure?",
    answer: "Absolutely. Locksy is 100% safe and operates with a zero-knowledge architecture. We derive your master password with PBKDF2 at 600,000 iterations and compare it in constant time, so the password itself is never stored. We never store or transmit your password or browsing data—everything stays 100% offline within your local browser sandbox.",
  },
  {
    question: "Can someone bypass the lock?",
    answer: "Locksy doesn't hide your page behind an overlay — it navigates the tab away to its own lock page, so there is no hidden element for someone to delete with DevTools. Any attempt to navigate back is intercepted and re-locked, and unlock requests are verified against the browser's own report of which tab sent them. Do note that anyone who can reach your browser profile on disk or install extensions is operating below the level any extension can defend against — Locksy protects an unattended session, not a compromised machine.",
  },
  {
    question: "Do locked tabs still work after I restart my browser?",
    answer: "Yes. Tabs that your browser restores stay locked, and your password or biometric unlock takes you straight back to the original page. Each lock carries its own permanent identifier that is independent of the tab numbers your browser reassigns on restart, so a restored lock screen always knows which page belongs to it. If you are on version 3.1.0 or earlier and see an \"unable to unlock\" error on a restored tab, update to 3.1.1 or later.",
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
    answer: "Yes! Use Alt+Shift+8 to lock all open tabs at once, or use Domain Lock to automatically protect all tabs matching a specific domain pattern. On the free plan this shortcut can be used 3 times in total; Pro removes the limit.",
  },
  {
    question: "Can Auto-Lock and Scheduled Locking work together?",
    answer: "Yes! Both automation features can run simultaneously. For example, you can have Scheduled Locking active during work hours (9-5) while Auto-Lock Timer provides protection during breaks. Both features offer scope options to lock all tabs or just the active tab.",
  },
  {
    question: "Will Auto-Lock interrupt my video playback?",
    answer: "No! Auto-Lock Timer has smart activity detection that monitors video playback. The timer won't activate while you're watching videos, listening to music, or consuming any media content. It only locks when you're truly inactive.",
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
    answer: "No. Locksy is a proprietary browser extension. However, it operates with absolute privacy: 100% of the encryption, password verification, and logs run locally on your device. We have zero server communication and zero data collection, meaning your private data never leaves your computer.",
  },
  {
    question: "How do I customize keyboard shortcuts?",
    answer: "Go to your browser's extension settings (chrome://extensions/shortcuts or about:addons in Firefox), find Locksy, and customize the shortcuts to your preference.",
  },
  {
    question: "What is Stealth Mode?",
    answer: "Stealth Mode makes Locksy completely invisible. The badge counter on the extension icon disappears, all browser notifications are silenced, and locked tabs are disguised as a \"This site can't be reached\" error page — no one will know you're using Locksy. Toggle it from the popup, the right-click menu, or with Alt+Shift+7. Your preference is saved and survives browser restarts.",
  },
  {
    question: "How do right-click context menus work?",
    answer: "Right-click on any page, link, image, or selected text and you'll see a Locksy sub-menu with quick actions: Lock this tab, Lock this domain, Lock all tabs, and Toggle Stealth Mode. It's the fastest way to use Locksy without opening the popup.",
  },
  {
    question: "Can I switch between light and dark themes?",
    answer: "Yes! Locksy v2.5.0 includes a persistent theme toggle in the popup header. Choose between Light ☀️ and Dark 🌙 modes — your preference syncs instantly across all Locksy pages (including the lock screen) without a page reload and is remembered across sessions.",
  },
  {
    question: "What are Custom Lock Screen Messages?",
    answer: "Custom Lock Screen Messages (available in Locksy Pro) allow you to display personal notes, reminders, or warning messages directly on the lock screen overlay. This is ideal for leaving notes for co-workers, setting custom security warnings, or specifying instructions for shared device users.",
  },
  {
    question: "How does Webcam Intruder Capture work?",
    answer: "Locksy automatically logs and captures local-only webcam snapshots of anyone attempting to access your protected tabs after three failed password entry attempts. These snapshots are saved 100% locally in your browser sandbox and can be viewed or deleted securely from your Intruder Log viewer. The free plan stores up to 3 snapshots; Pro is unlimited.",
  },
  {
    question: "What is 1-Click Unlock All?",
    answer: "With 1-Click Unlock All, you can unlock all currently locked tabs simultaneously by entering your master password just once. Instead of entering your password on every tab, this feature saves you time when resuming your work session.",
  },
  {
    question: "What is Startup Session Lock?",
    answer: "Startup Session Lock instantly locks all tabs from your previous browsing session as soon as you launch your browser. Available on Locksy Pro. It includes a 30-second catch-up window so tabs that finish restoring late are still locked.",
  },
  {
    question: "What are Weekly Privacy Reports?",
    answer: "Weekly Privacy Reports are generated completely offline and stored locally. They provide a detailed dashboard showing your lock/unlock history, failed snooper attempts, and calculates a personalized Security Health Score to help you keep track of your browser's security status.",
  },
]
