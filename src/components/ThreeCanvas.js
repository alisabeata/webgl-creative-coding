import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

function ThreeCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const canvas = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    // Setup orthographic camera
    const aspect = window.innerWidth / window.innerHeight
    const d = 10 // an arbitrary value representing half the size of the view we want to see
    const camera = new THREE.OrthographicCamera(
      // Parameters: left, right, top, bottom, near, far
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    canvas.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 500)
    pointLight.position.set(-10, 1, 20)
    scene.add(pointLight)

    // Cube grid setup
    const cubeSize = 1
    const gridSpacing = 2
    const gridSize = 10 // 5x5 grid of cubes
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const material = new THREE.MeshStandardMaterial({
      color: 0x72888e,
      metalness: 0.1,
      roughness: 0.8,
    })

    const cubes = [] // Array to store cubes

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(
          i * gridSpacing - (gridSize / 2) * gridSpacing, // Offset to center the grid
          0,
          j * gridSpacing - (gridSize / 2) * gridSpacing,
        )
        // Assign random rotation speeds
        const rotationSpeedX = Math.random() * 0.02 - 0.01 // Random speed between -0.01 and 0.01
        const rotationSpeedY = Math.random() * 0.02 - 0.01
        cubes.push({ cube, rotationSpeedX, rotationSpeedY })
        scene.add(cube)
      }
    }

    camera.position.x = 0
    camera.position.y = 10
    camera.position.z = 2
    camera.lookAt(0, 0, 0)

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate)

      // Update each cube's rotation based on its unique speeds
      cubes.forEach(({ cube, rotationSpeedX, rotationSpeedY }) => {
        cube.rotation.x += rotationSpeedX
        cube.rotation.y += rotationSpeedY
      })

      renderer.render(scene, camera)
    }

    animate()

    // Clean up on unmount
    return () => {
      canvas.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} />
}

export default ThreeCanvas
