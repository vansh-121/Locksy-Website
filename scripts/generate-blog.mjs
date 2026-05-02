/**
 * Auto Blog Generator for Locksy
 *
 * Generates an SEO-optimized blog post via Google Gemini API and saves it as
 * its own TypeScript file inside lib/posts/. The lib/posts/index.ts aggregator
 * is then regenerated automatically so the new post is picked up immediately.
 *
 * Usage:
 *   GEMINI_API_KEY=your-google-gemini-api-key node scripts/generate-blog.mjs
 *
 * Triggered daily at 8 AM UTC via GitHub Actions workflow.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'lib', 'posts')
const INDEX_PATH = join(POSTS_DIR, 'index.ts')

// SEO topic pool — these rotate to ensure variety & ranking potential
const TOPIC_POOL = [
    {
        title: "How to Lock Specific Tabs in Chrome Without Extensions",
        category: "Tutorial",
        keywords: ["lock chrome tabs", "chrome tab security", "protect chrome tabs", "chrome privacy tips"],
        tags: ["Chrome", "Browser Security", "Tutorial"]
    },
    {
        title: "Why Your Open Browser Tabs Are a Security Risk in 2026",
        category: "Security",
        keywords: ["browser tab security risk", "open tabs vulnerability", "browser privacy risks", "tab security threats"],
        tags: ["Security", "Privacy", "Browser Tabs"]
    },
    {
        title: "10 Browser Security Extensions Everyone Should Install",
        category: "Comparison",
        keywords: ["browser security extensions", "best browser extensions 2026", "privacy extensions", "security add-ons"],
        tags: ["Extensions", "Browser Security", "Comparison"]
    },
    {
        title: "Complete Guide to PBKDF2 vs bcrypt vs Argon2 for Password Hashing",
        category: "Technical",
        keywords: ["PBKDF2 vs bcrypt", "password hashing comparison", "Argon2 encryption", "secure password storage"],
        tags: ["Encryption", "Technical", "Security"]
    },
    {
        title: "How Remote Workers Can Protect Sensitive Browser Tabs",
        category: "Productivity",
        keywords: ["remote work security", "protect browser tabs remote", "work from home security", "remote worker privacy"],
        tags: ["Remote Work", "Productivity", "Security"]
    },
    {
        title: "Browser Tab Management: Security Best Practices for Teams",
        category: "Tutorial",
        keywords: ["team browser security", "enterprise tab management", "corporate browser policy", "team security practices"],
        tags: ["Teams", "Enterprise", "Best Practices"]
    },
    {
        title: "The Psychology of Digital Privacy: Why People Ignore Tab Security",
        category: "Research",
        keywords: ["digital privacy psychology", "security awareness", "privacy behavior", "tab security awareness"],
        tags: ["Psychology", "Privacy", "Research"]
    },
    {
        title: "How to Set Up Auto-Lock for Banking and Financial Tabs",
        category: "Tutorial",
        keywords: ["auto lock banking tabs", "financial tab security", "protect online banking", "banking browser security"],
        tags: ["Banking", "Auto-Lock", "Tutorial"]
    },
    {
        title: "Firefox vs Chrome vs Edge: Which Browser is Most Secure in 2026?",
        category: "Comparison",
        keywords: ["most secure browser 2026", "firefox vs chrome security", "edge browser security", "browser comparison"],
        tags: ["Comparison", "Firefox", "Chrome", "Edge"]
    },
    {
        title: "How Students Can Protect Their Browser Tabs on Shared School Computers",
        category: "Tutorial",
        keywords: ["student browser security", "shared computer protection", "school computer privacy", "protect tabs at school"],
        tags: ["Students", "Shared Computers", "Tutorial"]
    },
    {
        title: "Understanding Zero-Knowledge Architecture in Browser Extensions",
        category: "Technical",
        keywords: ["zero knowledge browser extension", "zero knowledge encryption", "privacy by design", "secure extension architecture"],
        tags: ["Zero-Knowledge", "Technical", "Privacy"]
    },
    {
        title: "Top 5 Keyboard Shortcuts for Better Browser Security",
        category: "Productivity",
        keywords: ["browser keyboard shortcuts security", "quick lock shortcuts", "browser productivity shortcuts", "security hotkeys"],
        tags: ["Keyboard Shortcuts", "Productivity", "Tips"]
    },
    {
        title: "How to Protect Your Browser on Public WiFi Networks",
        category: "Security",
        keywords: ["browser security public wifi", "protect browser public network", "public wifi safety", "secure browsing tips"],
        tags: ["Public WiFi", "Security", "Privacy"]
    },
    {
        title: "Browser Tab Security for Content Creators and Streamers",
        category: "Productivity",
        keywords: ["streamer browser security", "content creator privacy", "hide tabs streaming", "stream security tips"],
        tags: ["Content Creators", "Streamers", "Privacy"]
    },
    {
        title: "The Future of Browser Security: Predictions for 2027",
        category: "Research",
        keywords: ["browser security future", "2027 security trends", "browser privacy trends", "future of web security"],
        tags: ["Future", "Trends", "Research"]
    },
    {
        title: "How Parents Can Lock Sensitive Tabs on Family Computers",
        category: "Tutorial",
        keywords: ["parental browser control", "family computer security", "lock tabs from kids", "child safe browsing"],
        tags: ["Parental Controls", "Family", "Tutorial"]
    },
    {
        title: "What Happens When Someone Accesses Your Unlocked Browser Tabs",
        category: "Security",
        keywords: ["unlocked browser risk", "browser tab theft", "open tabs data leak", "unprotected browser danger"],
        tags: ["Security Risks", "Privacy", "Awareness"]
    },
    {
        title: "Comparing Tab Lockers: Locksy vs Other Browser Extension Solutions",
        category: "Comparison",
        keywords: ["locksy comparison", "tab locker comparison", "best tab lock extension", "browser tab protection tools"],
        tags: ["Comparison", "Locksy", "Extensions"]
    },
    {
        title: "How to Create an Unbreakable Master Password for Tab Security",
        category: "Tutorial",
        keywords: ["create strong master password", "unbreakable password tips", "master password best practices", "secure password guide"],
        tags: ["Passwords", "Security", "Tutorial"]
    },
    {
        title: "Why Incognito Mode Is Not Enough for Browser Privacy",
        category: "Security",
        keywords: ["incognito mode not secure", "private browsing limitations", "incognito privacy myth", "browser privacy vs incognito"],
        tags: ["Incognito", "Privacy", "Myths"]
    },
    {
        title: "Essential Browser Security Checklist for Small Businesses",
        category: "Productivity",
        keywords: ["small business browser security", "business browser checklist", "secure business browsing", "company browser policy"],
        tags: ["Small Business", "Checklist", "Enterprise"]
    },
    {
        title: "How Password-Based Encryption Protects Your Locked Tabs",
        category: "Technical",
        keywords: ["password based encryption tabs", "tab encryption explained", "how tab locking works", "browser encryption technology"],
        tags: ["Encryption", "Technical", "How It Works"]
    },
    {
        title: "Digital Minimalism: Using Tab Security to Reduce Browser Clutter",
        category: "Productivity",
        keywords: ["digital minimalism tabs", "reduce browser clutter", "organized browsing", "minimal browser setup"],
        tags: ["Digital Minimalism", "Productivity", "Organization"]
    },
    {
        title: "Browser Security Mistakes That Put Your Data at Risk",
        category: "Security",
        keywords: ["browser security mistakes", "common browser errors", "data risk browsing", "avoid browser security errors"],
        tags: ["Mistakes", "Security", "Best Practices"]
    },
    {
        title: "How Locksy Uses Client-Side Encryption to Keep Your Tabs Private",
        category: "Technical",
        keywords: ["client side encryption browser", "locksy encryption method", "local encryption tabs", "private tab encryption"],
        tags: ["Locksy", "Encryption", "Technical"]
    },
    // ── Feature-focused educational topics ──────────────────────────────────
    // These cover Locksy features from a conceptual / technology-first angle.
    // The AI prompt ensures they read as genuine deep-dives, not product pitches.
    {
        title: "How WebAuthn and FIDO2 Biometrics Are Changing Browser Security",
        category: "Technical",
        keywords: ["webauthn browser extension", "FIDO2 authentication", "biometric browser security", "fingerprint browser unlock"],
        tags: ["Biometrics", "WebAuthn", "FIDO2", "Security"]
    },
    {
        title: "Why an Idle Browser Is a Security Risk (And How Auto-Lock Timers Fix It)",
        category: "Security",
        keywords: ["browser auto lock timer", "idle session security", "automatic tab lock", "browser session timeout security"],
        tags: ["Auto-Lock", "Session Security", "Best Practices"]
    },
    {
        title: "Browser Security on a Schedule: How Time-Based Tab Locking Works",
        category: "Tutorial",
        keywords: ["scheduled browser lock", "time-based tab security", "browser security schedule", "automatic lock schedule browser"],
        tags: ["Scheduled Locking", "Automation", "Security"]
    },
    {
        title: "Why Smart People Use Domain Rules Instead of Manually Locking Tabs",
        category: "Tutorial",
        keywords: ["domain lock browser", "automatic tab lock by domain", "site-specific browser security", "domain security rules browser"],
        tags: ["Domain Lock", "Automation", "Privacy"]
    },
    {
        title: "The Case for One-Click Security: Why Friction Is the Enemy of Good Habits",
        category: "Security",
        keywords: ["one click browser security", "frictionless tab protection", "quick lock browser tab", "security ux design"],
        tags: ["One-Click", "UX", "Security Habits"]
    },
    {
        title: "How Browser Extensions Defend Against Brute-Force Password Attacks",
        category: "Technical",
        keywords: ["brute force protection browser extension", "rate limiting browser password", "password attack prevention browser", "browser extension security hardening"],
        tags: ["Brute-Force", "Rate Limiting", "Technical"]
    },
    {
        title: "Incognito Mode Won't Save You: The Case for Real Tab-Level Privacy",
        category: "Security",
        keywords: ["incognito mode not enough", "private browsing tab lock", "incognito tab protection real", "browser privacy beyond incognito"],
        tags: ["Incognito", "Private Browsing", "Privacy"]
    },
    // ── NEW TOPICS (2026) ──────────────────────────────────────────────────
    {
        title: "How AI-Powered Browser Security Is Changing Tab Protection",
        category: "Research",
        keywords: ["ai browser security", "machine learning tab protection", "ai security threats", "intelligent browser defense"],
        tags: ["AI", "Security", "Future Tech"]
    },
    {
        title: "Dark Mode Security: Why Your Eyes And Your Privacy Benefit",
        category: "Productivity",
        keywords: ["dark mode browser security", "dark mode privacy benefits", "eye strain security", "dark mode productivity"],
        tags: ["Dark Mode", "Productivity", "Privacy"]
    },
    {
        title: "API Security for Browser Tab Extension Developers",
        category: "Technical",
        keywords: ["browser extension api security", "chrome extension security", "extension vulnerability prevention", "secure extension development"],
        tags: ["API", "Developer", "Security"]
    },
    {
        title: "Why Your Browser History Is Worth More Than You Think",
        category: "Security",
        keywords: ["browser history security risk", "delete browser history", "history tracking threat", "browser history privacy"],
        tags: ["Browser History", "Privacy", "Data Protection"]
    },
    {
        title: "Cryptocurrency Wallet Tab Security: Protecting Your Digital Assets",
        category: "Technical",
        keywords: ["crypto wallet security", "protect crypto tabs", "bitcoin browser security", "blockchain tab protection"],
        tags: ["Cryptocurrency", "Wallet", "Financial Security"]
    },
    {
        title: "How Tab Locking Prevents VPN Bypass Attacks",
        category: "Security",
        keywords: ["vpn bypass prevention", "vpn security tab lock", "prevent dns leak", "secure vpn usage"],
        tags: ["VPN", "Security", "Network Protection"]
    },
    {
        title: "Browser Extension Permissions: The Hidden Security Risk You're Ignoring",
        category: "Security",
        keywords: ["extension permissions risk", "dangerous extension permissions", "prevent extension abuse", "browser permissions security"],
        tags: ["Permissions", "Security Risks", "Privacy"]
    },
    {
        title: "Social Engineering Attacks Through Browser Tabs: How to Defend",
        category: "Security",
        keywords: ["social engineering browser", "phishing tab attacks", "prevent browser takeover", "defend social engineering"],
        tags: ["Social Engineering", "Phishing", "Defense"]
    },
    {
        title: "Tab Overload: How Too Many Open Tabs Compromise Your Security",
        category: "Productivity",
        keywords: ["too many open tabs", "tab management security", "browser memory security", "reduce open tabs"],
        tags: ["Tab Management", "Productivity", "Security"]
    },
    {
        title: "GDPR Compliance and Browser Tab Data: What You Need to Know",
        category: "Technical",
        keywords: ["gdpr browser data", "browser data compliance", "privacy regulation browser", "data protection browser"],
        tags: ["GDPR", "Compliance", "Legal"]
    },
    {
        title: "How Zero-Trust Security Applies to Your Browser Tabs",
        category: "Technical",
        keywords: ["zero trust browser", "zero trust security", "browser trust model", "verify every tab"],
        tags: ["Zero-Trust", "Security Model", "Enterprise"]
    },
    {
        title: "Screen Recording Protection: Hiding Tabs From Screen Captures",
        category: "Tutorial",
        keywords: ["screen recording protection", "hide tabs from recording", "privacy screen recording", "prevent screen capture"],
        tags: ["Screen Recording", "Privacy", "Protection"]
    },
    {
        title: "Browser Cache Poisoning: Why Tab Isolation Matters",
        category: "Technical",
        keywords: ["browser cache poisoning", "cache attack prevention", "browser cache security", "isolated tab cache"],
        tags: ["Cache", "Browser Security", "Attack Prevention"]
    },
    {
        title: "How to Protect Healthcare Provider Tabs From Cybercriminals",
        category: "Tutorial",
        keywords: ["healthcare tab security", "hipaa browser security", "protect medical data", "healthcare data protection"],
        tags: ["Healthcare", "Data Protection", "Compliance"]
    },
    {
        title: "Real-Time Tab Anomaly Detection: The Future of Browser Security",
        category: "Research",
        keywords: ["anomaly detection browser", "ai threat detection tabs", "real-time browser security", "behavior analysis browser"],
        tags: ["AI", "Threat Detection", "Innovation"]
    },
    {
        title: "Why Browser Context Isolation Won't Protect You (Without Tab Locking)",
        category: "Security",
        keywords: ["browser context isolation", "site isolation bypass", "tab data leakage", "context isolation limits"],
        tags: ["Browser Architecture", "Security", "Advanced"]
    },
    {
        title: "Remote Access Software Security: Locking Sensitive Tabs During Screen Sharing",
        category: "Tutorial",
        keywords: ["remote access security", "screen sharing privacy", "protect tabs sharing", "teamviewer security"],
        tags: ["Remote Work", "Screen Sharing", "Privacy"]
    },
    {
        title: "How Passkeys Are Replacing Passwords (And Why Tab Protection Still Matters)",
        category: "Research",
        keywords: ["passkeys vs passwords", "webauthn adoption", "passwordless authentication", "passkey security"],
        tags: ["Passkeys", "Authentication", "Future"]
    },
    {
        title: "Protecting Your Tabs From Man-in-the-Middle Attacks on Open Networks",
        category: "Security",
        keywords: ["man in the middle attack", "mitm browser protect", "packet sniffing defense", "open network security"],
        tags: ["Network Security", "MITM", "Open WiFi"]
    },
    // ── NEW TOPICS — Batch 2 (May 2026) ────────────────────────────────────
    {
        title: "Session Hijacking Explained: How Attackers Steal Your Open Tab Sessions",
        category: "Security",
        keywords: ["session hijacking browser", "cookie theft attack", "stolen session token", "browser session security"],
        tags: ["Session Hijacking", "Cookies", "Attack Vectors"]
    },
    {
        title: "Tabnabbing Attacks: How Inactive Browser Tabs Get Hijacked",
        category: "Security",
        keywords: ["tabnabbing attack", "tab hijacking browser", "inactive tab exploit", "phishing via tab switch"],
        tags: ["Tabnabbing", "Phishing", "Attack Vectors"]
    },
    {
        title: "Browser Fingerprinting: What Sites Know About You Without Cookies",
        category: "Research",
        keywords: ["browser fingerprinting", "canvas fingerprint tracking", "fingerprint privacy", "anti-fingerprinting browser"],
        tags: ["Fingerprinting", "Privacy", "Tracking"]
    },
    {
        title: "How Saved Passwords in Your Browser Can Be Compromised",
        category: "Security",
        keywords: ["browser saved passwords risk", "browser password manager danger", "steal browser passwords", "password storage security"],
        tags: ["Passwords", "Browser Storage", "Security Risks"]
    },
    {
        title: "The Hidden Dangers of Browser Autofill and Saved Form Data",
        category: "Security",
        keywords: ["browser autofill security risk", "saved form data attack", "autofill password leak", "disable autofill security"],
        tags: ["Autofill", "Form Data", "Privacy"]
    },
    {
        title: "Content Security Policy (CSP) Demystified: How It Protects Your Browser",
        category: "Technical",
        keywords: ["content security policy explained", "csp browser protection", "xss prevention csp", "web security headers"],
        tags: ["CSP", "Security Headers", "XSS Prevention"]
    },
    {
        title: "How Cross-Site Request Forgery (CSRF) Attacks Target Your Active Sessions",
        category: "Technical",
        keywords: ["csrf attack browser", "cross site request forgery", "csrf token protection", "active session exploit"],
        tags: ["CSRF", "Session Security", "Technical"]
    },
    {
        title: "localStorage vs sessionStorage: Security Risks Developers Often Miss",
        category: "Technical",
        keywords: ["localstorage security risk", "sessionstorage vulnerability", "browser storage attack", "web storage security"],
        tags: ["localStorage", "Web Storage", "Developer Security"]
    },
    {
        title: "WebRTC IP Leak: How Video Calls Expose Your Real IP Address Through the Browser",
        category: "Security",
        keywords: ["webrtc ip leak", "vpn webrtc bypass", "real ip exposure browser", "webrtc privacy fix"],
        tags: ["WebRTC", "IP Leak", "Privacy"]
    },
    {
        title: "How Clipboard Access in Browsers Puts Your Copied Data at Risk",
        category: "Security",
        keywords: ["clipboard access browser", "website read clipboard", "clipboard security risk", "protect clipboard data"],
        tags: ["Clipboard", "Privacy", "Browser APIs"]
    },
    {
        title: "Browser Extension Supply Chain Attacks: The Threat You Haven't Prepared For",
        category: "Security",
        keywords: ["extension supply chain attack", "browser extension compromise", "malicious extension update", "extension security audit"],
        tags: ["Supply Chain", "Extensions", "Security"]
    },
    {
        title: "How to Audit Your Installed Browser Extensions for Security Risks",
        category: "Tutorial",
        keywords: ["audit browser extensions", "extension security check", "remove dangerous extensions", "extension permissions review"],
        tags: ["Security Audit", "Extensions", "Tutorial"]
    },
    {
        title: "Browser Profiles: The Underused Feature That Separates Work From Personal Browsing",
        category: "Productivity",
        keywords: ["browser profiles security", "separate work personal browser", "chrome profile security", "multi-profile browser"],
        tags: ["Browser Profiles", "Productivity", "Separation"]
    },
    {
        title: "Multi-Account Security in the Browser: Keeping Work and Personal Sessions Isolated",
        category: "Tutorial",
        keywords: ["multi account browser security", "separate sessions browser", "account isolation browser", "work personal browser isolation"],
        tags: ["Multi-Account", "Session Isolation", "Privacy"]
    },
    {
        title: "How Browser Tab Sync Across Devices Creates New Attack Surfaces",
        category: "Security",
        keywords: ["browser tab sync security", "cloud sync browser risk", "synced tabs privacy", "cross-device browser attack"],
        tags: ["Tab Sync", "Cloud Security", "Cross-Device"]
    },
    {
        title: "Service Workers and Browser Security: What Every User Should Know",
        category: "Technical",
        keywords: ["service worker security", "browser service worker risk", "pwa security", "background browser script"],
        tags: ["Service Workers", "PWA", "Security"]
    },
    {
        title: "How HTTPS Actually Works (And Where It Still Leaves You Exposed)",
        category: "Technical",
        keywords: ["how https works", "tls encryption browser", "https limitations", "certificate pinning browser"],
        tags: ["HTTPS", "TLS", "Encryption", "Technical"]
    },
    {
        title: "Shoulder Surfing in the Digital Age: Protecting Your Tabs on Multi-Monitor Setups",
        category: "Security",
        keywords: ["shoulder surfing digital", "multi monitor tab privacy", "screen visibility security", "desk setup privacy"],
        tags: ["Shoulder Surfing", "Physical Security", "Privacy"]
    },
    {
        title: "How Lawyers and Law Firms Should Secure Client Data in the Browser",
        category: "Tutorial",
        keywords: ["law firm browser security", "legal data browser protection", "attorney client privilege browser", "legal professional privacy"],
        tags: ["Legal", "Professional", "Data Protection"]
    },
    {
        title: "Protecting Sensitive Financial Data in the Browser for Accountants and CPAs",
        category: "Tutorial",
        keywords: ["accountant browser security", "financial data browser protection", "cpa client data security", "tax data browser privacy"],
        tags: ["Finance", "Accounting", "Professional Security"]
    },
    {
        title: "How Journalists Protect Sources Using Browser Security Techniques",
        category: "Research",
        keywords: ["journalist browser security", "protect sources online", "investigative reporter privacy", "whistleblower browser safety"],
        tags: ["Journalism", "Source Protection", "Privacy"]
    },
    {
        title: "Protecting Developer Intellectual Property: Securing Code Tabs and API Keys in the Browser",
        category: "Tutorial",
        keywords: ["developer tab security", "protect api keys browser", "code security browser", "developer privacy tools"],
        tags: ["Developers", "API Keys", "Intellectual Property"]
    },
    {
        title: "Browser Telemetry: What Your Browser Secretly Reports Back to Its Maker",
        category: "Research",
        keywords: ["browser telemetry data", "chrome firefox telemetry", "browser privacy reporting", "disable browser telemetry"],
        tags: ["Telemetry", "Privacy", "Data Collection"]
    },
    {
        title: "The Anatomy of a Phishing Page: How Attackers Clone Legitimate Sites in Your Browser",
        category: "Security",
        keywords: ["phishing page anatomy", "fake website browser", "url spoofing detection", "identify phishing site"],
        tags: ["Phishing", "Detection", "Attack Anatomy"]
    },
    {
        title: "WebSocket Security: How Real-Time Browser Connections Can Be Exploited",
        category: "Technical",
        keywords: ["websocket security", "real-time browser attack", "websocket hijacking", "secure websocket connection"],
        tags: ["WebSocket", "Real-Time", "Security"]
    },
    {
        title: "Browser Sandbox Escapes: What They Are and Why You Should Care",
        category: "Research",
        keywords: ["browser sandbox escape", "sandbox bypass vulnerability", "browser exploit sandbox", "chromium sandbox security"],
        tags: ["Sandbox", "Browser Exploits", "Advanced Security"]
    },
    {
        title: "Why Cross-Origin Resource Sharing (CORS) Misconfigurations Are a Browser Security Nightmare",
        category: "Technical",
        keywords: ["cors misconfiguration security", "cross origin browser attack", "cors vulnerability", "fix cors security"],
        tags: ["CORS", "Web Security", "Technical"]
    },
    {
        title: "How to Use Browser Developer Tools to Audit Your Own Security",
        category: "Tutorial",
        keywords: ["browser devtools security audit", "devtools privacy check", "network tab security devtools", "inspect element security"],
        tags: ["Developer Tools", "Security Audit", "Tutorial"]
    },
    {
        title: "HttpOnly and SameSite Cookies Explained: Why These Flags Protect Your Sessions",
        category: "Technical",
        keywords: ["httponly cookie security", "samesite cookie flag", "secure cookie attributes", "session cookie protection"],
        tags: ["Cookies", "Session Security", "Technical"]
    },
    {
        title: "Protecting Sensitive Browser Tabs During Video Calls and Online Meetings",
        category: "Tutorial",
        keywords: ["screen share tab protection", "hide tabs video call", "zoom meeting browser privacy", "secure tab sharing online"],
        tags: ["Video Calls", "Screen Sharing", "Privacy"]
    },
]

// Pool of high-quality Unsplash images for blog cover photos.
// Each entry includes `tags` so the keyword-based fallback can score relevance
// when the Unsplash API is not available.
const COVER_IMAGE_POOL = [
    { url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Developer coding on a laptop with security focus', tags: ['developer', 'coding', 'laptop', 'programming', 'security'] },
    { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Cybersecurity concept with digital shield and lock', tags: ['cybersecurity', 'shield', 'digital', 'protection', 'network'] },
    { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Green encrypted data streaming on a monitor', tags: ['encryption', 'data', 'matrix', 'streams', 'hacker', 'code'] },
    { url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Monitor displaying code in a development environment', tags: ['monitor', 'code', 'development', 'programming', 'screen'] },
    { url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Secure online payment with laptop and credit card', tags: ['payment', 'finance', 'banking', 'credit-card', 'ecommerce'] },
    { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Backlit mechanical keyboard close-up', tags: ['keyboard', 'shortcuts', 'typing', 'hardware', 'hotkeys'] },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Modern open office with shared workstations', tags: ['office', 'workspace', 'team', 'shared', 'business', 'enterprise'] },
    { url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Padlock on a laptop keyboard symbolizing security', tags: ['padlock', 'lock', 'password', 'laptop', 'physical-security'] },
    { url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Digital shield icon on a technology background', tags: ['shield', 'digital', 'protection', 'security', 'icon', 'firewall'] },
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Team collaborating on laptops in a tech workspace', tags: ['team', 'collaboration', 'enterprise', 'remote', 'colleagues'] },
    { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Code editor window on a developer screen', tags: ['code', 'editor', 'developer', 'terminal', 'ide'] },
    { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Abstract blue technology light background', tags: ['abstract', 'technology', 'future', 'ai', 'innovation', 'trends'] },
    { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Person working at a bright and tidy home office', tags: ['home-office', 'remote-work', 'work-from-home', 'productivity', 'privacy'] },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Data analytics dashboard on a screen', tags: ['analytics', 'dashboard', 'data', 'metrics', 'visualization', 'browser'] },
    { url: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Fingerprint scan biometric authentication', tags: ['fingerprint', 'biometrics', 'authentication', 'webauthn', 'fido2', 'identity'] },
    { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Coffee shop with laptop on public WiFi', tags: ['public-wifi', 'coffee-shop', 'cafe', 'laptop', 'travel', 'vpn'] },
    { url: 'https://images.unsplash.com/photo-1484981184820-2e84ea0af397?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Student studying with a laptop at a university library', tags: ['student', 'school', 'library', 'education', 'shared-computer'] },
    { url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Online banking on a smartphone with credit card', tags: ['banking', 'finance', 'mobile', 'credit-card', 'payment', 'transactions'] },
    { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Parent showing a child something on a laptop at home', tags: ['family', 'parental-controls', 'kids', 'children', 'home', 'parenting'] },
    { url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Password manager app on a smartphone', tags: ['password', 'password-manager', 'authentication', 'credentials', 'login'] },
]

// Pool of inline images for article content
const INLINE_IMAGE_POOL = [
    '![A padlock resting on a laptop keyboard](https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Digital shield protecting data](https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Streams of encrypted code on a dark screen](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Developer working at a laptop](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Team working on laptops in a modern office](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Close-up of hands typing on a keyboard](https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Smartphone and laptop on a desk](https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Person working at a computer in a bright office](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Data analytics dashboard on a screen](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format&q=80)',
    '![Abstract technology with blue light](https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=450&fit=crop&auto=format&q=80)',
]

/** Collect all .ts files in lib/posts/ (excluding index.ts) */
function getPostFiles() {
    return readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.ts') && f !== 'index.ts')
        .map(f => join(POSTS_DIR, f))
}

