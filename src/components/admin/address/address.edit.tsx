import { editAddress } from '@/app/api/address';
import { editCategory } from '@/app/api/category';
import { editDegree } from '@/app/api/category/degree';
import { editEthnicity } from '@/app/api/category/ethnicity';
import { getPermissions } from '@/app/api/permission';
import { createRole, editRole } from '@/app/api/role';
import {
    Form,
    Select,
    Button,
    Cascader,
    Input,
    message,
    Spin,
} from 'antd';
import { useEffect, useState } from 'react';

interface CategoryModalProps {
    provinceId: number;
    categoryName: string,
    isModalOpen: boolean;
    closeModal: () => void;
    refreshCategory: (provinceId: number, currentPage: any, itemsPerPage: any, searchParam: any) => void;
    categoryDetail: any
}
const EditAddress = ({ provinceId, categoryName, isModalOpen, closeModal, refreshCategory, categoryDetail }: CategoryModalProps) => {
    console.log(categoryDetail)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (categoryDetail) {
            form.setFieldsValue({
                name: categoryDetail.name,
                description: categoryDetail.description,
            });
        }
    }, [categoryDetail]);
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { name, description } = values;
            const newDistrict: AddressType = {
                id: provinceId,
                name: name,
                description: description,
            };
            const response = await editAddress(newDistrict, categoryDetail.id, categoryName)
            console.log("values->", response)
            if (response.statusCode === 200) {
                message.success('Role update successfully!');
                form.resetFields();
                closeModal();
                refreshCategory(provinceId, 1, 5, null);
            }
        } catch (error) {
            console.error('Failed to edit role:', error);
            message.error('Failed to edit role.');
        }
        setLoading(false);
    };
    return (
        <Spin spinning={loading}>
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
                    label="Description"
                    name='description'
                    rules={[{ required: true, message: 'Please input the role code!' }]}
                >
                    <Input placeholder="input code" id="validating" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}
export default EditAddress;