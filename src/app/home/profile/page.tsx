import Profile from "@/app/components/Profile";
import ProfileFeed from "@/app/components/ProfileFeed";


export default function page() {
	return (
		<main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
			<Profile />
			<ProfileFeed />
		</main>
	)
}
