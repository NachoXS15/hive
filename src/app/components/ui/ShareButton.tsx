'use client'

import { Check, Share2 } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
    postId: string
    className?: string
}

// Comparte el link del post: en celulares abre el menú nativo, en compu copia el link.
export default function ShareButton({ postId, className = "" }: Props) {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!copied) return
        const timer = setTimeout(() => setCopied(false), 2000)
        return () => clearTimeout(timer)
    }, [copied])

    const handleShare = async () => {
        const url = `${window.location.origin}/home/post/${postId}`
        const isTouch = window.matchMedia("(pointer: coarse)").matches
        if (isTouch && typeof navigator.share === "function") {
            try {
                await navigator.share({ title: "Publicación en Hive", url })
            } catch {
                // el usuario cerró el menú de compartir: no hay nada que hacer
            }
            return
        }
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
        } catch (error) {
            console.error("No se pudo copiar el link:", error)
        }
    }

    return (
        <button
            type="button"
            onClick={handleShare}
            title="Compartir"
            aria-label={copied ? "Link copiado" : "Compartir"}
            className={className}
        >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            <span className="hidden @xs:inline">{copied ? "¡Link copiado!" : "Compartir"}</span>
        </button>
    )
}
