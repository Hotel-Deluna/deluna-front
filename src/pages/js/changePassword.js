import React, { useState,useEffect } from "react";
import { Container, Row, Form, Button,Col,FloatingLabel } from "react-bootstrap";
import "../css/authFind.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
    //변경할 비밀번호
    const [password, setPassword] = useState('');
    const [rePassword, setRePasswor] = useState('');
    const [rePasswordCheck, setRePassworCheck] = useState('');
    const [code, setCode] = useState('');
    let navigate = useNavigate(); //페이지 이동 : react v6부터 useHistory -> useNavigate
    const handlePassword = (e) => {
        const {name, value} = e.target;
        if(name === 'rePassword' ){
            setRePasswor(value);
        }else if(name === 'rePasswordCheck'){
            setRePassworCheck(value);
        }else if(name === 'password'){
            setPassword(value)
        }
    }

    const handleCode = (e) => {
        setCode(e.target.value);
    }
    const changePassword = () => {
        let pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if(!pwCheck.test(rePassword)){
            alert('비밀번호는 숫자, 영 대&소문자, 특수문자 포함 8자리 이상 15자리 이하입니다.')
        }else{
            if(rePassword !== rePasswordCheck){
                alert('변경 비밀번호가 일치하지 않습니다.')
            }else{
                if(localStorage.getItem('role') !== null){
                    axios.patch('http://43.200.222.222:8080/member/memberUpdatePwd',{
                        password : password,
                        update_password :rePassword,
                        role : localStorage.getItem('role')
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : localStorage.getItem('accessToken'),
                        }
                    }).then((res) => {
                        if(res.data.result === "OK"){
                            alert('비밀번호 변경에 성공하였습니다. 재로그인 해주세요.');
                            localStorage.removeItem('role');
                            localStorage.removeItem('email');
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            navigate("/auth/login");
                        }else{
                            alert('비밀번호 변경에 실패하셨습니다.');

                        }
                    });
                }else{
                    axios.patch('http://43.200.222.222:8080/member/updatePwd',{
                        password :rePassword,
                        email_auth_num : code
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : localStorage.getItem('accessToken')
                        }
                    }).then((res) => {
                        localStorage.removeItem('accessToken');
                        if(res.data.result === "OK"){
                            alert('비밀번호 변경에 성공하였습니다. 로그인 해주세요.')
                            navigate("/auth/login");
                        }else{
                            alert('비밀번호 변경에 실패하셨습니다.');
                            navigate("/auth/findPassword");

                        }
                    });
                }
            }
        }
    }
    return (
        <>
        <Container id="findContainer">
        <Row>
            <Col style={{marginBottom:'30px', fontWeight:'bold'}}>
                {localStorage.getItem('role') !== null ? '비밀번호 변경' : '비밀번호 재설정'}
            </Col>
        </Row>
        {
            localStorage.getItem('role') !== null ?
            <Row className="align-items-center mb-3">
                {/* 휴대폰번호 input창 */}
                <Col sm = {12}>
                <FloatingLabel controlId="password" label="기존 비밀번호">
                        <Form.Control type="password" name="password" onChange={handlePassword}/>
                    </FloatingLabel>
                </Col>
            </Row>
            :null
        }
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {12}>
            <FloatingLabel controlId="rePassword" label="변경 비밀번호">
                    <Form.Control type="password" name="rePassword" onChange={handlePassword} maxLength={15}/>
                    <Form.Text id="rePassword">숫자, 영문 대&소문자, 특수문자 포함 8자리 이상 15자리 이하</Form.Text>
                </FloatingLabel>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {12}>
            <FloatingLabel controlId="rePasswordCheck" label="변경 비밀번호 확인">
                    <Form.Control type="password" name="rePasswordCheck" onChange={handlePassword} maxLength={15}/>
                    <Form.Text id="rePassword"
                    style={{
                        color: !rePassword || !rePasswordCheck ? 'black' : (rePassword !== rePasswordCheck ? 'red' : 'blue')
                    }}
                    >
                        {
                            !rePassword || !rePasswordCheck ? '변경 비밀번호와 동일하게 입력해주세요.' :
                            (rePassword !== rePasswordCheck ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치합니다.')
                        }

                    </Form.Text>
                </FloatingLabel>
            </Col>
        </Row>
        {(localStorage.getItem('role') === null && 
            <Row className="align-items-center mb-3">
                {/* 휴대폰번호 input창 */}
                <Col sm = {12}>
                <FloatingLabel controlId="rePasswordCheck" label="인증코드">
                        <Form.Control type="number" name="verificationCode" onChange={handleCode} />
                    </FloatingLabel>
                </Col>
            </Row>   
        )}
        <Row>
            <Col sm = {12}>
                <div id="buttonGroup">
                    <Button variant="outline-primary"
                    disabled={
                        localStorage.getItem('role') === null ? (!rePassword || !rePasswordCheck || rePasswordCheck !== rePassword || !code ? true : false)
                        :  (!password || !rePassword || !rePasswordCheck || rePasswordCheck !== rePassword || rePassword === password ? true : false)
                    }
                    onClick={() => changePassword()}
                    >
                        변경
                    </Button>{' '}
                    <Link to = {"/auth/login"}>
                        <Button variant="outline-secondary">취소</Button>{' '}
                    </Link>
                </div>
                
            </Col>
        </Row>
        </Container>
        </>

        
        
    )
}

export default FindPassword;