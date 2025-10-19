import React from "react"
import Header from "../components/structures/Header"
import MenuStateReset from "../components/misc/MenuStateReset"
import Footer from "../components/structures/Footer"
import { createClient } from "../utils/supabase/server"
import { fetchUserById } from "../lib/data-server"

export default async function layout({ children }: { children: React.ReactNode }) {

	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	const profile = user ? await fetchUserById(user?.id) : null

	return (
		<>
			<MenuStateReset />
			<Header profile={user} profileName={profile?.name} />
			<main className="w-full h-fit flex py-4 xl:py-10 items-center flex-col px-6 md:px-0">
				{children}
			</main>
			<Footer />
		</>
	)
}
