import { RefObject, useEffect, useRef, useState } from 'react'
import { Canvas } from './Canvas'
import { rgbToHex } from '../utils/canvas-utils'
import {
    gridSize,
    halfGridSize,
    optionsPicker,
} from '../settings/canvas-settings'

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
    const [worker, setWorker] = useState<Worker | null>(null)
    const colorPickerCanvas = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (imageCanvas && imageCanvas.current && colorPickerCanvas.current) {
            if (!worker) {
                colorPickerCanvas.current.width = imageCanvas.current.width
                colorPickerCanvas.current.height = imageCanvas.current.height
                const offscreen =
                    colorPickerCanvas.current.transferControlToOffscreen()

                const newWorker = new Worker(
                    new URL('./offscreen-canvas.ts', import.meta.url),
                    { type: 'module' }
                )
                newWorker.postMessage(
                    {
                        canvas: offscreen,
                    },
                    [offscreen]
                )
                setWorker(newWorker)
            }
        }
        return () => {
            if (worker) {
                worker.terminate()
            }
        }
    }, [worker, imageCanvas])

    useEffect(() => {
        if (!enabled) {
            cleanCanvas()
        }
    }, [enabled])

    const handleMouseMove = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        if (!imageCanvas.current || !colorPickerCanvas.current) return
        const rect = colorPickerCanvas.current.getBoundingClientRect()

        const x = Math.round(e.clientX - rect.left)
        const y = Math.round(e.clientY - rect.top)

        const ctx = imageCanvas.current.getContext('2d')

        if (!ctx) return

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
                ?.getContext('2d')
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

    const cleanCanvas = () => {
        if (worker) {
            worker.postMessage({
                clear: true,
            })
        }
    }

    return (
        <Canvas
            ref={colorPickerCanvas}
            id="color-picker-canvas"
            size={size}
            options={optionsPicker}
            handleClick={enabled ? handleClick : () => {}}
            handleMouseMove={enabled ? handleMouseMove : () => {}}
            zIndex={2}
        />
    )
}
