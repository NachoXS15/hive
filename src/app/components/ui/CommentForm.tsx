'use client'

import { addCommentAction, type CommentFormState } from "@/app/lib/actions"
import { COMMENT_MAX_LENGTH } from "@/app/utils/definitions"
import { useActionState } from "react"

// Formulario para comentar un post. Si algo falla, el texto escrito no se pierde.
export default function CommentForm({ postId }: { postId: string }) {
    const [state, formAction, isPending] = useActionState<CommentFormState, FormData>(
        addCommentAction.bind(null, postId),
        {}
    )

    return (
        <form action={formAction} className="w-full flex flex-col gap-2">
            <label htmlFor={`comment-${postId}`} className="sr-only">Escribí un comentario</label>
            <textarea
                id={`comment-${postId}`}
                name="body"
                required
                maxLength={COMMENT_MAX_LENGTH}
                rows={3}
                defaultValue={state.body ?? ""}
                placeholder="Escribí un comentario…"
                className="w-full resize-y rounded-lg border border-slate-400 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-main"
            />
            {state.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
            <button
                type="submit"
                disabled={isPending}
                className="self-end rounded-lg bg-black-main px-4 py-1.5 text-sm font-semibold text-yellow-main transition hover:scale-105 active:scale-100 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
            >
                {isPending ? "Publicando…" : "Comentar"}
            </button>
        </form>
    )
}
