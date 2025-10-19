'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MenuStateReset() {
    const pathname = usePathname();

    useEffect(() => {
        const resetCheckboxes = () => {
            const navbarCheckbox = document.getElementById('navbar-open') as HTMLInputElement;
            const dropdownCheckbox = document.getElementById('dropdown-menu-open') as HTMLInputElement;

            if (navbarCheckbox) navbarCheckbox.checked = false;
            if (dropdownCheckbox) dropdownCheckbox.checked = false;
        };

        resetCheckboxes();
    }, [pathname]);

    return null;
}
