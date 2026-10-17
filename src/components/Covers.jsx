// Designed cover graphics for each project (swap for real screenshots later).
const ink = '#1c1d2c', navy = '#262a48', soft = '#8b8c98', card = '#fbfaf6', line = '#d9d6cb', acc = '#4c4fc0'

function Llm() {
  // a falling loss curve + kernel speed-up bars
  const pts = Array.from({ length: 40 }, (_, i) => {
    const x = 40 + i * 9
    const y = 222 - 150 * Math.exp(-i / 9) + Math.sin(i * 1.7) * 4
    return `${x},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg viewBox="0 0 440 340" fill="none">
      <rect x="20" y="20" width="400" height="230" rx="14" fill={card} stroke={line} />
      <text x="40" y="48" fontFamily="Geist Mono, monospace" fontSize="10" fill={soft}>TRAIN LOSS · 2.4B TOKENS</text>
      {[90, 140, 190].map((y) => <line key={y} x1="40" x2="400" y1={y} y2={y} stroke={line} strokeDasharray="2 4" />)}
      <polyline points={pts} stroke={navy} strokeWidth="2.5" />
      <circle cx="391" cy={222 - 150 * Math.exp(-39 / 9) + Math.sin(39 * 1.7) * 4} r="5" fill={acc} />
      <g fontFamily="Geist, sans-serif">
        <rect x="20" y="266" width="196" height="56" rx="12" fill={navy} />
        <text x="36" y="292" fontSize="22" fontWeight="700" fill={card}>1.9×</text>
        <text x="36" y="310" fontSize="10" fill="#c4c5da">fused softmax</text>
        <rect x="224" y="266" width="196" height="56" rx="12" fill={card} stroke={line} />
        <text x="240" y="292" fontSize="22" fontWeight="700" fill={ink}>−68%</text>
        <text x="240" y="310" fontSize="10" fill={soft}>inference memory</text>
      </g>
    </svg>
  )
}

function Vla() {
  return (
    <svg viewBox="0 0 440 340" fill="none" fontFamily="Geist, sans-serif">
      <rect x="30" y="24" width="260" height="292" rx="14" fill={card} stroke={line} />
      <text x="50" y="54" fontSize="12" fontWeight="600" fill={ink}>Job application</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(50 ${76 + i * 56})`}>
          <rect width="60" height="6" rx="3" fill={line} />
          <rect y="14" width="220" height="28" rx="8" fill="#f1efe8" stroke={i === 2 ? acc : line} strokeWidth={i === 2 ? 2 : 1} />
          {i < 2 && <rect x="10" y="25" width={110 - i * 30} height="6" rx="3" fill={navy} />}
          {i === 2 && <rect x="10" y="22" width="2" height="12" fill={acc} />}
        </g>
      ))}
      <path d="M232 262l10 26 4-11 11-4z" fill={ink} stroke={card} strokeWidth="1.5" />
      <circle cx="355" cy="120" r="52" stroke={line} strokeWidth="10" />
      <circle cx="355" cy="120" r="52" stroke={navy} strokeWidth="10" strokeDasharray={`${2 * Math.PI * 52 * 0.87} 999`} transform="rotate(-90 355 120)" strokeLinecap="round" />
      <text x="355" y="126" textAnchor="middle" fontSize="24" fontWeight="700" fill={ink}>87%</text>
      <text x="355" y="196" textAnchor="middle" fontSize="10" fill={soft} fontFamily="Geist Mono, monospace">ACTION ACCURACY</text>
      <rect x="306" y="226" width="100" height="26" rx="13" fill={navy} />
      <text x="356" y="243" textAnchor="middle" fontSize="10" fill={card}>Fill field →</text>
    </svg>
  )
}

