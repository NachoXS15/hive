import { DocType } from "@/app/utils/definitions"
import { supabaseClient } from "@/app/utils/supabase/client"
import { ArrowUpRightFromSquare, User2 } from "lucide-react"

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
        <>
            {/* <article className="hidden xl:flex bg-slate-300 z-40 mt-3 rounded-lg px-5 w-full justify-between items-center py-3">
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
            </article> */}
            <article className="flex overflow-hidden bg-slate-300 z-40 mt-3 rounded-lg flex-col px-5 w-full gap-2 h-60 justify-between py-3">
                <div className="w-full rounded-lg bg-orange-300 h-11/12"></div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">{doc?.title}</h2>
                    <h3 style={{fontSize: '0.9em'}} className="font-bold">Autor: <span className="font-normal">{doc?.author}</span></h3>
                </div>
                <div className="flex items-center justify-between">
                    <span className="bg-black-main text-yellow-main px-3 py-0.5 rounded-full">{doc?.release_year}</span>
                    <button onClick={handleDownload} className="hover:text-yellow-main hover:bg-black-main p-3 rounded-full transition cursor-pointer">
                        <ArrowUpRightFromSquare size={20} />
                    </button>
                </div>
            </article>
        </>
    )
}