import { PostType } from "../../utils/definitions";
import Post from "./Post";

type Props = {
    posts: PostType[] | undefined | null
    auth_status: string | undefined
}

export default async function ProfileFeed({ posts, auth_status }: Props) {

    return (
        <>
            <div className="pt-5 pb-10 flex flex-col gap-5">
                {posts && posts.length > 0 ? <h2 className="font-bold text-xl font-second">Publicaciones</h2> : null}
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