function Search() {
  return (
    <svg viewBox="0 0 440 340" fill="none" fontFamily="Geist, sans-serif">
      <rect x="24" y="26" width="392" height="44" rx="22" fill={card} stroke={line} />
      <circle cx="50" cy="48" r="7" stroke={soft} strokeWidth="2" /><path d="M55 53l5 5" stroke={soft} strokeWidth="2" />
      <text x="68" y="52" fontSize="12" fill={ink}>who approved travel for the physics dept in May?</text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(24 ${88 + i * 42})`}>
          <rect width="392" height="34" rx="10" fill={i === 0 ? navy : card} stroke={i === 0 ? navy : line} />
          <rect x="14" y="13" width={150 - i * 26} height="8" rx="4" fill={i === 0 ? '#c4c5da' : line} />
          <text x="378" y="21" textAnchor="end" fontSize="10" fontFamily="Geist Mono, monospace" fill={i === 0 ? card : soft}>{(0.94 - i * 0.07).toFixed(2)}</text>
        </g>
      ))}
      <rect x="160" y="226" width="256" height="40" rx="14" fill={card} stroke={line} />
      <rect x="176" y="238" width="180" height="6" rx="3" fill={line} /><rect x="176" y="250" width="120" height="6" rx="3" fill={line} />
      <rect x="24" y="276" width="220" height="40" rx="14" fill={navy} />
      <rect x="40" y="288" width="150" height="6" rx="3" fill="#c4c5da" /><rect x="40" y="300" width="96" height="6" rx="3" fill="#c4c5da" />
      <text x="410" y="306" textAnchor="end" fontSize="10" fontFamily="Geist Mono, monospace" fill={soft}>62 TABLES</text>
    </svg>
  )
}

function Lander() {
  // a dashed descent trajectory onto a flagged pad, lander resting on it
  return (
    <svg viewBox="0 0 440 340" fill="none">
      <rect x="20" y="20" width="400" height="230" rx="14" fill={card} stroke={line} />
      <text x="40" y="48" fontFamily="Geist Mono, monospace" fontSize="10" fill={soft}>LANDING TRAJECTORY · WIND 18</text>
      {[0, 1, 2].map((i) => (
        <line key={i} x1={330 + i * 8} x2={384 + i * 8} y1={70 + i * 14} y2={70 + i * 14} stroke={line} strokeWidth="2" strokeLinecap="round" />
      ))}
      <line x1="40" x2="400" y1="226" y2="226" stroke={line} />
      <path d="M52 72 C 130 70, 214 100, 230 166" stroke={navy} strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <g transform="translate(230 226) scale(1.5) translate(-230 -226)">
        <rect x="194" y="222" width="72" height="4" rx="2" fill={navy} />
        {[196, 264].map((x) => (
          <g key={x}>
            <line x1={x} x2={x} y1="222" y2="198" stroke={navy} strokeWidth="1.2" />
            <path d={`M${x} 198 l10 4 -10 4z`} fill={navy} />
          </g>
        ))}
        <g stroke={navy} strokeWidth="2" strokeLinecap="round">
          <line x1="222" y1="210" x2="214" y2="222" />
          <line x1="238" y1="210" x2="246" y2="222" />
        </g>
        <path d="M224 192 h12 l5 18 h-22z" fill={navy} />
        <circle cx="230" cy="214" r="3.5" fill={acc} />
      </g>
      <g fontFamily="Geist, sans-serif">
        <rect x="20" y="266" width="196" height="56" rx="12" fill={navy} />
        <text x="36" y="292" fontSize="22" fontWeight="700" fill={card}>3.3×</text>
        <text x="36" y="310" fontSize="10" fill="#c4c5da">fewer crashes in wind</text>
        <rect x="224" y="266" width="196" height="56" rx="12" fill={card} stroke={line} />
        <text x="240" y="292" fontSize="22" fontWeight="700" fill={ink}>100%</text>
        <text x="240" y="310" fontSize="10" fill={soft}>landings, PPO from scratch</text>
      </g>
    </svg>
  )
}

export default function Cover({ kind }) {
  return { llm: <Llm />, vla: <Vla />, search: <Search />, lander: <Lander /> }[kind] ?? null
}
