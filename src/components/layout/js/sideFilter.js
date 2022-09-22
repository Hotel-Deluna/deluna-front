/* global kakao */
import React, { useState, useEffect } from "react";
import "../css/sideFilter.scss";
import {Map, MapMarker} from "react-kakao-maps-sdk";

import {Button, Form} from 'react-bootstrap';
import {AiFillStar,AiOutlineStar} from 'react-icons/ai';
import star_1_nor from "../imges/star_1_nor.png";
import star_2_nor from "../imges/star_2_nor.png";
import star_3_nor from "../imges/star_3_nor.png";
import star_4_nor from "../imges/star_4_nor.png";
import star_5_nor from "../imges/star_5_nor.png";

import star_1_foc from "../imges/star_1_foc.png";
import star_2_foc from "../imges/star_2_foc.png";
import star_3_foc from "../imges/star_3_foc.png";
import star_4_foc from "../imges/star_4_foc.png";
import star_5_foc from "../imges/star_5_foc.png";

import Sevice from "../../../components/hotel/hotelService";
/* redux 영역 */
import { connect,useDispatch } from "react-redux";
import {hotel_code} from "../../../modules/hotel/hotelMainActions";
import {room_code} from "../../../modules/hotel/roomDeleteActions";
import * as hotelSearchReducer from "../../../modules/client/hotelSearchReducer"
import MultiRangeSlider from "./multiRangeSlider";
function SideFilter({hotel_code, hotelCode,room_code,roomCode}) {
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();

    //호텔등급
    const [star, setStar] = useState();
    //호텔 부가서비스/시설 태그 조회한 API값
    const [hotelTags, setHotelTags] = useState([]);
    //호텔 객실시설 태그 조회한 API값
    const [roomTags, setRoomTags] = useState([]);

    //최대금액
    const [min, setMin] = useState();
    //최소금액
    const [max, setMax] = useState();

    //선택한 호텔태그
    const [hotelTag, setHotelTag] = useState([]);
    //선택한 객실태그
    const [roomTag, setRoomTag] = useState([]);
    const dispatch = useDispatch();

    const handleStar = (val) => {
        if(val === star) {
            setStar('');
            dispatch(hotelSearchReducer.filterData({name : 'star',value:null}));
        }else{
            setStar(val);
            dispatch(hotelSearchReducer.filterData({name : 'star',value:val}));
        }
        
    }

    const handlePrice = (min, max) => {
        setMin(min);
        setMax(max);
    }
    
    const clickPrice = () => {
        dispatch(hotelSearchReducer.filterData({name : 'minimum_price',value:min}));
        dispatch(hotelSearchReducer.filterData({name : 'maximum_price',value:max}));
    }

    const [isChecked, setIsChecked] = useState(false) // 2022.08.29 (한예지) : 체크박스 체크 여부

    /*2022.08.29 (한예지) : 체크박스 선택시 핸들링*/
    const hotelCheckedList = (e) => {
        setIsChecked(!isChecked);
        handleHotelChecked(e.target.value, e.target.checked)
    }

    /*2022.08.28 (한예지) : 체크박스 true, false에 따라 선택된항목 추가 or 삭제*/
    const handleHotelChecked = (val, isChecked) => {
        if(isChecked){
            setHotelTag([...hotelTag, parseInt(val)]);
            dispatch(hotelSearchReducer.filterData({name : 'hotel_tags',value:[...hotelTag, parseInt(val)]}));
        }else if(!isChecked && hotelTag.includes(parseInt(val))){
            setHotelTag(hotelTag.filter((el) => el !== parseInt(val)));
            dispatch(hotelSearchReducer.filterData({name : 'hotel_tags',value:hotelTag.filter((el) => el !== parseInt(val))}));
        }
            
    }
    /*2022.08.29 (한예지) : 체크박스 선택시 핸들링*/
    const roomCheckedList = (e) => {
        setIsChecked(!isChecked);
        handleRoomChecked(e.target.value, e.target.checked)
    }
    const handleRoomChecked = (val, isChecked) => {
        if(isChecked){
            setRoomTag([...roomTag, parseInt(val)]);
            dispatch(hotelSearchReducer.filterData({name : 'room_tags',value:[...roomTag, parseInt(val)]}));
        }else if(!isChecked && roomTag.includes(parseInt(val))){
            setRoomTag(roomTag.filter((el) => el !== parseInt(val)));
            dispatch(hotelSearchReducer.filterData({name : 'room_tags',value:roomTag.filter((el) => el !== parseInt(val))}));
        }
    }
    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()
      }, [map])

    useEffect(() => {
        hotel_code();
        room_code();
    },[])

    useEffect(() => {
        if(hotelCode){
            console.log(1)
            if(hotelCode.result === 'OK'){
                setHotelTags(hotelCode.data)
            }
        }
    },[hotel_code,hotelCode])

    useEffect(() => {
        if(roomCode){
            if(roomCode.result === 'OK'){
                setRoomTags(roomCode.data)
            }
        }
    },[room_code,roomCode])
    return (
            <div className="sideBar">
                <div className = "sideBarBox">
                    <Map // 로드뷰를 표시할 Container
                    center={{
                        lat: 37.566826,
                        lng: 126.9786567,
                    }}
                    style={{
                        width: "100%",
                        height: "70px",
                        pointerEvents:"none"
                    }}
                    level={3}
                    onCreate={setMap}
                    >
                        <Button variant="secondary" id="kakaoSearch">지도로 이동</Button>
                    </Map>
                </div>

                <div className="sideBarBox" id="star">
                    <p>호텔등급</p>
                    <img src={(star === 1 ? star_1_foc : star_1_nor)} onClick={()=>handleStar(1)}/>
                    <img src={(star === 2 ? star_2_foc : star_2_nor)} onClick={()=>handleStar(2)} />
                    <img src={(star === 3 ? star_3_foc : star_3_nor)} onClick={()=>handleStar(3)}/>
                    <img src={(star === 4 ? star_4_foc : star_4_nor)} onClick={()=>handleStar(4)}/>
                    <img src={(star === 5 ? star_5_foc : star_5_nor)} onClick={()=>handleStar(5)}/>
                </div>
                <div className="sideBarBox">
                    <p>부가시설/서비스</p>
                    {hotelTags.map((item, index) => (
                        <Form.Check
                        inline
                        key={index}
                        label={item.name}
                        value={item.code}
                        name="hotelServic1e"
                        type='checkbox'
                        onChange={hotelCheckedList}
                        />
                        
                    ))}
                </div>
                <div className="sideBarBox">
                    <p>객실시설</p>
                    {roomTags.map((item, index) => (
                        <Form.Check
                        inline
                        key={index}
                        label={item.name}
                        value={item.code}
                        name="hotelServic1e"
                        type='checkbox'
                        onChange={roomCheckedList}
                        />
                        
                    ))}
                </div>
                <div className="sideBarBox">
                    <p>가격 <Button onClick={() => clickPrice()}>가격적용</Button></p>
                    <MultiRangeSlider
                    min={0}
                    max={1000000}
                    onChange={({ min, max }) => {handlePrice(min, max)}}/>
                    
                </div>
            </div>
    )
}

export default connect(
    () =>  ({ hotelMainActions,hotelSearchReducer,roomDeleteActions}) => ({
        hotelCode : hotelMainActions.code,
        roomCode : roomDeleteActions.code

    }),
    {
        hotel_code,
        room_code

    }
)(SideFilter);