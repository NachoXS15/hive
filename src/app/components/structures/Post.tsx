import { DocType, PostType } from "../../utils/definitions"
import { formatDate } from "../../utils/DateFormatterPost"
import { CircleMinus } from "lucide-react"
import { deleteDoc, deletePost } from "@/app/lib/data-server"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import DocPost from "../ui/DocPost"
type Props = {
	post: PostType,
	auth_status?: string | undefined
	pathname?: string
	docs?: DocType[] | undefined
}

export default function Post({ post, auth_status, pathname, docs }: Props) {
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
				className="rounded-lg mt-5 bg-slate-300 border-t-2 border-t-slate-200 w-full flex items-center h-[40px] z-20 relative"
			>
				{["Me gusta", "Comentar", "Compartir"].map((text) => (
					<button
						key={text}
						className="hover:cursor-pointer hover:bg-slate-500 hover:text-slate-50 transition w-1/3 border-r border-r-slate-400 bg-slate-300 h-full"
					>
						{text}
					</button>
				))}
			</div>
			{/* Botón de eliminar (solo si autenticado) */}
			{auth_status === "authenticated" && (
				<form
					action={async () => {
						"use server";
						await deletePost(post.id);
						if (docsWithPosts && docsWithPosts.length > 0) {
							await deleteDoc([docsWithPosts[0].file_path], docsWithPosts[0].id);
						}
						revalidatePath("/my-profile/posts");
					}}
				>
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