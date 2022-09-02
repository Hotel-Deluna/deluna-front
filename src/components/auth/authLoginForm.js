import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./css/authForm.scss";

const AuthLoginForm = ({ type }) => {
    
    return(
        <Container className="loginContainer" fluid="xxl">
            <Row className="align-items-center mb-3">
                
                <Col sm={12}>
                    <Form.Group className="mb-3" size="lg" controlId="formBasicEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                </Col>
                
            </Row>
            <Row className="align-items-center mb-3">
                <Col sm={12}>
                    <Form.Group className="mb-3" size="lg" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                        <Button variant="primary" type="submit">로그인</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthLoginForm;
