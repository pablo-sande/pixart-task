import { ContextOptions } from "../components/Canvas";

export const imageCanvasOptions: ContextOptions = {
    context: '2d',
    alpha: false,
    willReadFrequently: false,
}

export const optionsPicker: ContextOptions = {
    context: '2d',
    alpha: true,
    willReadFrequently: false,
}

// The algorithm could be improved to support more configurations
// Tested for 
// gridSize 15 && cellSize 10 && datePickerCircleWidth 15
// gridSize 15 && cellSize 12 && datePickerCircleWidth 17
// gridSize 15 && cellSize 14 && datePickerCircleWidth 19
// gridSize 25 && cellSize 20 && datePickerCircleWidth 30
// gridSize 25 && cellSize 30 && datePickerCircleWidth 50
// gridSize 35 && cellSize 30 && datePickerCircleWidth 90

export const gridSize = 15
export const cellSize = 10
export const datePickerCircleWidth = 14
export const halfGridSize = Math.floor(gridSize / 2)
export const quarterGridSize = Math.ceil(gridSize / 4)
export const cellOffset = halfGridSize * cellSize
export const halfCellSize = Math.round(cellSize / 2)