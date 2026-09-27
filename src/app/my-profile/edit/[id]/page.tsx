import { redirect } from "next/navigation";

// Pantalla duplicada: la edición de perfil vive en /edit-profile/[id].
export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	redirect(`/edit-profile/${id}`)
}
