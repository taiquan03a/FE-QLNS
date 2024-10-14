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
    categoryName: string,
    isModalOpen: boolean;
    closeModal: () => void;
    refreshCategory: (currentPage: any, itemsPerPage: any, searchParam: any) => void;
}
const CreateCategory = ({ categoryName, isModalOpen, closeModal, refreshCategory }: UserModalProps) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { name, description } = values;
            const category: CategoryType = {
                name: name,
                description: description,
            };

            const response = await createCategory(category, categoryName);
            console.log("values->", response)
            if (response.statusCode === 201) {
                message.success(categoryName + ' created successfully!');
                form.resetFields();
                closeModal();
                refreshCategory(1, 5, null);
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
export default CreateCategory;