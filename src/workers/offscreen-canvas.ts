import { cellOffset, cellSize, datePickerCircleWidth, gridSize, halfCellSize } from "../settings/canvas-settings";
import { drawCircle, drawGrid } from "../utils/canvas-utils";
import { optionsPicker } from "../settings/canvas-settings";
let canvas: OffscreenCanvas | null = null;

self.onmessage = (e) => {
    if (!canvas) {
        canvas = e.data.canvas as OffscreenCanvas;
        return;
    }
    const ctx = canvas.getContext('2d', { alpha: optionsPicker.alpha, willReadFrequently: optionsPicker.willReadFrequently});
    if (!ctx) return
    if (e.data.clear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
    }

    const x = e.data.x;
    const y = e.data.y;
    const data = e.data.data;
    const centerColor = e.data.centerColor;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    const radius = Math.round((gridSize * cellSize + cellSize) / 2)

    // Draw the outer circle border
    drawCircle(
        canvas,
        x + halfCellSize,
        y + halfCellSize,
        radius + Math.ceil(datePickerCircleWidth / 2),
        '#444',
        1
    )
    
    // Clip the outer circle area circle
    ctx.clip()

    // Draw the grid
    drawGrid(canvas, data, x, y)

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
    drawCircle(
        canvas,
        x + halfCellSize,
        y + halfCellSize,
        radius,
        centerColor,
        datePickerCircleWidth
    )

    // Draw the inner circle border
    drawCircle(
        canvas,
        x + halfCellSize,
        y + halfCellSize,
        radius - Math.floor(datePickerCircleWidth / 2),
        '#444',
        1
    )

    ctx.restore()
}


export {}