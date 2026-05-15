import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'lib', 'posts')

// All the filler patterns we want to destroy
const AI_FILLER_PATTERNS = [
    /in today'?s digital (landscape|world|age|era),?\s*/gi,
    /it'?s important to note that\s*/gi,
    /this article will (explore|discuss|cover|examine)\s*/gi,
    /let'?s dive (in|into)[^.]*\./gi,
    /let'?s take a (look|closer look)[^.]*\./gi,
    /embracing \w+\s*/gi,
    /leveraging \w+\s*/gi,
    /harnessing \w+\s*/gi,
    /it goes without saying,?\s*/gi,
    /at the end of the day,?\s*/gi,
    /in conclusion,?\s*/gi,
    /to summarize,?\s*/gi,
    /the bottom line is:?\s*/gi,
    /without further ado,?\s*/gi,
    /buckle up[^.]*\./gi,
    /game.?changer/gi,
    /no.?brainer/gi,
    /silver bullet/gi,
    /paradigm shift/gi,
    /navigate the complex/gi,
    /ever.?evolving/gi,
    /a world where/gi,
    /in an era of/gi,
]

// Extra cleanups for the false claim in browser-sandbox-escapes
const FALSE_CLAIMS = [
    [/What it does,? essentially,? is run your browser sessions in a lightweight,? disposable container[^.]*\./gi,
     'What it does is password-lock individual browser tabs so sensitive sessions remain protected even when you step away.'],
    [/Locksy'?s? container/gi, 'Locksy\'s tab lock'],
    [/it'?s? \*?still\*? trapped inside Locksy'?s? container[^.]*\./gi, ''],
    [/sandbox for your sandbox/gi, 'lock for your sensitive tabs'],
]

let totalFilesFixed = 0

// 1. Fix Individual Posts
const individualFiles = readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'legacy.ts')

for (const file of individualFiles) {
    const filePath = join(POSTS_DIR, file)
    let content = readFileSync(filePath, 'utf-8')
    let originalContent = content

    for (const pattern of AI_FILLER_PATTERNS) {
        content = content.replace(pattern, '')
    }
    for (const [pattern, replacement] of FALSE_CLAIMS) {
        content = content.replace(pattern, replacement)
    }

    // Clean up empty lines and weird spacing
    content = content.replace(/\n\n\n+/g, '\n\n')
    content = content.replace(/  +/g, ' ')

    if (content !== originalContent) {
        writeFileSync(filePath, content, 'utf-8')
        totalFilesFixed++
    }
}

// 2. Fix Legacy Posts
const legacyPath = join(POSTS_DIR, 'legacy.ts')
let legacyContent = readFileSync(legacyPath, 'utf-8')
let originalLegacy = legacyContent

for (const pattern of AI_FILLER_PATTERNS) {
    legacyContent = legacyContent.replace(pattern, '')
}
for (const [pattern, replacement] of FALSE_CLAIMS) {
    legacyContent = legacyContent.replace(pattern, replacement)
}

legacyContent = legacyContent.replace(/\n\n\n+/g, '\n\n')
legacyContent = legacyContent.replace(/  +/g, ' ')

if (legacyContent !== originalLegacy) {
    writeFileSync(legacyPath, legacyContent, 'utf-8')
    totalFilesFixed++
}

console.log(`✅ Removed all AI fillers and false claims from ${totalFilesFixed} files.`)
