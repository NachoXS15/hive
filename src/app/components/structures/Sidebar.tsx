import { Bell, Home, Star, User } from "lucide-react";

export default function Sidebar() {
  return (
    <nav className="min-h-screen w-1/4 font-main flex bg-black-main justify-center py-20">
        <div className="flex gap-5 flex-col dark:text-white">
            <div className="flex gap-4">
                <Home size={30} />
                <span className="text-xl">Inicio</span>
            </div>
            <div className="flex gap-4">
                <Star size={30}/>
                <span className="text-xl">Novedades</span>
            </div>
            <div className="flex gap-4">
                <Bell size={30}/>
                <span className="text-xl">Notificaciones</span>
            </div>
            <div className="flex gap-4">
                <User size={30}/>
                <span className="text-xl">Perfil</span>
            </div>
        </div>
    </nav>
  )
}