import React from "react";
import AuthLayout from "../../components/auth/authLayout";
//import AuthTabs from "../../containers/auth/authTabs";
import JoinForm from "../../containers/auth/joinForm";
/**
 * 
 * 
 * 회원가입 페이지
 * 
 * 
 */

const JoinPage = () => {
    return (
        <AuthLayout>
            <JoinForm />
        </AuthLayout>
    );
}

export default JoinPage;