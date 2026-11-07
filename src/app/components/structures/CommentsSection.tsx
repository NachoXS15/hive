import { deleteCommentAction } from "@/app/lib/actions"
import { formatDate } from "@/app/utils/DateFormatterPost"
import { CommentType } from "@/app/utils/definitions"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import CommentForm from "../ui/CommentForm"

type Props = {
    postId: string
    postOwnerId: string
    comments: CommentType[]
    viewerId: string | null
    isAdmin: boolean
}

// Comentarios de un post (detalle). Un comentario lo pueden borrar su autor,
// el dueño del post o un admin; la base de datos aplica la misma regla.
export default function CommentsSection({ postId, postOwnerId, comments, viewerId, isAdmin }: Props) {
    const canDelete = (comment: CommentType) =>
        viewerId !== null && (comment.user_id === viewerId || postOwnerId === viewerId || isAdmin)

    return (
        <section id="comentarios" className="w-full flex flex-col gap-4 font-second scroll-mt-24">
            <h3 className="font-bold text-lg">
                Comentarios {comments.length > 0 && <span className="font-normal">({comments.length})</span>}
            </h3>

            {viewerId ? (
                <CommentForm postId={postId} />
            ) : (
                <p className="text-sm">
                    <Link href="/auth/login" className="font-semibold underline">Iniciá sesión</Link> para dejar un comentario.
                </p>
            )}

            {comments.length === 0 ? (
                <p className="text-sm text-slate-600">Todavía no hay comentarios. ¡Sé el primero!</p>
            ) : (
                <ul className="flex flex-col gap-3">
                    {comments.map((comment) => (
                        <li key={comment.id} className="flex gap-3 rounded-lg bg-slate-100 p-3">
                            <div
                                className="rounded-full min-w-9 w-9 h-9"
                                style={{ backgroundColor: comment.profiles?.profile_img_color ?? "#000" }}
                            ></div>
                            <div className="flex-1 min-w-0 flex flex-col gap-1">
                                <div className="flex flex-wrap items-baseline gap-x-2">
                                    {comment.profiles ? (
                                        <Link href={`/profile/${comment.profiles.id}/posts`} className="font-bold text-sm hover:underline">
                                            {comment.profiles.name}
                                        </Link>
                                    ) : (
                                        <span className="font-bold text-sm">Usuario</span>
                                    )}
                                    <span className="text-xs text-slate-600">{formatDate(comment.created_at)}</span>
                                </div>
                                <p className="text-sm whitespace-pre-line break-words">{comment.body}</p>
                            </div>
                            {canDelete(comment) && (
                                <form action={deleteCommentAction.bind(null, comment.id)}>
                                    <button
                                        type="submit"
                                        title="Eliminar comentario"
                                        aria-label="Eliminar comentario"
                                        className="p-1 rounded-full text-slate-500 hover:text-red-600 hover:bg-slate-200 transition cursor-pointer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </form>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
