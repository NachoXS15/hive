import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Page() {
    return (
        <main className="flex w-full flex-col">
            <Header />
            <section className="w-full flex">
                <Sidebar />
                <section className="min-h-screen border border-white w-3/5 dark:bg-black-main"></section>
                <aside className="min-h-screen w-1/4 dark:bg-black-main"></aside>
            </section>
        </main>
    )
}
