import axios from "axios";

export const getUsers = async () => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
    );
    // console.log(res.data.data.data)
    return res.data.data.data;
};