import { useEffect, useState } from 'react'

export function FollowMouse() {
    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({ x: -20, y: -20 })

    useEffect(() => {
      const handleMove = (event) => {
        const { clientX, clientY } = event
        setPosition({ x: clientX, y: clientY })
      }

      if (enabled) {
        window.addEventListener('pointermove', handleMove)
      }

      return () => {
        window.removeEventListener('pointermove', handleMove)
      }
    }, [enabled])

    useEffect(() => {
      document.body.classList.toggle('no-cursor', enabled)

      return () => {
        document.body.classList.remove('no-cursor')
      }
    }, [enabled])

    return (
      <>
        <div style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -15,
          top: -15,
          width: 30,
          height: 30,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        />
        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Desactivar' : 'Activar'} seguimiento
        </button>
      </>
    )
  }