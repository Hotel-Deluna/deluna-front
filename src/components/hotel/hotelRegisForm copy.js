/*global kakao*/
import React, { useRef,useState, useEffect } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "./css/hotelInfo.scss";

/* 2022.08.28 (한예지) : daum api 사용을 위한 import */
import DaumPostcode from 'react-daum-postcode';

import { useDispatch } from "react-redux";
import { hotelRegis } from "../../modules/hotelInfoReducer";

const HotelInfo = (props) => {
    const [hotelKoreaName, setHotelKoreaName] = useState('');     // 호텔명(한글)
    const [hotelEnglishName, setHotelEnglishName] = useState(''); // 호텔명(영문)
    const [selected, setSelected] = useState('');                //호텔등급
    const [phoneValue, setPhoneValue] = useState('');           //호텔전화번호
    const [click, setClick] = useState(false);                  //주소찾기 버튼
    const [address, setAddress] = useState('');                 //주소
    //kakaoMap : 주소 값으로 위도(x),경도(y), 지역 구분정보(region_1depth_name) - 특별시,도 정보, 지역 구분정보(region_2depth_name) - 시,구 정보
    const [addrCoord, setAddrCoord] = useState({x:'', y:'',region_1depth:'',region_2depth:''}) 
    //성수기 
    const [inputItems, setInputItems] = useState([
        {
            id : 0,
            content : {
                peakSeasonStart : '',
                peakSeasonEnd : ''
            }
        }
    ])
    const [explanation, setExplanation] = useState('');    //호텔 설명
    const [rule, setRule] = useState('');                   //호텔규정

    const dispatch = useDispatch();

    const test = () => {
        const _inputData = {
            address: address,
            eng_name: hotelEnglishName,
            image: [],
            info: explanation,
            name: hotelKoreaName,
            peak_season_list: [],
            phone_num: phoneValue,
            rule: rule,
            star: selected,
            tags: []
        }

        dispatch(hotelRegis(_inputData))
    }
    useEffect(() => {
        if(Object.keys(props.value).length !== 0){
            setHotelKoreaName(props.value.name)
            setHotelEnglishName(props.value.eng_name)
            setSelected(props.value.star)
            setPhoneValue(props.value.phone_num)
            setAddress(props.value.address)
            setExplanation(props.value.info)
            setRule(props.value.rule)

            if(props.value.peak_season_list.length > 0){
                for(var i =0; i<props.value.peak_season_list.length; i++){
                    if(i === 0){
                        inputItems[0].content.peakSeasonStart = props.value.peak_season_list[i].peak_season_start.split('T')[0]
                        inputItems[0].content.peakSeasonEnd = props.value.peak_season_list[i].peak_season_end.split('T')[0]
                    }else{
                        inputItems.push({
                            id : i,
                            content : {
                            peakSeasonStart : props.value.peak_season_list[i].peak_season_start.split('T')[0],
                            peakSeasonEnd : props.value.peak_season_list[i].peak_season_end.split('T')[0]
                        }
                            
                        })
                    }
                }
            }
            

        }
    },[props.value])
     /* 2022.08.29 (한예지) : 호텔명 한글 input 정규식 체크 */
     const handleHotelKoreaName = (e) => {
        const regex = /^[가-힣|ㄱ-ㅎ\s]+$/;
        if(regex.test(e.target.value)){
            setHotelKoreaName(e.target.value)
            
        }
    }
    /* 2022.08.29 (한예지) : 호텔명 영문 input 정규식 체크 */
    const handleHotelEnglishName = (e) => {
        const regex = /^[a-z|A-Z\s]+$/;
        if(regex.test(e.target.value)){
            setHotelEnglishName(e.target.value)
        }
    }

    /* 2022.08.29 (한예지) : 호텔등급 seleted */
    const handleChangeSelect = (e) => {
        setSelected(e.target.value);
    }

    /* 2022.08.29 (한예지) : 호텔 전화번호 input 정규식 체크 */
    const handlePhone = (e) => {
        const regex = /^[0-9\b -]{0,12}$/; // 하이픈 포함 최대 12자리
        if(regex.test(e.target.value)){
            setPhoneValue(e.target.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") ); 
        }
    }

    /* 2022.08.28 (한예지) : 주소찾기 버튼에따라 다음 주소창 true, false */
    const clickFucn = () => {
        setClick(current => !current)
    }
    /* 2022.08.28 (한예지) : 다음 주소 api 사용 */
    const handleComplete = (data) => {
        let addr = '';
        if (data.userSelectedType === "R") {
          alert("지번 주소만 선택 가능합니다.")
          setClick(true)
        }else{
            addr = data.jibunAddress
            setClick(false)
            setAddress(addr)
            HandleCoord(addr)
        }
      };
    //2022.08.29 (한예지) : 주소 -> 좌표변환 하는 영역 kakaoMap 사용
    const HandleCoord = (addr) =>{
        // 주소-좌표 변환 객체를 생성
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색
        geocoder.addressSearch(addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                setAddrCoord(
                    {
                        x : coords.La,
                        y : coords.Ma,
                        region_1depth : result[0].road_address.region_1depth_name,
                        region_2depth : result[0].road_address.region_2depth_name
                    }
                )
            } 
        });    
    };

    /* 2022.08.29 (한예지) : 호텔 설명 */
    const handleExplanation = (e) => {
        setExplanation(e.target.value)
    }

    /* 2022.08.29 (한예지) : 호텔 규정 */
    const handleRule = (e) => {
        setRule(e.target.value)
    }

    //성수기 추가 시 다음 indexId
    const nextId = useRef(1);
    /* 2022.08.28 (한예지) : 성수기 추가버튼 누를 시 Input 추가 */
    const addInput = () => {
        const input = {
            id : nextId.current,
            content : {
                peakSeasonStart : undefined,
                peakSeasonEnd : undefined
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
    const inputRef = useRef([])
    const searchAddrRef = useRef();
    
    return (
        <>
            <Row className="containerTitle">
                <Col>
                    호텔등록
                </Col>
            </Row>
            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelKoreaName">호텔명(한글)<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="호텔명 한글"
                        placeholder="ex) 신라스테이 서초점"
                        maxLength={30}
                        onChange={handleHotelKoreaName}
                        value={hotelKoreaName}
                        ref={el => (inputRef.current[0] = el)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔명(영어)<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="호텔명 영어"
                        placeholder="ex) Shilla Stay Seocho"
                        maxLength={30}
                        onChange={handleHotelEnglishName}
                        value={hotelEnglishName}
                        ref={el => (inputRef.current[1] = el)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔등급<span className="essential">*필수선택</span></Form.Label>
                    <Form.Select onChange={handleChangeSelect}
                        ref={el => (inputRef.current[2] = el)}
                        name="호텔둥급" value={selected}
                    >
                        <option value="">호텔 등급을 선택해주세요.</option>
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
                    <Form.Label htmlFor="hotelPhoneNumber">호텔 전화번호<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="호텔 전화번호"
                        placeholder="ex)02-123-4567"
                        maxLength={12}
                        onChange={handlePhone}
                        value={phoneValue}
                        ref={el => (inputRef.current[3] = el)}
                    />
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                <Form.Label htmlFor="hotelAddress">호텔 주소<span className="essential">*필수입력</span></Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                    type="text"
                    name="호텔 주소"
                    placeholder="ex) 지번주소만 입력 가능합니다."
                    value = {address}
                    disabled
                    ref={el => (inputRef.current[4] = el)}
                    />
                    <Button variant="outline-secondary" id="hotelAddressSearch" onClick={clickFucn}
                        ref={searchAddrRef}
                    >
                        주소찾기
                    </Button>
                </InputGroup>
                </Col>
            </Row>
            {
                click ?
                <Row>
                    <Col>
                        <DaumPostcode onComplete={handleComplete}/>
                    </Col>
                </Row>
                : null
            }
            <Row className="inputBox">
                <Col>
                    <Form.Group className="mb-3" controlId="hotelExplanation">
                        <Form.Label>호텔 설명<span className="essential">*필수입력</span></Form.Label>
                        <Form.Control as="textarea" rows={5} maxLength={200}
                        onChange={handleExplanation}
                        value = {explanation}
                        name="호텔 설명"
                        ref={el => (inputRef.current[5] = el)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Group className="mb-3" controlId="hotelRule">
                        <Form.Label>호텔 규정<span className="essential">*필수입력</span></Form.Label>
                        <Form.Control as="textarea" rows={5} maxLength={200}
                        onChange={handleRule}
                        value={rule}
                        name="호텔 규정"
                        ref={el => (inputRef.current[6] = el)}
                        />
                    </Form.Group>
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
            <Row>
                <Col><button onClick={test}>test</button></Col>
            </Row>
        </>
    );
};

export default HotelInfo;