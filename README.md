# PicsArt Color Picker exercise

## Description

This is a simple exercise to demonstrate the use of canvas to create a color picker. The user can use the color picker to hover the image with the mouse and, based on the zoomed area section, precisely pick the color of the desired pixel.

## Technologies

-   Tailwind CSS
-   JavaScript
-   Canvas
-   React

## How to run

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm run build`
4. Run `pnpm preview`

## How to use

1. Click on the color picker button
2. Hover the image with the mouse
3. Click on the desired pixel to pick the color
4. (Optional) Modify the used image by changing the image path in the `App.js` file. (line 7)
5. (Optional) Modify the size of the color picker by tweaking the settings in the `src/settings/canvas-settings.js` file.
   **Note:** If you want to change the image or the settings, you will need to either run `pnpm run build` again or run `pnpm run dev` to see the changes in real-time.

## Performance

The performance has been tested with several sized images. For the sake of this exerecise, the canvas size will adapt to the image size so it's easy to test with different canvas resolutions.
I included 4 different images to test the performance. They can be tested by changing the image path in the `App.js` file. (line 7)

-   800KB image: optimal performance
-   2MB image: optimal performance
-   20MB image: very good performance
-   42MB image: the performance starts to decrease but it's still usable

If I had to optimize further, I would consider:

-   Using a web worker to offload the color picking process from the main thread
-   Using different sub-canvas to create a grid of smaller canvases
-   Exploring to use WebGL for better performance
-   Using a library like `react-konva` to handle the canvas rendering
-   Exploring the offscreen canvas API

## Other notes

The code structure is very basic, I focused on the functionality and the performance of the color picker given the time constraints. The code can be further optimized and refactored to be more readable and maintainable.

The code is lacking tests for the same reason as above.
