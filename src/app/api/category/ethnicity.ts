import Access_token from "@/utils/session";
import axios from "axios";

export const getEthnicityList = async () => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ethnicities`, {
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
export const createEthnicity = async (ethnicity: CategoryType) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ethnicities`, ethnicity, {
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
export const editEthnicity = async (ethnicity: CategoryType, ethnicityId: number) => {
    const session = await Access_token();
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/ethnicities/${ethnicityId}`, ethnicity, {
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
export const deleteEthnicity = async (ethnicityId: string) => {
    const session = await Access_token();
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/ethnicities/${ethnicityId}`, {
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