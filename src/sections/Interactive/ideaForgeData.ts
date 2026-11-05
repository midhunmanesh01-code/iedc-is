// ─────────────────────────────────────────────────
// Idea Forge — Data Layer
// Curated problem-space combinations for IDEA SPRINT 2026
// ─────────────────────────────────────────────────

export interface Domain {
  readonly id: string
  readonly label: string
  readonly emoji: string
  readonly brief: string
}

export interface Audience {
  readonly id: string
  readonly label: string
  readonly emoji: string
  readonly context: string
}

export interface Constraint {
  readonly id: string
  readonly label: string
  readonly emoji: string
  readonly rule: string
}

export interface IdeaBrief {
  readonly title: string
  readonly oneLiner: string
  readonly problem: string
  readonly direction: string
  readonly techHints: readonly string[]
  readonly mvp: string
}

// ── The Three Columns ──────────────────────────────

export const DOMAINS: readonly Domain[] = [
  {
    id: 'cleantech',
    label: 'Clean Energy',
    emoji: '⚡',
    brief: 'Decentralized power, micro-storage, resource conservation.',
  },
  {
    id: 'healthcare',
    label: 'Health & Assistive',
    emoji: '🩺',
    brief: 'Accessible diagnostics, mobility aids, rural care.',
  },
  {
    id: 'edge-ai',
    label: 'Edge AI & Robotics',
    emoji: '🤖',
    brief: 'On-device vision, anomaly detection, smart actuators.',
  },
  {
    id: 'fintech',
    label: 'FinTech & Commerce',
    emoji: '💳',
    brief: 'Micro-finance, offline payments, supply provenance.',
  },
  {
    id: 'agritech',
    label: 'AgriTech & Food',
    emoji: '🌱',
    brief: 'Precision irrigation, crop monitoring, post-harvest tech.',
  },
  {
    id: 'civic',
    label: 'Civic & Disaster',
    emoji: '🛡️',
    brief: 'Early warning, resilient mesh comms, municipal tools.',
  },
]

export const AUDIENCES: readonly Audience[] = [
  {
    id: 'health-workers',
    label: 'Health Workers',
    emoji: '🏥',
    context: 'Frontline responders in rural sub-centers and mobile clinics.',
  },
  {
    id: 'farmers',
    label: 'Smallholder Farmers',
    emoji: '👨‍🌾',
    context: 'Independent cultivators with under 2 acres and erratic rainfall.',
  },
  {
    id: 'students',
    label: 'Student Makers',
    emoji: '🔧',
    context: 'Engineering students prototyping in campus FabLabs.',
  },
  {
    id: 'vendors',
    label: 'Street Vendors',
    emoji: '🏪',
    context: 'Unbanked micro-merchants handling cash-heavy daily transactions.',
  },
  {
    id: 'elderly',
    label: 'Senior Citizens',
    emoji: '👴',
    context: 'Motor-impaired individuals needing non-intrusive monitoring.',
  },
  {
    id: 'responders',
    label: 'First Responders',
    emoji: '🚨',
    context: 'Rescue teams navigating collapsed telecom grids.',
  },
]

export const CONSTRAINTS: readonly Constraint[] = [
  {
    id: 'offline',
    label: 'No Internet',
    emoji: '📡',
    rule: 'Must work with zero connectivity — peer-to-peer only.',
  },
  {
    id: 'low-power',
    label: 'Zero Battery',
    emoji: '🔋',
    rule: 'Must self-power via ambient solar, piezo, or thermal — survive 6+ months without charging.',
  },
  {
    id: 'cheap',
    label: 'Under ₹1200 BOM',
    emoji: '🪙',
    rule: 'Total hardware cost must stay under ₹1200 / $15.',
  },
  {
    id: 'fast-edge',
    label: 'Sub-50ms Response',
    emoji: '⏱️',
    rule: 'All processing on-device — zero cloud roundtrip.',
  },
  {
    id: 'no-screen',
    label: 'Screenless UI',
    emoji: '🔇',
    rule: 'No displays — only haptics, audio, or tactile feedback.',
  },
  {
    id: 'tamper-proof',
    label: 'Tamper-Proof Log',
    emoji: '🔐',
    rule: 'Cryptographic append-only audit trail, no trusted party.',
  },
]

// ── Curated Idea Briefs ────────────────────────────
// Key format: "domainId|audienceId|constraintId"
// For combos not in the registry, we generate a sensible fallback.

