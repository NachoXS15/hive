<p align="center">
  <img src="public/images/hive_logo.png" alt="Hive" width="180" />
</p>

<h1 align="center">Hive</h1>

<p align="center">
  <b>¡Un espacio para quienes quieran crecer!</b><br />
  Plataforma para que la comunidad universitaria de la <b>UNLaR</b> publique y encuentre documentos, trabajos prácticos y producciones.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%7C%20DB%20%7C%20Storage-3ECF8E?logo=supabase&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
</p>

---

## 📖 Sobre el proyecto

**Hive** es un repositorio social: cada estudiante, graduado o docente tiene un perfil, puede compartir publicaciones con documentos PDF adjuntos y descubrir el trabajo de otras personas según su departamento y carrera.

Es el Trabajo Final de Carrera de la **Licenciatura en Diseño y Producción Multimedial** de la Universidad Nacional de La Rioja, con la tutoría de Ariel Alan Rivadulla.

## ✨ Funcionalidades

### 👤 Cuentas y perfiles
- **Registro completo**: datos personales, disponibilidad laboral, departamento y carrera de la UNLaR, estamento (estudiante, graduado, profesor, posgrado, freelance), provincia, fecha de nacimiento y una descripción.
- **Validación de contraseña** con indicador de seguridad (mínimo 8 caracteres, una mayúscula y un número).
- **Inicio y cierre de sesión** con Supabase Auth y sesión renovada automáticamente.
- **Perfil público** con avatar de color personalizable, datos académicos y profesionales, "Acerca de mí" y enlaces.
- **Enlaces a redes**: Facebook, Instagram, X/Twitter, LinkedIn y Portfolio/CV.
- **Edición de perfil**: solo el dueño puede modificar sus datos.

### 📝 Publicaciones y documentos
- **Feed** con las publicaciones de toda la comunidad, de la más nueva a la más vieja.
- **Crear publicaciones** con texto y un **PDF adjunto** opcional (título y año de publicación, hasta 20 MB).
- **Vista de detalle** de cada publicación.
- **Descarga segura** de documentos mediante enlaces firmados temporales.
- **Eliminar publicaciones**: el autor (o un admin) borra el post junto con su documento.
- Pestañas de **Publicaciones** y **Documentos** en cada perfil.

### 🔎 Búsqueda
- **Perfiles**: por nombre o usuario, estamento, departamento y carrera.
- **Documentos**: por título o autor y año de publicación.

### 🛡️ Administración
- **Panel de administración** (solo rol `admin`) con el listado de usuarios.
- Revisión y moderación del contenido (publicaciones y documentos) de cada usuario.

### ℹ️ Páginas informativas
- Landing, **Nosotros**, **Donaciones** y **Términos y Condiciones**.
- Páginas de error propias (403, 404).

## 🧱 Stack

| Capa | Tecnología |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions, Proxy) |
| UI | React 19, Tailwind CSS 4, [lucide-react](https://lucide.dev) |
| Backend | [Supabase](https://supabase.com): Auth, Postgres y Storage |
| Lenguaje | TypeScript |

## 🗂️ Estructura

```
src/
├── proxy.ts                 # Renueva la sesión y protege rutas privadas
└── app/
    ├── page.tsx             # Landing
    ├── home/                # Feed y detalle de publicación
    ├── auth/                # Login, registro, recuperación
    ├── my-profile/          # Perfil propio (posts y documentos)
    ├── edit-profile/[id]/   # Edición de perfil
    ├── profile/[id]/        # Perfil público
    ├── search/              # Búsqueda de perfiles y documentos
    ├── admin/               # Panel de administración
    ├── components/          # Componentes de UI y estructuras
    ├── lib/                 # Acceso a datos y Server Actions
    └── utils/               # Clientes de Supabase, tipos y helpers
```

## 🚀 Cómo correrlo

### Requisitos
- Node.js 20 o superior y [pnpm](https://pnpm.io)
- Un proyecto de Supabase con las tablas `profiles`, `user_public_info`, `user_links`, `posts` y `documents`, y un bucket de Storage llamado `documents`

### Pasos

```bash
git clone <url-del-repo>
cd hive
pnpm install
```

Creá un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
```

> ⚠️ Nunca subas claves privadas (como la `service_role`) al repositorio: los archivos `.env*` ya están en `.gitignore`.

```bash
pnpm dev
```

La app queda disponible en [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo (Turbopack) |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | Revisa el código con ESLint |

## 🛣️ Próximamente

- [ ] Recuperación de contraseña por e-mail
- [ ] Fotos de perfil
- [ ] Seguir usuarios
- [ ] Me gusta, comentarios y compartir
- [ ] Donaciones por Mercado Pago y Cafecito

## 👥 Autores

- **Ignacio Joaquín Pantoja**
- **Paula Fuentes**

📧 Soporte: [hivearg80@gmail.com](mailto:hivearg80@gmail.com)

---

<p align="center">Hecho con 💛 en La Rioja, Argentina</p>
