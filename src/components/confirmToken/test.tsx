'use client'
import { confirmToken, resetPassword } from "@/app/api/user";
import { Button, Col, Form, Input, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResetForm from "./success";

const Test = () => {
    const searchParams = useSearchParams();
    const [confirm, setConfirm] = useState(0);
    const token = searchParams.get('token') || '';
    const fetchConfirm = async () => {
        try {
            const response = await confirmToken(token);
            console.log('respon->', response);
            if (response.statusCode == 200) {
                setConfirm(200)
            }
            if (response.statusCode == 400) {
                setConfirm(400);
            }
            if (response.statusCode == 403) {
                setConfirm(403);
            }
            if (response.statusCode == 404) {
                setConfirm(404);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const onFinish = async (values: any) => {

        const { password, confirmPassword } = values;
        const confirm: ResetPassword = {
            token: token,
            password: password,
            confirmPassword: confirmPassword
        }
        const res = await resetPassword(confirm);
        console.log(res)
    };
    useEffect(() => {
        fetchConfirm();
    }, [])
    return (
        <>
            <Row justify={"center"} style={{ marginTop: "120px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}>
                        {
                            confirm == 200 ? (
                                <ResetForm
                                    token={token}
                                />
                            ) : (confirm == 400 ? (
                                <div>
                                    token sai
                                </div>
                            ) : confirm == 403 ? (
                                <div>
                                    token het han
                                </div>
                            ) : (
                                <div>
                                    email hoac code sai.
                                </div>
                            )

                            )
                        }
                    </fieldset>
                </Col>
            </Row>
        </>

    )
}
export default Test;