import React from "react";
import Timer from "./timer";
//import Modal from "react-modal";
import { Container, Row, Col,Form, FloatingLabel, Button, Modal } from "react-bootstrap";

const AuthModifyForm = ({type, form, isModalOpen, closeOnClick, setInfo,onChange, onChangeNum, onClick, onSubmit, certifyToggle}) => {
    return(
        <Modal show={isModalOpen} onHide={closeOnClick} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered>
              <Container className="joinMainCountainer" fluid="xxl">
                <Row className="justify-content-md-center">
                {/* <Col xs lg="1" /> */}
                <Col lg="12">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            회원정보 수정
                        </Modal.Title>
                    </Modal.Header>
                </Col>
                {/* <Col xs lg="1" /> */}
                </Row>
                <Row className="justify-content-md-center" style={{marginTop: '3rem'}}>
                {/* <Col xs lg="1" /> */}
                <Col lg="12">
                    <Container fluid="xxl">
                        <Row className="align-items-center mb-3">
                            <Col sm = {12}>
                                {/* 이메일 input창 */}
                                <FloatingLabel controlId="email" label="이메일 주소">
                                    <Form.Control type="email" name="email" value={form.email} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        {type === '0' 
                        ? <Row className="align-items-center mb-3">
                            {/* 이름 input창 */}
                            <Col sm = {12}>
                                <FloatingLabel controlId="Name" label="성명">
                                    <Form.Control type="text" name="name" value={form.name}  maxLength={17} onChange={onChange} />
                                    <Form.Text >{('한글만 입력')}</Form.Text>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        : (<>
                        <Row className="align-items-center mb-3">
                            <Col sm={6}>
                                <FloatingLabel controlId="Name" label="사업주명">
                                    <Form.Control type="text" name="name" value={form.name} maxLength={17} onChange={onChange} />
                                    <Form.Text id="Name">{('한글만 입력')}</Form.Text>
                                </FloatingLabel>
                            </Col>
                            <Col sm={6}>
                                <FloatingLabel controlId="openDay" label="등록일자">
                                    <Form.Control type="date" name="openDay" value={form.opening_day} onChange={onChange} />
                                    <Form.Text id="openDay">{('사업자 등록일자')}</Form.Text>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        </>)}
                        {type === '1' && (
                            <Row className="align-items-center mb-3">
                                <Col sm={8}>
                                    <FloatingLabel controlId="businessNum" label="사업자등록번호">
                                        <Form.Control type="text" name="businessNum" value={setInfo.businessNum.value} onChange={onChangeNum} />
                                        <Form.Text id="businessNum">{('하이픈(-)제외 숫자만 10자리 입력')}</Form.Text>
                                        <input type='hidden' name='business_num' value={form.business_num}/>
                                    </FloatingLabel>
                                </Col>
                            <Col sm={4}>
                                <div className="d-grid">
                                    <Button name='businessBtn' variant={setInfo.name.isCheck ? 'info' : 'outline-info'} onClick={onClick} size="md" disabled>
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
                                    <Form.Control type="text" name="phoneNum" onChange={onChangeNum} value={setInfo.phoneNum.value} disabled />
                                    {setInfo.phone_auth_num.btnCheck < 2 && (
                                    <Form.Text id="managerPhoneNumberHelpBlock" className={'border_text' }>{setInfo.phoneNum.value !== '' ? '' : ('하이픈(-) 제외 숫자만 11~12자리 입력')}</Form.Text>
                                    )}
                                {/* 타이머 */}
                                        <Timer timerCheck={false} />
                                    <input type='hidden' name={'phone_num'} value={form.phone_num}/>
                                </FloatingLabel>
                            </Col>
                        {/* 휴대폰번호 인증요청 버튼 */}
                            <Col sm = {4}>
                                <div className={'d-grid join_btns'}>
                                    <Button name='phoneBtn' variant={'outline-warning'} size="lg" disabled onClick={onClick}>
                                    {setInfo.phone_auth_num.btnCheck < 2 ? '인증요청' : '인증완료'}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {certifyToggle && 
                        (<Row className="align-items-center mb-3">
                            {/*  인증번호 input창 */}
                            <Col sm={8}>
                                <FloatingLabel controlId="certifyNum" label="인증번호 확인">
                                    <Form.Control type="text" name="phone_auth_num" className={setInfo.phone_auth_num.btnCheck === 2 ? 'is-invalid' : ''} value={form.phone_auth_num} onChange={onChange} disabled maxLength={'6'} />
                                    {setInfo.phone_num.isCheck < 2 && (
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
                        <Row className="justify-content-md-center mb-3">
                            <Col xs lg="5">
                                <form onSubmit={onSubmit}>
                                    <div className="d-grid">
                                        {/* <input type='hidden' name='eamil' value={form.email} />
                                        <input type='hidden' name='phone_auth_num' value={form.phone_auth_num} />
                                        <input type='hidden' name='name' value={form.name} />
                                        <input type='hidden' name='password' value={form.password} />
                                        <input type='hidden' name='opening_day' value={form.opening_day} />
                                        <input type='hidden' name='phone_num' value={form.phone_num} /> */}
                                        <Button type="submit" variant="primary" size="lg" onSubmit={onSubmit} disabled>수정</Button>
                                    </div>
                                </form>
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
            </Container>
        </Modal>
    );
}

export default AuthModifyForm;