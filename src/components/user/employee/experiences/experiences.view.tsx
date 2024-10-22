import { getListExperience } from "@/app/api/experiences";
import { CheckCircleOutlined, EditOutlined, InfoCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import CreateExp from "./experiences.create";
import EditExp from "./experiences.edit";
import { getListExperienceGetByUser } from "@/app/api/user";


const ExperiencesView = () => {
    const { Search } = Input;
    const [searchParam, setSearchParam] = useState(null)
    const [exp, setExp] = useState<any>();
    const [expDetail, setExpDetail] = useState<any>();
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
            title: 'Đơn vị',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'firstNapositionme',
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
                    {/* <InfoCircleOutlined
                        style={{ color: "blue", padding: '10px', fontSize: "16px" }}
                        onClick={() => handleDetail(record)}
                    /> */}
                </div>,
        },
    ];
    const handleEdit = async (record: any) => {
        console.log("recor->", record);
        setExpDetail(record);
        showModalEdit();
    }
    const fetch = async (currentPage: any, itemsPerPage: any, searchParam: any) => {
        setLoading(true);
        try {
            const response = await getListExperienceGetByUser(currentPage, itemsPerPage, searchParam);
            setExp(response.data);
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
        fetch(meta.currentPage, meta.itemsPerPage, searchParam);
    }, []);
    const handleTableChange = (pagination: any) => {
        fetch(pagination.current, pagination.pageSize, null);
    };
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager EXP</span>
                <Button onClick={showModal}>Create EXP</Button>

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
                        fetch(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                loading={loading}
                bordered
                dataSource={exp}
                //key={users.id}
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
                <CreateExp
                    profileId={props.userId}
                    isModalOpen={isModalOpen}
                    closeModal={handleCancel}
                    refresh={fetch}
                />
            </Modal>
            <Modal title="Edit Modal" open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null} >
                <EditExp
                    expDetail={expDetail}
                    isModalOpen={isModalOpenEdit}
                    closeModal={handleCancelEdit}
                    refresh={fetch}
                />
            </Modal> */}
        </>
    )
}
export default ExperiencesView;