
import React, { useState, useEffect } from "react";
import {Card,Button} from "react-bootstrap";
import "./css/searchMain.scss"
import testImg from '../../pages/images/test.png';
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";

import {hotel_list} from "../../modules/client/hotelSearchActions";
import {room_code} from "../../modules/hotel/roomDeleteActions";
import { connect, useDispatch } from 'react-redux';
const SearchMain = ({hotel_list, hotelList, room_code, roomCode}) => {
    const [list, setList] = useState([]);
    const [roomCodeList, setRoomCodeList] = useState([]);
    const [tags, setTags] = useState([]);
    const selInfo={
        regionOrName : '신라스테이',
        checkIn:'2022/09/13',
        checkOut : '2022/09/16',
        roomNum : 1,
        guest : 2,
        search_type : 2,
        text : '신라'
    }

    useEffect(() => {
        hotel_list(selInfo);
        room_code();
    },[])

    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                setList(hotelList.data)
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[hotel_list,hotelList]);
    useEffect(() => {
        if(roomCode){
            if(roomCode.result === 'OK'){
                setRoomCodeList(roomCode.data)
                //[0],[1] : 1,3,5 
                /*for(var i = 0; i<list.length; i++){
                    for(var j = 0; j<roomCode.data.length; j++){
                        if(list[i].tags.includes(roomCode.data[j].code)){
                            tags.push(roomCode.data[j].name);
                        }
                        
                    }
                }
                setTags(tags)
                console.log(tags)*/
            }
        }
    },[hotel_list,hotelList]);
    return (
        <>
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
                        반려동물, 흡연, 스파, 오션뷰, 마사지, 와이파이
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
    () =>  ({ hotelSearchActions,roomDeleteActions}) => ({
        hotelList: hotelSearchActions.hotelList,
        roomCode : roomDeleteActions.code
    }),
    {
        hotel_list,
        room_code

    }
)(SearchMain);