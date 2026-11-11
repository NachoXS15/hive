// Opciones compartidas para clasificar documentos (formulario de publicación y buscador)

export const DOC_CATEGORIES = [
    "Tesis",
    "Trabajo Final de Carrera",
    "Apunte",
    "Investigación",
    "Trabajo Práctico",
    "Monografía",
    "Prod. Audiovisual",
    "Producción Multimedia",
    "Prod. Propia",
    "Recurso",
    "Otro",
];

// Años que se pueden elegir para un documento: del actual hacia atrás hasta 2015
const DOC_FIRST_YEAR = 2015;

export function docYears(): string[] {
    const current = new Date().getFullYear();
    return Array.from({ length: current - DOC_FIRST_YEAR + 1 }, (_, i) => String(current - i));
}

export const DOC_THEMES = [
    "Diseño Gráfico",
    "Programación o Software",
    "Videojuegos",
    "Fotografía",
    "Realización Audiovisual",
    "Informes Médicos",
    "Informe de Lectura",
    "Proyectos de Investigación",
    "Analisis Historicos",
    "Criticas Literarias",
    "Informe de Prácticas Profesionales",
    "Otro",
];
