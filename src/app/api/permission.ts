import Access_token from "@/utils/session";
import axios from "axios";


export const getPermissions = async () => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/permission`, {
            headers: {
                Authorization: `Bearer ${session}`, // Thêm Authorization vào header
            },
        });
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};