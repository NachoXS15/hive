import { Plus } from 'lucide-react';
import React from 'react'

export default function AddLink() {
    return (
        <div>
            <button
                className={`rounded-lg px-3 py-3 text-black-main border border-dashed border-black-main flex items-center gap-2 font-semibold`}
                style={{ fontSize: "0.9em" }}
            >
                <Plus />
                Agregar Link
            </button>
        </div>
    );
}
