# PicsArt Color Picker exercise

## Description

This is a simple exercise to demonstrate the use of canvas to create a color picker. The user can use the color picker to hover the image with the mouse and, based on the zoomed area section, precisely pick the color of the desired pixel.

## Technologies

-   Tailwind CSS
-   JavaScript
-   Canvas
-   React
-   Vite
-   Vitest

## How to run

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm run build`
4. Run `pnpm preview`

## How to use

1. Click on the color picker button
2. Hover the image with the mouse
3. Click on the desired pixel to pick the color
4. Navigate to [`http://localhost:4173`](http://localhost:5173)
5. (Optional) Modify the used image by changing the image path in the `App.tsx` file. (line 7)
6. (Optional) Modify the size of the color picker by tweaking the settings in the `src/settings/canvas-settings.ts` file.
7. (Optional) Run `pnpm run test` to run the tests
   **Note:** If you want to change the image or the settings, you will need to either run `pnpm run build` again or run `pnpm run dev` and navigate to [`http://localhost:5173`](http://localhost:5173) to see the changes in real-time.

## Performance

The performance has been tested with several sized images. For the sake of this exerecise, the canvas size will adapt to the image size so it's easy to test with different canvas resolutions.
I included 4 different images to test the performance. They can be tested by changing the image path in the `App.tsx` file. (line 7)

-   **800KB image**: optimal performance
-   **2MB image**: optimal performance
-   **20MB image**: very good performance -> since the introduction of the offscreen canvas + Web Worker, the performance is now optimal
-   **42MB image**: the performance starts to decrease but it's still usable -> since the introduction of the offscreen canvas + Web Worker, the performance is now optimal

If I had to optimize further, I would consider:

-   Using different sub-canvas to create a grid of smaller canvases
-   Exploring to use WebGL for better performance
-   Using a library like `react-konva` to handle the canvas rendering

## Other notes

The code structure, while still basic, has been refactored to be more readable and easier to test.

The code has some basic tests. I used jest-canvas-mock to mock the canvas interactions, but I'd like to explore the possibility of using snapshots to test the canvas rendering.
