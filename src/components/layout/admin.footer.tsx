'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                ©{new Date().getFullYear()}
            </Footer>
        </>
    )
}

export default AdminFooter;