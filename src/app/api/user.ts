import Access_token from "@/utils/session";
import axios from "axios";
import { headers } from "next/headers";

export const activeUser = async (userId: any) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

export const userDetail = async (userId: string) => {
    const token = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token},`
            }
        });
        return response.data;
    } catch (e) {
        console.log('error', e);
    }
}
export const createUser = async (user: FormData) => {
    console.log("User->", user)
    const session = await Access_token();
    console.log("token->", session)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, user, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log('create role->', response.data)
        return response.data
    } catch (error) {
        const code = (error as any).response.data
        if (code.statusCode === 400) return code;
        console.log('Error fetching data:', error);
    }
};

export const editUser = async (userId: string, user: FormData) => {
    console.log("User->", user)
    const session = await Access_token();
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, user, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log('create role->', response.data)
        return response.data
    } catch (error) {
        const code = (error as any).response.data
        if (code.statusCode === 400) return code;
        console.log('Error fetching data:', error);
    }
};
