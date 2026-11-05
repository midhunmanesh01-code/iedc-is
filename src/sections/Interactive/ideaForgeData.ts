// ─────────────────────────────────────────────────────────────────────────────
// Idea Forge — Engineering Blueprint & Simulation Data
// Curated problem-space permutations & hardware specs for IDEA SPRINT 2026
// ─────────────────────────────────────────────────────────────────────────────

export interface Domain {
  readonly id: string
  readonly label: string
  readonly emoji: string
  readonly code: string
  readonly freq: string
  readonly brief: string
}

export interface Audience {
  readonly id: string
  readonly label: string
  readonly emoji: string
  readonly code: string
  readonly sector: string
  readonly context: string
}

export interface Constraint {
  readonly id: string
  readonly label: string
  readonly emoji: string
  readonly code: string
  readonly limit: string
  readonly rule: string
}

export interface PinoutDef {
  readonly pin: string
  readonly role: string
}

export interface CrisisScenario {
  readonly alert: string
  readonly response: string
  readonly outcome: string
}

export interface IdeaBrief {
  readonly codename: string
  readonly track: string
  readonly title: string
  readonly oneLiner: string
  readonly problem: string
  readonly direction: string
  readonly techHints: readonly string[]
  readonly mvp: string
  readonly difficulty: 'RECON' | 'TACTICAL' | 'HARDCORE' | 'OVERCLOCK' | 'EXTREME'
  readonly feasibility: number
  readonly bomEstimate: string
  readonly juryImpact: number
  readonly crisisScenario: CrisisScenario
  readonly pinoutDiagram: readonly PinoutDef[]
}

// ── The Three Orbital Vector Vectors ────────────────────────────────────────

export const DOMAINS: readonly Domain[] = [
  {
    id: 'cleantech',
    label: 'Clean Energy',
    emoji: '⚡',
    code: 'SEC-01',
    freq: '868.4 MHz',
    brief: 'Decentralized power, micro-storage, resource conservation.',
  },
  {
    id: 'healthcare',
    label: 'Health & Assistive',
    emoji: '🩺',
    code: 'SEC-02',
    freq: '433.2 MHz',
    brief: 'Accessible diagnostics, mobility aids, rural triage.',
  },
  {
    id: 'edge-ai',
    label: 'Edge TinyML',
    emoji: '🤖',
    code: 'SEC-03',
    freq: '2.400 GHz',
    brief: 'On-device neural inference, computer vision, smart actuators.',
  },
  {
    id: 'fintech',
    label: 'FinTech & Mesh',
    emoji: '💳',
    code: 'SEC-04',
    freq: '13.56 MHz',
    brief: 'Micro-finance, offline cryptotokens, supply provenance.',
  },
  {
    id: 'agritech',
    label: 'AgriTech & Bio',
    emoji: '🌱',
    code: 'SEC-05',
    freq: '915.0 MHz',
    brief: 'Precision irrigation, acoustic insect detection, harvest telemetry.',
  },
  {
    id: 'civic',
    label: 'Civic & Disaster',
    emoji: '🛡️',
    code: 'SEC-06',
    freq: '144.8 MHz',
    brief: 'Flash-flood early warning, resilient mesh comms, panic nodes.',
  },
]

export const AUDIENCES: readonly Audience[] = [
  {
    id: 'health-workers',
    label: 'Health Workers',
    emoji: '🏥',
    code: 'AUD-01',
    sector: 'Rural Primary Centers',
    context: 'Frontline responders in off-grid sub-centers and mobile vans.',
  },
  {
    id: 'farmers',
    label: 'Small Farmers',
    emoji: '👨‍🌾',
    code: 'AUD-02',
    sector: 'Smallholder Agriculture',
    context: 'Independent cultivators with under 2 acres and erratic rain.',
  },
  {
    id: 'students',
    label: 'Student Makers',
    emoji: '🔧',
    code: 'AUD-03',
    sector: 'Campus Makerspaces',
    context: 'Engineering students prototyping in FabLabs and workshops.',
  },
  {
    id: 'vendors',
    label: 'Street Vendors',
    emoji: '🏪',
    code: 'AUD-04',
    sector: 'Informal Commerce',
    context: 'Micro-merchants running cash-heavy daily transactions.',
  },
  {
    id: 'elderly',
    label: 'Senior Citizens',
    emoji: '👴',
    code: 'AUD-05',
    sector: 'Assisted Living',
    context: 'Motor-impaired individuals needing non-intrusive care.',
  },
  {
    id: 'responders',
    label: 'First Responders',
    emoji: '🚨',
    code: 'AUD-06',
    sector: 'Disaster Relief Teams',
    context: 'Rescue personnel operating under collapsed telecom grids.',
  },
]

