import { useCanvas } from '../hooks/useCanvas'
import { RefObject, forwardRef } from 'react'

export type ContextOptions = {
    context: '2d'
    alpha: boolean
    willReadFrequently: boolean
}

export type CanvasProps = {
    id: string
    options: ContextOptions
    size: { width: number; height: number }
    zIndex: number
    draw?: (canvas: HTMLCanvasElement, options: ContextOptions) => void
    handleClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    handleMouseMove?: (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => void
}

export const Canvas = forwardRef(
    (
        {
            id,
            options,
            size,
            zIndex,
            draw,
            handleClick,
            handleMouseMove,
        }: CanvasProps,
        ref
    ) => {
        useCanvas(ref as RefObject<HTMLCanvasElement>, options, draw)

        return (
            <canvas
                id={id}
                width={size.width}
                height={size.height}
                ref={ref as RefObject<HTMLCanvasElement> | null}
                className="m-auto block absolute cursor-none"
                style={{
                    zIndex: zIndex,
                }}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
            />
        )
    }
)
