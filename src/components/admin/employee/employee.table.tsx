'use client'
import { User } from "@/types/user.type";
import Access_token from "@/utils/session";
import { Button, Image, Modal, Pagination, Table, TableColumnsType } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, StopOutlined } from "@ant-design/icons";
import { activeUser } from "@/app/api/role";
import { CldImage } from "next-cloudinary";
import { userDetail } from "@/app/api/user";
import { getUser } from "@/app/api/employee";
import { useRouter } from "next/navigation";



interface IProps {
    users: any;
    meta: any;
}
export default function EmployeeTable(props: IProps) {
    const router = useRouter();
    const { Search } = Input;
    const [user, setUser] = useState();
    const [searchParam, setSearchParam] = useState(null)
    const [users, setUsers] = useState(props.users);
    const [meta, setMeta] = useState({
        currentPage: props.meta.currentPage,
        itemsPerPage: props.meta.itemsPerPage,
        totalItems: props.meta.totalItems,
    });
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalEdit = () => {
        setIsModalOpenEdit(true);
    };
    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    };

    const columns: TableColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, record) =>
                <div>
                    <img
                        style={{ width: '50px', height: '50px' }}
                        src={record.avatar}
                        alt="avatar"
                    />
                </div>,
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
            render: (text, record) =>
                <div>
                    {record.status == 1 ? (
                        <CheckCircleOutlined
                            style={{ color: 'green', padding: '10px', fontSize: '16px' }}
                            onClick={() => handleActive(record)}
                        />
                    ) : (
                        <StopOutlined
                            style={{ color: 'red', padding: '10px', fontSize: '16px' }}
                            onClick={() => handleActive(record)}
                        />
                    )}
                </div>,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
                <div>
                    <EditOutlined
                        style={{ color: 'blue', padding: '10px', fontSize: "16px" }}
                        onClick={() => handleEdit(record)}
                    />
                    <InfoCircleOutlined
                        style={{ color: "blue", padding: '10px', fontSize: "16px" }}
                        onClick={() => handleDetail(record)}
                    />
                </div>,
        },
    ];
    const handleDetail = async (category: any) => {
        router.push(`employee/${category.id}`)
    };
    const handleActive = async (record: any) => {
        console.log("record->", record);
        // const response = await test(record.id);
        // console.log("response->", response)
    }
    const handleEdit = async (user: any) => {
        console.log('Role being edited:', user.avatar);
        // const response = await userDetail(user.id)
        setUser(user);
        // setRoleDetail(response);
        showModalEdit()
    };
    const fetchUsers = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        try {
            const response = await getUser(currentPage, itemsPerPage, searchParam);
            setUsers(response.data);
            setMeta({
                currentPage: response.meta.currentPage,
                itemsPerPage: response.meta.itemsPerPage,
                totalItems: response.meta.totalItems,
            });

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
                key={users.id}
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
            {/* <Modal title="Create Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CreateUser></CreateUser>
            </Modal>
            <Modal title="Edit Modal" open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null} >
                <EditUser user={user}></EditUser>
            </Modal> */}
        </>
    )
}
