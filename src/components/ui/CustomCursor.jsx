import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 1024) return

    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    document.addEventListener('mousemove', move)

    const animate = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      // Ring follows with lerp
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    const handleEnter = () => setHovering(true)
    const handleLeave = () => setHovering(false)
    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
      // Clean up hover listeners to avoid memory leaks
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot hidden lg:block" />
      <div ref={ring} className={`cursor-ring hidden lg:block ${hovering ? 'expanded' : ''}`} />
    </>
  )
}
