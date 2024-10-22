'use server'
import { auth } from "@/auth";

const userType = async () => {
    const res = await auth();
    return res?.user.user_type;
}
export default userType;