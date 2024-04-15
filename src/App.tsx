import { useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas'
import { ColorPickCanvas } from './components/ColorPickCanvas'
import { drawImage } from './utils/canvas-utils'
import { imageCanvasOptions } from './settings/canvas-settings'
import imgUrl from './assets/20MB-image.jpg'
import pickerLogo from './assets/IconColorPicker.svg'

function App() {
    const [colorPickerEnabled, setColorPickerEnabled] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<string>('Select a color')

    return (
        <div className="size-full">
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
                <Canvas
                    id="image-canvas"
                    draw={drawImage(imgUrl, 'color-picker-canvas')}
                    options={imageCanvasOptions}
                    zIndex={1}
                />
                <ColorPickCanvas
                    enabled={colorPickerEnabled}
                    selectColor={setSelectedColor}
                    setEnabled={setColorPickerEnabled}
                />
            </div>
        </div>
    )
}

export default App
