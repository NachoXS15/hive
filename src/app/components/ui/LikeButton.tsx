'use client'

import { likePostAction } from "@/app/lib/actions"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useOptimistic, useTransition } from "react"

type Props = {
    postId: string
    liked: boolean
    count: number
    isLoggedIn: boolean
    className?: string
}

type LikeState = { liked: boolean; count: number }

// Botón "Me gusta" del pie de cada post. Cambia al instante (optimistic UI) y
// después se sincroniza con lo que devuelve el servidor.
export default function LikeButton({ postId, liked, count, isLoggedIn, className = "" }: Props) {
    const [, startTransition] = useTransition()
    const [optimistic, setOptimistic] = useOptimistic<LikeState, LikeState>(
        { liked, count },
        (_current, next) => next
    )

    const content = (
        <>
            <Heart size={18} className={optimistic.liked ? "fill-current" : ""} />
            <span className="hidden @xs:inline">Me gusta</span>
            {optimistic.count > 0 && <span className="font-semibold">{optimistic.count}</span>}
        </>
    )

    // Visitante: lo mandamos a iniciar sesión
    if (!isLoggedIn) {
        return (
            <Link
                href="/auth/login"
                className={className}
                title="Iniciá sesión para dar me gusta"
                aria-label={`Me gusta (${count})`}
            >
                {content}
            </Link>
        )
    }

    const handleClick = () => {
        const next = !optimistic.liked
        startTransition(async () => {
            setOptimistic({ liked: next, count: Math.max(0, optimistic.count + (next ? 1 : -1)) })
            await likePostAction(postId, next)
        })
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={optimistic.liked}
            aria-label={`Me gusta (${optimistic.count})`}
            title={optimistic.liked ? "Quitar me gusta" : "Me gusta"}
            className={`${className} ${optimistic.liked ? "bg-yellow-main text-black-main" : ""}`}
        >
            {content}
        </button>
    )
}
