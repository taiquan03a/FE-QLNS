'use client'
import React, { useEffect, useState } from "react";
import { Button, Cascader, Checkbox, Col, ColorPicker, DatePicker, Form, Input, InputNumber, message, Radio, Rate, Row, Segmented, Select, SelectProps, Slider, Switch, TreeSelect, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { getProfile } from "@/app/api/employee";
import dayjs from "dayjs";
import { getDistrictByWard, getDistrictsByProvince, getProvinceByDistrict, getWardsByDistrict } from "@/app/api/address";
import { getCategoryList } from "@/app/api/category";
import { createProfile } from "@/app/api/profile";
import FormItem from "antd/es/form/FormItem";

interface IProps {
    userId: string;
}
const ProfileView = (props: IProps) => {
    const [form] = Form.useForm();
    const [selectedKey, setSelectedKey] = useState('profile');
    const [employee, setEmployee] = useState(null);
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    const [optionsProvincePermanent, setOptionsProvincePermanent] = useState<SelectProps['options']>([]);
    const [optionsDistrictPermanent, setOptionsDistrictPermanent] = useState<SelectProps['options']>([]);
    const [optionsWardPermanent, setOptionsWardPermanent] = useState<SelectProps['options']>([]);
    const [optionsProvinceHometown, setOptionsProvinceHometown] = useState<SelectProps['options']>([]);
    const [optionsDistrictHometown, setOptionsDistrictHometown] = useState<SelectProps['options']>([]);
    const [optionsWardHometown, setOptionsWardHometown] = useState<SelectProps['options']>([]);
    const [optionsProvinceAddress, setOptionsProvinceAddress] = useState<SelectProps['options']>([]);
    const [optionsDistrictAddress, setOptionsDistrictAddress] = useState<SelectProps['options']>([]);
    const [optionsWardAddress, setOptionsWardAddress] = useState<SelectProps['options']>([]);
    const [ethnicity, setEthnicity] = useState();
    const [wardPermanentId, setWardPermanentId] = useState<number>();
    const [wardHometownId, setWardHometownId] = useState<number>();
    const [wardAddressId, setWardAddressId] = useState<number>();
    const [ethnicityId, setEthnicityId] = useState<number>();

    const handleSegmentChange = (value: any) => {
        setSelectedKey(value);
        console.log('Selected key:', value);
    };
    const fetchUsers = async () => {
        try {
            const response = await getProfile(props.userId);
            setEmployee(response.data);
            console.log("employee->", response.data);
            const wardPermanent = await getDistrictByWard(response.data.permanent_address_ward_id);
            const provincePermanent = await getProvinceByDistrict(wardPermanent.data.district.id);
            const wardHometown = await getDistrictByWard(response.data.hometown_ward_id);
            const provinceHometown = await getProvinceByDistrict(wardHometown.data.district.id);
            const wardAddress = await getDistrictByWard(response.data.address_now_ward_id);
            const provinceAddress = await getProvinceByDistrict(wardAddress.data.district.id);
            form.setFieldsValue({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                sex: response.data.sex,
                cccd: response.data.cccd,
                date: dayjs(response.data.date_of_birth),
                permanentDetail: response.data.permanent_address_detail,
                hometownDetail: response.data.hometown_detail,
                addressDetail: response.data.address_now_detail,
                phone: response.data.phone_number,
                edu: response.data.education_level,
                ethnicity: response.data.ethnicity.id,
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
                hometown: {
                    province: provinceHometown.data.id,
                    district: {
                        value: wardHometown.data.district.id,
                        label: wardHometown.data.district.name
                    },
                    ward: {
                        value: wardHometown.data.id,
                        label: wardHometown.data.name
                    }
                },
                address: {
                    province: provinceAddress.data.id,
                    district: {
                        value: wardAddress.data.district.id,
                        label: wardAddress.data.district.name
                    },
                    ward: {
                        value: wardAddress.data.id,
                        label: wardAddress.data.name
                    }
                }
            });
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchEthnicity = async () => {
        try {
            const response = await getCategoryList('ethnicities', 1, 100, null);
            const fetchedOptions = response.data.map((item: any) => ({
                value: item.id,
                label: item.name,
            }));
            setEthnicity(fetchedOptions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchEthnicity();
        fetchOptionsProvince();
        fetchUsers();
    }, []);
    const handlCreate = () => {

    }
    const fetchOptionsProvince = async () => {
        try {
            const response = await getCategoryList('province', 1, 100, null);
            const fetchedOptions = response.data.map((item: any) => ({
                value: item.id,
                label: item.name,
            }));
            setOptionsProvincePermanent(fetchedOptions);
            setOptionsProvinceHometown(fetchedOptions);
            setOptionsProvinceAddress(fetchedOptions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
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
    const handleChangeProvinceHometown = async (value: number) => {
        const district = await getDistrictsByProvince(value, 1, 100, null);
        const fetchedOptions = district.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsDistrictHometown(fetchedOptions);
    };
    const handleChangeDistrictHometown = async (value: number) => {
        const response = await getWardsByDistrict(value, 1, 100, null);
        const fetchedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsWardHometown(fetchedOptions);
    }
    const handleChangeProvinceAddress = async (value: number) => {
        const district = await getDistrictsByProvince(value, 1, 100, null);
        const fetchedOptions = district.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsDistrictAddress(fetchedOptions);
    };
    const handleChangeDistrictAddress = async (value: number) => {
        const response = await getWardsByDistrict(value, 1, 100, null);
        const fetchedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setOptionsWardAddress(fetchedOptions);
    }
    const handleChangeWardPermanent = (value: number) => {
        setWardPermanentId(value);
    }
    const handleChangeWardHometown = (value: number) => {
        setWardHometownId(value);
    }
    const handleChangeWardAddress = (value: number) => {
        setWardAddressId(value);
    }
    const handleChangeEthnicity = (value: number) => {
        setEthnicityId(value);
    }
    const handleSubmit = async (values: any) => {
        const { first_name, last_name, sex, cccd, date, phone, ethnicity, edu, permanentDetail, hometownDetail, addressDetail } = values;
        const profile: Profile = {
            userId: props.userId,
            first_name: first_name,
            last_name: last_name,
            sex: sex,
            cccd: cccd,
            date_of_birth: date,
            phone_number: phone,
            education_level: edu,
            ethnicityId: ethnicity,
            hometown_ward_id: wardHometownId ?? 0,
            permanent_address_ward_id: wardPermanentId ?? 0,
            address_now_ward_id: wardAddressId ?? 0,
            address_now_detail: addressDetail,
            permanent_address_detail: permanentDetail,
            hometown_detail: hometownDetail,
        }
        console.log('profile->', profile);
        try {
            const response = await createProfile(profile);
            console.log("create profile->", response);
            if (response.statusCode == 201) {
                message.success("Cập nhật thông tin thành công.");
            }
        } catch (e) {
            message.error("Cập nhật thông tin thất bại.");
            console.error(e);
        }

    }
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager Profile</span>
                {/* {employee ? (
                    <Button onClick={handlCreate}>Edit Profile</Button>
                ) : (
                    <Button>Create Profile</Button>
                )} */}
            </div>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                disabled={componentDisabled}
                onFinish={handleSubmit}
            >
                <Form.Item label="Họ:" name='first_name'>
                    <Input />
                </Form.Item>
                <Form.Item label="Tên:" name='last_name'>
                    <Input />
                </Form.Item>
                <Form.Item label="Giới tính:" name='sex'>
                    <Radio.Group>
                        <Radio value={1}> Nam </Radio>
                        <Radio value={0}> Nữ </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="CCCD" name='cccd'>
                    <Input />
                </Form.Item>
                <Form.Item label="Ngày sinh" name='date'>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Nơi sinh" name='permanent'>
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
                <Form.Item label="Nơi sinh Chi tiết" name="permanentDetail">
                    <Input placeholder="Thôn, số nhà, ngõ" />
                </Form.Item>
                <Form.Item label="Quên quán" name='hometown'>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item name={['hometown', 'province']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select Province"
                                onChange={handleChangeProvinceHometown}
                                options={optionsProvinceHometown}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                        <Form.Item name={['hometown', 'district']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select District"
                                onChange={handleChangeDistrictHometown}
                                options={optionsDistrictHometown}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                        <Form.Item name={['hometown', 'ward']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select Ward"
                                onChange={handleChangeWardHometown}
                                options={optionsWardHometown}
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
                <Form.Item label="Quê quán chi tiết" name="hometownDetail">
                    <Input placeholder="Thôn, số nhà, ngõ" />
                </Form.Item>
                <Form.Item label="Nơi ở hiện nay" name='address'>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item name={['address', 'province']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select Province"
                                onChange={handleChangeProvinceAddress}
                                options={optionsProvinceAddress}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                        <Form.Item name={['address', 'district']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select District"
                                onChange={handleChangeDistrictAddress}
                                options={optionsDistrictAddress}
                                filterOption={(inputValue, option) => {
                                    if (!option) return false;
                                    const label = option.label?.toString().toLowerCase() || '';
                                    return label.includes(inputValue.toLowerCase());
                                }
                                }
                            />
                        </Form.Item>
                        <Form.Item name={['address', 'ward']} noStyle>
                            <Select
                                showSearch
                                style={{ flex: 1 }}
                                placeholder="Select Ward"
                                onChange={handleChangeWardAddress}
                                options={optionsWardAddress}
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
                <FormItem label="Chỗ ở chi tiết" name="addressDetail">
                    <Input placeholder="Thôn, số nhà, ngõ" />
                </FormItem>
                <Form.Item label="Số điện thoại" name='phone'>
                    <Input />
                </Form.Item>
                <Form.Item label="Dân tộc" name='ethnicity'>
                    <Select
                        showSearch
                        placeholder="Select Ethnicity"
                        onChange={handleChangeEthnicity}
                        options={ethnicity}
                        filterOption={(inputValue, option) => {
                            if (!option) return false;
                            const label = option.label?.toString().toLowerCase() || '';
                            return label.includes(inputValue.toLowerCase());
                        }
                        }
                    />
                </Form.Item>

                <Form.Item label="Trình độ văn hóa" name='edu'>
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    {
                        employee ? (
                            <Button type="primary" htmlType="submit" style={{ width: '20%' }}>
                                Edit profile
                            </Button>
                        ) : (
                            <Button type="primary" htmlType="submit" style={{ width: '20%' }}>
                                Create profile
                            </Button>
                        )
                    }
                </Form.Item>
            </Form>
        </>
    )
}
export default ProfileView;

