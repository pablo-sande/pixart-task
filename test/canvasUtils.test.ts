import { describe, test, expect, beforeEach, vi } from 'vitest'
import { drawImage, drawCircle, drawGrid, rgbToHex } from '@/utils/canvasUtils'
import { setupJestCanvasMock } from 'jest-canvas-mock'
import {
    gridSize,
    cellSize,
    cellOffset,
    imageCanvasOptions,
} from '@/settings/canvas-settings'
import * as loadImageUtils from '@/utils/loadImage'

describe('drawImage', () => {
    test('should properly call loadImage and drawImage', async () => {
        const mockLoadImage = vi
            .spyOn(loadImageUtils, 'loadImage')
            .mockImplementation(() =>
                Promise.resolve({ width: 100, height: 100, img: new Image() })
            )
        let canvas = document.createElement('canvas')

        const ctxSpy = vi.spyOn(CanvasRenderingContext2D.prototype, 'drawImage')
        drawImage('test.png', imageCanvasOptions)(canvas)

        expect(mockLoadImage).toHaveBeenCalledWith('test.png')

        await new Promise(process.nextTick)
        expect(ctxSpy).toHaveBeenCalledWith(new Image(), 50, 50, 100, 100)
    })
})

describe('draw on OffscreenCanvas', () => {
    let canvas: HTMLCanvasElement
    let c: CanvasRenderingContext2D
    let ctx: OffscreenCanvasRenderingContext2D
    const options = { alpha: false, willReadFrequently: false }

    beforeEach(() => {
        canvas = document.createElement('canvas')
        c = canvas.getContext('2d', options) as CanvasRenderingContext2D
        ctx = c as unknown as OffscreenCanvasRenderingContext2D
        vi.resetAllMocks()
        setupJestCanvasMock()
    })
    test('should draw a circle on the canvas', () => {
        const x = 100
        const y = 100
        const radius = 50
        const fill = '#ff0000'
        const strokeWidth = 2
        drawCircle(ctx, x, y, radius, fill, strokeWidth)
        expect(ctx.beginPath).toHaveBeenCalled()
        expect(ctx.strokeStyle).toBe(fill)
        expect(ctx.lineWidth).toBe(strokeWidth)
        expect(ctx.arc).toHaveBeenCalledWith(x, y, radius, 0, Math.PI * 2)
    })

    test('should draw a grid on the canvas', () => {
        const data = new Uint8ClampedArray(gridSize * gridSize * 4).fill(125)
        const x = 50
        const y = 50
        drawGrid(ctx, data, x, y)

        expect(ctx.strokeRect).toHaveBeenCalledWith(
            x - cellOffset,
            y - cellOffset,
            cellSize,
            cellSize
        )
        expect(ctx.strokeRect).toHaveBeenCalledTimes(gridSize * gridSize - 1)
        expect(ctx.fillRect).toHaveBeenCalledWith(
            x - cellOffset,
            y - cellOffset,
            cellSize,
            cellSize
        )
        expect(ctx.fillRect).toHaveBeenCalledTimes(gridSize * gridSize)
        expect(ctx.fillStyle).toBe('#7d7d7d')
    })
})

describe('rgbToHex', () => {
    test('should convert RGB values to a hex color', () => {
        const rgb = new Uint8ClampedArray([255, 122, 0])
        const hex = rgbToHex(rgb)
        expect(hex).toBe('#ff7a00')
    })

    test('should return #000000 if RGB values are not provided', () => {
        const hex = rgbToHex()
        expect(hex).toBe('#000000')
    })
})
