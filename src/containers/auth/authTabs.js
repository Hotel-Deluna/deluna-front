import React, {useState} from "react";
import PartnerJoin from "./partnerJoin";
import UserJoin from "./userJoin";
//import JoinForm from "./joinForm";
import Login from "./loginForm";
import { initializeForm } from "../../modules/auth";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch();
    function handleClick(firstTab) {        
        if(firstTab === 'user'){
            setValue('user');
        }else{
            setValue('partner');
        }
    }
    //  useEffect(() => {
    //      dispatch(initializeForm('login'));
    //  }, []);
    return (
        <Tabs defaultActiveKey={value} onSelect={(firstTab) => handleClick(`${firstTab}`)} id="justify-tab-example" justify>
        {/* 고객 tab */}
        <Tab eventKey="user" title={'고객 '+title}>
            {type === 'join' && value == 'user' && (<UserJoin />)}
            {type === 'login' && value == 'user' && (<Login type={'user'} />)}
            {/* {type === 'login'  ? 
                (value === 'user' ? <Login type={value} /> : <></>)
            : <UserJoin />} */}
        </Tab> 
            {/* 사업자 회원가입 */}
        <Tab eventKey="partner" title={'사업자 '+title}>
            {type === 'join' && value == 'partner' && (<UserJoin />)}
            {type === 'login' && value == 'partner' && (<Login type={'partner'} />)}
        </Tab>
    </Tabs>
        
    );
}

export default AuthTabs;