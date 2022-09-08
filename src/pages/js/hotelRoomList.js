/*global kakao*/
import React, { useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {my_hotel_list, hotel_code} from "../../modules/hotel/hotelMainActions";
import * as hotelMainReducer from '../../modules/hotel/hotelMainReducer';
import { connect, useDispatch } from 'react-redux';
import "../../components/hotel/css/hotelRoomList.scss"
//객실 간편 관리
import EsayRoomManage from "../../components/hotel/esayRoomManage";
const HotelRoomList = ({my_hotel_list,hotelList, hotel_code, hotelCode}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        my_hotel_list("");
        hotel_code();
    },[])
    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                dispatch(hotelMainReducer.selectHotelList({ data : hotelList.data}));
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[my_hotel_list,hotelList])

    useEffect(() => {
        console.log(hotelCode)
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                dispatch(hotelMainReducer.selectHotelCode({ data : hotelCode.data}));
            }
        }
    },[hotel_code,hotelCode])
    return (
        <>
        <Container className="roomListContainer">
            <EsayRoomManage />
        </Container>
        </>
    );
};

export default connect(
    () =>  ({ hotelMainActions}) => ({
        hotelList: hotelMainActions.hotelList, //나(사업자)의 호텔리스트 조회 상태값
        hotelCode : hotelMainActions.code
    }),
    {
        my_hotel_list, //나(사업자)의 호텔리스트 조회 액션
        hotel_code

    }
)(HotelRoomList)