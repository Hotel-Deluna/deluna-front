import React from "react";
import { Container, Row, Col, Form, InputGroup, Image, FloatingLabel, Button, CloseButton } from "react-bootstrap";
import {AiOutlineCalendar} from "react-icons/ai";
import noRoom from '../common/no_room.png';
import moment from "moment";

const ReservationComponent = (props) => {
    const radiusRow = {
        border: '1px solid #162547',
        borderRadius: '1rem',
        marginLeft : '2rem',
        marginRight : '2rem',
    }
    const mainCards = {
        padding : '1.8rem 2rem 2rem 2rem'
    }
    const roomImageSize = {
        height : '15rem'
    }

    const mainColStyle = {
        paddingLeft : '2.5rem',
        paddingRight : '2.5rem'
    }

    const calendarStyle = {
        backgroundColor : '#fff',
        color: '#000'
    }
    const infoTxtSize = {
        fontSize : '0.9rem'
    }
    const priceSize = {
        fontSize : '1.2rem'
    }
    const rowAlignCenter = {
        textAlign : 'center'
    }
    const btnSize = {
        fontSize : '1.5rem',
        margin: '0.2rem'
    }
    return (
        <Container fluid="xl">
        <Form>
        
        {props.loading &&(
            <>
            <Row className="mb-3" style={{marginTop : '3rem'}}>
                <Col xs={12} sm={12} md={12}><b><h4>객실 예약하기</h4></b></Col>
            </Row>
            <Row md={2}>
                <Col xs={4} sm={4} md={4}>
                    <Form.Group className="mb-3">
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" style={calendarStyle}><AiOutlineCalendar /></InputGroup.Text>
                            <FloatingLabel controlId='checkInDate' label={'체크인 날짜'} >
                                <Form.Control aria-describedby="basic-addon1" style={calendarStyle}  type="text" value={moment(props.list.reservation_start_date).format("YYYY-MM-DD")}  disabled readOnly />
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col xs={4} sm={4} md={4}>
                    <Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2" style={calendarStyle}><AiOutlineCalendar /></InputGroup.Text>
                            <FloatingLabel controlId='checkInDate' label={'체크아웃 날짜'} style={{backgroundColor: '#fff'}}>
                                <Form.Control type="text" aria-describedby="basic-addon2" style={calendarStyle}  value={moment(props.list.reservation_end_date).format("YYYY-MM-DD")} disabled readOnly/>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row  className="mb-1">
                <Col sm={12}>
                    <b><h5>{props.list.hotel_ko_name}({props.list.hotel_en_name})</h5></b>
                </Col>
            </Row>
            {props.reservationList && (
                props.reservationList.map((reservationItem, reservationIdx) => (
                    <Row className="mb-3" style={radiusRow} key={'reservationCard_'+reservationIdx}>
                    <Col xs={12} sm={12} md={12}>
                        {props.reservationInfoList && (
                            props.reservationInfoList.length > 1 &&(
                                <Row>
                                    <Col xs={11} sm={11} md={11}></Col>
                                    <Col xs={1} sm={1} md={1} style={{textAlign: 'right', fontSize : '1rem', paddingTop: '0.2rem'}}>
                                        <CloseButton name={'closeBtn_'+reservationIdx} onClick={props.handleClick} />
                                    </Col>
                                </Row>
                        ))}
                        
                        <Row style={mainCards}>
                            <Col md={6}  style={mainColStyle}>
                        
                                <Row className="mb-2">
                                    {props.reservationInfoList[reservationIdx].image 
                                    ? 
                                    <Image src={props.reservationInfoList[reservationIdx].image} alt={'image_'+reservationIdx} style={roomImageSize} />
                                    : 
                                    <Image src={noRoom} alt={'image_'+reservationIdx} style={roomImageSize} />
                                    }
                                </Row>                                
                            

                                <Row className="mb-2">
                                    <Col style={infoTxtSize}><span>객실명 : <span>{props.reservationInfoList && props.reservationInfoList[reservationIdx].name}</span></span></Col>    
                                </Row>
                                <Row className="mb-2">
                                    <Col style={infoTxtSize}>
                                        <span>
                                            침대갯수 : <span>{props.reservationInfoList && (props.reservationInfoList[reservationIdx].single_bed_count !== 0 && (props.reservationInfoList[0].double_bed_count !== 0 ? '싱글베드 '+props.reservationInfoList[0].single_bed_count+'개, ' : '싱글베드 '+props.reservationInfoList[0].single_bed_count+'개' ))}</span>
                                                    <span>{props.reservationInfoList && (props.reservationInfoList[reservationIdx].double_bed_count !== 0 && ('더블베드 '+props.reservationInfoList[0].double_bed_count+'개'))}</span>
                                        </span>
                                        </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col style={infoTxtSize}><span>체크인 : <span>{props.reservationInfoList && (props.reservationInfoList[reservationIdx].check_in_time)}</span></span>
                                        <span>체크아웃 : <span>{props.reservationInfoList && (props.reservationInfoList[reservationIdx].check_out_time)}</span></span>
                                    </Col>    
                                </Row>
                                <Row className="mb-2">
                                    <Col style={infoTxtSize}>
                                        <span>기준인원 : <span>{props.reservationInfoList && (props.reservationInfoList[reservationIdx].minimum_people)}명 / </span></span>
                                        <span>최대인원 : <span>{props.reservationInfoList && (props.reservationInfoList[reservationIdx].maximum_people)}명 </span></span>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={12} md={12} lg={12} style={infoTxtSize}>
                                        <span>
                                        {props.reservationInfoList && props.reservationInfoList[reservationIdx].tags && (
                                            props.reservationInfoList[reservationIdx].tags.map((tag, tagIdx) => (
                                                tagIdx !== (props.reservationInfoList[reservationIdx].tags.length - 1) ? tag+', ' : tag
                                            ))
                                        )}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} style={mainColStyle} >
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>예약자명</Form.Label>
                                            <Form.Control type="text" placeholder="한글만입력" name={'name_'+reservationIdx} value={reservationItem.reservation_name} onChange={props.handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>예약자 휴대폰번호</Form.Label>
                                            <Form.Control type="text" placeholder="-(하이픈)제외입력" name={'phoneNum_'+reservationIdx} onChange={props.handleChange}
                                            value={reservationItem.reservation_phone && (reservationItem.reservation_phone)}  />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {props.list.role === 3 && (
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>예약자 휴대폰번호 확인</Form.Label>
                                                <Form.Control type="text" placeholder="위 휴대폰번호와 동일하게 입력" name={'phoneConfirm_'+reservationIdx} onChange={props.handleChange}
                                                value={reservationItem.reservation_phone_confirm && (reservationItem.reservation_phone_confirm )}  />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}
                                
                                <Row className="mb-2">
                                    <Col>
                                        <Form.Label>예약인원 수</Form.Label>
                                        <br />
                                        <Button variant="outline-dark" style={{marginRight : '0.8rem'}} name={'people_'+reservationIdx+'_minus'} onClick={props.handleClick}>-</Button>
                                            <span style={{fontSize : '1rem'}}><b>{reservationItem.reservation_people && (reservationItem.reservation_people)}</b></span>
                                        <Button variant="outline-dark" style={{marginLeft : '0.8rem'}} name={'people_'+reservationIdx+'_plus'} onClick={props.handleClick}>+</Button>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col style={priceSize}>
                                        <span><b>금액 : {reservationItem.reservation_price && reservationItem.reservation_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}원</b></span>
                                    </Col>
                                </Row>
                                {props.reservationInfoList && (
                                    props.reservationInfoList.length > 1 &&(
                                        <Row className="mb-2">
                                            <Col>
                                                <Button variant="danger" name={'listDelete_'+reservationIdx} onClick={props.handleClick} style={{borderRadius: '3rem',}}>-</Button> 
                                                <span style={{paddingLeft : '0.5rem'}}>객실 빼기</span>
                                            </Col>
                                        </Row>
                                    )
                                )}
                                
                            </Col>
                        </Row>
                    </Col>
                    </Row>
                ))
            )}
            <Row className="mb-1" style={rowAlignCenter}>
                <Col>
                    <span style={{fontSize : '1.5rem'}}><b>최종 금액 (vat포함) : {props.totalPrice && props.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}원</b></span>
                </Col>
            </Row>
            <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center mb-3">
                <Col xs={4} sm={4} md={4}>
                    <Row>
                        <Col style={{textAlign : 'center'}}>
                            <Button variant="primary" style={btnSize} name='goRegister' disabled={props.btnCheck ? false : true} onClick={props.handleClick}>결제하기</Button>
                            <div className="d-block d-sm-none" style={{paddingLeft : '1rem',paddingRight : '1rem' }} />
                            <Button variant="light" style={btnSize} name='back' onClick={props.handleClick}>취소하기</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
        )}
        </Form>
        </Container>
    );
}

export default ReservationComponent;