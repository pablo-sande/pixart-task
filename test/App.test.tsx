import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import App from '@/App'
import * as imageSizeHook from '@/hooks/useImageSize'
import * as workerHook from '@/hooks/useWorker'

describe('App', () => {
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
        vi.spyOn(imageSizeHook, 'useImageSize').mockReturnValue({
            width: 100,
            height: 100,
        })
        vi.spyOn(workerHook, 'useWorker').mockReturnValue(mockWorker)
        render(<App />)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders ColorPicker component', async () => {
        const colorPickerElement = screen.getByRole('button')
        expect(colorPickerElement).toBeDefined()
    })

    test('renders Canvas component', () => {
        const canvasElement = screen.getByTestId('image-canvas')
        expect(canvasElement).toBeDefined()
    })
})
