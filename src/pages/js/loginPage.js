import React from "react";
import AuthLayout from "../../components/auth/authLayout";
//import AuthTabs from "../../containers/auth/authTabs";
import Login from "../../containers/auth/loginForm";
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
            <Login page={0} />
            {/* <AuthTabs type={'login'} /> */}
        </AuthLayout>
    );
}

export default LoginPage;