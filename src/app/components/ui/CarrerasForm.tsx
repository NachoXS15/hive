"use client";
import { useState } from "react";

interface Props {
    dept: Record<string, string[]>;
}

export default function CarrerasForm({ dept }: Props) {
    const [departamento, setDepartamento] = useState("");
    const [carrera, setCarrera] = useState("");

    const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartamento(e.target.value);
        setCarrera(""); // reinicia carrera al cambiar depto
    };

    return (
        <>

            <label className="block mb-2 text-sm font-medium text-gray-700">Departamento</label>
            <select
                value={departamento}
                name="dept"
                onChange={handleDepartamentoChange}
                className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
                <option value="">Seleccioná un departamento</option>
                {Object.keys(dept).map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-700">Carrera</label>
            <select
                value={carrera}
                name="degree"
                onChange={(e) => setCarrera(e.target.value)}
                disabled={!departamento}
                className="w-full mb-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
                <option value="">
                    {departamento ? "Seleccioná una carrera" : "Seleccioná un departamento primero"}
                </option>
                {departamento &&
                    dept[departamento].map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
            </select>
        </>
    );
}