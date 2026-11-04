export interface TrackDomain {
  readonly id: string
  readonly name: string
  readonly tag: string
  readonly iconName: string
  readonly color: string
  readonly description: string
}

export interface TargetAudience {
  readonly id: string
  readonly label: string
  readonly context: string
  readonly iconName: string
}

export interface EngineeringConstraint {
  readonly id: string
  readonly label: string
  readonly spec: string
  readonly tag: string
  readonly badgeColor: string
}

export interface BlueprintSynthesis {
  readonly id: string
  readonly codename: string
  readonly title: string
  readonly hook: string
  readonly problemStatement: string
  readonly solutionArchitecture: string
  readonly recommendedStack: readonly string[]
  readonly sprintMvpScope: string
  readonly metrics: {
    readonly feasibility: number
    readonly impact: number
    readonly novelty: number
    readonly hardwareIntensity: 'Pure Software' | 'Hybrid IoT' | 'Deep Hardware'
  }
}

export const TRACK_DOMAINS: readonly TrackDomain[] = [
  {
    id: 'cleantech',
    name: 'CleanTech & Energy',
    tag: 'ENERGY // GRID',
    iconName: 'Zap',
    color: '#ffc928',
    description: 'Decentralized generation, micro-storage, demand response, and resource conservation.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Assistive',
    tag: 'MEDTECH // BIO',
    iconName: 'Activity',
    color: '#59d6e8',
    description: 'Accessible diagnostics, mobility aids, emergency telemetry, and rural care pipelines.',
  },
  {
    id: 'edge-ai',
    name: 'Edge AI & Robotics',
    tag: 'TINYML // EMBEDDED',
    iconName: 'Cpu',
    color: '#38bdf8',
    description: 'On-device computer vision, anomaly detection, autonomous drones, and smart actuators.',
  },
  {
    id: 'fintech',
    name: 'FinTech & Open Commerce',
    tag: 'LEDGER // COMMERCE',
    iconName: 'Coins',
    color: '#fbbf24',
    description: 'Trustless micro-finance, offline voucher ledgers, supply provenance, and local commerce.',
  },
  {
    id: 'agritech',
    name: 'AgriTech & Food Systems',
    tag: 'SOIL // HARVEST',
    iconName: 'Sprout',
    color: '#34d399',
    description: 'Precision irrigation, micro-climate soil probes, post-harvest telemetry, and yield safety.',
  },
  {
    id: 'civic-tech',
    name: 'Civic Tech & Disaster',
    tag: 'INFRA // RESILIENCE',
    iconName: 'ShieldAlert',
    color: '#f87171',
    description: 'Early warning floods/landslides, resilient mesh communications, and municipal services.',
  },
]

export const TARGET_AUDIENCES: readonly TargetAudience[] = [
  {
    id: 'health-workers',
    label: 'Primary Health & Triage Workers',
    context: 'Frontline responders operating in sub-centers and mobile rural clinics.',
    iconName: 'HeartPulse',
  },
  {
    id: 'farmers',
    label: 'Smallholder Farmers & Collectives',
    context: 'Independent cultivators handling under 2 acres with erratic power and rainfall.',
    iconName: 'Users',
  },
  {
    id: 'makerspaces',
    label: 'Campus FabLabs & Engineering Cohorts',
    context: 'Student researchers prototyping with hazardous high-voltage and CNC equipment.',
    iconName: 'Wrench',
  },
  {
    id: 'merchants',
    label: 'Informal Street Merchants & Micro-Vendors',
    context: 'Unbanked roadside merchants handling high-velocity, low-ticket transactions.',
    iconName: 'Store',
  },
  {
    id: 'elderly-assist',
    label: 'Motor-Impaired & Senior Citizens',
    context: 'Individuals requiring autonomous assistive monitoring without intrusive cameras.',
    iconName: 'Accessibility',
  },
  {
    id: 'first-responders',
    label: 'Disaster Relief & Municipal Ward Teams',
    context: 'Rescue volunteers navigating collapsed telecom grids and flash flood events.',
    iconName: 'LifeBuoy',
  },
]

