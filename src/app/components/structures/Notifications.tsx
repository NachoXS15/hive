import { fetchNotifications } from "@/app/lib/data-server"
import { Bell } from "lucide-react"
import NotificationsBell from "../ui/NotificationsBell"

// Trae las notificaciones del usuario en el servidor y se las pasa a la campana
export default async function Notifications({ userId }: { userId: string }) {
    const { notifications, unreadCount } = await fetchNotifications(userId)
    return (
        <NotificationsBell
            // si cambian los datos que llegan del servidor, la campana arranca de nuevo con ellos
            key={`${unreadCount}-${notifications[0]?.id ?? "vacio"}`}
            initialNotifications={notifications}
            initialUnreadCount={unreadCount}
        />
    )
}

// Lo que se ve mientras cargan: la campana sin contador
export function NotificationsBellFallback() {
    return (
        <span aria-hidden className="flex items-center justify-center rounded-full w-11 h-11 bg-black-main text-yellow-main">
            <Bell size={22} />
        </span>
    )
}
