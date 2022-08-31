import React, {useState} from "react";
import AuthForm from "./authForm";
import {Tabs, Tab } from "react-bootstrap";

/**
 * 
 * 
 * 회원가입 페이지
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
                {type === 'join'
                    ?
                    value === 'user' ? <AuthForm type={'user'} pageType={'join'} /> : <></>
                    :
                    //로그인
                    <></>
                }
                
            </Tab> 
                {/* 사업자 회원가입 */}
            <Tab eventKey="partner" title={'사업자 '+title}>
            {type === 'join'
                ?
                value === 'partner' ? <AuthForm type={'patner'} pageType={'join'} /> : <></>
                :
                <></>
            }
            </Tab>
        </Tabs>
    );
}

export default AuthTabs;