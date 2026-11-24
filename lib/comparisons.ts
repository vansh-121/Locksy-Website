/**
 * Data for /compare and /compare/[slug].
 *
 * Rules for this file:
 * - Locksy facts must match the extension (D:\Locksy Extension docs/CHANGELOG.md,
 *   README, store description) and lib/guide-content.json.
 * - Pages compare against product CATEGORIES or techniques, not named
 *   competitors. Claims about a specific third-party extension go stale and
 *   are hard to verify, so they don't belong here.
 * - Each page says honestly when the alternative is the better choice.
 */

export interface CompareRow {
  feature: string
  locksy: string
  other: string
  /** true when Locksy clearly wins the row, false when the alternative does, undefined for a tie/neutral. */
  locksyWins?: boolean
}

export interface Comparison {
  slug: string
  /** Short name of the alternative, used in "Locksy vs …". */
  other: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  verdict: string
  rows: CompareRow[]
  otherBetterWhen: string[]
  locksyBetterWhen: string[]
  together: string
  faq: { question: string; answer: string }[]
  keywords: string[]
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "os-lock-screen",
    other: "your OS lock screen",
    title: "Locksy vs your computer's lock screen",
    metaTitle: "Locksy vs OS Lock Screen (Win+L, Cmd+Ctrl+Q): Which to Use",
    metaDescription:
      "Windows and macOS lock the whole computer. Locksy locks only the tabs you choose while you keep working. When to use each, and why most people use both.",
    intro:
      "Pressing Win+L on Windows or Cmd+Ctrl+Q on a Mac locks the entire computer. Locksy locks individual browser tabs or websites while everything else on screen keeps working. They solve different problems.",
    verdict:
      "Use your OS lock screen whenever you leave the computer. Use Locksy for the moments you stay at it: someone looking over your shoulder, a shared screen, or handing your laptop to someone for a minute.",
    rows: [
      { feature: "What gets locked", locksy: "Only the tabs or websites you choose", other: "The entire computer", locksyWins: true },
      { feature: "Keep working while locked", locksy: "Yes, other tabs and apps stay usable", other: "No", locksyWins: true },
      { feature: "Calls, screen shares, downloads", locksy: "Keep running", other: "Hidden or interrupted", locksyWins: true },
      { feature: "Hand the laptop to someone", locksy: "They can use it; private tabs stay locked", other: "They can't use it at all", locksyWins: true },
      { feature: "Protects desktop apps and files", locksy: "No, browser tabs only", other: "Yes, everything", locksyWins: false },
      { feature: "Fingerprint / face unlock", locksy: "Yes, via WebAuthn (Touch ID, Windows Hello)", other: "Yes, built in" },
      { feature: "Locks automatically when idle", locksy: "Yes, 1–480 minutes, or on a schedule", other: "Yes, after the OS timeout" },
      { feature: "Locks on browser start", locksy: "Yes, startup lock (Pro)", other: "Not applicable" },
      { feature: "Cost", locksy: "Free; Pro is a one-time $4.99", other: "Free, built in" },
    ],
    otherBetterWhen: [
      "You're walking away from the computer, even briefly.",
      "You need to protect files, email clients or other desktop apps, not just the browser.",
      "Someone might have physical, administrator-level access to the machine.",
    ],
    locksyBetterWhen: [
      "You're at your desk but someone can see your screen.",
      "You're presenting or screen sharing and don't want a private tab to appear.",
      "You share a computer with family and want certain sites to stay private.",
      "You want specific sites, like your bank or webmail, to always ask for a password.",
    ],
    together:
      "Locksy's own disclaimer recommends locking the device with Win+L or Cmd+Ctrl+Q when you leave it unattended. Locksy covers the gaps in between, when the computer is unlocked but some tabs shouldn't be visible.",
    faq: [
      {
        question: "Is Locksy a replacement for Windows Hello or the macOS lock screen?",
        answer:
          "No. Locksy protects browser tabs while you use your computer. It doesn't lock desktop apps or files, and it isn't designed to stop someone with administrator access to your machine. Keep using your OS lock screen when you step away.",
      },
      {
        question: "Can I use my fingerprint to unlock Locksy like I do my computer?",
        answer:
          "Yes. Locksy uses WebAuthn, the same standard browsers use for passkeys, so it works with Touch ID, Windows Hello, Face ID, Android biometrics and USB security keys. The free plan includes 5 biometric unlocks a day; Pro makes them unlimited.",
      },
      {
        question: "Does Locksy lock my tabs when my computer goes to sleep?",
        answer:
          "Locksy has its own auto-lock timer, from 1 to 480 minutes of inactivity, and scheduled locking by time and day. Locked tabs stay locked after a restart, and startup lock (Pro) locks restored tabs as soon as the browser opens.",
      },
    ],
    keywords: ["locksy vs windows lock screen", "lock browser tab without locking computer", "win+l alternative for tabs"],
  },
  {
    slug: "browser-profiles",
    other: "browser profiles",
    title: "Locksy vs separate browser profiles",
    metaTitle: "Locksy vs Browser Profiles: Locking Tabs vs Separating Them",
    metaDescription:
      "Chrome, Edge and Firefox profiles separate your browsing but don't lock anything. Here's how profiles and Locksy differ, and when to use each.",
    intro:
      "Browser profiles give you separate windows with their own history, cookies and logins, such as a Work profile and a Personal profile. They keep things apart, but anyone at your computer can open any profile.",
    verdict:
      "Profiles are for organising; Locksy is for privacy. If the question is \"who can see this tab?\", a profile doesn't help, because it has no password. Many people use profiles to separate work and personal browsing, with Locksy on the sensitive sites inside them.",
    rows: [
      { feature: "Password or fingerprint to open", locksy: "Yes", other: "No, any profile opens with a click", locksyWins: true },
      { feature: "Hides a single tab", locksy: "Yes", other: "No, whole windows only", locksyWins: true },
      { feature: "Separate cookies and logins", locksy: "No", other: "Yes", locksyWins: false },
      { feature: "Separate history and bookmarks", locksy: "No", other: "Yes", locksyWins: false },
      { feature: "Auto-lock when you step away", locksy: "Yes, timer or schedule", other: "No", locksyWins: true },
      { feature: "Always lock specific websites", locksy: "Yes, domain and URL path locks", other: "No", locksyWins: true },
      { feature: "Covers tabs during screen sharing", locksy: "Yes, Screen Share Shield", other: "No", locksyWins: true },
      { feature: "Cost", locksy: "Free; Pro is a one-time $4.99", other: "Free, built in" },
    ],
    otherBetterWhen: [
      "You want completely separate logins, for example two Google accounts that never mix.",
      "You want separate extensions, bookmarks and history for work and personal use.",
    ],
    locksyBetterWhen: [
      "You need a password before a tab or site can be seen.",
      "You share the computer and want certain sites private, not just organised.",
      "You want tabs to lock themselves when you walk away.",
    ],
    together:
      "Profiles and Locksy work well together. Install Locksy in each profile you use, and lock the sensitive sites inside it.",
    faq: [
      {
        question: "Can I password-protect a Chrome profile?",
        answer:
          "Chrome, Edge and Firefox don't put a password on individual profiles. Anyone using your computer account can switch to any profile. To require a password for specific tabs or sites, you need an extension like Locksy.",
      },
      {
        question: "Does Locksy work in every profile?",
        answer:
          "Each browser profile has its own extensions, so install Locksy in each profile where you want it. Each profile then has its own master password and settings.",
      },
    ],
    keywords: ["password protect chrome profile", "locksy vs browser profiles", "lock chrome profile alternative"],
  },
  {
    slug: "password-managers",
    other: "password managers",
    title: "Locksy vs password managers",
    metaTitle: "Locksy vs Password Managers: Why You Probably Want Both",
    metaDescription:
      "A password manager protects your saved logins. Locksy protects the tabs you're already logged into. How they differ and why they work best together.",
    intro:
      "A password manager stores your passwords in an encrypted vault and fills them in when you log in. Once you're logged in, though, the page itself is open on your screen. Locksy protects that open, logged-in tab.",
    verdict:
      "These aren't competitors. A password manager protects your credentials before you log in; Locksy protects the session after you log in. If you only pick one, pick a password manager. If you share a screen or a computer, add Locksy.",
    rows: [
      { feature: "Stores and fills passwords", locksy: "No", other: "Yes", locksyWins: false },
      { feature: "Generates strong passwords", locksy: "No (try our free generator)", other: "Yes", locksyWins: false },
      { feature: "Hides an already-open, logged-in tab", locksy: "Yes", other: "No", locksyWins: true },
      { feature: "Locks a website every time it opens", locksy: "Yes, domain and URL path locks", other: "No", locksyWins: true },
      { feature: "Covers tabs during screen sharing", locksy: "Yes, Screen Share Shield", other: "No", locksyWins: true },
      { feature: "Works fully offline, no account", locksy: "Yes", other: "Depends on the product; many sync through the cloud" },
      { feature: "Fingerprint unlock", locksy: "Yes, WebAuthn", other: "Usually, for the vault" },
    ],
    otherBetterWhen: [
      "You reuse passwords or struggle to remember them. Fix that first.",
      "You need your passwords on several devices.",
    ],
    locksyBetterWhen: [
      "You stay logged in to email, banking or chat and others can see your screen.",
      "You hand your laptop to someone while those tabs are open.",
      "You want a site like web.whatsapp.com to ask for a password every time.",
    ],
    together:
      "Use a password manager for your logins and Locksy for the tabs that stay open afterwards. The two don't overlap, and Locksy never sees or stores the passwords you use on websites.",
    faq: [
      {
        question: "Does Locksy store my website passwords?",
        answer:
          "No. Locksy only stores a hash of its own master password, using PBKDF2 with 600,000 iterations. It never reads, saves or fills in the passwords you use on websites.",
      },
      {
        question: "My password manager can lock its vault. Isn't that enough?",
        answer:
          "Locking the vault protects your saved passwords. It doesn't close or hide websites you're already logged into, so an open inbox or bank tab stays visible. Locksy locks those tabs.",
      },
    ],
    keywords: ["locksy vs password manager", "lock logged in tab", "password manager vs tab locker"],
  },
  {
    slug: "overlay-tab-lockers",
    other: "overlay-based tab lockers",
    title: "Locksy vs overlay-based tab lockers",
    metaTitle: "Why Overlay Tab Lockers Can Be Bypassed (and How Locksy Differs)",
    metaDescription:
      "Some tab lockers draw a cover over the page while it keeps running underneath. Here's how that can be bypassed, how Locksy locks tabs instead, and how to test any tab locker yourself.",
    intro:
      "Tab lockers work in one of two ways. Some draw a lock screen on top of the page while the page keeps running underneath. Locksy navigates the tab to its own lock page, so the protected page is no longer loaded at all.",
    verdict:
      "If the page is still loaded behind the lock screen, anyone who opens developer tools can often remove the cover and read it. With Locksy there's nothing underneath to reveal. You can check any tab locker yourself in about a minute; the steps are below.",
    rows: [
      { feature: "Protected page while locked", locksy: "Unloaded; the tab shows Locksy's lock page", other: "Still loaded under a cover", locksyWins: true },
      { feature: "Remove the lock in DevTools", locksy: "Nothing to remove", other: "Often possible by deleting the cover element", locksyWins: true },
      { feature: "Page keeps running (audio, timers)", locksy: "No", other: "Yes" },
      { feature: "Password storage", locksy: "PBKDF2-HMAC-SHA256, 600,000 iterations", other: "Varies by extension" },
      { feature: "Wrong-password protection", locksy: "Escalating delays after failed attempts", other: "Varies by extension" },
      { feature: "Survives a browser restart", locksy: "Yes, locked tabs reopen locked", other: "Varies by extension" },
    ],
    otherBetterWhen: [
      "You want the page to keep playing audio or updating while it's covered. Locksy unloads the page, so it stops.",
    ],
    locksyBetterWhen: [
      "Someone near you might know how to open developer tools.",
      "You want a lock that holds after the browser restarts.",
      "You want fingerprint unlock, auto-lock timers or always-locked websites.",
    ],
    together:
      "You don't need two tab lockers. If you're evaluating one, run the test below on it before trusting it with your bank or email.",
    faq: [
      {
        question: "How do I test whether a tab locker can be bypassed?",
        answer:
          "Lock a tab, then press F12 (or Cmd+Option+I on a Mac) to open developer tools. In the Elements panel, look for a large element covering the page and delete it, or check whether the original page's content is still in the page source. If the content appears, the lock is only a cover.",
      },
      {
        question: "Why does Locksy reload the page when I unlock it?",
        answer:
          "Because Locksy navigates the tab away to lock it, unlocking brings you back to the original address. Most sites restore your place, but unsaved form text on that page may be lost, so save your work before locking.",
      },
      {
        question: "Is Locksy's lock page safe from other websites?",
        answer:
          "Yes. Since v3.2.0, websites can't load or frame Locksy's internal pages, and the lock screen refuses to run inside a frame.",
      },
    ],
    keywords: ["tab locker bypass devtools", "secure tab locker extension", "css overlay tab lock bypass"],
  },
]

export function getComparison(slug: string) {
  return COMPARISONS.find((c) => c.slug === slug)
}
