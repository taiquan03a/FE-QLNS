'use server'
import { auth, signIn } from "@/auth";
import { sendRequest } from "./api";

export async function authenticate(email: string, password: string): Promise<{
    error: string,
    code: number
}> {
    try {
        const r = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        })
        console.log("r->", r);
        return r
    } catch (error) {
        if ((error as any).type === "InvaliEmailPassword") {
            return {
                error: "Tài khoản mật khẩu không chính xác.",
                code: 1
            }
        }
        return {
            "error": "hihi",
            "code": 500,
        }
    }
}
export const getUsers = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
        },
    });
    return res.data;
}
export const getRoles = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
        },
    });
    return res.data;
}