import React , {useRef, useState}from "react";
import Timer from "./timer";
import JoinCheck from "./joinCheckbox";
//import Modal from "react-modal";
import { Container, Row, Col,Form, FloatingLabel, Button } from "react-bootstrap";
import "./css/authForm.scss";
import { setIn } from "immutable";

const AuthCommonForm = ({page, type, form, closeOnClick, setInfo, onChange, onChangeNum, onClick, onSubmit, timerCheck, reTimerCheck, resetCertify,  highFunction1, highFunction2}) => {
    //console.log(form);
    return(
        <Row className="justify-content-md-center" style={{marginTop: '1rem'}}>
        {/* <Col xs lg="1" /> */}
        <Col lg="12">
            <Container fluid="xxl">
                <Row className="align-items-center mb-3">
                    {page === 'join'
                    ? 
                    <><Col sm={9}>
                                <FloatingLabel label="이메일 주소">
                                    <Form.Control type="email" name="email" value={form.email} className={setInfo.email.btnCheck === 1 ? 'is-invalid' : ''} onChange={onChange} disabled={(setInfo.email.isCheck === true) && (setInfo.email.btnCheck === 2) ? true : false} />
                                    <Form.Text className={setInfo.email.btnCheck === 1 ? 'err_text' : ''} id="managerEmailHelpBlock">{form.email === '' ? 'email 형식(@)으로 작성해주세요.(공백없이)' : setInfo.email.msg}</Form.Text>
                                </FloatingLabel>
                            </Col><Col sm={3}>
                                    <div className={setInfo.email.btnCheck === 2 ? "d-grid mx-auto" : "d-grid join_btns mx-auto"}>
                                        <Button name='emailBtn' variant="outline-primary" onClick={onClick} size="lg" disabled={setInfo.email.btnCheck === 2 ? true : (setInfo.email.isCheck === true ? false : true) }>
                                            {setInfo.email.btnCheck === 2 ? '확인완료' : '중복확인'}
                                        </Button>
                                    </div>
                                </Col></>
                    :
                    <Col sm = {12}>
                    {/* 이메일 input창 */}
                    <FloatingLabel controlId="email" label="이메일 주소">
                        <Form.Control type="email" name="email" value={form.email} disabled />
                    </FloatingLabel>
                    </Col>
                    }
                </Row>
                {type === 1
                ? <Row className="align-items-center mb-3">
                    {/* 이름 input창 */}
                    <Col sm = {12}>
                        <FloatingLabel controlId="Name" label="성명">
                            <Form.Control type="text" name="name" value={form.name}  maxLength={17} onChange={onChange} />
                            <Form.Text >{page === 'join' ? ('한글만 입력') : setInfo.name.isSame ? '' : ('한글만 입력')}</Form.Text>
                        </FloatingLabel>
                    </Col>
                </Row>
                : (<>
                <Row className="align-items-center mb-3">
                    <Col sm={6}>
                        <FloatingLabel controlId="Name" label="사업주명">
                            <Form.Control type="text" name="name" value={form.name} maxLength={17} onChange={onChange} disabled={setInfo.businessNum.btnCheck === 2 && true} />
                            <Form.Text id="Name">{page === 'join' ? ('한글만 입력') : setInfo.opening_day.isSame && setInfo.name.isSame ? '' : ('한글만 입력')}</Form.Text>
                        </FloatingLabel>
                    </Col>
                    <Col sm={6}>
                        <FloatingLabel controlId="openDay" label="등록일자">
                            <Form.Control type="date" name="opening_day" value={form.opening_day} onChange={onChange} disabled={setInfo.businessNum.btnCheck === 2 && true}  />
                            <Form.Text id="openDay">{page === 'join' ? ('사업자 등록일자') : setInfo.opening_day.isSame && setInfo.name.isSame ? '' : ('사업자 등록일자')}</Form.Text>
                        </FloatingLabel>
                    </Col>
                </Row>
                </>)}
                {type === 1 && (
                    <Row className="align-items-center mb-3">
                        <Col sm={8}>
                            <FloatingLabel controlId="businessNum" label="사업자등록번호">
                                {/* setInfo.businessNum.value */}
                                <Form.Control type="text" name="businessNum" value={setInfo.businessNum.value} onChange={onChangeNum} disabled={setInfo.businessNum.btnCheck === 2 && true}  />
                                <Form.Text id="businessNum">{page === 'join' ? (setInfo.businessNum.value !== '' ? '' : ('하이픈(-)제외 숫자만 10자리 입력')) : (setInfo.businessNum.isSame ? '' : ('하이픈(-)제외 숫자만 10자리 입력'))}</Form.Text>
                                <input type='hidden' name='business_num' value={form.business_num}/>
                            </FloatingLabel>
                        </Col>
                    <Col sm={4}>
                        <div className={page === 'join' ? 'd-grid join_btns' : (setInfo.businessNum.isSame ? 'd-grid' : 'd-grid join_btns')}>
                            <Button name='businessBtn' variant={'outline-primary'} onClick={onClick} size="md" 
                            disabled={page === 'join' ? setInfo.name.isCheck || setInfo.businessNum.isCheck || setInfo.opening_day.isCheck ? false : true : (setInfo.name.isSame && setInfo.businessNum.isSame && setInfo.opening_day.isSame ? true : (setInfo.name.isCheck === true || setInfo.businessNum.isCheck === true || setInfo.opening_day.isCheck === true ? false : true))}>
                                {setInfo.businessNum.btnCheck < 2 ? '사업자번호 확인요청' : '사업자번호 확인완료'}
                            </Button>
                        </div>
                    </Col>
                    </Row>
                )}

                <Row className="align-items-center mb-3">
                    {/* 휴대폰번호 input창 */}
                    <Col sm = {8}>
                        <FloatingLabel controlId="phoneNum" label="휴대폰번호">
                            {/* setInfo.phoneNum.value */}
                            <Form.Control type="text" name="phoneNum" onChange={onChangeNum} value={setInfo.phoneNum.value} disabled={setInfo.phone_auth_num.btnCheck === 2 && true} />
                                <Form.Text id="managerPhoneNumberHelpBlock" className={setInfo.phoneNum.btnCheck === 2 && 'border_text' }>{setInfo.phoneNum.value === '' ? '하이픈(-) 제외 숫자만 11~12자리 입력' : setInfo.phoneNum.msg }</Form.Text>
                        {/* 타이머 */}
                            <div className={!timerCheck ? 'timerDiv visibility_hidden' : 'timerDiv visibility_visible'}>
                                <Timer timerCheck={timerCheck} resetCertify={resetCertify} reTimerCheck={reTimerCheck} />
                            </div>
                            <input type='hidden' name={'phone_num'} value={form.phone_num}/>
                        </FloatingLabel>
                    </Col>
                {/* 휴대폰번호 인증요청 버튼 */}
                    <Col sm = {4}>
                        <div className={page === 'join' ? (setInfo.phone_auth_num.btnCheck === 2 ? 'd-grid' : 'd-grid join_btns') : (setInfo.phone_auth_num.btnCheck === 2 ? 'd-grid' : (setInfo.phoneNum.isSame ? 'd-grid' :  'd-grid join_btns' )) }>
                            <Button name='phoneBtn' variant={'warning'} size="lg" disabled={page === 'join' ? (setInfo.phone_auth_num.btnCheck === 2 ? true : (setInfo.phoneNum.isCheck ? false : true)) : setInfo.phone_auth_num.btnCheck === 2 ? true : (setInfo.phoneNum.isSame ? true : (setInfo.phoneNum.isCheck ? false : true) ) } 
                            onClick={onClick}>{setInfo.phone_auth_num.btnCheck < 2 ? '인증요청' : '인증완료'}</Button>
                        </div>
                    </Col>
                </Row>
                { timerCheck && 
                (<Row className="align-items-center mb-3">
                    {/*  인증번호 input창 */}
                    <Col sm={8}>
                        <FloatingLabel controlId="certifyNum" label="인증번호 확인">
                            <Form.Control type="text" name="phone_auth_num" className={setInfo.phone_auth_num.btnCheck === 1 ? 'is-invalid' : ''} value={form.phone_auth_num} onChange={onChangeNum} disabled={setInfo.phone_auth_num.btnCheck === 2} maxLength={'6'} />
                            {setInfo.phoneNum.btnCheck === 2 && (
                                <Form.Text id="managerPhoneNumberHelpBlock" className={(setInfo.phone_auth_num.btnCheck === 1 && ('error_text'))}>{setInfo.phone_auth_num.btnCheck === 0 ? '휴대전화로 전송된 6자리 인증번호 입력' : setInfo.phone_auth_num.msg}</Form.Text>
                            )}
                        </FloatingLabel>
                    </Col>
                    {/* 인증번호 확인 버튼 */}
                    <Col sm={4}>
                        <div className={setInfo.phone_auth_num.btnCheck === 2 ? 'd-grid' : 'd-grid join_btns'}>
                            <Button variant={'warning'} name='certifyBtn' size="lg" disabled={setInfo.phone_auth_num.btnCheck} onClick={onClick}>
                                인증확인
                            </Button>
                        </div>
                    </Col>
                </Row>)}
                {page === 'join' && (
                    <Row className="align-items-center mb-3">
                        <Col sm = {12}>
                            {/* 개인정보/기업정보 약관동의 checkbox */}
                            {type === 2 ? <JoinCheck value={type} getDataCheckbox1={highFunction1} />
                            :
                            <JoinCheck value={type} getDataCheckbox1={highFunction1} getDataCheckbox2={highFunction2} />}
                        </Col>
                     </Row>
                )}
                <Row className="justify-content-md-center mb-3">
                    <Col xs lg="5">
                        <div className="d-grid">
                            {page === 'join' 
                            ? <Button type="submit" onClick={onSubmit} variant="primary" size="lg" disabled={!setInfo.name.isCheck || setInfo.email.btnCheck < 2 || setInfo.phoneNum.btnCheck < 2 ? true : false}>회원가입</Button> 
                            :  <Button type="submit" onClick={onSubmit} variant="primary" size="lg" disabled={(setInfo.name.isSame && setInfo.phoneNum.isSame && setInfo.businessNum && setInfo.opening_day.isSame ) && true }>수정</Button>} 
                        </div>
                    </Col>
                    <Col md="auto" />
                    <Col xs lg="5">
                        <div className="d-grid">    
                            <Button variant="secondary" size="lg" onClick={closeOnClick}>취소</Button>
                        </div>
                    </Col>
                </Row>
            </Container>            
        </Col>
        {/* <Col xs lg="1" /> */}
        </Row>
    );
}

export default AuthCommonForm;