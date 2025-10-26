'use server'

import {updateBasicUser, updateInfoUser} from "@/app/lib/data-server";
import { ProfileType, UserPublicInfo } from "@/app/utils/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function HandleSubmit(formData: FormData) {

    const id = formData.get('id') as string;
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

    console.log(id);

    if (!id) {
        console.error("id invalido");
        return;
    }

    await updateBasicUser(dataBasic, id)
    await updateInfoUser(dataInfo, id)

    revalidatePath('/my-profile/posts');
    redirect('/my-profile/posts');

}
