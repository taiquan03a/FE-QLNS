import { getDistrictsByProvince, getWardsByDistrict } from '@/app/api/address';
import { createCategory, getCategoryList } from '@/app/api/category';
import { createEducation } from '@/app/api/education';
import { createExperience, editExperience } from '@/app/api/experiences';
import { createFamily } from '@/app/api/family';
import {
    Form,
    Select,
    Button,
    Cascader,
    Input,
    message,
    Spin,
    DatePicker,
    SelectProps,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserModalProps {
    expDetail: any,
    isModalOpen: boolean;
    closeModal: () => void;
    refresh: (currentPage: any, itemsPerPage: any, searchParam: any) => void;
}
const EditExp = ({ expDetail, isModalOpen, closeModal, refresh }: UserModalProps) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { beginTime, endTime, company, position } = values;
            const exp: Experiences = {
                begin_time: beginTime,
                end_time: endTime,
                company: company,
                position: position,
                profileId: Number(expDetail.id)
            }
            console.log("exp->", exp);
            const response = await editExperience(exp);
            console.log("values->", response)
            if (response.statusCode === 200) {
                message.success('exp edit successfully!');
                form.resetFields();
                closeModal();
                refresh(1, 5, null);
            }
        } catch (error) {
            console.error('Failed to edit exp:', error);
            message.error('Failed to edit exp.');
        }
        setLoading(false);
    };
    useEffect(() => {
        if (expDetail) {
            form.setFieldsValue({
                beginTime: dayjs(expDetail.begin_time),
                endTime: dayjs(expDetail.end_time),
                company: expDetail.company,
                position: expDetail.position,
            });
        }
    }, [expDetail]);
    if (!isModalOpen) return null;
    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                onFinish={handleSubmit}
                layout='vertical'
            >
                <Form.Item
                    label="Thời gian bắt đầu"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='beginTime'
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Thời gian kết thúc"
                    name='endTime'
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Đơn vị"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='company'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Chức vụ"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='position'
                >
                    <Input />
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
export default EditExp;