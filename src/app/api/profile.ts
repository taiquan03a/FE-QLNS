import Access_token from "@/utils/session";
import axios from "axios";

export const createProfile = async (profileNew: Profile) => {
    console.log(profileNew);
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/profile`, profileNew, {
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