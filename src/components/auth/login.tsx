'use client'
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { authenticate } from '@/utils/action';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from '@/auth';
import { IUser } from '@/types/next-auth';
import userType from '@/utils/userType';

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status]);
    const onFinish = async (values: any) => {

        const { email, password } = values;
        const res = await authenticate(email, password)
        console.log(res)
        if (res?.error) {
            //error
            if (res?.code === 5) {
                return router.push('/')
            }
            notification.error({
                message: "Error login",
                description: res?.error,
                duration: 1
            })

        } else {
            const type = await userType();
            notification.success({
                message: "Success login",
                description: "Đăng nhập thành công.",
                duration: 1
            })
            if (type == "QUANTRI") {
                router.push('/dashboard');
            }
            else if (type == "NHANVIEN") {
                router.push('/user/home');
            }

        }
    };
    return (
        <Row justify={"center"} style={{ marginTop: "120px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                </fieldset>
            </Col>
        </Row>
    )
}
