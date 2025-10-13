import CreatePost from "@/app/components/structures/CreatePost";
import Profile from "@/app/components/structures/Profile";
import ProfileFeed from "@/app/components/structures/ProfileFeed";
import { fetchPostsById, fetchUserById, getDocsById } from "@/app/lib/data-server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "../components/structures/Header";
import Footer from "../components/structures/Footer";
import MenuStateReset from "../components/misc/MenuStateReset";


export default async function page() {
	
	const supabase = await createClient();
	const {data: {user}, error} = await supabase.auth.getUser();
	if (error) {
		redirect("/error/303")
	}
	const id: string = user?.id ?? ""
	const posts = await fetchPostsById(id)
	const profile = await fetchUserById(id)
	const docs = await getDocsById(id);
	const auth_status = user?.role
	console.log(docs);
	
	return (
		<>
			<MenuStateReset />
			<Header profile={user} profileName={profile?.name} />
			<main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
				<Profile auth_status={auth_status} id={id}/>
				<section className="md:px-10 w-full mt-10 shadow-xl rounded-lg 2xl:w-3/6 xl:w-10/12 md:w-3/4 h-fit flex flex-col gap-5">
					<CreatePost id={id} />
					<ProfileFeed docs={docs} posts={posts} auth_status={auth_status} />
				</section>
			</main>
			<Footer />
		</>
	)
}
