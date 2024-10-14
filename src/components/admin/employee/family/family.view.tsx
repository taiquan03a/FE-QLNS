import { CheckCircleOutlined, EditOutlined, InfoCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";

interface IProps {
    userId: string;
}

const FamilyView = (props: IProps) => {
    const columns: TableColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Quan hệ',
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
            title: 'Họ tên',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Năm sinh',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'lastName',
            key: 'lastName',
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
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager User</span>
                {/* <Button onClick={showModal}>Create User</Button> */}

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
                        //fetchUsers(null, null, value)
                    }
                }
                enterButton
            />
            <Table
                //loading={loading}
                bordered
                //dataSource={users}
                //key={users.id}
                columns={columns}
                // pagination={{
                //     current: meta.currentPage,
                //     pageSize: meta.itemsPerPage,
                //     showSizeChanger: true,
                //     total: meta.totalItems,
                //     pageSizeOptions: ['5', '10', '15', '20'],
                // }}
                // onChange={handleTableChange}
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
export default FamilyView;