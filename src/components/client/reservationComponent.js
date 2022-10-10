import React from "react";
import { Container, Row, Col, Form, InputGroup, Image, FloatingLabel } from "react-bootstrap";
import {AiOutlineCalendar} from "react-icons/ai";
const ReservationComponent = (props) => {
    const radiusRow = {
        border: '1px solid #162547',
        borderRadius: '.375rem',
        padding : '3rem 3rem 3rem 3rem'
    }
    const roomImageSize = {

        height : '15rem'
    }

    const mainColStyle = {
        paddingLeft : '5rem',
        paddingRight : '5rem'
    }

    const calendarStyle = {
        backgroundColor : '#fff',
        color: '#000'
    }
    return (
        <Container fluid="xl">
            <Form>
            <Row className="mb-3" style={{marginTop : '3rem'}}>
                <Col xs={12} sm={12} md={12}><b><h4>객실 예약하기</h4></b></Col>
            </Row>
            
            <Row md={2}>
                <Col xs={4} sm={4} md={4}>
                    <Form.Group className="mb-3">
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><AiOutlineCalendar /></InputGroup.Text>
                            <FloatingLabel controlId='checkInDate' label={'체크인 날짜'} >
                                <Form.Control style={calendarStyle}  type="date"  disabled/>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col xs={4} sm={4} md={4}>
                    <Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2"><AiOutlineCalendar /></InputGroup.Text>
                            <FloatingLabel controlId='checkInDate' label={'체크인 날짜'} style={{backgroundColor: '#fff'}}>
                                <Form.Control  type="date"  disabled/>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row  className="mb-3">
                <Col sm={12}>
                    <b><h5>{props.list.hotel_ko_name}({props.list.hotel_en_name})</h5></b>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} sm={12} md={12} style={{paddingLeft:'1.5rem'}}>
                    <Row className="mb-3" style={radiusRow}>
                        <Col xs={6} sm={6} md={6}  style={mainColStyle}>
                            <Row>
                                <Image src={props.list.roomList[0].roomInfo.image[0]} alt='1' style={roomImageSize} />
                            </Row>
                            <Row>
                                
                            </Row>
                        </Col>
                        <Col xs={6} sm={6} md={6} style={mainColStyle} >
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>예약자명</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Form>
        </Container>
    );
}

export default ReservationComponent;