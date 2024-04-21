import { RefObject, useEffect } from "react"
import { ContextOptions } from "../components/Canvas"

export const useCanvas = ((canvasRef: RefObject<HTMLCanvasElement | null>, options: ContextOptions, draw?: (canvas: HTMLCanvasElement, options: ContextOptions) => 
    void) => {

    useEffect(() => {
        const canvas = canvasRef?.current
        
        if (canvas && draw) {
            draw(canvas, options)
        }
    }, [draw, options])

    
    return canvasRef
})
