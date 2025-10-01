export function formatDate(dateString: string): string {
  // convertir a Date (JS interpreta siempre en UTC si viene con +00:00)
  const date = new Date(dateString);

  // Opciones de formato en español
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",    // 24
    month: "long",     // Septiembre
    year: "numeric",   // 2025
    hour: "2-digit",   // 17
    minute: "2-digit", // 00
    hour12: false,     // formato 24h
    timeZone: "America/Argentina/Buenos_Aires", // zona horaria -03:00
  };

  const formatter = new Intl.DateTimeFormat("es-AR", options);

  // obtener partes por separado
  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? "";

  const day = get("day");
  const month = capitalize(get("month"));     // Septiembre
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");

  return `${day} de ${month} de ${year}, ${hour}:${minute}`;
}

// helper para mayúscula inicial
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}