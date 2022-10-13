import React from "react";
import { Container, Row, Col, Form, Nav, Button, } from "react-bootstrap";
import AuthSocialLogin from "./authSocialLogin";


const AuthLoginForm = ({page, handleOnclick, type,form, onChange, onSubmit, onCheck, autoLoginCheck,errCount , firstCheck}) => {
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
    const textSize = {
        fontSize : 'small'
    };
    const textSetting = {
        paddingLeft :'0',
        paddingRight : '0',
        color : '#212529'
    };
    
    const displayInline = {
        paddingLeft: '0.5rem'
    }


    const TextColor = {
        color :  'rgb(255, 255, 255)',
        fontSize : '1rem'
    }

  
    const inputSize = {
        fontSize : '1.5rem'
    }
    const err_text = {
        color : 'red'
    }

    return(
        <>
        {firstCheck && (
            <Container style={FormContainer} fluid="xxl">
                <Row className="align-items-center mb-3">
                    <Col sm={12}>
                        <Form.Group className="mb-3" size="lg" controlId="formBasicEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="text" name="email" onChange={onChange} className={(errCount === 1 || errCount === 3) && 'is-invalid'} placeholder="이메일" style={inputSize} value={form.email === undefined ? '' : form.email} />
                            <Form.Text style={err_text}> {(errCount === 1 || errCount === 3) && ('email 형식(@)으로 작성해주세요.')}</Form.Text>
                        </Form.Group>
                    </Col>

                </Row>
                <Row className="align-items-center mb-3">
                    <Col sm={12}>
                        <Form.Group className="mb-1" size="lg" controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" name="password" className={(errCount === 2 || errCount === 3) && 'is-invalid'} onChange={onChange} placeholder="비밀번호" style={inputSize} value={form.password === undefined ? '' : form.password} />
                            <Form.Text style={err_text}> {(errCount === 2 || errCount === 3) && ('숫자, 영문 대or소문자, 특수문자 포함 8자리 이상 15자리 이하로 입력해주세요.')}</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-1" style={textSize}>
                    <Col sm={3}>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox" style={{ marginTop: '0.3rem' }}>
                            <Form.Check type="checkbox" label="자동로그인" name="autoLoginCheck" onChange={(e) => onCheck(e.target.checked)} checked={autoLoginCheck} />
                        </Form.Group>
                    </Col>
                    <Col sm={9}>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link style={textSetting} href="/auth/findId">아이디찾기</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled" style={textSetting} disabled>&nbsp;|&nbsp;</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={textSetting} href="/auth/findPassword">비밀번호찾기</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row className="align-items-center mb-3">
                    <Col sm={12}>
                        <div className="d-grid">
                            <Button onClick={onSubmit} variant="primary" style={TextColor} size="lg">로그인</Button>
                        </div>
                    </Col>
                </Row>
                <input type="hidden" name="role" value={form.role === undefined ? '' : form.role} />
            {type === '1' &&(
                <>
                    {/* 소셜로그인 컴포넌트 */}
                    <AuthSocialLogin />
                
                </>
                )}
                <Row className="align-items-center mb-3" style={textSize}>
                    <Col sm={12}>
                        <Nav className="justify-content-start">
                            <Nav.Item>
                                <Nav.Link style={textSetting} disabled>회원가입아직 호텔 델루나 회원이 아니세요?</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={displayInline} href="/auth/join">회원가입 &gt;</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                {page === 1
                ? 
                    <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center mb-1" style={textSize}>
                        <Col lg={5}>
                            <div className="d-grid">
                                <Button variant="primary" name='nonMember' onClick={handleOnclick}>비회원으로 예약</Button>
                            </div>
                        </Col>
                        <Col md='auto' style={{ textAlign: 'center' }} />
                        <Col lg={5} >
                            <div className="d-grid">
                                <Button variant="light" name='cancel' onClick={handleOnclick}>취소</Button>
                            </div>
                        </Col>
                    </Row>
                : 
                    <Row className="align-items-center mb-1" style={textSize}>
                        <Col sm={1} />
                        <Col sm={10} style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '0', marginTop: '1rem' }}>로그인함으로써 호텔 델루나의 이용 약관 및 개인정보 처리방침에 동의합니다.</p>
                        </Col>
                        <Col sm={1} />
                    </Row>
                }
            </Container>
        )}
        </>
                
    );
}

export default AuthLoginForm;
