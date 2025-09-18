import { Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-20 flex items-center bg-yellow-main justify-around">
            <h2 className="font-main text-4xl font-black">HIVE</h2>
            <div className="flex items-center gap-20">
                <Link href="/" className="font-second font-bold uppercase">Explorar</Link>
                <Link href="/" className="font-second font-bold uppercase">Contratar</Link>
                <form action="" className="flex items-center gap-2">
                    <input type="text" className="bg-white rounded-full px-5 py-1" name="buscar" placeholder="Buscar personas" />
                    <button type="submit"><Search /></button>
                </form>
            </div>
            <button className="text-yellow-main bg-black-main rounded-full w-12 h-12 hover:cursor-pointer font-bold text-xl">IP</button>
        </header>
    )
}
