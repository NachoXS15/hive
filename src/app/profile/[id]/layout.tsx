import React from "react"
import Header from "../../components/structures/Header"

import MenuStateReset from "../../components/misc/MenuStateReset"
import Footer from "../../components/structures/Footer"
import { fetchUserById } from "../../lib/data-server"
import Profile from "../../components/structures/Profile"
import { createClient } from "@/app/utils/supabase/server"

type Props = {
  children: React.ReactNode
    params: Promise<{ id: string }>

}


export default async function layout({ children, params }: Props) {
	const supabase = await createClient();
	const {id} = await params
	const auth_status = "";
	const loggedProfile = (await supabase.auth.getUser()).data.user
	if (!loggedProfile) {
		console.log("no hay perfil");
	}else{}
	const logProfile = loggedProfile && await fetchUserById(loggedProfile?.id)
	
	return (
		<>
			<MenuStateReset />
			<Header profile={loggedProfile} profileName={logProfile?.name} />
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
