export type ContextOptions = {
    alpha: boolean
    willReadFrequently: boolean
}

export const imageCanvasOptions: ContextOptions = {
    alpha: false,
    willReadFrequently: false,
}

export const optionsPicker: ContextOptions = {
    alpha: true,
    willReadFrequently: false,
}

export const gridSize = 15
export const cellSize = 10
export const datePickerCircleWidth = 14
export const halfGridSize = Math.floor(gridSize / 2)
export const cellOffset = halfGridSize * cellSize
export const halfCellSize = Math.round(cellSize / 2)
