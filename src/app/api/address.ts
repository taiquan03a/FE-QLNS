import Access_token from "@/utils/session";
import axios from "axios";


export const getDistrictsByProvince = async (provinceId: number, currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/address/district/getByProvince/${provinceId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
            params: {
                page: currentPage,
                limit: itemsPerPage,
                search: searchParam,
                searchBy: ['code', 'name']
            },
        });
        console.log("data->", response.data.data)
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};


export const createAddress = async (categoryNew: AddressType, categoryName: string) => {
    const session = await Access_token();
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/address/${categoryName}`, categoryNew, {
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

export const editAddress = async (categoryUpdate: AddressType, categoryId: number, categoryName: string) => {
    const session = await Access_token();
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/address/${categoryName}/${categoryId}`, categoryUpdate, {
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

export const provinceDetail = async (provinceId: string) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/province/${provinceId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data->", response.data)
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}
export const districtDetail = async (districtId: string) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/address/district/${districtId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data->", response.data)
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

export const getWardsByDistrict = async (districtId: number, currentPage: any, itemsPerPage: any, searchParam: any) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/address/ward/getByDistrict/${districtId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
            params: {
                page: currentPage,
                limit: itemsPerPage,
                search: searchParam,
                searchBy: ['code', 'name']
            },
        });
        console.log("data->", response.data.data)
        return response.data.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

export const getDistrictByWard = async (wardId: number) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/address/district/getByWard/${wardId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data->", response.data)
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

export const getProvinceByDistrict = async (districtId: number) => {
    const session = await Access_token();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/province/getByDistrict/${districtId}`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });
        console.log("data->", response.data)
        return response.data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
