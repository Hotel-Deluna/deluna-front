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
import * as hotelSearchReducer from "../../../modules/client/hotelSearchReducer"
import MultiRangeSlider from "./multiRangeSlider";
function SideFilter({hotel_code, hotelCode}) {
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();
    const [star, setStar] = useState();

    const [hotelTags, setHotelTags] = useState([]);

    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const dispatch = useDispatch();

    const handleStar = (val) => {
        if(val === star) setStar('');
        else setStar(val);

        dispatch(hotelSearchReducer.filterData({name : 'star',value:star}));
    }
    const handlePrice = (min, max) => {
        setMin(min);
        setMax(max);
    }
    const clickPrice = () => {
        dispatch(hotelSearchReducer.filterData({name : 'minimum_price',value:min}));
        dispatch(hotelSearchReducer.filterData({name : 'maximum_price',value:max}));
    }
    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()
      }, [map])
    useEffect(() => {
        hotel_code();
    },[])

    useEffect(() => {
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                setHotelTags(hotelCode.data)
                
            }
        }
    },[hotel_code,hotelCode])
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
    () =>  ({ hotelMainActions}) => ({
        hotelCode : hotelMainActions.code
    }),
    {
        hotel_code,

    }
)(SideFilter);