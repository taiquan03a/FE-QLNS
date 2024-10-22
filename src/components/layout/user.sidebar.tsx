'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    PullRequestOutlined,
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
const UserSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'NHANH VIEN',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/user/home"}>Home</Link>,
                    icon: <HomeOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/user/info"}>View Info</Link>,
                    icon: <InfoCircleOutlined />
                },
                {
                    key: "roles",
                    label: <Link href={"/user/request"}>Manage Request</Link>,
                    icon: <PullRequestOutlined />,
                    children: [
                        {
                            key: 'profile',
                            label: <Link href={"/dashboard/category/degree"}>Profile</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'education',
                            label: <Link href={"/dashboard/category/degree"}>Education</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'exp',
                            label: <Link href={"/dashboard/category/degree"}>EXP</Link>,
                            icon: <SolutionOutlined />
                        },
                        {
                            key: 'family',
                            label: <Link href={"/dashboard/category/degree"}>Family</Link>,
                            icon: <SolutionOutlined />
                        }
                    ]
                },
                // {
                //     key: 'sub2',
                //     label: 'Manage Category',
                //     icon: <AppstoreOutlined />,
                //     children: [
                //         {
                //             key: 'degree',
                //             label: <Link href={"/dashboard/category/degree"}>Manage Degree</Link>,
                //             icon: <SmileOutlined />
                //         },
                //         {
                //             key: 'ethnicity',
                //             label: <Link href={"/dashboard/category/ethnicity"}>Manage Ethnicity</Link>,
                //             icon: <SolutionOutlined />
                //         },
                //         {
                //             key: 'major',
                //             label: <Link href={"/dashboard/category/major"}>Manage Major</Link>,
                //             icon: <SolutionOutlined />
                //         },
                //     ],
                // },
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

export default UserSideBar;