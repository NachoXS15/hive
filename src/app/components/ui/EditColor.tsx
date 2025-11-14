'use client'

import { useState } from "react"

type Props = {
    color: string | undefined
}

export default function EditColor({color}: Props) {
    const [selectedColor, setSelectedColor] = useState(color)

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value)   
    }

    return (
        <div className="h-full w-full flex justify-between flex-col gap-2 xl:gap-1.5">
            <div className="w-full h-[100px] rounded-lg border" style={{ backgroundColor: `${selectedColor}` }}></div>
            <div className="flex items-center justify-between px-2 py-1 border rounded-lg">
                <span>Seleccionar color:	</span>
                <input type="color" name="color_img" onChange={(e) => handleColorChange(e)} className="w-1/4 rounded-lg" defaultValue={selectedColor} />
            </div>
        </div>
    )
}
