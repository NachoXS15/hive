import { ArrowUpRightFromSquare, FileText } from "lucide-react";
import Link from "next/link";


export default function DocProfile() {
    return (
        <article className="bg-slate-300 mt-3 rounded-lg px-5 w-full flex justify-between items-center py-3">
            <div className="flex items-center gap-2">
                <FileText />
                <div className="flex flex-col">
                    <span className="font-semibold">Trabajo de Tipografía 3</span>
                    <span>Año de publicación: <span>2025</span></span>
                </div>
            </div>
            <Link href=""><ArrowUpRightFromSquare /></Link>
        </article>
    )
}
