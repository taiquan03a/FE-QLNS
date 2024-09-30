'use client'
import { auth } from "@/auth";
import { getRoles } from "@/utils/action";
import Access_token from "@/utils/session";
import { Button, Modal, Table, TableColumnsType } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Input } from 'antd';
import CreateRole from "./role.create";
import { CheckOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import EditRole from "./role.edit";
import { getRole } from "@/app/api/role";

interface IProps {
    roles: any,
    meta: any
}

const RoleTable = (props: IProps) => {
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [roles, setRoles] = useState(props.roles);
    const [roleDetail, setRoleDetail] = useState<any>();
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
    const handleCancel = (pagination: any) => {
        fetchRoles(pagination.current, pagination.pageSize, null);
        setIsModalOpen(false);
    };
    const showModalEdit = () => {
        setIsModalOpenEdit(true);
    };
    const handleCancelEdit = (pagination: any) => {
        fetchRoles(pagination.current, pagination.pageSize, null);
        setIsModalOpenEdit(false);
    };
    const columns: TableColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'code',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.localeCompare(b.code),
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'create_at',
            dataIndex: 'create_at',
            key: 'create_at',
            sorter: (a, b) => a.create_at.localeCompare(b.create_at),
            render: (text) => {
                const date = dayjs(text);
                return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : '';
            },
        },
        {
            title: 'update_at',
            dataIndex: 'update_at',
            key: 'update_at',
            sorter: (a, b) => a.update_at.localeCompare(b.update_at),
            render: (text) => {
                const date = dayjs(text);
                return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : '';
            },
        },
        {
            title: 'create_by',
            dataIndex: 'create_by',
            key: 'create_by',
            sorter: (a, b) => a.create_by.localeCompare(b.create_by)
        },
        {
            title: 'update_by',
            dataIndex: 'update_by',
            key: 'update_by',
            sorter: (a, b) => a.update_by.localeCompare(b.update_by)
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
                    <DeleteOutlined
                        style={{ color: "red", padding: '10px', fontSize: "16px" }}
                        onClick={() => handleActive(record)}
                    />
                    <MoreOutlined
                        style={{ color: "black", padding: '10px', fontSize: "16px" }}
                        onClick={() => handleActive(record)}
                    />
                </div>,
        },
    ];


    const fetchRoles = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        const session = await Access_token();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/role`, {
                headers: {
                    Authorization: `Bearer ${session}`, // Thêm Authorization vào header
                },
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchParam,
                    searchBy: ['code', 'name']
                },
            });
            console.log("response->", response.data.data.data)

            setRoles(response.data.data.data);
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
    const fetchRoleDetail = async (roleId: any) => {

        const response = await getRole(roleId);
        console.log("response->", response)
        setRoleDetail(response);
    }
    useEffect(() => {
        fetchRoles(meta.currentPage, meta.itemsPerPage, searchParam);
    }, []);
    const handleTableChange = (pagination: any) => {
        fetchRoles(pagination.current, pagination.pageSize, null);
    };
    const handleEdit = async (role: any) => {
        console.log('Role being edited:', role);
        const response = await getRole(role.id);

        setRoleDetail(response);
        showModalEdit()
    };
    const handleActive = (role: any) => {
        console.log('Role being active:', role);
        // Thực hiện logic chỉnh sửa với role
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager Role</span>
                <Button onClick={showModal}>Create Role</Button>
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
                        fetchRoles(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={roles}
                columns={columns}
                key={roles.id}
                pagination={{
                    current: meta.currentPage,
                    pageSize: meta.itemsPerPage,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '15', '20'],
                    total: meta.totalItems,
                }}
                onChange={handleTableChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
            <Modal title="Create Role" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CreateRole />
            </Modal>
            <Modal title="Edit Role" open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null}>
                <EditRole role={roleDetail} />
            </Modal>
        </>
    )
}

export default RoleTable;