import Access_token from "@/utils/session";
import axios from "axios";

export const getDistrictsByProvince = async (provinceId: number) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/address/district/getByProvince/${provinceId}`, {
            headers: {
                Authorization: `Bearer ${session}`, // Thêm Authorization vào header
            },
        });
        console.log("data->", response.data.data)
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};