export const CONSTRAINTS: readonly Constraint[] = [
  {
    id: 'offline',
    label: 'Zero Internet',
    emoji: '📡',
    code: 'CON-01',
    limit: '0.0 kbps WAN',
    rule: 'Must work with zero cellular/cloud connectivity — peer-to-peer only.',
  },
  {
    id: 'low-power',
    label: 'Zero Battery',
    emoji: '🔋',
    code: 'CON-02',
    limit: '< 15µA Sleep',
    rule: 'Self-powers via ambient micro-solar or piezo harvesting.',
  },
  {
    id: 'cheap',
    label: 'Sub-₹1200 BOM',
    emoji: '🪙',
    code: 'CON-03',
    limit: 'Max ₹1,200',
    rule: 'Total hardware bill-of-materials cost strictly under ₹1200.',
  },
  {
    id: 'fast-edge',
    label: 'Sub-50ms Latency',
    emoji: '⏱️',
    code: 'CON-04',
    limit: '< 50ms Edge',
    rule: 'All machine inference on-device with deterministic real-time response.',
  },
  {
    id: 'no-screen',
    label: 'Screenless UI',
    emoji: '🔇',
    code: 'CON-05',
    limit: '0 Pixels',
    rule: 'Zero graphical displays — purely acoustic, tactile, or haptic feedback.',
  },
  {
    id: 'tamper-proof',
    label: 'Tamper-Proof',
    emoji: '🔐',
    code: 'CON-06',
    limit: 'Ed25519 Signed',
    rule: 'Cryptographic offline verification with local append-only hashes.',
  },
]

// ── Curated Real-World Prototypes ──────────────────────────────────────────

