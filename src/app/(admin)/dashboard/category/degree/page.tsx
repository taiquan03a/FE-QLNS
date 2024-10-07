import CategoryTable from "@/components/admin/category/category.table";
import { sendRequest } from "@/utils/api";
import Access_token from "@/utils/session";


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
const ManageDegree = async (props: IProps) => {
    const page = props?.searchParams?.current ?? 1;
    const limit = props?.searchParams?.pageSize ?? 5;
    const sortBy = null;
    const searchBy = null;
    const search = null;
    const filter = null;
    const session = await Access_token();
    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/category/degrees`,
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
            next: { tags: ['list-degrees'] }
        }
    });
    console.log("token>>>", session)
    console.log(res.data?.meta)

    console.log(res)
    return (
        <div>
            <CategoryTable
                categoryName="degrees"
                category={res.data?.data}
                meta={res.data?.meta}
            />
        </div>
    )
}

export default ManageDegree;    