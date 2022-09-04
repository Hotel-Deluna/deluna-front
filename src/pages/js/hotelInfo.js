
import React, {useState,useEffect} from "react";
import {Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom'

import HotelRegisForm from "../../components/hotel/hotelRegisForm";
import HotelService from "../../components/hotel/hotelService";
import ImagesUpload from "../../components/hotel/imagesUpload";


import { useSelector } from 'react-redux'
const HotelInfo = () => {
    //query 값 (registration:등록, modfiy : 수정)
    const [searchParams, setSearchParams] = useSearchParams();

    /* 부모컴포넌트 -> 자식컴포넌트 */
    //최대 이미지 등록 갯수 ( 호텔 : 10, 객실 : 5) ImagesUpload 컴포넌트에 전달
    const [maxImagesNum, setMaxImagesNum] = useState(10);

    const number = useSelector(state => state.hotelInfoReducer.getIn(['REGISTER', 'form','eng_name']));
   
    const test = () => {
        
    }
    //const number = useSelector(state => state.hotelInfoReducer.getIn(['REGISTER', 'form']));

    return (
        <>
            <Container className="containerMain">
                {/* 호텔 정보 입력 컴포넌트*/}
                <HotelRegisForm />
                {/* 호텔 부가서비스/서비스 체크박스 컴포넌트 */}
                <HotelService />
                {/* 호텔 이미지 업로드 컴포넌트 */}
                <ImagesUpload maxImagesNum={maxImagesNum}/>
                <Row className="inputBox">
                    <Col>
                        <div className="finalButton">
                                <Button variant="primary" size="sm" onClick={test}>
                                    { searchParams.get('type') === 'modfiy' ? '수정' : '등록' }
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