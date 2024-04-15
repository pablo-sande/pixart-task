import { useEffect, useRef } from "react"
import { ContextOptions } from "../components/Canvas"

export const useCanvas = ((draw: (ctx: CanvasRenderingContext2D) => void, options: ContextOptions) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext(options.context, { alpha: options.alpha, willReadFrequently: options.willReadFrequently})
        
        if (canvas && ctx && draw) {
            draw(ctx)
        }
    }, [draw, options])

    
    return canvasRef
})
