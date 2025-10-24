import DocProfile from "@/app/components/ui/DocProfile";
import { fetchDocsById,  } from "@/app/lib/data-server";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import Link from "next/link";


export default async function page({
    params,
}: InferGetServerSidePropsType<typeof getServerSideProps>)
{
    
    const {id} = await params;
    if (!id) {
        return "No id.";
    }
    const docs = await fetchDocsById(id)

    
    
    return (
        <div className="w-full pt-5 pb-10 flex flex-col gap-5 font-second text-black-main">
				<div className="w-full flex items-center">
					<button className="w-full">
						<Link href={`/profile/${id}/posts`}className="w-full font-bold hover:bg-black-main hover:text-yellow-main text-xl py-2 px-3 md:px-5 rounded-lg font-second hover:cursor-pointer transition active:text-white">Publicaciones</Link>
					</button>
					<button className="w-full">
						<Link href={`/profile/${id}/posts`} className="w-full font-bold text-xl py-2 px-3 md:px-5 rounded-lg font-second bg-black-main text-yellow-main hover:cursor-pointer transition active:text-white">Documentos</Link>
					</button>
				</div>
				<div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
					{
						docs && docs.length > 0 ? docs.reverse().map((doc, i) => {

							return (
								<DocProfile doc={doc} key={i} />
							)
						}) :
							<h2 className="col-span-full place-self-center text-center font-second font-semibold">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
					}
				</div>
			</div>
    )
}