// Tiempo relativo corto en español: "ahora", "hace 5 min", "hace 3 h", "ayer",
// "hace 4 d" o la fecha (ej. "28 oct") si pasó más de una semana.
export function timeAgo(dateString: string, now: number = Date.now()): string {
    const date = new Date(dateString)
    const minutes = Math.floor(Math.max(0, now - date.getTime()) / 60_000)
    if (minutes < 1) return "ahora"
    if (minutes < 60) return `hace ${minutes} min`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `hace ${hours} h`
    const days = Math.floor(hours / 24)
    if (days === 1) return "ayer"
    if (days < 7) return `hace ${days} d`
    return new Intl.DateTimeFormat("es-AR", {
        day: "numeric",
        month: "short",
        timeZone: "America/Argentina/Buenos_Aires",
    }).format(date)
}
