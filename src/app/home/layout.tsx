import React from "react"
import Header from "../components/Header"
import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import MenuStateReset from "../components/MenuStateReset"
import Footer from "../components/Footer"

export default async function layout({ children }: { children: React.ReactNode }) {

	const supabase = await createClient()

	const { data, error } = await supabase.auth.getUser()
	if (error || !data?.user) {
		redirect('/login')
	}
	return (
		<>
			<MenuStateReset />
			<Header />
			{children}
			<Footer />
		</>
	)
}
