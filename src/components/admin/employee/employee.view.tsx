'use client'
import React, { useState } from "react";
import { Button, Cascader, Checkbox, Col, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Rate, Row, Segmented, Select, Slider, Switch, TreeSelect, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import ProfileView from "./profile/profile.view";
import EducationView from "./educatioin/education.view";
import FamilyView from "./family/family.view";
import ExperiencesView from "./experiences/experiences.view";

interface IProps {
    userId: string;
}
const EmployeeView = (props: IProps) => {
    const { RangePicker } = DatePicker;
    const [selectedKey, setSelectedKey] = useState('profile');
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

    const handleSegmentChange = (value: any) => {
        setSelectedKey(value);
        console.log('Selected key:', value);
    };
    return (
        <div>
            <Segmented
                style={{ height: '40px', fontSize: '16px' }}
                options={[
                    { label: 'Profile', value: '1' },
                    { label: 'Education', value: '2' },
                    { label: 'Family', value: '3' },
                    { label: 'Experiences', value: '4' }
                ]}
                block
                onChange={handleSegmentChange}
            />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                <div style={{
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    width: 800
                }}>
                    {selectedKey == '1' ? (
                        <ProfileView
                            userId={props.userId}
                        />
                    ) : selectedKey == '2' ? (
                        <EducationView />
                    ) : selectedKey == '3' ? (
                        <FamilyView
                            userId={props.userId}
                        />
                    ) : selectedKey == '4' ? (
                        <ExperiencesView />
                    ) : <ProfileView userId={props.userId} />}

                </div>
            </div>
        </div>
    )
}
export default EmployeeView;

