import React, { useEffect,useState, useRef } from "react";
import {Container, Button} from 'react-bootstrap';
import "../css/hotelMain.scss";
import MyhotelList from "../../components/hotel/myHotelList"
import { Link } from 'react-router-dom'



const HotelMain = () => {
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

export default HotelMain;