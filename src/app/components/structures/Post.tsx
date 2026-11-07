import { DocType, PostType } from "../../utils/definitions"
import { formatDate } from "../../utils/DateFormatterPost"
import { CircleMinus, MessageCircle } from "lucide-react"
import { deletePostAction } from "@/app/lib/actions"
import Link from "next/link"
import DocPost from "../ui/DocPost"
import LikeButton from "../ui/LikeButton"
import ShareButton from "../ui/ShareButton"
type Props = {
	post: PostType,
	auth_status?: string | undefined
	pathname?: string
	docs?: DocType[] | undefined
	liked?: boolean // el usuario logueado ya le dio me gusta
	isLoggedIn?: boolean
}

const footerButton = "w-1/3 h-full flex items-center justify-center gap-2 text-sm hover:cursor-pointer hover:bg-slate-500 hover:text-slate-50 transition"

export default function Post({ post, auth_status, pathname, docs, liked = false, isLoggedIn = false }: Props) {
	const formatedDate = formatDate(post.created_at)
	const docsWithPosts = docs?.filter(doc => doc.post_id == post.id)
	
	return (
		<article className="w-full h-fit flex flex-col font-second bg-slate-200 rounded-lg p-5 relative group">			
			<Link
				href={`/home/post/${post.id}`}
				className={`absolute inset-0 z-10 ${pathname == "" ? "hover:bg-slate-300" : ""} transition rounded-lg`}
				aria-label="Ver detalles del post"
			></Link>

			<div id="post-header" className="w-fit flex items-center gap-4 z-20 relative">
				<div
					className="rounded-full xl:min-w-[60px] min-w-[50px] xl:min-h-[60px] min-h-[50px] bg-cover bg-center"
					style={{ backgroundColor: `${post.profiles.profile_img_color}` }}
				></div>
				<div className="flex flex-col gap-1">
					<Link href={`/profile/${post.profiles.id}/posts`} target="_blank" className="font-bold hover:underline text-regular xl:text-md font-second">
						{post.profiles.name} <span className="font-normal no-underline">realizó un post</span>
					</Link>
					<span className="text-xs md:text-md">{formatedDate}</span>
				</div>
			</div>

			<div id="post-body" className="mt-4 z-20 relative">
				<p
					style={{ fontSize: "0.9em" }}
				>
					{post.body}
				</p>
			</div>

			{docsWithPosts && docsWithPosts.length > 0 && <DocPost doc={docsWithPosts[0]} />}
			<div
				id="post-footer"
				className="@container rounded-lg mt-5 bg-slate-300 border-t-2 border-t-slate-200 w-full flex items-center h-10 z-20 relative overflow-hidden"
			>
				<LikeButton
					postId={post.id}
					liked={liked}
					count={post.likes_count}
					isLoggedIn={isLoggedIn}
					className={`${footerButton} border-r border-r-slate-400`}
				/>
				<Link
					href={`/home/post/${post.id}#comentarios`}
					className={`${footerButton} border-r border-r-slate-400`}
					title="Comentar"
					aria-label={`Comentar (${post.comments_count})`}
				>
					<MessageCircle size={18} />
					<span className="hidden @xs:inline">Comentar</span>
					{post.comments_count > 0 && <span className="font-semibold">{post.comments_count}</span>}
				</Link>
				<ShareButton postId={post.id} className={footerButton} />
			</div>
			{/* Botón de eliminar (solo si autenticado) */}
			{auth_status === "authenticated" && (
				<form action={deletePostAction.bind(null, post.id)}>
					<button
						type="submit"
						className="absolute -top-2 -right-2 hover:scale-110 cursor-pointer transition active:scale-105 z-30"
						title="Eliminar publicación"
					>
						<CircleMinus fill="white" stroke="red" />
					</button>
				</form>
			)}
		</article>
	);
}