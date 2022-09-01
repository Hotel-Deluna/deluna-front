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

const JoinPage = () => {
    return (
        <AuthLayout>
            <AuthTabs type={'join'} />
        </AuthLayout>
    );
}

export default JoinPage;