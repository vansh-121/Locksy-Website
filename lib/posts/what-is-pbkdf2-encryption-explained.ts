// lib/posts/what-is-pbkdf2-encryption-explained.ts
// Migrated from lib/posts/legacy.ts on 2026-10-06.
// Split out of the single-file archive so it follows the per-file post convention.

const post = {
 slug: 'what-is-pbkdf2-encryption-explained',
 title: 'What is PBKDF2 Encryption? A Plain-English Guide',
 description: 'PBKDF2 explained without the jargon. What it does, why it matters for your passwords, and how it stops hackers — even if you have zero technical background.',
 author: 'Vansh Sethi',
 publishDate: '2026-01-25',
 lastModified: '2026-02-05',
 readTime: '7 min read',
 category: 'Security',
 tags: ['Encryption', 'PBKDF2', 'Password Security'],
 keywords: ['PBKDF2 encryption', 'password encryption', 'PBKDF2 explained', 'encryption iterations'],
 image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&auto=format&q=80',
 imageAlt: 'Green matrix-style encryption code flowing on a dark screen',
 tldr: "PBKDF2 is not encryption, it is key derivation: it takes your password and hashes it hundreds of thousands of times in sequence so that each guess costs real time. Regular hashing is too fast — SHA-256 can compute billions of hashes per second, which cracks short passwords in seconds or hours. PBKDF2 at 600,000+ iterations makes each guess take about 100 milliseconds for a legitimate login but turns a brute-force attack into a centuries-long project. A unique random salt per installation defeats precomputed rainbow tables. Locksy uses that combination to derive the key that protects your tabs, and never stores your actual password anywhere.",
 keyTakeaways: [
  'Hashing is a one-way function: password to hash is easy, hash to password is practically impossible — until fast hardware makes guessing billions of times per second viable.',
  'PBKDF2 stands for Password-Based Key Derivation Function 2, and its whole idea is making hashing deliberately slow by chaining hundreds of thousands of iterations.',
  'For a legitimate user the cost is about 100 milliseconds, imperceptible; for an attacker trying millions of guesses it turns hours into centuries.',
  'OWASP recommends 600,000+ iterations as of 2023, which is the sweet spot Locksy uses — strong against practical brute-force attacks while fast enough that you never notice the delay.',
  'Salt is a unique random string mixed in before hashing. Without it, two users with the same password produce the same hash and rainbow tables work; with it, precomputed tables are useless.',
  'PBKDF2 is a key derivation function, not encryption — the derived key is then used with an actual cipher such as AES-256 to encrypt and decrypt your data.',
  'bcrypt has been battle-tested since 1999 but processes passwords in 72-byte chunks, silently truncating very long ones; Argon2 won the 2015 Password Hashing Competition and resists GPU and specialised hardware by requiring configurable memory.',
  'PBKDF2 is the practical choice for browser extensions because it runs efficiently in JavaScript through the Web Crypto API with no external dependencies.',
  'To evaluate any security claim, ask five questions: is the algorithm named, what is the iteration count, is it open source, where is data processed, and is there rate limiting?',
  'In Locksy, your password plus a stored salt runs through 600,000+ iterations of SHA-256 to produce the key — the password itself is never stored, and rate limiting adds growing delays to failed attempts.',
 ],
 faq: [
  {
   question: "What does PBKDF2 actually do?",
   answer: "It takes regular hashing and makes it intentionally expensive. Instead of hashing your password once, it hashes it hundreds of thousands of times in a row, with each hash feeding into the next, creating a chain of computation that takes real measurable time to walk through."
  },
  {
   question: "What does the iterations number mean in practice?",
   answer: "It is how many times PBKDF2 runs the hashing function for a single password verification. A thousand iterations was an early-2000s figure and is crackable with modern hardware; 100,000 is better but fast GPUs chew through it; 600,000+ is the current OWASP recommendation and the standard Locksy uses."
  },
  {
   question: "What is salt and why does it matter?",
   answer: "Salt is a random string unique to each user that gets mixed in with the password before hashing. Without it, two people using the same password produce the same hash, which lets an attacker precompute a giant table of common password hashes and just look up matches. Salt makes those rainbow tables useless."
  },
  {
   question: "How does this protect my locked tabs?",
   answer: "When you set a master password, a random salt is generated and PBKDF2 runs your password plus that salt through 600,000+ iterations of SHA-256 to produce your encryption key. The password itself is never stored. Every guess an attacker makes has to repeat all 600,000 iterations, and rate limiting adds increasingly long delays on top."
  },
  {
   question: "How do I judge a tool that claims military-grade encryption?",
   answer: "Check whether they name the algorithm. PBKDF2, bcrypt, and Argon2 are all legitimate; proprietary encryption is a red flag. Then check the iteration count for PBKDF2, whether the code is open source, whether processing happens locally, and whether there is rate limiting on guessing attempts."
  },
 ],
 content: `
## The Acronym Everyone Mentions but Nobody Explains

If you've ever read the description of a password manager or a security tool, you've probably seen something like "secured with PBKDF2 encryption, 600,000 iterations." It sounds impressive, important, and completely impenetrable — in the sense that you have no idea what it means.

Here's the thing: you don't need a computer science degree to understand this. The core idea is surprisingly simple, and once you get it, you'll be able to evaluate security claims like a pro.

## Passwords Have a Fundamental Problem

![Developer working on code at a laptop — understanding how passwords are stored](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop&auto=format&q=80)

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

![Padlock on a metallic surface symbolizing encrypted tab protection](https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&auto=format&q=80)

When you set a master password in Locksy like Locksy, here's what actually happens behind the scenes:

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
}

export default post