const CURATED: Record<string, IdeaBrief> = {
  'cleantech|health-workers|offline': {
    title: 'Solar Cold-Chain Guardian',
    oneLiner: 'Prevent vaccine spoilage across off-grid health outposts with decentralized temperature tracking.',
    problem: 'Remote PHC outposts suffer frequent blackouts. Cold-chain temperature excursions go undetected, destroying vaccines before anyone notices.',
    direction: 'Distributed low-power temperature logger pucks transmitting over LoRa mesh to a relay node — no cell towers needed.',
    techHints: ['ESP32-C3', 'DS18B20', 'LoRa SX1262', 'SQLite Edge'],
    mvp: 'Two sensor nodes transmitting live temperatures to an offline dashboard, triggering alerts when thresholds breach.',
  },
  'cleantech|farmers|low-power': {
    title: 'Self-Powered Soil Moisture Beacon',
    oneLiner: 'Energy-harvesting micro-probes for precision irrigation — zero battery swaps, ever.',
    problem: 'Small farmers over-irrigate by 40% because commercial soil sensors need expensive solar panels or frequent battery replacements.',
    direction: 'Soil microbial fuel cell + tiny solar harvester running an ultra-deep-sleep MCU that pulses moisture readings every 30 minutes over BLE.',
    techHints: ['ATtiny1616', 'Capacitive Probe', 'BQ25504 Harvester', 'WebBluetooth PWA'],
    mvp: 'Breadboard harvesting capacitor energy and broadcasting real moisture data to a phone via BLE.',
  },
  'healthcare|elderly|no-screen': {
    title: 'Haptic Tremor Compensator',
    oneLiner: 'Wearable motor-guidance band for Parkinson\'s patients — no screens, just gentle rhythmic pulses.',
    problem: 'Elderly patients with tremor or cognitive decline can\'t operate screen-based apps, while early-stage falls go undetected.',
    direction: 'Forearm band with dual IMUs and vibration arrays delivering directional rhythmic entrainment pulses to counter gait freezing.',
    techHints: ['RP2040', 'MPU-6050', 'DRV2605L Haptic', 'MicroPython'],
    mvp: 'Wrist prototype that detects tremor frequency spikes and fires alternating pulses to restore cadence.',
  },
  'healthcare|health-workers|fast-edge': {
    title: 'Acoustic Heart Murmur Detector',
    oneLiner: 'Sub-50ms on-device cardiac sound classification turning any stethoscope into a triage tool.',
    problem: 'Under-resourced outposts lack cardiologists. Pediatric heart defects and rheumatic disease get diagnosed too late.',
    direction: '3D-printed chest piece with MEMS mic running quantized 1D-CNN on ESP32 — classifies valve sounds in under 40ms.',
    techHints: ['ESP32-S3', 'INMP441 MEMS', 'TFLite Micro', 'Edge Impulse'],
    mvp: 'Live audio capture running on-device inference, lighting a triage status LED for normal vs. abnormal.',
  },
  'edge-ai|students|fast-edge': {
    title: 'Vision Safety Interlock',
    oneLiner: 'Optical PPE enforcer that hardware-kills machinery power before a hand reaches the blade.',
    problem: 'Campus workshops suffer hand injuries when students bypass safety protocols on lathes and laser cutters.',
    direction: 'Edge camera tracking hand-blade proximity and PPE compliance at 30fps, driving an opto-isolated relay.',
    techHints: ['Grove Vision AI v2', 'YOLOv8-nano', 'Relay Module', 'WebRTC'],
    mvp: 'Webcam demo that triggers a simulated machine shutoff when hands cross a virtual safety boundary.',
  },
  'edge-ai|responders|offline': {
    title: 'Acoustic Distress Locator',
    oneLiner: 'Throwable mic pods that triangulate human tapping in collapsed buildings — no cell towers needed.',
    problem: 'In collapsed structures, thermal drones fail through concrete while cell towers are dead. Search windows close fast.',
    direction: 'Ruggedized sensor pods with acoustic beamforming arrays that triangulate sound origin and broadcast coordinates over LoRa mesh.',
    techHints: ['STM32F4', 'Dual PDM Mics', 'LoRa SX1262', 'Leaflet Offline Map'],
    mvp: 'Two breadboard nodes triangulating audio tap arrival times and rendering distance on a rescue display.',
  },
  'fintech|vendors|offline': {
    title: 'Offline Token Voucher',
    oneLiner: 'NFC-based cryptographic payments that work in airplane mode — settle later when connectivity returns.',
    problem: 'Floods, outages, and rural dead zones halt daily-wage vendor transactions completely.',
    direction: 'Cryptographic offline tokens exchanged via NFC or audio chirps, signed with hardware keys, batch-reconciled when online.',
    techHints: ['Web NFC API', 'Ed25519', 'IndexedDB', 'PWA'],
    mvp: 'Two phones in airplane mode trading digital tokens via QR/NFC, verifying balances locally.',
  },
  'fintech|vendors|tamper-proof': {
    title: 'Daily Repayment Proof Box',
    oneLiner: 'Tamper-resistant counter box that builds street vendor credit history for micro-loans.',
    problem: 'Street vendors pay 10% daily interest to loan sharks because they have no verifiable business records.',
    direction: 'Battery-backed counter box with secure element that cryptographically timestamps daily cash inflows for credit union verification.',
    techHints: ['ATECC608A', 'ESP32', 'Thermal Printer', 'React Portal'],
    mvp: 'Transaction logger producing signed receipts with simulated credit score verification.',
  },
  'agritech|farmers|cheap': {
    title: 'Grain Weevil Acoustic Sensor',
    oneLiner: 'Sub-₹500 contact mic that hears insect larvae chewing inside grain silos before damage starts.',
    problem: 'Kerala farmers lose up to 18% of stored paddy to insect larvae and moisture spoilage — testing requires expensive meters.',
    direction: 'Piezo contact mic on bin walls running acoustic frequency filtering to detect micro-vibrations from larval feeding.',
    techHints: ['Piezo Disc', 'LM358 OpAmp', 'ESP32 ADC', 'FFT Binning'],
    mvp: 'Piezo sensor detecting mock grain scratching, displaying real-time FFT frequency spikes on a web oscilloscope.',
  },
  'civic|responders|offline': {
    title: 'River Flash-Flood Mesh',
    oneLiner: 'Autonomous river-level nodes that warn downstream villages before the deluge arrives.',
    problem: 'Mountain flash floods surge faster than centralized warnings can be broadcast through bureaucratic channels.',
    direction: 'Solar ultrasonic rangefinder nodes along river bridges, hopping data downstream via 433MHz LoRa to trigger local sirens.',
    techHints: ['JSN-SR04T', 'ATmega328P', 'LoRa 1W', 'Siren Relay'],
    mvp: 'Ultrasonic sensor triggering a simulated village alarm when water level crosses flood threshold.',
  },
  'civic|elderly|no-screen': {
    title: 'Neighborhood Panic Beacon',
    oneLiner: 'One-touch keyfob that pings verified ward volunteers within 200 meters — no phone needed.',
    problem: 'Seniors living alone during outages can\'t navigate smartphone unlock patterns or emergency dialers.',
    direction: 'Tactile panic latch in a keyfob that broadcasts encrypted RF beacons picked up by neighboring street nodes.',
    techHints: ['nRF52840', 'ESP-NOW', 'Neopixels', 'Piezo Buzzer'],
    mvp: 'Keyfob trigger broadcasting to two independent receivers within 10ms, zero internet.',
  },
}

