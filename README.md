# Hive - Plataforma y Repositorio Digital

Como trabajo final de carrera de la Licenciatura en Diseño y Producción Multimedial de la Universidad Nacional de La Rioja, Hive es una plataforma en la que usuarios pertenecientes a la comunidad de dicha universidad pueden compartir documentación como trabajos prácticos, monográfias, ensayos, resumenes, tesis, trabajos finales, o cualquier tipo de producción que sea relevante o perteneciente a algún área de estudio o investigación. También es posible realizar publicaciones como si fuera una red social.

Su función es la de un repositorio público y digital, porque permite almacenar documetación como una biblioteca, a la que cualquier usuario de Internet puede acceder. Cada documento posee información sobre el usuario que la compartió.

## Features

- Autenticación de Usuarios y Creación de Perfiles para compartir información pública de cada usuario.
- CRD de publicación con o sin documentos adjuntos.
- Busqueda de Perfiles en base a filtros como Nombre, Departamento y Estamento Universitario
- Busqueda de Documentos en base a filtros como Nombre, Departamento, Temática y Tipo de Documento.
- Perfil propio/editable: Este es el perfil de un usuario autenticado, el cual puede ser editado y publicar contenido desde el mismo desde `/my-profile`  
- Perfil ajeno: perfil de otro usuario de solo lectura, accesible a través de busqueda o de su propio link: `/profile/[id]`
- Diseño responsivo y adaptativo a diferentes dispositivos y tamaños de pantalla.

## Stack

- Framework: Next.js 16.0
- Lenguaje: TypeScript
- Autenticación: Supabase Auth
- Almacenamiento: Supabase Storage
- DB: PostgreSQL
- Estilizado: TailwindCSS
- Deploy: Vercel
- UX/UI: Figma
- Iconos: Lucide React
