import { loadImage } from '@/utils/loadImage'
import { useEffect, useState } from 'react'

export const useImageSize = (imgUrl: string) => {
    const [size, setSize] = useState<{ width: number; height: number } | null>(
        null
    )
    useEffect(() => {
        loadImage(imgUrl)
            .then(({ width, height }) =>
                setSize({ width: width + 100, height: height + 100 })
            )
            .catch((err) => console.error(err))
    }, [])

    return size
}
