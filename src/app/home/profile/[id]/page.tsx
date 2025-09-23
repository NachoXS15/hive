import Profile from "@/app/components/Profile";
import ProfileFeed from "@/app/components/ProfileFeed";
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

    return (
        <main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
            <Profile id={id}/>
            <ProfileFeed />
        </main>
    )
}