import Access_token from "@/utils/session";
import axios from "axios";

export const getListExperience = async (userId: string, currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${userId}`, {
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

export const createExperience = async (experiences: Experiences) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, experiences, {
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

export const editExperience = async (experiences: Experiences) => {
    const session = await Access_token();
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, experiences, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data edit->", response.data);
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};