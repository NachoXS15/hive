// import Link from "next/link";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
    return (
        <main className="flex w-full flex-col">
            <Header />
            <section className="w-full">
                <Sidebar />
                <section></section>
                <aside></aside>
            </section>
        </main>
    );
}
