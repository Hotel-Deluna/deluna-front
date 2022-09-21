import React, {useEffect, useState} from "react";
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as hotelMainReducer from "../../modules/hotel/hotelMainReducer";
import HotelDelete from "./hotelDelete";
/* redux 영역 */
import { connect } from "react-redux";
const MyhotelList = (props) => { 
    const hotelList = props.form.list;
    
    const [modalOpen, setModalOpen] = useState(false);
    const [hotelNum, setHotelNum] = useState('');
    const [hotelName, setHotelName] = useState('');
    const onSetModalOpen = (open, hotel_num, hotel_name) => {
        setHotelNum(hotel_num);
        setModalOpen(open);
        setHotelName(hotel_name)
    }

    //roomBatchDelete.js(자식컴포넌트) 에게 전달받은 modal false : modal창 닫기 위해서
    const getData = (modalOpen) => {
        setModalOpen(modalOpen);
    }

    return (
        <>
            <div className="containerTitle">나의 호텔 리스트</div>
                <Table bordered>
                    <thead className="table-blue">
                        <tr>
                            <th>호텔명</th>
                            <th>호텔주소</th>
                            <th>호텔 전화번호</th>
                            <th>호텔이미지</th>
                            <th>호텔 정보수정</th>
                            <th>객실관리</th>
                            <th>예약리스트</th>
                            <th>삭제</th>
                            
                        </tr>
                    </thead>
                    {
                        hotelList.length > 0 ?
                        <tbody>
                        {hotelList.map((item, index) => (
                            <tr className="table-light" key={index}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.phone_num ? item.phone_num.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") : ''}</td>
                                <td><img src={item.image ? item.image[0] : ''}></img></td>
                                <td>
                                    <Link to = {"/auth/hotel/info?type=modfiy"+"&hotel_num="+item.hotel_num}>
                                        <Button variant="outline-dark">수정</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to = {"/auth/hotel/roomList?hotelName="+item.name}>
                                        <Button variant="outline-dark">조회/변경</Button>
                                    </Link>
                                </td>
                                <td><Button variant="outline-dark">보기</Button></td>
                                <td><Button variant="danger" onClick={() => onSetModalOpen(true,item.hotel_num,item.name)}>삭제</Button></td>
                            </tr>
                            
                        ))}
                        </tbody>
                        :
                        <tbody>
                            <tr className="table-light">
                                <td colSpan={8}>둥록된 호텔이 없습니다.</td>
                            </tr>
                        </tbody>
                    
                    
                    }
                </Table>
                <div>
                {
                modalOpen && (
                    <HotelDelete hotel_name={hotelName} hotel_num={hotelNum} modalOpen={modalOpen} getData={getData}/>
                )}
                </div>
        </>
    )
};
export default connect(
    (state) => ({
        form: state.hotelMainReducer.getIn(['MY_HOTEL_LIST', 'form'])
    }),
)(MyhotelList);