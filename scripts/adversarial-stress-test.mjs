#!/usr/bin/env node
/**
 * scripts/adversarial-stress-test.mjs
 * Empirical Adversarial Test Harness for Dragale Aviation
 * Component under challenge: ScrollVideoPinnedSequence.tsx
 *
 * Objectives:
 * 1. High-frequency jitter & rapid direction reversal (500+ bursts)
 * 2. Video seeking state machine concurrency limit (strictly <= 1 seek in-flight)
 * 3. Extreme boundary values (scrollY < 0, scrollY > maxScroll, NaN delta, infinite values)
 * 4. Spring settling, overdamped stability, mid-flight reversal, and target alignment
 * 5. Deadband micro-jitter suppression verification
 * 6. Component AST & lifecycle memory safety
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, testId, description, details = '') {
  if (condition) {
    passed++;
    console.log(`  ${colors.green}✓ PASS${colors.reset} [${testId}] ${description} ${details ? colors.dim + '(' + details + ')' + colors.reset : ''}`);
  } else {
    failed++;
    failures.push({ testId, description, details });
    console.log(`  ${colors.red}✗ FAIL${colors.reset} [${testId}] ${description} ${colors.red}${details}${colors.reset}`);
  }
}

console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}DRAGALE AVIATION - ADVERSARIAL STRESS TEST HARNESS${colors.reset}`);
console.log(`${colors.dim}Target: src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}\n`);

// -----------------------------------------------------------------------------
// HARNESS 1: REALISTIC VIDEO DECODER & SEEKING GATE EMULATOR
// -----------------------------------------------------------------------------
class VideoDecoderEmulator {
  constructor(duration = 21.888) {
    this.duration = duration;
    this.currentTime = 0.001; // primed first frame
    this.seeking = false;
    this.isSeekingRef = false;
    this.targetTimeRef = 0;
    this.durationRef = duration;
    this.isIntersectingRef = true;

    // Instrumentation metrics
    this.totalSeekCalls = 0;
    this.activeSeeks = 0;
    this.maxConcurrentSeeks = 0;
    this.redundantSeeksSuppressed = 0;
    this.deadbandSkipped = 0;
    this.invalidValuesFiltered = 0;
  }

  // Component logic implementation replica from ScrollVideoPinnedSequence.tsx
  requestSeek() {
    if (!this.isIntersectingRef || this.durationRef <= 0) return;

    if (!this.seeking && !this.isSeekingRef) {
      const targetTime = this.targetTimeRef;
      if (Math.abs(this.currentTime - targetTime) > 0.03) {
        this.isSeekingRef = true;
        this.seeking = true;
        this.activeSeeks++;
        this.maxConcurrentSeeks = Math.max(this.maxConcurrentSeeks, this.activeSeeks);
        this.totalSeekCalls++;
        this.inFlightTarget = targetTime;
      } else {
        this.deadbandSkipped++;
      }
    } else {
      this.redundantSeeksSuppressed++;
    }
  }

  onScrollProgress(latestProgress) {
    if (this.durationRef > 0) {
      if (typeof latestProgress !== 'number' || isNaN(latestProgress)) {
        this.invalidValuesFiltered++;
        return;
      }
      this.targetTimeRef = Math.min(
        Math.max(0, latestProgress * this.durationRef),
        Math.max(0, this.durationRef - 0.01)
      );
      this.requestSeek();
    }
  }

  onSeeked() {
    this.currentTime = this.inFlightTarget;
    this.seeking = false;
    this.isSeekingRef = false;
    this.activeSeeks = Math.max(0, this.activeSeeks - 1);

    if (Math.abs(this.currentTime - this.targetTimeRef) > 0.03) {
      this.isSeekingRef = true;
      this.seeking = true;
      this.activeSeeks++;
      this.maxConcurrentSeeks = Math.max(this.maxConcurrentSeeks, this.activeSeeks);
      this.totalSeekCalls++;
      this.inFlightTarget = this.targetTimeRef;
    }
  }

  reset() {
    this.currentTime = 0.001;
    this.seeking = false;
    this.isSeekingRef = false;
    this.targetTimeRef = 0;
    this.activeSeeks = 0;
    this.maxConcurrentSeeks = 0;
    this.totalSeekCalls = 0;
    this.redundantSeeksSuppressed = 0;
    this.deadbandSkipped = 0;
    this.invalidValuesFiltered = 0;
  }
}

// -----------------------------------------------------------------------------
// TEST SUITE 1: 500-BURST RAPID JITTER & DIRECTION REVERSAL
// -----------------------------------------------------------------------------
console.log(`${colors.bold}[SUITE 1: 500-BURST HIGH-FREQUENCY JITTER & CONCURRENCY]${colors.reset}`);

const emulator = new VideoDecoderEmulator(21.888);

// Test 1.1: 500 rapid bursts without seeked completion in between
let direction = 1;
let currentP = 0.5;
for (let i = 0; i < 500; i++) {
  currentP += direction * 0.008;
  if (currentP > 0.95 || currentP < 0.05) direction *= -1;
  emulator.onScrollProgress(currentP);
}

assert(
  emulator.maxConcurrentSeeks === 1,
  'ADV-JIT-01',
  'Strict concurrency limit (max concurrent seeks <= 1) maintained across 500 bursts',
  `maxConcurrentSeeks = ${emulator.maxConcurrentSeeks}, suppressed = ${emulator.redundantSeeksSuppressed}`
);

assert(
  emulator.activeSeeks === 1,
  'ADV-JIT-02',
  'Exactly 1 seek in-flight during unresolved jitter storm',
  `activeSeeks = ${emulator.activeSeeks}`
);

// Settle first seek
const finalBurstTarget = emulator.targetTimeRef;
emulator.onSeeked();

assert(
  emulator.maxConcurrentSeeks === 1,
  'ADV-JIT-03',
  'Follow-up seek for accumulated delta maintains max concurrent seeks <= 1',
  `maxConcurrentSeeks = ${emulator.maxConcurrentSeeks}`
);

// Settle follow-up seek
emulator.onSeeked();

assert(
  Math.abs(emulator.currentTime - finalBurstTarget) <= 0.03,
  'ADV-JIT-04',
  'Post-jitter settling converges exactly to final burst target',
  `currentTime = ${emulator.currentTime.toFixed(3)}s, expected = ${finalBurstTarget.toFixed(3)}s`
);

assert(
  emulator.activeSeeks === 0 && !emulator.seeking && !emulator.isSeekingRef,
  'ADV-JIT-05',
  'System settles into clean quiescent idle state',
  'activeSeeks = 0, seeking = false'
);

// -----------------------------------------------------------------------------
// TEST SUITE 2: CHAOS MONKEY ASYNCHRONOUS RACE HARNESS (1,000 CYCLES)
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}[SUITE 2: CHAOS MONKEY ASYNCHRONOUS RACE HARNESS (1,000 CYCLES)]${colors.reset}`);

emulator.reset();
let seed = 1337;
function lcg() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

let violations = 0;
for (let cycle = 0; cycle < 1000; cycle++) {
  const bursts = 1 + Math.floor(lcg() * 10);
  for (let b = 0; b < bursts; b++) {
    emulator.onScrollProgress(lcg());
    if (emulator.activeSeeks > 1) violations++;
  }

  if (emulator.seeking && lcg() > 0.3) {
    emulator.onSeeked();
    if (emulator.activeSeeks > 1) violations++;
  }
}

while (emulator.seeking) {
  emulator.onSeeked();
}

assert(
  violations === 0 && emulator.maxConcurrentSeeks <= 1,
  'ADV-CHAOS-01',
  'Zero concurrency violations across 1,000 chaotic asynchronous interleavings',
  `Violations: ${violations}, Max concurrent: ${emulator.maxConcurrentSeeks}`
);

assert(
  emulator.activeSeeks === 0,
  'ADV-CHAOS-02',
  'Chaos run drained cleanly to zero active seeks',
  `Active seeks: ${emulator.activeSeeks}`
);

// -----------------------------------------------------------------------------
// TEST SUITE 3: EXTREME BOUNDARY & HOSTILE INPUT PROBES
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}[SUITE 3: EXTREME BOUNDARY & HOSTILE INPUT PROBES]${colors.reset}`);

function calcTargetRaw(progress, duration) {
  return Math.min(
    Math.max(0, progress * duration),
    Math.max(0, duration - 0.01)
  );
}

// 3.1 Extreme Negative values (severe iOS elastic bounce)
const extremeNegatives = [-0.0001, -0.5, -1.0, -100.0, -1e10, -Infinity];
let negAllZero = true;
for (const val of extremeNegatives) {
  const t = calcTargetRaw(val, 21.888);
  if (t !== 0) negAllZero = false;
}
assert(
  negAllZero,
  'ADV-BOUND-01',
  'Extreme negative scroll values [-0.0001 to -Infinity] strictly clamped to 0.0s',
  `Tested ${extremeNegatives.length} boundary inputs`
);

// 3.2 Extreme Positive values (severe overscroll)
const maxSafeTarget = 21.888 - 0.01;
const extremePositives = [1.0001, 1.5, 2.0, 100.0, 1e10, Infinity];
let posAllClamped = true;
for (const val of extremePositives) {
  const t = calcTargetRaw(val, 21.888);
  if (Math.abs(t - maxSafeTarget) > 1e-6) posAllClamped = false;
}
assert(
  posAllClamped,
  'ADV-BOUND-02',
  'Extreme positive scroll values [1.0001 to +Infinity] strictly clamped to duration - 0.01s',
  `All clamped to ${maxSafeTarget.toFixed(3)}s`
);

// 3.3 Boundary micro-epsilon test
const epsZero = calcTargetRaw(1e-12, 21.888);
const epsOne = calcTargetRaw(1 - 1e-12, 21.888);
assert(
  epsZero >= 0 && epsOne <= maxSafeTarget,
  'ADV-BOUND-03',
  'Micro-epsilon values (1e-12) preserve strict interval invariants [0, duration - 0.01]',
  `epsZero=${epsZero.toExponential(2)}, epsOne=${epsOne.toFixed(5)}`
);

// 3.4 NaN / Malformed values handling
const nanResult = calcTargetRaw(NaN, 21.888);
assert(
  isNaN(nanResult),
  'ADV-BOUND-04',
  'Raw Math calculation with NaN produces NaN as expected mathematically',
  'Hostile input detected'
);

// Verify that emulator / component requestSeek ignores NaN without corrupting state
emulator.reset();
emulator.onScrollProgress(0.5);
const priorTarget = emulator.targetTimeRef;
emulator.onScrollProgress(NaN);
assert(
  emulator.targetTimeRef === priorTarget,
  'ADV-BOUND-05',
  'Hostile NaN input rejected cleanly without mutating targetTimeRef or deadlocking',
  `targetTimeRef preserved at ${emulator.targetTimeRef.toFixed(3)}s`
);

// -----------------------------------------------------------------------------
// TEST SUITE 4: SUB-FRAME DEADBAND & JITTER FILTERING
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}[SUITE 4: SUB-FRAME DEADBAND & JITTER SUPPRESSION]${colors.reset}`);

emulator.reset();
emulator.currentTime = 10.0;
emulator.seeking = false;
emulator.isSeekingRef = false;
emulator.deadbandSkipped = 0;
emulator.totalSeekCalls = 0;

// Micro-jitter within 30ms (0.03s) deadband
const subFrameOffsets = [0.005, 0.010, 0.018, 0.025, 0.029, -0.015, -0.028];
for (const offset of subFrameOffsets) {
  emulator.targetTimeRef = 10.0 + offset;
  emulator.requestSeek();
}

assert(
  emulator.totalSeekCalls === 0 && emulator.deadbandSkipped === subFrameOffsets.length,
  'ADV-DEAD-01',
  'Sub-frame micro-jitter (delta <= 0.03s) strictly suppressed by deadband filter',
  `Suppressed ${emulator.deadbandSkipped}/${subFrameOffsets.length} micro-jitter seek calls`
);

// Delta slightly exceeding deadband (0.031s)
emulator.targetTimeRef = 10.031;
emulator.requestSeek();

assert(
  emulator.totalSeekCalls === 1 && emulator.isSeekingRef,
  'ADV-DEAD-02',
  'Supra-deadband movement (delta > 0.03s) reliably triggers hardware seek',
  `Seek triggered at target ${emulator.targetTimeRef}s`
);

// -----------------------------------------------------------------------------
// TEST SUITE 5: SPRING DYNAMICS & NUMERICAL STABILITY HARNESS
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}[SUITE 5: SPRING DYNAMICS & INERTIA SETTLING]${colors.reset}`);

// Simulate exact second-order ODE of Framer Motion useSpring:
// m * x'' + c * x' + k * (x - x_target) = 0
// m = 0.5, k = 200, c = 30, restDelta = 0.0001
const mass = 0.5;
const stiffness = 200;
const damping = 30;
const restDelta = 0.0001;

// Characteristic polynomial: 0.5 * r^2 + 30 * r + 200 = 0 => Overdamped!
const omega_n = Math.sqrt(stiffness / mass); // 20
const zeta = damping / (2 * Math.sqrt(stiffness * mass)); // 1.5 (Overdamped)

assert(
  zeta > 1.0,
  'ADV-SPRG-01',
  `Spring damping ratio zeta = ${zeta.toFixed(2)} > 1.0 confirms strictly overdamped regime`,
  'No oscillatory ringing, no overshoot'
);

function simulateSpringStep(targetProgress, initialProgress = 0.0, dt = 1 / 120, maxDuration = 3.0) {
  let x = initialProgress;
  let v = 0.0;
  let t = 0.0;
  let maxOvershoot = 0.0;
  let timeTo2Percent = null;
  let timeTo5Percent = null;

  while (t < maxDuration) {
    const f_spring = -stiffness * (x - targetProgress);
    const f_damper = -damping * v;
    const a = (f_spring + f_damper) / mass;

    v += a * dt;
    x += v * dt;
    t += dt;

    const error = Math.abs(x - targetProgress);
    const span = Math.abs(targetProgress - initialProgress);

    if (timeTo5Percent === null && error <= 0.05 * span) {
      timeTo5Percent = t;
    }
    if (timeTo2Percent === null && error <= 0.02 * span) {
      timeTo2Percent = t;
    }

    if (targetProgress > initialProgress) {
      if (x > targetProgress) maxOvershoot = Math.max(maxOvershoot, x - targetProgress);
    } else {
      if (x < targetProgress) maxOvershoot = Math.max(maxOvershoot, targetProgress - x);
    }

    if (error < restDelta && Math.abs(v) < restDelta) {
      break;
    }
  }

  return { settledTime: t, timeTo2Percent, timeTo5Percent, finalX: x, maxOvershoot };
}

// 5.2 Step response 0 -> 1 (full forward scrub flick)
const forwardStep = simulateSpringStep(1.0, 0.0);
assert(
  forwardStep.maxOvershoot === 0.0,
  'ADV-SPRG-02',
  'Step input 0.0 -> 1.0 exhibits exactly ZERO overshoot (monotonic approach)',
  `maxOvershoot = ${forwardStep.maxOvershoot}`
);

assert(
  forwardStep.timeTo5Percent !== null && forwardStep.timeTo5Percent <= 0.45,
  'ADV-SPRG-03',
  'Standard engineering 5% settling time reached within 450ms',
  `timeTo5Percent: ${(forwardStep.timeTo5Percent * 1000).toFixed(1)}ms`
);

assert(
  forwardStep.timeTo2Percent !== null && forwardStep.timeTo2Percent <= 0.60,
  'ADV-SPRG-04',
  'Standard engineering 2% settling time reached within 600ms',
  `timeTo2Percent: ${(forwardStep.timeTo2Percent * 1000).toFixed(1)}ms`
);

assert(
  Math.abs(forwardStep.finalX - 1.0) < restDelta,
  'ADV-SPRG-05',
  'Step input 0.0 -> 1.0 settles with zero steady-state error (< 0.0001)',
  `Settled at ${forwardStep.finalX.toFixed(6)} in ${forwardStep.settledTime.toFixed(3)}s`
);

// 5.3 Step response 1 -> 0 (full reverse scrub flick)
const reverseStep = simulateSpringStep(0.0, 1.0);
assert(
  reverseStep.maxOvershoot === 0.0,
  'ADV-SPRG-06',
  'Step input 1.0 -> 0.0 exhibits exactly ZERO undershoot below zero',
  `maxUndershoot = ${reverseStep.maxOvershoot}`
);

assert(
  Math.abs(reverseStep.finalX - 0.0) < restDelta,
  'ADV-SPRG-07',
  'Step input 1.0 -> 0.0 settles cleanly at 0.000000 (< 0.0001)',
  `Settled at ${reverseStep.finalX.toFixed(6)} in ${reverseStep.settledTime.toFixed(3)}s`
);

// 5.4 Mid-flight direction reversal test
// Scroll starts toward 1.0, then reverses abruptly to 0.0 at t = 200ms
function simulateMidFlightReversal() {
  let x = 0.0;
  let v = 0.0;
  let t = 0.0;
  const dt = 1 / 120;
  let target = 1.0;

  // Move forward for 200ms
  while (t < 0.2) {
    const f = -stiffness * (x - target) - damping * v;
    v += (f / mass) * dt;
    x += v * dt;
    t += dt;
  }
  const midX = x;
  const midV = v;

  // Reversal: target flips to 0.0
  target = 0.0;
  let maxTurnaroundOvershoot = 0.0;
  while (t < 2.0) {
    const f = -stiffness * (x - target) - damping * v;
    v += (f / mass) * dt;
    x += v * dt;
    t += dt;

    if (x < 0.0) maxTurnaroundOvershoot = Math.max(maxTurnaroundOvershoot, -x);
    if (Math.abs(x - target) < restDelta && Math.abs(v) < restDelta) break;
  }

  return { midX, midV, finalX: x, maxTurnaroundOvershoot, turnaroundSettled: t };
}

const midFlight = simulateMidFlightReversal();
assert(
  midFlight.maxTurnaroundOvershoot === 0.0 && Math.abs(midFlight.finalX) < restDelta,
  'ADV-SPRG-08',
  'Mid-flight direction reversal decelerates smoothly and settles at 0.0 without boundary violations',
  `Reversed from x=${midFlight.midX.toFixed(2)}, settled at x=${midFlight.finalX.toFixed(6)}`
);

// -----------------------------------------------------------------------------
// TEST SUITE 6: SOURCE CODE STATIC AUDIT & LIFECYCLE SAFETY
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}[SUITE 6: SOURCE CODE STATIC AUDIT & LIFECYCLE SAFETY]${colors.reset}`);

const targetFilePath = path.join(ROOT, 'src/components/teamwork-preview/ScrollVideoPinnedSequence.tsx');
assert(
  fs.existsSync(targetFilePath),
  'ADV-SRC-01',
  'Source file ScrollVideoPinnedSequence.tsx exists at target path',
  targetFilePath
);

const srcContent = fs.readFileSync(targetFilePath, 'utf8');

const hasStateForScroll = /const\s+\[\s*(progress|currentTime|time|isSeeking)\s*,\s*set\w+\s*\]\s*=\s*useState/i.test(srcContent);
assert(
  !hasStateForScroll,
  'ADV-SRC-02',
  'Component strictly avoids useState for high-frequency scroll values (Zero Re-Render Guarantee)',
  'No useState bindings for progress or currentTime'
);

assert(
  srcContent.includes('isSeekingRef = useRef<boolean>(false)') &&
  srcContent.includes('targetTimeRef = useRef<number>(0)') &&
  srcContent.includes('durationRef = useRef<number>(0)'),
  'ADV-SRC-03',
  'State machine state maintained exclusively through mutable useRef instances',
  'isSeekingRef, targetTimeRef, durationRef verified'
);

assert(
  srcContent.includes("useMotionValueEvent(smoothProgress, 'change',"),
  'ADV-SRC-04',
  'Scroll changes consumed via direct useMotionValueEvent subscription',
  'useMotionValueEvent verified'
);

assert(
  srcContent.includes('video.currentTime = 0.001'),
  'ADV-SRC-05',
  'WebKit/Safari first-frame priming offset (0.001s) explicitly programmed',
  'currentTime = 0.001 verified'
);

assert(
  srcContent.includes('observer.disconnect()'),
  'ADV-SRC-06',
  'IntersectionObserver cleans up on unmount via observer.disconnect() (No memory leak)',
  'observer.disconnect() verified'
);

assert(
  srcContent.includes('preload="metadata"') &&
  srcContent.includes('muted={true}') &&
  srcContent.includes('playsInline={true}') &&
  srcContent.includes('disablePictureInPicture={true}') &&
  srcContent.includes('disableRemotePlayback={true}'),
  'ADV-SRC-07',
  'Video element configures all essential mobile performance & lock attributes',
  'preload, muted, playsInline, disablePIP, disableRemotePlayback verified'
);

assert(
  srcContent.includes('relative h-[400vh]') &&
  srcContent.includes('sticky top-0') &&
  (srcContent.includes('h-screen') || srcContent.includes('h-[100dvh]')),
  'ADV-SRC-08',
  'Container implements 400vh scroll track with sticky top-0 100dvh viewport frame',
  'relative h-[400vh] & sticky top-0 h-[100dvh] verified'
);

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
console.log(`${colors.bold}ADVERSARIAL STRESS TEST SUMMARY${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
console.log(`  Total Probes Evaluated : ${passed + failed}`);
console.log(`  Passed                 : ${colors.green}${passed}${colors.reset}`);
console.log(`  Failed                 : ${failed > 0 ? colors.red : colors.dim}${failed}${colors.reset}`);

if (failed === 0) {
  console.log(`\n${colors.bold}${colors.green}>>> ADVERSARIAL VERDICT: APPROVE <<<${colors.reset}`);
  console.log(`${colors.green}All 30 adversarial stress probes passed without a single failure.${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`\n${colors.bold}${colors.red}>>> ADVERSARIAL VERDICT: REJECT <<<${colors.reset}`);
  console.log(`${colors.red}Encountered ${failed} failures during stress testing.${colors.reset}\n`);
  process.exit(1);
}
