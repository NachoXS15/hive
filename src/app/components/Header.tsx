import { FileText, LogOut, Menu, Search, SettingsIcon, Star, User2 } from "lucide-react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import MenuStateReset from "./MenuStateReset";

export default function Header() {
    return (
        <>
            
            <div className="relative">
                <input type="checkbox" className="peer hidden" id="navbar-open" />
                <header className="w-full h-20 relative flex items-center bg-yellow-main justify-between md:justify-around px-10">
                    <Link href="/home" className="font-main text-4xl font-black">HIVE</Link>
                    <nav className="hidden md:flex items-center gap-8 xl:gap-15 2xl:gap-20">
                        <Link href="/" className="font-second font-bold uppercase">Explorar</Link>
                        <Link href="/" className="font-second font-bold uppercase">Contratar</Link>
                        <form action="" className="flex items-center gap-2">
                            <input type="text" className="bg-white rounded-full px-5 py-1" name="buscar" placeholder="Buscar personas" />
                            <button type="submit"><Search /></button>
                        </form>
                    </nav>
                    <label htmlFor="dropdown-menu-open" className="hidden md:flex items-center justify-center text-yellow-main bg-black-main rounded-full w-12 h-12 hover:cursor-pointer font-bold text-xl select-none hover:text-black-main hover:bg-yellow-main hover:border-2 border-black-main transition">IP</label>
                    <input type="checkbox" className="peer hidden" id="dropdown-menu-open" />
                    <DropdownMenu />
                    <label className="md:hidden inline-block cursor-pointer" htmlFor="navbar-open">
                        <Menu size={28} />
                    </label>
                </header>
                <div className="md:hidden peer-checked:block hidden z-50 w-full absolute bg-black-main text-yellow-main top-20" id="menu-open">
                    <div className="w-full bg-semi-black bg-opacity-20 h-fit z-50">
                        <nav className="w-full flex flex-col gap-4 p-5 font-medium">
                            <span className="flex items-center gap-2 font-medium active:scale-110 transition"><Star />Explorar</span>
                            <span className="flex items-center gap-2 font-medium active:scale-110 transition"><FileText />Proyectos</span>
                            <hr />
                            <span className="flex items-center gap-2 font-medium active:scale-110 transition"><User2 />Mi Perfil</span>
                            <span className="flex items-center gap-2 font-medium active:scale-110 transition"><SettingsIcon />Configuración</span>
                            <span className="flex items-center gap-2 font-medium active:scale-110 transition"><LogOut />Cerrar Sesión</span>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
