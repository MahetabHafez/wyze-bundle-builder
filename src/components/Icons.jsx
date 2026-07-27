export function CameraIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path d="M4 8a2 2 0 0 1 2-2h1.2a2 2 0 0 0 1.6-.8l.4-.53A2 2 0 0 1 10.8 4h2.4a2 2 0 0 1 1.6.8l.4.53a2 2 0 0 0 1.6.8H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SensorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <rect x="6" y="9" width="12" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9V6.5A3 3 0 0 1 12 3.5v0a3 3 0 0 1 3 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="13.5" r="1.4" fill="currentColor" />
    </svg>
  )
}

export function GridIcon(props) {
  const dots = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      dots.push(<circle key={`${row}-${col}`} cx={6 + col * 6} cy={6 + row * 6} r="1.6" fill="currentColor" />)
    }
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      {dots}
    </svg>
  )
}

export function ChevronIcon({ direction = 'down', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'none', transition: 'transform 160ms ease' }}
      {...props}
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function MinusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function WyzeShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8.5 11.5l1.5 4 1-2.5 1 2.5 1.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TruckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function buildSmoothScallopPath(bumps = 10, cx = 50, cy = 50, outerR = 42, innerR = 38) {
  let path = ""
  const totalPoints = bumps * 2
  for (let i = 0; i < totalPoints; i++) {
    const angle1 = (i * Math.PI) / bumps
    const angle2 = ((i + 0.5) * Math.PI) / bumps
    const angle3 = ((i + 1) * Math.PI) / bumps

    const r1 = i % 2 === 0 ? outerR : innerR
    const r2 = i % 2 === 0 ? innerR : outerR
    const r3 = (i + 1) % 2 === 0 ? outerR : innerR

    const x1 = cx + r1 * Math.cos(angle1)
    const y1 = cy + r1 * Math.sin(angle1)
    const x2 = cx + r2 * Math.cos(angle2)
    const y2 = cy + r2 * Math.sin(angle2)
    const x3 = cx + r3 * Math.cos(angle3)
    const y3 = cy + r3 * Math.sin(angle3)

    if (i === 0) {
      path += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `
    }
    path += `Q ${x2.toFixed(2)} ${y2.toFixed(2)} ${x3.toFixed(2)} ${y3.toFixed(2)} `
  }
  return path + "Z"
}

const SCALLOP_PATH = buildSmoothScallopPath()

export function SealBadge({ size = 104, arcText = 'Try worry-free for 30 days ~ ' }) {
  return (
    <div className="seal-badge" style={{ width: size, height: size, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg className="seal-badge__shape" viewBox="0 0 100 100" width={size} height={size}>
        <path d={SCALLOP_PATH} fill="#5b32f1" />

        {/* circular path set in from the scalloped edge so the text doesn't collide with it */}
        <path id="seal-arc-text-path" d="M 18,50 A 32,32 0 1,1 82,50 A 32,32 0 1,1 18,50" fill="none" />

        {/* repeat the phrase around the full circumference */}
        <text style={{ fontSize: '4px', fill: '#ffffff', fontWeight: '400', letterSpacing: '0.4px' }}>
          <textPath href="#seal-arc-text-path" startOffset="0%" textAnchor="start">
            {arcText} {arcText} {arcText}
          </textPath>
        </text>
      </svg>

      <div className="seal-badge__text" style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', inset: 0, margin: 'auto', marginLeft: '-7px', transform: 'rotate(-10deg) translateY(-8px)', transformOrigin: 'top right' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1', color: '#fff', borderBottom: '1.5px solid rgba(255,255,255,0.85)', paddingBottom: '2px', marginBottom: '3px', width: '50%', letterSpacing: '-0.5px' }}>
          100%
        </span>
        <span style={{ fontSize: '6px', fontWeight: '600', color: '#fff', lineHeight: '1.15' }}>
          Wyze
        </span>
        <span style={{ fontSize: '6px', fontWeight: '500', color: '#fff', lineHeight: '1.15' }}>
          satisfaction
        </span>
        <span style={{ fontSize: '6px', fontWeight: '500', color: '#fff', lineHeight: '1.15' }}>
          guarantee
        </span>
      </div>
    </div>
  )
}

export const STEP_ICONS = {
  camera: CameraIcon,
  shield: ShieldIcon,
  sensor: SensorIcon,
  bolt: GridIcon,
}
