import React from "react";
import { Container, Tabs, Tab} from "react-bootstrap";
import AuthCommonForm from "./authCommonForm";
const AuthJoinForm = ({type ,form, setInfo, menuChange, onChangeNum, timerCheck, reTimerCheck, onChange, onSubmit, onClick, resetCertify, highFunction1, highFunction2, firstCheck, isCheckbox1, isCheckbox2}) => {
    //console.log(setInfo);
    const FormContainer = {
        textAlign : 'left',
        paddingTop : '2rem',
        paddingBottom : '2rem',
        paddingRight : '3rem',
        paddingLeft : '3rem',
        borderLeft : '1px solid #dee2e6',
        borderRight : '1px solid #dee2e6',
        borderBottom: '1px solid #dee2e6',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 6px 2px',
        backgroundColor: 'rgb(255, 255, 255)'
    };
    return(
        <>
        {firstCheck && (
            <Tabs defaultActiveKey='user' onSelect={(e) => menuChange(type === 1 ? 2 : 1, e)} id="justify-tab-example" justify>
            <Tab eventKey="user" title={'고객 회원가입'}>
            {type === 1 &&(
                <Container style={FormContainer} className="joinMainCountainer" fluid="xxl">
                <AuthCommonForm page={'join'} type={type} form={form} setInfo={setInfo} onChangeNum={onChangeNum} timerCheck={timerCheck} reTimerCheck={reTimerCheck} 
                    onChange={onChange} onSubmit={onSubmit} onClick={onClick} resetCertify={resetCertify} highFunction1={highFunction1} isCheckbox1={isCheckbox1} />
                </Container>
            )}
                
            </Tab>
            <Tab eventKey="partner" title={'사업자 회원가입'}>
            {type === 2 && (
                <Container style={FormContainer} className="joinMainCountainer" fluid="xxl">
                <AuthCommonForm page={'join'} type={type} form={form} setInfo={setInfo} onChangeNum={onChangeNum} timerCheck={timerCheck} reTimerCheck={reTimerCheck}
                    onChange={onChange} onSubmit={onSubmit} onClick={onClick} resetCertify={resetCertify} highFunction1={highFunction1} highFunction2={highFunction2} isCheckbox1={isCheckbox1} isCheckbox2={isCheckbox2} />
                </Container>
            )}
            </Tab>
        </Tabs>
        )}
        </>
    );
}

export default AuthJoinForm;