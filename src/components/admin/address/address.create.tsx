import { createAddress } from '@/app/api/address';
import { createCategory } from '@/app/api/category';
import {
    Form,
    Select,
    Button,
    Cascader,
    Input,
    message,
    Spin,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserModalProps {
    provinceId: number;
    categoryName: string;
    isModalOpen: boolean;
    closeModal: () => void;
    refreshCategory: (provinceId: number, currentPage: any, itemsPerPage: any, searchParam: any) => void;
}
const CreateAddress = ({ provinceId, categoryName, isModalOpen, closeModal, refreshCategory }: UserModalProps) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { name, description } = values;
            const district: AddressType = {
                id: provinceId,
                name: name,
                description: description,
            };

            const response = await createAddress(district, categoryName);
            console.log("values->", response)
            if (response.statusCode === 201) {
                message.success(categoryName + ' created successfully!');
                form.resetFields();
                closeModal();  // Ẩn modal khi thêm thành công
                refreshCategory(provinceId, 1, 5, null);
            }
        } catch (error) {
            console.error('Failed to create Category:', error);
            message.error('Failed to create Category.');
        }
        setLoading(false);
    };
    if (!isModalOpen) return null;
    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='name'
                >
                    <Input placeholder='input name' />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name='description'
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input placeholder="input code" id="validating" />
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
export default CreateAddress;