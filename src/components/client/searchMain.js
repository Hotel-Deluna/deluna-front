
import React, { useState, useEffect } from "react";
import {Card,Button,Tabs,Tab} from "react-bootstrap";
import "./css/searchMain.scss"
import testImg from '../../pages/images/test.png';
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";

import {hotel_list,hotel_filter_list} from "../../modules/client/hotelSearchActions";
import {room_code} from "../../modules/hotel/roomDeleteActions";
import * as hotelSearchReducer from "../../modules/client/hotelSearchReducer"

import { connect, useDispatch } from 'react-redux';
const SearchMain = ({hotel_list, hotelList, room_code, roomCode,filterData,hotel_filter_list,hotelFilterList}) => {
    const [list, setList] = useState([]);
    const [roomCodeList, setRoomCodeList] = useState([]);
    const [tags, setTags] = useState([]);
    const [hotelNum, setHotelNum] = useState([])
    const selInfo={
        regionOrName : '신라스테이',
        checkIn:'2022/09/13',
        checkOut : '2022/09/16',
        roomNum : 1,
        guest : 2,
        search_type : 2,
        text : '신라'
    }
    const handleTabs = (key) => {
        dispatch(hotelSearchReducer.filterData({name : 'rank_num',value:key}));
    }
    const dispatch = useDispatch();

    useEffect(() => {
        hotel_list(selInfo);
        room_code();
    },[])

    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                //setList(hotelList.data)
                for(var i = 0; i<hotelList.data.length; i++){
                    hotelNum.push(hotelList.data[i].hotel_num)
                }
                setHotelNum(hotelNum);
                if(hotelNum.length > 0){
                    dispatch(hotelSearchReducer.filterData({name : 'hotel_num',value:hotelNum}));
                }
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[hotel_list,hotelList]);


    useEffect(() => {
        if(roomCode){
            if(roomCode.result === 'OK'){
                setRoomCodeList(roomCode.data)
            }
        }
    },[room_code,roomCode]);

    useEffect(() => {
        if(hotelNum.length > 0){
            hotel_filter_list(filterData)
        }
    },[filterData]);

    useEffect(() => {
        if(hotelFilterList){
            if(hotelFilterList.result === 'OK'){
                console.log(hotelFilterList.data)
                setList(hotelFilterList.data)
            }
        }
    },[hotel_filter_list,hotelFilterList]);

    return (
        <>
        <div id="searchTabs">
            <Tabs
            defaultActiveKey="1"
            variant="tabs"
            id="searchTabs"
            className="mb-3"
            onSelect={(k) => handleTabs(k)}
            >
                <Tab eventKey="1" title="호텔 등급 순" onChange={handleTabs}></Tab>
                <Tab eventKey="2" title="가격 높은 순"></Tab>
                <Tab eventKey="3" title="가격 낮은 순"></Tab>
            </Tabs>
        </div>
        {list.map((item, index) => (
            <Card id="searchMain" key={index}>
            <div className="row no-gutters">
            <div className="col-3">
                <Card.Img variant="top" src={testImg} id="hotelImg"/>
            </div>
            <div className="col-9">
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        <img src={(item.star - 1 >= 0 ? star : noStar)}></img>
                        <img src={(item.star - 2 >= 0 ? star : noStar)}></img>
                        <img src={(item.star - 3 >= 0 ? star : noStar)}></img>
                        <img src={(item.star - 4 >= 0 ? star : noStar)}></img>
                        <img src={(item.star - 5 >= 0 ? star : noStar)}></img>
                    </Card.Text>
                    <Card.Text>
                        {roomCodeList.map((item2, index2) => (
                            item.tags.includes(item2.code) ? (item2.name+',') : null
                        ))}
                    </Card.Text>
                    <Card.Text id="roomSelection">
                        예약가능 {item.minimum_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ~
                        <Button variant="outline-dark">객실 선택</Button>
                    </Card.Text>
                </Card.Body>
            </div>
            
            </div>
            </Card>
        ))} 
        
        </>

        
        
    )
}

export default connect(
    () =>  ({ hotelSearchActions,roomDeleteActions,hotelSearchReducer}) => ({
        hotelList: hotelSearchActions.hotelList,
        roomCode : roomDeleteActions.code,
        hotelFilterList : hotelSearchActions.filterhotelList,

        filterData : hotelSearchReducer.getIn(['FILTER_DATA','form']),
    }),
    {
        hotel_list,
        room_code,
        hotel_filter_list

    }
)(SearchMain);