import React, { useEffect, useState } from "react";
import {Form, Button,Row,Col,InputGroup,Card} from "react-bootstrap";
import { BiSearchAlt2, BiBed } from 'react-icons/bi';
import {BsPerson} from 'react-icons/bs';
import {FaHotel} from 'react-icons/fa';
import {AiOutlineClose,AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import {MdOutlineBedroomParent,MdOutlinePersonOutline} from "react-icons/md";
import '../css/headerFilter.scss';
import {search_bar} from "../../../modules/client/hotelSearchActions";
import * as hotelSearchReducer from "../../../modules/client/hotelSearchReducer";
import { connect,useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";
import { type } from "@testing-library/user-event/dist/type";

function HeaderFilter({search_bar,searchList,headerData}) {
    
    const [search, setSearch] = useState(false);
    const [infoList, setInfoList] = useState([]);
    const [searchClickType, setSearchClickType] = useState('');
    const [searchClickValue, setSearchClickValue] = useState('');
    const [roomPers, setRoomPers] = useState(false);
    const [roomCount, setRoomCount] = useState(1);
    const [persCount, setPersCount] = useState(1);
    const now = new Date();
    const [startDate, setStarDate] = useState(moment(now).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment(new Date(now.setDate(now.getDate() + 1))).format("YYYY-MM-DD"));

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchText = (e) => {
        search_bar(e.target.value);
        setSearchClickValue(e.target.value);
        setSearch(true);
    }
    const searchBarClick = (type, val) => {
        setSearchClickType(type);
        setSearchClickValue(val);
        setSearch(false);
    }

    const roomAction = (type) => {
        if(type === 'plus'){
            setRoomCount(roomCount+1);
        }else{
            if(roomCount !== 0){
                setRoomCount(roomCount-1);
                
            }
        }
        //setRoomPersValue('?????? '+roomCount+'???,?????? ' + persCount+'???')
        
    }
    
    const persAction = (type) => {
        if(type === 'plus'){
            setPersCount(persCount+1);
        }else{
            if(persCount !== 0){
                setPersCount(persCount-1);
            }
        }
    }
    const handleStartDate = (e) => {
        setStarDate(e.target.value)
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value)
    }

    const handleSearch = () => {
        if(search){
            alert("???????????? ??????????????????.");
        }else{
            dispatch(hotelSearchReducer.headerData({
                data : {
                    page : 1,
                    people_count : persCount,
                    room_count : roomCount,
                    page_cnt : 5,
                    reservation_start_date : moment(startDate).format("YYYY/MM/DD"),
                    reservation_end_date : moment(endDate).format("YYYY/MM/DD"),
                    search_type : searchClickType,
                    text : searchClickValue
                }
            }));
        }
        
        //????????? ?????? ??????????????? ??????
        if(location.pathname === '/' || location.pathname === '/info'){
            navigate("/search")
        }

        
    }
    useEffect(() => {
        if(searchList){
            if(searchList.result === 'OK'){
                setInfoList(searchList.data)
            }
        }
    },[search_bar,searchList]);

    useEffect(() => {
        if(location.pathname === '/'){
            dispatch(hotelSearchReducer.reset());
            sessionStorage.removeItem('headerData');
        }
    },[]);
    
    useEffect(() => {
        if(sessionStorage.getItem('headerData') !== null){
            dispatch(hotelSearchReducer.headerData({
                data : JSON.parse(sessionStorage.getItem('headerData'))
            }));
            setSearchClickValue(JSON.parse(sessionStorage.getItem('headerData')).text);
            setSearchClickType(JSON.parse(sessionStorage.getItem('headerData')).search_type);
            setStarDate(JSON.parse(sessionStorage.getItem('headerData')).reservation_start_date);
            setEndDate(JSON.parse(sessionStorage.getItem('headerData')).reservation_end_date);
            setPersCount(JSON.parse(sessionStorage.getItem('headerData')).people_count);
            setRoomCount(JSON.parse(sessionStorage.getItem('headerData')).room_count);
            setStarDate(moment(JSON.parse(sessionStorage.getItem('headerData')).reservation_start_date).format("YYYY-MM-DD"));
            setEndDate(moment(JSON.parse(sessionStorage.getItem('headerData')).reservation_end_date).format("YYYY-MM-DD"));
        }
    },[]);
    return (
            <>
            <Row>
                <Col>
                    <div className="searchBox">
                        <Form>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><BiBed/></InputGroup.Text>
                                <Form.Control aria-describedby="basic-addon1" onChange={searchText}
                                onClick={() => setRoomPers(false)}
                                value={searchClickValue} placeholder="????????? ?????? ?????? ??????"
                                />
                                
                                </InputGroup>
                                
                                <InputGroup className="mb-3">
                                    <Form.Control aria-label="FirstDate" type="date"
                                        min={moment(now).format("YYYY-MM-DD")}
                                        value={startDate}
                                        onChange={handleStartDate}
                                        onClick={() => {
                                            setRoomPers(false)
                                            setSearch(false)
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control aria-label="LastDate" type="date"
                                    min={moment(new Date(now.setDate(now.getDate() + 2))).format("YYYY-MM-DD")}
                                    value={endDate}
                                    onChange={handleEndDate}
                                        onClick={() => {
                                            setRoomPers(false)
                                            setSearch(false)
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><BsPerson/></InputGroup.Text>
                                    <Form.Control type="text"
                                    onClick={() => {
                                        setRoomPers(true)
                                        setSearch(false)
                                    }} value={'?????? '+roomCount+'???, ?????? ' + persCount+'???'}
                                    readOnly
                                    />
                                </InputGroup>
                            <InputGroup className="mb-3">
                                <Button variant="warning" disabled={!searchClickValue || !searchClickType} onClick={() => handleSearch()}><BiSearchAlt2 />????????????</Button>
                            </InputGroup>
                        </Form>
                    </div>
                </Col>
            </Row>
            {
                search ?
                (infoList.region_list || infoList.hotel_address_list || infoList.hotel_name_list || infoList.place_list)?
                
                    <Card id="searchTextBox">
                        <Card.Body>
                            <Card.Text onClick={()=>setSearch(false)}>
                                <AiOutlineClose />
                            </Card.Text>
                            
                            {/* ???????????? ???????????? ??????(???,???) ?????????,???????????? ???????????? ?????? ????????? */}
                            {infoList.region_list.map((item, index) => (
                                <Card.Text key={index} onClick={()=> searchBarClick(1,item)}>
                                    <BiSearchAlt2 />{item}
                                </Card.Text>
                            ))}
                            {infoList.place_list.map((item, index) => (
                                <Card.Text key={index} onClick={()=> searchBarClick(4,item)}>
                                    <BiSearchAlt2 />{item}
                                </Card.Text>
                            ))}
                            {/* ???????????? ???????????? ????????? ?????? ?????????,???????????? ???????????? ????????? ????????? */}
                            {infoList.hotel_name_list.map((item, index) => (
                                <Card.Text key={index} onClick={()=> searchBarClick(3,item)}>
                                    <FaHotel />{item}
                                </Card.Text>
                            ))}
                            {infoList.hotel_address_list.map((item, index) => (
                                <Card.Text key={index} onClick={()=> searchBarClick(2,item)}>
                                    <FaHotel />{item}
                                </Card.Text>
                            ))}
                        
                        </Card.Body>
                    </Card>
                :<Card id="searchTextBox">
                <Card.Body><Card.Text>???????????? ???????????? ????????? ????????????.</Card.Text></Card.Body>
                </Card>
                :null
            }
            {
                roomPers ?
                <Card id="roomPersBox">
                    <Card.Body>
                        <Card.Text >
                            <AiOutlineClose onClick={()=>setRoomPers(false)}/>
                        </Card.Text>
                        <Card.Text>
                            <MdOutlineBedroomParent/> ?????? ??? :  <AiOutlineMinusCircle onClick={()=>roomAction('minus')}/> {roomCount} <AiOutlinePlusCircle onClick={()=>roomAction('plus')}/>
                        </Card.Text>
                        <Card.Text>
                            <MdOutlinePersonOutline /> ????????? ??? :  <AiOutlineMinusCircle onClick={()=>persAction('minus')}/> {persCount} <AiOutlinePlusCircle onClick={()=>persAction('plus')}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                :null
            }

                
            </>
            
                 
    )   
}

export default connect(
    () =>  ({ hotelSearchActions,hotelSearchReducer}) => ({
        searchList : hotelSearchActions.searchList,
        headerData : hotelSearchReducer.getIn(['HEADER_DATA','form']),

    }),
    {
        search_bar

    }
)(HeaderFilter);