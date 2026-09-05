const STOPS = [
  { label: 'Assess', detail: 'Map current skills against live industry demand' },
  { label: 'Close the gap', detail: 'Targeted courses, workshops, mentorship' },
  { label: 'Apply', detail: 'Matched internships and entry-level roles' },
  { label: 'Prove it', detail: 'Verified portfolio, ready for placement' },
]

export function PathwayDiagram() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 640 120" className="w-full text-teal-300" aria-hidden="true">
        <line x1="40" y1="60" x2="600" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
        {STOPS.map((_, i) => {
          const x = 40 + i * ((600 - 40) / (STOPS.length - 1))
          return <circle key={i} cx={x} cy="60" r={i === STOPS.length - 1 ? 7 : 5.5} className="fill-teal-500" />
        })}
      </svg>
      <ol className="mt-1 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
        {STOPS.map((stop, i) => (
          <li key={stop.label}>
            <p className="text-xs font-medium text-teal-600">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-0.5 font-display text-base text-ink">{stop.label}</p>
            <p className="mt-0.5 text-sm text-ink-faint">{stop.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
