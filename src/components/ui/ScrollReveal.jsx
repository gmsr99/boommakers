import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  className = '',
  once = true,
}) {
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.1 })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
