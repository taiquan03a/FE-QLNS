'use client'
import { Button, message, Modal, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Input } from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { deleteCategory, getCategoryList } from "@/app/api/category";
import CreateCategory from "../category/category.create";
import EditCategory from "../category/category.edit";
import { getDistrictsByProvince } from "@/app/api/address";

interface IProps {
    categoryName: string,
    category: any,
    meta: any
}


const ProvinceTable = (props: IProps) => {
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [category, setCategory] = useState(props.category);
    const [categoryDetail, setCategoryDetail] = useState<any>();
    const [meta, setMeta] = useState({
        currentPage: props.meta.currentPage,
        itemsPerPage: props.meta.itemsPerPage,
        totalItems: props.meta.totalItems,
    });
    const [categoryName, setCategoryName] = useState(props.categoryName);
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
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
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
                    <InfoCircleOutlined
                        style={{ color: "blue", padding: '10px', fontSize: "16px" }}
                        onClick={() => handleDetail(record)}
                    />
                </div>,
        },
    ];


    const fetchCategory = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        try {
            const response = await getCategoryList(categoryName, currentPage, itemsPerPage, searchParam);
            setCategory(response.data);
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
        fetchCategory(meta.currentPage, meta.itemsPerPage, searchParam);
    }, []);
    const handleTableChange = (pagination: any) => {
        fetchCategory(pagination.current, pagination.pageSize, null);
    };
    const handleEdit = async (category: any) => {
        console.log('Role being edited:', category);
        setCategoryDetail(category);
        showModalEdit()
    };
    const handleDetail = async (category: any) => {
        try {
            const response = await getDistrictsByProvince(category.id,);
            if (response.statusCode === 200) {
                message.success(categoryName + ' detail successfully!');
                fetchCategory(1, 5, null);
            }
        } catch (e) {
            console.error('Failed', categoryName);
            message.error('Failed');
        }
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager {categoryName}</span>
                <Button onClick={showModal}>Create {categoryName}</Button>
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
                        fetchCategory(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={category}
                columns={columns}
                key={category.id}
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
            <Modal title={"Create " + categoryName} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CreateCategory
                    categoryName={categoryName}
                    isModalOpen={isModalOpen}
                    closeModal={handleCancel}
                    refreshCategory={fetchCategory}
                />
            </Modal>
            <Modal title={"Edit " + categoryName} open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null}>
                <EditCategory
                    categoryName={categoryName}
                    isModalOpen={isModalOpenEdit}
                    closeModal={handleCancelEdit}
                    refreshCategory={fetchCategory}
                    categoryDetail={categoryDetail} />
            </Modal>
        </>
    )
}

export default ProvinceTable;