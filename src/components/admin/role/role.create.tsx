import { getPermissions } from '@/app/api/permission';
import { createRole } from '@/app/api/role';
import {
    Form,
    Select,
    Button,
    Cascader,
    Input,
    message,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Permission {
    id: number;
    code: string;
    name: string;
}
const CreateRole = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [permission, setPermission] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (values: any) => {
        try {
            const { name, code } = values;
            const role: Role = {
                name: name,
                code: code,
                permissionId: selectedValues
            };

            const response = await createRole(role)
            console.log("values->", response)
            if (response.statusCode === 201) {
                message.success('Role created successfully!');
                form.resetFields();
                router.refresh();
            }
            if (response.statusCode == 400) {
                message.error('Code unique!.')
            }

        } catch (error) {
            console.error('Failed to create role:', error);
            message.error('Failed to create role.');
        }
    };
    console.log(permission)
    return (
        <Form
            form={form}
            onFinish={handleSubmit}
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
                name='permis'
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
export default CreateRole;