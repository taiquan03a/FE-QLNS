'use client'
import React, { useState } from "react";
import { Button, Cascader, Checkbox, Col, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Rate, Row, Segmented, Select, Slider, Switch, TreeSelect, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import EducationView from "./educatioin/education.view";
import FamilyView from "./family/family.view";
import ExperiencesView from "./experiences/experiences.view";
import ProfileView from "./profile/profile.view";
import ProfileViewUser from "./profile/profile.view";

const UserView = () => {
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
                    width: 1000
                }}>
                    {selectedKey == '1' ? (
                        <ProfileViewUser

                        />
                    ) : selectedKey == '2' ? (
                        <EducationView

                        />
                    ) : selectedKey == '3' ? (
                        <FamilyView
                        />
                    ) : selectedKey == '4' ? (
                        <ExperiencesView
                        />
                    ) : <ProfileViewUser />}

                </div>
            </div>
        </div>
    )
}
export default UserView;

