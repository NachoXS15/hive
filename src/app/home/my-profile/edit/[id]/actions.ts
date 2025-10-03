'use server'

import { ProfileType } from "@/app/utils/definitions";
import { createClient } from "@/app/utils/supabase/server"


export default async function HandleSubmit(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get('id') as string;
    const data: ProfileType = {
        name: formData.get("name")?.toString(),
        mail: formData.get("mail")?.toString(),
        username: formData.get("user")?.toString(),
        job_avaliable: formData.get("job_avaliable")?.toString(),
        degree: formData.get("degree")?.toString(),
        university: formData.get("university")?.toString(),
        desc: formData.get("desc")?.toString(),
        student_status: formData.get("student_status")?.toString(),
        province: formData.get("province")?.toString(),
        birthday: formData.get("birthday")?.toString()
    }

    console.log(id, data);

    if (!id) {
        console.error("id invalido");
        return;
    }
}
