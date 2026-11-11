'use client';

import { useLayoutEffect } from 'react';

// Al navegar, Next.js lleva el scroll hasta el comienzo de la página (page.tsx) si no
// está a la vista. En /my-profile la página (solapas + publicaciones) va debajo del
// perfil y de "Crear post", que están en el layout, así que al entrar la vista bajaba
// sola hasta los posts. Este componente vuelve arriba cuando se entra a la sección.
// - Va al final del layout para que su efecto corra después del de Next.
// - Cambiar de solapa no vuelve a montar el layout, así que ahí no hace nada.
// - Con atrás/adelante no hace nada, para que el navegador restaure la posición.

type NavigateEventLike = Event & { navigationType?: string };

let ultimaNavegacion: string | undefined;

// Navigation API: avisa el tipo de cada navegación ('push', 'replace', 'traverse'...).
if (typeof window !== 'undefined' && 'navigation' in window) {
    (window.navigation as EventTarget).addEventListener('navigate', (e) => {
        ultimaNavegacion = (e as NavigateEventLike).navigationType;
    });
}

export default function ScrollToTopOnEnter() {
    useLayoutEffect(() => {
        if (ultimaNavegacion === 'traverse') return;
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return null;
}
