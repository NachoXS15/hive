import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import DocProfile from "@/app/components/ui/DocProfile";
import Link from "next/link";
import { fetchDocsById } from "@/app/lib/data-server";


export default async function page() {

	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();
	if (error) {
		redirect("/error/403")
	}
	const id: string = user?.id ?? ""
	const docs = await fetchDocsById(id);
	console.log(docs);

	return (
		<>

			<div className="w-full pt-5 pb-10 flex flex-col gap-5 font-second text-black-main">
				<div className="w-full flex items-center">
					<button className="w-full">
						<Link href="/my-profile/posts" className="w-full font-bold hover:bg-black-main hover:text-yellow-main text-xl py-2 px-5 rounded-lg font-second hover:cursor-pointer transition active:text-white">Publicaciones</Link>
					</button>
					<button className="w-full">
						<Link href="/my-profile/docs" className="w-full font-bold text-xl py-2 px-5 rounded-lg font-second bg-black-main text-yellow-main hover:cursor-pointer transition active:text-white">Documentos</Link>
					</button>
				</div>
				{
					docs && docs.length > 0 ? docs.reverse().map((post, i) => {

						return (
							<DocProfile key={i} />
						)
					}) :
						<h2 className="text-center font-second font-semibold">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
				}
			</div>
		</>
	)
}
