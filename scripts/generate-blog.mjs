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
 * Triggered daily via GitHub Actions cron job.
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
]

// Pool of high-quality Unsplash images for blog cover photos
const COVER_IMAGE_POOL = [
    { url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Developer coding on a laptop with security focus' },
    { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Cybersecurity concept with digital shield and lock' },
    { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Green encrypted data streaming on a monitor' },
    { url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Monitor displaying code in a development environment' },
    { url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Secure online payment with laptop and credit card' },
    { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Backlit mechanical keyboard close-up' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Modern open office with shared workstations' },
    { url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Padlock on a laptop keyboard symbolizing security' },
    { url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Digital shield icon on a technology background' },
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Team collaborating on laptops in a tech workspace' },
    { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Code editor window on a developer screen' },
    { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=630&fit=crop&auto=format&q=80', alt: 'Abstract blue technology light background' },
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
    // Read every post file and collect image URLs, ordered by file modification time
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

function getUnusedCoverImage() {
    const recentlyUsed = getRecentlyUsedImages(5)
    const availableImages = COVER_IMAGE_POOL.filter(img => !recentlyUsed.has(img.url))
    
    // If all images have been used recently, use the full pool
    const imagePool = availableImages.length > 0 ? availableImages : COVER_IMAGE_POOL
    
    return imagePool[Math.floor(Math.random() * imagePool.length)]
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

async function generateBlogContent(topic) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        console.error('GEMINI_API_KEY environment variable is required')
        process.exit(1)
    }

    // Select 2-3 random inline images for this article
    const shuffledImages = shuffleArray([...INLINE_IMAGE_POOL])
    const selectedImages = shuffledImages.slice(0, 3)

    const prompt = `You are a human writer who publishes long-form articles on Medium.com about browser security, digital privacy, and technology. You write in a conversational, opinionated, first-person style that feels like a smart friend explaining something over coffee — NOT like an AI or a corporate blog.

Write an article for a browser extension called "Locksy" that password-protects browser tabs.

Topic: "${topic.title}"
Category: ${topic.category}
Target Keywords (weave naturally, never force): ${topic.keywords.join(', ')}

INLINE IMAGES — CRITICAL REQUIREMENT:
You MUST include 2-3 inline images throughout the article at strategic points (after major sections or between long paragraphs). Use EXACTLY these markdown image syntaxes (copy them verbatim, don't modify):

${selectedImages.join('\n')}

Place these images naturally in the flow of the article where they make sense visually. Spread them out - don't put them all together. Each image should appear after a major section or between substantial paragraphs to break up text and enhance readability.

STYLE REQUIREMENTS — THIS IS THE MOST IMPORTANT PART:
- Write like a HUMAN. Use "I", "you", "we". Share opinions. Be direct.
- Open with a STORY, SCENARIO, or PROVOCATIVE OBSERVATION — never a definition or "In today's digital world..."
- NO listicle-style numbered headings like "1. Do This" "2. Do That". Use descriptive, interesting ## headings instead.
- NO bullet-point walls. Use paragraphs as your primary format. Bullets only when genuinely listing items.
- Use rhetorical questions, humor, analogies, and real-world scenarios
- Be opinionated — say what's good and what's bad, don't hedge everything
- Vary sentence length. Mix short punchy sentences with longer flowing ones.
- NO generic filler phrases: "In today's digital landscape", "It's important to note", "comprehensive guide", "In this article we will", "Let's dive in"
- NO emoji in body text
- Sound like you've personally used these tools and have strong opinions about them
- The reader should forget they're reading a "blog post" and feel like they're reading a well-written essay
- Mention Locksy naturally where relevant — as something you'd genuinely recommend, not as a sales pitch. Keep it to 2-3 natural mentions max.
- CRITICAL FOR FEATURE TOPICS: If the topic is about a specific security feature (biometrics, auto-lock, domain rules, etc.), lead with the WHY and the underlying technology/problem. Explain it like a security journalist who happens to use these tools — not like someone demoing their own product. Locksy should appear as a real-world example you reached for, not as the subject of the article.

STRUCTURE:
- 2500-4000 words
- Use ## for section headings (descriptive/interesting, not numbered)
- Use ### sparingly for subsections
- Use **bold** for key terms and emphasis
- Use code formatting for URLs, file paths, or technical terms
- Include the inline images at strategic points throughout (REMEMBER THIS!)
- End with a brief, punchy conclusion — no "In conclusion" opener
- Add a --- divider and a short italic CTA line at the very end

Write ONLY the markdown content, starting with the first ## heading. The article title is handled separately — do not include an H1.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
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
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Gemini API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
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
    console.log('🚀 Locksy Auto Blog Generator')
    console.log('============================\n')

    // Get existing slugs to avoid duplicates
    const existingSlugs = getExistingSlugs()
    console.log(`📝 Found ${existingSlugs.size} existing blog posts\n`)

    // Pick a topic that hasn't been written yet
    const availableTopics = TOPIC_POOL.filter(topic => {
        const slug = slugify(topic.title)
        return !existingSlugs.has(slug)
    })

    if (availableTopics.length === 0) {
        console.log('✅ All topics in the pool have been written! Add more topics to TOPIC_POOL.')
        process.exit(0)
    }

    // Pick a random topic from available ones
    const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)]
    const slug = slugify(topic.title)

    console.log(`📖 Generating: "${topic.title}"`)
    console.log(`🏷️  Category: ${topic.category}`)
    console.log(`🔑 Keywords: ${topic.keywords.join(', ')}\n`)

    try {
        // Generate the blog content using AI
        const content = await generateBlogContent(topic)
        const wordCount = content.split(/\s+/).length
        const readTime = calculateReadTime(wordCount)
        const today = getTodayDate()

        console.log(`✍️  Generated ${wordCount} words (${readTime})`)

        // Create the blog post object
        const post = {
            slug,
            title: topic.title,
            description: `${topic.title}. Learn about ${topic.keywords.slice(0, 2).join(' and ')} with practical tips and expert advice.`,
            publishDate: today,
            lastModified: today,
            readTime,
            category: topic.category,
            tags: topic.tags,
            keywords: topic.keywords,
            content: content.trim()
        }

        // Create individual post file and regenerate the index
        const coverImage = getUnusedCoverImage()
        const filePath = createPostFile(post, coverImage)
        regenerateIndex()
        console.log(`\n✅ Blog post created successfully!`)
        console.log(`📄 File: lib/posts/${slug}.ts`)
        console.log(`📄 Slug: ${slug}`)
        console.log(`📅 Date: ${today}`)
        console.log(`🔗 URL: https://www.locksy.dev/blog/${slug}`)
    } catch (error) {
        console.error(`\n❌ Error generating blog post:`, error.message)
        process.exit(1)
    }
}

main()
