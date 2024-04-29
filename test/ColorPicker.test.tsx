import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ColorPicker } from '@/components/ColorPicker'

describe('ColorPicker', () => {
    const colorPickerProps = {
        size: { width: 500, height: 500 },
        imageCanvasRef: {},
    }

    beforeEach(() => {
        render(<ColorPicker {...colorPickerProps} />)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders color picker component with initial state', () => {
        const colorPickerElement = screen.getByRole('button')
        const selectedColorElement = screen.getByText('Select a color')
        const colorPickerCanvasElement = screen.getByTestId(
            'color-picker-canvas'
        )

        expect(colorPickerElement).toBeInTheDocument()
        expect(selectedColorElement).toBeInTheDocument()
        expect(colorPickerElement).toHaveClass('size-12')
        expect(colorPickerElement).not.toHaveClass('border-blue-500')
        expect(selectedColorElement).toHaveTextContent('Select a color')
        expect(colorPickerCanvasElement).toBeInTheDocument()
    })

    test('toggles color picker enabled state on click', async () => {
        const colorPickerElement = screen.getByRole('button')
        fireEvent.click(colorPickerElement)
        expect(colorPickerElement).toHaveClass('border-blue-500')
    })

    test('updates selected color on color selection', () => {
        const colorPickerElement = screen.getByRole('button')
        fireEvent.click(colorPickerElement)
        const colorPickerCanvasElement = screen.getByTestId(
            'color-picker-canvas'
        )
        fireEvent.click(colorPickerCanvasElement)
        const selectedColor = screen.getByText('#000000')
        expect(selectedColor).toBeInTheDocument()
    })
})
