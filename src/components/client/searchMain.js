/*global kakao */
import React, { useState, useEffect,useMemo,useRef } from "react";
import {Card,Button,Tabs,Tab} from "react-bootstrap";
import "./css/searchMain.scss"
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";
import noImage from "../common/noImage.png"
import {hotel_list,hotel_filter_list} from "../../modules/client/hotelSearchActions";
import {hotel_code} from "../../modules/hotel/hotelMainActions";
import * as hotelSearchReducer from "../../modules/client/hotelSearchReducer"
import { connect, useDispatch } from 'react-redux';

import {Map, MapMarker} from "react-kakao-maps-sdk";

import {AiOutlineCloseCircle} from 'react-icons/ai'

const SearchMain = ({hotel_list, hotelList, hotel_code, hotelCode,filterData,hotel_filter_list,
    hotelFilterList,headerData,kakaoMap}) => {
    const [list, setList] = useState([]);
    const [hotelCodeList, setHotelCodeList] = useState([]);
    const [tags, setTags] = useState([]);
    const [hotelNum, setHotelNum] = useState([])

    //kakaoMap 중심좌표, 확대레벨 재설정을 위해 (이유 : 호텔이 여러개이기 때문에)
    const mapRef = useRef();
    // 인포윈도우 Open 여부를 저장하는 state 입니다.
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const handleTabs = (key) => {
        dispatch(hotelSearchReducer.filterData({name : 'rank_num',value:key}));
    }


    const kakaoSearchClick = () => {
        dispatch(hotelSearchReducer.kakaoMap({click : false}));
    }
    

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
    },[filterData,kakaoMap]);

    useEffect(() => {
        if(hotelFilterList){
            if(hotelFilterList.result === 'OK'){
                setList(hotelFilterList.data);
            }
        }
    },[hotel_filter_list,hotelFilterList]);


    useEffect(() => {
        if(list.length > 0){
            const map = mapRef.current;
            if (map) map.setBounds(bounds)
        }
    },[list])
    
    //좌표 array를 가지고 마커가 모두 보이게 재설정 하는 부분
    const bounds = useMemo(() => {
            const bounds = new kakao.maps.LatLngBounds();
            list.forEach(point => {
                bounds.extend(new kakao.maps.LatLng(point.location[1], point.location[0]))
            });
            return bounds;
    }, [list]);

    useEffect(() => {
        if(kakaoMap){
            const overlayInfos = list?.map(info => {
                return {
                    hotel_num : info.hotel_num,
                    name: info.name,
                    lat: info.location[1],
                    lng: info.location[0],
                    image: info.image,
                    star : info.star,
                    minimum_price : info.minimum_price,
                    tags : info.tags
        
                };
            });
        
            overlayInfos.forEach(el => {
                let marker = new kakao.maps.Marker({
                    map: mapRef.current,
                    position: new kakao.maps.LatLng(el.lat, el.lng),
                });
                
                let content = 
                    '<div style="max-width:200px;">'+
                        '<div class="card" id="searchMain" style="margin-top:250px;">'+
                            '<div class="row no-gutters">'+
                                '<div class="col-12">'+
                                    `<img class="card-img-top" src=${el.image ? el.image : noImage} id="hotelImg">`+
                                '</div>'+
                                '<div class="col-12">'+
                                    '<div class="card-body">'+
                                        `<h5 class="card-title">${el.name}</h5>`+
                                        '<p class="card-text">'+
                                            `<img style="width:15px; height:15px;" src=${(el.star - 1 >= 0 ? star : noStar)}>`+
                                            `<img style="width:15px; height:15px;" src=${(el.star - 2 >= 0 ? star : noStar)}>`+
                                            `<img style="width:15px; height:15px;" src=${(el.star - 3 >= 0 ? star : noStar)}>`+
                                            `<img style="width:15px; height:15px;" src=${(el.star - 4 >= 0 ? star : noStar)}>`+
                                            `<img style="width:15px; height:15px;" src=${(el.star - 5 >= 0 ? star : noStar)}>`+
                                        '</p>'+
                                        '<div class="card-text">'+
                                            hotelCodeList.map((item2) => (
                                                el.tags ? el.tags.includes(item2.code) ?  (' ☑'+item2.name) : null : null
                                            )).join('')+
                                        '</div>'+
                                        '<p class="card-text" id="roomSelection">'+
                                            `예약 가능 ${el.minimum_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ~`+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        
                let position = new kakao.maps.LatLng(el.lat, el.lng);

                let customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content
                });
                

                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    customOverlay.setMap(mapRef.current);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    customOverlay.setMap();
                });

                kakao.maps.event.addListener(marker, 'click', function(mouseEvent) {
                    if(!isOpen) {
                        alert("호텔 상세페이지 이동")
                        setIsOpen(true)
                        customOverlay.setMap();

                    }
                });
            });
        }
      }, [list]);
      
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
        {
            kakaoMap ?
            <>
            <Button variant="outline-primary"
            style={{
                marginBottom:'10px',
                fontSize:'0.8rem',
                float : 'left'
            }}
            onClick={kakaoSearchClick}
            >
                리스트로 되돌아가기
            </Button>{' '}
            <Map // 지도를 표시할 Container
                center={{
                    // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "60%",
                }}
                level={3} // 지도의 확대 레벨
                ref={mapRef}
                >
                {list.map((item, index) => (
                    <MapMarker
                        key={index}
                        position={{
                            lat:item.location[1],
                            lng:item.location[0]
                        }} // 마커를 표시할 위치
                        clickable={true}
                        onClick={() => console.log(1)}
                    >
                    {/* {isOpen && (
                    <div style={{ 
                        maxWidth: "200px",

                    
                    }}>
                        <Card id="searchMain" key={index}
                        style={{
                            marginTop:'0px'
                        }}
                        >
                        <div className="row no-gutters">
                        <div style={{textAlign : 'right'}}>
                            <AiOutlineCloseCircle 
                            onClick={() => setIsOpen(false)}
                            style={{cursor: "pointer"}}
                            />
                        </div>
                        <div className="col-12">
                            <Card.Img variant="top" src={item.image ? item.image : noImage} id="hotelImg"/>
                        </div>
                        <div className="col-12">
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
                    </div>
                    )} */}
                    </MapMarker>
                ))}
                </Map>
    </>
            :
            list.length > 0 ? 
                list.map((item, index) => (
                    <Card id="searchMain" key={index}>
                    <div className="row no-gutters">
                    <div className="col-3">
                        <Card.Img variant="top" src={item.image ? item.image : noImage} id="hotelImg"/>
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
                                <Button variant="outline-dark" onClick={() => console.log('리스트 :::: 호텔 상세페이지 이동')}>객실 선택</Button>
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
        kakaoMap : hotelSearchReducer.getIn(['KAKAO_MAP','form','click']),
    }),
    {
        hotel_list,
        hotel_code,
        hotel_filter_list

    }
)(SearchMain);