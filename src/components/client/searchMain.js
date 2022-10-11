/*global kakao */
import React, { useState, useEffect,useMemo,useRef } from "react";
import {Card,Button,Tabs,Tab} from "react-bootstrap";

//css 파일
import "./css/searchMain.scss";
//img 파일
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";
import noImage from "../common/noImage.png";
//API 호출 actions
import {hotel_list,hotel_filter_list} from "../../modules/client/hotelSearchActions";
import {hotel_code} from "../../modules/hotel/hotelMainActions";
//store 관리
import * as hotelSearchReducer from "../../modules/client/hotelSearchReducer"
import { connect, useDispatch } from 'react-redux';
//카카오맵 지도
import {Map, MapMarker} from "react-kakao-maps-sdk";
//리액트 아이콘
import {AiOutlineCloseCircle}  from 'react-icons/ai';
//페이지 이동
import { useNavigate } from 'react-router-dom';

//페이징 라이브러리
import { useInView } from 'react-intersection-observer';
const SearchMain = ({hotel_list, hotelList, hotel_code, hotelCode,filterData,hotel_filter_list,
    hotelFilterList,kakaoMap,hederData}) => {
    
    //조회된 리스트 값
    const [list, setList] = useState([]);
    //호텔태그 (공통) 키, 벨류 값
    const [hotelCodeList, setHotelCodeList] = useState([]);
    
    //kakaoMap 중심좌표, 확대레벨 재설정을 위해 (이유 : 호텔이 여러개이기 때문에)
    const mapRef = useRef();
    const [isOpen, setIsOpen] = useState(false)
    const [rendering, setRendering] = useState(false)

    const dispatch = useDispatch();

    //페이지 이동
    const navigate = useNavigate();

    //tab메뉴 클릭시
    const handleTabs = (key) => {
        dispatch(hotelSearchReducer.filterData({name : 'rank_num',value:key}));
        dispatch(hotelSearchReducer.filterData({name : 'page',value:1}));
    }
    //지도로 보기 누를 시
    const kakaoSearchClick = () => {
        dispatch(hotelSearchReducer.kakaoMap({click : false}));
    }
    
    //페이징 처리를 위한 데이터
    const [ref, inView] = useInView();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    //객실 선택시 호텔 상세 페이지 이동
    const roomClick = (index) => {
        navigate("/info?hotelNum="+list[index].hotel_num)
    }

    //헤더필터 값이 변할 경우 다시 재조회
    useEffect(() => {
        if(sessionStorage.getItem('headerData') !== null){
            console.log(JSON.parse(sessionStorage.getItem('headerData')))
            setRendering(true)
            hotel_list(JSON.parse(sessionStorage.getItem('headerData')));
            hotel_code();
            setPage(1);
            setList([]);
        }
    },[hederData])

    useEffect(() => {
        if(hotelList && rendering){
            if(hotelList.result === 'OK'){
                dispatch(hotelSearchReducer.filterData({name : 'hotel_num',value:hotelList.hotel_num_list}));
                dispatch(hotelSearchReducer.filterData({name : 'page',value:page}));
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
                navigate("/")
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
        if(filterData.hotel_num.length > 0) {
            if(filterData.page === 1){
                setPage(1);
                setList([]);
            }
            hotel_filter_list(filterData)
        }
    },[filterData,kakaoMap]);

    useEffect(() => {
        if(hotelFilterList && rendering){
            if(hotelFilterList.result === 'OK'){
                if(hotelFilterList.data.length > 0){
                    setPage((page) => page+1);
                    hotelFilterList.data.map((array) => list.push(array));
                    setList(list);
                    setLoading(true)
                }else{
                    setLoading(false)
                }
            }
        }
    },[hotel_filter_list,hotelFilterList]);

    useEffect(() => {
        //더이상 데이터가 없을 시
        if (!inView || kakaoMap) {
          return;
        }else{ //데이터가 있을시 리스트 조회
            if(loading && page > 1){
                dispatch(hotelSearchReducer.filterData({name : 'page',value:page}));
            }
        }
      }, [inView]);

    useEffect(() => {
        if(list.length > 0){
            const map = mapRef.current;
            if (map) map.setBounds(bounds)
        }
    },[page])
    
    //좌표 array를 가지고 마커가 모두 보이게 재설정 하는 부분
    const bounds = useMemo(() => {
            const bounds = new kakao.maps.LatLngBounds();
            list.forEach(point => {
                bounds.extend(new kakao.maps.LatLng(point.location[1], point.location[0]))
            });
            return bounds;
            
    }, [page]);

    const [customOverlayPoint,setCustomOverlayPoint] = useState();
    const [pointIndex, setPointIndex] = useState();
    const customPoint = (marker,index) => {
        setCustomOverlayPoint({
            lat : marker.Ma,
            lng : marker.La
        });
        setIsOpen(true);
        setPointIndex(index)
    }
    
      
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
                        style={{border: '1px solid red'}}
                        onClick={(marker) => customPoint(marker.getPosition(),index)}
                    >
                    {(isOpen && index == pointIndex) &&(
                    <div style={{ maxWidth: "200px", minHeight: "300px"}}>
                        <Card id="searchMain" key={index}
                        style={{
                            marginTop:'0px',
                            border:'none'
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
                                        item.tags ? item.tags.includes(item2.code)  ?  (' ☑'+item2.name) : null : null
                                    ))}
                                    
                                </Card.Text>
                                <Card.Text id="roomSelection">
                                    예약가능 {item.minimum_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ~
                                    <Button variant="outline-dark" onClick={() => roomClick(index)}>객실 선택</Button>
                                </Card.Text>
                            </Card.Body>
                        </div>
                        
                        </div>
                        </Card>
                    </div>
                    )}
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
                                <Button variant="outline-dark" onClick={() => roomClick(index)}>객실 선택</Button>
                            </Card.Text>
                        </Card.Body>
                    </div>
                    
                    </div>
                    </Card>
                ))
                
            : 
                '예약가능한 호텔이 없습니다.'
        }
        <div ref={ref}/>
        
        </>

        
        
    )
}

export default connect(
    () =>  ({ hotelSearchActions,hotelMainActions,hotelSearchReducer}) => ({
        hotelList: hotelSearchActions.hotelList,
        hotelCode : hotelMainActions.code,
        hotelFilterList : hotelSearchActions.filterhotelList,
        hederData : hotelSearchReducer.getIn(['HEADER_DATA','form']),
        filterData : hotelSearchReducer.getIn(['FILTER_DATA','form']),
        kakaoMap : hotelSearchReducer.getIn(['KAKAO_MAP','form','click']),
    }),
    {
        hotel_list,
        hotel_code,
        hotel_filter_list

    }
)(SearchMain);