// ── Brief Generator ────────────────────────────────

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function getIdeaBrief(
  domainId: string,
  audienceId: string,
  constraintId: string
): IdeaBrief {
  const key = `${domainId}|${audienceId}|${constraintId}`
  const curated = CURATED[key]
  if (curated) return curated

  // Fallback: compose a sensible brief from the parts
  const domain = DOMAINS.find((d) => d.id === domainId) ?? DOMAINS[0]
  const audience = AUDIENCES.find((a) => a.id === audienceId) ?? AUDIENCES[0]
  const constraint = CONSTRAINTS.find((c) => c.id === constraintId) ?? CONSTRAINTS[0]

  const hash = hashStr(key)
  const adjectives = ['Adaptive', 'Resilient', 'Distributed', 'Modular', 'Autonomous', 'Low-Footprint']
  const nouns = ['Monitor', 'Sentinel', 'Node', 'Hub', 'Relay', 'Probe', 'Link', 'Beacon']
  const adj = adjectives[hash % adjectives.length]
  const noun = nouns[(hash >> 3) % nouns.length]

  return {
    title: `${adj} ${domain.label} ${noun}`,
    oneLiner: `A ${domain.label.toLowerCase()} solution built for ${audience.label.toLowerCase()} under the constraint: ${constraint.label.toLowerCase()}.`,
    problem: `${audience.label} face critical gaps in ${domain.label.toLowerCase()} because existing tools assume reliable infrastructure, connectivity, and budgets they don't have.`,
    direction: `Purpose-built system designed around "${constraint.rule}" to deliver reliable, fault-tolerant ${domain.label.toLowerCase()} capabilities for ${audience.label.toLowerCase()}.`,
    techHints: ['ESP32', 'React PWA', 'WebSockets', 'Tailwind CSS'],
    mvp: `Working prototype demonstrating the core feedback loop with live demo within the 24-hour sprint window.`,
  }
}
