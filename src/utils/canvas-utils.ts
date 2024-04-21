import { ContextOptions } from "../components/Canvas"
import { cellOffset, cellSize, gridSize, halfGridSize, quarterGridSize } from "../settings/canvas-settings"


const defaultDrawCanvas = (canvas: HTMLCanvasElement, options: ContextOptions) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: options.alpha, willReadFrequently: options.willReadFrequently })
    ctx?.beginPath()
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawImage = (img:string, options: ContextOptions) => (canvas: HTMLCanvasElement) => {
    const newImage = new Image()
    newImage.src = img
    newImage.onload = () => {
        const imgWidth = newImage.width;
        const imgHeight = newImage.height;
        const dpr = window.devicePixelRatio;
        const targetWidth = imgWidth / dpr;
        const targetHeight = imgHeight / dpr;

        const ctx = canvas.getContext('2d', { alpha: options.alpha, willReadFrequently: options.willReadFrequently })
        if (!ctx) return
        ctx.drawImage(newImage, 50, 50, targetWidth, targetHeight);
    }
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
    canvas: OffscreenCanvas,
    x: number,
    y: number,
    radius: number,
    fill: string,
    strokeWidth: number = 1
) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.strokeStyle = fill
    ctx.lineWidth = strokeWidth
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
}

const drawGrid = (canvas: OffscreenCanvas, data: Uint8ClampedArray, x:number, y: number) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.lineWidth = 1
    ctx.strokeStyle = '#ddd'
    let count = 0

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // Skip the corners
            if (
                i + j < quarterGridSize ||
                i + j >= 2 * gridSize - quarterGridSize - 1 ||
                gridSize - i + j >= 2 * gridSize - quarterGridSize ||
                gridSize - j + i >= 2 * gridSize - quarterGridSize
            ) {
                count++
                continue
            }
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

export { drawImage, drawCircle, rgbToHex, defaultDrawCanvas, drawGrid }