export const ENGINEERING_CONSTRAINTS: readonly EngineeringConstraint[] = [
  {
    id: 'offline-mesh',
    label: '100% Offline Mesh Only',
    spec: 'Zero cellular or Wi-Fi dependency; peer-to-peer RF (LoRa/ESP-NOW) data sync.',
    tag: 'NO_CLOUD',
    badgeColor: 'border-[#59d6e8]/40 text-[#59d6e8]',
  },
  {
    id: 'ultra-low-power',
    label: 'Energy Harvesting / <10mW Sleep',
    spec: 'Must survive 6+ months on coin-cell or self-power via ambient micro-solar/piezo.',
    tag: 'ZERO_DRAIN',
    badgeColor: 'border-emerald-400/40 text-emerald-400',
  },
  {
    id: 'sub-15-bom',
    label: 'Strict Sub-$15 Hardware BOM',
    spec: 'Manufacturable using commodity off-the-shelf components sourced in local markets.',
    tag: 'EXTREME_LOW_BOM',
    badgeColor: 'border-[#ffc928]/40 text-[#ffc928]',
  },
  {
    id: 'sub-50ms-edge',
    label: 'Deterministic Sub-50ms TinyML',
    spec: 'All inferences run on Cortex-M4/ESP32; zero cloud roundtrip latency.',
    tag: 'DETERMINISTIC_EDGE',
    badgeColor: 'border-purple-400/40 text-purple-300',
  },
  {
    id: 'screenless',
    label: 'Screenless Tactile / Voice Interface',
    spec: 'Zero displays; user feedback operates purely via bone-conduction, haptics, or audio cues.',
    tag: 'ZERO_SCREEN',
    badgeColor: 'border-cyan-400/40 text-cyan-300',
  },
  {
    id: 'tamper-proof',
    label: 'Non-Custodial Cryptographic Audit',
    spec: 'Local cryptographic hash-chains stored in append-only flash memory for forensics.',
    tag: 'CRYPTO_SEALED',
    badgeColor: 'border-amber-400/40 text-amber-300',
  },
]

// Curated matrix for high-impact combinations with realistic technical depth
interface SeedBlueprintRecipe {
  readonly codename: string
  readonly title: string
  readonly hook: string
  readonly problemStatement: string
  readonly solutionArchitecture: string
  readonly recommendedStack: readonly string[]
  readonly sprintMvpScope: string
  readonly feasibility: number
  readonly impact: number
  readonly novelty: number
  readonly hardwareIntensity: 'Pure Software' | 'Hybrid IoT' | 'Deep Hardware'
}

