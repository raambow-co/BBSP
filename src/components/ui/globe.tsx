"use client"
 
import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"
 
function cn(...classes: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return classes.filter(Boolean).join(" ");
}
 
const MOVEMENT_DAMPING = 1400
 
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0, // Light background support
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [165 / 255, 206 / 255, 224 / 255], // Sky Blue land masses
  markerColor: [16 / 255, 54 / 255, 125 / 255], // Deep Blue markers
  glowColor: [235 / 255, 235 / 255, 235 / 255], // Light grey glow overlay
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
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
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
    let globe: any = null;

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    onResize();
 
    globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });
 
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);
 
    return () => {
      if (globe) globe.destroy();
      resizeObserver.disconnect();
    };
  }, [rs, config]);
 
  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[650px] flex items-center justify-center",
        className
      )}
    >
      <canvas
        className={cn(
          "w-full h-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size] cursor-grab"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
