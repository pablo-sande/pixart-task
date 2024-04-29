import { useCanvas } from '@/hooks/useCanvas'
import { RefObject, forwardRef } from 'react'

export type CanvasProps = {
    id: string
    size: { width: number; height: number }
    zIndex: number
    draw?: (canvas: HTMLCanvasElement) => void
    handleClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    handleMouseMove?: (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => void
}

export const Canvas = forwardRef(
    (
        { id, size, zIndex, draw, handleClick, handleMouseMove }: CanvasProps,
        ref
    ) => {
        useCanvas(ref as RefObject<HTMLCanvasElement>, draw)

        return (
            <canvas
                id={id}
                data-testid={id}
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
