import React from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel} from "react-bootstrap";
import JoinCheck from "./joinCheckbox";
import "../css/joinForm.scss";

/**
 * 
 * 고객 회원가입 폼
 * 
 */
const UserJoinForm = () =>{
    return (
        <Container className="joinContainer" fluid="xxl">
            <Row className="g-2 mb-3">
                {/* 이름 input창 */}
                <Col sm = {12}>
                    <FloatingLabel controlId="floatingInputGrid" label="성명">
                    <Form.Control type="name" placeholder="name@example.com" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="align-items-center mb-3">
                {/* 휴대폰번호 input창 */}
                <Col sm = {9}>
                    <FloatingLabel controlId="floatingInputGrid" label="휴대폰번호">
                    <Form.Control type="phoneNumber" placeholder="name@example.com" />
                    <Form.Text id="phoneNumberHelpBlock" muted>12자리입력</Form.Text>
                    </FloatingLabel>
                </Col>
                {/* 휴대폰번호 인증요청 버튼 */}
                <Col sm = {3}>
                    <div className="d-grid join_btns">
                        <Button variant="outline-warning" size="lg" disabled>
                            인증요청
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="align-items-center mb-3">
                {/* 휴대폰번호 인증번호 input창 */}
                <Col sm = {9}>
                    <FloatingLabel controlId="floatingInputGrid" label="인증번호 확인">
                    <Form.Control type="phoneNumber" placeholder="name@example.com" />
                    <Form.Text id="phoneNumberHelpBlock" muted>일치합니다.</Form.Text>
                    </FloatingLabel>
                </Col>
                {/* 인증번호 확인 버튼 */}
                <Col sm = {3}>
                    <div className="d-grid join_btns">
                        <Button variant="warning" size="lg" disabled>
                            인증확인
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="align-items-center mb-3">
                {/* 이메일 input창 */}
                <Col sm = {9}>
                    <FloatingLabel controlId="floatingInputGrid" label="이메일 주소">
                        <Form.Control type="email" placeholder="name@example.com" />
                        <Form.Text id="emailHelpBlock" muted>email 형식으로 작성해주세요.</Form.Text>
                    </FloatingLabel>
                </Col>
                {/* 이메일 중복확인 버튼 */}
                <Col sm = {3}>
                <div className="d-grid join_btns">
                        <Button variant="outline-primary" size="lg" disabled>
                            중복확인
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="g-2 mb-3">
                {/* 비밀번호 input창 */}
                <Col sm = {12}>
                    <FloatingLabel controlId="floatingInputGrid" label="비밀번호">
                    <Form.Control type="password" placeholder="" />
                    <Form.Text id="passwordHelpBlock" muted>숫자, 영문대소문자, 특수문자 포함 8자리 이상 15자리 이하로 입력해주세요.</Form.Text>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="g-2 mb-3">
                {/* 비밀번호확인 input창 */}
                <Col sm = {12}>
                    <FloatingLabel controlId="floatingInputGrid" label="비밀번호확인">
                    <Form.Control type="password" placeholder="" />
                    <Form.Text id="passwordCheckHelpBlock" muted>일치합니다.</Form.Text>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="align-items-center mb-3">
                {/* 개인정보 약관동의 checkbox */}
                <Col sm = {12}>
                    <JoinCheck value="0" />
                </Col>
            </Row>
        </Container>
        
    );
}
export default UserJoinForm;