import { useState } from 'react'
import pickerLogo from '@/assets/IconColorPicker.svg'
import { ColorPickerCanvas } from './ColorPickerCanvas'

type ColorPickerProps = {
    size: { width: number; height: number }
    imageCanvasRef: any
}

export const ColorPicker = ({ size, imageCanvasRef }: ColorPickerProps) => {
    const [colorPickerEnabled, setColorPickerEnabled] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<string>('Select a color')

    return (
        <>
            <div className="flex flex-row w-90">
                <img
                    className={`m-8 size-12 bg-white ${
                        colorPickerEnabled ? 'border-4 border-blue-500' : ''
                    }`}
                    src={pickerLogo}
                    alt="Color Picker"
                    role="button"
                    onClick={() => setColorPickerEnabled(!colorPickerEnabled)}
                />
                <h1 className="text-4xl mt-8 font-bold">{selectedColor}</h1>
            </div>
            <ColorPickerCanvas
                size={size}
                imageCanvas={imageCanvasRef}
                enabled={colorPickerEnabled}
                selectColor={setSelectedColor}
                setEnabled={setColorPickerEnabled}
            />
        </>
    )
}
