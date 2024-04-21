import { cellOffset, cellSize, datePickerCircleWidth, gridSize, halfCellSize, halfGridSize } from "../settings/canvas-settings";
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
    const radius = Math.round((gridSize * cellSize + cellSize) / 2)
    drawCircle(
        canvas,
        x + halfCellSize,
        y + halfCellSize,
        radius,
        centerColor,
        datePickerCircleWidth
    )

    // Draw the outer circle border
    drawCircle(
        canvas,
        x + halfCellSize,
        y + halfCellSize,
        radius + Math.ceil(datePickerCircleWidth / 2),
        '#444',
        1
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
}


export {}