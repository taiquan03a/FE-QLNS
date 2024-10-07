import Access_token from "@/utils/session";
import axios from "axios";

export const getDegreeList = async () => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/degrees`, {
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
export const createDegree = async (degree: CategoryType) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/degrees`, degree, {
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
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/degrees/${degreeId}`, degree, {
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
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/degrees/${degreeId}`, {
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