const RECIPE_REGISTRY: Record<string, SeedBlueprintRecipe> = {
  // Cleantech combinations
  'cleantech|health-workers|offline-mesh': {
    codename: 'PROJECT CRYOCACHE',
    title: 'Mesh-Synchronized Solar Cold-Chain Guardian',
    hook: 'Prevents vaccine spoilage across off-grid PHC outposts through decentralized temperature telemetry.',
    problemStatement: 'Remote medical posts in hilly regions suffer frequent transformer blackouts. Cold-chain storage excursions go undetected until vaccines are irreversibly degraded.',
    solutionArchitecture: 'A distributed array of low-power temperature logger pucks transmitting over 868MHz LoRa mesh to an ambulance or relay node without requiring cellular backhaul.',
    recommendedStack: ['ESP32-C3', 'DS18B20 Temp Probe', 'LoRa SX1262', 'Rust / Embedded-HAL', 'SQLite Edge'],
    sprintMvpScope: 'Two simulated sensor nodes transmitting live mock temperatures + alert state to an offline web dashboard via serial bridge.',
    feasibility: 92,
    impact: 96,
    novelty: 89,
    hardwareIntensity: 'Hybrid IoT',
  },
  'cleantech|farmers|ultra-low-power': {
    codename: 'PROJECT TERRAVOLT',
    title: 'Self-Powered Sub-Canopy Soil Moisture Beacon',
    hook: 'Energy-harvesting micro-probes for precision micro-irrigation with zero battery replacements.',
    problemStatement: 'Marginal paddy and vegetable farmers over-irrigate by 40% because commercial soil sensors either require expensive solar panels or battery swaps every few months.',
    solutionArchitecture: 'Soil microbial fuel cell + miniature solar harvester running an ultra-deep sleep micro-controller that pulses soil dielectric permittivity readings once every 30 minutes.',
    recommendedStack: ['ATtiny1616', 'Capacitive Soil Probe v2', 'BQ25504 Solar Harvester', 'BLE 5.0 Long Range', 'WebBluetooth PWA'],
    sprintMvpScope: 'Working breadboard harvesting capacitor power and broadcasting BLE telemetry to an offline mobile PWA.',
    feasibility: 85,
    impact: 91,
    novelty: 94,
    hardwareIntensity: 'Deep Hardware',
  },
  'cleantech|makerspaces|sub-15-bom': {
    codename: 'PROJECT AMPGUARD',
    title: 'Sub-₹1000 Smart Shunt & Microgrid Balancer',
    hook: 'Democratizes lab-grade energy profiling for student hardware workstations to prevent transformer trips.',
    problemStatement: 'College makerspaces face circuit tripping during peak 3D printer and soldering iron usage, causing failed 14-hour prints and power equipment damage.',
    solutionArchitecture: 'Non-invasive split-core current transformer paired with zero-crossing triac switches that dynamically sheds non-critical thermal loads when total bench draw nears breaker limits.',
    recommendedStack: ['ESP8266', 'SCT-013 CT Sensor', 'ADS1115 ADC', 'WebSockets', 'Chart.js Dashboard'],
    sprintMvpScope: 'Functional high-precision AC current monitor that simulates auto-tripping a secondary relay when power exceeds a 500W test threshold.',
    feasibility: 95,
    impact: 88,
    novelty: 83,
    hardwareIntensity: 'Hybrid IoT',
  },

  // Healthcare combinations
  'healthcare|elderly-assist|screenless': {
    codename: 'PROJECT VIBROCARE',
    title: 'Haptic Spatial Orientation & Tremor Compensator',
    hook: 'Wearable closed-loop motor guidance band for Parkinson’s and neuropathy patients without screens.',
    problemStatement: 'Elderly patients with essential tremor or cognitive decline struggle to operate screen-based assistive apps, while accidental falls go uncorrected in early stages.',
    solutionArchitecture: 'Wrist/forearm band with dual 6-axis IMUs and ERM vibration arrays that delivers subtle directional rhythmic entrainment pulses to counter gait freezing and tremor resonance.',
    recommendedStack: ['RP2040 MCU', 'MPU-6050 6-DoF', 'DRV2605L Haptic Driver', 'MicroPython', 'Low-Jitter PWM'],
    sprintMvpScope: 'Wrist prototype detecting sudden tremor frequency spikes and firing alternating rhythmic pulses to restore cadence.',
    feasibility: 88,
    impact: 95,
    novelty: 93,
    hardwareIntensity: 'Deep Hardware',
  },
  'healthcare|health-workers|sub-50ms-edge': {
    codename: 'PROJECT PULSENET',
    title: 'Deterministic Edge Phonocardiogram Classifier',
    hook: 'Sub-50ms on-device acoustic murmur detection transforming standard stethoscopes into triage tools.',
    problemStatement: 'Under-resourced health outposts lack resident cardiologists. Pediatric heart defects and rheumatic heart diseases are diagnosed too late.',
    solutionArchitecture: '3D-printed acoustic chest piece with piezoelectric mic running an 8-bit quantized 1D-CNN on an edge processor to classify normal vs abnormal valve sounds in under 40 milliseconds.',
    recommendedStack: ['ESP32-S3', 'I2S MEMS Mic (INMP441)', 'TensorFlow Lite Micro', 'Edge Impulse SDK', 'FastAPI'],
    sprintMvpScope: 'Live audio capture of simulated heart valve WAV files running inference on-device and lighting a triage status indicator.',
    feasibility: 87,
    impact: 97,
    novelty: 95,
    hardwareIntensity: 'Hybrid IoT',
  },

  // Edge AI combinations
  'edge-ai|makerspaces|sub-50ms-edge': {
    codename: 'PROJECT SPECTER-GUARD',
    title: 'Sub-50ms Computer Vision Safety Interlock',
    hook: 'Optical PPE & safe-zone enforcer that hardware-cuts machinery power before contact occurs.',
    problemStatement: 'Campus machine shops and fabrication benches suffer hand injuries and eye hazards when students bypass safety protocols on lathes, saws, and laser cutters.',
    solutionArchitecture: 'Standalone edge camera module tracking hand-blade proximity and safety eyewear compliance at 30 FPS locally, driving an opto-isolated solid-state interlock relay.',
    recommendedStack: ['Seeed Grove Vision AI v2', 'YOLOv8n-pose Quantized', 'Optocoupled Relay', 'C++ / TinyML', 'WebRTC Stream'],
    sprintMvpScope: 'Interactive webcam demo simulating a machine shut-off signal instantly whenever hands cross a defined virtual intrusion boundary.',
    feasibility: 90,
    impact: 93,
    novelty: 88,
    hardwareIntensity: 'Hybrid IoT',
  },
  'edge-ai|first-responders|offline-mesh': {
    codename: 'PROJECT FALCON-BEACON',
    title: 'Acoustic Human Distress Locator for Rubble Mesh',
    hook: 'Decentralized microphone clusters detecting rhythmic tapping and vocal distress during disasters.',
    problemStatement: 'In collapsed structures or landslide zones, thermal drones fail through mud and concrete while cellular towers are dead, delaying search & rescue in the golden 24 hours.',
    solutionArchitecture: 'Ruggedized throwable sensor pods featuring acoustic beamforming arrays that triangulate sound origin coordinates and broadcast SOS vectors over LoRa mesh to rescuers.',
    recommendedStack: ['STM32F4', 'Dual PDM Microphones', 'SX1262 LoRa Node', 'DSP Cross-Correlation', 'Leaflet Offline Map'],
    sprintMvpScope: 'Two breadboard nodes triangulating an audio tap time-difference-of-arrival (TDoA) and rendering distance on a rescue HUD.',
    feasibility: 83,
    impact: 98,
    novelty: 96,
    hardwareIntensity: 'Hybrid IoT',
  },

  // FinTech combinations
  'fintech|merchants|offline-mesh': {
    codename: 'PROJECT LEDGER-MESH',
    title: 'Zero-Connectivity Dual-Signed Token Voucher',
    hook: 'NFC and audio-frequency cryptographic payment exchange operating completely without cellular networks.',
    problemStatement: 'Floods, network outages, and rural market dead zones bring daily wage vendor transactions to a complete standstill.',
    solutionArchitecture: 'Cryptographic offline transaction tokens exchanged via NFC or dual ultrasonic chimes, signed with hardware secure element private keys and batch-reconciled when online.',
    recommendedStack: ['Web NFC API', 'Ed25519 Cryptography', 'IndexedDB Offline Cache', 'Node.js Engine', 'Next.js PWA'],
    sprintMvpScope: 'Two phone browsers in Airplane Mode transacting digital tokens back-and-forth using QR/NFC, verifying cryptographic balances locally.',
    feasibility: 93,
    impact: 92,
    novelty: 91,
    hardwareIntensity: 'Pure Software',
  },
  'fintech|merchants|tamper-proof': {
    codename: 'PROJECT MICRO-STAMP',
    title: 'Hardware-Anchored Daily Repayment Proof Box',
    hook: 'Cryptographic IoT proof-of-work box that unlocks micro-capital for informal street vendors.',
    problemStatement: 'Street food vendors and flower sellers pay 10% daily interest to predatory loan sharks due to lack of verifiable business credit histories.',
    solutionArchitecture: 'Tamper-resistant battery-backed counter box that cryptographically timestamps daily cash inflows and generates verifiable zero-knowledge proofs for credit unions.',
    recommendedStack: ['ATECC608A Secure Element', 'ESP32', 'Thermal Printer Protocol', 'Zero-Knowledge Groth16', 'React Web Portal'],
    sprintMvpScope: 'Functional transaction logger producing signed JSON-LD receipts with simulated ZK credit scoring verification.',
    feasibility: 89,
    impact: 94,
    novelty: 90,
    hardwareIntensity: 'Hybrid IoT',
  },

  // AgriTech combinations
  'agritech|farmers|sub-15-bom': {
    codename: 'PROJECT SILOCURE',
    title: 'Sub-₹500 Acoustic Grain Moisture & Weevil Sensor',
    hook: 'Early bio-acoustic infestation detection inside grain storage silos before crop damage occurs.',
    problemStatement: 'Kerala farmers lose up to 18% of stored paddy harvest to insect larvae and fungal moisture spoilage because testing requires expensive moisture meters.',
    solutionArchitecture: 'Contact probe microphone attached to grain bin walls running acoustic frequency filtering to detect micro-vibrations from larval feeding days before visible infestation.',
    recommendedStack: ['Piezo Contact Disc', 'LM358 Operational Amplifier', 'ESP32 ADC', 'FFT Frequency Binning', 'SMS Gateway'],
    sprintMvpScope: 'Piezo sensor picking up mock grain scratching sounds, displaying real-time FFT frequency spikes on an oscilloscope web UI.',
    feasibility: 94,
    impact: 95,
    novelty: 92,
    hardwareIntensity: 'Hybrid IoT',
  },

  // Civic Tech combinations
  'civic-tech|first-responders|offline-mesh': {
    codename: 'PROJECT HYDRO-GRID',
    title: 'Decentralized River Basin Flash-Flood Telemetry',
    hook: 'Autonomous river level nodes alerting downstream bridges and panchayats before deluge arrives.',
    problemStatement: 'Mountainous flash floods surge faster than centralized disaster warnings can be broadcast through official bureaucratic channels.',
    solutionArchitecture: 'Solar ultrasonic rangefinder nodes installed along river bridges, communicating upstream-to-downstream via long-range 433MHz hops to sound local sirens automatically.',
    recommendedStack: ['JSN-SR04T Waterproof Ultrasonic', 'ATmega328P', 'Ebyte LoRa 1W Module', 'PlatformIO', 'Siren Relay Driver'],
    sprintMvpScope: 'Ultrasonic sensor triggering a simulated village alarm when water level crosses critical flood threshold.',
    feasibility: 96,
    impact: 99,
    novelty: 87,
    hardwareIntensity: 'Hybrid IoT',
  },
  'civic-tech|elderly-assist|screenless': {
    codename: 'PROJECT SENTRY-CHIME',
    title: 'Community Micro-Mesh Audio Emergency Beacon',
    hook: 'One-touch physical alert beacon pinging verified neighborhood ward volunteers within 200 meters.',
    problemStatement: 'Seniors living alone during power outages or acute distress cannot navigate smartphone unlock patterns, emergency dialers, or WhatsApp groups.',
    solutionArchitecture: 'Single tactile panic latch in a pocketable keyfob that broadcasts encrypted RF beacons picked up by neighboring street nodes, flashing localized porch chimes.',
    recommendedStack: ['nRF52840', 'ESP-NOW Protocol', 'Addressable Neopixels', 'Piezo Buzzer Matrix', 'C++ Firmware'],
    sprintMvpScope: 'Keyfob trigger hardware broadcasting to two independent receiver modules within 10ms with zero internet required.',
    feasibility: 94,
    impact: 96,
    novelty: 89,
    hardwareIntensity: 'Hybrid IoT',
  },
}

