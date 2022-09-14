import React from "react";
import { Modal, Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import ImagesUpload from "./imagesUpload";
import Calender from "../common/\bcalendar";
/**
 * 
 * 객실 등록 수정 모달
 * developer : 이준표
 * type : 0 - 등록 1- 수정
 * 
 * 
 */

const RoomForm = ({type, roomModalOpen, closeOnClick}) => {
    const ul_style = {
        listStyle: 'none',
        padding : 0
    }
    const price_style = {
        textAlign : 'right'
    }
    const div_style = {
        textAlign : 'center'
    }
    const text_style = {
        fontSize: '0.8rem'
    }
    return(
        <Modal size="lg"  show={roomModalOpen} onHide={closeOnClick} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered>
            <Container fluid="xxl">
            <Row className="justify-content-md-center">
            {/* <Col xs lg="1" /> */}
                <Col lg="12">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            객실 {type === '0' ? '등록' : '수정'}
                        </Modal.Title>
                    </Modal.Header>
                </Col>
            {/* <Col xs lg="1" /> */}
            </Row>
            <Row className="justify-content-md-center">
                <Container fluid="xxl">
                    <Row className="align-items-center mb-3">
                        <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>객실 명</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="ex> 스탠다드룸" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                        </Col>
                        <Col sm={1} />
                        <Col sm={4}>
                            <div className="md-3" style={div_style}>
                            <Form.Label>객실 기준인원/최대인원</Form.Label>
                            <ul style={ul_style}>
                                <li>기준<Button variant="light">-</Button>&nbsp;<b>1</b>&nbsp;<Button variant="light">+</Button></li>
                                <li>최대<Button variant="light">-</Button>&nbsp;<b>2</b>&nbsp;<Button variant="light">+</Button></li>
                            </ul>
                            </div>
                        </Col>
                        <Col sm={1} />
                    </Row>
                    <Row className="justify-content-md-center mb-3">
                        <Col sm={6}>
                            <div className="md-3">
                                <Form.Label>체크인/체크아웃 시간</Form.Label>
                                <ul style={ul_style}>
                                    <li>체크인&nbsp; : &nbsp;&nbsp;&nbsp;<Button variant="light">-</Button>&nbsp;<b>15:00</b>&nbsp;<Button variant="light">+</Button></li>
                                    <li>체크아웃 : &nbsp;<Button variant="light">-</Button>&nbsp;<b>12:00</b>&nbsp;<Button variant="light">+</Button></li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={1} />
                        <Col sm={4}>
                            <div className="md-3" style={div_style}>
                                <Form.Label>베드 수</Form.Label>
                                <ul style={ul_style}>
                                    <li>싱글 베드 : <Button variant="light">-</Button>&nbsp;<b>0</b>&nbsp;<Button variant="light">+</Button></li>
                                    <li>더블 베드 : <Button variant="light">-</Button>&nbsp;<b>0</b>&nbsp;<Button variant="light">+</Button></li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={1} />
                    </Row>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="md-3">
                                <Form.Label>비성수기 가격</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>주중(일 ~ 목) 가격 :</InputGroup.Text>
                                    <Form.Control style={price_style} />
                                    <InputGroup.Text>원</InputGroup.Text>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>주말(금 ~ 토) 가격 : </InputGroup.Text>
                                    <Form.Control style={price_style} />
                                    <InputGroup.Text>원</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="md-3">
                                <Form.Label>성수기 가격</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>주중(일 ~ 목) 가격 :</InputGroup.Text>
                                    <Form.Control style={price_style} />
                                    <InputGroup.Text>원</InputGroup.Text>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>주말(금 ~ 토) 가격 : </InputGroup.Text>
                                    <Form.Control style={price_style} />
                                    <InputGroup.Text>원</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center mb-3">
                        <Col sm={12} style={text_style}>
                        <Form.Check id="priceCheck" label="공휴일은 성수기 주말과 동일한 가격으로 적용(미체크시 공휴일은 비성수기 주말과 동일한 가격으로 적용됩니다.)"/>
                        </Col>
                    </Row>
                    <Row className="align-items-center mb-3">
                    <Col sm={12}>
                        <div className="md-3">
                            <Form.Label>태그</Form.Label>
                            <div>
                                <Form.Check inline id="tag1" label="조식"/>
                                <Form.Check inline id="tag2" label="시티뷰"/>
                                <Form.Check inline id="tag3" label="오션뷰"/>
                                <Form.Check inline id="tag4" label="욕조"/>
                                <Form.Check inline id="tag5" label="무료 와이파이"/>
                            </div>
                            <div>
                                <Form.Check inline id="tag6" label="금연시설"/>
                                <Form.Check inline id="tag7" label="스파"/>
                                <Form.Check inline id="tag8" label="얼리체크인"/>
                                <Form.Check inline id="tag9" label="레이트체크인"/>
                                <Form.Check inline id="tag10" label="외부음식가능"/>
                            </div>
                        </div>
                    </Col>
                    </Row>
                    <Row className="align-items-center mb-3">
                        <Col sm={12}>
                            {/* 호텔 이미지 업로드 컴포넌트 */}
                            <ImagesUpload maxImagesNum={5}/>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <Form.Label>호수명</Form.Label>
                        </Col>
                    </Row>
                    <Row className="align-items-center mb-3">
                        <Col sm={3}>
                            <Form.Control size="lg" type="text" label='호수명' style={text_style}  placeholder="ex> 101호" />
                        </Col>
                        <Col sm={2} style={text_style}>
                            <Form.Check inline id="roomCheck" label="객실이용불가"/>
                        </Col>
                        <Col sm={7} style={{display : "flex"}}>
                            <Calender />
                        </Col>
                        
                    </Row>
                    <Row className="align-items-center mb-3">
                        <Col sm={3}>
                            <div className="d-grid">
                                <Button variant="light">호실추가하기+</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-3">
                        <Col xs lg="5">
                            <div className="d-grid">
                                <Button size="lg">객실 등록</Button>
                            </div>
                        </Col>
                        <Col md="auto" />
                        <Col xs lg="5">
                            <div className="d-grid">
                                <Button size="lg" variant="secondary" onClick={closeOnClick}>닫기</Button>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </Row>
        </Container>
        </Modal>
    );
}

export default RoomForm;