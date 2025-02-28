'use client'
import { Button, message, Modal, Select, SelectProps, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Input } from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { deleteCategory, getCategoryList } from "@/app/api/category";
import CreateCategory from "../category/category.create";
import EditCategory from "../category/category.edit";
import { getDistrictsByProvince, getWardsByDistrict } from "@/app/api/address";
import CreateAddress from "./address.create";
import EditAddress from "./address.edit";
import { useRouter } from "next/navigation";

interface IProps {
    province: any,
}


const WardTable = (props: IProps) => {
    const router = useRouter();
    const [optionsProvince, setOptionsProvince] = useState<SelectProps['options']>([]);
    const [optionsDistrict, setOptionsDistrict] = useState<SelectProps['options']>([]);
    const [selectProvinceId, setSelectProvinceId] = useState<number>();
    const [selectDistrictId, setSelectDistrictId] = useState<number>();
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [province, setProvince] = useState(props.province);
    const [ward, setWard] = useState<any>();
    const [categoryDetail, setCategoryDetail] = useState<any>();
    const [categoryName, setCategoryName] = useState('ward');
    const [meta, setMeta] = useState({
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 10,
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


    const fetchDistrict = async (provinceId: number, currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        try {
            const response = await getWardsByDistrict(provinceId, currentPage, itemsPerPage, searchParam);
            console.log('response->', response.data);
            setWard(response.data);
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
    const fetchOptionsProvince = async () => {
        try {
            const response = await getCategoryList('province', 1, 100, null);
            const fetchedOptions = response.data.map((item: any) => ({
                value: item.id,
                label: item.name,
            }));
            setOptionsProvince(fetchedOptions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchOptionsProvince();
        fetchDistrict(province.id, meta.currentPage, meta.itemsPerPage, searchParam);
    }, []);
    const handleTableChange = (pagination: any) => {
        fetchDistrict(province.id, pagination.current, pagination.pageSize, null);
    };
    const handleEdit = async (category: any) => {
        console.log('Role being edited:', category);
        setCategoryDetail(category);
        showModalEdit()
    };
    const handleDetail = async (category: any) => {
        // try {
        //     const response = await getDistrictsByProvince(category.id,);
        //     if (response.statusCode === 200) {
        //         message.success('detail successfully!');
        //         //fetchCategory(1, 5, null);
        //     }
        // } catch (e) {
        //     console.error('Failed');
        //     message.error('Failed');
        // }
    };

    const handleChangeProvince = async (value: number) => {
        setSelectProvinceId(value);
        const district = await getDistrictsByProvince(value, 1, 100, null);
        const fetchedOptions = district.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsDistrict(fetchedOptions);
        console.log('vlues province->', value);
    };
    const handleChangeDistrict = (value: number) => {
        router.push(`/dashboard/category/province/${selectProvinceId}/${value}`)
    }
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
            }}>
                <div style={{ width: '50%' }}>
                    <Select
                        showSearch
                        style={{ width: '50%' }}
                        placeholder="Select Province"
                        onChange={handleChangeProvince}
                        options={optionsProvince}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                    <Select
                        showSearch
                        style={{ width: '50%' }}
                        placeholder="Select District"
                        onChange={handleChangeDistrict}
                        options={optionsDistrict}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </div>
                <Button onClick={showModal}>Create </Button>
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
                        fetchDistrict(province.id, null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={ward}
                columns={columns}
                key={ward}
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
                <CreateAddress
                    provinceId={province.id}
                    categoryName={categoryName}
                    isModalOpen={isModalOpen}
                    closeModal={handleCancel}
                    refreshCategory={fetchDistrict}
                />
            </Modal>
            <Modal title={"Edit " + categoryName} open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null}>
                <EditAddress
                    provinceId={province.id}
                    categoryName={categoryName}
                    isModalOpen={isModalOpenEdit}
                    closeModal={handleCancelEdit}
                    refreshCategory={fetchDistrict}
                    categoryDetail={categoryDetail} />
            </Modal>
        </>
    )
}

export default WardTable;