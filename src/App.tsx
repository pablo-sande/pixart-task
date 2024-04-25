import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas'
import { drawImage, loadImage } from './utils/canvas-utils'
import { imageCanvasOptions } from './settings/canvas-settings'
import imgUrl from './assets/2MB-image.jpg'
import pickerLogo from './assets/IconColorPicker.svg'
import { ColorPickCanvas } from './components/ColorPickCanvas'

function App() {
    const [colorPickerEnabled, setColorPickerEnabled] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<string>('Select a color')
    const [size, setSize] = useState<{ width: number; height: number } | null>(
        null
    )
    const imageCanvasRef = useRef(null)

    useEffect(() => {
        loadImage(imgUrl)
            .then(({ width, height }) =>
                setSize({ width: width + 100, height: height + 100 })
            )
            .catch((err) => console.error(err))
    }, [])

    return (
        <main className="size-full">
            <div className="flex flex-row w-90">
                <img
                    className={`m-8 size-12 bg-white ${
                        colorPickerEnabled ? 'border-4 border-blue-500' : ''
                    }`}
                    src={pickerLogo}
                    alt="color-picker"
                    role="button"
                    onClick={() => setColorPickerEnabled(!colorPickerEnabled)}
                />
                <h1 className="text-4xl mt-8 font-bold">{selectedColor}</h1>
            </div>
            <div className="w-full h-5/6">
                {size && (
                    <>
                        <Canvas
                            ref={imageCanvasRef}
                            id="image-canvas"
                            size={size}
                            zIndex={1}
                            options={imageCanvasOptions}
                            draw={(canvas: HTMLCanvasElement) =>
                                drawImage(imgUrl, imageCanvasOptions)(canvas)
                            }
                        />
                        <ColorPickCanvas
                            size={size}
                            imageCanvas={imageCanvasRef}
                            enabled={colorPickerEnabled}
                            selectColor={setSelectedColor}
                            setEnabled={setColorPickerEnabled}
                        />
                    </>
                )}
            </div>
        </main>
    )
}

export default App
