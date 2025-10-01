import { BookHeart, User2 } from "lucide-react";
import Link from "next/link";
export default function DropdownMenuSearch() {
    return (
        <div className="hidden peer-checked:block z-50 w-60 absolute rounded-2xl bg-black-main text-yellow-main top-20 md:right-20 xl:right-96" id="menu-open">
            <div className="w-full bg-semi-black bg-opacity-20 h-fit z-50">
                <nav className="w-full flex flex-col gap-2 p-3 font-medium">
                    <Link href="/home/search/profiles" className="flex items-center gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><User2 /> Buscar Perfiles</Link>
                    <Link href="/home/search/documents" className="flex items-center gap-2 py-2 w-full px-2 rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition"><BookHeart /> Buscar Documentos</Link>
                </nav>
            </div>
        </div>
    )
}
