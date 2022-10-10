import React, { useEffect, useState } from "react";
import {Row, Col,Button, Table, InputGroup,Form} from 'react-bootstrap';
import { UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import * as hotelMainReducer from "../../modules/hotel/hotelMainReducer";
import {my_hotel_list, hotel_code,reset} from "../../modules/hotel/hotelMainActions";
import { connect, useDispatch } from 'react-redux';
import RoomBatchDelete from "./roomBatchDelete";
import "./css/hotelRoomList.scss"
import star from "./images/star.png";
import noStar from "./images/no_star.png"
import { useSearchParams,Link } from 'react-router-dom';
//무한 스크롤 페이징 라이브러리
import { useInView } from 'react-intersection-observer';
//객실 등록&수정 모달
import RoomCommon from "../../containers/hotel/roomCommon";
const EsayRoomManage = ({my_hotel_list,hotelList, hotel_code, hotelCode, code,reset}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [hotelListValue, setHotelListValue] = useState([]);
    const codeList = code.code;
    const [searchValue, setSearchValue] = useState(searchParams.get('hotelName'));
    const [reSearchValue, setReSearchValue] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [hotelNum, setHotelNum] = useState('');

    //페이징 처리
    const [ref, inView] = useInView();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const [searchClick, setSearchClick] = useState(false);
    const [rendering, setRendering] = useState(false)
    const searchValueChange = (e) =>{
        setReSearchValue(e.target.value);
    }
    const search = () => {
        setHotelListValue([])
        setPage(1)
        setSearchClick(true)
        setLoading(true)
        my_hotel_list({
            text : reSearchValue,
            page : 1
        });
    }

    const onSetModalOpen = (open, index, index2) => {
        setRoomNum(hotelListValue[index].room_list[index2].room_num)
        setModalOpen(open)
    }

    //roomBatchDelete.js(자식컴포넌트) 에게 전달받은 modal false : modal창 닫기 위해서
    const getData = (modalOpen) => {
        setModalOpen(modalOpen);
    }

    //객실 추가&등록, 수정 모달 시작
    const [changeInfo, setChangeInfo] = useState(false); //등록이 되었을시 setChangeInfo(true)
    const [roomModalOpen, setRoomModalOpen] = useState(false); //모달 오픈 boolean 
    const [type, setType] = useState(0); //  0-등록
    const [roomNum, setRoomNum] = useState(''); //객실 번호-> 수정 시 -없어도 됨
    const roomModal = (type,index) => {
        //등록
        if(type === 0){
            setHotelNum(hotelListValue[index].hotel_num)
            setRoomModalOpen(true)
        //수정
        }else{

        }
    }
    //종료
    
    const dispatch = useDispatch();
    
    //진입 시 모든 리스트가 보여줘야 함
    useEffect(() => {
        setRendering(true);
        my_hotel_list({
            text : searchValue === null ? '' : searchValue,
            page : page
        });
        hotel_code();
    },[])

    useEffect(() => {
        if (!inView) {
          return;
        }else{
            if(loading && page > 1){
                my_hotel_list({
                    text : searchClick ? reSearchValue : searchValue ,
                    page : page
                });
            }
        }
      }, [inView]);

    //호텔리스트 조회 상태에 따라 dispatch or 예외처리
    useEffect(() => {
        if(hotelList && rendering){
            if(hotelList.result === 'OK'){
                if(hotelList.data.length > 0){
                    setPage((page) => page+1)
                    hotelList.data.map((array) => hotelListValue.push(array))
                    setHotelListValue(hotelListValue)
                }else{
                    setLoading(false)
                }
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
        
    },[my_hotel_list,hotelList])

    //호텔 부가서비스/시설 공통코드 조회 상태에 따라 dispatch or 예외처리
    useEffect(() => {
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                dispatch(hotelMainReducer.selectHotelCode({ data : hotelCode.data}));
            }
        }
    },[hotel_code,hotelCode])

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
                        src={item.image ? item.image[0] : null}
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
                                부가 서비스 :  {
                                    item.tags ?
                                    codeList.map((item2, index2) => (
                                        item.tags.includes(item2.code) ? (' ☑'+item2.name) : null
                                    ))
                                    : null
                                }
                                </small>
                            
                            </p>
                            <Button id="roomAdd" variant="outline-primary" onClick={()=>roomModal(0,index)}>
                                    {item.room_list.length > 0 ? '객실추가' : '객실등록'}
                            </Button>{' '}
                            <div ref={ref}/>
                            {
                            item.room_list.length > 0 ?
                                <div className="d-flex flex-column">
                                    <Button variant="outline-dark" id={"roomList"+index}>
                                        객실 조회 
                                    </Button>
                                    <UncontrolledCollapse toggler={"#roomList"+index}className="m-0 p-0">
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
                                                    <RoomBatchDelete room_num={roomNum} modalOpen={modalOpen} getData={getData}/>
                                                )}
                                                {
                                                roomModalOpen && (
                                                    <RoomCommon setRoomModalOpen={setRoomModalOpen} roomModalOpen={roomModalOpen} type={type} hotel_num={hotelNum} 
                                                        room_num={roomNum} setChangeInfo={setChangeInfo} />
                                                )}
                                                </div>
                                                <Link to = {"/auth/hotel/roomDetailList?hotelNum="+item.hotel_num}>
                                                    <Button id="moreRoom" variant="outline-secondary">객실 더보기</Button>
                                                </Link>
                                                
                                                
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
        code : hotelMainReducer.getIn(['HOTEL_CODE', 'form'])
    }),
    {
        my_hotel_list, //나(사업자)의 호텔리스트 조회 액션
        hotel_code,
        reset

    }
)(EsayRoomManage);