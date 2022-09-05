
import React, {useState, useEffect, useRef} from "react";
import {Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom'

import HotelRegisForm from "../../components/hotel/hotelRegisForm";
import HotelService from "../../components/hotel/hotelService";
import ImagesUpload from "../../components/hotel/imagesUpload";
import * as hotelInfoActions from '../../modules/hotelInfoReducer';
//axios관리 redux
import {hotel_register, hotel_edit, hotel_info} from "../../modules/hotelInfoActions";

//redux 조회 및 연결
import { useSelector,connect } from 'react-redux';

//날짜 변환
import moment from "moment";

const HotelInfo = ({hotel_register, hotel_edit, hotel_info,register, edit,info}) => {
    //query 값 (registration:등록, modfiy : 수정)
    const [searchParams, setSearchParams] = useSearchParams();

    /* 부모컴포넌트 -> 자식컴포넌트 */
    //최대 이미지 등록 갯수 ( 호텔 : 10, 객실 : 5) ImagesUpload 컴포넌트에 전달
    const [maxImagesNum, setMaxImagesNum] = useState(10);

    const inputValue = useSelector(state => state.hotelInfoReducer.getIn(['REGISTER', 'form'])).toJS();
    const hotelService = useSelector(state => state.hotelInfoReducer.getIn(['HOTEL_SERVICE', 'form']));
    const hotelImage = useSelector(state => state.hotelInfoReducer.getIn(['HOTEL_IMAGE', 'form'])).toJS();

    
    
    const test = () => {
        const frm = new FormData();
        const peak_season = []
        for(var i = 0; i<inputValue.peak_season_list.length; i++){
            if(inputValue.peak_season_list[i].peak_season_start && inputValue.peak_season_list[i].peak_season_end){
                
                peak_season.push({
                    peak_season_start : moment(inputValue.peak_season_list[i].peak_season_start).format("YYYY/MM/DD"),
                    peak_season_end : moment(inputValue.peak_season_list[i].peak_season_end).format("YYYY/MM/DD")
                })
            }
        }
        /* 필수 데이터 */
        frm.append("address",inputValue.address);
        frm.append("eng_name",inputValue.eng_name);
        frm.append("location",inputValue.location);
        frm.append("name",inputValue.ko_name);
        frm.append("phone_num",inputValue.phone_num);
        frm.append("region_1depth_name",inputValue.region_1depth_name);
        frm.append("region_2depth_name",inputValue.region_2depth_name);
        frm.append("info",inputValue.info);
        frm.append("rule",inputValue.rule);
        frm.append("star",inputValue.star);
            

        //성수기 값이 있을 경우에만
        if(peak_season.length > 0){
            //frm.append("peak_season_list",peak_season_list)
            frm.append("peak_season_list[0].peak_season_start",peak_season[0].peak_season_start)
            frm.append("peak_season_list[0].peak_season_end",peak_season[0].peak_season_end)
        }
        //태그 값이 있을 경우에만
        if(hotelService.tags.length > 0){
            frm.append("tags",hotelService.tags)
        }

        //이미지가 있을 경우
        if(hotelImage.imageFile.length > 0){
            for(var i=0; i<hotelImage.imageFile.length; i++){
                frm.append("image",hotelImage.imageFile[i])
            }
            
        }
        hotel_register(frm)
        
    }
    //const number = useSelector(state => state.hotelInfoReducer.getIn(['REGISTER', 'form']));

    
    useEffect(() => {
        if(searchParams.get('type') === 'modfiy'){
            console.log(searchParams.get('type'))
            hotel_info("1234")
            
        }
     }, [searchParams.get('type')]);
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
                                <Button variant="primary" size="sm" onClick={() => test()}>
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
export default connect(
    ({ hotelInfoActions }) => ({
        register: hotelInfoActions.register, //등록
        edit : hotelInfoActions.edit, //수정
        info : hotelInfoActions.info //조회
      }),
      {
        hotel_register,
        hotel_edit,
        hotel_info
    }
)(HotelInfo)