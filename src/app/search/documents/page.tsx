import SearchDocsFormResults from "@/app/components/structures/SearchDocsFormResults";
import { fetchDocs, fetchUsers } from "@/app/lib/data-server";
import { DocType } from "@/app/utils/definitions";

export default async function page() {

	const docs: DocType[] = (await fetchDocs()) ?? [];

	return (
		<SearchDocsFormResults docs={docs} />

	)
}
