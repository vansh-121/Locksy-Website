/**
 * Public release history for /changelog and the homepage "Recently shipped" strip.
 *
 * Source of truth: `docs/CHANGELOG.md` in the extension repo (D:\Locksy Extension).
 * Versions and dates are copied from there; descriptions are shortened into
 * plain language. When a new version ships, add it to the TOP of this list.
 */

export type ChangeKind = "new" | "improved" | "fixed" | "security"

export interface ChangeItem {
  kind: ChangeKind
  text: string
  /** Set when the item is a Locksy Pro feature. */
  pro?: boolean
}

export interface Release {
  version: string
  /** ISO date (YYYY-MM-DD) from the extension changelog. */
  date: string
  title: string
  summary: string
  changes: ChangeItem[]
}

export const RELEASES: Release[] = [
  {
    version: "3.7.0",
    date: "2026-11-09",
    title: "Locksy Themes",
    summary: "Six colour themes for every Locksy screen, plus stronger checks behind biometric unlock.",
    changes: [
      { kind: "new", text: "Six themes: Classic Light and Dark on the free plan, plus Ocean, Forest, Ember and Rose." },
      { kind: "new", text: "Ocean, Forest, Ember and Rose palettes.", pro: true },
      { kind: "improved", text: "Themes load before the first paint, so screens never flash the wrong colours." },
      { kind: "security", text: "Fingerprint and face unlocks are now verified cryptographically in the background, using a single-use challenge for every attempt." },
      { kind: "security", text: "Every unlock action now needs a one-time authorisation created only after a correct password or verified biometric." },
    ],
  },
  {
    version: "3.6.5",
    date: "2026-10-20",
    title: "Window Scope Control",
    summary: "Choose whether Lock All and Unlock All affect just this window or every window.",
    changes: [
      { kind: "new", text: "Lock All and Unlock All can apply to the current window only, or to all open windows." },
      { kind: "improved", text: "Your choice is remembered across restarts, and the Alt+Shift+8 shortcut follows it." },
    ],
  },
  {
    version: "3.6.0",
    date: "2026-10-05",
    title: "Screen Share Shield",
    summary: "Sensitive tabs are covered while you present on Meet, Zoom, Teams and other call apps.",
    changes: [
      { kind: "new", text: "Locked tabs and banking, webmail, password-manager and government sites are covered while you share your screen." },
      { kind: "new", text: "Tab titles and favicons are masked too, so the tab strip doesn't leak anything." },
      { kind: "new", text: "Arms itself automatically when a browser-based screen share or call starts.", pro: true },
      { kind: "improved", text: "Click a shielded tab to reveal it. It hides again when you switch away." },
      { kind: "fixed", text: "Network glitches can no longer remove a paid licence by mistake." },
    ],
  },
  {
    version: "3.5.5",
    date: "2026-09-23",
    title: "URL path locking",
    summary: "Lock one page or folder of a site instead of the whole domain.",
    changes: [
      { kind: "new", text: "Lock a specific path such as notion.so/work, with an option to include every page beneath it." },
      { kind: "new", text: "Use * to match one path segment, for example github.com/*/settings." },
      { kind: "fixed", text: "Locks set in private windows are kept when you navigate." },
    ],
  },
  {
    version: "3.5.0",
    date: "2026-09-16",
    title: "Device Manager",
    summary: "See which devices use your Pro licence and free up a slot yourself.",
    changes: [
      { kind: "new", text: "See how many of your 5 device slots are in use, and remove devices you no longer use.", pro: true },
      { kind: "fixed", text: "A removed device now loses Pro on its next start, and short network outages no longer sign you out." },
    ],
  },
  {
    version: "3.4.0",
    date: "2026-08-27",
    title: "Firefox for Android",
    summary: "Locksy now runs on Firefox for Android, with layouts built for phone screens.",
    changes: [
      { kind: "new", text: "Official support for Firefox for Android." },
      { kind: "improved", text: "Every Locksy screen adapts to phones, with larger tap targets." },
      { kind: "improved", text: "If a biometric prompt is cancelled, Locksy falls back to your password cleanly." },
    ],
  },
  {
    version: "3.3.0",
    date: "2026-08-10",
    title: "Recovery key and Smart Sessions",
    summary: "A recovery key for forgotten passwords, and control over how often Locksy asks again.",
    changes: [
      { kind: "new", text: "Master Recovery Key: a 16-character key that resets a forgotten password, fully offline." },
      { kind: "new", text: "Smart Sessions: choose how long the popup stays unlocked, from strict up to 60 minutes.", pro: true },
      { kind: "security", text: "Sensitive actions, like removing a domain lock, always ask for your password or fingerprint again." },
    ],
  },
  {
    version: "3.2.1",
    date: "2026-08-03",
    title: "Domain lock fixes",
    summary: "Domain locks stay in place after the browser has been idle for a long time.",
    changes: [
      { kind: "fixed", text: "Domain locks no longer drop after the browser sits idle for days." },
      { kind: "fixed", text: "The Include subdomains toggle keeps its setting." },
      { kind: "fixed", text: "*.example.com now also covers example.com itself." },
    ],
  },
  {
    version: "3.2.0",
    date: "2026-07-31",
    title: "Reliable startup lock",
    summary: "Startup lock now catches every restored tab, and biometric prompts no longer freeze the browser.",
    changes: [
      { kind: "fixed", text: "Startup lock fires every time, including with Edge's Startup boost.", pro: true },
      { kind: "fixed", text: "Tabs that finish restoring late are still locked." },
      { kind: "fixed", text: "The browser no longer freezes at startup when biometric unlock is the default." },
      { kind: "security", text: "Websites can no longer load or frame Locksy's own pages." },
      { kind: "security", text: "Older password hashes upgrade to PBKDF2 automatically on your next unlock." },
    ],
  },
  {
    version: "3.1.1",
    date: "2026-07-29",
    title: "Restart fixes",
    summary: "Locked tabs survive a browser restart and unlock correctly afterwards.",
    changes: [
      { kind: "fixed", text: "Fixed \"No lock data found\" after restarting the browser." },
      { kind: "security", text: "A restored lock screen can no longer reveal its page without authentication." },
    ],
  },
  {
    version: "3.1.0",
    date: "2026-07-24",
    title: "Privacy Blur Shield",
    summary: "Passwords, card numbers and codes on a page are blurred automatically.",
    changes: [
      { kind: "new", text: "Masks passwords, card numbers, one-time codes, emails and phone numbers on web pages." },
      { kind: "new", text: "Blurs the page when you switch windows or step away." },
      { kind: "new", text: "Privacy Blur Manager with blur strength, site categories and a trusted-sites list.", pro: true },
      { kind: "fixed", text: "Auto-lock timers no longer fire early after short breaks." },
    ],
  },
  {
    version: "3.0.0",
    date: "2026-07-18",
    title: "Redesign and Locksy Pro",
    summary: "A new popup with tabs, and the launch of Locksy Pro.",
    changes: [
      { kind: "new", text: "Redesigned popup, split into Lock, Security, Timers and More tabs." },
      { kind: "new", text: "Locksy Pro, a one-time lifetime licence. The free plan keeps every core feature." },
      { kind: "new", text: "Custom messages on the lock screen.", pro: true },
      { kind: "new", text: "Desktop alerts when someone keeps entering the wrong password." },
    ],
  },
  {
    version: "2.7.0",
    date: "2026-07-04",
    title: "Startup lock",
    summary: "Every tab from your last session locks the moment the browser opens.",
    changes: [
      { kind: "new", text: "Locks all restored tabs on browser start, including with \"Continue where you left off\"." },
      { kind: "fixed", text: "Version 2.7.1 (July 8) fixed tabs you unlock during startup being locked again." },
    ],
  },
  {
    version: "2.6.0",
    date: "2026-05-10",
    title: "Intruder photos",
    summary: "A webcam photo of anyone who repeatedly gets your password wrong, stored only on your device.",
    changes: [
      { kind: "new", text: "Optional webcam snapshot on the third failed attempt, with an Intruder Log to review or delete photos." },
      { kind: "new", text: "Unlock locked tabs straight from the popup, without typing your password again." },
      { kind: "new", text: "Make fingerprint or face the default way to unlock." },
    ],
  },
  {
    version: "2.5.0",
    date: "2026-04-17",
    title: "Right-click menus and Stealth Mode",
    summary: "Lock from the right-click menu, and hide every sign that Locksy is installed.",
    changes: [
      { kind: "new", text: "Right-click any page to lock the tab, the site or every tab in the window." },
      { kind: "new", text: "Stealth Mode hides the badge and notifications. Toggle it with Alt+Shift+7." },
      { kind: "new", text: "Light and dark theme toggle across all Locksy pages." },
      { kind: "fixed", text: "Domain locks now handle www. and https:// correctly." },
    ],
  },
  {
    version: "2.4.0",
    date: "2026-02-25",
    title: "Unlock all tabs",
    summary: "Reopen every locked tab at once.",
    changes: [{ kind: "new", text: "One button unlocks every locked tab at the same time." }],
  },
  {
    version: "2.3.0",
    date: "2026-02-21",
    title: "Biometric unlock",
    summary: "Unlock tabs with your fingerprint, face or a security key.",
    changes: [
      { kind: "new", text: "Unlock with Touch ID, Windows Hello, Face ID or any FIDO2 security key, through WebAuthn." },
      { kind: "new", text: "Your master password always works as a fallback." },
      { kind: "security", text: "Only a public key is stored. No biometric data ever leaves your device." },
    ],
  },
  {
    version: "2.2.0",
    date: "2026-01-22",
    title: "Auto-lock and schedules",
    summary: "Tabs lock themselves when you step away, or at the times you choose.",
    changes: [
      { kind: "new", text: "Auto-lock after 1 to 480 minutes of inactivity." },
      { kind: "new", text: "Scheduled locking by time and day of the week, including overnight schedules." },
    ],
  },
  {
    version: "2.1.0",
    date: "2026-01-06",
    title: "Verifiable builds",
    summary: "Automated, verifiable release builds and an in-extension What's New screen.",
    changes: [
      { kind: "new", text: "Release packages are built automatically, so anyone can check them against the source." },
      { kind: "new", text: "A What's New screen after each update." },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-12-27",
    title: "PBKDF2 security overhaul",
    summary: "Master passwords moved to PBKDF2 with 600,000 iterations.",
    changes: [
      { kind: "security", text: "PBKDF2-SHA256 with 600,000 iterations and random salts, the OWASP 2023 recommendation." },
      { kind: "security", text: "Stronger rate limiting against password guessing, and timing-attack protection." },
      { kind: "fixed", text: "Several bypass and persistence bugs closed." },
    ],
  },
  {
    version: "1.0.8",
    date: "2025-12-17",
    title: "Firefox support",
    summary: "Locksy arrives on Firefox.",
    changes: [{ kind: "new", text: "Cross-browser support, starting with Firefox." }],
  },
  {
    version: "1.0.7",
    date: "2025-12-04",
    title: "Keyboard shortcuts",
    summary: "Lock tabs without touching the mouse.",
    changes: [
      { kind: "new", text: "Keyboard shortcuts for locking." },
      { kind: "new", text: "Locked tabs are marked with a lock icon." },
    ],
  },
  {
    version: "1.0.6",
    date: "2025-11-22",
    title: "Domain lock",
    summary: "Lock entire websites, not just single tabs.",
    changes: [{ kind: "new", text: "Lock a whole domain so every tab on it locks automatically." }],
  },
  {
    version: "1.0.2",
    date: "2025-10-31",
    title: "Incognito support",
    summary: "The same protection in private windows.",
    changes: [{ kind: "new", text: "Works in incognito windows with the same master password." }],
  },
  {
    version: "1.0.0",
    date: "2025-10-27",
    title: "First release",
    summary: "Password-protect any browser tab.",
    changes: [
      { kind: "new", text: "Lock any tab behind a master password." },
      { kind: "new", text: "Works fully offline, with no account and no tracking." },
    ],
  },
]

export function formatReleaseDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}
