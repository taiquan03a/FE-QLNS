import Access_token from "@/utils/session";
import axios from "axios";

export const getListFamily = async (userId: string, currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/families/${userId}`, {
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

export const createFamily = async (family: Family) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/families`, family, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data->", response.data);
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};