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

Generate ${count} unique, actionable blog topic ideas for a technical blog about browser security, privacy, and productivity. Each topic should:
1. Be relevant to Locksy's features: tab locking, password protection, auto-lock timers, domain-based rules, biometric unlock, etc.
2. Encourage users to adopt Locksy by positioning it as a solution to real problems
3. Have action-oriented, specific titles (NOT generic)
4. Cover different angles: tutorials, comparisons, technical deep-dives, use cases, best practices

Examples of good topics:
- "Why Incognito Mode Won't Protect Your Banking Tabs (But Locksy Will)"
- "How Locksy's Domain Rules Eliminate Tab Management Chaos"
- "Biometric Unlock for Tabs: The Future of Browser Security"
- "Why Shared Computer Users Need a Password-Protected Tab Locker"

Return ONLY a valid JSON array (no other text) with this structure:
[
    {
        "title": "Specific, actionable title about Locksy feature or problem it solves",
        "category": "Tutorial|Security|Technical|Productivity|Comparison|Research",
        "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
        "tags": ["tag1", "tag2", "tag3"]
    },
    ...
]

Ensure titles are unique and specific. Include Locksy or its benefits naturally in titles.`

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
                        temperature: 0.9,
                        maxOutputTokens: 4096
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

        const topics = JSON.parse(jsonMatch[0])
        console.log(`🤖 Generated ${topics.length} new AI topics`)
        return topics
    } catch (error) {
        console.warn(`⚠️  AI topic generation failed: ${error.message} — skipping`)
        return []
    }
}

/**
 * Generate topic variations with different angles
 * Each topic becomes 10 separate variations for different content angles
 * 
 * Angles: beginner, intermediate, advanced, mistakes, comparisons, how-to, benefits, pro-tips, use-cases, faq
 */
function generateVariations(topic) {
    const angles = [
        { suffix: 'beginners-guide', label: 'Beginner\'s Guide', instruction: 'Write this as an absolute beginner\'s guide for users new to Locksy. Use simple, non-technical language and explain basics thoroughly.' },
        { suffix: 'intermediate-tips', label: 'Intermediate Tips', instruction: 'Write this targeting users who are comfortable with Locksy. Include intermediate techniques and workflow optimizations.' },
        { suffix: 'advanced-techniques', label: 'Advanced Techniques', instruction: 'Write this for power users seeking advanced techniques, optimizations, and deep technical understanding.' },
        { suffix: 'common-mistakes', label: 'Common Mistakes', instruction: 'Focus on mistakes users make and pitfalls to avoid. Help readers learn from errors.' },
        { suffix: 'vs-alternatives', label: 'Comparisons', instruction: 'Write a comparison/competitive analysis that highlights why the Locksy approach (or Locksy itself) is superior. Be objective but emphasize advantages.' },
        { suffix: 'how-to-guide', label: 'How-To Guide', instruction: 'Write a step-by-step how-to guide with actionable instructions and clear procedures.' },
        { suffix: 'top-benefits', label: 'Top Benefits', instruction: 'Focus on benefits, advantages, and why this topic matters. Emphasize value proposition and real-world benefits.' },
        { suffix: 'pro-tips', label: 'Pro Tips & Tricks', instruction: 'Write insider tips, tricks, and expert-level insights. Include practical, immediately-useful advice.' },
        { suffix: 'real-world-cases', label: 'Real-World Use Cases', instruction: 'Use concrete real-world scenarios and practical examples. Tell stories about how this applies in actual use.' },
        { suffix: 'faq', label: 'FAQ', instruction: 'Write in a Q&A format addressing common questions, misconceptions, and frequent concerns about this topic. Use conversational tone.' }
    ]

    return angles.map(angle => ({
        ...topic,
        slug: `${slugify(topic.title)}-${angle.suffix}`,
        title: `${topic.title} - ${angle.label}`,
        angle: angle.label,
        variationAngle: angle.suffix,
        variationInstruction: angle.instruction,
        // Add variation-specific keywords
        keywords: [
            ...topic.keywords,
            angle.label.toLowerCase().replace(/[^\w\s]/g, '')
        ]
    }))
}

async function generateBlogContent(topic) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        console.error('GEMINI_API_KEY environment variable is required')
        process.exit(1)
    }

    // Select 2-3 random inline images for this article
    const shuffledImages = shuffleArray([...INLINE_IMAGE_POOL])
    const selectedImages = shuffledImages.slice(0, 3)

    // Build prompt with optional variation instruction
    const variationInstruction = topic.variationInstruction ? `\nCONTENT ANGLE:\n${topic.variationInstruction}\n` : ''

    const prompt = `You are a seasoned tech blogger who writes for Medium, who has deep expertise in browser security, privacy, and productivity. Your readers trust you because you write with authentic personality, real opinions, and genuine experience. You absolutely NEVER sound like an AI or corporate marketing.

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

