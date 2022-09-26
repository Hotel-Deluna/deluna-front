import React, { useState,useEffect } from "react";
import { Container, Row, Form, Button,Col,FloatingLabel } from "react-bootstrap";
import "../css/authFind.scss";
import { Link } from 'react-router-dom';
import Timer from "../../components/auth/timer";
import axios from "axios";
const FindPassword = () => {
    //입력한 이메일
    const [email, setEmail] = useState();
    //입력한 이름
    const [koName, setKoName] = useState();
    //입력한 휴대폰 번호
    const [phone, setphone] = useState();
    //입력한 인증번호
    const [certNum, setCertNum] = useState();



    const [timerCheck, setTimerCheck] = useState(false);
    const [reTimerCheck, setReTimerCheck] = useState(0);
    const [reset, resetCertify] = useState(false);
    //인증 확인이 되었을때
    const [certification, setCertification] = useState(false);

    const [findIdClick, setFindIdClick] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'name'){
            const regex = /^[가-힣|ㄱ-ㅎ\s]+$/
            if(regex.test(value)){
                setKoName(value)
            }else if(!value){
                setKoName('')
            }
        }else if(name === 'phoneNum'){
            const regex = /^[0-9\b -]{0,13}$/;
            if(regex.test(value)){
                const reValue = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
                setphone(reValue)
            }
        }else if(name === 'email'){
            setEmail(value)
        }else{
            setCertNum(value)
        }
          
    }

    //아이디 찾기
    const findPassword = () => {
        
        axios.post('http://43.200.222.222:8080/member/findPwd',{
            email : email,
            name :koName,
            phone_num: phone.replace(/\-/g,'')
          }).then((res) => {
              if(res.data.result === "OK"){ //성공
                setFindIdClick(true)
                console.log(res)
                
              }else{// 실패
                  alert('일치하는 회원정보가 존재하지 않습니다.');
              }
          });
    }

    const handleCertReq = () => {
        /*axios.post('http://43.200.222.222:8080/common/phone/auth/request',{
          phone_num: phone.replace(/\-/g,'')
          }).then((res) => {
              if(res.data.result === "OK"){ //성공
                setTimerCheck(true);//timer시작
                alert('입력하신 휴대폰 번호로 인증번호를 전송했습니다.');
              }else{// 실패
                  setTimerCheck(false);//timer종료
                  alert('문자발송에 실패하였습니다. 잠시후 다시 이용 부탁드립니다.');
              }
          });*/
        setTimerCheck(true);//timer시작
    }
    const handleCertConfirm = () => {
        /*axios.post('http://43.200.222.222:8080/common/phone/auth/verify',{
        auth_num : certNum, 
        phone_num : phone.replace(/\-/g,'')
        }).then((res) => {
            if(res.data.result === "OK"){ //성공
                if(res.data.data === true){
                    alert('인증이 완료되었습니다.');
                    setTimerCheck(false);//타이머종료
                    setCertification(true);
                }else{
                    alert('인증번호가 일치하지 않습니다. 확인 후 다시 입력 해주세요.')
                }
                
            }else{// 실패
                alert('일시적인 에러입니다. 관리자에게 문의해주세요.');

            }
        })*/
        setTimerCheck(false);//타이머종료
        setCertification(true);
    }
    useEffect(() => { //타이머 시간 끝났을 시
        if(reset === 1){
          alert('인증시간이 다됐습니다. 다시 인증요청 해주세요.');
          setTimerCheck(false);
          resetCertify(0);
        }
      },[reset]);
    return (
        <>
        <Container id="findContainer">
        <Row>
            <Col style={{marginBottom:'30px', fontWeight:'bold'}}>
                비밀번호 찾기
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {12}>
            <FloatingLabel controlId="email" label="이메일">
                    <Form.Control type="email" name="email" onChange={handleChange}/>
                </FloatingLabel>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {12}>
            <FloatingLabel controlId="name" label="이름">
                    <Form.Control type="text" name="name" onChange={handleChange}/>
                </FloatingLabel>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {9}>
                <FloatingLabel controlId="phoneNum" label="휴대폰번호">
                    {/* setInfo.phoneNum.value */}
                    <Form.Control type="text" name="phoneNum" onChange={handleChange} value={phone}/>
                        <Form.Text id="managerPhoneNumberHelpBlock">하이픈(-) 제외 숫자만 11~12자리 입력</Form.Text>

                        <div className={!timerCheck ? 'timerDiv visibility_hidden' : 'timerDiv visibility_visible'}>
                        <Timer timerCheck={timerCheck} resetCertify={resetCertify} reTimerCheck={reTimerCheck} />
                            {/* <Timer timerCheck={timerCheck} resetCertify={resetCertify} reTimerCheck={reTimerCheck} /> */}
                        </div>
                </FloatingLabel>
            </Col>
        {/* 휴대폰번호 인증요청 버튼 */}
            <Col sm = {3}>
                <div className='d-grid join_btns'>
                    <Button name='phoneBtn' variant={'warning'} size="lg" disabled={!koName || !phone || !email || certification ? true : false}
                    onClick={() => handleCertReq()}
                    >
                        {!certification ? '인증요청' : '인증완료'}
                    </Button>
                </div>
            </Col>
        </Row>
        {
            timerCheck ?
                <Row className="align-items-center mb-3">
                    <Col sm = {9}>
                        <FloatingLabel controlId="phoneNum" label="인증번호 확인">
                            {/* setInfo.phoneNum.value */}
                            <Form.Control type="number" name="certNum" onChange={handleChange}/>
                            <Form.Text id="managerPhoneNumberHelpBlock">인증번호 6자리 입력</Form.Text>
                        </FloatingLabel>
                    </Col>
                {/* 휴대폰번호 인증요청 버튼 */}
                    <Col sm = {3}>
                        <div className='d-grid join_btns'>
                            <Button name='phoneBtn' variant={'warning'} size="lg" disabled={!certNum ? true : false}
                            onClick={() => handleCertConfirm()}
                            >
                                인증확인
                            </Button>
                        </div>
                    </Col>
                </Row>
            : null
        }
        <Row>
            <Col sm = {12}>
                <div id="buttonGroup">
                    <Button variant="outline-primary" onClick={() => findPassword()} disabled={!certification ? true : false}>
                        비밀번호 찾기
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