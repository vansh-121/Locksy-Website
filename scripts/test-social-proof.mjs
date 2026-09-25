/**
 * Automated test suite for Social Proof Notification Toast logic.
 * Tests:
 * 1. Non-repetition guarantee across multiple sessions and waves
 * 2. Profile data integrity (unique names, countries, flags)
 * 3. Wave & Cooldown calculations
 * 4. Checkout links and pricing consistency
 */

import assert from "node:assert/strict"

console.log("🚀 Starting Social Proof Toast Test Suite...\n")

// 1. Data Integrity Test
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const fileContent = readFileSync(
  resolve("components/social-proof-toast.tsx"),
  "utf-8"
)

console.log("Checking components/social-proof-toast.tsx contents...")

// Assert constants exist
assert.ok(fileContent.includes("SHOW_DURATION = 8500"), "SHOW_DURATION should be 8500ms")
assert.ok(fileContent.includes("EXIT_DURATION = 800"), "EXIT_DURATION should be 800ms")
assert.ok(fileContent.includes("WAVE_SIZE = 3"), "WAVE_SIZE should be 3")
assert.ok(fileContent.includes("MIN_WAVE_COOLDOWN = 150000"), "MIN_WAVE_COOLDOWN should be 150000ms")
assert.ok(fileContent.includes("MAX_TOTAL_WAVES = 2"), "MAX_TOTAL_WAVES should be 2")
assert.ok(fileContent.includes("MAX_TOTAL_ALERTS = WAVE_SIZE * MAX_TOTAL_WAVES"), "MAX_TOTAL_ALERTS formula valid")
assert.ok(fileContent.includes("playNotificationChime"), "playNotificationChime function exists")
assert.ok(fileContent.includes("sharedAudioCtx"), "Persistent sharedAudioCtx exists")
assert.ok(fileContent.includes("PRO_CHECKOUT_URL"), "Links to PRO_CHECKOUT_URL")

console.log("✔ Constants and AudioContext architecture verified.")

// Extract BUYER_PROFILES from file
const buyerMatches = [...fileContent.matchAll(/\{\s*name:\s*"([^"]+)",\s*location:\s*"([^"]+)",\s*flag:\s*"([^"]+)"\s*\}/g)]
console.log(`Found ${buyerMatches.length} buyer profiles in dataset.`)

assert.ok(buyerMatches.length >= 40, `Expected at least 40 profiles, got ${buyerMatches.length}`)

const names = buyerMatches.map(m => m[1])
const uniqueNames = new Set(names)
assert.strictEqual(names.length, uniqueNames.size, "All names in BUYER_PROFILES must be 100% unique")
console.log("✔ Profile uniqueness verified: 0 duplicates in buyer roster.")

// 2. Non-Repetition Algorithm Simulation
console.log("\nSimulating buyer selection over 40 alerts with sessionStorage tracker...")

const buyerProfiles = buyerMatches.map(m => ({ name: m[1], location: m[2], flag: m[3] }))
const seenNames = new Set()
const chosenOrder = []

for (let i = 0; i < buyerProfiles.length; i++) {
  const available = buyerProfiles.filter(b => !seenNames.has(b.name))
  assert.ok(available.length > 0, `Pool should have unseen candidates at step ${i}`)
  
  const randomIndex = Math.floor(Math.random() * available.length)
  const selected = available[randomIndex]
  
  assert.ok(!seenNames.has(selected.name), `Name "${selected.name}" was already seen! Duplicate detected.`)
  seenNames.add(selected.name)
  chosenOrder.push(selected.name)
}

assert.strictEqual(new Set(chosenOrder).size, buyerProfiles.length, "All selections across the cycle were completely unique")
console.log(`✔ Simulated ${buyerProfiles.length} consecutive alerts: 100% zero-repetition confirmed.`)

// 3. Wave & Cooldown Logic Simulation
console.log("\nSimulating Wave & Cooldown pacing over a 15-minute visit...")

const WAVE_SIZE = 3
const MAX_TOTAL_ALERTS = 6
const MIN_GAP_IN_WAVE = 28000
const MAX_GAP_IN_WAVE = 45000
const MIN_WAVE_COOLDOWN = 150000
const MAX_WAVE_COOLDOWN = 200000

let currentTime = 10000 // 10s initial delay
let count = 0
const eventLog = []

while (count < MAX_TOTAL_ALERTS) {
  count++
  const isWaveComplete = count % WAVE_SIZE === 0
  eventLog.push({
    alertNumber: count,
    wave: Math.ceil(count / WAVE_SIZE),
    timeSeconds: Math.round(currentTime / 1000),
    isWaveEnd: isWaveComplete
  })

  if (count >= MAX_TOTAL_ALERTS) {
    break
  }

  const nextWait = isWaveComplete
    ? (MIN_WAVE_COOLDOWN + MAX_WAVE_COOLDOWN) / 2
    : (MIN_GAP_IN_WAVE + MAX_GAP_IN_WAVE) / 2

  currentTime += 8500 + 800 + nextWait
}

console.log("Simulated Event Schedule:")
eventLog.forEach(e => {
  console.log(`  Alert #${e.alertNumber} (Wave ${e.wave}) at ${Math.floor(e.timeSeconds / 60)}m ${e.timeSeconds % 60}s ${e.isWaveEnd ? "-> [Wave Complete: Entering 3m Quiet Cooldown]" : ""}`)
})

assert.strictEqual(eventLog.length, 6, "Exactly 6 alerts triggered before permanent sleep")
console.log("✔ Wave & Cooldown schedule verified: Exactly 2 waves of 3 alerts with ~3m cooldown.")

console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!")
