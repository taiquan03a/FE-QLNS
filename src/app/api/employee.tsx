import Access_token from "@/utils/session";
import axios from "axios";

export const getUser = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/byNhanVien`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
            params: {
                page: currentPage,
                limit: itemsPerPage,
                search: searchParam,
                searchBy: ['code', 'name', 'phoneNumber']
            },
        });
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
export const getProfile = async (userId: string) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

export const createEmployee = async (user: FormData) => {
    console.log("User->", user)
    const session = await Access_token();
    console.log("token->", session)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/employee`, user, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log('create employee->', response.data)
        return response.data
    } catch (error) {
        const code = (error as any).response.data
        if (code.statusCode === 400) return code;
        console.log('Error fetching data:', error);
    }
};

export const active = async (userId: string) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/active/${userId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

export const getListEducation = async (userId: string, currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/${userId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
            params: {
                page: currentPage,
                limit: itemsPerPage,
                search: searchParam,
                searchBy: ['id']
            },
        });
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
