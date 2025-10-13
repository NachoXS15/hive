import CreatePost from "../components/structures/CreatePost";
import Post from "../components/structures/Post";
import { fetchDocs, fetchPosts, fetchUserById } from "../lib/data-server";
import { createClient } from "../utils/supabase/server";

export default async function page() {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.log("No hay perfil");

        // redirect("/404")
    }
    const profile = data.user ? await fetchUserById(data.user.id) : null;
    const id = data.user?.id
    console.log(profile);
    const posts = await fetchPosts();
    const docs = await fetchDocs();
    return (
        profile ? (
            <main className="flex items-center justify-center w-full h-fit px-10">
                <div className="w-full md:w-7/12 xl:w-4/12 h-fit flex flex-col items-center">
                    <h2 className="font-second font-semibold mt-7 self-start">Bienvenid@, <span className="bg-yellow-main text-black-main px-3 py-1 rounded">{profile?.name}</span></h2>
                    <CreatePost id={id} profile={null} />
                    <div className="w-full py-10 flex flex-col gap-5">
                        <h2 className="font-bold text-xl font-second">Publicaciones</h2>
                        {
                            posts ? posts.reverse().map((post, i) => {

                                return (
                                    <Post key={i} post={post} docs={docs} />
                                )
                            }) :
                            <h2 className="text-center font-second font-semibold">Este usuario no ha compartido nada. <br />Esperemos se anime :D</h2>
                        }
                    </div>
                </div>
            </main>
        ) : (
            <main className="flex items-center justify-center w-full h-[600px]">
                <h2>Feed</h2>
            </main>
        )
    )
}
