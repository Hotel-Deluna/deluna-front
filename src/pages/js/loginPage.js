import React from "react";
import AuthLayout from "../../components/auth/authLayout";
import AuthTabs from "../../containers/auth/authTabs";
/**
 * 
 * 
 * 회원가입 페이지
 * 
 * 
 */

const LoginPage = () => {
    return (
        <AuthLayout>
            <joinPage />
            <AuthTabs type={'login'} />
        </AuthLayout>
    );
}

export default LoginPage;