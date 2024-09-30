import UserTable from "@/components/admin/user/user.table";
import { getUsers } from "./apiUser";
import axios from "axios";
import Access_token from "@/utils/session";
import { sendRequest } from "@/utils/api";
interface IProps {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}
const ManageUserPage = async (props: IProps) => {
    const page = props?.searchParams?.current ?? 1;
    const limit = props?.searchParams?.pageSize ?? 5;
    const sortBy = null;
    const searchBy = null;
    const search = null;
    const filter = null;
    const session = await Access_token();

    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session}`,
        },
        queryParams: {
            page,
            limit,
            sortBy,

        },
        nextOption: {
            next: { tags: ['list-users'] }
        }
    });
    return (
        <div>
            <UserTable
                users={res.data?.data}
                meta={res.data?.meta}
            />
        </div>
    )
}

export default ManageUserPage;