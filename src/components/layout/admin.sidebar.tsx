'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    SmileOutlined,
    SolutionOutlined,
    TeamOutlined,

} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from 'antd';
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'ADMIN',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/dashboard/user"}>Manage Users</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "roles",
                    label: <Link href={"/dashboard/role"}>Manage Roles</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: 'sub2',
                    label: 'Manage Category',
                    icon: <AppstoreOutlined />,
                    children: [
                        {
                            key: 'degree',
                            label: <Link href={"/dashboard/category/degree"}>Manage Degree</Link>,
                            icon: <SmileOutlined />
                        },
                        {
                            key: 'ethnicity',
                            label: <Link href={"/dashboard/category/ethnicity"}>Manage Ethnicity</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'major',
                            label: <Link href={"/dashboard/category/major"}>Manage Major</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'school',
                            label: <Link href={"/dashboard/category/school"}>Manage School</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'education',
                            label: <Link href={"/dashboard/category/educationType"}>Manage Education Type</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'relationship',
                            label: <Link href={"/dashboard/category/relationship"}>Manage Relationship</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'province',
                            label: <Link href={"/dashboard/category/province"}>Manage Province</Link>,
                            icon: <SolutionOutlined />
                        },
                    ],
                },
                {
                    type: 'divider',
                },
                {
                    key: 'sub4',
                    label: 'Navigation Three',
                    icon: <SettingOutlined />,
                    children: [
                        { key: '9', label: 'Option 9' },
                        { key: '10', label: 'Option 10' },
                        { key: '11', label: 'Option 11' },
                        { key: '12', label: 'Option 12' },
                    ],
                },
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapseMenu}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;