import React, { useEffect } from "react";
import {Container, Button} from 'react-bootstrap';
import "../css/hotelMain.scss";
import MyhotelList from "../../components/hotel/myHotelList"
import { Link } from 'react-router-dom'

import {my_hotel_list} from "../../modules/hotel/hotelMainActions";
import * as hotelMainReducer from '../../modules/hotel/hotelMainReducer';
import { connect, useDispatch } from 'react-redux';

const HotelMain = ({my_hotel_list,hotelList}) => {
     //store에 Data전달을 위해
     const dispatch = useDispatch();
    useEffect(() => {
        my_hotel_list("");
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
    return (
        <>
                <Container>
                    <MyhotelList />
                    <div className="addHotel">
                        <Link to = "/auth/hotel/info?type=registration">
                            <Button variant="outline-primary">호텔 추가 등록</Button> 
                        </Link>
                    </div>   
                </Container>
            
        </>
    );
};

export default connect(
    () =>  ({ hotelMainActions}) => ({
        hotelList: hotelMainActions.hotelList, //나(사업자)의 호텔리스트 조회 상태값
    }),
    {
        my_hotel_list, //나(사업자)의 호텔리스트 조회 액션

    }
)(HotelMain)