export interface BlogPost {
    slug: string
    title: string
    description: string
    content: string
    author: string
    publishDate: string
    lastModified: string
    readTime: string
    category: string
    tags: string[]
    keywords: string[]
    image: string
    imageAlt: string
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'how-to-password-protect-browser-tabs',
        title: 'How to Password Protect Browser Tabs in 2026 (Chrome, Edge, Firefox)',
        description: 'A practical, no-nonsense guide to locking your browser tabs with a password — because closing the laptop lid is not a security strategy.',
        author: 'Locksy Security Team',
        publishDate: '2026-01-15',
        lastModified: '2026-02-10',
        readTime: '8 min read',
        category: 'Tutorial',
        tags: ['Browser Security', 'Password Protection', 'Tab Security'],
        keywords: ['password protect browser tabs', 'lock chrome tabs', 'secure browser tabs', 'tab password protection'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'Password protect browser tabs guide',
        content: `
## The Tab You Forgot to Close

We've all been there. You leave your desk for two minutes to grab coffee, and when you come back, your coworker is standing behind your chair with a grin on their face. "So, you're really into sourdough baking videos, huh?"

Embarrassing? Sure. But the stakes can be much higher. Imagine it's your bank account open in one tab, your medical records in another, and a confidential work document in a third. That two-minute coffee break just became a data leak waiting to happen.

The truth is, most of us treat our browser tabs like an extension of our brain — dozens of them open, deeply personal, and completely unprotected. And no, closing the laptop lid doesn't count as security.

So let's fix that.

## Why Your Tabs Need a Lock

Think about what's actually sitting in your browser right now. Go ahead, look. I'll wait.

If you're like most people, you've got some combination of email, social media, work apps, maybe a banking session, and at least three tabs you opened last Tuesday and forgot about. Every single one of those is accessible to anyone who can touch your keyboard.

This isn't just a "shared computer" problem. It's an **anyone-who-walks-by** problem. It's a **my-kid-grabbed-my-laptop** problem. It's a **left-my-screen-unlocked-at-the-coffee-shop** problem.

Password protecting your tabs adds a dead-simple layer of defense: even if someone gets to your browser, they can't see what's behind the lock without your password.

## The Browser Doesn't Do This for You

Here's the uncomfortable truth: Chrome, Firefox, Edge — none of them have a built-in "lock this tab" feature. You can create separate profiles, sure. You can use incognito mode. But neither of those actually puts a password gate in front of a specific tab.

Browser profiles are like having separate drawers in a desk. They organize things, but anyone can open any drawer. Incognito mode is useful for not leaving a trail, but while the window is open, it's just as exposed as any other tab.

If you want actual password protection on individual tabs, you need a browser extension. That's where the real solution lives.

## Setting Up Tab Protection with Locksy

Locksy is a free, open-source extension that works across Chrome, Edge, Firefox, Brave, and basically any Chromium-based browser. Here's how to get started — it takes about 90 seconds.

**Step 1:** Head to your browser's extension store (Chrome Web Store, Firefox Add-ons, or Edge Add-ons) and search for **Locksy Tab Locker**.

**Step 2:** Install it. Click the icon in your toolbar and create a master password. This is the one password that protects everything, so make it strong — but also something you'll remember, because there's no "forgot password" reset. That's a security feature, not a bug.

**Step 3:** You're done. Seriously. Now you can lock any tab with a single click, or hit **Alt+Shift+9** to lock the current tab instantly.

What makes this different from browser profiles or incognito:

- Your tabs stay exactly where they are — same position, same state
- A locked tab shows a lock screen instead of content until you enter your password
- You can set **domain rules** so certain sites (like your bank) auto-lock every time
- Everything happens locally on your machine. No data leaves your browser.

## The "But What About..." Section

**"Can't I just lock my computer screen?"**

You absolutely should. But screen lock is an all-or-nothing approach. Tab protection lets you keep working on non-sensitive tabs while keeping private ones locked. It's also faster — locking one tab is instantaneous, while locking and unlocking your entire computer breaks your workflow.

**"What about incognito mode?"**

Incognito prevents history from being saved *after* you close the window. While the window is open, anyone who sees your screen sees everything. It's privacy from your future self, not from the person standing behind you right now.

**"I use a password manager. Isn't that enough?"**

Password managers protect your *login credentials*. They don't protect the content you're viewing *after* you've logged in. Once you've authenticated into your bank and the dashboard is showing your balance, your password manager's job is done. Tab protection picks up where it leaves off.

## Going Beyond the Basics

Once you've got the basics down, there are a few power moves worth knowing:

**Domain Lock Rules.** Instead of manually locking tabs, tell Locksy to automatically lock any tab that matches a pattern. For example, you can set a rule so every time you open a page on your banking site, it starts locked. You unlock it when you need it, and it re-locks when you navigate away.

**Keyboard-First Workflow.** If you're the kind of person who lives in keyboard shortcuts, Locksy fits right in. Alt+Shift+9 to lock, same shortcut to trigger the unlock prompt. Your hands never leave the keyboard.

**Visual Indicators.** Locked tabs get a 🔒 emoji prefix in the tab title. It sounds small, but when you've got 30+ tabs open, being able to glance at your tab bar and immediately see which ones are protected is genuinely useful.

## What Good Encryption Actually Looks Like

Not all tab-locking extensions are created equal. Some use trivial encryption (or none at all) that any tech-savvy person could bypass. Here's what to look for:

**PBKDF2 with high iterations.** Locksy uses 600,000+ iterations, which means each brute-force password guess takes real computational time. At that rate, trying every possible 8-character password would take longer than the age of the universe.

**No server communication.** Your password and locked content should never leave your device. If an extension "syncs" your locked tabs to the cloud, that's a red flag.

**Rate limiting on unlock attempts.** After a few wrong guesses, the delay between attempts should increase. This stops automated cracking tools cold.

**Open source.** If you can read the code, you can verify the security claims. Locksy's entire codebase is on GitHub.

## The Bottom Line

Protecting your browser tabs isn't paranoia — it's basic digital hygiene, like locking your front door when you leave the house. You don't do it because you expect burglars every day. You do it because the one time it matters, you'll be glad you did.

The setup takes 90 seconds. The keyboard shortcut takes less than one second. And the peace of mind is worth a lot more than either.

---

*Questions about tab security? [Drop us a message](/contact) — we actually respond.*
`
    },
    {
        slug: 'browser-tab-security-best-practices',
        title: '15 Browser Tab Security Best Practices Every User Should Know',
        description: 'Practical, no-BS security habits for your browser tabs — from encryption basics to the mistakes almost everyone makes.',
        author: 'Locksy Security Team',
        publishDate: '2026-01-20',
        lastModified: '2026-02-08',
        readTime: '10 min read',
        category: 'Security',
        tags: ['Browser Security', 'Privacy', 'Best Practices'],
        keywords: ['browser security', 'tab security', 'browser privacy', 'secure browsing'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'Browser tab security best practices',
        content: `
## Your Browser Knows More About You Than Your Best Friend

Let's start with an uncomfortable experiment. Open your browser history right now. Scroll through the last 48 hours. Every question you Googled, every email you read, every purchase you made, every weird symptom you looked up at 2 AM — it's all there. Your browser is, without exaggeration, the most intimate window into your life that exists on any of your devices.

And yet, most of us leave that window wide open.

I'm not here to scare you into becoming a digital hermit. I'm here to share 15 practical habits that make a real difference — things that take minutes to set up but meaningfully improve how safe your browsing actually is.

## 1. Lock Your Sensitive Tabs — Not Just Your Screen

Screen lock protects your entire computer, which is great when you walk away completely. But what about the dozen times a day someone glances at your screen while you're sitting right there? What about when your kid grabs your laptop to watch YouTube and your bank account is two tabs to the right?

Tab-level password protection solves the in-between moments. You keep working, but specific tabs stay locked until you deliberately unlock them. With a tool like Locksy, you set a master password and choose which tabs (or which domains) get locked. Everything else stays accessible.

## 2. Understand Encryption — Even If You're Not Technical

You don't need to understand how an engine works to drive a car, but you should know the difference between a car with airbags and one without. Same with encryption.

The gold standard for password-based encryption is **PBKDF2** (Password-Based Key Derivation Function 2). What matters is the iteration count — think of it as how many times the lock checks itself before opening. 600,000+ iterations means that even with a fast computer, each brute-force guess takes about 100 milliseconds. That adds up to *centuries* for cracking any decent password.

When choosing any security tool, look for this. If they don't specify their encryption method, that's a red flag.

## 3. Kill the Extensions You Don't Recognize

Right now, go to your browser's extension page (chrome://extensions or about:addons). Count how many extensions you have. Now count how many you actually *used* in the past month.

Every extension you install has some level of access to your browsing. Some can read every page you visit. Some can modify page content. The fewer you have, the smaller your attack surface. Uninstall anything you don't actively use.

## 4. Set Up Domain Auto-Locking

Manually locking tabs is fine, but humans are forgetful. The better approach is to set up domain rules that automatically lock certain websites the moment you open them.

Configure patterns like:
- Your banking sites
- Email (personal and work)
- HR and payroll portals
- Healthcare portals
- Cloud storage dashboards

This way, even if you forget to lock a tab, the extension does it for you. One-time setup, permanent protection.

## 5. Master the Lock Shortcut

The fastest way to protect a tab is a keyboard shortcut. With Locksy, it's **Alt+Shift+9** by default. Practice it a few times until it's muscle memory. When someone walks up to your desk unexpectedly, you should be able to lock your current tab before they can read the title.

This sounds dramatic, but once it's muscle memory, it's no different than hitting Ctrl+S to save a document. Just a reflex.

## 6. Stop Syncing Everything Everywhere

Browser sync is convenient. It's also a security liability. If you sync open tabs across devices, a tab you locked on your work laptop might show up unlocked on your phone, or on the family iPad.

For your primary "sensitive" browser profile, turn off tab sync. Keep bookmarks and passwords synced if you want, but open tabs should stay on the device where you opened them.

## 7. Separate Your Browser Profiles

One profile for work. One for personal. Maybe a third for banking and financial stuff. Each profile has its own extensions, settings, cookies, and history. They're completely isolated from each other.

This is free, built into every major browser, and takes about two minutes to set up. Combined with tab locking on your sensitive profile, you've got a solid setup.

## 8. Turn On HTTPS-Only Mode

This exists in Chrome, Firefox, and Edge, and most people don't have it enabled. It forces every connection to use HTTPS (encrypted), and warns you before loading any insecure HTTP page.

Why does this matter? On public WiFi, HTTP traffic can be intercepted. An attacker on the same coffee shop network could see every unencrypted page you load. HTTPS-Only Mode closes that gap.

## 9. Review Extension Permissions Quarterly

Set a calendar reminder. Every three months, spend five minutes reviewing what your extensions can access. Permissions can change with updates — an extension that originally only needed access to one site might now request access to all sites.

If an extension is asking for more than it needs, replace it with something less invasive.

## 10. Don't Save Passwords in Your Browser for Critical Accounts

Browser password managers are convenient and have gotten much better security-wise. But for your most critical accounts — primary email, banking, anything that could lead to identity theft — consider using a dedicated password manager like Bitwarden or 1Password instead.

Why? A dedicated password manager has one job and does it extremely well. Browser password storage, while improved, is still tied to your browser profile. If someone gains access to your browser, they potentially gain access to saved passwords. A separate vault adds one more layer of separation.

## 11. Use Incognito Strategically — Not as Your Only Defense

Incognito mode has one job: not saving history, cookies, or cache after you close the window. That's it. While the window is open, it's just as visible as any normal window. It doesn't encrypt anything. It doesn't hide your activity from your network. It doesn't block tracking.

Use it when you want no *local* trace — looking up a surprise gift, checking prices without tracking cookies inflating them, or using someone else's computer temporarily. But don't treat it as a security measure. It's a privacy convenience, not a shield.

## 12. Enable Two-Factor on Everything That Matters

This isn't strictly about tab security, but it's the single most impactful security habit you can adopt. If someone *does* get into your browser and sees your bank tab, they still can't do anything if your bank requires a second factor (phone code, authenticator app, or hardware key).

Start with email and banking. Then expand to everything else. It takes two minutes per account and makes 90% of attacks irrelevant.

## 13. Set Session Timeouts

Configure your security extensions and your OS to auto-lock after inactivity. A good baseline:

- **5 minutes** for a computer at work or in a shared space
- **10 minutes** for your personal laptop at home
- **Immediate** for public or borrowed devices

If your tab locker supports idle timeout, enable it. Locksy will re-lock tabs after a configurable period of inactivity.

## 14. Be Skeptical of New Extensions

Before installing any extension, check three things: the publisher, the reviews, and the permissions requested. If an extension has 12 reviews and wants access to all your data on all websites, skip it. A popular extension with a clear privacy policy and minimal permissions is always the safer bet.

Also check if it's open-source. An extension where you can read the code is inherently more trustworthy than one where you can't. Locksy, for example, has its entire source code on GitHub — you can verify every claim for yourself.

## 15. Remember: Security Is Layers, Not a Single Lock

No single tool or habit makes you invincible. But the combination of tab locking + separate profiles + HTTPS-only + two-factor + good extension hygiene gets you about 95% of the way there. The remaining 5% is threat modeling that most people will never need to worry about.

The goal isn't perfection. It's making yourself a significantly harder target than you were yesterday.

## Where to Start

If you're going to do just three things from this list today:

1. Install a tab protector and lock your banking and email tabs
2. Turn on HTTPS-Only Mode in your browser settings
3. Delete any extension you haven't used in the past month

That's 15 minutes of work for a dramatically better security posture.

---

*Building better habits starts with the right tools. [Try Locksy](/) — it's free, open-source, and respects your privacy.*
`
    },
    {
        slug: 'what-is-pbkdf2-encryption-explained',
        title: 'What is PBKDF2 Encryption? A Plain-English Guide',
        description: 'PBKDF2 explained without the jargon. What it does, why it matters for your passwords, and how it stops hackers — even if you have zero technical background.',
        author: 'Locksy Security Team',
        publishDate: '2026-01-25',
        lastModified: '2026-02-05',
        readTime: '7 min read',
        category: 'Security',
        tags: ['Encryption', 'PBKDF2', 'Password Security'],
        keywords: ['PBKDF2 encryption', 'password encryption', 'PBKDF2 explained', 'encryption iterations'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'PBKDF2 encryption explained',
        content: `
## The Acronym Everyone Mentions but Nobody Explains

If you've ever read the description of a password manager or a security tool, you've probably seen something like "secured with PBKDF2 encryption, 600,000 iterations." It sounds impressive, important, and completely impenetrable — in the sense that you have no idea what it means.

Here's the thing: you don't need a computer science degree to understand this. The core idea is surprisingly simple, and once you get it, you'll be able to evaluate security claims like a pro.

## Passwords Have a Fundamental Problem

When you type a password into a website or an app, that password needs to be stored somewhere so the system can check if you typed the right one next time. But storing the actual password is a terrible idea — if the database gets hacked, every user's password is exposed in plain text.

So instead, passwords are **hashed**. Hashing is a one-way mathematical function that turns your password into a string of random-looking characters. "MyDogMax2026" becomes something like **a4f2c88b9e3d...**. The key property is that you can go from password → hash easily, but going from hash → password is practically impossible.

At least, that's how it's *supposed* to work.

## Why Basic Hashing Isn't Enough Anymore

Modern computers are frighteningly fast. A standard hashing algorithm like SHA-256 can compute billions of hashes per second. That means an attacker who steals a database of hashed passwords can simply try every possible password combination at incredible speed and see which one produces a matching hash.

This is called a **brute-force attack**, and against basic hashing, it works disturbingly well. A simple 6-character password can be cracked in seconds. Even an 8-character password might fall in hours.

This is where PBKDF2 enters the picture.

## PBKDF2: Making Hashing Deliberately Slow

PBKDF2 stands for **Password-Based Key Derivation Function 2**. The name is a mouthful, but the concept is elegant: it takes regular hashing and makes it intentionally, computationally expensive.

Instead of hashing your password once, PBKDF2 hashes it *hundreds of thousands of times in a row*. Each hash feeds into the next, creating a chain of computation that takes real, measurable time.

Here's the analogy I like best: imagine a regular lock that can be picked in one second. Now imagine a lock where, to pick it, you have to pick it 600,000 times in sequence, and each pick resets every other lock. That's PBKDF2.

For a legitimate user typing their correct password, this process takes about 100 milliseconds — completely imperceptible. You enter your password, the system runs 600,000 iterations in a tenth of a second, and you're in.

But for an attacker trying to brute-force their way through millions of passwords? Each guess now takes 100ms instead of nanoseconds. That turns a hours-long attack into one that would take **centuries**.

## The Iterations Number Actually Matters

When you see "600,000 iterations," that's the number of times PBKDF2 runs the hashing function for a single password verification. This number matters a lot:

- **1,000 iterations** (used in early 2000s): Crackable with modern hardware
- **100,000 iterations**: Better, but GPUs are fast
- **600,000 iterations** (OWASP recommended in 2023+): Current security standard
- **1,000,000+ iterations**: Maximum security, slightly slower verification

Locksy uses 600,000+ iterations, which is the current recommendation from OWASP (the Open Web Application Security Project). It's the sweet spot between security and user experience — strong enough to stop any practical brute-force attack, fast enough that you never notice a delay.

## What About Salt?

There's one more important ingredient: **salt**. No, not the table kind.

A salt is a random string of data that's unique to each user and gets mixed in with the password before hashing. Without salt, two users with the same password would produce the same hash — which means an attacker could pre-compute a giant table of common password hashes (called a "rainbow table") and just look up matches.

Salt makes rainbow tables useless. Even if two people both use "password123" (please don't), their hashes will be completely different because each one has a unique salt mixed in.

## How This Protects Your Locked Tabs

When you set a master password in a tab-locking extension like Locksy, here's what actually happens behind the scenes:

1. You type your password
2. A random salt is generated (unique to your installation)
3. PBKDF2 runs your password + salt through 600,000+ iterations of SHA-256
4. The result is your **encryption key** — used to lock and unlock your tabs
5. Your actual password is never stored anywhere

When you unlock a tab, the same process runs in reverse: your password + stored salt → 600,000 iterations → key → decrypt and show the tab.

If someone tries to guess your password, they have to run all 600,000 iterations for every single guess. And with rate limiting on top (where each failed attempt adds increasingly long delays), brute-force attacks become not just impractical but mathematically absurd.

## PBKDF2 vs. bcrypt vs. Argon2

If you're curious how PBKDF2 compares to other password hashing algorithms:

**bcrypt** is another widely used algorithm that's also intentionally slow. It was designed specifically for password hashing and has been battle-tested since 1999. It's great, but it processes passwords in 72-byte chunks, which can silently truncate very long passwords.

**Argon2** is the newest of the three, and won the Password Hashing Competition in 2015. Its advantage is that it's designed to resist not just CPU-based attacks but also GPU and specialized hardware attacks, by requiring a configurable amount of memory.

All three are solid choices. PBKDF2's advantage is its ubiquity and proven track record — it's been in widespread use since 2000, it's included in most programming platforms by default, and it's been reviewed and recommended by organizations like NIST, OWASP, and the IETF.

For browser extensions specifically, PBKDF2 is the practical choice because it works efficiently in JavaScript (the language browsers speak) through the Web Crypto API, without requiring any external dependencies.

## What "Encryption" Actually Means in Context

Worth clarifying: PBKDF2 itself isn't encryption. It's key derivation — it turns your password into a key. That key is then used with an actual encryption algorithm (typically AES-256) to encrypt and decrypt your data.

Think of it this way: PBKDF2 is how you forge the key, AES is the lock that key operates. Both are essential, but they do different jobs.

## How to Evaluate Security Claims

Next time a tool tells you it uses "military-grade encryption" or "bank-level security," here's your checklist:

1. **Do they specify the algorithm?** PBKDF2, bcrypt, or Argon2 are all legitimate. "Proprietary encryption" is a red flag.
2. **What's the iteration count?** For PBKDF2, 600,000+ is the current standard.
3. **Is it open source?** Can you verify the claims by reading the code?
4. **Where is data processed?** Locally on your device is ideal. Server-side means your data travels over the internet.
5. **Is there rate limiting?** Even the best encryption means nothing if you can guess unlimited passwords per second.

If a tool checks all five boxes, you're in good shape.

## The Takeaway

PBKDF2 takes a fundamentally simple idea — hash the password many, many times — and turns it into a practical, proven defense against the most common form of password attack. It's not magic. It's math. And it's the reason your locked tabs are actually safe, not just hidden behind a pretty lock screen.

---

*Locksy uses PBKDF2 with 600,000+ iterations, open-source code, and zero server communication. [See for yourself on GitHub](https://github.com/nicoryne/Locksy).*
`
    },
    {
        slug: 'chrome-vs-firefox-vs-edge-tab-security',
        title: 'Chrome vs Firefox vs Edge: Which Browser Actually Protects Your Tabs?',
        description: 'An honest comparison of Chrome, Firefox, and Edge tab security features — what each browser gets right, what they get wrong, and what none of them do.',
        author: 'Locksy Security Team',
        publishDate: '2026-02-01',
        lastModified: '2026-02-10',
        readTime: '9 min read',
        category: 'Comparison',
        tags: ['Chrome', 'Firefox', 'Edge', 'Browser Comparison'],
        keywords: ['chrome vs firefox security', 'best browser for security', 'edge vs chrome', 'browser tab security comparison'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'Chrome vs Firefox vs Edge security comparison',
        content: `
## The Browser Wars No One's Having

Every year, the internet produces approximately ten thousand articles comparing Chrome, Firefox, and Edge. They cover speed benchmarks, memory usage, design philosophy, and which one has the best new tab page. What they almost never cover is the one thing that matters most when your browser holds the keys to your entire digital life: **how well each one actually protects your tabs.**

Not your passwords. Not your history. Your *tabs* — the live, active windows into your email, your bank account, your work documents, and that WebMD search you'd really rather nobody saw.

Let's get into it. No benchmarks, no bias toward any brand. Just an honest look at what each browser does and doesn't do.

## Chrome: The Popular One

Chrome dominates the browser market with roughly 65% share, which makes it both the most-used and the most-targeted browser on the planet. Here's what it offers in terms of tab security:

**What Chrome gets right:**
- **Safe Browsing** flags malicious sites before you even load them. The Enhanced Protection mode feeds URLs to Google's real-time threat detection, which catches phishing sites that just popped up minutes ago.
- **Site isolation** runs every site in its own process, so a compromised website can't reach into another tab and steal your data. This was a massive security upgrade when it launched, and it's now on by default.
- **Security updates** roll out every two weeks, patching vulnerabilities faster than any other major browser.

**What Chrome gets wrong:**
- **No built-in tab locking.** You cannot password-protect an individual tab. Full stop. It's been one of the most requested features for years, and Google hasn't shipped it.
- **Sync is on by default.** Chrome syncs your open tabs across every device signed into your Google account. That means a tab you opened on your work laptop might show up on your personal phone, or your kid's Chromebook. You can turn this off, but you have to know to look for it.
- **Extension ecosystem is a double-edged sword.** Chrome has the largest extension store, which is great for functionality but also means more potential for malicious extensions. Google has gotten better at policing the Web Store, but bad actors still slip through.

**Tab-level protection:** None natively. Requires a third-party extension.

## Firefox: The Privacy-Focused One

Firefox is the browser of choice for people who care about privacy — and with good reason. Mozilla is a nonprofit, their business model isn't built on advertising, and they've consistently prioritized user privacy over convenience.

**What Firefox gets right:**
- **Enhanced Tracking Protection** blocks known trackers, cryptominers, fingerprinters, and social media trackers by default. The Strict mode is genuinely aggressive about blocking third-party cookies and hidden trackers.
- **Multi-Account Containers** let you isolate different identities within the same browser. You can have your work Google in one container and your personal Google in another — they don't share cookies, storage, or sessions. This is, honestly, brilliant.
- **Total Cookie Protection** gives every website its own cookie jar, preventing cross-site tracking even from cookies that aren't explicitly blocked.
- **DNS over HTTPS** is enabled by default, encrypting your DNS queries so your ISP can't see which websites you're visiting.

**What Firefox gets wrong:**
- **Still no tab locking.** Just like Chrome, there's no built-in way to password-protect a tab. Containers isolate tabs from each other, but they don't protect tabs from the person sitting in front of the screen.
- **Slower security patching.** Firefox's update cadence has improved but historically lags behind Chrome. When a zero-day affects both browsers, Chrome usually patches first.
- **Smaller extension ecosystem.** The tradeoff of a more curated extension store is fewer options overall.

**Tab-level protection:** None natively. Containers provide isolation, not authentication.

## Edge: The Enterprise One

Microsoft Edge deserves more credit than it gets. Since rebuilding on Chromium, it's become a genuinely solid browser with some unique security features, especially for enterprise users.

**What Edge gets right:**
- **SmartScreen** is Microsoft's phishing and malware detection, and it's excellent — arguably on par with Chrome's Safe Browsing, with the bonus of deep integration into Windows Defender.
- **InPrivate mode** is Edge's incognito equivalent, and the implementation is clean. There's also "Super Duper Secure Mode" (yes, really) which disables JIT compilation in the JavaScript engine, trading some speed for significantly better security against exploits.
- **Application Guard** can open untrusted sites in an isolated Hyper-V container on Windows Enterprise. This is serious, hardware-level isolation that neither Chrome nor Firefox offers.
- **Vertical tabs and tab grouping** make it easier to organize and keep track of what's open.

**What Edge gets wrong:**
- **Aggressive telemetry.** Edge sends more telemetry data to Microsoft than most users realize. You can reduce this in settings, but the defaults are generous with your data.
- **Bloatware tendency.** Shopping recommendations, news feeds, Bing integration — Edge comes with a lot of stuff most people don't want and have to manually turn off.
- **No tab locking.** Same as the others. No native password protection for individual tabs.

**Tab-level protection:** None natively.

## The Feature None of Them Have

If you've noticed a pattern here, you're paying attention. All three major browsers have invested heavily in protecting you from external threats — malware, phishing, trackers, compromised websites. And they've done a genuinely good job at it.

But none of them protect your tabs from the person **behind the keyboard**. Not a hacker in another country. The person literally sitting in your chair, or standing behind it, or grabbing the laptop off the coffee table.

This is the physical access problem, and it's one of the most common security gaps in everyday life. Your coworker, your roommate, your family member — anyone who can see or touch your device can see everything that's open in your browser.

No browser has shipped a solution for this. It's puzzling, because the technology isn't complicated (tab-locking extensions have existed for years), and the demand is clearly there. Maybe it's a UX concern, maybe it's a prioritization issue, maybe they assume the OS screen lock is good enough.

Whatever the reason, if you want tab-level password protection today, an extension is your only option.

## So Which Browser Should You Use?

Honestly? The one you'll actually keep updated and configure properly. A well-configured Firefox is more secure than a neglected Chrome, and vice versa.

But if forced to choose:

- **For maximum privacy:** Firefox with Enhanced Tracking Protection on Strict, plus containers for identity isolation.
- **For fastest security updates:** Chrome with Enhanced Safe Browsing enabled.
- **For enterprise/corporate:** Edge with Application Guard and SmartScreen.
- **For tab-level protection:** Any of the above + Locksy.

The browser you choose matters less than how you use it. Enable the security features that are already there, keep everything updated, minimize your extensions, and add tab-level protection for sensitive content.

## The Ideal Setup

If I were setting up a browser from scratch today with security as a priority, here's what I'd do:

1. **Pick any major browser** (they're all solid on fundamentals)
2. **Enable HTTPS-Only Mode** (built into all three)
3. **Create separate profiles** for work and personal browsing
4. **Install Locksy** and set domain lock rules for banking, email, and work apps
5. **Review extensions** and keep only what I actively use
6. **Turn off tab sync** on my sensitive profile
7. **Enable the most aggressive tracking protection** the browser offers

That entire setup takes about 10 minutes and gets you to a security posture that's better than 99% of internet users.

---

*No matter which browser you use, Locksy adds the tab protection layer that none of them include. [Install it free](/) — works on Chrome, Firefox, Edge, and Brave.*
`
    },
    {
        slug: 'protect-banking-tabs-from-prying-eyes',
        title: 'How to Protect Your Banking Tabs from Prying Eyes',
        description: 'Your bank account is open in a tab right now, isn\'t it? Here\'s how to make sure nobody else can see it — even if they\'re sitting right next to you.',
        author: 'Locksy Security Team',
        publishDate: '2026-02-05',
        lastModified: '2026-02-10',
        readTime: '7 min read',
        category: 'Tutorial',
        tags: ['Banking Security', 'Privacy', 'Tab Security'],
        keywords: ['protect banking tabs', 'secure online banking', 'banking browser security', 'lock bank account tabs'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'Protect banking tabs guide',
        content: `
## The Tab That's Worth More Than Your Laptop

Right now, as you're reading this, there's a good chance you have a banking tab open somewhere in your browser. Maybe it's your checking account. Maybe it's a credit card dashboard. Maybe it's your investment portfolio. And it's sitting there, completely unguarded, sandwiched between a YouTube video and last week's Google Doc.

Anyone who can see your screen can see your balance. Anyone who can touch your keyboard can transfer money, change settings, or view your full transaction history. And most banking sessions stay active for 15-30 minutes, even after you navigate away.

We spend enormous energy protecting our bank credentials — strong passwords, two-factor authentication, biometric login. And then we leave the authenticated session sitting in a browser tab like an unlocked safe with the door hanging open.

Let's talk about how to fix that.

## The Physical Access Threat Is Real

Cybersecurity conversations focus almost exclusively on remote threats: hackers, phishing, malware. And those are real. But the most common way someone sees your financial information isn't through some sophisticated exploit. It's much simpler than that:

- Your partner glances at your screen while walking by
- A coworker leans over during a meeting and sees your tab bar
- Your kid grabs the laptop to play a game and clicks through your tabs
- Someone at a coffee shop reads your screen over your shoulder
- You present your screen in a video call and forget to close the banking tab

These aren't edge cases. They happen every day. And while none of these people may have malicious intent, the discomfort of someone seeing your financial details — your salary, your spending habits, your account balance — is reason enough to care.

## What Banks Don't Protect You From

Banks have gotten very good at protecting the *login* process. Multi-factor authentication, behavioral analytics, device fingerprinting, automated fraud detection — the security around getting *into* your account is genuinely sophisticated.

But once you're in? You're on your own.

Banks can't protect your screen from being seen. They can't prevent someone from scrolling through your transactions on your unlocked device. The session timeout helps eventually, but 15-30 minutes is a long time in practical terms.

Some banks have explored fingerprint or Face ID re-authentication for individual transactions, but none of them protect the display of information. Your balance, your transaction history, your account numbers — all visible to anyone with line of sight to your screen.

## The Simple Solution: Lock Your Banking Tabs

The most practical defense is conceptually simple: put a password gate in front of your banking tabs so they can't be viewed without authentication.

Here's how to set it up with Locksy:

**Step 1: Install Locksy** from your browser's extension store. It's free and works on Chrome, Edge, Firefox, and Brave.

**Step 2: Set your master password.** Make it strong but memorable — this is the only password you'll need for all your locked tabs.

**Step 3: Set up domain auto-lock rules.** This is the key step. Instead of manually locking your banking tab every time, you tell Locksy to automatically lock any tab that matches your bank's URL pattern.

For example:
- Your bank's main site
- Your credit card portal
- Your investment dashboard
- Mobile payment services like Venmo or PayPal

**Step 4: That's it.** From now on, every time you open your bank's website, the tab starts locked. You unlock it when *you* need it, and it stays protected every other time.

## Why Auto-Lock Beats Manual Lock

The biggest reason people's security habits fail is that they rely on the person remembering to do something. You *intend* to lock the tab when you're done, but then a Slack message comes in, and you switch focus, and suddenly it's been three hours and your bank tab is still sitting there, wide open.

Auto-lock removes the human element. The tab locks itself based on the domain. You set the rules once, and they work every time, whether you remember or not.

Think of it like a door that locks automatically behind you. You don't have to remember to lock it — it just locks. Much better than a door you have to manually deadbolt every time you close it.

## Beyond the Tab: Layered Banking Security

Tab locking is one piece of a broader strategy. Here's the full picture:

**Strong, unique passwords for each bank account.** Use a password manager to generate and store them. Your bank password should not be related to any other password you use.

**Two-factor authentication, always.** SMS-based 2FA is okay. App-based (like Google Authenticator or Authy) is better. A hardware key (YubiKey) is best. Whatever your bank supports, enable it.

**Separate browser profile for financial sites.** Create a browser profile that you only use for banking and financial services. No social media, no casual browsing, no random extensions. Just your financial tools and Locksy.

**HTTPS-Only Mode.** Your bank's website should always use HTTPS, but enabling this browser mode catches any accidental connections to non-secure pages.

**Log out when you're done.** Don't just close the tab — actually log out of the session. This invalidates the session cookie so even if someone opens your browser history and navigates back to the bank, they'll hit the login page, not your dashboard.

## Common Scenarios and How to Handle Them

**Scenario: Screen sharing in a video call**
Before sharing your screen, check your tab bar. Better yet, lock banking tabs by default so even if they're visible in the tab bar, someone clicking on them would see a lock screen, not your account.

**Scenario: Working from a coffee shop**
Public spaces mean shoulder surfers. Your locked banking tab means that even if someone leans over, they see a lock screen. Combine this with a privacy screen filter on your laptop for maximum protection.

**Scenario: Family computer**
Set up domain auto-lock for all financial sites. When your kids hop on the computer, banking tabs are locked behind your password. They can browse YouTube all they want without stumbling into your account.

**Scenario: Stepping away from your desk at work**
Lock your screen (Win+L or Cmd+L) *and* have your banking tabs auto-locked. Belt and suspenders. Even if you forget one, the other has you covered.

## What About Mobile Banking?

Most banking apps on phones have their own app-level security — biometric lock, PIN, etc. But if you access your bank through a mobile browser, the same vulnerability applies: the tab is visible to anyone holding your phone.

If you do mobile banking through a browser rather than an app, use the same approach: install a tab locker and set domain rules.

## The 5-Minute Setup

Here's the complete checklist, start to finish:

1. Install Locksy (1 minute)
2. Create master password (30 seconds)
3. Add domain lock rules for your banks (2 minutes)
4. Test it — open your bank's website and confirm it auto-locks (1 minute)
5. Set up keyboard shortcut muscle memory — Alt+Shift+9 (30 seconds of practice)

That's it. Five minutes for meaningful financial privacy.

Your bank invests millions in protecting the login gate. Locksy protects everything behind it.

---

*Your finances deserve better than an open tab. [Get Locksy](/) — free, open-source, and it never sees your data.*
`
    },
    {
        slug: 'keyboard-shortcuts-for-tab-security',
        title: 'Keyboard Shortcuts for Tab Security: The 2-Second Privacy Move',
        description: 'The fastest way to protect your browser tabs is a keyboard shortcut. Here\'s how to set it up and make it second nature.',
        author: 'Locksy Security Team',
        publishDate: '2026-02-08',
        lastModified: '2026-02-12',
        readTime: '6 min read',
        category: 'Productivity',
        tags: ['Keyboard Shortcuts', 'Productivity', 'Tab Security'],
        keywords: ['keyboard shortcuts tab security', 'browser keyboard shortcuts', 'lock tabs keyboard shortcut', 'quick lock tabs'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'Keyboard shortcuts for tab security',
        content: `
## You Have About Two Seconds

Someone's walking toward your desk. You're on a tab you'd rather not explain — your resume on a job site, a medical search, your bank account, whatever. You have roughly two seconds between noticing them and them being close enough to read your screen.

Two seconds. That's the window. And reaching for your mouse, finding the right button, clicking through a menu — that takes about five seconds on a good day. You've already lost.

Keyboard shortcuts exist for exactly this kind of moment. One key combination, pressed without looking, and your tab is locked before anyone gets close enough to see what was on it.

## The Shortcut That Matters

In Locksy, the default shortcut is **Alt+Shift+9**. Press those three keys simultaneously and the current tab is instantly replaced with a lock screen. No animation, no delay, no confirmation dialog. It just locks.

To unlock, press the same shortcut (or click the lock icon) and type your master password.

That's the entire workflow. Three keys to lock. Three keys + password to unlock.

## Why This Specific Shortcut?

Alt+Shift+9 was chosen deliberately:

- **Alt+Shift** is a common modifier combination that doesn't conflict with most OS or browser shortcuts
- **9** is at the end of the number row, close to the delete and backspace keys, making it easy to reach without looking
- The combination is unlikely to be pressed accidentally — you have to intentionally use three keys

If you don't like the default, you can customize it. In Chrome, go to **chrome://extensions/shortcuts**. In Firefox, go to **about:addons** → gear icon → Manage Extension Shortcuts. Set it to whatever feels natural for your hand position.

## Building Muscle Memory

The shortcut is only useful if you can execute it without thinking. Here's how to make it automatic:

**Day 1-3:** Practice pressing Alt+Shift+9 ten times in a row. Don't even have anything important open — just practice the motion until your fingers find the keys without looking down.

**Day 4-7:** Every time you step away from your computer — for coffee, for the bathroom, for a meeting — lock your current tab first. Even if there's nothing sensitive on it. You're training the habit, not protecting specific content yet.

**Week 2+:** By now, it should feel as natural as Ctrl+C for copy or Ctrl+Z for undo. You don't think about those shortcuts; you just do them. That's the goal with your lock shortcut.

**The test:** Have someone walk up to you unexpectedly. If your fingers hit Alt+Shift+9 before your brain fully processes what's happening, congratulations — you've built the reflex.

## Beyond the Lock Shortcut

While the lock shortcut is the most important one, there are other keyboard shortcuts that complement tab security:

**Ctrl+W** — Close the current tab. Sometimes the fastest defense is just closing what's open. The downside is losing your place in whatever you were viewing.

**Ctrl+Shift+N** (Chrome/Edge) or **Ctrl+Shift+P** (Firefox) — Open a new incognito/private window. Useful for quick private browsing sessions where you don't even want history saved.

**Ctrl+Tab** / **Ctrl+Shift+Tab** — Switch between tabs. If your sensitive tab is locked but you need to quickly navigate away, switching to an innocuous tab buys you time.

**Win+L** (Windows) or **Ctrl+Cmd+Q** (Mac) — Lock your entire computer screen. The nuclear option. Use this when you're leaving your desk for more than a few seconds.

## The Speed Hierarchy

From fastest to slowest, here's how different protection methods rank:

1. **Alt+Shift+9** — Lock current tab (~0.3 seconds)
2. **Ctrl+W** — Close current tab (~0.3 seconds, but you lose the tab)
3. **Win+L** — Lock entire computer (~0.5 seconds)
4. **Mouse → Extension icon → Lock** — Click-based locking (~2-3 seconds)
5. **Mouse → Close tab** — Click the X on the tab (~1-2 seconds)

The keyboard options are all sub-second. The mouse options are not. In a two-second window, only keyboard shortcuts are reliable.

## Real-World Scenarios

**Open office environment.** People walk behind your desk constantly. The shortcut becomes as habitual as breathing. You lock, they pass, you unlock. Nobody notices.

**Working from home with family.** Your kid runs into your office excitedly. You've got a salary negotiation email open. Alt+Shift+9 → locked → "Hey buddy, what's up?" → problem solved.

**At a coffee shop.** You're working on something confidential. Someone sits down at the table next to you. Lock the tab, keep working on something else. Unlock it when cozy.

**Screen sharing at work.** You're about to share your screen for a presentation. Quick scan of your tab bar — lock everything that isn't relevant with a few rapid Alt+Shift+9 presses while switching between tabs.

## Customization Tips

If you're setting a custom shortcut, keep these principles in mind:

- **Use a modifier combination** (Ctrl+Shift, Alt+Shift, Ctrl+Alt) so you don't accidentally trigger it while typing
- **Choose a key your dominant hand can reach easily** without looking
- **Avoid conflicts** with common shortcuts in your most-used apps
- **Use the same shortcut for lock and unlock trigger** so you only need to remember one combination
- **Don't make it too complex** — four-key combinations are hard to hit quickly

Popular custom choices: Ctrl+Shift+L (L for lock), Alt+Shift+Q (ring finger reach), Ctrl+Shift+Space (thumb on space bar).

## The Bigger Picture

Keyboard shortcuts for security are part of a broader philosophy: **the best security measures are the ones you'll actually use.** A complex 15-step security procedure that you skip because it's annoying is worse than a one-key shortcut that you use every single time.

Every security tool faces this tension between thoroughness and usability. The lock shortcut succeeds because it respects the constraint of human behavior — we'll do things that are fast and easy, and we'll skip things that are slow and annoying. Alt+Shift+9 is fast and easy. So people actually use it.

---

*Speed matters when privacy is on the line. [Install Locksy](/) and start building the reflex.*
`
    },
    {
        slug: 'shared-computer-security-ultimate-guide',
        title: 'Shared Computer Security: The Ultimate Guide for 2026',
        description: 'Whether it\'s a family PC, a library terminal, or a hot-desking office — here\'s how to keep your stuff private on a computer that isn\'t entirely yours.',
        author: 'Locksy Security Team',
        publishDate: '2026-02-10',
        lastModified: '2026-02-12',
        readTime: '9 min read',
        category: 'Security',
        tags: ['Shared Computers', 'Privacy', 'Security Guide'],
        keywords: ['shared computer security', 'public computer privacy', 'shared PC security', 'family computer security'],
        image: '/web-app-manifest-512x512.png',
        imageAlt: 'Shared computer security guide',
        content: `
## The Computer That Isn't Just Yours

Somewhere in the world, right now, a college student is nervously checking their bank balance on a library computer. A freelancer is logging into client projects at a coworking space. A teenager is applying for jobs on the family desktop while hoping their parents don't read their search history.

Shared computers are everywhere — at home, at work, in libraries, schools, hotels, airports. And the fundamental challenge is always the same: how do you use a computer that other people also use, without leaving your private life exposed?

This guide covers the practical steps that actually work, whether you're sharing with family, coworkers, or strangers.

## First, Understand What Stays Behind

When you use a shared computer and walk away, here's what you might be leaving behind:

**Browser history.** Every site you visited, timestamped.

**Saved passwords.** If you clicked "Remember me" or let the browser save your password, the next user can log in as you.

**Cookies and sessions.** Even if you close a tab, many websites keep your session active. Open the same site again and you're still logged in.

**Autofill data.** Addresses, phone numbers, credit card numbers that the browser helpfully offered to remember.

**Downloaded files.** That PDF you opened? It's in the Downloads folder.

**Open tabs.** If you didn't close the browser entirely, your tabs are sitting there waiting for the next person.

Most people are aware of some of these, but few people consistently clean up all of them. That's because manual cleanup is tedious and easy to forget.

## Strategy 1: Use a Separate Browser Profile

This is the single most impactful thing you can do on a shared computer. Create your own browser profile with your own settings, extensions, bookmarks, and passwords — completely isolated from other profiles on the same computer.

On Chrome or Edge, click your profile icon in the top right and select "Add." On Firefox, type **about:profiles** in the address bar.

Each profile is essentially a separate browser. Person A's saved passwords, history, and cookies don't appear in Person B's profile. It's like having your own drawer in a shared desk.

**The limitation:** Profiles aren't password-protected by default. Anyone can switch to your profile by clicking on it. This is where tab locking comes in — if someone does access your profile, your sensitive tabs are still locked behind your password.

## Strategy 2: Lock Your Sensitive Tabs

Browser profiles separate your data from other users' data, but they don't protect you from someone opening your profile. For that, you need tab-level protection.

Install Locksy and set up domain auto-lock rules for the sites that matter:
- Email
- Banking
- Social media
- Work applications
- Health portals

Even if someone opens your browser profile, they see locked tabs that require your password to view. Without it, all they see is a lock screen.

The combination of profiles + tab locking is particularly powerful: profiles prevent accidental data mixing, and tab locking prevents deliberate snooping.

## Strategy 3: Incognito for One-Off Tasks

If you're using a truly public computer — library, hotel business center, airport kiosk — don't log into anything in a regular window. Use incognito mode for the entire session.

Incognito ensures that when you close the window:
- All cookies are deleted
- No history is saved
- No autofill data is retained
- All sessions are terminated

This is the right tool for public computers where you have no control over the setup and can't install extensions. It's a one-session solution: use it, close it, walk away clean.

**Important:** Incognito doesn't protect you while the window is open. If you walk away from a public computer with incognito tabs still open, anyone can see them. Always close the browser completely when you're done.

## The Family Computer Playbook

Family computers have a unique dynamic: you trust the people using them (mostly), but you still want privacy. Here's a practical setup:

**1. Create a profile for each family member.** Even for kids. This prevents history, passwords, and preferences from bleeding between users.

**2. Install Locksy on profiles that need it.** Adults who access banking, health, or work information should have tab protection. Kids probably don't need it.

**3. Set domain auto-lock rules.** Your banking and email tabs auto-lock, so even if your kid switches to your profile to "find a bookmark," your sensitive tabs are protected.

**4. Enable parental controls where appropriate.** This guide focuses on protecting your own privacy, but if kids are using the computer too, built-in parental controls or a dedicated tool handle that separate concern.

**5. Don't use "Remember me" on shared profiles.** If there's any chance someone else could access your profile, don't save login sessions. Log in each time. It takes 10 extra seconds and prevents the "I was already logged into your Amazon" situation.

## The Workplace Playbook

Office computers and hot-desking setups present different challenges:

**If it's your assigned computer that others might occasionally access:**
- Dedicated browser profile for your work
- Tab locking for anything confidential (HR portals, sensitive projects, email)
- Win+L to lock your computer every time you stand up — make it an absolute habit
- Don't save personal passwords in your work browser

**If you're hot-desking (different desk each day):**
- Use incognito mode for everything, or
- Use a portable browser profile on a USB drive
- Never save passwords on the shared machine
- Clear browser data at the end of each session
- Check for and close any tabs you opened when leaving

**If it's a shared terminal (reception desk, conference room):**
- Incognito mode only
- Log out of everything before walking away
- Clear the browser history (Ctrl+Shift+Delete)
- Make sure it isn't set to restore previous session on restart

## The Public Computer Survival Guide

Public computers — libraries, internet cafes, hotel lobbies — are the highest-risk scenario. You have no control over the software, you don't know what's installed, and you have no idea who used it before you.

**Rules for public computers:**

1. **Assume everything is being logged.** Keyloggers, screen recorders, browser monitoring — assume the worst and behave accordingly.

2. **Use incognito mode exclusively.** Don't use the regular browser.

3. **Don't log into sensitive accounts.** If you absolutely must check your bank or email, change your passwords afterward from a secure device.

4. **Use two-factor authentication.** Even if a keylogger captures your password, 2FA prevents access.

5. **Don't plug in USB drives.** Malware can transfer both ways.

6. **Check the URL bar.** Phishing pages that look like bank sites are particularly common on compromised public computers.

7. **Clear everything and close the browser when done.** Don't just close the tab — close the entire browser.

8. **If possible, bring your own device instead.** Tethering to your phone's hotspot on your own laptop is infinitely safer than using a public terminal.

## What About Chromebooks and Managed Devices?

Chromebooks are increasingly common in shared environments — schools, companies, public spaces. Chrome OS has some advantages for shared use:

- **Guest mode** provides a clean, temporary session with no data retention
- **User accounts** are completely separated and encrypted
- **Verified boot** ensures the OS hasn't been tampered with

The downside is that Chromebooks rely heavily on your Google account, so if someone gains access to your Google session, they have access to... everything. Tab locking adds a meaningful layer of protection here.

## Building the Habit

Security on shared computers isn't about having the right tools — it's about using them consistently. The most common failure mode is "I usually do this, but I forgot that one time." And that one time is all it takes.

Three habits to build:

1. **Lock your screen every time you stand up.** Win+L or Ctrl+Cmd+Q. Every. Single. Time. Even if you're just turning around to talk to someone.

2. **Never click "Remember me" on a shared computer.** Not even once. Not even when you're tired and just want to skip the login screen.

3. **Close or lock before switching context.** Before you hand the computer to someone, before you walk away, before you let someone "just check one thing" — lock your tabs or close the browser.

These three habits, consistently applied, prevent 95% of shared computer privacy issues.

## The Realistic Takeaway

Perfect security on a shared computer isn't possible. By definition, you're using hardware that other people have physical access to, and physical access is the master key that overrides most software protections.

But "perfect" isn't the goal. "Reasonable" is. A separate browser profile + locked tabs + consistent habits gets you to a place where casual snooping is blocked, accidental exposure is prevented, and even deliberate attempts to access your data face real barriers.

Set up a browser profile with Locksy on it. Lock your screen when you walk away. Don't save passwords on shared machines. That's it. That's the practice.

---

*Shared computer? Private tabs. [Install Locksy](/) and keep your browsing yours.*
`
    }
]

// Helper function to get a single blog post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
}

// Helper function to get related posts
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
    const currentPost = getBlogPost(currentSlug)
    if (!currentPost) return []

    const scoredPosts = blogPosts
        .filter(post => post.slug !== currentSlug)
        .map(post => {
            const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag))
            return { post, score: commonTags.length }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

    return scoredPosts.map(item => item.post)
}

export function getPostsByCategory(category: string): BlogPost[] {
    return blogPosts.filter(post => post.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
    return blogPosts.filter(post => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
    const categories = new Set(blogPosts.map(post => post.category))
    return Array.from(categories).sort()
}

export function getAllTags(): string[] {
    const tags = new Set(blogPosts.flatMap(post => post.tags))
    return Array.from(tags).sort()
}
