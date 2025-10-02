import CreatePost from "@/app/components/structures/CreatePost";
import Profile from "@/app/components/structures/Profile";
import ProfileFeed from "@/app/components/structures/ProfileFeed";
import { fetchPostsById } from "@/app/lib/data-server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function page() {
	
	const supabase = await createClient();
	const {data, error} = await supabase.auth.getUser();
	if (error) {
		redirect("/error/303")
	}
	const id = data?.user?.id
	const posts = await fetchPostsById(id)
	const auth_status = data?.user.role
	
	return (
		<main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
			<Profile auth_status={auth_status} id={id}/>
			<section className="md:px-10 w-full mt-10 shadow-xl rounded-lg 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit flex flex-col gap-5">
				<CreatePost id={id} />
				<ProfileFeed posts={posts} />
			</section>
		</main>
	)
}
