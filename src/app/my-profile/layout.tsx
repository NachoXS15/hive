import { redirect } from "next/navigation";
import MenuStateReset from "../components/misc/MenuStateReset";
import Header from "../components/structures/Header";
import { createClient } from "../utils/supabase/server";
import { fetchFullUser } from "../lib/data-server";
import Profile from "../components/structures/Profile";
import Footer from "../components/structures/Footer";
import CreatePost from "../components/structures/CreatePost";

export default async function layout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        redirect("/error/403")
    }
    const id: string = user?.id ?? ""
    const profile = await fetchFullUser(id)
    const auth_status = user?.role

    return (
        <>
            <MenuStateReset />
            <Header profile={user} profileName={profile?.name} />
            <main className="w-full h-fit flex py-10 items-center flex-col px-6 md:px-0">
                <Profile auth_status={auth_status} id={id} />
                <section className="xl:px-10 w-full mt-10 xl:shadow-xl rounded-lg 2xl:w-3/6 xl:w-7/12 md:w-3/4 h-fit flex flex-col gap-5">
					<CreatePost profile={profile} id={id} />
					{children}
				</section>
            </main>
            <Footer />
        </>
    )
}
