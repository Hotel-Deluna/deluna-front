import React from "react";

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../css/hotelRegistration.scss";

const hotelRegistration = () => {
    return (
        <>
        <Container className="containerMain">
            
            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelKoreaName">호텔명(한글)</Form.Label>
                    <Form.Control
                        type="text"
                        id="hotelKoreaName"
                        placeholder="ex) 신라스테이 서초점"
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔명(영어)</Form.Label>
                    <Form.Control
                        type="text"
                        id="hotelEnglishName"
                        placeholder="ex) Shilla Stay Seocho"
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔등급</Form.Label>
                    <Form.Select>
                        <option>호텔 등급을 선택해주세요.</option>
                        <option value="1">1성</option>
                        <option value="2">2성</option>
                        <option value="3">3성</option>
                        <option value="4">4성</option>
                        <option value="5">5성</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelPhoneNumber">호텔 전화번호</Form.Label>
                    <Form.Control
                        type="text"
                        id="hotelPhoneNumber"
                        placeholder="ex)02-123-4567"
                    />
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelAddress">호텔 주소</Form.Label>
                    <Form.Control
                        type="text"
                        id="hotelAddress"
                        placeholder="ex) 지번주소만 입력 가능합니다."
                    />
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Group className="mb-3" controlId="hotelExplanation">
                        <Form.Label>호텔 설명</Form.Label>
                        <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Group className="mb-3" controlId="hotelRule">
                        <Form.Label>호텔 규정</Form.Label>
                        <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                <Form.Label htmlFor="hotelService">부가시설/서비스</Form.Label>
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="24시간 데스크"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-1`}
                        />
                        <Form.Check
                            inline
                            label="주차장"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="애견동반"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        <Form.Check
                            inline
                            label="수영장"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-4`}
                        />
                        <Form.Check
                            inline
                            label="헬스장"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-5`}
                        />
                        <Form.Check
                            inline
                            label="룸서비스"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-6`}
                        />
                        <Form.Check
                            inline
                            label="와인바&레스토랑"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-7`}
                        />
                        <Form.Check
                            inline
                            label="뷔페"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-8`}
                        />
                        <Form.Check
                            inline
                            label="커피숍"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-9`}
                        />
                        <Form.Check
                            inline
                            label="스파&사우나"
                            name="hotelService"
                            type={type}
                            id={`inline-${type}-10`}
                        />
                    </div>
                ))}
                </Col>
            </Row>
            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelPeakSeason">성수기</Form.Label>
                    <Form.Control
                        type="text"
                        id="hotelPeakSeason"
                        placeholder="ex)02-123-4567"
                    />
                </Col>
            </Row>

        </Container>
        </>
    );
};

export default hotelRegistration;