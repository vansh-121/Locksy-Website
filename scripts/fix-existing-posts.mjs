/**
 * fix-existing-posts.mjs
 *
 * One-time script to clean up existing blog posts for AdSense compliance.
 * - Reduces excessive Locksy mentions (keeping at most 1 per post)
 * - Removes false claims about Locksy
 * - Strips AI filler phrases
 * - Reports issues for manual review
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'lib', 'posts')

// Posts to process (skip index.ts and legacy.ts)
const postFiles = readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'legacy.ts')
    .sort()

console.log(`\n🔧 Fixing ${postFiles.length} blog posts for AdSense compliance...\n`)

// AI filler phrases to remove or rewrite
const FILLER_REPLACEMENTS = [
    [/game[- ]?changer/gi, 'significant improvement'],
    [/no[- ]?brainer/gi, 'straightforward choice'],
    [/silver bullet/gi, 'complete solution'],
    [/It goes without saying\b[^.]*\./gi, ''],
    [/At the end of the day, /gi, ''],
    [/The bottom line is[: ]/gi, ''],
]

// False Locksy claims — patterns and their replacements
const FALSE_CLAIMS = [
    // "Locksy runs in containers" — false, Locksy locks tabs
    [/What it does,? essentially,? is run your browser sessions in a lightweight,? disposable container[^.]*\./gi,
     'What it does is password-lock individual browser tabs so sensitive sessions remain protected even when you step away.'],
    [/Locksy'?s? container/gi, 'Locksy\'s tab lock'],
    [/it'?s? \*?still\*? trapped inside Locksy'?s? container[^.]*\./gi,
     ''],
    // Locksy doesn't sandbox or isolate processes
    [/sandbox for your sandbox/gi, 'lock for your sensitive tabs'],
    [/Locksy.*?isolat\w+[^.]*\./gi, (match) => {
        if (/tab/i.test(match)) return match // OK if mentioning tab isolation
        return '' // Remove false isolation claims
    }],
]

let totalFixed = 0

for (const file of postFiles) {
    const filePath = join(POSTS_DIR, file)
    let content = readFileSync(filePath, 'utf-8')
    const originalContent = content
    const issues = []

    // 1. Fix false claims
    for (const [pattern, replacement] of FALSE_CLAIMS) {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement)
            issues.push('Fixed false Locksy claim')
        }
    }

    // 2. Fix filler phrases
    for (const [pattern, replacement] of FILLER_REPLACEMENTS) {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement)
            issues.push(`Replaced filler: ${pattern.source}`)
        }
    }

    // 3. Reduce Locksy mentions to at most 1 in the article content
    // First, find the content block (everything between backticks in content: `...`)
    const contentStartIdx = content.indexOf('content: `')
    if (contentStartIdx === -1) continue

    const beforeContent = content.slice(0, contentStartIdx)
    let articleContent = content.slice(contentStartIdx)

    // Count Locksy mentions in the article body only (not in metadata)
    const locksyRegex = /\bLocksy\b/gi
    const matches = [...articleContent.matchAll(locksyRegex)]

    if (matches.length > 1) {
        // Keep only the first mention, replace the rest
        let keepFirst = true
        articleContent = articleContent.replace(locksyRegex, (match) => {
            if (keepFirst) {
                keepFirst = false
                return match // Keep first occurrence
            }
            // Replace subsequent mentions contextually
            return 'a tab-locking extension'
        })
        issues.push(`Reduced Locksy mentions from ${matches.length} to 1`)
    }

    content = beforeContent + articleContent

    // 4. Clean up double spaces or empty lines left by removals
    content = content.replace(/\n\n\n+/g, '\n\n')
    content = content.replace(/  +/g, ' ')

    if (content !== originalContent) {
        writeFileSync(filePath, content, 'utf-8')
        totalFixed++
        console.log(`✅ ${file}`)
        for (const issue of issues) {
            console.log(`   • ${issue}`)
        }
    } else {
        console.log(`⏭️  ${file} — no changes needed`)
    }
}

console.log(`\n📊 Summary: Fixed ${totalFixed}/${postFiles.length} posts`)
console.log(`\nDone! Run \`pnpm run build\` to verify everything compiles.\n`)
