import { RefObject, useEffect, useState } from 'react'

export const useWorker = (
    colorPickerCanvas: RefObject<HTMLCanvasElement>,
    imageCanvas: RefObject<HTMLCanvasElement>
) => {
    const [worker, setWorker] = useState<Worker | null>(null)

    useEffect(() => {
        if (imageCanvas && imageCanvas.current && colorPickerCanvas.current) {
            if (!worker) {
                colorPickerCanvas.current.width = imageCanvas.current.width
                colorPickerCanvas.current.height = imageCanvas.current.height
                const offscreen =
                    colorPickerCanvas.current.transferControlToOffscreen()

                const newWorker = new Worker(
                    new URL('../workers/offscreen-canvas.ts', import.meta.url),
                    { type: 'module' }
                )
                newWorker.postMessage({ canvas: offscreen }, [offscreen])
                setWorker(newWorker)
            }
        }
        return () => {
            if (worker) worker.terminate()
        }
    }, [worker, imageCanvas])

    return worker
}
