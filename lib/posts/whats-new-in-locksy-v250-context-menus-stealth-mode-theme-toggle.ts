// lib/posts/whats-new-in-locksy-v250-context-menus-stealth-mode-theme-toggle.ts
// Created for v2.5.0 launch SEO coverage.

const post = {
    slug: 'whats-new-in-locksy-v250-context-menus-stealth-mode-theme-toggle',
    title: "What's New in Locksy v2.5.0: Context Menus, Stealth Mode & Theme Toggle",
    description: 'Locksy v2.5.0 is here with three headline features: right-click context menus for instant tab locking, a stealth mode that disguises locked tabs as connection errors, and a persistent light/dark theme toggle.',
    author: 'Locksy Security Team',
    publishDate: '2026-04-20',
    lastModified: '2026-04-20',
    readTime: '8 min read',
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
## Locksy v2.5.0 Is Here — Faster, Stealthier, More Beautiful

Version 2.5.0 is the biggest update to Locksy since biometric unlock shipped in v2.3.0. This release introduces three features our users have been requesting the most: **right-click context menus**, **stealth mode**, and a **persistent light/dark theme toggle**. Let's walk through each one.

---

### 1. Right-Click Context Menus: Lock Tabs Without Opening the Popup

Previously, locking a tab meant clicking the Locksy icon in the toolbar or using a keyboard shortcut. With v2.5.0, you can **right-click anywhere** on a page, link, image, or selected text to access Locksy's full feature set instantly.

The context menu includes four actions:

- **🔒 Lock this tab** — Protect the current tab in one click.
- **🌐 Lock this domain** — Add the entire site to your auto-lock list.
- **📂 Lock all tabs** — Bulk-lock every tab in the current window.
- **👁️ Toggle Stealth Mode** — Flip stealth on or off without opening the popup.

This is the fastest way to use Locksy, especially if you're a power user who keeps their hands on the mouse.

![Right-click context menu browser extension](https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=800&h=450&fit=crop&auto=format&q=80)

### Why Context Menus Matter

Browser extensions live and die by the **friction** of their user interaction. Every extra click is a barrier. Context menus remove that barrier entirely — you can protect a tab in the time it takes to right-click and select an option. No popup, no toolbar icon hunt, no keyboard combo to remember.

For users who lock dozens of tabs a day, this is a game-changer.

---

### 2. Stealth Mode: Make Locksy Completely Invisible

Stealth mode is the headline feature of v2.5.0. When activated, Locksy becomes **completely undetectable**:

- **Badge counter vanishes** — The extension icon shows no lock count.
- **Notifications silenced** — All browser notifications from Locksy are muted.
- **Lock screen disguised** — Locked tabs display a fake "This site can't be reached / ERR_CONNECTION_REFUSED" error page instead of the normal Locksy lock screen.
- **Preference persists** — Your stealth setting survives browser restarts and extension updates.

You can toggle stealth mode from three places:
1. The **popup button** in the Locksy header.
2. The **keyboard shortcut** Alt+Shift+7.
3. The **right-click context menu**.

Even in stealth mode, your tabs remain fully protected. You can still unlock them with Alt+U or by triple-clicking the error page — only you know the secret.

### When to Use Stealth Mode

- **Shared computers** — Family members or coworkers won't even know you're using a tab locker.
- **Screen recordings / demos** — Record your screen or present without revealing that certain tabs are locked.
- **Maximum privacy** — If you don't want anyone to know you value tab security, stealth mode removes every visible trace of Locksy.

---

### 3. Persistent Light / Dark Theme Toggle

Locksy v2.5.0 ships with a **manual theme switcher** built right into the popup header. Choose between:

- ☀️ **Light Mode** — Clean, bright interface.
- 🌙 **Dark Mode** — Easy on the eyes, especially at night.

Your theme preference:
- **Syncs instantly** across the popup, the lock screen, and the What's New page — no reload needed.
- **Persists across sessions** — Close and reopen the browser, and your theme is still there.
- **Works on the lock screen** — Locked tabs respect your chosen theme, so there's no jarring white flash when unlocking at 2 AM.

This might seem like a small feature, but for an extension you interact with dozens of times a day, visual comfort matters.

---

### Upgrading to v2.5.0

If you already have Locksy installed, your browser should auto-update to v2.5.0. You can verify the version in the popup footer or on the What's New page that appears after the update.

If you're new to Locksy, grab it from:
- [Chrome Web Store](https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/locksy/)
- [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn)

It also works on Brave, Opera, Vivaldi, Comet, Arc, and any Chromium-based browser.

---

### What's Next?

We're already working on the next round of improvements. If there's a feature you'd like to see, [open a feature request on GitHub](https://github.com/vansh-121/Locksy/issues/new?template=feature_request.md) — every suggestion is read by the team.

Thanks for using Locksy. Stay secure. 🔒

---
_Want to see these features in action? Visit the [Locksy website](https://www.locksy.dev/#whats-new-v250) for interactive demos._
`
}

export default post
