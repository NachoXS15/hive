import { Plus } from 'lucide-react';
import React from 'react'

export default function AddLink() {
    return (
        <div>
            <button
                className={`transition rounded-lg px-3 py-3 text-black-main border hover:bg-black-main hover:text-white hover:border-white border-dashed border-black-main flex items-center gap-2 font-semibold`}
                style={{ fontSize: "0.9em" }}
            >
                <Plus />
                Agregar Link
            </button>
        </div>
    );
}
