import { useState } from 'react'
import { Canvas } from './Canvas'
import {
    drawCircle,
    rgbToHex,
    defaultDraw,
    drawGrid,
} from '../utils/canvas-utils'
import {
    cellOffset,
    cellSize,
    datePickerCircleWidth,
    gridSize,
    halfCellSize,
    halfGridSize,
    imageCanvasOptions,
    optionsPicker,
} from '../settings/canvas-settings'

type ColorPickCanvasProps = {
    enabled: boolean
    selectColor: (color: string) => void
    setEnabled: (enabled: boolean) => void
}

export const ColorPickCanvas = ({
    enabled,
    selectColor,
    setEnabled,
}: ColorPickCanvasProps) => {
    const [imageCanvas, setImageCanvas] =
        useState<CanvasRenderingContext2D | null>(null)
    const [draw, setDraw] =
        useState<(ctx: CanvasRenderingContext2D) => void>(defaultDraw)

    const initializeImageCanvas = () => {
        setImageCanvas(
            (
                document.getElementById('image-canvas') as HTMLCanvasElement
            )?.getContext(imageCanvasOptions.context, {
                alpha: imageCanvasOptions.alpha,
                willReadFrequently: imageCanvasOptions.willReadFrequently,
            })
        )
    }

    const handleMouseMove = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        setDraw(() => (ctx: CanvasRenderingContext2D) => {
            if (!ctx) return
            if (!imageCanvas) {
                initializeImageCanvas()
                return
            }
            const rect = ctx.canvas.getBoundingClientRect()

            // Clear the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            // Get the mouse position
            const x = Math.round(e.clientX - rect.left)
            const y = Math.round(e.clientY - rect.top)

            // Get the data from the image canvas
            const data = imageCanvas?.getImageData(
                x - halfGridSize,
                y - halfGridSize,
                gridSize,
                gridSize
            )?.data

            if (!data) return

            // Get the center color in hex
            const centerColor = rgbToHex(
                imageCanvas?.getImageData(x, y, 1, 1)?.data?.slice(0, 3)
            )

            // Draw the grid
            drawGrid(ctx, data, x, y)

            // Draw the center
            ctx.strokeStyle = '#000'
            ctx.strokeRect(
                cellOffset + x - cellOffset,
                cellOffset + y - cellOffset,
                cellSize,
                cellSize
            )

            // Draw the text background
            ctx.font = '15px Arial'
            ctx.fillStyle = '#ddd'
            ctx.beginPath()
            ctx.roundRect(x - 30, y + cellSize + 5, 70, 20, 10)
            ctx.fill()
            ctx.closePath()
            ctx.fillStyle = '#000'

            // Draw the text
            ctx.fillText(centerColor, x - 25, y + cellSize + 20)

            // Draw the circle
            const radius = Math.round((gridSize * cellSize + cellSize) / 2)
            drawCircle(
                ctx,
                x + halfCellSize,
                y + halfCellSize,
                radius,
                centerColor,
                datePickerCircleWidth
            )

            // Draw the outer circle border
            drawCircle(
                ctx,
                x + halfCellSize,
                y + halfCellSize,
                radius + Math.ceil(datePickerCircleWidth / 2),
                '#444',
                1
            )

            // Draw the inner circle border
            drawCircle(
                ctx,
                x + halfCellSize,
                y + halfCellSize,
                radius - Math.floor(datePickerCircleWidth / 2),
                '#444',
                1
            )
        })
    }

    const handleClick = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = Math.round(e.clientX - rect.left)
        const y = Math.round(e.clientY - rect.top)

        const centerColor = rgbToHex(
            imageCanvas?.getImageData(x, y, 1, 1)?.data?.slice(0, 3)
        )
        selectColor(centerColor)
        setDraw(() => defaultDraw)
        setEnabled(false)
    }
    return (
        <Canvas
            id="color-picker-canvas"
            options={optionsPicker}
            draw={draw}
            handleClick={enabled ? handleClick : () => defaultDraw}
            handleMouseMove={enabled ? handleMouseMove : () => defaultDraw}
            zIndex={2}
        />
    )
}
