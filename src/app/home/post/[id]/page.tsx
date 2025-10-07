import Post from "@/app/components/structures/Post";
import { fetchPostsById } from "@/app/lib/data-server";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { redirect } from "next/navigation";

import { InferGetServerSidePropsType } from "next/types";


export default async function page({
    params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {id} = await params
    const post = await fetchPostsById(id)
    if (!post) {
        redirect("/error/404")
    }
    return (
        <Post post={post}  />
    )
}
