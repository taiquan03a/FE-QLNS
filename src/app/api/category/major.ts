import Access_token from "@/utils/session";
import axios from "axios";

export const getMajorList = async () => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/major`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data->", response.data);
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
export const createMajor = async (degree: CategoryType) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/major`, degree, {
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
export const editDegree = async (degree: CategoryType, degreeId: number) => {
    const session = await Access_token();
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/category/major/${degreeId}`, degree, {
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
export const deleteDegree = async (degreeId: string) => {
    const session = await Access_token();
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/major/${degreeId}`, {
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