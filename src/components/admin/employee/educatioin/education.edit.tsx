import { createCategory, getCategoryList } from '@/app/api/category';
import { createEducation, editEducation } from '@/app/api/education';
import {
    Form,
    Select,
    Button,
    Cascader,
    Input,
    message,
    Spin,
    DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserModalProps {
    education: any,
    isModalOpen: boolean;
    closeModal: () => void;
    refresh: (currentPage: any, itemsPerPage: any, searchParam: any) => void;
}
const EditEducation = ({ education, isModalOpen, closeModal, refresh }: UserModalProps) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const [schoolOption, setSchoolOption] = useState();
    const [majorOption, setMajorOption] = useState();
    const [degreeOption, setDegreeOption] = useState();
    const [educationTypeOption, setEducationTypeOption] = useState();

    const fetchSelect = async () => {
        const school = (await getCategoryList('schools', 1, 100, null)).data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setSchoolOption(school);
        const major = (await getCategoryList('majors', 1, 100, null)).data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setMajorOption(major);
        const educationType = (await getCategoryList('education-type', 1, 100, null)).data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setEducationTypeOption(educationType);
        const degree = (await getCategoryList('degrees', 1, 100, null)).data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setDegreeOption(degree);
    }
    useEffect(() => {
        fetchSelect();
    }, []);
    useEffect(() => {
        if (education) {
            form.setFieldsValue({
                beginTime: dayjs(education.begin_time),
                endTime: dayjs(education.end_time),
                school: education.school.id,
                major: education.major.id,
                degree: education.degree.id,
                educationType: education.educationType.id,
            });
        }
    }, [education]);
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { beginTime, endTime, school, major, degree, educationType } = values;
            const educationNew: Education = {
                profileId: Number(education.id),
                beginTime: beginTime,
                endTime: endTime,
                schoolId: school,
                majorId: major,
                degreeId: degree,
                educationTypeId: educationType
            }

            const response = await editEducation(educationNew);
            console.log("values->", response)
            if (response.statusCode === 200) {
                message.success('education edit successfully!');
                form.resetFields();
                closeModal();
                refresh(1, 5, null);
            }
        } catch (error) {
            console.error('Failed to edit Category:', error);
            message.error('Failed to edit Category.');
        }
        setLoading(false);
    };
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
                <Form.Item name="school" label="Trường học">
                    <Select
                        showSearch
                        style={{ flex: 1 }}
                        placeholder="Chọn trường học"
                        // onChange={handleChangeProvince}
                        options={schoolOption}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </Form.Item>
                <Form.Item name="major" label="Ngành học">
                    <Select
                        showSearch
                        style={{ flex: 1 }}
                        placeholder="Chọn ngành học"
                        // onChange={handleChangeProvince}
                        options={majorOption}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </Form.Item>
                <Form.Item name="educationType" label="Hình thức đào tạo">
                    <Select
                        showSearch
                        style={{ flex: 1 }}
                        placeholder="Chọn hình thức đào tạo"
                        // onChange={handleChangeProvince}
                        options={educationTypeOption}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </Form.Item>
                <Form.Item name="degree" label="Văn bằng">
                    <Select
                        showSearch
                        style={{ flex: 1 }}
                        placeholder="Chọn văn bằng"
                        // onChange={handleChangeProvince}
                        options={degreeOption}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
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
export default EditEducation;