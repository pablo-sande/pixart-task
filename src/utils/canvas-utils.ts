import { ContextOptions } from '../components/Canvas'
import {
    cellOffset,
    cellSize,
    gridSize,
    halfGridSize,
} from '../settings/canvas-settings'

const defaultDrawCanvas = (
    canvas: HTMLCanvasElement,
    options: ContextOptions
) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d', {
        alpha: options.alpha,
        willReadFrequently: options.willReadFrequently,
    })
    ctx?.beginPath()
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const loadImage = (imgUrl: string) =>
    new Promise<{ width: number; height: number; img: HTMLImageElement }>(
        (resolve, reject) => {
            const newImage = new Image()
            newImage.src = imgUrl
            try {
                newImage.onload = () => {
                    const imgWidth = newImage.width
                    const imgHeight = newImage.height
                    const dpr = window.devicePixelRatio
                    const targetWidth = imgWidth / dpr
                    const targetHeight = imgHeight / dpr
                    resolve({
                        width: targetWidth,
                        height: targetHeight,
                        img: newImage,
                    })
                }
            } catch (err) {
                reject(err)
            }
        }
    )

const drawImage =
    (img: string, options: ContextOptions) => (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d', {
            alpha: options.alpha,
            willReadFrequently: options.willReadFrequently,
        })
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

const drawGrid = (
    canvas: OffscreenCanvas,
    data: Uint8ClampedArray,
    x: number,
    y: number
) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
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

export { drawImage, drawCircle, rgbToHex, defaultDrawCanvas, drawGrid }