TOPIC & VARIATION:
Topic: "${topic.title}"
Category: ${topic.category}
Keywords to weave naturally: ${topic.keywords.join(', ')}${variationInstruction}

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

async function main() {
    console.log('🚀 Locksy Auto Blog Generator (Infinite Topics Edition)')
    console.log('=====================================================\n')

    // Get existing slugs to avoid duplicates
    const existingSlugs = getExistingSlugs()
    console.log(`📝 Found ${existingSlugs.size} existing blog posts\n`)

    // Generate variations for all human-curated topics (10 angles each)
    let allVariations = []
    
    // First, add variations of human-curated topics
    for (const topic of TOPIC_POOL) {
        const variations = generateVariations(topic)
        allVariations.push(...variations)
    }
    
    console.log(`📚 Generated ${allVariations.length} topic variations from ${TOPIC_POOL.length} human topics`)

    // Filter out variations that have already been written
    const availableVariations = allVariations.filter(variation => 
        !existingSlugs.has(variation.slug)
    )

    console.log(`✨ ${availableVariations.length} variations available to write\n`)

    // If running low on topics, generate new Locksy-focused topics via AI
    let selectedVariation = null
    const lowTopicThreshold = 5

    if (availableVariations.length < lowTopicThreshold) {
        console.log(`⚠️  Low on available topics (${availableVariations.length} < ${lowTopicThreshold})`)
        console.log(`🤖 Generating new Locksy-focused topics via AI...\n`)

        const aiTopics = await generateTopicsAI(20)
        
        if (aiTopics.length > 0) {
            // Generate variations for AI-generated topics too
            for (const topic of aiTopics) {
                const variations = generateVariations(topic)
                allVariations.push(...variations)
            }
            
            console.log(`✨ Generated ${aiTopics.length * 10} variations from ${aiTopics.length} AI topics\n`)

            // Re-filter with expanded pool
            const allAvailable = allVariations.filter(variation => 
                !existingSlugs.has(variation.slug)
            )
            
            console.log(`🎯 Total available variations now: ${allAvailable.length}\n`)

            if (allAvailable.length === 0) {
                console.log('✅ All topics have been written! System is in steady state.')
                return { success: true, message: 'All topics written' }
            }

            selectedVariation = allAvailable[Math.floor(Math.random() * allAvailable.length)]
        } else {
            // AI generation failed, use existing available variations
            if (availableVariations.length === 0) {
                console.log('✅ All topics in the pool have been written! Add more topics to TOPIC_POOL or check Gemini API.')
                return { success: true, message: 'All topics written' }
            }
            
            selectedVariation = availableVariations[Math.floor(Math.random() * availableVariations.length)]
        }
    } else {
        // Plenty of topics available, pick one
        selectedVariation = availableVariations[Math.floor(Math.random() * availableVariations.length)]
    }

    const slug = selectedVariation.slug

    console.log(`📖 Generating: "${selectedVariation.title}"`)
    console.log(`💡 Angle: ${selectedVariation.angle || 'Standard'}`)
    console.log(`🏷️  Category: ${selectedVariation.category}`)
    console.log(`🔑 Keywords: ${selectedVariation.keywords.join(', ')}\n`)

    try {
        // Generate the blog content using AI
        const { articleBody, metaDescription, imageKeywords } = await generateBlogContent(selectedVariation)
        const wordCount = articleBody.split(/\s+/).length
        const readTime = calculateReadTime(wordCount)
        const today = getTodayDate()

        console.log(`✍️  Generated ${wordCount} words (${readTime})`)
        if (metaDescription) console.log(`📝 Meta description: ${metaDescription}`)
        if (imageKeywords) console.log(`🔍 Image keywords: ${imageKeywords}`)

        // Fallback description if Gemini didn't output a META_DESC line
        const fallbackDescription = `${selectedVariation.keywords[0].charAt(0).toUpperCase() + selectedVariation.keywords[0].slice(1)}: ${selectedVariation.title.toLowerCase()}. Practical insights on ${selectedVariation.keywords.slice(1, 3).join(' and ')}.`

        // Create the blog post object
        const post = {
            slug,
            title: selectedVariation.title,
            description: metaDescription || fallbackDescription,
            publishDate: today,
            lastModified: today,
            readTime,
            category: selectedVariation.category,
            tags: selectedVariation.tags,
            keywords: selectedVariation.keywords,
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
main()

