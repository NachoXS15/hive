import type { NextConfig } from "next";

// Nota: no usamos `cacheComponents`. Casi todas las páginas dependen de la sesión
// del usuario (cookies de Supabase), así que son dinámicas por naturaleza y con
// Cache Components Next exige envolver cada fetch en <Suspense> o marcar la ruta
// con `instant = false`.
const nextConfig: NextConfig = {};

export default nextConfig;