/**
 * Procedural Synthesis Algorithm
 * When a specific combination is in the curated registry, it returns the tuned recipe.
 * Otherwise, it systematically composes an authentic, realistic engineering brief
 * based on the domain, target, and constraint semantics!
 */
export function synthesizeBlueprint(
  domainId: string,
  targetId: string,
  constraintId: string,
  mode: 'software' | 'hybrid' | 'deep' = 'hybrid'
): BlueprintSynthesis {
  const compositeKey = `${domainId}|${targetId}|${constraintId}`
  const cached = RECIPE_REGISTRY[compositeKey]

  const domain = TRACK_DOMAINS.find((d) => d.id === domainId) || TRACK_DOMAINS[0]
  const target = TARGET_AUDIENCES.find((t) => t.id === targetId) || TARGET_AUDIENCES[0]
  const constraint = ENGINEERING_CONSTRAINTS.find((c) => c.id === constraintId) || ENGINEERING_CONSTRAINTS[0]

  if (cached) {
    return {
      id: `SYN-${domain.id.toUpperCase()}-${Math.abs(hashString(compositeKey)).toString(16).slice(0, 4)}`,
      codename: cached.codename,
      title: cached.title,
      hook: cached.hook,
      problemStatement: cached.problemStatement,
      solutionArchitecture: cached.solutionArchitecture,
      recommendedStack: cached.recommendedStack,
      sprintMvpScope: cached.sprintMvpScope,
      metrics: {
        feasibility: cached.feasibility,
        impact: cached.impact,
        novelty: cached.novelty,
        hardwareIntensity: cached.hardwareIntensity,
      },
    }
  }

  // Procedural dynamic generation (handcrafted semantic synthesis)
  const hash = Math.abs(hashString(compositeKey))
  const idNumber = (hash % 900) + 100
  const codenameSuffixes = ['VENTURE', 'VECTOR', 'REACTOR', 'NEXUS', 'PULSE', 'SHIELD', 'FORGE', 'BEACON']
  const selectedCodename = `PROJECT ${domain.tag.split(' ')[0]}-${codenameSuffixes[hash % codenameSuffixes.length]}`

  const generatedTitle = generateProceduralTitle(domain, target, constraint)
  const generatedHook = `Engineered specifically for ${target.label.toLowerCase()} confronting ${domain.name.toLowerCase()} barriers under ${constraint.label.toLowerCase()} conditions.`
  
  const generatedProblem = `${target.label} frequently face critical bottlenecks in ${domain.name.toLowerCase()} due to lack of reliable infrastructure. Existing market tools fail because they assume continuous connectivity, high budgets, or complex interfaces.`
  
  const generatedSolution = `A purpose-built ${mode === 'software' ? 'decentralized software framework' : mode === 'deep' ? 'custom hardware-integrated unit' : 'hybrid embedded IoT architecture'} designed around ${constraint.spec.toLowerCase()} to deliver reliable, fault-tolerant execution for ${target.label.toLowerCase()}.`

  const stacksByDomain: Record<string, string[]> = {
    cleantech: ['ESP32', 'INA219 Power Monitor', 'MQTT / WebSockets', 'Tailwind CSS', 'FastAPI'],
    healthcare: ['RP2040 MCU', 'Bio-Amp Front End', 'TensorFlow Lite Micro', 'BLE PWA', 'ChartJS'],
    'edge-ai': ['Seeed Grove AI', 'YOLOv8-tiny', 'WebRTC', 'OpenCV Python', 'Embedded C++'],
    fintech: ['Ed25519 Crypto', 'IndexedDB Storage', 'Web NFC', 'NodeJS Microservice', 'Tailwind'],
    agritech: ['Capacitive Sensor', 'LoRaWAN SX1276', 'PlatformIO', 'Leaflet GIS', 'FastAPI'],
    'civic-tech': ['JSN-SR04T Sensor', 'ESP-NOW Mesh', 'SMS Twilio / GSM', 'React', 'PostgreSQL'],
  }

  const stack = stacksByDomain[domain.id] || ['ESP32', 'FastAPI', 'React', 'WebSockets', 'LoRa']

  return {
    id: `SYN-${domain.id.toUpperCase().slice(0, 3)}-${idNumber}`,
    codename: selectedCodename,
    title: generatedTitle,
    hook: generatedHook,
    problemStatement: generatedProblem,
    solutionArchitecture: generatedSolution,
    recommendedStack: stack,
    sprintMvpScope: `Deliver a working prototype validating the core telemetry feedback loop with interactive demonstration within the 24-hour sprint.`,
    metrics: {
      feasibility: 82 + (hash % 15),
      impact: 86 + ((hash >> 2) % 13),
      novelty: 84 + ((hash >> 4) % 14),
      hardwareIntensity: mode === 'software' ? 'Pure Software' : mode === 'deep' ? 'Deep Hardware' : 'Hybrid IoT',
    },
  }
}

