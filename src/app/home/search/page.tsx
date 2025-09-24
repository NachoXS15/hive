import SearchFormResults from "@/app/components/structures/SearchFormResults";
import { fetchUsers } from "@/app/lib/data-server";
import { ProfileType } from "@/app/utils/definitions";

export default async function page() {

	const profiles: ProfileType[] = (await fetchUsers()) ?? [];
	console.log(profiles);
	

	return (
		<main className="w-full min-h-[600px] px-7 flex flex-col items-center justify-center">
			<SearchFormResults profiles={profiles} />
		</main>
	)
}
