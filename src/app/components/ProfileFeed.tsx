import { PostType } from "../utils/definitions";
import Post from "./Post";

type Props = {
    posts: PostType[] | undefined

}

export default async function ProfileFeed({ posts }: Props) {

    return (
        <>
            <div className="pt-5 pb-10 flex flex-col gap-5">
                <h2 className="font-bold text-xl font-second">Publicaciones</h2>
                {
                    posts ? posts.map((post, i) => {
                        
                        return(
                            <Post key={i} {...post} />
                        )
                    }) :
                    <h2 className="text-center font-second font-semibold">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
                }
            </div>
        </>
    )
}
