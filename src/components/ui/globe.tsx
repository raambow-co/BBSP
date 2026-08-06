"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

function cn(
  ...classes: (string | undefined | null | boolean | Record<string, boolean>)[]
) {
  return classes.filter(Boolean).join(" ")
}

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: window.devicePixelRatio,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [165 / 255, 206 / 255, 224 / 255],
  markerColor: [16 / 255, 54 / 255, 125 / 255],
  glowColor: [235 / 255, 235 / 255, 235 / 255],
  markers: [],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<any>(null)

  const phiRef = useRef(0)
  const widthRef = useRef(0)

  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)

  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value

    if (canvasRef.current) {
      canvasRef.current.style.cursor =
        value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current

      pointerInteractionMovement.current = delta

      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const measure = () => {
      if (!canvasRef.current?.parentElement) return

      widthRef.current =
        canvasRef.current.parentElement.getBoundingClientRect().width
    }

    measure()

    const resizeObserver = new ResizeObserver(() => {
      measure()
    })

    resizeObserver.observe(canvasRef.current.parentElement!)

    requestAnimationFrame(() => {
      if (!canvasRef.current) return

      if (widthRef.current === 0) return

      globeRef.current = createGlobe(canvasRef.current, {
        ...config,

        width: widthRef.current * 2,
        height: widthRef.current * 2,

        onRender: (state) => {
          if (!pointerInteracting.current) {
            phiRef.current += 0.005
          }

          state.phi = phiRef.current + rs.get()

          state.width = widthRef.current * 2
          state.height = widthRef.current * 2
        },
      })

      canvasRef.current.style.opacity = "1"
    })

    return () => {
      globeRef.current?.destroy()
      resizeObserver.disconnect()
    }
  }, [config, rs])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[650px] flex items-center justify-center",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-500 cursor-grab"
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX)
          }
        }}
      />
    </div>
  )
}