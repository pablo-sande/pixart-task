import { RefObject, useRef } from 'react'
import { Canvas } from './Canvas'
import { rgbToHex } from '../utils/canvas-utils'
import {
    gridSize,
    halfGridSize,
    imageCanvasOptions,
} from '../settings/canvas-settings'
import { useWorker } from '../hooks/useWorker'

type ColorPickCanvasProps = {
    enabled: boolean
    imageCanvas: RefObject<HTMLCanvasElement>
    selectColor: (color: string) => void
    setEnabled: (enabled: boolean) => void
    size: { width: number; height: number }
}

export const ColorPickCanvas = ({
    enabled,
    imageCanvas,
    selectColor,
    setEnabled,
    size,
}: ColorPickCanvasProps) => {
    const colorPickerCanvas = useRef<HTMLCanvasElement | null>(null)
    const worker = useWorker(colorPickerCanvas, imageCanvas)

    const cleanCanvas = () => {
        if (worker) {
            worker.postMessage({
                clear: true,
            })
        }
    }

    if (!enabled) cleanCanvas()

    const handleMouseMove = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        if (!imageCanvas.current || !colorPickerCanvas.current) return
        const rect = colorPickerCanvas.current.getBoundingClientRect()
        const ctx = imageCanvas.current.getContext('2d', {
            alpha: imageCanvasOptions.alpha,
            willReadFrequently: imageCanvasOptions.willReadFrequently,
        })

        if (!ctx) return
        const x = Math.round(e.clientX - rect.left)
        const y = Math.round(e.clientY - rect.top)

        const data = ctx.getImageData(
            x - halfGridSize,
            y - halfGridSize,
            gridSize,
            gridSize
        )?.data

        const centerColor = rgbToHex(
            ctx.getImageData(x, y, 1, 1)?.data?.slice(0, 3)
        )

        if (worker) {
            worker.postMessage({
                x,
                y,
                data,
                centerColor,
            })
        }
    }

    const handleClick = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = Math.round(e.clientX - rect.left)
        const y = Math.round(e.clientY - rect.top)

        const centerColor = rgbToHex(
            imageCanvas.current
                ?.getContext('2d', {
                    alpha: imageCanvasOptions.alpha,
                    willReadFrequently: imageCanvasOptions.willReadFrequently,
                })
                ?.getImageData(x, y, 1, 1)
                ?.data?.slice(0, 3)
        )
        selectColor(centerColor)
        if (worker) {
            worker.postMessage({
                clear: true,
            })
        }
        setEnabled(false)
    }

    return (
        <Canvas
            ref={colorPickerCanvas}
            id="color-picker-canvas"
            size={size}
            handleClick={enabled ? handleClick : () => {}}
            handleMouseMove={enabled ? handleMouseMove : () => {}}
            zIndex={2}
        />
    )
}
