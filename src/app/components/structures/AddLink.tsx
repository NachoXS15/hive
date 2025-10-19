'use client'

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { insertLink } from '@/app/lib/data-client';

type AddLinkProps = {
  id: string | undefined
};
export default function AddLink({id}: AddLinkProps) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            return;
        }
        await insertLink(url, id, name)
        setName("");
        setUrl("");
        setShowModal(false)
    }

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="transition cursor-pointer rounded-lg px-3 py-3 text-black-main border hover:bg-black-main hover:text-white hover:border-white border-dashed border-black-main flex items-center gap-2 font-semibold"
                style={{ fontSize: "0.9em" }}
            >
                <Plus />
                Agregar Link
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black-main/40 font-second flex justify-center items-center z-50">
                    <div className="bg-slate-50 rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            <X />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Agregar nueva red social</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la red social</label>
                                <select
                                    name="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-main"
                                >
                                    <option value="">Selecciona una red</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="porftolio_cv">Porftolio/CV</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                <input
                                    type="url"
                                    name="url"
                                    required
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-main"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 w-full bg-black-main text-yellow-main rounded-lg hover:bg-yellow-main hover:text-black-main"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}