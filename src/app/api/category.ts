import Access_token from "@/utils/session";
import axios from "axios";

export const getCategoryList = async (categoryName: string, currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryName}`, {
            headers: {
                Authorization: `Bearer ${session}`, // Thêm Authorization vào header
            },
            params: {
                page: currentPage,
                limit: itemsPerPage,
                search: searchParam,
                searchBy: ['code', 'name']
            },
        });
        console.log("data->", response.data);
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
export const createCategory = async (categoryNew: CategoryType, categoryName: string) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryName}`, categoryNew, {
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
export const editCategory = async (categoryUpdate: CategoryType, categoryId: number, categoryName: string) => {
    const session = await Access_token();
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryName}/${categoryId}`, categoryUpdate, {
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
export const deleteCategory = async (categoryId: string, categoryName: string) => {
    const session = await Access_token();
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryName}/${categoryId}`, {
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