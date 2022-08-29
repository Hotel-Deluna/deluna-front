/*global kakao*/
import React, { useRef,useState, useEffect } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Container, Row, Col, InputGroup, Button, Card, CardGroup } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "../css/hotelInfo.scss";

/* 2022.08.28 (한예지) : react 링크이동(페이지이동) */
import { Link } from 'react-router-dom'

//import ReactDragList from "react-drag-list"
//import UploadLogo from "../images/UploadIcon.png";

/* 2022.08.28 (한예지) : daum api 사용을 위한 import */
import DaumPostcode from 'react-daum-postcode';


const HotelInfo = () => {
    const nextId = useRef(1);
    let imgIdx = 0;
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
        if(inputItems.length === 1){ //1개의 input남을 경우 date 초기화
            inputItemsCopy[0].content.peakSeasonStart = ''
            inputItemsCopy[0].content.peakSeasonEnd = ''
            setInputItems(inputItemsCopy)
        }else{ //1개 이상의 input일 경우 삭제
            setInputItems(inputItems.filter(item => item.id !== idx))
        }
    }
    /* 2022.08.28 (한예지) : input value 동적 처리 */
    const inputValueChange = (e, idx, type) => {
        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        if(type === 'start'){ //성수기 시작값
            inputItemsCopy[idx].content.peakSeasonStart = e.target.value
        }else{ //성수기 종료값
            inputItemsCopy[idx].content.peakSeasonEnd = e.target.value
        }
        setInputItems(inputItemsCopy)
    }

    /* 2022.08.28 (한예지) : 이미지 등록 관련*/
    const [showImages, setShowImages] = useState([]);
    
    /* 2022.08.28 (한예지) : 이미지 등록 */
    const handleAddImages = (e) => {
        const imageList = e.target.files;
        let imageUrlList = [...showImages];
        for(let i = 0; i < imageList.length; i++){
            const currentImgeUrl = URL.createObjectURL(imageList[i]);
            imageUrlList.push(currentImgeUrl)
        }

        //10장 이상일 경우 예외처리
        if(imageUrlList.length > 10){
            alert("이미지는 최대 10장까지 등록이 가능합니다.")
            imageUrlList = imageUrlList.slice(0,10);
        }
       
        setShowImages(imageUrlList)
    }

    /* 2022.08.28 (한예지) : 이미지 개별삭제&일괄삭제 관련*/
    const handleDeleteImage = (type,id) => {
        if(type === 'All'){ //일괄삭제
            const showImages = []
            setShowImages(showImages);
        }else{ //개별삭제
            setShowImages(showImages.filter((_, index) => index !== id));
        }
    };
    
    const changeClick = (idx) => {
        imgIdx = idx
    }

    /* 2022.08.29(한예지) : 이미지 변경 */
    const changeImg = (e) => {
        const changeImgeUrl = URL.createObjectURL(e.target.files[0]);
        showImages[imgIdx] = changeImgeUrl;
        setShowImages(showImages.map(index =>
            index === imgIdx ? {...index, changeImgeUrl} : index)
            )
    }

    /* 2022.08.28 (한예지) : 다음 주소 api 사용 */
    const [address, setAddress] = useState(null);
    const handleComplete = (data) => {
        let addr = '';
        if (data.userSelectedType === "R") {
          alert("지번 주소만 선택 가능합니다.")
          click = true
        }else{
            addr = data.jibunAddress
            setAddress(addr)
        }
        
      };
      useEffect(()=>{
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch('경기도 평택시 서정동 879-1', function(result, status) {
            console.log(status)
            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                
                
                
            } 
        });   
        }, [])
      /* 2022.08.28 (한예지) : 주소찾기 버튼에따라 다음 주소창 true, false */
      const [click, setClick] = useState(false);
      const clickFucn = () => {
        setClick(current => !current)
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
                    value = {address}
                    disabled
                    />
                    <Button variant="outline-secondary" id="hotelAddressSearch" onClick={clickFucn}>
                        주소찾기
                    </Button>
                </InputGroup>
                </Col>
            </Row>
            {click &&
                <Row>
                    <Col>
                        <DaumPostcode onComplete={handleComplete}/>
                    </Col>
                </Row>
            }
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
                <Row xs={1} md={5} className="g-4">
                    
                    {showImages.map((image, idx) => (
                        
                        <Col key={idx}>
                            <Card border="dark">
                                <Card.Img variant="top" src={image} />
                            </Card>
                            <Button variant="primary" size="sm">
                            <label for="change-file" onClick={() => changeClick(idx)}>
                                변경하기
                            </label>
                            
                            </Button>
                            <input type="file" id="change-file" style={{display:"none"}}
                            accept=".png, .jpg" onChange={changeImg}
                            />
                            <Button variant="danger" size="sm" onClick={() => handleDeleteImage('Individual',idx)}>삭제하기</Button>{' '}
                        </Col>
                         
                    ))}
                </Row>
                 <div className="buttonGroup">
                    <Button variant="outline-primary" size="sm">
                    <label for="input-file">
                        이미지 업로드
                    </label>
                    </Button>
                    <input type="file" id="input-file" style={{display:"none"}}
                        onChange={handleAddImages} multiple accept=".png, .jpg"
                    />
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteImage('All')}>
                        일괄삭제
                    </Button>
                </div>
                
            </Row>
            <Row className="inputBox">
                <Col>
                    <div className="finalButton">
                            <Button variant="primary" size="sm">
                                등록
                            </Button>
                            {/* 2022.08.28 (한예지) : 취소 누를 시 main 이동 */}
                            <Link to = "/">
                                <Button variant="secondary" size="sm">
                                    취소
                                </Button>
                            </Link>
                    </div>    
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default HotelInfo;