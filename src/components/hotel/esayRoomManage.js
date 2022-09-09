import React, { useEffect, useState } from "react";
import {Row, Col,Button, Table, InputGroup,Form} from 'react-bootstrap';
import { UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import testImg from '../../pages/images/test.png';
import * as hotelMainReducer from "../../modules/hotel/hotelMainReducer";
import {my_hotel_list, hotel_code} from "../../modules/hotel/hotelMainActions";
import { connect, useDispatch } from 'react-redux';
import RoomBatchDelete from "./roomBatchDelete";
import "./css/hotelRoomList.scss"
import star from "./images/star.png";
import noStar from "./images/no_star.png"

//테스트 모달
import RoomIndividualDelete from "./roomIndividualDelete";
const EsayRoomManage = ({my_hotel_list,hotelList, hotel_code, hotelCode,form, code}) => {
    const hotelListValue = form.list;
    const codeList = code.code;
    const [searchValue, setSearchValue] = useState('');
    const [searchCont, setSearchCont] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [hotelNum, setHotelNum] = useState('');

   // const [tagsName, setTagsName] = useState([]);
    const searchValueChange = (e) =>{
        setSearchValue(e.target.value);
    }
    const search = () => {
        setSearchCont(searchCont+1);
    }

    const onSetModalOpen = (open, index, index2) => {
        setHotelNum(hotelListValue[index].room_list[index2].room_num)
        setModalOpen(open)
    }

    //roomBatchDelete.js(자식컴포넌트) 에게 전달받은 modal false : modal창 닫기 위해서
    const getData = (modalOpen) => {
        setModalOpen(modalOpen);
    }
    const dispatch = useDispatch();
    
    //진입 시 모든 리스트가 보여줘야 함
    useEffect(() => {
        my_hotel_list(searchValue);
        hotel_code();
    },[])

    //사업자가 검색버튼 누를 때 리스트 재조회
    useEffect(() => {
        my_hotel_list(searchValue);
    },[searchCont, setSearchCont]);

    //호텔리스트 조회 상태에 따라 dispatch or 예외처리
    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                dispatch(hotelMainReducer.selectHotelList({ data : hotelList.data}));
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[my_hotel_list,hotelList])

    //호텔 부가서비스/시설 공통코드 조회 상태에 따라 dispatch or 예외처리
    useEffect(() => {
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                // for(var i=0; i<hotelCode.data.length; i++){
                //     for(var j=0; j<hotelList.data.length; j++){
                //         if (hotelList.data[j].tags.includes(hotelCode.data[i].code)) tagsName.push(hotelCode.data[i].name);

                //     }
                // }
                dispatch(hotelMainReducer.selectHotelCode({ data : hotelCode.data}));
                /*{codeList.map((item2, index2) => (
                    item.tags.includes(item2.code) ? (item2.name+',') : null
                ))}*/
            }
        }
    },[hotel_code,hotelCode])
    ///item.tags.includes(item2.code)
    return (
        <>
            <Row className="containerTitle">
                <Col>
                    객실 간편관리
                </Col>
            </Row>
            <InputGroup id="hotelSearch" className="mb-3">
            <Form.Control
                placeholder="호텔명 입력"
                onChange={searchValueChange}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={()=>search()}>
                    Search
                </Button>
            </InputGroup>
            {hotelListValue.map((item, index) => (
            <div className="card mb-3" key={index}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                    <img
                        className="bd-placeholder-img"
                        src={testImg}
                    >
                    </img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">
                                <img src={(item.star - 1 >= 0 ? star : noStar)}></img>
                                <img src={(item.star - 2 >= 0 ? star : noStar)}></img>
                                <img src={(item.star - 3 >= 0 ? star : noStar)}></img>
                                <img src={(item.star - 4 >= 0 ? star : noStar)}></img>
                                <img src={(item.star - 5 >= 0 ? star : noStar)}></img>
                            </p>
                            <p className="card-text">
                                <small className="text-muted">총 객실 수 : {item.room_list.length}</small>
                            </p>
                            {/* <span key={index2}>
                                <p className="card-text">
                                <small className="text-muted">
                                부가 서비스 :  {codeList.map((item2, index2) => (
                                    item.tags.includes(item2.code) ? (item2.name+',') : null
                                ))}
                                </small>
                                    item.tags.includes(item2.code) ? (index2 <= item.tags.length-1 ? item2.name+',' : item2.name) : null
                            </p>
                            </span> */}
                            <p className="card-text">
                                <small className="text-muted">
                                부가 서비스 :  {codeList.map((item2, index2) => (
                                    item.tags.includes(item2.code) ? (item2.name+',') : null
                                ))}
                                </small>
                            
                            </p>
                            <Button id="roomAdd" variant="outline-primary" onClick={()=>alert("객실 추가 & 등록 연동")}>
                                    {item.room_list.length > 0 ? '객실추가' : '객실등록'}
                            </Button>{' '}
                            {
                            item.room_list.length > 0 ?
                                <div className="d-flex flex-column">
                                    <Button variant="outline-dark" id="roomList">
                                        객실 조회 
                                    </Button>
                                    <UncontrolledCollapse toggler="#roomList" className="m-0 p-0">
                                        <Card>
                                            <CardBody>
                                                <Table bordered id="esayRoomManageList">
                                                    <thead>
                                                        <tr>
                                                            <th>객실명</th>
                                                            <th>객실수</th>
                                                            <th>비성수기 가격</th>
                                                            <th>성수기 가격</th>
                                                            <th>상태</th>
                                                            <th>수정/삭제</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                        <tbody>
                                                        {item.room_list.map((item2, index2) => (
                                                            index2 < 3 ?
                                                            <tr id="roomListTable" className="table-light" key={index2}>
                                                                <td>{item2.name}</td>
                                                                <td>{item2.reservable_room_count}</td>
                                                                <td>
                                                                    <p>평일 : {item2.weekday_price}</p>
                                                                    <p>주말 : {item2.weekend_price}</p>
                                                                </td>
                                                                <td>
                                                                    <p>평일 : {item2.p_weekday_price}</p>
                                                                    <p>주말 : {item2.p_weekend_price}</p>     
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item2.available_yn ?
                                                                        '예약가능' : 
                                                                        
                                                                        item2.room_closed_start +'~'+item2.room_closed_end+' 예약 불가능' 
                                                                    }
                                                                </td>
                                                                <td id="roomCorrec">
                                                                    <Button variant="outline-dark" onClick={() => alert("수정 연동")}>수정</Button>
                                                                    <Button variant="outline-danger" onClick={() => onSetModalOpen(true,index,index2)}>삭제</Button>
                                                                </td>
                                                            </tr>
                                                            
                                                            :null
                                                        ))}
                                                        </tbody>
                                                </Table>
                                                <div>
                                                {
                                                modalOpen && (
                                                    <RoomBatchDelete room_num={hotelNum} modalOpen={modalOpen} getData={getData}/>
                                                )}
                                                </div>
                                                
                                                <Button id="moreRoom" variant="outline-secondary" onClick={() => alert('객실상세 페이지 이동')}>객실 더보기</Button>
                                                
                                            </CardBody> 
                                        </Card>
                                    </UncontrolledCollapse>
                                </div>
                            :
                            null
                            }
                            
                        </div>
                    </div>
                </div>
            </div>   
            ))}
        </>
    )
};
export default connect(
    () =>  ({ hotelMainActions, hotelMainReducer}) => ({
        hotelList: hotelMainActions.hotelList, //나(사업자)의 호텔리스트 조회 상태값
        hotelCode : hotelMainActions.code,
        form: hotelMainReducer.getIn(['MY_HOTEL_LIST', 'form']),
        code : hotelMainReducer.getIn(['HOTEL_CODE', 'form'])
    }),
    {
        my_hotel_list, //나(사업자)의 호텔리스트 조회 액션
        hotel_code

    }
)(EsayRoomManage);