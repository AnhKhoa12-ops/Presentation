import { useEffect, useState } from 'react'
import SlimeSvg, { type Mood } from './SlimeSvg'

const IMAGES: Record<Mood, string> = {
    happy: '/mascot/slime.png',
    wow: '/mascot/slime.png',
    think: '/mascot/slime.png',
}

const cache = new Map<string, string>()

// Xóa nền trắng ở rìa ảnh (loang từ 4 góc vào), giữ màu trắng bên trong hình
function removeWhiteBackground(src: string): Promise<string> {
    const cached = cache.get(src)
    if (cached) return Promise.resolve(cached)

    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const w = img.naturalWidth
            const h = img.naturalHeight
            const canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Canvas is not available'))
                return
            }
            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, w, h)
            const px = imageData.data

            const isBackground = (i: number) =>
                px[i + 3] < 10 || (px[i] > 225 && px[i + 1] > 225 && px[i + 2] > 225)

            const visited = new Uint8Array(w * h)
            const stack: number[] = [0, w - 1, (h - 1) * w, h * w - 1]

            while (stack.length > 0) {
                const p = stack.pop() as number
                if (visited[p]) continue
                visited[p] = 1
                const i = p * 4
                if (!isBackground(i)) continue
                px[i + 3] = 0
                const x = p % w
                if (x > 0) stack.push(p - 1)
                if (x < w - 1) stack.push(p + 1)
                if (p >= w) stack.push(p - w)
                if (p < w * (h - 1)) stack.push(p + w)
            }

            ctx.putImageData(imageData, 0, 0)
            const result = canvas.toDataURL('image/png')
            cache.set(src, result)
            resolve(result)
        }
        img.onerror = () => reject(new Error(`Cannot load image: ${src}`))
        img.src = src
    })
}

interface MascotProps {
    mood?: Mood
    size?: number
}

export default function Mascot({ mood = 'happy', size = 220 }: MascotProps) {
    const url = IMAGES[mood]
    const [src, setSrc] = useState<string | null>(() => cache.get(url) ?? null)
    const [failed, setFailed] = useState<boolean>(false)

    useEffect(() => {
        let cancelled = false
        removeWhiteBackground(url)
            .then((result) => {
                if (!cancelled) setSrc(result)
            })
            .catch((error) => {
                console.error('Mascot image failed:', error)
                if (!cancelled) setFailed(true)
            })
        return () => {
            cancelled = true
        }
    }, [url])

    // Ảnh lỗi thì dùng slime SVG dự phòng
    if (failed) return <SlimeSvg mood={mood} size={size} />
    // Đang xử lý ảnh: giữ chỗ để bố cục không nhảy
    if (!src) return <div style={{ width: size, height: size }} />

    return (
        <img
            className={`mascot mascot-${mood}`}
            src={src}
            alt="Slime mascot"
            width={size}
            height={size}
            draggable={false}
        />
    )
}