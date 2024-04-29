export const loadImage = (imgUrl: string) =>
    new Promise<{ width: number; height: number; img: HTMLImageElement }>(
        (resolve, reject) => {
            const newImage = new Image()
            newImage.src = imgUrl

            try {
                newImage.onload = () => {
                    const dpr = window.devicePixelRatio
                    const targetWidth = newImage.width / dpr
                    const targetHeight = newImage.height / dpr

                    resolve({
                        width: targetWidth,
                        height: targetHeight,
                        img: newImage,
                    })
                }
            } catch (err) {
                reject(err)
            }
        }
    )
