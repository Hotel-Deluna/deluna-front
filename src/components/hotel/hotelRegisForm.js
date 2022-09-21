/*global kakao*/
import React, { useRef,useState,useEffect } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "./css/hotelInfo.scss";

/* 2022.08.28 (한예지) : daum api 사용을 위한 import */
import DaumPostcode from 'react-daum-postcode';

/* redux 영역 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as hotelInfoActions from '../../modules/hotel/hotelInfoReducer';

import { useSearchParams } from 'react-router-dom'

const HotelRegisForm = (props) => {
    //2022.09.04 (한예지) : hotelInfoReducer에 있는 key값
    const { address, eng_name, info, ko_name,peak_season_list, phone_num, rule, star } = props.form.toJS();
    const { HotelInfoActions } = props;
    //주소찾기 버튼
    const [click, setClick] = useState(false); 

    //query 값 (registration:등록, modfiy : 수정)
    const [searchParams, setSearchParams] = useSearchParams();

    /* 2022.09.04 (한예지) : hotelInfoReducer값 updete */
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'ko_name'){
            const regex = /^[가-힣|ㄱ-ㅎ\s]+$/
            if(regex.test(value)){
                HotelInfoActions.changeInput({name:name,value:value,form : 'REGISTER'});
            }else if(!value){
                HotelInfoActions.changeInput({name:name,value:value,form : 'REGISTER'});
            }
        }else if(name === 'eng_name'){
            const regex = /^[a-z|A-Z\s]+$/;
            if(regex.test(value)){
                HotelInfoActions.changeInput({name:name,value:value,form : 'REGISTER'}); 
            }else if(!value){
                HotelInfoActions.changeInput({name:name,value:value,form : 'REGISTER'});
            } 
        }else if(name === 'phone_num'){
            const regex = /^[0-9\b -]{0,12}$/;
            if(regex.test(value)){
                const reValue = value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
                HotelInfoActions.changeInput({name:name,value:reValue,form : 'REGISTER'});
            }
        }else{
            HotelInfoActions.changeInput({name:name,value:value,form : 'REGISTER'});
        }
          
    }

    const clickFucn = () => {
        setClick(current => !current)
    }
    /* 2022.08.28 (한예지) : 다음 주소 api 사용 */
    const handleComplete = (data) => {
        let addr = '';
        if (data.userSelectedType === "R") {
          alert("지번 주소만 선택 가능합니다.")
        }else{
            HotelInfoActions.changeInput({name:"address",value:data.jibunAddress,form : 'REGISTER'}); 
        }
    };
    useEffect(() => {
        if(address) HandleCoord(address);
        return () => {
        }
    }, [address]);
    //2022.08.29 (한예지) : 주소 -> 좌표변환 하는 영역 kakaoMap 사용
    const HandleCoord = (addr) =>{
        // 주소-좌표 변환 객체를 생성
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색
        geocoder.addressSearch(addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                HotelInfoActions.changeInput({name:"location",value:[coords.La,coords.Ma],form : 'REGISTER'});
                HotelInfoActions.changeInput({name:"region_1depth_name",value:result[0].road_address.region_1depth_name,form : 'REGISTER'});
                HotelInfoActions.changeInput({name:"region_2depth_name",value:result[0].road_address.region_2depth_name,form : 'REGISTER'});
            } 
        });    
    };


    /* 2022.08.28 (한예지) : 성수기 추가버튼 누를 시 Input 추가 */
    const addInput = () => {
        const input = {
            id : peak_season_list.length,
            peak_season_start : '',
            peak_season_end : ''
        }
        //setInputItems([...inputItems, input]);
        HotelInfoActions.changeInput({
            name:"peak_season_list",
            value:[...peak_season_list, input],
            form : 'REGISTER'});
    }

    const inputValueChange = (e, idx) => {
        const {name, value} = e.target;
        const inputItemsCopy = JSON.parse(JSON.stringify(peak_season_list));
        if(name === 'peak_season_list.peak_season_start'){
            inputItemsCopy[idx].peak_season_start = value
        }else{
            inputItemsCopy[idx].peak_season_end = value
        }
        HotelInfoActions.changeInput({name:"peak_season_list",value:inputItemsCopy,form : 'REGISTER'});
    }

    /* 2022.08.28 (한예지) : 삭제하기 누를 시 Input 삭제 */
   const deleteInput = (idx) =>{
        const inputItemsCopy = JSON.parse(JSON.stringify(peak_season_list));
        if(peak_season_list.length === 1){ //1개의 input남을 경우 date 초기화
            inputItemsCopy[0].peak_season_start = ''
            inputItemsCopy[0].peak_season_end = ''
            HotelInfoActions.changeInput({name:"peak_season_list",value:inputItemsCopy,form : 'REGISTER'});
        }else{ //1개 이상의 input일 경우 삭제
            HotelInfoActions.changeInput({
                name:"peak_season_list",
                value: peak_season_list.filter(item => item.id !== idx),
                form : 'REGISTER'
            });
        }
        
    }

    const inputRef = useRef([])
    const searchAddrRef = useRef();
    /*const handleInput = () =>{
        let joinBoolean = true;
        for(let i = 0; i<inputRef.current.length; i++){
            if(!inputRef.current[i].value || inputRef.current[i].value === ''){
                
                if(i !== 4){
                    inputRef.current[i].focus();
                }else{
                    searchAddrRef.current.focus()
                }
                joinBoolean = false
                break;
            }
	    }

    }*/
    

    
    return (
        <>
            <Row className="containerTitle">
                <Col>
                    { searchParams.get('type') === 'modfiy' ? '호텔수정' : '호텔등록' }
                </Col>
            </Row>
            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelKoreaName">호텔명(한글)<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="ko_name"
                        placeholder="ex) 신라스테이 서초점"
                        maxLength={30}
                        onChange={handleChange}
                        value={ko_name}
                        ref={el => (inputRef.current[0] = el)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔명(영어)<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="eng_name"
                        placeholder="ex) Shilla Stay Seocho"
                        maxLength={30}
                        onChange={handleChange}
                        value={eng_name}
                        ref={el => (inputRef.current[1] = el)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔등급<span className="essential">*필수선택</span></Form.Label>
                    <Form.Select onChange={handleChange}
                        ref={el => (inputRef.current[2] = el)}
                        name="star" value={star}
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
                        name="phone_num"
                        placeholder="ex)02-123-4567"
                        maxLength={12}
                        onChange={handleChange}
                        value={phone_num}
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
                    name="address"
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
                        onChange={handleChange}
                        value = {info}
                        name="info"
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
                        onChange={handleChange}
                        value={rule}
                        name="rule"
                        ref={el => (inputRef.current[6] = el)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="inputBox">
                <Form.Label htmlFor="hotelPeakSeason">성수기 (시작일, 종료일 모두 입력해주세요.)</Form.Label>
                <Col>
                    {peak_season_list.map((item, index) => (
                        <InputGroup className="mb-3" key={index}>
                            <Form.Control
                                type="date"
                                name="peak_season_list.peak_season_start"
                                id="peak_season_list"
                                value = {item.peak_season_start}
                                onChange={e => inputValueChange(e, index)}
                                
                            />
                            <InputGroup.Text className="inputText">~</InputGroup.Text>
                            <Form.Control
                                type="date"
                                id="peak_season_list"
                                name="peak_season_list.peak_season_end"
                                value = {item.peak_season_end}
                                onChange={e => inputValueChange(e, index)}
                                
                            />
                            <Button variant="danger" onClick={() => deleteInput(item.id)}>삭제하기</Button>{' '}
                        </InputGroup>
                    ))}
                    
                    
                </Col>
                
            </Row>
            <Row className="inputBox">
                <Col>
                    <div className="d-grid gap-2 plus">
                        <Button variant="outline-primary" size="sm" onClick={addInput}>
                            추가하기
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default connect(
    (state) => ({
        form: state.hotelInfoReducer.getIn(['REGISTER', 'form'])
    }),
    (dispatch) => ({
        HotelInfoActions: bindActionCreators(hotelInfoActions, dispatch)
    })
)(HotelRegisForm);