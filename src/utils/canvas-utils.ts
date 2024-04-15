import { cellOffset, cellSize, gridSize, halfGridSize, optionsPicker, quarterGridSize } from "../settings/canvas-settings"

const defaultDraw = (ctx: CanvasRenderingContext2D) => {
    ctx?.beginPath()
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)}

const adaptAuxCanvas = (id: string, w: number, h: number) => {
    const auxCanvas = document.getElementById(id) as HTMLCanvasElement
    auxCanvas.width = w
    auxCanvas.height = h
    auxCanvas.getContext(optionsPicker.context, { alpha: optionsPicker.alpha, willReadFrequently: optionsPicker.willReadFrequently })
}

const drawImage = (img:string, canvasToAdaptId?: string) => (ctx: CanvasRenderingContext2D) => {
    const newImage = new Image()
    newImage.src = img
    newImage.onload = () => {
        const imgWidth = newImage.width;
        const imgHeight = newImage.height;
        const dpr = window.devicePixelRatio;
        const targetWidth = imgWidth / dpr;
        const targetHeight = imgHeight / dpr;

        if (ctx.canvas.width !== targetWidth + 100 || ctx.canvas.height !== targetHeight + 100) {
            ctx.canvas.width = targetWidth + 100
            ctx.canvas.height = targetHeight + 100
        }
        if (canvasToAdaptId) {
            adaptAuxCanvas(canvasToAdaptId, targetWidth + 100, targetHeight + 100)
        }
        ctx.drawImage(newImage, 50, 50, imgWidth, imgHeight);
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
    ctx: CanvasRenderingContext2D,
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

const drawGrid = (ctx: CanvasRenderingContext2D, data: Uint8ClampedArray, x:number, y: number) => {
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

export { drawImage, drawCircle, rgbToHex, defaultDraw, drawGrid }