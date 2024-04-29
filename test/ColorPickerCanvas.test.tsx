import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ColorPickerCanvas } from '@/components/ColorPickerCanvas'
import { setupJestCanvasMock } from 'jest-canvas-mock'
import * as workerHook from '@/hooks/useWorker'

describe('ColorPickerCanvas', () => {
    const mockImageCanvasRef = {
        current: document.createElement('canvas') as HTMLCanvasElement,
    }

    const mockSelectColor = jest.fn()
    const mockSetEnabled = jest.fn()

    const mockWorker = {
        postMessage: jest.fn(),
        terminate: jest.fn(),
        onmessage: jest.fn(),
        onmessageerror: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        onerror: jest.fn(),
    }

    beforeEach(() => {
        setupJestCanvasMock()
        vi.spyOn(workerHook, 'useWorker').mockReturnValue(mockWorker)
        render(
            <ColorPickerCanvas
                enabled={true}
                imageCanvas={mockImageCanvasRef}
                selectColor={mockSelectColor}
                setEnabled={mockSetEnabled}
                size={{ width: 500, height: 500 }}
            />
        )
    })

    afterEach(() => {
        cleanup()
    })

    test('renders the canvas element', () => {
        const canvasElement = screen.getByTestId('color-picker-canvas')
        expect(canvasElement).toBeInTheDocument()
    })

    test('calls selectColor when canvas is clicked', () => {
        const canvasElement = screen.getByTestId('color-picker-canvas')
        fireEvent.click(canvasElement)
        expect(mockSelectColor).toHaveBeenCalled()
    })

    test('calls setEnabled with false when canvas is clicked', () => {
        const canvasElement = screen.getByTestId('color-picker-canvas')
        fireEvent.click(canvasElement)
        expect(mockSetEnabled).toHaveBeenCalledWith(false)
    })

    test('calls cleanCanvas when canvas is clicked', () => {
        const canvasElement = screen.getByTestId('color-picker-canvas')
        fireEvent.click(canvasElement)
        expect(mockWorker.postMessage).toHaveBeenCalledWith({ clear: true })
    })

    test('calls cleanCanvas when enabled prop is false', () => {
        expect(mockWorker.postMessage).toHaveBeenCalledWith({ clear: true })
    })

    test('calls worker.postMessage when mouse moves over canvas', async () => {
        CanvasRenderingContext2D.prototype.getImageData = jest
            .fn()
            .mockReturnValue({
                data: new Uint8ClampedArray(100).fill(55),
            })

        const canvasElement = screen.getByTestId('color-picker-canvas')
        fireEvent.mouseMove(canvasElement, { clientX: 250, clientY: 250 })

        expect(mockWorker.postMessage).toHaveBeenCalledWith({
            x: 250,
            y: 250,
            data: new Uint8ClampedArray(100).fill(55),
            centerColor: '#373737',
        })
    })
})
