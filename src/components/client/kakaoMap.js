
import React, { useState, useEffect } from "react";
import {Card,Button,Tabs,Tab} from "react-bootstrap";

import * as hotelSearchReducer from "../../modules/client/hotelSearchReducer"
import { connect, useDispatch } from 'react-redux';
const SearchMain = ({hotel_list, hotelList, hotel_code, hotelCode,filterData,hotel_filter_list,
    hotelFilterList,headerData,kakaoMap}) => {
    const [list, setList] = useState([]);
    const [hotelCodeList, setHotelCodeList] = useState([]);
    const [tags, setTags] = useState([]);
    const [hotelNum, setHotelNum] = useState([])
    const handleTabs = (key) => {
        dispatch(hotelSearchReducer.filterData({name : 'rank_num',value:key}));
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if(sessionStorage.getItem('headerData') !== null){
            hotel_list(JSON.parse(sessionStorage.getItem('headerData')));
            hotel_code();
        }
    },[sessionStorage.getItem('headerData')])

    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                if(hotelList.data.length > 0){
                    for(var i = 0; i<hotelList.data.length; i++){
                        hotelNum.push(hotelList.data[i].hotel_num)
                    }
                    setHotelNum(hotelNum);
                    dispatch(hotelSearchReducer.filterData({name : 'hotel_num',value:hotelNum}));
                }
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[hotel_list,hotelList]);


    useEffect(() => {
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                setHotelCodeList(hotelCode.data)
            }
        }
    },[hotel_code,hotelCode]);

    useEffect(() => {
        if(hotelNum.length > 0){
            hotel_filter_list(filterData)
        }
    },[filterData]);

    useEffect(() => {
        if(hotelFilterList){
            if(hotelFilterList.result === 'OK'){
                setList(hotelFilterList.data)
            }
        }
    },[hotel_filter_list,hotelFilterList]);
    return (
        <>
        {
            !kakaoMap ? '' : '' 
        }
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
        {
            list.length > 0 ? 
                list.map((item, index) => (
                    <Card id="searchMain" key={index}>
                    <div className="row no-gutters">
                    <div className="col-3">
                        <Card.Img variant="top" src={item.image} id="hotelImg"/>
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
                                {hotelCodeList.map((item2, index2) => (
                                   item.tags ? item.tags.includes(item2.code) ?  (' ☑'+item2.name) : null : null
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
                ))
            : 
                '예약가능한 호텔이 없습니다.'
        }
        
        
        </>

        
        
    )
}

export default connect(
    () =>  ({ hotelSearchActions,hotelMainActions,hotelSearchReducer}) => ({
        hotelList: hotelSearchActions.hotelList,
        hotelCode : hotelMainActions.code,
        hotelFilterList : hotelSearchActions.filterhotelList,
        headerData : hotelSearchReducer.getIn(['HEADER_DATA','form']),
        filterData : hotelSearchReducer.getIn(['FILTER_DATA','form']),
    }),
    {
        hotel_list,
        hotel_code,
        hotel_filter_list

    }
)(SearchMain);