/*global kakao*/
import React, { useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';

import "../../components/hotel/css/hotelRoomList.scss"
//객실 간편 관리
import EsayRoomManage from "../../components/hotel/esayRoomManage";
const HotelRoomList = () => {
    return (
        <>
        <Container className="roomListContainer">
            <EsayRoomManage />
        </Container>
        </>
    );
};

export default HotelRoomList;