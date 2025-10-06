'use client'

import { Plus } from "lucide-react";
import { useState } from "react";

export default function UpdateProfilePicture() {

    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState("");
    const [fileActive, setFileActive] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFileActive(true)
            setFileName(files[0].name);
            setFile(files[0]);
            console.log(files[0].name);
        } else {
            setFileName("");
            setFile(null);
        }
    };
    return (

        <div className="flex w-full gap-5 my-5">
            <div className="flex flex-col items-center justify-center w-full">
                <span className="self-start block mb-2 text-sm font-medium text-gray-700">Foto de perfil</span>
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-bluemain rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                >
                    <div aria-disabled={fileActive} className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Plus />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">Solo archivos .JPG, .JPEG, .PNG</p>
                    </div>
                    <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </label>
                {fileName && (
                    <p className="mt-3 text-sm text-gray-700">
                        Archivo seleccionado: {fileName}
                    </p>
                )}
            </div>
        </div>
    )
}
