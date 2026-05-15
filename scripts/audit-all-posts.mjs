import { readdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'lib', 'posts')

// ── Validation Rules (Copied from generate-blog.mjs) ──────────────
const AI_FILLER_PATTERNS = [
    /in today'?s digital (landscape|world|age|era)/i,
    /it'?s important to note that/i,
    /this article will (explore|discuss|cover|examine)/i,
    /let'?s dive (in|into)/i,
    /let'?s take a (look|closer look)/i,
    /embracing \w+/i,
    /leveraging \w+/i,
    /harnessing \w+/i,
    /it goes without saying/i,
    /at the end of the day/i,
    /in conclusion,/i,
    /to summarize,/i,
    /the bottom line is/i,
    /without further ado/i,
    /buckle up/i,
    /game.?changer/i,
    /no.?brainer/i,
    /silver bullet/i,
    /paradigm shift/i,
    /navigate the complex/i,
    /ever.?evolving/i,
    /a world where/i,
    /in an era of/i,
]

const FALSE_LOCKSY_CLAIMS = [
    /locksy.*container/i,
    /locksy.*sandbox/i,
    /locksy.*vpn/i,
    /locksy.*encrypt.*traffic/i,
    /locksy.*firewall/i,
    /locksy.*malware/i,
    /locksy.*antivirus/i,
    /locksy.*isolat/i,
]

function auditContentQuality(articleBody) {
    const wordCount = articleBody.split(/\s+/).length
    const issues = []

    // 1. Word count bounds
    if (wordCount < 800) { // For existing posts, we're a bit more lenient than the 1800 gate for NEW posts, but under 800 is definitely thin
        issues.push(`Too short: ${wordCount} words (minimum 800 for existing)`)
    }

    // 2. Locksy mention count — max 2 for existing posts (being slightly lenient)
    const locksyMentions = (articleBody.match(/\blocksy\b/gi) || []).length
    if (locksyMentions > 2) {
        issues.push(`Locksy mentioned ${locksyMentions} times (maximum 2) — too promotional`)
    }

    // 3. AI filler phrases
    const foundFillers = []
    for (const pattern of AI_FILLER_PATTERNS) {
        if (pattern.test(articleBody)) {
            foundFillers.push(pattern.source)
        }
    }
    if (foundFillers.length > 0) {
        issues.push(`AI filler phrases detected: ${foundFillers.length}`)
    }

    // 4. False Locksy claims
    const falseClaims = []
    for (const pattern of FALSE_LOCKSY_CLAIMS) {
        if (pattern.test(articleBody)) {
            // Need to make sure it's not the "isolation" exception
            if (pattern.source.includes('isolat')) {
                const match = articleBody.match(pattern)[0]
                if (!/tab/i.test(match)) falseClaims.push(pattern.source)
            } else {
                falseClaims.push(pattern.source)
            }
        }
    }
    if (falseClaims.length > 0) {
        issues.push(`FALSE claims about Locksy: ${falseClaims.length}`)
    }

    // 5. Heading structure
    const headingCount = (articleBody.match(/^##\s/gm) || []).length
    if (headingCount < 2) {
        issues.push(`Only ${headingCount} sections (need at least 2 for depth)`)
    }

    // 6. Excessive exclamation marks
    const exclamationCount = (articleBody.match(/!/g) || []).length
    if (exclamationCount > 15) {
        issues.push(`${exclamationCount} exclamation marks (reads as overly enthusiastic AI)`)
    }

    return {
        pass: issues.length === 0,
        wordCount,
        issues
    }
}

console.log('🔍 Auditing all existing blog posts for AdSense compliance...\n')

let totalPosts = 0
let failedPosts = 0

// 1. Audit Individual Posts
const individualFiles = readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'legacy.ts')

console.log(`--- Individual Posts (${individualFiles.length}) ---`)
for (const file of individualFiles) {
    const content = readFileSync(join(POSTS_DIR, file), 'utf-8')
    const contentMatch = content.indexOf('content: `')
    if (contentMatch !== -1) {
        totalPosts++
        const bodyStart = contentMatch + 'content: `'.length
        const bodyEnd = content.lastIndexOf('`')
        const articleBody = content.slice(bodyStart, bodyEnd)
        const audit = auditContentQuality(articleBody)
        if (!audit.pass) {
            failedPosts++
            console.log(`❌ ${file}`)
            audit.issues.forEach(issue => console.log(`   - ${issue}`))
        }
    }
}

// 2. Audit Legacy Posts
console.log(`\n--- Legacy Posts ---`)
const legacyContent = readFileSync(join(POSTS_DIR, 'legacy.ts'), 'utf-8')
const legacyParts = legacyContent.split(/slug:\s*'([^']+)'/)
// legacyParts: [0]=header, [1]=slug1, [2]=body1, [3]=slug2, [4]=body2, etc.

console.log(`Found ${(legacyParts.length - 1) / 2} legacy posts`)

for (let i = 1; i < legacyParts.length; i += 2) {
    totalPosts++
    const slug = legacyParts[i]
    const bodyStr = legacyParts[i+1]
    const contentStartIdx = bodyStr.indexOf('content: `')
    if (contentStartIdx !== -1) {
        const bodyStart = contentStartIdx + 'content: `'.length
        // Find the matching end backtick before the next object or end of file
        const bodyEnd = bodyStr.lastIndexOf('`')
        const contentBody = bodyStr.slice(bodyStart, bodyEnd)
        
        const audit = auditContentQuality(contentBody)
        if (!audit.pass) {
            failedPosts++
            console.log(`❌ ${slug} (Legacy)`)
            audit.issues.forEach(issue => console.log(`   - ${issue}`))
        }
    }
}

console.log(`\n📊 FINAL AUDIT RESULTS:`)
console.log(`Total Posts: ${totalPosts}`)
console.log(`Fully Compliant: ${totalPosts - failedPosts}`)
console.log(`Posts with Issues: ${failedPosts}`)
