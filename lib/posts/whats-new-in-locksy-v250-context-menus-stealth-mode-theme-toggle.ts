// lib/posts/whats-new-in-locksy-v250-context-menus-stealth-mode-theme-toggle.ts
// Created for v2.5.0 launch SEO coverage.

const post = {
    slug: 'whats-new-in-locksy-v250-context-menus-stealth-mode-theme-toggle',
    title: "What's New in Locksy v2.5.0: Context Menus, Stealth Mode & Theme Toggle",
    description: 'Locksy v2.5.0 is here with three headline features: right-click context menus for instant tab locking, a stealth mode that disguises locked tabs as connection errors, and a persistent light/dark theme toggle.',
    author: 'Locksy Security Team',
    publishDate: '2026-04-20',
    lastModified: '2026-04-20',
    readTime: '13 min read',
    category: 'Product Updates',
    tags: ['Release Notes', 'Context Menus', 'Stealth Mode', 'Dark Mode', 'Privacy', 'New Features'],
    keywords: [
        'locksy v2.5.0',
        'locksy update',
        'context menu browser extension',
        'stealth mode tab locker',
        'right-click lock tab',
        'dark mode browser extension',
        'browser extension release notes',
        'tab locker new features',
        'hide locked tabs',
        'invisible tab protection',
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&auto=format&q=80',
    imageAlt: 'Code on a dark monitor representing a software update',
    content: `
## The Update That Changes How You Use Locksy

Every feature request tells a story. Behind every "can you add X?" is a real person who hit a real friction point while trying to protect their browser tabs. Over the past few months, three themes dominated our feedback channels so consistently that they practically became a chorus: "I want to lock tabs without opening the popup," "I want nobody to know I'm using a tab locker," and "I want dark mode."

Locksy v2.5.0 is our answer to all three. It's the biggest update since biometric unlock shipped in v2.3.0, and it fundamentally changes the daily experience of using Locksy. Not by adding complexity, but by removing friction. Every feature in this release was designed around a single principle: **security should be invisible, instant, and beautiful**.

Let's walk through everything that's new.

---

## Right-Click Context Menus: The Fastest Way to Lock Anything

### The Problem We Solved

Here's the old workflow for locking a tab: move your cursor to the top of the browser, find the Locksy icon in the toolbar (or the extension overflow menu, if you hadn't pinned it), click it, wait for the popup to render, then click "Lock Current Tab." Four steps. Maybe three seconds total. Not terrible — but not great when you're in a hurry, mid-conversation, or about to share your screen in ten seconds.

Keyboard shortcuts (Alt+Shift+9) helped power users, but they have a discoverability problem. You have to know they exist, and you have to memorize them. For casual users who lock a few tabs a day, that's an unreasonable expectation.

We wanted something better. Something that required zero learning, zero memorization, and zero toolbar hunting. Something that lived exactly where your attention already is — on the page itself.

### How It Works

Starting in v2.5.0, right-clicking anywhere in your browser reveals a **Locksy** sub-menu with four actions:

| Action | What It Does | When to Use It |
|--------|-------------|----------------|
| 🔒 **Lock this tab** | Password-protects the current tab instantly | Quick-lock before stepping away |
| 🌐 **Lock this domain** | Adds the entire site to your auto-lock list | Persistent protection for sensitive sites |
| 📂 **Lock all tabs** | Bulk-locks every open tab in the current window | Leaving your desk entirely |
| 👁️ **Toggle Stealth Mode** | Switches stealth mode on/off | Before screen shares or presentations |

The context menu appears on every right-click target: page content, links, images, and selected text. There's no special location you need to click — just right-click wherever your cursor happens to be.

### Why This Matters More Than You Think

Browser extensions live and die by friction. Every additional click between "I want to do this" and "it's done" is a barrier that degrades adoption. Context menus reduce the lock action to its absolute minimum: right-click, select. Two motions. Less than a second.

But the real impact goes beyond speed. Context menus fundamentally change the *mental model* of using Locksy. The popup workflow requires you to think about Locksy as a separate tool that you visit when you need security. The context menu makes security feel like a native part of the browser itself — always present, always accessible, never in the way. It's the difference between "I need to go to the security app" and "I'll just secure this right here."

For users who lock dozens of tabs a day — journalists, researchers, financial professionals, developers working with client code — the cumulative time savings and reduced cognitive friction are substantial. You stop thinking about *how* to lock tabs and start thinking about *what* to lock. That's the goal.

![A person interacting with a glowing interface](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format&q=80)

---

## Stealth Mode: Complete Invisibility

### The Irony of Visible Locks

Tab lockers have always had a philosophical contradiction at their core: the lock screen that protects your content also *advertises* that you have content worth protecting. A locked tab displaying "🔒 This Tab is Locked — Enter Password" is secure, but it's also a signal. It tells passersby, screen-share audiences, and curious family members three things:

1. You're using a security extension.
2. You consider this tab's content sensitive.
3. This specific tab is the one worth investigating.

For many users, this trade-off is perfectly fine. But we heard consistently from users in shared workspaces, open offices, and family computer setups that visible protection created social friction they didn't want to deal with. The questions. The raised eyebrows. The moment during a screen share when a locked Locksy tab flashes on screen and the presenter has to mumble an explanation.

Stealth Mode eliminates this entire category of problems.

### What Changes When You Enable Stealth

When Stealth Mode is active, four things change simultaneously:

**The lock screen becomes a connection error.** Instead of Locksy's branded lock screen, locked tabs display a pixel-perfect replica of Chrome's "This site can't be reached" page, complete with the \`ERR_CONNECTION_REFUSED\` error code and suggested troubleshooting steps. To anyone who sees it — a colleague, a family member, your manager, a Zoom audience — it looks like a website that's temporarily unreachable. It's the most mundane, forgettable page on the internet. Nobody investigates a connection error.

**The badge counter disappears.** The small red number on Locksy's toolbar icon that shows how many tabs are locked? Gone. The extension icon looks identical to any other inactive, unused extension in your toolbar.

**Notifications are suppressed.** All browser notifications from Locksy — lock confirmations, unlock alerts, everything — are silenced. Nothing pops up to draw attention to the fact that a security tool is actively running.

**The preference persists permanently.** Your stealth setting is saved to local storage and survives browser restarts, system reboots, and Locksy updates. Set it once, forget it forever. It stays on until you explicitly turn it off.

### Unlocking in Stealth Mode

The natural follow-up question: "If the lock screen looks like an error page, how do I get my tabs back?"

Two methods work, both deliberately hidden from casual observation:

- **Alt+U** — The universal Locksy unlock shortcut. Press it on any locked tab, stealth or not, and the password prompt appears.
- **Triple-click** — Click three times rapidly on the fake error page. This reveals the hidden password prompt. The triple-click gesture was chosen because it's distinctive enough to be intentional but doesn't require memorizing a key combination.

Neither method is documented on the fake error page itself. There's no hint, no hover state, no cursor change. To everyone who doesn't know, it's a dead-end browser error. To you, it's a single shortcut away from your content.

### Security Remains Identical

An important clarification: Stealth Mode is purely cosmetic. It changes what the lock screen *looks like*, not how the lock *works*. Every security layer — PBKDF2 encryption (600k iterations), rate limiting, brute-force protection, domain lock rules, zero-knowledge architecture — remains fully active. The fake error page is rendered on top of the same encrypted protection mechanism. If someone bypasses the visual disguise, they still face the password wall.

---

## Persistent Light / Dark Theme Toggle

### Why We Built It

Locksy's popup, lock screen, and What's New page previously followed your operating system's theme preference. If your OS was in dark mode, Locksy was in dark mode. Simple — but inflexible.

The problem is that many users keep their OS in light mode during the day and switch to dark mode at night, or they prefer dark mode for their browser extensions regardless of their OS setting. Others use OS-level dark mode but actually prefer Locksy's light theme because the lock screen is more readable in bright conditions.

Users wanted control. Not "follow whatever my OS does" control — actual, direct, "I want this theme and I want it to stay" control. So we built it.

### How It Works

A brand-new theme toggle button sits in the **top-right corner of the Locksy popup header**. One click switches between:

- ☀️ **Light Mode** — Clean, bright interface with sharp contrast and clear readability.
- 🌙 **Dark Mode** — Deep, rich dark theme that's easy on the eyes, especially at night. High-contrast text, subtle gradients, no washed-out colors.

Your choice:

| Behavior | Details |
|----------|---------|
| **Instant sync** | Theme changes apply immediately across the popup, lock screen, and What's New page — no reload needed |
| **Session persistence** | Your preference is saved to local storage, surviving browser restarts and extension updates |
| **Lock screen awareness** | Locked tabs respect your chosen theme, so there's no jarring white flash when unlocking at 2 AM |
| **OS-independent** | Your Locksy theme is completely independent of your operating system's light/dark setting |

This might seem like a small feature — and in terms of code, it is. But for an extension you interact with dozens of times a day, visual comfort isn't a luxury. It's a quality-of-life improvement that compounds over time. The difference between a tool you tolerate and a tool you enjoy often comes down to details exactly like this.

### The Design Philosophy

We didn't just slap a toggle on the existing theme. Both modes were redesigned for v2.5.0:

- **Light mode** received improved contrast ratios and cleaner borders.
- **Dark mode** was rebuilt with a carefully curated palette: deep navy backgrounds, vibrant violet accents, and text colors calibrated for WCAG AA contrast compliance. No more muddy grays or washed-out purples against dark backgrounds.

The toggle itself uses a smooth rotation animation — the sun icon spins as it transforms into a moon, and vice versa. It's a two-frame detail that nobody would notice if it were absent, but its presence communicates that we sweat the small stuff. Because we do.

![A laptop displaying a modern dark-themed interface](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop&auto=format&q=80)

---

## The Bigger Picture: What These Features Mean Together

Individually, each of these features solves a specific problem: context menus reduce friction, stealth mode removes visibility, and the theme toggle adds personalization. But together, they represent a larger shift in Locksy's identity.

Locksy v2.0.0 was about **security** — building the encryption and protection mechanisms that make tab locking genuinely safe. v2.3.0 was about **convenience** — adding biometric unlock, auto-lock timers, and scheduled locking to reduce manual effort. v2.5.0 is about **integration** — making Locksy feel less like a separate security tool and more like a native part of your browser.

Context menus put security where your attention already is. Stealth mode makes protection invisible to everyone except you. The theme toggle makes the extension visually yours. The cumulative effect is that Locksy stops being something you "use" and starts being something that's simply *there* — protecting, adapting, and staying out of your way.

That's the goal. Not more features for the sake of features. More thoughtfulness about how security fits into the rhythms of your actual day.

---

## How to Get v2.5.0

If you already have Locksy installed, your browser should auto-update to v2.5.0 within 24–48 hours. You can verify the version in the popup footer, or check the What's New page that appears automatically after the update.

If you're new to Locksy, grab it for free:

- [Chrome Web Store](https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/locksy/)
- [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn)

It also works on Brave, Opera, Vivaldi, Comet, Arc, and any Chromium-based browser.

---

## What's Next?

We're already working on the next round of improvements. Our roadmap includes enhanced biometric options, tab group locking, and deeper integration with browser-native security features. If there's something you'd like to see, [open a feature request on GitHub](https://github.com/vansh-121/Locksy/issues/new?template=feature_request.md) — every suggestion is read by the team.

Thanks for using Locksy. Thanks for trusting us with your tab security. And thanks for the feedback that made v2.5.0 possible. 🔒

---
_Want to see these features in action? Visit the [Locksy website](https://www.locksy.dev/#whats-new-v250) for interactive demos of all three features._
`
}

export default post
