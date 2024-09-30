import { auth } from "@/auth";
import RoleTable from "@/components/admin/role/role.table";
import { getRoles } from "@/utils/action";
import { sendRequest } from "@/utils/api";
import Access_token from "@/utils/session";
import axios from "axios";
import next from "next";
import { useState } from "react";

interface IProps {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}
interface meta {
    itemsPerPage?: number,
    totalItems?: number,
    currentPage?: number,
    totalPages?: number,
    sortBy?: []
}
const ManageRolePage = async (props: IProps) => {
    const page = props?.searchParams?.current ?? 1;
    const limit = props?.searchParams?.pageSize ?? 5;
    const sortBy = null;
    const searchBy = null;
    const search = null;
    const filter = null;
    const session = await Access_token();

    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role`,
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
            next: { tags: ['list-roles'] }
        }
    });
    console.log("token>>>", session)
    console.log(res.data?.meta)

    console.log(res)
    return (
        <div>
            <RoleTable
                roles={res.data?.data}
                meta={res.data?.meta}
            />
        </div>
    )
}

export default ManageRolePage;