import CountUpModule from 'react-countup'
import { useInView } from 'react-intersection-observer'

const CountUp = CountUpModule?.default ?? CountUpModule

export default function AnimatedCounter({ end, prefix = '', suffix = '', decimals = 0, duration = 2, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          separator="."
          decimal=","
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}
