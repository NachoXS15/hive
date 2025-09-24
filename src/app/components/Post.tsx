import { PostType } from "../utils/definitions"

type Props = {
	post: PostType
}

export default function Post({created_at, body, likes, profiles}: PostType) {
	return (
		<article className="w-full h-fit flex flex-col font-second bg-slate-200 rounded-lg p-5">
			<div id="post-header" className="w-fit flex items-center gap-4">
				<div className="rounded-full min-w-[60px] min-h-[60px] bg-cover bg-center" style={{ backgroundImage: `url('/images/nacho.webp')` }}>
                </div>
				<div>
					<h2 className="font-bold font-second">{profiles.name} <span className="font-normal">realizó un post</span></h2>
					<span>{created_at}</span>
				</div>
			</div>
			<div id="post-body" className="mt-4">
				<p className="">{body}</p>
			</div>
			<div id="post-footer" className="rounded-lg mt-5 bg-slate-300 border-t-2 border-t-slate-200 w-full flex items-center h-[40px]">
				<button className="hover:cursor-pointer hover:bg-slate-500 hover:text-slate-50 transition w-1/3 border-r border-r-slate-400 bg-slate-300 h-full">Me gusta</button>
				<button className="hover:cursor-pointer hover:bg-slate-500 hover:text-slate-50 transition w-1/3 border-r border-r-slate-400 bg-slate-300 h-full">Comentar</button>
				<button className="hover:cursor-pointer hover:bg-slate-500 hover:text-slate-50 transition w-1/3 bg-slate-300 h-full">Compartir</button>
			</div>
		</article>
	)
}
