import { DocType } from "@/app/utils/definitions"
import { supabaseClient } from "@/app/utils/supabase/client"
import { ArrowUpRightFromSquare, FileText, User2 } from "lucide-react"
import Link from "next/link"

type Props = {
    doc: DocType | null | undefined
    
}

export default function DocSearchCard({ doc }: Props) {

    const handleDownload = async () => {
        if (!doc?.file_path) {
            alert("No se encontró el archivo para descargar");
            return;
        }
        const { data, error } = await supabaseClient.storage.from('documents').createSignedUrl(doc.file_path, 60 * 60);
        if (error) {
            console.log(error);
            alert("No se pudo descargar archivo");
        }
        if (data?.signedUrl) {
            window.open(data.signedUrl, '_blank');
        }
    }
    
    return (
        <article className="bg-slate-300 z-40 mt-3 rounded-lg px-5 w-full flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
                <FileText size={30} />
                <div className="flex flex-col">
                    <span className="font-semibold">{doc?.title}</span>
                    <span style={{ fontSize: "0.9em" }}>Año de publicación: <span>{doc?.release_year}</span></span>
                </div>
            </div>
            <button onClick={handleDownload} className="hover:text-yellow-main hover:bg-black-main p-3 rounded-full transition cursor-pointer">
                <ArrowUpRightFromSquare size={20} />
            </button>
        </article>
    )
}