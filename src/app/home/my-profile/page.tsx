import Profile from "@/app/components/Profile";
import ProfileFeed from "@/app/components/ProfileFeed";
import { createClient } from "@/app/utils/supabase/server";


export default async function page() {
	
	const supabase = await createClient();
	const {data, error} = await supabase.auth.getUser();
	if (error) {
		return error;
	}
	const id = data?.user?.id

	return (
		<main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
			<Profile id={id}/>
			<ProfileFeed />
		</main>
	)
}
