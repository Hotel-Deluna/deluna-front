import React from "react";
import { Modal, Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

import Calender from "../common/calendar";
/**
 * 
 * 객실 등록 수정 모달
 * developer : 이준표
 * type : 0 - 등록 1- 수정
 * 
 * 
 */

const RoomForm = (props) => {
    const price_style = {
        textAlign : 'right',
        fontSize: '0.8rem'
    }
    const count_style = {
        display : 'inline-block',
        width : '1.5rem',
        textAlign : 'center'
    }
    const time_style = {
        display : 'inline-block',
        textAlign : 'center',
        width : '3rem'
    }
    const text_style = {
        fontSize: '0.7rem'
    }
    const span_style = {
        display: 'inline-block',
        width: '4rem'
    }
    const sub_text = {
        color : 'red'
    }
    return(
        <>
        <Row className="align-items-center mb-3">
            <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>객실 명 <span className="essential">*필수입력</span></Form.Label>
                <Form.Control size="lg" name={'name'} value={props.form.name} type="text" placeholder="ex> 스탠다드룸" onChange={props.handleChange} />
                <Form.Text className={'text-muted'}>{props.form.name === '' ? '객실명을 입력해주세요.' : (props.nameIsCheck ? <span style={{color: 'red'}}>중복된 이름입니다. 다시 입력해주세요.</span> : '사용가능한 이름입니다.')}</Form.Text>
            </Form.Group>
            </Col>
            <Col sm={1} />
            <Col sm={4}>
                <Form.Label>기준인원/최대인원 <span className="essential">*필수입력</span></Form.Label>
                <Row xs='auto'>
                    <Col>
                        <span>기준: </span><Button variant="light" name={'minPeople_minus'} onClick={props.handleClick}>-</Button>
                        <b style={count_style}>{props.form.minimum_people}</b>
                        <Button name={'minPeople_plus'} variant="light" onClick={props.handleClick}>+</Button>
                    </Col>
                </Row>
                <Row xs='auto'>
                    <Col>
                        <span>최대: </span><Button variant="light" name={'maxPeople_minus'} onClick={props.handleClick}>-</Button>
                        <b style={count_style}>{props.form.maximum_people}</b>
                        <Button name={'maxPeople_plus'} variant="light" onClick={props.handleClick}>+</Button>
                    </Col>
                </Row>
            </Col>
            <Col sm={1} />
        </Row>
        <Row className="justify-content-md-center mb-3">
            <Col sm={6}>
                <Form.Label>체크인/체크아웃 시간 <span className="essential">*필수입력</span></Form.Label>
                <Row xs='auto'>
                    <Col>
                        <span style={span_style}>체크인:</span><Button name={'checkIn_minus'} variant="light" onClick={props.handleClick}>-</Button>
                        <b style={time_style}>{props.form.check_in_time}</b>
                        <Button variant="light" name={'checkIn_plus'} onClick={props.handleClick}>+</Button>
                    </Col>
                </Row>
                <Row xs='auto'>
                    <Col>
                        <span  style={span_style}>체크아웃:</span><Button name={'checkOut_minus'} variant="light" onClick={props.handleClick}>-</Button>
                        <b style={time_style}>{props.form.check_out_time}</b>
                        <Button variant="light" name={'checkOut_plus'} onClick={props.handleClick}>+</Button>
                    </Col>
                </Row>
            </Col>
            <Col sm={1} />
            <Col sm={5}>
                <Form.Label>베드 수 <span className="essential">*필수입력</span></Form.Label>
                <Row xs='auto'>
                    <Col>
                        <span>싱글베드:</span><Button variant="light" name={'singleBed_minus'} onClick={props.handleClick}>-</Button>
                        <b>{props.form.single_bed_count}</b>
                        <Button name={'singleBed_plus'} variant="light" onClick={props.handleClick}>+</Button>
                    </Col>
                </Row>
                <Row xs='auto'>
                    <Col>
                        <span>더블베드:</span><Button variant="light" name={'doubleBed_minus'} onClick={props.handleClick}>-</Button>
                        <b>{props.form.double_bed_count}</b>
                        <Button variant="light" name={'doubleBed_plus'} onClick={props.handleClick}>+</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className="align-items-center">
            <Col sm={6}>
                <div className="md-3">
                    <Form.Label>비성수기 가격 <span className="essential">*필수입력</span></Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={text_style}>주중(일~목)가격 :</InputGroup.Text>
                        <Form.Control type="text" name={'weekday_price'} value={props.form.weekday_price} style={price_style} onChange={props.handleChange} />
                        <InputGroup.Text style={text_style}>원</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={text_style}>주말(금~토)가격 : </InputGroup.Text>
                        <Form.Control type="text" name={'weekend_price'} value={props.form.weekend_price}  style={price_style} onChange={props.handleChange} />
                        <InputGroup.Text style={text_style}>원</InputGroup.Text>
                    </InputGroup>
                </div>
            </Col>
            <Col sm={6}>
                <div className="md-3">
                    <Form.Label>성수기 가격 <span className="essential">*필수입력</span></Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={text_style}>주중(일~목)가격:</InputGroup.Text>
                        <Form.Control type="text" name={'p_weekday_price'} value={props.form.p_weekday_price} style={price_style} onChange={props.handleChange} />
                        <InputGroup.Text style={text_style}>원</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={text_style}>주말(금~토)가격:</InputGroup.Text>
                        <Form.Control type="text" name={'p_weekend_price'} value={props.form.p_weekend_price} style={price_style} onChange={props.handleChange} />
                        <InputGroup.Text style={text_style}>원</InputGroup.Text>
                    </InputGroup>
                </div>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
            <Col sm={12} style={text_style}>
            <Form.Check id="priceCheck" name={'holiday_price_status'} onChange={props.handleCheck} checked={props.form.holiday_price_status === 0 ? false : true} label="공휴일은 성수기 주말과 동일한 가격으로 적용(미체크시 공휴일은 비성수기 주말과 동일한 가격으로 적용됩니다.)"/>
            </Col>
        </Row>
        {props.type === '0' &&(
            <>
            <Row className="align-items-center">
                <Col sm={3}>
                    <Form.Label>호수명<span className="essential">*필수입력</span></Form.Label>
                </Col>
            </Row>
            {props.form.room_detail_list.map((item, index) => (
                <Row className="align-items-center mb-3" key={index}>
                    <Col sm={2}>
                        <Form.Control size="lg" type="text" label='호수명' style={text_style} name={'roomName_'+index} onChange={props.handleChange} value={item.name}  placeholder="ex> 101호" />
                    </Col>
                    <Col sm={2} style={text_style}>
                        <Form.Check inline id="roomCheck" name={'status_'+index} value={item.room_detail_status} onChange={props.handleChange} checked={item.room_detail_status === 0 ? false : true} label="객실이용불가"/>
                    </Col>
                    {item.room_detail_status === 1 ? 
                        <>
                        <Col sm={6}>
                            <Calender startDate={item.room_closed_start} endDate={item.room_closed_end} idx={index} handleCalender={props.handleCalender} />
                        </Col>
                        {props.form.room_detail_list.length > 1 && (
                            <Col sm={2}>
                                <Button variant="danger" name={'room_minus_'+index} onClick={props.handleClick}>호실 삭제</Button>
                            </Col>
                        )}
                        </>
                        :
                        props.form.room_detail_list.length > 1 && (
                            <Col sm={2}>
                                <Button variant="danger" name={'room_minus_'+index} onClick={props.handleClick}>호실 삭제</Button>
                            </Col>
                        )
                    }
                </Row>
            ))}
            {
                props.form.room_detail_list.length < 5 &&(
                <Row className="align-items-center mb-3">
                    <Col sm={3}>
                        <div className="d-grid">
                            <Button variant="outline-dark" name={'room_plus'} onClick={props.handleClick}>호실추가하기+</Button>
                        </div>
                    </Col>
                    <Col sm={9} />
                </Row>
                )
            }
            </>
        )}
        </>
    );
}

export default RoomForm;