import React, { useState, useEffect, useCallback } from "react";

import {Table, Container, Button} from 'react-bootstrap';
import "../css/hotelMain.scss";
import axios from "axios";

import testImg from '../images/test.png';
import { Link } from 'react-router-dom'
const HotelMain = () => {
    const [hotelList, setHotelList] = useState([]);
    
    useEffect(()=>{
            axios.post('http://43.200.222.222:8080/hotel/owner-hotel-list',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : '1234',
                }
            }).then((res)=>{
                if(res.data.result === 'OK'){
                    setHotelList(res.data.data)
                }
                //testData = res.data.data
            })
        
        
    },[])
    return (
        <>
                <Container>
                <div className="containerTitle">나의 호텔 리스트</div>
                <Table bordered>
                    <thead className="table-blue">
                        <tr>
                            <th>호텔명</th>
                            <th>호텔주소</th>
                            <th>호텔 전화번호</th>
                            <th>호텔이미지</th>
                            <th>호텔 정보수정</th>
                            <th>객실관리</th>
                            <th>예약리스트</th>
                            <th>삭제</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {hotelList.map((item, index) => (
                            <tr className="table-light" key={index}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.phone_num}</td>
                                <td><img src={testImg}></img></td>
                                <td>
                                    <Link to = "/auth/hotel/info?type=modfiy">
                                        <Button variant="outline-dark">수정</Button>
                                    </Link>
                                </td>
                                <td><Button variant="outline-dark">조회/변경</Button></td>
                                <td><Button variant="outline-dark">보기</Button></td>
                                <td><Button variant="danger">삭제</Button></td>
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
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