function getExistingSlugs() {
    const slugs = new Set()
    for (const file of getPostFiles()) {
        const content = readFileSync(file, 'utf-8')
        for (const m of content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)) {
            slugs.add(m[1])
        }
    }
    return slugs
}

function getRecentlyUsedImages(limit = 5) {
    // Collect image URLs from all post files (in directory listing order).
    // The last `limit` entries across all files are treated as "recently used"
    // to avoid repeating the same cover image on consecutive posts.
    const files = getPostFiles()
    const allImages = []
    for (const file of files) {
        const content = readFileSync(file, 'utf-8')
        for (const m of content.matchAll(/image:\s*['"]([^'"]+)['"]/g)) {
            allImages.push(m[1])
        }
    }
    // The last `limit` images across all files are considered "recent"
    return new Set(allImages.slice(-limit))
}

/**
 * Score a pool image by how many of its tags appear in the AI-provided keyword string.
 * Higher = more relevant.
 */
function scoreImageByKeywords(img, keywordString) {
    if (!keywordString || !img.tags) return 0
    const lower = keywordString.toLowerCase()
    return img.tags.reduce((score, tag) => score + (lower.includes(tag.toLowerCase()) ? 1 : 0), 0)
}

/**
 * Fetch a content-related cover image.
 *
 * Priority:
 *  1. Unsplash API (random photo matching AI-suggested keywords) — requires UNSPLASH_ACCESS_KEY env var
 *  2. Keyword-scored fallback from COVER_IMAGE_POOL — free, no key needed
 *
 * In both cases recently-used images are avoided.
 */
