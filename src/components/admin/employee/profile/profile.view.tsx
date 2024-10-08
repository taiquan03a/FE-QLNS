'use client'
import React, { useEffect, useState } from "react";
import { Button, Cascader, Checkbox, Col, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Rate, Row, Segmented, Select, Slider, Switch, TreeSelect, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { getProfile } from "@/app/api/employee";
import dayjs from "dayjs";

interface IProps {
    userId: string;
}
const ProfileView = (props: IProps) => {
    const [form] = Form.useForm();
    const [selectedKey, setSelectedKey] = useState('profile');
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

    const handleSegmentChange = (value: any) => {
        setSelectedKey(value);
        console.log('Selected key:', value);
    };
    const fetchUsers = async () => {
        try {
            const response = await getProfile(props.userId);
            form.setFieldsValue({
                name: response.data.first_name + " " + response.data.last_name,
                sex: 1,
                cccd: response.data.phone_number,
                date: dayjs(response.data.date_of_birth),
                permanent: response.data.permanent_address_detail,
                hometown: response.data.hometown_detail,
                address: response.data.address_now_detail,
                phone: response.data.phone_number,
                edu: response.data.education_level
            });
            console.log("response->", response);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (

        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
        >
            <Row gutter={18}>
                <Col span={14}>
                    <Form.Item label="Họ và tên:" name='name'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label="Giới tính:" name='sex'>
                        <Radio.Group>
                            <Radio value="0"> Nam </Radio>
                            <Radio value="1"> Nữ </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="CCCD" name='cccd'>
                <Input />
            </Form.Item>
            <Form.Item label="Ngày sinh" name='date'>
                <DatePicker />
            </Form.Item>
            <Form.Item label="Nơi sinh" name='permanent'>
                <Input />
            </Form.Item>
            <Form.Item label="Quên quán" name='hometown'>
                <Input />
            </Form.Item>
            <Form.Item label="Nơi ở hiện nay" name='address'>
                <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name='phone'>
                <Input />
            </Form.Item>
            <Form.Item label="Dân tộc" name='ethnicity'>
                <Select>
                    <Select.Option value="demo">Kinh</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Trình độ văn hóa" name='edu'>
                <InputNumber />
            </Form.Item>
        </Form>
    )
}
export default ProfileView;

