import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'lib', 'posts')
const STORE_URL = 'https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim'

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts')

let updated = 0

for (const file of files) {
    const filePath = join(POSTS_DIR, file)
    const content = readFileSync(filePath, 'utf-8')

    const splitKey = 'content: `'
    if (!content.includes(splitKey)) continue

    const [header, body] = content.split(splitKey)

    // Check if the body already has a markdown link to Locksy or Chrome Web Store
    if (body.includes('[Locksy]') || body.includes('[Install Locksy') || body.includes('detail/kiediieibclgkcnkkmjlhmdainpoidim')) {
        continue
    }

    // Match first unlinked "Locksy" in the body: not preceded by [ or /
    // e.g., "Tools like Locksy handle this" -> "Tools like [Locksy](...) handle this"
    let replaced = false
    const newBody = body.replace(/(?<!\[|\/)\bLocksy\b(?!\s*\]|\/)/, (match) => {
        replaced = true
        return `[${match}](${STORE_URL})`
    })

    if (replaced) {
        writeFileSync(filePath, header + splitKey + newBody, 'utf-8')
        updated++
    }
}

console.log(`✅ Successfully added in-article install link to first Locksy mention in ${updated} posts.`)
