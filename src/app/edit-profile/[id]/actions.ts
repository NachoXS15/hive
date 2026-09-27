'use server'

import { updateBasicUser, updateInfoUser } from "@/app/lib/data-server";
import { ProfileType, UserPublicInfo } from "@/app/utils/definitions";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function HandleSubmit(formData: FormData) {

    // El id sale SIEMPRE de la sesión, nunca del formulario:
    // así nadie puede editar el perfil de otra persona cambiando el input oculto.
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/auth/login');
    }
    const id = user.id;

    const dataBasic: ProfileType = {
        name: formData.get("name")?.toString(),
        mail: formData.get("mail")?.toString(),
        username: formData.get("user")?.toString(),
        profile_img_color: formData.get("color_img")?.toString()
    }

    const dataInfo: UserPublicInfo = {
        job_avaliable: formData.get("job_avaliable")?.toString(),
        degree: formData.get("degree")?.toString(),
        dept: formData.get("dept")?.toString(),
        desc: formData.get("desc")?.toString(),
        student_status: formData.get("student_status")?.toString(),
        province: formData.get("province")?.toString(),
        birthday: formData.get("birthday")?.toString()
    }

    const basicError = await updateBasicUser(dataBasic, id)
    const infoError = await updateInfoUser(dataInfo, id)
    if (basicError || infoError) {
        redirect('/error');
    }

    revalidatePath('/my-profile', 'layout');
    redirect('/my-profile/posts');
}
