import React, { useRef, useEffect } from 'react'

function CanvasComponent() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Clear previous drawings
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Draw a rectangle
    context.fillStyle = '#FF0000'
    context.fillRect(20, 20, 150, 100)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width="400"
      height="300"
      style={{ border: '1px solid #000000' }}
    />
  )
}

export default CanvasComponent
