import React from "react";
import { Container, Row, Col, Form, Nav, Button, Tabs, Tab} from "react-bootstrap";
import googleLogo from '../logos/google_logo.png';
import kakaoLogo from '../logos/kakao_logo.png';
import naverLogo from '../logos/naver_logo.png';
const AuthLoginForm = ({ type,form, onChange, onSubmit, onClick, onCheck, menuChange, autoLoginCheck,errCount}) => {
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
    const minWidths = {
        paddingLeft :'0',
        paddingRight : '0',
        color : '#212529',
        minWidth: 'min-content',
        fontSize: 'small',
        maxWidth: 'fit-content'
    }
    const displayInline = {
        paddingLeft: '0.5rem'
    }
    const simbolSize = {
        width : '1.5rem',
        height : '1.5rem',
        marginRight: '0.5rem'
    }

    const TextColor = {
        color :  'rgb(255, 255, 255)',
        fontSize : '1rem'
    }

    const btnBorder = {
        border: '1px solid rgb(0 0 0 / 20%)',
        color : '#000000',
        fontSize : '1rem'
    }
    const inputSize = {
        fontSize : '1.5rem'
    }
    const err_text = {
        color : 'red'
    }
    return(

        <><Tabs defaultActiveKey='user' onSelect={(e)=> menuChange(type === '1' ? '2' : '1', e)} id="justify-tab-example" justify>
        <Tab eventKey="user" title={'고객 회원가입'}>
        {type === '1' &&(
                <Container style={FormContainer} fluid="xxl">
                <form type="post" onSubmit={onSubmit}>
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
                                <Button type="submit" variant="primary" style={TextColor} size="lg">로그인</Button>
                            </div>
                        </Col>
                    </Row>
                    <input type="hidden" name="role" value={form.role === undefined ? '' : form.role} />
                </form>
                     <Row className="align-items-center mb-3">
                        <Col>
                            <hr />
                        </Col>
                        <Col xs='auto' style={minWidths}>
                            <span>혹은 아래 계정을 이용해 로그인</span>
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row className="align-items-center mb-2">
                        <Col sm={4}>
                            <div className="d-grid">
                                <Button name="kakao" variant="light" style={btnBorder} onClick={onClick}>
                                    <img name="kakao" style={simbolSize} src={kakaoLogo} alt="kakaoLogo" onClick={onClick} />
                                    카카오
                                </Button>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="d-grid">
                                <Button name="google" variant="light" style={btnBorder} onClick={onClick}>
                                    <img name="google" style={simbolSize} src={googleLogo} alt="googleLogo" onClick={onClick} />
                                    구글
                                </Button>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="d-grid">
                                <Button name="naver" variant="light" style={btnBorder} onClick={onClick}>
                                    <img name="naver" style={simbolSize} src={naverLogo} alt="naverLogo" />
                                    네이버
                                </Button>
                            </div>
                        </Col>
                    </Row>
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
                    <Row className="align-items-center mb-1" style={textSize}>
                        <Col sm={1} />
                        <Col sm={10} style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '0', marginTop: '1rem' }}>로그인함으로써 호텔 델루나의 이용 약관 및 개인정보 처리방침에 동의합니다.</p>
                        </Col>
                        <Col sm={1} />
                    </Row>
            </Container>
        )}
        </Tab>
        {/* 사업자 회원가입 */}
        <Tab eventKey="partner" title={'사업자 회원가입'}>
            {type === '2' && (
                <Container style={FormContainer} fluid="xxl">
                <form type="post" onSubmit={onSubmit}>
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
                                <Button type="submit" variant="primary" style={TextColor} size="lg">로그인</Button>
                            </div>
                        </Col>
                    </Row>
                    <input type="hidden" name="role" value={form.role === undefined ? '' : form.role} />
                </form>
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
                    <Row className="align-items-center mb-1" style={textSize}>
                        <Col sm={1} />
                        <Col sm={10} style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '0', marginTop: '1rem' }}>로그인함으로써 호텔 델루나의 이용 약관 및 개인정보 처리방침에 동의합니다.</p>
                        </Col>
                        <Col sm={1} />
                    </Row>
            </Container>
           )}
        </Tab>
    </Tabs>
    </>
    );
}

export default AuthLoginForm;