const CURATED: Record<string, IdeaBrief> = {
  'cleantech|health-workers|offline': {
    codename: 'OP: CRYOCACHE-868',
    track: 'CLEAN ENERGY // OFFLINE SENSORS',
    title: 'Solar Cold-Chain Guardian',
    oneLiner: 'Prevent off-grid vaccine spoilage via decentralized LoRa thermal telemetry.',
    problem: 'Remote PHC outposts suffer unpredictable blackouts. Cold-chain excursions go undetected, spoiling vaccines before administration.',
    direction: 'Distributed micro-probes broadcasting live temperature histograms over LoRa to a solar base station.',
    techHints: ['ESP32-C3', 'DS18B20 Temp Probe', 'SX1262 LoRa 868MHz', 'SQLite Edge'],
    mvp: 'Two breadboard sensor nodes broadcasting live temperatures over LoRa to an offline dashboard, triggering alarm on breach.',
    difficulty: 'HARDCORE',
    feasibility: 96,
    bomEstimate: '₹840',
    juryImpact: 98,
    crisisScenario: {
      alert: '03:14 AM — PHC diesel generator runs dry. Ambient room temperature surges to 37.8°C.',
      response: 'ESP32-C3 wakes from deep sleep on threshold interrupt; transmits SOS beacon over 868MHz LoRa mesh.',
      outcome: 'District officer notified in 2.1s; auxiliary cold-box deployed. Zero vaccine loss.',
    },
    pinoutDiagram: [
      { pin: 'GPIO 4', role: 'OneWire Bus (DS18B20 Sealed Probe)' },
      { pin: 'GPIO 5/18/19', role: 'SPI Bus (SX1262 RF Transceiver)' },
      { pin: 'ADC 2', role: 'Supercapacitor Voltage Telemetry' },
      { pin: 'GPIO 21', role: 'Optocoupled 12V Siren Relay' },
    ],
  },

  'cleantech|farmers|low-power': {
    codename: 'OP: TERRA-BEACON',
    track: 'CLEAN ENERGY // MICRO-HARVESTING',
    title: 'Self-Powered Soil Moisture Beacon',
    oneLiner: 'Energy-harvesting micro-probes for precision irrigation with zero battery replacement.',
    problem: 'Small farmers over-irrigate by 40% because commercial soil sensors require expensive solar masts or frequent battery swaps.',
    direction: 'Soil microbial fuel cell + miniature solar harvester running an ultra-deep-sleep MCU pulsing moisture over BLE.',
    techHints: ['ATtiny1616', 'Capacitive Probe v1.2', 'BQ25504 Harvester', 'WebBluetooth PWA'],
    mvp: 'Breadboard harvesting capacitor charge and broadcasting real soil moisture data to a smartphone via BLE.',
    difficulty: 'OVERCLOCK',
    feasibility: 91,
    bomEstimate: '₹620',
    juryImpact: 95,
    crisisScenario: {
      alert: '02:45 AM — 48 hours of continuous heavy cloud cover drops ambient light to zero.',
      response: 'BQ25504 switches to microbial micro-current trickle charge; drops ping rate to 45m intervals.',
      outcome: 'Node maintains continuous capacitor voltage above 2.8V with zero data dropout.',
    },
    pinoutDiagram: [
      { pin: 'PA4 / ADC', role: 'Capacitive Moisture Sensor Readout' },
      { pin: 'PA7 / VOK', role: 'BQ25504 Power-Good Voltage Trigger' },
      { pin: 'PB2 / TX', role: 'Low-Energy UART RF Beacon' },
    ],
  },

  'healthcare|elderly|no-screen': {
    codename: 'OP: TREMOR-PULSE',
    track: 'HEALTHTECH // HAPTIC AID',
    title: 'Haptic Tremor Entrainment Band',
    oneLiner: 'Wearable rhythmic motor-guidance band for Parkinsonian patients with screenless feedback.',
    problem: 'Elderly patients suffering motor tremor cannot navigate touchscreens, while sudden gait freezing leads to dangerous falls.',
    direction: 'Forearm cuff with dual IMU motion sensors and linear resonant actuators firing directional cadenced pulses.',
    techHints: ['RP2040-Zero', 'MPU-6050 6-DoF', 'DRV2605L Haptic Driver', 'MicroPython'],
    mvp: 'Wrist prototype detecting tremor frequency spikes and firing alternating rhythmic pulses to break gait freezing.',
    difficulty: 'TACTICAL',
    feasibility: 94,
    bomEstimate: '₹950',
    juryImpact: 97,
    crisisScenario: {
      alert: '03:30 AM — Patient experiences sudden nocturnal freezing episode while attempting to reach light.',
      response: '6-DoF IMU identifies 4.5Hz tremor resonance; fires synchronized 2Hz tactile metronome cadence.',
      outcome: 'Freezing phase broken in 1.4 seconds; patient stabilizes balance without visual prompts.',
    },
    pinoutDiagram: [
      { pin: 'GPIO 4/5', role: 'I2C Bus (MPU-6050 Accelerometer + Gyro)' },
      { pin: 'GPIO 6/7', role: 'I2C Bus (DRV2605L Linear Resonant Actuator)' },
      { pin: 'GPIO 14', role: 'Tactile Override Emergency Pushswitch' },
    ],
  },

  'healthcare|health-workers|fast-edge': {
    codename: 'OP: PULSENET-S3',
    track: 'HEALTHTECH // ON-DEVICE TINYML',
    title: 'Acoustic Heart Murmur Classifier',
    oneLiner: 'Sub-50ms on-device cardiac phonocardiogram classifier converting standard stethoscopes into triage tools.',
    problem: 'Rural outposts lack pediatric cardiologists. Congenital heart defects and valve lesions are detected too late.',
    direction: 'Stethoscope chest-piece with MEMS microphone running quantized 1D-CNN on ESP32-S3 in under 40ms.',
    techHints: ['ESP32-S3', 'INMP441 MEMS Mic', 'TFLite Micro', 'Edge Impulse'],
    mvp: 'Working acoustic pickup running real-time neural inference, lighting triage status indicators for murmur vs normal.',
    difficulty: 'HARDCORE',
    feasibility: 93,
    bomEstimate: '₹1,150',
    juryImpact: 99,
    crisisScenario: {
      alert: '03:05 AM — Rural clinic power is severed; cellular signal completely dead.',
      response: 'ESP32-S3 executes full quantized 1D-CNN in internal SRAM with zero cloud dependencies in 38ms.',
      outcome: 'Aortic regurgitation pattern classified with 94.2% confidence; triage alert confirmed locally.',
    },
    pinoutDiagram: [
      { pin: 'GPIO 1/2/42', role: 'I2S Audio Bus (INMP441 MEMS Microphone)' },
      { pin: 'GPIO 38', role: 'Triage LED [GREEN = Normal]' },
      { pin: 'GPIO 39', role: 'Triage LED [AMBER = S3 Murmur Detected]' },
      { pin: 'GPIO 40', role: 'Triage LED [RED = Critical Regurgitation]' },
    ],
  },

  'edge-ai|students|fast-edge': {
    codename: 'OP: SPECTER-CUT',
    track: 'EDGE AI // WORKSHOP SAFETY',
    title: 'Optical PPE & Blade Safety Interlock',
    oneLiner: 'High-speed computer vision sentinel hardware-tripping workshop machinery before flesh hits the blade.',
    problem: 'College workshops suffer serious hand lacerations when student makers bypass safety guards on table saws and lathes.',
    direction: 'Edge camera tracking hand-to-blade boundary crossings at 45fps, driving an opto-isolated safety disconnect relay.',
    techHints: ['Grove Vision AI v2', 'YOLOv8-nano INT8', 'Opto-Relay 10A', 'WebRTC Debugger'],
    mvp: 'Webcam feed simulating machine emergency brake trip whenever a hand crosses a virtual danger perimeter.',
    difficulty: 'TACTICAL',
    feasibility: 97,
    bomEstimate: '₹1,100',
    juryImpact: 96,
    crisisScenario: {
      alert: '02:50 AM — Student maker loses grip on acrylic stock; hand drifts 15mm from high-speed blade.',
      response: 'YOLOv8-nano on-chip inference detects intrusion; asserts hardware interrupt pin within 32ms.',
      outcome: 'Optical relay de-energizes motor contactor in 41ms total elapsed time. Zero laceration.',
    },
    pinoutDiagram: [
      { pin: 'CSI Ribbon', role: 'OmniVision OV5647 Camera Sensor' },
      { pin: 'GPIO 16', role: 'Opto-Isolated Triac Motor Contactor' },
      { pin: 'GPIO 17', role: 'Audio Strobe Safety Alarm' },
    ],
  },

  'fintech|vendors|offline': {
    codename: 'OP: VOUCHER-MESH',
    track: 'FINTECH // AIRPLANE-MODE COMMERCE',
    title: 'Cryptographic Offline Voucher Link',
    oneLiner: 'NFC/WebAudio cryptographic token exchanges operating completely in airplane mode during floods.',
    problem: 'Natural disasters and cellular blackouts freeze street vendor commerce, trapping informal workers with zero liquidity.',
    direction: 'Asymmetric signed vouchers exchanged via NFC tags or encrypted audio chirps with local cryptographic ledger.',
    techHints: ['Web NFC API', 'Ed25519 Cryptography', 'IndexedDB Key-Store', 'Next.js PWA'],
    mvp: 'Two smartphones in Airplane Mode trading digital vouchers over NFC/QR with instant local cryptographic verification.',
    difficulty: 'TACTICAL',
    feasibility: 98,
    bomEstimate: '₹0 (Pure Web/PWA)',
    juryImpact: 95,
    crisisScenario: {
      alert: '03:12 AM — Cellular towers flooded during monsoon surge; all UPI payment gateways unreachable.',
      response: 'Ed25519 local keypair signs token exchange; stores SHA-256 hash in offline IndexedDB vault.',
      outcome: 'Transaction confirmed in 80ms over Web NFC; settles instantly when cellular returns.',
    },
    pinoutDiagram: [
      { pin: 'NFC Antenna', role: '13.56 MHz Near-Field Token Exchange' },
      { pin: 'Audio DAC', role: 'Ultrasonic FSK Audio Chirp Backup Link' },
      { pin: 'Secure Enclave', role: 'Hardware-Backed Private Key Storage' },
    ],
  },

  'agritech|farmers|cheap': {
    codename: 'OP: SILOCURE-FFT',
    track: 'AGRITECH // BIO-ACOUSTIC MONITORING',
    title: 'Grain Weevil Larvae Acoustic Sensor',
    oneLiner: 'Sub-₹500 contact microphone detecting insect larvae scratching inside grain silos before spoilage begins.',
    problem: 'Kerala farmers lose up to 18% of stored paddy harvest to insect larvae; commercial acoustic probes cost over ₹15,000.',
    direction: 'Piezo contact disc clamped to bin wall running bandpass amplification and 64-bin FFT on an ESP32 ADC.',
    techHints: ['Piezo Disc 27mm', 'LM358 High-Gain OpAmp', 'ESP32 ADC', 'FFT Binning'],
    mvp: 'Piezo sensor picking up mock grain scratching with live FFT spike detection displayed on an offline web UI.',
    difficulty: 'TACTICAL',
    feasibility: 96,
    bomEstimate: '₹420',
    juryImpact: 98,
    crisisScenario: {
      alert: '03:22 AM — Heavy monsoon rain drums against silo exterior, producing 75dB broadband acoustic rumble.',
      response: 'Analog RC bandpass filter (1.2kHz–3.5kHz) strips rain noise; 64-bin FFT isolates 2.2kHz larval feeding clicks.',
      outcome: 'Infestation localized to lower hopper 4 days prior to visual signs. Zero crop loss.',
    },
    pinoutDiagram: [
      { pin: 'ADC 1 / GPIO 34', role: 'LM358 Pre-Amplified Acoustic Signal' },
      { pin: 'GPIO 25', role: 'Threshold Alarm Indicator' },
      { pin: 'GPIO 26/27', role: 'I2C OLED Micro-Display Header' },
    ],
  },

  'civic|responders|offline': {
    codename: 'OP: DELUGE-NET',
    track: 'CIVIC RESILIENCE // FLOOD SENSORS',
    title: 'Autonomous River Flash-Flood Mesh',
    oneLiner: 'Autonomous ultrasonic river-level nodes broadcasting flood waves downstream via 433MHz LoRa.',
    problem: 'Mountain flash-floods surge faster than centralized disaster warnings can pass through government bureaucracies.',
    direction: 'Solar bridge-mounted waterproof ultrasonic nodes hopping water delta data downstream to trigger village sirens.',
    techHints: ['JSN-SR04T Waterproof', 'ATmega328P / Nano', 'Ebyte LoRa 1W', 'Siren Relay Module'],
    mvp: 'Ultrasonic sensor triggering a simulated village alarm when water level crosses threshold distance.',
    difficulty: 'HARDCORE',
    feasibility: 95,
    bomEstimate: '₹1,180',
    juryImpact: 99,
    crisisScenario: {
      alert: '02:58 AM — Cloudburst in upper catchment causes 1.4m water surge in 6 minutes; fiber lines snap.',
      response: 'JSN-SR04T registers delta >20cm/min; LoRa node transmits broadcast emergency beacon packet at 1W RF.',
      outcome: 'Downstream siren node triggers 11.2km away in 340ms, providing 28-minute evacuation window.',
    },
    pinoutDiagram: [
      { pin: 'D2 / D3', role: 'Trigger & Echo (JSN-SR04T Waterproof Ultrasonic)' },
      { pin: 'D10 / D11 / D12', role: 'SPI Bus (Ebyte 433MHz LoRa 1W Module)' },
      { pin: 'D7', role: 'Optocoupled 230V Evacuation Siren Contactor' },
    ],
  },

  'civic|elderly|no-screen': {
    codename: 'OP: WARD-BEACON',
    track: 'CIVIC // SCREENLESS MUTUAL AID',
    title: 'Neighborhood Panic Micro-Keyfob',
    oneLiner: 'One-touch physical keyfob pinging verified ward volunteers within 200m with zero internet.',
    problem: 'Seniors living alone during power outages cannot navigate touchscreens or dial emergency numbers in panic.',
    direction: 'Tactile spring latch in a pocket keyfob that broadcasts encrypted RF beacons to neighboring street nodes.',
    techHints: ['nRF52840', 'ESP-NOW Protocol', 'Neopixels', 'Piezo Transducer'],
    mvp: 'Keyfob trigger broadcasting to two independent receivers within 10ms with zero internet connection.',
    difficulty: 'TACTICAL',
    feasibility: 98,
    bomEstimate: '₹750',
    juryImpact: 97,
    crisisScenario: {
      alert: '03:40 AM — Power outage plunges ward into darkness; 78-year-old resident experiences severe chest pain.',
      response: 'Physical latch pulled; nRF52840 transmits 2.4GHz broadcast beacon to 3 neighbor street receivers.',
      outcome: 'Volunteer alert sirens activate in 18ms; volunteer arrives at doorstep in 160 seconds.',
    },
    pinoutDiagram: [
      { pin: 'P0.13', role: 'Normally-Open Spring Panic Switch' },
      { pin: 'P0.15', role: 'Tactile Confirmation Vibration Disc' },
      { pin: 'P0.18', role: 'Ultra-Low Current Battery Voltage Monitor' },
    ],
  },
}

