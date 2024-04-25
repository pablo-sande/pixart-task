import { RefObject, useEffect } from 'react'

export const useCanvas = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    draw?: (canvas: HTMLCanvasElement) => void
) => {
    useEffect(() => {
        const canvas = canvasRef?.current

        if (canvas && draw) {
            draw(canvas)
        }
    }, [draw])

    return canvasRef
}
