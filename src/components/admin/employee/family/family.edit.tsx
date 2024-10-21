import { getDistrictByWard, getDistrictsByProvince, getProvinceByDistrict, getWardsByDistrict } from '@/app/api/address';
import { createCategory, getCategoryList } from '@/app/api/category';
import { createEducation } from '@/app/api/education';
import { createFamily, editFamily } from '@/app/api/family';
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
    family: any,
    isModalOpen: boolean;
    closeModal: () => void;
    refresh: (currentPage: any, itemsPerPage: any, searchParam: any) => void;
}
const EditFamily = ({ family, isModalOpen, closeModal, refresh }: UserModalProps) => {
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
    const setForm = async (family: any) => {
        const wardPermanent = await getDistrictByWard(family.ward_id);
        const provincePermanent = await getProvinceByDistrict(wardPermanent.data.district.id);
        if (family) {
            form.setFieldsValue({
                relationship: family.relationship.name,
                name: family.full_name,
                date: family.year_of_birth,
                job: family.job,
                addressDetail: family.address_detail,
                permanent: {
                    province: provincePermanent.data.id,
                    district: {
                        value: wardPermanent.data.district.id,
                        label: wardPermanent.data.district.name
                    },
                    ward: {
                        value: wardPermanent.data.id,
                        label: wardPermanent.data.name
                    }
                },
            });
        }
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
    useEffect(() => {
        setForm(family);
    }, [family]);
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const { relationship, name, date, job, addressDetail } = values;
            const familyNew: Family = {
                relationshipId: relationship,
                full_name: name,
                job: job,
                year_of_birth: date,
                address_detail: addressDetail,
                ward_id: wardPermanentId ?? 0,
                profile_id: Number(family.id),
            }
            console.log("family->", familyNew);
            const response = await editFamily(familyNew);
            console.log("values->", response)
            if (response.statusCode === 200) {
                message.success('family edit successfully!');
                form.resetFields();
                closeModal();
                refresh(1, 5, null);
            }
        } catch (error) {
            console.error('Failed to edit family:', error);
            message.error('Failed to edit family');
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
export default EditFamily;