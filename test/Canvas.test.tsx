import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Canvas, CanvasProps } from '@/components/Canvas'

describe('Canvas', () => {
    const mockDraw = vi.fn()
    const mockHandleClick = vi.fn()
    const mockHandleMouseMove = vi.fn()

    const canvasProps: CanvasProps = {
        id: 'canvas',
        size: { width: 500, height: 500 },
        zIndex: 1,
        draw: mockDraw,
        handleClick: mockHandleClick,
        handleMouseMove: mockHandleMouseMove,
    }

    beforeEach(() => {
        render(<Canvas {...canvasProps} />)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders canvas element with correct props', () => {
        const canvasElement = screen.getByTestId('canvas')

        expect(canvasElement).toBeDefined()
        expect(canvasElement).toHaveAttribute('id', 'canvas')
        expect(canvasElement).toHaveAttribute('width', '500')
        expect(canvasElement).toHaveAttribute('height', '500')
        expect(canvasElement).toHaveStyle({ zIndex: '1' })
    })

    test('calls handleClick function when canvas is clicked', () => {
        const canvasElement = screen.getByTestId('canvas')
        fireEvent.click(canvasElement)

        expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })

    test('calls handleMouseMove function when mouse moves over canvas', () => {
        const canvasElement = screen.getByTestId('canvas')
        fireEvent.mouseMove(canvasElement)

        expect(mockHandleMouseMove).toHaveBeenCalledTimes(1)
    })
})
