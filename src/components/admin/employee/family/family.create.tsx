import { getDistrictsByProvince, getWardsByDistrict } from '@/app/api/address';
import { createCategory, getCategoryList } from '@/app/api/category';
import { createEducation } from '@/app/api/education';
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
    profileId: string,
    isModalOpen: boolean;
    closeModal: () => void;
    refresh: (currentPage: any, itemsPerPage: any, searchParam: any) => void;
}
const CreateFamily = ({ profileId, isModalOpen, closeModal, refresh }: UserModalProps) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const yearOption = Array.from({ length: dayjs().year() - 1950 + 1 }, (_, index) => {
        const year = 1950 + index;
        return { label: year.toString(), value: year };
    });
    const [relationshipOption, setRelationshipOption] = useState();
    const [optionsProvincePermanent, setOptionsProvincePermanent] = useState<SelectProps['options']>([]);
    const [optionsDistrictPermanent, setOptionsDistrictPermanent] = useState<SelectProps['options']>([]);
    const [optionsWardPermanent, setOptionsWardPermanent] = useState<SelectProps['options']>([]);
    const [wardPermanentId, setWardPermanentId] = useState<number>();

    const fetchSelect = async () => {
        const rela = (await getCategoryList('relationships', 1, 100, null)).data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setRelationshipOption(rela);
        const response = await getCategoryList('province', 1, 100, null);
        const fetchedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsProvincePermanent(fetchedOptions);
    }
    const handleChangeProvince = async (value: number) => {
        const district = await getDistrictsByProvince(value, 1, 100, null);
        const fetchedOptions = district.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsDistrictPermanent(fetchedOptions);
    };
    const handleChangeDistrict = async (value: number) => {
        const response = await getWardsByDistrict(value, 1, 100, null);
        const fetchedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsWardPermanent(fetchedOptions);
    }
    const handleChangeWardPermanent = (value: number) => {
        setWardPermanentId(value);
    }
    useEffect(() => {
        fetchSelect();
    }, []);
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { relationship, name, date, job, addressDetail } = values;
            const family: Family = {
                relationshipId: relationship,
                full_name: name,
                job: job,
                year_of_birth: date,
                address_detail: addressDetail,
                ward_id: wardPermanentId ?? 0,
                profile_id: Number(profileId),
            }
            console.log("family->", family);
            const response = await createFamily(family);
            console.log("values->", response)
            if (response.statusCode === 201) {
                message.success('education created successfully!');
                form.resetFields();
                closeModal();
                refresh(1, 5, null);
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
                layout='vertical'
            >
                <Form.Item name="relationship" label="Quan hệ">
                    <Select
                        showSearch
                        style={{ flex: 1 }}
                        placeholder="Chọn quan hệ"
                        options={relationshipOption}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='name'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Năm sinh"
                    name='date'
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Select
                        showSearch
                        style={{ flex: 1 }}
                        placeholder="Select Province"
                        //onChange={handleYearOption}
                        options={yearOption}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Nghề nghiệp"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='job'
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Địa chỉ" name='permanent'>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item name={['permanent', 'province']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select Province"
                                onChange={handleChangeProvince}
                                options={optionsProvincePermanent}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                        <Form.Item name={['permanent', 'district']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select District"
                                onChange={handleChangeDistrict}
                                options={optionsDistrictPermanent}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                        <Form.Item name={['permanent', 'ward']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select Ward"
                                onChange={handleChangeWardPermanent}
                                options={optionsWardPermanent}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item
                    label="Địa chỉ chi tiết"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name='addressDetail'
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
export default CreateFamily;