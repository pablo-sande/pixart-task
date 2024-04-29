import { useRef } from 'react'
import './App.css'
import { Canvas } from '@/components/Canvas'
import { drawImage } from '@/utils/canvasUtils'
import { imageCanvasOptions } from '@/settings/canvas-settings'
import imgUrl from '@/assets/2MB-image.jpg'
import { useImageSize } from '@/hooks/useImageSize'
import { ColorPicker } from '@/components/ColorPicker'

function App() {
    const imageCanvasRef = useRef(null)
    const size = useImageSize(imgUrl)

    return (
        <main className="size-full">
            <div className="w-full h-5/6">
                {size && (
                    <>
                        <ColorPicker
                            size={size}
                            imageCanvasRef={imageCanvasRef}
                        />
                        <Canvas
                            ref={imageCanvasRef}
                            id="image-canvas"
                            size={size}
                            zIndex={1}
                            draw={drawImage(imgUrl, imageCanvasOptions)}
                        />
                    </>
                )}
            </div>
        </main>
    )
}

export default App
