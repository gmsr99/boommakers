/**
 * BoomMakers Logomark
 *
 * Orange rounded-square with a white lightning bolt — the bolt reads as
 * "BOOM" (impact, energy, speed) and doubles as the letter B with two
 * diagonal strokes. Scales cleanly from 28px (nav) to any larger size.
 */
export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BoomMakers"
    >
      {/* Background tile */}
      <rect width="40" height="40" rx="9" fill="#F97316" />

      {/* Lightning bolt — white, centred in the tile */}
      <path
        d="M23 6L12 22H19.5L15.5 34L28 18H20.5L23 6Z"
        fill="white"
      />
    </svg>
  )
}
