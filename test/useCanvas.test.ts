import { describe, test, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCanvas } from '@/hooks/useCanvas'

describe('useCanvas', () => {
    test('should call the draw function with the canvas context', () => {
        const drawMock = vi.fn()
        const canvasRef = { current: document.createElement('canvas') }

        renderHook(() => useCanvas(canvasRef, drawMock))

        expect(drawMock).toHaveBeenCalledWith(canvasRef.current)
    })

    test('should not call the draw function if it is not provided', () => {
        const drawMock = vi.fn()
        const canvasRef = { current: document.createElement('canvas') }

        renderHook(() => useCanvas(canvasRef))

        expect(drawMock).not.toHaveBeenCalled()
    })

    test('should return the canvas ref', () => {
        const canvasRef = { current: document.createElement('canvas') }

        const { result } = renderHook(() => useCanvas(canvasRef))

        expect(result.current).toBe(canvasRef)
    })
})
