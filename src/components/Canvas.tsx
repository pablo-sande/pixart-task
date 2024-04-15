import { useCanvas } from '../hooks/useCanvas'

export type ContextOptions = {
    context: '2d'
    alpha: boolean
    willReadFrequently: boolean
}

export type CanvasProps = {
    id: string
    draw: (ctx: CanvasRenderingContext2D) => void
    options: ContextOptions
    handleMouseMove?: (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => void
    handleClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    zIndex: number
}

export const Canvas = ({
    id,
    draw,
    options,
    handleMouseMove,
    handleClick,
    zIndex,
}: CanvasProps) => {
    const canvasRef = useCanvas(draw, options)

    return (
        <canvas
            id={id}
            ref={canvasRef}
            className="m-auto block absolute cursor-none"
            style={{
                zIndex: zIndex,
            }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        />
    )
}
