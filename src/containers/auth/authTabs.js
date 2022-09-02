import React, {useState} from "react";
import PartnerJoin from "./partnerJoin";
import UserJoin from "./userJoin";
import UserLogin from "./userLogin";
import PartnerLogin from "./partnerLogin";
import {Tabs, Tab } from "react-bootstrap";

/**
 * 
 * 
 * 사업자, 고객 tabs 컨테이너
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
                {type === 'join' ? <UserJoin /> : <UserLogin />}
                
            </Tab> 
                {/* 사업자 회원가입 */}
            <Tab eventKey="partner" title={'사업자 '+title}>
                {type === 'join' ? <PartnerJoin  /> : <PartnerLogin />}
            </Tab>
        </Tabs>
    );
}

export default AuthTabs;