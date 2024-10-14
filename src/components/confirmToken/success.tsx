import { resetPassword } from "@/app/api/user";
import { Button, Form, Input } from "antd"


interface Iporps {
    token: string;
}
const ResetForm = (props: Iporps) => {
    const onFinish = async (values: any) => {

        const { password, confirmPassword } = values;
        const confirm: ResetPassword = {
            token: props.token,
            password: password,
            confirmPassword: confirmPassword
        }
        const res = await resetPassword(confirm);
        console.log(res)
    };
    return (
        <>
            <legend>Reset Password</legend>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >

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
                    label="Confirm password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ResetForm;