function generateProceduralTitle(domain: TrackDomain, target: TargetAudience, constraint: EngineeringConstraint): string {
  const domainKeywords: Record<string, string[]> = {
    cleantech: ['Microgrid Balancer', 'Energy Harvester', 'Power Guard', 'Thermal Cache'],
    healthcare: ['Triage Sentinel', 'Vitals Telemetry Hub', 'Assistive Monitor', 'Diagnostic Node'],
    'edge-ai': ['Optical Safety Interlock', 'Acoustic Defect Detector', 'Vision Sentinel', 'Smart Actuator'],
    fintech: ['P2P Offline Ledger', 'Cryptographic Proof Box', 'Micro-Credit Stamp', 'Provenance Beacon'],
    agritech: ['Soil Bio-Probe', 'Grain Moisture Guardian', 'Crop Micro-Weather Node', 'Irrigation Governor'],
    'civic-tech': ['Flood Warning Mesh', 'Emergency Mesh Beacon', 'Ward Telemetry Post', 'Dynamic Evac Link'],
  }

  const list = domainKeywords[domain.id] || ['Smart System Unit']
  const keyword = list[Math.abs(hashString(domain.id + target.id + constraint.id)) % list.length]
  const targetLabel = target.label.split('&')[0].trim()
  return `${keyword} for ${targetLabel}`
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}
