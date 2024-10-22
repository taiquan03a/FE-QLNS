import { CheckCircleOutlined, EditOutlined, InfoCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import CreateEducation from "./education.create";
import { useEffect, useState } from "react";
import { getListEducation } from "@/app/api/employee";
import EditEducation from "./education.edit";
import { getListEducationByUser } from "@/app/api/user";


const EducationView = () => {
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [education, setEducation] = useState([]);
    const [educationDetail, setEducationDetail] = useState<any>();
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
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'begin_time',
            key: 'begin_time',
        },
        {
            title: 'Kết thúc',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'Trường học',
            dataIndex: ['school', 'name'],
            key: 'school',
        },
        {
            title: 'Ngành',
            dataIndex: ['major', 'name'],
            key: 'major',
        },
        {
            title: 'Hình thức đào tạo',
            dataIndex: ['educationType', 'name'],
            key: 'educationType',
        },
        {
            title: 'Văn bằng',
            dataIndex: ['degree', 'name'],
            key: 'degree',
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
                <div>
                    <EditOutlined
                        style={{ color: 'blue', padding: '10px', fontSize: "16px" }}
                        onClick={() => handleEdit(record)}
                    />
                </div>,
        },
    ];
    const handleEdit = async (record: any) => {
        console.log("recor->", record);
        setEducationDetail(record);
        showModalEdit();
    }
    const fetchEducation = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        try {
            const response = await getListEducationByUser(currentPage, itemsPerPage, searchParam);
            setEducation(response.data);
            console.log("education list->", response.data);
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
        fetchEducation(meta.currentPage, meta.itemsPerPage, searchParam);
    }, []);
    const handleTableChange = (pagination: any) => {
        fetchEducation(pagination.current, pagination.pageSize, null);
    };
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager Education</span>
                <Button onClick={showModal}>Create Education</Button>

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
                        fetchEducation(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={education}

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
                <CreateEducation
                    profileId={props.userId}
                    isModalOpen={isModalOpen}
                    closeModal={handleCancel}
                    refresh={fetchEducation}
                />
            </Modal>
            <Modal title="Edit Modal" open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null} >
                <EditEducation
                    education={educationDetail}
                    isModalOpen={isModalOpenEdit}
                    closeModal={handleCancelEdit}
                    refresh={fetchEducation}
                />
            </Modal> */}
        </>
    )
}
export default EducationView;