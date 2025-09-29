import React from "react"
import Header from "../components/structures/Header"

import MenuStateReset from "../components/misc/MenuStateReset"
import Footer from "../components/structures/Footer"
import { createClient } from "../utils/supabase/server"

export default async function layout({ children }: { children: React.ReactNode }) {

	const supabase = await createClient()

	const { data: {user}} = await supabase.auth.getUser()


	return (
		<>
			<MenuStateReset />
			<Header profile={user} />
			{children}
			<Footer />
		</>
	)
}
