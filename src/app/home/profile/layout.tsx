import React from "react"
import Header from "../../components/structures/Header"

import MenuStateReset from "../../components/misc/MenuStateReset"
import Footer from "../../components/structures/Footer"
import { createClient } from "../../utils/supabase/server"
import { fetchUserById } from "../../lib/data-server"
import Profile from "../../components/structures/Profile"

export default async function layout({ children }: { children: React.ReactNode }) {

	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()

	const profile = user ? await fetchUserById(user?.id) : null
	const auth_status = user?.role
    const id: string = user?.id ?? ""

	return (
		<>
			<MenuStateReset />
			<Header profile={user} profileName={profile?.name} />
			<main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
				<Profile auth_status={auth_status} id={id}/>
				<section className="md:px-10 w-full mt-10 xl:shadow-xl rounded-lg 2xl:w-3/6 xl:w-7/12 md:w-2/4 h-fit flex flex-col gap-5">
					{children}
				</section>
			</main>
			<Footer />
		</>
	)
}
