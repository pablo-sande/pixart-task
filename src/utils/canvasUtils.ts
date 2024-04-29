import {
    ContextOptions,
    cellOffset,
    cellSize,
    gridSize,
    halfGridSize,
} from '@/settings/canvas-settings'
import { loadImage } from '@/utils/loadImage'

const drawImage =
    (img: string, options: ContextOptions) => (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d', options) as CanvasRenderingContext2D
        if (!ctx) return

        loadImage(img)
            .then(({ width, height, img }) =>
                ctx.drawImage(img, 50, 50, width, height)
            )
            .catch((err) => console.error(err))
    }

const componentToHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
}

const rgbToHex = (rgb?: Uint8ClampedArray) => {
    if (!rgb) return '#000000'
    const [r, g, b] = rgb
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

const drawCircle = (
    ctx: OffscreenCanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    fill: string,
    strokeWidth: number = 1
) => {
    ctx.beginPath()
    ctx.strokeStyle = fill
    ctx.lineWidth = strokeWidth
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
}

const drawGrid = (
    ctx: OffscreenCanvasRenderingContext2D,
    data: Uint8ClampedArray,
    x: number,
    y: number
) => {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#ddd'
    let count = 0

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = `rgb(
                ${data[count * 4]}, 
                ${data[count * 4 + 1]}, 
                ${data[count * 4 + 2]})`

            ctx.fillRect(
                j * cellSize + x - cellOffset,
                i * cellSize + y - cellOffset,
                cellSize,
                cellSize
            )
            // Skip the center
            if (!(i === halfGridSize && j === halfGridSize)) {
                ctx.strokeRect(
                    j * cellSize + x - cellOffset,
                    i * cellSize + y - cellOffset,
                    cellSize,
                    cellSize
                )
            }
            count++
        }
    }
}

export { drawImage, drawCircle, rgbToHex, drawGrid }
