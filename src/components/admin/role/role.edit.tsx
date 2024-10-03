import { getPermissions } from '@/app/api/permission';
import { createRole, editRole } from '@/app/api/role';
import {
    Form,
    Select,
    Button,
    Cascader,
    Input,
    message,
} from 'antd';
import { useEffect, useState } from 'react';

interface Permission {
    id: number;
    code: string;
    name: string;
}
const EditRole = (role: any) => {
    const [form] = Form.useForm();
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [permission, setPermission] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const { Option } = Select;

    const fetchPermissons = async () => {
        setPermission(await getPermissions());
    }

    useEffect(() => {
        setLoading(true);
        fetchPermissons();
    }, []);

    const handleChange = (value: string[]) => {
        console.log('Selected values:', value); // In ra các giá trị được chọn
        setSelectedValues(value); // Cập nhật state với các giá trị đã chọn
    };


    useEffect(() => {
        if (role) {
            form.setFieldsValue({
                name: role.role.name,
                code: role.role.code,
                permission: role.role.permissions.map((per: { id: any; }) => per.id)
            });
        }
    }, [role]);
    const handleSubmit = async (values: any) => {
        try {
            const { name, code } = values;
            const newRole: Role = {
                name: name,
                code: code,
                permissionId: selectedValues
            };
            console.log("id->", role.role.id);
            const response = await editRole(role.role.id, newRole)
            console.log("values->", response)
            if (response.statusCode === 200) {
                message.success('Role update successfully!');
                form.resetFields();
            }
            if (response.statusCode == 400) {
                message.error('Code unique!.')
            }
            if (response.statusCode == 404) {
                message.error('Role not found!.')
            }
            window.location.reload();
        } catch (error) {
            console.error('Failed to edit role:', error);
            message.error('Failed to edit role.');
        }
    };
    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{ name: '' }}
        >
            <Form.Item
                label="Name"
                rules={[{ required: true, message: 'Please input the role name!' }]}
                name='name'
            >
                <Input placeholder='input name' />
            </Form.Item>
            <Form.Item
                label="Code"
                name='code'
                rules={[{ required: true, message: 'Please input the role code!' }]}
            >
                <Input placeholder="input code" id="validating" />
            </Form.Item>

            <Form.Item
                label="Permission"
                rules={[{ required: true, message: 'Please select at least one permission!' }]}
                name='permission'
            >
                <Select
                    mode="multiple"
                    placeholder="Please select permission"
                    onChange={handleChange}
                >
                    {permission.map((value) => (
                        <Option key={value.id} value={value.id}>
                            {value.code} : {value.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default EditRole;