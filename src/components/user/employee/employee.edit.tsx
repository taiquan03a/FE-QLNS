import { createUser, editUser } from "@/app/api/user";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, GetProp, Image, Input, message, Select, Spin, Upload, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface EmployeeModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    refresh: (currentPage: any, itemsPerPage: any, searchParam: any) => void;
    user: any
}
const EditEmployee = ({ isModalOpen, closeModal, refresh, user }: EmployeeModalProps) => {
    const router = useRouter();
    const [urlFile, setUrlFile] = useState('');
    const [form] = Form.useForm();
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { Option } = Select;
    const [selectedFile, setSelectedFile] = useState(null);
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    const handleFileChange = async (event: any) => {
        setSelectedFile(event.target.files[0]);
        setUrlFile(await getBase64(event.target.files[0]));
    };
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            const { email, password, firstName, lastName, dateOfBirth, phoneNumber } = values;
            const formData = new FormData();
            if (selectedFile != null) formData.append("avatar", selectedFile ?? '');
            formData.append('email', email);
            formData.append('password', password);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('phoneNumber', phoneNumber);
            console.log("formData->", formData.get('avatar'));
            const response = await editUser(user.id, formData)
            console.log("values->", response)
            setLoading(false)
            if (response.statusCode === 200) {
                message.success('User created successfully!');
                form.resetFields();
                closeModal();
                refresh(1, 5, null);
            }
            if (response.statusCode == 400) {
                message.error('Email unique!.')
            }

        } catch (error) {
            console.error('Failed to create user:', error);
            message.error('Failed to create user.');
        }

    };
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: dayjs(user.dateOfBirth),
                phoneNumber: user.phoneNumber
            });
            setUrlFile(user.avatar);
        }
    }, [user]);
    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Email"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                    name='email'
                >
                    <Input placeholder='input email' />
                </Form.Item>
                {/* <Form.Item
                label="Password"
                name='password'
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Input type="password" placeholder="input password" />
            </Form.Item> */}

                <Form.Item
                    label="First name"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                    name='firstName'
                >
                    <Input placeholder='input email' />
                </Form.Item>

                <Form.Item
                    label="Last name"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                    name='lastName'
                >
                    <Input placeholder='input email' />
                </Form.Item>
                <Form.Item
                    label="DatePicker"
                    name='dateOfBirth'
                    rules={[{ required: true, message: 'Please input the email!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    rules={[{ required: true, message: 'Please input the phone!' }]}
                    name='phoneNumber'
                >
                    <Input placeholder='input email' />
                </Form.Item>
                <Form.Item
                    label="Avatar"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name='avatar'
                >
                    <Input type="file" onChange={handleFileChange} />
                </Form.Item>
                <Form.Item>
                    <Image
                        width={200}
                        src={urlFile}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default EditEmployee;