async function getContentRelatedCoverImage(imageKeywords) {
    const recentlyUsed = getRecentlyUsedImages(5)
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY

    // ── Tier 1: Unsplash API ────────────────────────────────────────────────
    if (unsplashKey && imageKeywords) {
        try {
            const query = encodeURIComponent(imageKeywords)
            const apiUrl = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&content_filter=high`
            const res = await fetchWithTimeout(apiUrl, {
                headers: { Authorization: `Client-ID ${unsplashKey}` }
            }, 10000)
            if (res.ok) {
                const photo = await res.json()
                const url = `${photo.urls.raw}&w=1200&h=630&fit=crop&auto=format&q=80`
                // Unsplash attribution: log photographer info
                const photographer = photo.user?.name || 'Unknown'
                console.log(`📸 Unsplash image by ${photographer} (${photo.id}): ${imageKeywords}`)
                return {
                    url,
                    alt: photo.alt_description || photo.description || imageKeywords
                }
            } else {
                console.warn(`⚠️  Unsplash API returned ${res.status} — falling back to local pool`)
            }
        } catch (err) {
            console.warn(`⚠️  Unsplash API error: ${err.message} — falling back to local pool`)
        }
    }

    // ── Tier 2: Keyword-scored local pool ───────────────────────────────────
    const availableImages = COVER_IMAGE_POOL.filter(img => !recentlyUsed.has(img.url))
    const pool = availableImages.length > 0 ? availableImages : COVER_IMAGE_POOL

    if (imageKeywords) {
        // Sort by relevance score, then pick randomly among top scorers (score > 0)
        const scored = pool
            .map(img => ({ img, score: scoreImageByKeywords(img, imageKeywords) }))
            .sort((a, b) => b.score - a.score)

        const topScore = scored[0].score
        const topImages = topScore > 0
            ? scored.filter(s => s.score === topScore).map(s => s.img)
            : pool // no keyword match — just use the whole pool

        const chosen = topImages[Math.floor(Math.random() * topImages.length)]
        console.log(`🖼️  Pool image selected by keyword match (score ${topScore}): ${chosen.alt}`)
        return chosen
    }

    // Final fallback: fully random from non-recently-used pool
    return pool[Math.floor(Math.random() * pool.length)]
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

/**
 * Walk through a JSON string character-by-character and escape any double-quote
 * characters that appear inside string values but are NOT already escaped.
 *
 * Heuristic: a '"' inside a string ends the string only if the next non-whitespace
 * character is one of ',' '}' ']' or ':' (JSON structural chars).
 * Any other following character means the '"' is embedded text — escape it.
 */
function fixUnescapedQuotes(str) {
    let result = ''
    let inString = false
    let i = 0
    while (i < str.length) {
        const char = str[i]
        if (!inString) {
            if (char === '"') inString = true
            result += char
            i++
        } else {
            if (char === '\\') {
                // Already-escaped sequence — copy both chars verbatim
                result += char
                i++
                if (i < str.length) { result += str[i]; i++ }
            } else if (char === '"') {
                // Peek at the next non-whitespace character
                let j = i + 1
                while (j < str.length && /[\t \r\n]/.test(str[j])) j++
                const next = j < str.length ? str[j] : ''
                if (next === ',' || next === '}' || next === ']' || next === ':' || next === '') {
                    // Structural — this quote ends the string
                    inString = false
                    result += char
                } else {
                    // Embedded unescaped quote — escape it
                    result += '\\"'
                }
                i++
            } else if (char === '\n' || char === '\r') {
                // Literal newlines are invalid inside JSON strings
                result += '\\n'
                i++
            } else {
                result += char
                i++
            }
        }
    }
    return result
}

/**
 * Attempt to repair common JSON formatting issues from Gemini responses.
 */
function repairJSON(jsonStr) {
    let repaired = jsonStr

    // Fix: Strip markdown code fences Gemini sometimes wraps output in
    repaired = repaired.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '')

    // Fix: Replace smart / curly quotes with straight ASCII quotes
    repaired = repaired
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'")

    // Fix: Remove trailing commas before ] or }
    repaired = repaired.replace(/,(\s*[}\]])/g, '$1')

    // Fix: Remove stray control characters (keep tab/newline — handled by fixUnescapedQuotes)
    repaired = repaired.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '')

    // Fix: Escape unescaped double-quotes inside string values via state machine
    repaired = fixUnescapedQuotes(repaired)

    return repaired
}

/**
 * Multi-stage JSON parsing with truncation recovery.
 * Tries progressively more aggressive repairs before giving up.
 */
function parseTopicsJSON(jsonStr) {
    // Stage 1: raw parse (ideal case — no repairs needed)
    try { return JSON.parse(jsonStr) } catch (_) {}

    // Stage 2: apply full repairs
    const repaired = repairJSON(jsonStr)
    try { return JSON.parse(repaired) } catch (_) {}

    // Stage 3: try to close a truncated array (Gemini hit token limit mid-output)
    const truncationSuffixes = [']}', '"}]}', '"]}', ']']
    for (const suffix of truncationSuffixes) {
        try { return JSON.parse(repairJSON(jsonStr + suffix)) } catch (_) {}
    }

    // Stage 4: extract any individually well-formed objects via balanced-brace scan
    const recovered = []
    let depth = 0, start = -1
    for (let i = 0; i < jsonStr.length; i++) {
        const c = jsonStr[i]
        if (c === '{') { if (depth === 0) start = i; depth++ }
        else if (c === '}') {
            depth--
            if (depth === 0 && start !== -1) {
                try {
                    const obj = JSON.parse(repairJSON(jsonStr.slice(start, i + 1)))
                    if (obj && obj.title) recovered.push(obj)
                } catch (_) {}
                start = -1
            }
        }
    }
    if (recovered.length > 0) return recovered

    return null
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0]
}

function calculateReadTime(wordCount) {
    const minutes = Math.ceil(wordCount / 200)
    return `${minutes} min read`
}

/**
 * Fetch with timeout support
 * Prevents hanging requests when API is slow
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        })
        clearTimeout(timeoutId)
        return response
    } catch (error) {
        clearTimeout(timeoutId)
        if (error.name === 'AbortError') {
            throw new Error(`API request timeout after ${timeoutMs}ms`)
        }
        throw error
    }
}

/**
 * Retry a function with exponential backoff + jitter
 * Useful for handling temporary API failures (503, rate limits, etc.)
 * 
 * Strategy:
 * - Up to 6 attempts (vs 3) to handle sustained API load
 * - Longer initial delays (5s) for Gemini's high-demand scenarios
 * - Added jitter (±20%) to prevent thundering herd
 * - Fetch timeouts to prevent hanging requests
 */
async function retryWithBackoff(fn, maxRetries = 6, initialDelayMs = 5000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            if (attempt === maxRetries) {
                throw error // Final attempt failed, throw the error
            }

            // Check if error is retryable (503, 429, network errors)
            const isRetryable = error.message.includes('503') || 
                               error.message.includes('429') || 
                               error.message.includes('timeout') ||
                               error.message.includes('ECONNRESET') ||
                               error.message.includes('ETIMEDOUT')

            if (!isRetryable) {
                throw error // Not a retryable error, fail immediately
            }

            // Calculate backoff with exponential increase: 5s, 10s, 20s, 40s, 80s
            // Plus jitter (±20%) to avoid thundering herd
            const baseDelayMs = initialDelayMs * Math.pow(2, attempt - 1)
            const jitterFraction = (Math.random() - 0.5) * 0.4 // ±20% jitter
            const delayMs = Math.max(1000, baseDelayMs * (1 + jitterFraction))
            
            console.log(`⏳ Attempt ${attempt}/${maxRetries} failed. Retrying in ${Math.round(delayMs)}ms...`)
            await new Promise(resolve => setTimeout(resolve, delayMs))
        }
    }
}

/**
 * Generate new Locksy-focused blog topics via Gemini API
 * Used when the topic pool runs low (<5 available topics)
 */
async function generateTopicsAI(count = 20) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        console.error('GEMINI_API_KEY environment variable is required for AI topic generation')
        return []
    }

    const prompt = `You are a content strategist for "Locksy", a browser extension that password-protects and organizes browser tabs.

Generate ${count} unique, actionable blog topic ideas for a technical blog about browser security, privacy, and productivity.

CRITICAL — ADSENSE COMPLIANCE:
- Each topic MUST be genuinely unique — NOT a variation/angle of another topic
- NO "beginners guide to X", "common mistakes in X", "FAQ about X" versions of the same subject
- Each topic should cover a DIFFERENT subject area, problem, or technology
- Topics must have enough depth for a 2500-4000 word article with real technical substance
- Every topic should be able to stand alone as a valuable resource

Each topic should:
1. Be relevant to browser security, privacy, tab protection, or productivity
2. Have action-oriented, specific titles (NOT generic)
3. Cover genuinely different angles: tutorials, comparisons, technical deep-dives, use cases, best practices
4. NOT overlap with these existing topics: remote work security, PBKDF2 encryption, public WiFi, tab management, incognito mode, browser history, social engineering, GDPR, zero-trust, auto-lock

Examples of good topics:
- "How Cross-Site Scripting (XSS) Puts Your Open Tabs at Risk"
- "Building a Browser Security Audit Checklist for IT Teams"
- "The Hidden Dangers of Browser Sync: When Convenience Becomes a Vulnerability"
- "How to Secure Shared Login Sessions Without Logging Out"

⚠️  CRITICAL JSON FORMATTING RULES:
- Return ONLY a valid JSON array with NO markdown code blocks, NO explanations, NO other text
- Escape all double quotes in strings using backslash: \\"
- Escape all backslashes: use \\\\ for a single backslash
- Do NOT include any text before or after the JSON array
- Validate: each object must have title, category, keywords array, tags array
- Categories must be EXACTLY one of: Tutorial, Security, Technical, Productivity, Comparison, Research

VALID JSON STRUCTURE (follow exactly):
[
    {
        "title": "Title with escaped \\"quotes\\" if needed",
        "category": "Tutorial",
        "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
        "tags": ["tag1", "tag2", "tag3"]
    }
]

Now generate ${count} unique blog topics in valid JSON format only:`

    try {
        const data = await retryWithBackoff(async () => {
            const response = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7, // Lower temp for more consistent JSON
                        maxOutputTokens: 8192
                    }
                })
            }, 60000)

            if (!response.ok) {
                const errorBody = await response.text()
                throw new Error(`Gemini API error: ${response.status} - ${errorBody}`)
            }

            return await response.json()
        }, 6, 5000)

        const raw = data.candidates[0].content.parts[0].text

        // Extract JSON array from response (Gemini might include markdown code blocks)
        const jsonMatch = raw.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
            console.warn('⚠️  Could not parse JSON from Gemini response — skipping AI topic generation')
            return []
        }

        const topics = parseTopicsJSON(jsonMatch[0])

        if (!topics || !Array.isArray(topics)) {
            console.warn('⚠️  Could not recover valid JSON from Gemini topic response — skipping AI topic generation')
            console.warn(`⚠️  Response preview: ${jsonMatch[0].substring(0, 300)}...`)
            return []
        }

        // Validate each topic has required fields
        const validTopics = topics.filter(t => {
            const hasRequired = t.title && t.category && Array.isArray(t.keywords) && Array.isArray(t.tags)
            if (!hasRequired) {
                console.warn(`⚠️  Skipping topic with missing required fields: ${t.title || 'untitled'}`)
            }
            return hasRequired
        })

        console.log(`🤖 Generated ${validTopics.length} new AI topics (${topics.length - validTopics.length} rejected as invalid)`)
        return validTopics
    } catch (error) {
        console.warn(`⚠️  AI topic generation failed: ${error.message} — skipping`)
        return []
    }
}

// IMPORTANT: NO MORE VARIATIONS.
// Previously each topic spawned 10 near-duplicate "variations" (beginners-guide,
// common-mistakes, FAQ, etc.) which Google flagged as mass-produced thin content.
// Now each topic produces exactly ONE unique, high-quality article.
//
// Minimum quality gate: articles under 1800 words are rejected.

async function generateBlogContent(topic) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        console.error('GEMINI_API_KEY environment variable is required')
        process.exit(1)
    }

    // Select 2-3 random inline images for this article
    const shuffledImages = shuffleArray([...INLINE_IMAGE_POOL])
    const selectedImages = shuffledImages.slice(0, 3)

    const prompt = `You are a seasoned tech blogger who writes for Medium, who has deep expertise in browser security, privacy, and productivity. Your readers trust you because you write with authentic personality, real opinions, and genuine experience. You absolutely NEVER sound like an AI or corporate marketing.

CRITICAL — GOOGLE ADSENSE COMPLIANCE:
This article MUST pass Google AdSense's "high value content" review. That means:
- Every paragraph must provide GENUINE, UNIQUE value that a reader cannot easily find elsewhere
- NO filler paragraphs, NO generic advice, NO padding. Every sentence must earn its place
- Include SPECIFIC data, statistics, technical details, or actionable steps — not vague generalities
- The article must stand on its own as a useful resource even without mentioning Locksy
- Do NOT repeat the same point in different words. Say it once, say it well, move on
- Include at least ONE original insight, framework, or recommendation that demonstrates expertise

Your sole job: Write a compelling, human-sounding long-form essay about "${topic.title}"

AUTHENTICITY & VOICE — THIS IS THE MOST CRITICAL PART:
Your writing should feel like a trusted friend sharing hard-won knowledge over coffee. People should forget they're reading content generated by AI. You have a distinct personality:
- Share genuine frustrations with existing solutions
- Use vivid, specific examples and anecdotes (not generic scenarios)
- Write with strong, unapologetic opinions. Don't hedge. Say what works and what doesn't.
- Show your reasoning. Explain WHY you believe something, not just WHAT you believe
- Use conversational language: contractions (don't, won't, it's), casual phrases, natural speech patterns
- React authentically to ideas. Use phrases like "Here's the thing...", "I've learned...", "The reality is..."
- Include personal anecdotes or specific real-world examples you've encountered
- Challenge assumptions. Question conventional wisdom. Don't accept things at face value
- Be willing to admit limitations or nuance. Real experts know that not everything is black-and-white

STRUCTURE & STORYTELLING:
- HOOK: Start with a specific story, scenario, or observation that makes readers think "Yes! This is what I've been experiencing!"
  Examples: "I discovered this the hard way when..." or "Last week, a friend asked me..." or "Here's what nobody talks about..."
- FLOW: Use natural transitions that feel like thinking out loud, not templated articles
  Avoid: "In this article, we'll explore..." Instead: "Here's what I've learned..." or "So let me break this down..."
- DEPTH: Go deeper than surface-level. Show nuance, complexity, trade-offs
- REAL EXAMPLES: Use specific, concrete examples. Name actual tools, scenarios, mistakes you've seen
- CONCLUSION: End with something memorable or actionable — a genuine insight or recommendation

AI DETECTION RED FLAGS TO ABSOLUTELY AVOID:
❌ "In today's digital landscape / world / age..."
❌ "It's important to note that..."
❌ "To summarize / In conclusion / Finally..."
❌ "This article will explore / discuss / cover..."
❌ "Let's dive into..." or "Let's take a look at..."
❌ "Embracing X" or "Leveraging Y" or "Harnessing Z"
❌ "It goes without saying..." or "At the end of the day..."
❌ "Furthermore / Moreover / Additionally" (use "Also" or rewrite naturally)
❌ Lists with semicolons: "First; second; third" — write in prose instead
❌ Exactly three numbered points (classic AI pattern — vary your structure)
❌ Generic motivational phrases like "The key is..." or "The bottom line is..."
❌ Perfect bullet points with perfect grammar and symmetry
❌ Bland transitions between paragraphs

PERSONALITY REQUIREMENTS:
- Use varied sentence length: Mix short. Punchy. Sentences. With longer, flowing ones that take their time.
- Use parenthetical asides naturally (like this) — it's how humans think and talk
- Use contractions constantly: don't, won't, can't, it's, that's, you're
- Use first-person extensively: "I've found...", "I realized...", "What I've learned..."
- Use second-person to engage: "You probably already know...", "Here's where things get interesting for you..."
- Show emotion: frustration, excitement, skepticism. Real humans have feelings about ideas.
- Use humor, sarcasm, or wit naturally (not forced). If a joke lands, great. If not, skip it.
- Vary your tone. Be serious when discussing security risks, lighter when talking about workflows

CONTENT DEPTH & SPECIFICITY:
- Reference specific tools, technologies, or techniques by name
- Use concrete numbers, percentages, timeframes when relevant
- Explain the 'why' behind recommendations, not just the 'what'
- Acknowledge counterarguments or different perspectives
- Share lessons learned from real experience
- Show your expertise through specific technical knowledge, not just cheerleading

BRAND VOICE (Locksy):
- Mention Locksy naturally and sparingly (2-3 times max) as a real example you use, not as product placement
- If Locksy solves the problem you're discussing, mention it like "I use Locksy for this because..."
- Never pitch. Never sell. Just mention it as one tool in a broader conversation
- For feature-focused topics, lead with the underlying problem/technology, mention Locksy as an example of how it's implemented well

ARTICLE STRUCTURE:
- 2500-4000 words of genuine insight, not filler
- Start with a hook/story (not a definition)
- Use ## for descriptive section headings (e.g., "The browser tab chaos I see every day" NOT "Overview")
- Write substantial paragraphs (150-300 words each)
- Use images at natural breaks: after a major section or between paragraphs
- End with a genuine conclusion or insight (not a summary)

TOPIC:
Topic: "${topic.title}"
Category: ${topic.category}
Keywords to weave naturally: ${topic.keywords.join(', ')}

INLINE IMAGES:
Include these 2-3 images naturally throughout the article (at section breaks or between paragraphs). Use EXACTLY these markdown syntaxes verbatim:

${selectedImages.join('\n')}

Make sure they fit the flow and add visual breathing room to the text.

OUTPUT FORMAT — FOLLOW EXACTLY:
First, output these two lines (no quotes, no extra text on each line):
META_DESC: {a compelling 140-155 character meta description that reads like something a human expert would write, includes primary keyword, and makes readers want to click}
IMAGE_KEYWORDS: {3-5 specific visual search terms that capture this article's essence — e.g. "frustrated developer staring at laptop screen" or "hands typing keyboard late night"}

Then output a blank line, then the article body starting with the first ## heading.

Do NOT include an H1 — the article title is handled separately.`

    const data = await retryWithBackoff(async () => {
        const response = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ],
                generationConfig: {
                    temperature: 0.85,
                    maxOutputTokens: 8192
                }
            })
        }, 60000)

        if (!response.ok) {
            const errorBody = await response.text()
            throw new Error(`Gemini API error: ${response.status} - ${errorBody}`)
        }

        return await response.json()
    }, 6, 5000)

    const raw = data.candidates[0].content.parts[0].text

    // Parse the META_DESC line that the prompt asks Gemini to output first
    const metaDescMatch = raw.match(/^META_DESC:\s*(.+)/m)
    const metaDescription = metaDescMatch
        ? metaDescMatch[1].trim().slice(0, 158) // hard cap at 158 chars
        : null

    const imageKeywordsMatch = raw.match(/^IMAGE_KEYWORDS:\s*(.+)/m)
    const imageKeywords = imageKeywordsMatch
        ? imageKeywordsMatch[1].trim()
        : null

    // Strip the META_DESC and IMAGE_KEYWORDS lines from article body
    const articleBody = raw
        .replace(/^META_DESC:.*\n?/m, '')
        .replace(/^IMAGE_KEYWORDS:.*\n?/m, '')
        .replace(/^\n/, '') // remove leading blank line left behind
        .trim()

    return { articleBody, metaDescription, imageKeywords }
}

/**
 * Create a new individual post file at lib/posts/[slug].ts
 */
function createPostFile(post, coverImage) {
    // Strictly sanitize the slug: only lowercase alphanumeric and hyphens allowed.
    // This prevents path traversal regardless of where the slug originated.
    const safeSlug = post.slug.replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '')
    if (!safeSlug) throw new Error(`Invalid slug after sanitization: "${post.slug}"`)

    // Verify the resolved path stays within POSTS_DIR (belt-and-suspenders)
    const resolvedPath = join(POSTS_DIR, `${safeSlug}.ts`)
    if (!resolvedPath.startsWith(POSTS_DIR + (process.platform === 'win32' ? '\\' : '/'))) {
        throw new Error(`Path traversal attempt detected for slug: "${post.slug}"`)
    }

    // Use the safe slug for everything from this point on
    post = { ...post, slug: safeSlug }

    // Helper: escape a string for use inside single-quoted JS literals
    const escSQ = (str) => str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

    // Escape backticks and ${} in content for template literal safety
    const escapedContent = post.content
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${')

    const fileContent = `// lib/posts/${post.slug}.ts
// Auto-generated by scripts/generate-blog.mjs on ${post.publishDate}
// DO NOT EDIT MANUALLY — regenerate via the blog generator script.

const post = {
    slug: '${escSQ(post.slug)}',
    title: '${escSQ(post.title)}',
    description: '${escSQ(post.description)}',
    author: 'Locksy Security Team',
    publishDate: '${post.publishDate}',
    lastModified: '${post.lastModified}',
    readTime: '${post.readTime}',
    category: '${escSQ(post.category)}',
    tags: [${post.tags.map(t => `'${escSQ(t)}'`).join(', ')}],
    keywords: [${post.keywords.map(k => `'${escSQ(k)}'`).join(', ')}],
    image: '${escSQ(coverImage.url)}',
    imageAlt: '${escSQ(coverImage.alt)}',
    content: \`
${escapedContent}
\`
}

export default post
`

    const filePath = join(POSTS_DIR, `${safeSlug}.ts`)
    writeFileSync(filePath, fileContent, 'utf-8')
    return filePath
}

/**
 * Regenerate lib/posts/index.ts by scanning all individual post files.
 * legacy.ts is always included first; individual posts are sorted by filename.
 */
function regenerateIndex() {
    const individualFiles = readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'legacy.ts')
        .sort()

    // Strictly sanitize variable names: only a-z, 0-9, and underscores.
    // Filenames should already be safe slugs, but we guard against any manually
    // added files with unexpected characters that could inject code.
    const toVarName = (f) => {
        const raw = basename(f, '.ts').replace(/-/g, '_')
        const safe = raw.replace(/[^a-zA-Z0-9_]/g, '')
        if (!safe) throw new Error(`Cannot derive a safe variable name from filename: "${f}"`)
        // Ensure it doesn't start with a digit (invalid JS identifier)
        return /^[0-9]/.test(safe) ? `post_${safe}` : safe
    }

    const importLines = individualFiles
        .map(f => {
            const name = toVarName(f)
            return `import post_${name} from './${basename(f, '.ts')}'`
        })
        .join('\n')

    const entryLines = individualFiles
        .map(f => `    post_${toVarName(f)},`)
        .join('\n')

    const indexContent = `// lib/posts/index.ts
//
// AUTO-GENERATED by scripts/generate-blog.mjs — DO NOT EDIT MANUALLY.
// Each new post gets its own file in this directory. Run the generator to add posts.

import legacyPosts from './legacy'
${importLines ? `
// Individual post imports\n${importLines}` : ''}

export const allPosts = [
    ...legacyPosts,
${entryLines ? entryLines + '\n' : ''}]
`

    writeFileSync(INDEX_PATH, indexContent, 'utf-8')
}

// Minimum word count to pass quality gate.
// Articles below this are rejected (Google considers them thin content).
const MIN_WORD_COUNT = 1800

async function main() {
    console.log('🚀 Locksy Auto Blog Generator (AdSense-Safe Edition)')
    console.log('=====================================================\n')

    // Get existing slugs to avoid duplicates
    const existingSlugs = getExistingSlugs()
    console.log(`📝 Found ${existingSlugs.size} existing blog posts\n`)

    // Each topic in TOPIC_POOL produces ONE post (no more variations).
    // The slug is derived directly from the title.
    const availableTopics = TOPIC_POOL
        .map(topic => ({ ...topic, slug: slugify(topic.title) }))
        .filter(topic => !existingSlugs.has(topic.slug))

    console.log(`📚 ${TOPIC_POOL.length} topics in pool, ${availableTopics.length} not yet written\n`)

    let selectedTopic = null
    const lowTopicThreshold = 5

    if (availableTopics.length < lowTopicThreshold) {
        console.log(`⚠️  Low on available topics (${availableTopics.length} < ${lowTopicThreshold})`)
        console.log(`🤖 Generating new Locksy-focused topics via AI...\n`)

        const aiTopics = await generateTopicsAI(20)

        if (aiTopics.length > 0) {
            const aiAvailable = aiTopics
                .map(t => ({ ...t, slug: slugify(t.title) }))
                .filter(t => !existingSlugs.has(t.slug))

            console.log(`✨ ${aiAvailable.length} new unique AI topics available\n`)

            const allAvailable = [...availableTopics, ...aiAvailable]

            if (allAvailable.length === 0) {
                console.log('✅ All topics have been written! System is in steady state.')
                return { success: true, message: 'All topics written' }
            }

            selectedTopic = allAvailable[Math.floor(Math.random() * allAvailable.length)]
        } else {
            if (availableTopics.length === 0) {
                console.log('✅ All topics in the pool have been written! Add more topics to TOPIC_POOL or check Gemini API.')
                return { success: true, message: 'All topics written' }
            }
            selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)]
        }
    } else {
        selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)]
    }

    const slug = selectedTopic.slug

    console.log(`📖 Generating: "${selectedTopic.title}"`)
    console.log(`🏷️  Category: ${selectedTopic.category}`)
    console.log(`🔑 Keywords: ${selectedTopic.keywords.join(', ')}\n`)

    try {
        // Generate the blog content using AI
        const { articleBody, metaDescription, imageKeywords } = await generateBlogContent(selectedTopic)
        const wordCount = articleBody.split(/\s+/).length
        const readTime = calculateReadTime(wordCount)
        const today = getTodayDate()

        console.log(`✍️  Generated ${wordCount} words (${readTime})`)
        if (metaDescription) console.log(`📝 Meta description: ${metaDescription}`)
        if (imageKeywords) console.log(`🔍 Image keywords: ${imageKeywords}`)

        // Quality gate: reject thin content
        if (wordCount < MIN_WORD_COUNT) {
            console.error(`\n❌ QUALITY GATE FAILED: Article is only ${wordCount} words (minimum: ${MIN_WORD_COUNT}).`)
            console.error(`   This article would be flagged as thin content by AdSense. Skipping.`)
            return { success: false, error: `Article too short: ${wordCount} words` }
        }

        // Fallback description if Gemini didn't output a META_DESC line
        const fallbackDescription = `${selectedTopic.keywords[0].charAt(0).toUpperCase() + selectedTopic.keywords[0].slice(1)}: ${selectedTopic.title.toLowerCase()}. Practical insights on ${selectedTopic.keywords.slice(1, 3).join(' and ')}.`

        // Create the blog post object
        const post = {
            slug,
            title: selectedTopic.title,
            description: metaDescription || fallbackDescription,
            publishDate: today,
            lastModified: today,
            readTime,
            category: selectedTopic.category,
            tags: selectedTopic.tags,
            keywords: selectedTopic.keywords,
            content: articleBody
        }

        // Create individual post file and regenerate the index
        const coverImage = await getContentRelatedCoverImage(imageKeywords)
        const filePath = createPostFile(post, coverImage)
        regenerateIndex()
        console.log(`\n✅ Blog post created successfully!`)
        console.log(`📄 File: lib/posts/${slug}.ts`)
        console.log(`📄 Slug: ${slug}`)
        console.log(`📅 Date: ${today}`)
        console.log(`🔗 URL: https://www.locksy.dev/blog/${slug}`)

        return { success: true, message: 'Blog post generated successfully' }
    } catch (error) {
        console.error(`\n❌ Error generating blog post:`, error.message)
        return { success: false, error: error.message }
    }
}

// Run the generator
main().then(result => {
    if (!result.success) {
        process.exit(1)
    }
}).catch(error => {
    console.error('Unhandled error:', error)
    process.exit(1)
})

