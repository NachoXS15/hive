import type { NextRequest } from 'next/server'
import { updateSession } from './app/utils/supabase/middleware'

// Next 16: "proxy" reemplaza a "middleware". Refresca la sesión de Supabase
// en cada request y protege las rutas privadas.
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Todo excepto assets estáticos e imágenes
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
