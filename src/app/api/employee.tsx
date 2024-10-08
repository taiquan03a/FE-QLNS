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