import Access_token from "@/utils/session";
import axios from "axios";


export const getPermissions = async () => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/role`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },

        });
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
export const createRole = async (role: Role) => {
    const session = await Access_token();
    console.log("token->", session)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/role`, role, {
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

export const getRole = async (roleId: any) => {
    console.log("roleId", roleId)
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/role/${roleId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("findOne->", response.data);
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};