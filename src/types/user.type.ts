export type User = {
    data: [
        {
            id: number,
            avatar: string,
            code: string,
            email: string,
            firstName: string,
            lastName: string,
            dateOfBirth: string,
            phoneNumber: string,
            createAt: string,
            updateAt: string,
            createBy: string,
            updateBy: string,
            status: boolean
        }
    ],
    meta: {
        itemsPerPage: number,
        totalItems: number,
        currentPage: number,
        totalPages: number,
        sortBy: []
    }

};