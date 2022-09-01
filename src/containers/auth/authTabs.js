import React, {useState} from "react";
import PartnerJoinForm from "../../components/auth/partnerJoinForm";
import UserJoinForm from "../../components/auth/userJoinForm";
import {Tabs, Tab } from "react-bootstrap";

/**
 * 
 * 
 * 사업자, 고객 tabs 컴포넌트
 * 
 * 
 */
 const textMap = {
    join : '회원가입',
    login : '로그인',
 };

const AuthTabs = ({ type }) => {
    const title = textMap[type];
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
        <Tabs defaultActiveKey={value} onSelect={(firstTab) => handleClick(`${firstTab}`)} id="justify-tab-example" className="mb-3" justify>
            {/* 고객 회원가입 */}
            <Tab eventKey="user" title={'고객 '+title}>
                {value === 'user' ? <UserJoinForm /> : <></>}
                
            </Tab> 
                {/* 사업자 회원가입 */}
            <Tab eventKey="partner" title={'사업자 '+title}>
                {value === 'partner' ? <PartnerJoinForm  /> : <></>}
            </Tab>
        </Tabs>
    );
}

export default AuthTabs;