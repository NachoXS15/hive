import { PostType } from "../../utils/definitions";
import Post from "./Post";

type Props = {
    posts: PostType[] | undefined | null
    auth_status?: string | undefined
}

export default async function ProfileFeed({ posts, auth_status }: Props) {

    return (
        <>
            <div className="pt-5 pb-10 flex flex-col gap-5 font-second text-black-main">
                <div className="w-full flex items-center">
                    <button className="w-1/2">
                        <h2 className="font-bold hover:rounded-t-lg text-xl py-1 font-second hover:cursor-pointer hover:bg-slate-400 transition active:text-white hover:text-white">Publicaciones</h2>
                    </button>
                    <button className="w-1/2">
                        <h2 className="font-bold text-xl py-1 font-second hover:rounded-t-lg hover:cursor-pointer hover:bg-slate-400 transition active:text-white hover:text-white">Documentos</h2>
                    </button>
                </div>
                {
                    posts && posts.length > 0 ? posts.reverse().map((post, i) => {
                        
                        return(
                            <Post key={i} auth_status={auth_status} post={post} />
                        )
                    }) :
                    <h2 className="text-center font-second font-semibold">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
                }
            </div>
        </>
    )
}