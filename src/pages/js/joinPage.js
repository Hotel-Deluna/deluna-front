import React, {useState} from "react";
import AuthLayout from "../../components/auth/authLayout";
import AuthTabs from "../../components/auth/authTabs";
/**
 * 
 * 
 * 회원가입 페이지
 * 
 * 
 */

const JoinPage = () => {
    const [value, setValue] = useState('user');
    function handleClick(firstTab) {
        if(firstTab !== value){
            if(firstTab === 'user'){
                setValue('user');
            }else{
                setValue('partner');
            }
        }
    }
    return (
        <AuthLayout>
            <AuthTabs type={'join'} />
        </AuthLayout>
    );
}

export default JoinPage;