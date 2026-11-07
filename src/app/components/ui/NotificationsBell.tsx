'use client'

import {
    fetchMyNotificationsAction,
    markAllNotificationsReadAction,
    markNotificationReadAction,
} from "@/app/lib/actions"
import { NotificationType } from "@/app/utils/definitions"
import { timeAgo } from "@/app/utils/timeAgo"
import { Bell, BellOff, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useId, useRef, useState } from "react"

type Props = {
    initialNotifications: NotificationType[]
    initialUnreadCount: number
}

// Cada cuánto se buscan notificaciones nuevas (solo con la pestaña visible)
const REFRESH_EVERY_MS = 60_000

// Campana del header: muestra cuántas notificaciones sin leer hay y, al
// clickearla, abre un panel que sale desde el botón.
export default function NotificationsBell({ initialNotifications, initialUnreadCount }: Props) {
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState(initialNotifications)
    const [unread, setUnread] = useState(initialUnreadCount)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    // Sube con cada cambio local (marcar leídas) para descartar respuestas viejas del servidor
    const localVersion = useRef(0)
    const lastPathname = useRef<string | null>(null)
    const pathname = usePathname()
    const panelId = useId()
    const titleId = useId()

    // Trae lo último del servidor
    const refresh = useCallback(async () => {
        const version = localVersion.current
        try {
            const data = await fetchMyNotificationsAction()
            if (version !== localVersion.current) return
            setNotifications(data.notifications)
            setUnread(data.unreadCount)
        } catch (error) {
            console.error("No se pudieron actualizar las notificaciones:", error)
        }
    }, [])

    // Se actualiza cada minuto y al volver a la pestaña
    useEffect(() => {
        const tick = () => {
            if (document.visibilityState === "visible") void refresh()
        }
        const timer = setInterval(tick, REFRESH_EVERY_MS)
        document.addEventListener("visibilitychange", tick)
        return () => {
            clearInterval(timer)
            document.removeEventListener("visibilitychange", tick)
        }
    }, [refresh])

    // ...y al navegar a otra página (no en la primera carga: esos datos ya vienen del servidor)
    useEffect(() => {
        if (lastPathname.current !== null && lastPathname.current !== pathname) void refresh()
        lastPathname.current = pathname
    }, [pathname, refresh])

    // Con el panel abierto: se cierra con Escape o con un click afuera
    useEffect(() => {
        if (!open) return
        const onPointerDown = (event: PointerEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false)
                buttonRef.current?.focus()
            }
        }
        document.addEventListener("pointerdown", onPointerDown)
        document.addEventListener("keydown", onKeyDown)
        panelRef.current?.focus()
        return () => {
            document.removeEventListener("pointerdown", onPointerDown)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [open])

    const toggle = () => {
        // Cierra los otros menús del header (usan checkbox) para que no se superpongan
        for (const id of ["dropdown-menu-open", "navbar-open"]) {
            const checkbox = document.getElementById(id) as HTMLInputElement | null
            if (checkbox) checkbox.checked = false
        }
        if (!open) void refresh()
        setOpen(!open)
    }

    const markAllAsRead = () => {
        localVersion.current++
        const now = new Date().toISOString()
        setNotifications((list) => list.map((n) => (n.read_at ? n : { ...n, read_at: now })))
        setUnread(0)
        void markAllNotificationsReadAction()
    }

    const openNotification = (notification: NotificationType) => {
        if (!notification.read_at) {
            localVersion.current++
            const now = new Date().toISOString()
            setNotifications((list) => list.map((n) => (n.id === notification.id ? { ...n, read_at: now } : n)))
            setUnread((count) => Math.max(0, count - 1))
            void markNotificationReadAction(notification.id)
        }
        setOpen(false)
    }

    return (
        <div ref={wrapperRef} className="relative">
            <button
                ref={buttonRef}
                type="button"
                onClick={toggle}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={unread > 0 ? `Notificaciones (${unread} sin leer)` : "Notificaciones"}
                title="Notificaciones"
                className={`relative flex items-center justify-center rounded-full w-11 h-11 cursor-pointer select-none transition border-black-main ${open
                    ? "bg-yellow-main text-black-main border-2"
                    : "bg-black-main text-yellow-main hover:bg-yellow-main hover:text-black-main hover:border-2"}`}
            >
                <Bell size={22} />
                {unread > 0 && (
                    <span
                        aria-hidden
                        className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-[0.7rem] font-bold ring-2 ring-yellow-main"
                    >
                        {unread > 9 ? "9+" : unread}
                    </span>
                )}
            </button>

            {open && (
                <div
                    ref={panelRef}
                    id={panelId}
                    role="dialog"
                    aria-labelledby={titleId}
                    tabIndex={-1}
                    className="fixed inset-x-4 top-20 z-50 md:absolute md:inset-x-auto md:right-0 md:top-[calc(100%+0.75rem)] md:w-96 origin-top-right animate-zoom-in animate-duration-200 motion-reduce:animate-none rounded-2xl bg-white text-black-main font-second shadow-2xl ring-1 ring-black-main/10 focus:outline-none"
                >
                    {/* flechita que conecta el panel con la campana */}
                    <span aria-hidden className="hidden md:block absolute -top-1.5 right-4 w-3 h-3 rotate-45 bg-black-main"></span>

                    <div className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-t-2xl bg-black-main text-yellow-main">
                        <h2 id={titleId} className="font-bold">Notificaciones</h2>
                        {unread > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                className="text-xs font-semibold underline-offset-2 hover:underline cursor-pointer"
                            >
                                Marcar todas como leídas
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                            <BellOff className="text-slate-400" />
                            <p className="font-semibold">No tenés notificaciones</p>
                            <p className="text-sm text-slate-600">
                                Te avisamos cuando alguien comente o le dé me gusta a tus publicaciones.
                            </p>
                        </div>
                    ) : (
                        <ul className="max-h-[min(28rem,70vh)] overflow-y-auto overscroll-contain divide-y divide-slate-100 rounded-b-2xl">
                            {notifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} onOpen={openNotification} />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

function NotificationItem({ notification: n, onOpen }: { notification: NotificationType; onOpen: (notification: NotificationType) => void }) {
    const isComment = n.kind === "comment"
    const href = `/home/post/${n.post_id}${isComment ? "#comentarios" : ""}`
    const excerpt = isComment ? n.comment_excerpt : n.post_excerpt

    return (
        <li>
            <Link
                href={href}
                onClick={() => onOpen(n)}
                className={`flex gap-3 px-4 py-3 transition hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none ${n.read_at ? "" : "bg-yellow-main/15"}`}
            >
                <span className="relative shrink-0 h-fit">
                    <span
                        className="block w-10 h-10 rounded-full"
                        style={{ backgroundColor: n.actor?.profile_img_color ?? "#2d2d2d" }}
                    ></span>
                    <span
                        className={`absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full ring-2 ring-white ${isComment ? "bg-black-main text-yellow-main" : "bg-yellow-main text-black-main"}`}
                    >
                        {isComment ? <MessageCircle size={11} /> : <Heart size={11} className="fill-current" />}
                    </span>
                </span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-sm leading-snug">
                        <strong>{n.actor?.name ?? "Alguien"}</strong>{" "}
                        {isComment ? "comentó tu publicación" : "le dio me gusta a tu publicación"}
                    </span>
                    {excerpt && <span className="text-sm text-slate-600 line-clamp-2">“{excerpt}”</span>}
                    <time dateTime={n.created_at} className="text-xs text-slate-500">{timeAgo(n.created_at)}</time>
                </span>
                {!n.read_at && (
                    <>
                        <span aria-hidden className="mt-1.5 w-2.5 h-2.5 shrink-0 rounded-full bg-black-main"></span>
                        <span className="sr-only">Sin leer</span>
                    </>
                )}
            </Link>
        </li>
    )
}