// ── Deterministic Generator For Any Permutation ─────────────────────────────

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

  const domain = DOMAINS.find((d) => d.id === domainId) ?? DOMAINS[0]
  const audience = AUDIENCES.find((a) => a.id === audienceId) ?? AUDIENCES[0]
  const constraint = CONSTRAINTS.find((c) => c.id === constraintId) ?? CONSTRAINTS[0]

  const hash = hashStr(key)
  const adjectives = ['Adaptive', 'Resilient', 'Distributed', 'Autonomous', 'Tactical', 'Decentralized']
  const nouns = ['Sentinel', 'Nexus', 'Beacon', 'Matrix', 'Relay', 'Telemetry Link', 'Grid']
  const adj = adjectives[hash % adjectives.length]
  const noun = nouns[(hash >> 2) % nouns.length]

  const title = `${adj} ${domain.label} ${noun}`
  const codename = `OP: ${noun.toUpperCase()}-${(hash % 900) + 100}`

  const difficulties: IdeaBrief['difficulty'][] = ['RECON', 'TACTICAL', 'HARDCORE', 'OVERCLOCK']
  const difficulty = difficulties[hash % difficulties.length]
  const feasibility = 90 + (hash % 9) // 90% - 98%
  const bomEstimate = `₹${450 + (hash % 12) * 60}`
  const juryImpact = 93 + (hash % 7) // 93% - 99%

  return {
    codename,
    track: `${domain.label.toUpperCase()} // ${constraint.label.toUpperCase()}`,
    title,
    oneLiner: `A 24-hour rapid engineering prototype solving critical ${domain.label.toLowerCase()} bottlenecks for ${audience.label.toLowerCase()} under strict ${constraint.label.toLowerCase()} constraints.`,
    problem: `${audience.label} face critical gaps in ${domain.label.toLowerCase()} because existing commercial systems require cloud infrastructure and budgets that do not exist in the field.`,
    direction: `A zero-dependency tactical hardware/software architecture engineered specifically around "${constraint.rule}".`,
    techHints: ['ESP32-S3', 'LoRa SX1262', 'IndexedDB', 'MicroPython / C++'],
    mvp: `A functional breadboard prototype delivering the primary data loop with live telemetry output demonstrated within the 24-hour sprint.`,
    difficulty,
    feasibility,
    bomEstimate,
    juryImpact,
    crisisScenario: {
      alert: `03:00 AM — Campus network goes down; external cloud API endpoints return HTTP 504 Gateway Timeout.`,
      response: `Prototype switches to local peer-to-peer data buffer; cryptographic queue syncs over RF link.`,
      outcome: `Zero telemetry loss; jury evaluation passes stress criteria with 100% data integrity.`,
    },
    pinoutDiagram: [
      { pin: 'GPIO 4/5', role: 'Primary Sensor Acquisition Bus' },
      { pin: 'GPIO 18/19', role: 'Local RF / Mesh Telemetry' },
      { pin: 'ADC 1', role: 'Power Harvesting Voltage Telemetry' },
    ],
  }
}
