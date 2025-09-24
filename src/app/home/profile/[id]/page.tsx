import Profile from "@/app/components/Profile";
import ProfileFeed from "@/app/components/ProfileFeed";
import { fetchPostsById } from "@/app/lib/data-server";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";


export default async function page({
    params,
}: InferGetServerSidePropsType<typeof getServerSideProps>)
{
    
    const {id} = await params;
    if (!id) {
        return "No id.";
    }
    const posts = await fetchPostsById(id)
    console.log(posts);
    
    
    return (
        <main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
            <Profile id={id}/>
            <section className="md:px-10 w-full mt-10 shadow-xl rounded-lg px-5 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit bg-slate-50">   
                <ProfileFeed posts={posts} />
            </section>
        </main>
    )
}