import React, { useState, useEffect } from 'react'

export function ImageRow({
    images,
    windowSize,
    focusCallback,
}) {
    const [rowWidth, setRowWidth] = useState(0)
    useEffect(() => {
        let totalWidth = 0;
        let loadedCount = 0;

        const handleLoad = () => {
            loadedCount++
            if (loadedCount === images.length) {
                setRowWidth(totalWidth)
            }
        }

        images.forEach(image => {
            const img = new Image()
            img.onload = () => {
                totalWidth = totalWidth + (img.width / img.height)
                handleLoad()
            }
            img.src = image
        })
    }, [images])

    const triggerFocusImage = (path) => {
        focusCallback(path)
    }

    return (
        <div className="image-row">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={index}
                    height={windowSize.width / rowWidth}
                    onClick={() => triggerFocusImage(image)}
                />
            ))}
        </div>
    )
}
