import React, { useRef,useState } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Container, Row, Col, InputGroup, Button } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "../css/hotelInfo.scss";

const HotelInfo = () => {
    const nextId = useRef(1)
    const [inputItems, setInputItems] = useState([
        {
            id : 0,
            content : {
                peakSeasonStart : '',
                peakSeasonEnd : ''
            }
        }
    ])

    /* 2022.08.28 (한예지) : 성수기 추가버튼 누를 시 Input 추가 */
    const addInput = () => {
        const input = {
            id : nextId.current,
            content : {
                peakSeasonStart : '',
                peakSeasonEnd : ''
            }
        }
        setInputItems([...inputItems, input]);
        nextId.current += 1; 
    }

    /* 2022.08.28 (한예지) : 삭제하기 누를 시 Input 삭제 */
    const deleteInput = (idx) =>{
        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        if(inputItems.length === 1){
            inputItemsCopy[0].content.peakSeasonStart = ''
            inputItemsCopy[0].content.peakSeasonEnd = ''
            setInputItems(inputItemsCopy)
            
        }else{
            setInputItems(inputItems.filter(item => item.id !== idx))
        }

        
    }
    /* 2022.08.28 (한예지) : input value 동적 처리 */
    const inputValueChange = (e, idx, type) => {
        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        if(type === 'start'){
            inputItemsCopy[idx].content.peakSeasonStart = e.target.value
        }else{
            inputItemsCopy[idx].content.peakSeasonEnd = e.target.value
        }
        setInputItems(inputItemsCopy)
    }
    
    return (
        <>
        <Container className="containerMain">
            <Row className="containerTitle">
                <Col>
                    호텔등록
                </Col>
            </Row>
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
                <InputGroup className="mb-3">
                    <Form.Control
                    type="text"
                    id="hotelAddress"
                    placeholder="ex) 지번주소만 입력 가능합니다."
                    disabled
                    />
                    <Button variant="outline-secondary" id="hotelAddressSearch">
                        주소찾기
                    </Button>
                </InputGroup>
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
                                id={`service-${type}-1`}
                            />
                            <Form.Check
                                inline
                                label="주차장"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-2`}
                            />
                            <Form.Check
                                inline
                                label="애견동반"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-3`}
                            />
                            <Form.Check
                                inline
                                label="수영장"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-4`}
                            />
                            <Form.Check
                                inline
                                label="헬스장"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-5`}
                            />
                            <Form.Check
                                inline
                                label="룸서비스"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-6`}
                            />
                            <Form.Check
                                inline
                                label="와인바&레스토랑"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-7`}
                            />
                            <Form.Check
                                inline
                                label="뷔페"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-8`}
                            />
                            <Form.Check
                                inline
                                label="커피숍"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-9`}
                            />
                            <Form.Check
                                inline
                                label="스파&사우나"
                                name="hotelService"
                                type={type}
                                id={`service-${type}-10`}
                            />
                        </div>
                    ))}
                </Col>
            </Row>
            <Row className="inputBox">
                <Form.Label htmlFor="hotelPeakSeason">성수기</Form.Label>
                <Col>
                
                    {/* <InputGroup className="mb-3">
                         <Form.Control
                            type="date"
                            id="hotelPeakSeasonEnd"
                        />
                        <InputGroup.Text className="inputText">~</InputGroup.Text>
                        <Form.Control
                            type="date"
                            id="hotelPeakSeasonEnd"
                        />
                        <Button variant="danger">삭제하기</Button>{' '}
                    </InputGroup> */}
                    {inputItems.map((item, index) => (
                        <InputGroup className="mb-3" key={index}>
                            <Form.Control
                                type="date"
                                id="hotelPeakSeasonEnd"
                                value = {item.content.peakSeasonStart}
                                onChange={e => inputValueChange(e, index, 'start')}
                            />
                            <InputGroup.Text className="inputText">~</InputGroup.Text>
                            <Form.Control
                                type="date"
                                id="hotelPeakSeasonEnd"
                                value = {item.content.peakSeasonEnd}
                                onChange={e => inputValueChange(e, index, 'end')}
                            />
                            <Button variant="danger" onClick={() => deleteInput(item.id)}>삭제하기</Button>{' '}
                        </InputGroup>
                    ))}
                    
                    
                </Col>
                
            </Row>
            <Row className="inputBox">
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="outline-primary" size="sm" onClick={addInput}>
                            추가하기
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="inputBox">
                <Form.Label htmlFor="imgInset">호텔 이미지 (최대 10장까지 업로드가 가능합니다.)</Form.Label>
                <Col>
                    <div className="buttonGroup">
                        <Button variant="outline-primary" size="sm">
                            이미지 등록
                        </Button>
                        <Button variant="outline-danger" size="sm">
                            일괄삭제
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default HotelInfo;