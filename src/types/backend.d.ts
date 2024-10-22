export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            itemsPerPage?: number,
            totalItems?: number,
            currentPage?: number,
            totalPages?: number,
            sortBy?: []
        },
        data: T[]
    }
    interface ILogin {
        access_token: string;
        user_type: string;
    }

}
