import { getListFamily } from "@/app/api/family";
import { CheckCircleOutlined, EditOutlined, InfoCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import CreateFamily from "./family.create";
import { getDistrictByWard, getProvinceByDistrict } from "@/app/api/address";

interface IProps {
    userId: string;
}

const FamilyView = (props: IProps) => {
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [family, setFamily] = useState([]);
    const [familyDetail, setfamilyDetail] = useState<any>();
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
    const fetchAddress = async (ward_id: number) => {
        const wardPermanent = await getDistrictByWard(ward_id);
        const provincePermanent = await getProvinceByDistrict(wardPermanent.data.district.id);
        return wardPermanent.data.name + " " + wardPermanent.data.district.name + " " + provincePermanent.data.name;
    }
    const columns: TableColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Quan hệ',
            dataIndex: ['relationship', 'name'],
            key: 'avatar',
        },
        {
            title: 'Họ tên',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Năm sinh',
            dataIndex: 'year_of_birth',
            key: 'year_of_birth',
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: 'Địa chỉ',
            key: 'address_detail',
            render: async (text, record) => `${record.address_detail} ${await fetchAddress(record.ward_id)}`,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
                <div>
                    <EditOutlined
                        style={{ color: 'blue', padding: '10px', fontSize: "16px" }}
                    //onClick={() => handleEdit(record)}
                    />
                    <InfoCircleOutlined
                        style={{ color: "blue", padding: '10px', fontSize: "16px" }}
                    //onClick={() => handleDetail(record)}
                    />
                </div>,
        },
    ];
    const handleEdit = async (record: any) => {
        console.log("recor->", record);
        setfamilyDetail(record);
        showModalEdit();
    }
    const fetchFamily = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        try {
            const response = await getListFamily(props.userId, currentPage, itemsPerPage, searchParam);
            setFamily(response.data);
            console.log("family list->", response.data);
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
        fetchFamily(meta.currentPage, meta.itemsPerPage, searchParam);
    }, []);
    const handleTableChange = (pagination: any) => {
        fetchFamily(pagination.current, pagination.pageSize, null);
    };
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager User</span>
                <Button onClick={showModal}>Create Family</Button>

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
                        fetchFamily(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={family}
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
            <Modal title="Create Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CreateFamily
                    profileId={props.userId}
                    isModalOpen={isModalOpen}
                    closeModal={handleCancel}
                    refresh={fetchFamily}
                />
            </Modal>
            {/* <Modal title="Edit Modal" open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null} >
                <EditUser user={user}></EditUser>
            </Modal> */}
        </>
    )
}
export default FamilyView;