'use client'
import { User } from "@/types/user.type";
import Access_token from "@/utils/session";
import { Button, Modal, Pagination, Table } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from 'antd';



interface IProps {
    users: any;
    meta: any;
}
export default function UserTable(props: IProps) {
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [users, setUsers] = useState(props.users);
    const [meta, setMeta] = useState({
        currentPage: props.meta.currentPage,
        itemsPerPage: props.meta.itemsPerPage,
        totalItems: props.meta.totalItems,
    });
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'firstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'lastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'dateOfBirth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
    ];
    const fetchUsers = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        const session = await Access_token();
        console.log("token>>>", session);
        console.log("check >>>", currentPage, itemsPerPage)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${session}`, // Thêm Authorization vào header
                },
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchParam,
                    searchBy: ['code', 'name', 'phoneNumber']
                },
            });
            console.log("response->", response.data.data.data)

            setUsers(response.data.data.data);
            setMeta({
                currentPage: response.data.data.meta.currentPage,
                itemsPerPage: response.data.data.meta.itemsPerPage,
                totalItems: response.data.data.meta.totalItems,
            });
            console.log("currentPage", currentPage)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        setLoading(false)
    };
    useEffect(() => {
        fetchUsers(meta.currentPage, meta.itemsPerPage, searchParam); // Gọi API lần đầu khi component mount
    }, []);
    const handleTableChange = (pagination: any) => {
        fetchUsers(pagination.current, pagination.pageSize, null);
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager User</span>
                <Button onClick={showModal}>Create User</Button>

            </div>
            <Search
                style={
                    {
                        width: "50%",
                        marginBottom: '20px',
                    }
                }
                placeholder="input search text"
                onSearch={
                    (value) => {
                        fetchUsers(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={users}
                columns={columns}
                pagination={{
                    current: meta.currentPage,
                    pageSize: meta.itemsPerPage,
                    showSizeChanger: true,
                    total: meta.totalItems,
                    pageSizeOptions: ['5', '10', '15', '20'],
                }}
                onChange={handleTableChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}
