import { LogIn, LogOut, Menu, Search, SettingsIcon, Star, User2, UserPlus2 } from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import DropdownMenuSearch from "../ui/DropdownMenuSearch";
import DropdownMenuProfile from "../ui/DropdownMenuProfile";

export default function Header({ profile }: { profile: User | null }) {

    return (
        <>
            <div className="relative">
                <input type="checkbox" className="peer hidden" id="navbar-open" />
                <header className="w-full h-20 relative flex items-center bg-yellow-main justify-between md:justify-around px-10">
                    <Link href="/home" className="font-main text-4xl font-black hover:scale-110 transition">hive</Link>
                    <nav className="hidden md:flex items-center gap-8 xl:gap-15 2xl:gap-20">
                        <Link href="/" className="font-second font-bold uppercase hover:text-yellow-main hover:bg-black-main transition cursor-pointer px-2 py-1 rounded">Explorar</Link>
                        <Link href="/" className="font-second font-bold uppercase hover:text-yellow-main hover:bg-black-main transition cursor-pointer px-2 py-1 rounded">Contratar</Link>
                        <label htmlFor="dropdown-search-open" className="font-second font-bold uppercase hover:text-yellow-main hover:bg-black-main transition cursor-pointer px-2 py-1 rounded">Buscar</label>
                        <input type="checkbox" className="peer hidden" id="dropdown-search-open" />
                        <DropdownMenuSearch />

                    </nav>
                    {
                        profile ? (
                            <>
                                <label htmlFor="dropdown-menu-open" className="hidden md:flex items-center justify-center text-yellow-main bg-black-main rounded-full w-12 h-12 hover:cursor-pointer font-bold text-xl select-none hover:text-black-main hover:bg-yellow-main hover:border-2 border-black-main transition">IP</label>
                                <input type="checkbox" className="peer hidden" id="dropdown-menu-open" />
                                <DropdownMenuProfile profile={profile} />
                                <label className="md:hidden inline-block cursor-pointer" htmlFor="navbar-open">
                                    <Menu size={28} />
                                </label>
                            </>
                        ) : (
                            <>
                                <label htmlFor="dropdown-menu-open" className="hidden md:flex items-center justify-center text-yellow-main bg-black-main rounded-full w-12 h-12 hover:cursor-pointer font-bold text-xl select-none hover:text-black-main hover:bg-yellow-main hover:border-2 border-black-main transition"><User2 /></label>
                                <input type="checkbox" className="peer hidden" id="dropdown-menu-open" />
                                <DropdownMenuProfile profile={profile} />
                                <label className="md:hidden inline-block cursor-pointer" htmlFor="navbar-open">
                                    <Menu size={28} />
                                </label>
                            </>
                        )

                    }

                </header>
                <div className="md:hidden peer-checked:block hidden z-50 w-full absolute bg-black-main text-yellow-main top-20" id="menu-open">
                    <div className="w-full bg-semi-black bg-opacity-20 h-fit z-50">
                        {
                            profile ? (
                                <nav className="w-full flex flex-col gap-4 p-5 font-medium">
                                    <Link href="/" className="flex items-center gap-2 font-medium active:scale-110 transition"><Star />Explorar</Link>
                                    <Link href="/" className="flex items-center gap-2 font-medium active:scale-110 transition"><Search />Buscar</Link>
                                    <hr />
                                    <Link href="/home/my-profile" className="flex items-center gap-2 font-medium active:scale-110 transition"><User2 />Mi Perfil</Link>
                                    <Link href="/" className="flex items-center gap-2 font-medium active:scale-110 transition"><SettingsIcon />Configuración</Link>
                                    <Link href="/auth/logout" className="flex items-center gap-2 font-medium active:scale-110 transition"><LogOut />Cerrar Sesión</Link>
                                </nav>

                            ) : (
                                <nav className="w-full flex flex-col gap-4 p-5 font-medium">
                                    <Link href="/" className="flex items-center gap-2 w-full rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition px-2 py-1"><Star />Explorar</Link>
                                    <Link href="/" className="flex items-center gap-2 w-full rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition px-2 py-1"><Search />Buscar</Link>
                                    <hr />
                                    <Link href="/auth/login" className="flex items-center gap-2 w-full rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition px-2 py-1"><LogIn /> Iniciar sesión</Link>
                                    <Link href="/auth/register" className="flex items-center gap-2 w-full rounded hover:text-black-main hover:bg-yellow-main font-medium active:scale-110 transition px-2 py-1"><UserPlus2 /> Crear cuenta</Link>
                                </nav>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
