// lib/posts/stealth-mode-how-to-make-your-tab-locker-completely-invisible.ts
// Created for v2.5.0 launch SEO coverage.

const post = {
    slug: 'stealth-mode-how-to-make-your-tab-locker-completely-invisible',
    title: 'Stealth Mode: How to Make Your Tab Locker Completely Invisible',
    description: 'Discover how Locksy\'s Stealth Mode disguises locked tabs as connection errors, hides the badge counter, and silences notifications — making your tab locker completely invisible.',
    author: 'Locksy Security Team',
    publishDate: '2026-04-20',
    lastModified: '2026-04-20',
    readTime: '9 min read',
    category: 'Privacy',
    tags: ['Stealth Mode', 'Privacy', 'Security', 'Browser Security', 'New Features'],
    keywords: [
        'stealth mode browser extension',
        'invisible tab locker',
        'hide locked tabs',
        'disguise locked browser tabs',
        'stealth tab protection',
        'hidden tab security',
        'locksy stealth mode',
        'ERR_CONNECTION_REFUSED fake page',
        'undetectable tab locker',
        'browser extension stealth',
    ],
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&h=630&fit=crop&auto=format&q=80',
    imageAlt: 'Silhouette of a person in shadow representing digital invisibility',
    content: `
## The Problem with Visible Tab Lockers

Tab locking extensions solve a critical problem: they prevent unauthorized access to sensitive browser tabs. But most tab lockers have a subtle flaw — **they announce their own existence**.

Think about it: a locked tab that displays "🔒 This Tab is Locked — Enter Password" is secure, but it's also a signal. It tells anyone who sees your screen:

1. You're using a tab locker.
2. You have something worth hiding behind that lock.
3. This specific tab contains sensitive information.

For many users, this visibility is perfectly fine. But for others — people on shared computers, users in open offices, those who value operational security — the very presence of a lock screen is a privacy leak.

**Locksy v2.5.0 solves this with Stealth Mode.**

---

### What Stealth Mode Does

When you activate Stealth Mode, Locksy makes itself **completely invisible**. Here's exactly what changes:

#### 1. Lock Screen Disguised as a Connection Error

Instead of showing the normal Locksy lock screen with a password prompt, locked tabs display a pixel-perfect replica of Chrome's "This site can't be reached" error page:

\`\`\`
This site can't be reached
The connection was refused.

Try:
• Checking the connection
• Checking the proxy and the firewall
• Running Windows Network Diagnostics

ERR_CONNECTION_REFUSED
\`\`\`

To a casual observer — or even a tech-savvy coworker — this looks like a genuine browser error. There's no indication that Locksy is running, that the tab is locked, or that any content is being protected.

#### 2. Badge Counter Disappears

Normally, Locksy shows a small red badge on its toolbar icon indicating how many tabs are locked (e.g., "3"). In Stealth Mode, this badge **vanishes completely**. The extension icon looks identical to an inactive, unused extension.

#### 3. Notifications Silenced

Locksy typically sends brief browser notifications when tabs are locked or unlocked. In Stealth Mode, **all notifications are muted**. No popups, no toasts, no sound — nothing that could draw attention.

#### 4. Preference Persists Across Sessions

Your stealth setting is saved to local storage. Close the browser, reboot your computer, update Locksy — stealth mode stays active until you explicitly turn it off.

---

### How to Activate Stealth Mode

You have three options — use whichever fits your workflow:

| Method | How |
|--------|-----|
| **Popup toggle** | Open the Locksy popup → Click the stealth toggle in the header |
| **Keyboard shortcut** | Press **Alt+Shift+7** |
| **Context menu** | Right-click any page → Locksy → Toggle Stealth Mode |

All three methods produce the same result. The state change is instant — no page reload required.

---

### How to Unlock Tabs in Stealth Mode

Even though the lock screen is disguised, your tabs are still fully accessible to you. Two unlock methods work in Stealth Mode:

1. **Alt+U** — The universal Locksy unlock shortcut. Press it on any locked tab to reveal the password prompt.
2. **Triple-click** — Click three times rapidly on the fake error page. This reveals the hidden Locksy password prompt.

Both methods are invisible to anyone who doesn't know they exist. The fake error page gives no hints about these actions.

---

### Real-World Scenarios

#### Shared Family Computer

You share a desktop with family members. Your banking tabs, email, and personal documents are locked with Locksy. Without stealth mode, anyone who sits down at the computer would see "This Tab is Locked" and immediately know:
- You're using a security extension.
- That specific tab has something private.

With stealth mode, they see a connection error — the kind of page everyone has seen a thousand times. They'll likely just close the tab or assume the website is temporarily down.

#### Open Office / Coworking Space

You're at a hot desk in a coworking space. You step away to refill your coffee. A colleague glances at your screen:
- **Without stealth:** "Oh, what are you hiding behind that lock?"
- **With stealth:** "Looks like their internet is acting up."

The psychological difference is enormous. Stealth mode removes the social signal entirely.

#### Screen Sharing and Presentations

You're sharing your screen on Zoom, Google Meet, or Teams. You forgot to close a locked personal tab before the call. Without stealth mode, your colleagues see a Locksy lock screen — awkward at best, suspicious at worst.

With stealth mode, that tab just looks like a broken website. Nobody gives it a second thought.

#### Screen Recording and Tutorials

Content creators who record browser-based tutorials or walkthroughs can use stealth mode to ensure that any accidentally visible locked tabs don't reveal that they're running a tab locker. The recording shows nothing unusual.

---

### Security in Stealth Mode

A common concern: *does stealth mode reduce security?*

**No.** Stealth mode is purely a visual change. Under the hood:
- Tabs are still encrypted with PBKDF2 (600k iterations).
- Rate limiting and brute-force protection are still active.
- All 8+ security layers remain in place.
- Domain locks continue to auto-protect new tabs.

The only difference is what the lock screen *looks like*. The protection is identical.

---

### Stealth Mode vs. Incognito Mode

People sometimes confuse stealth mode with incognito/private browsing. They're completely different:

| Feature | Incognito Mode | Locksy Stealth Mode |
|---------|---------------|-------------------|
| Hides browsing history | ✅ After closing | ❌ Not its purpose |
| Prevents tab access | ❌ | ✅ Password-protected |
| Hides extension presence | ❌ | ✅ |
| Disguises locked content | ❌ | ✅ |
| Works on specific tabs | ❌ Whole window | ✅ Per-tab control |
| Data encrypted at rest | ❌ | ✅ PBKDF2 |

Incognito mode prevents *history recording*. Stealth mode prevents *visual detection of locked tabs*. They solve completely different problems and can be used together.

---

### Tips for Maximum Stealth

1. **Lock your extension list.** If someone opens \`chrome://extensions\`, they can still see Locksy installed. Consider pinning only essential extensions and keeping Locksy unpinned — the icon will be in the overflow menu, making it less visible.
2. **Use keyboard shortcuts exclusively.** Avoid clicking the Locksy icon in front of others. Alt+Shift+9 to lock, Alt+U to unlock, Alt+Shift+7 to toggle stealth — all from the keyboard.
3. **Combine with domain lock.** Set up domain rules for your most sensitive sites (banking, email, health portals). New tabs matching those domains will auto-lock in stealth mode without any action from you.
4. **Enable stealth before screen sharing.** Make it a habit to press Alt+Shift+7 before starting any screen share or recording.

---

### Getting Started

Stealth Mode is available in Locksy v2.5.0 and later. Install or update Locksy:

- [Chrome Web Store](https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/locksy/)
- [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn)

Once installed, right-click any page → Locksy → Toggle Stealth Mode. That's it.

Your tabs are locked. Your locker is invisible. No one knows. 🕵️

---
_Learn more about Locksy's full feature set at [locksy.dev](https://www.locksy.dev)._
`
}

export default post
