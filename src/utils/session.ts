'use server'
import { auth } from "@/auth";

const Access_token = async () => {
    const res = await auth();
    return res?.user.access_token;
}
export default Access_token;