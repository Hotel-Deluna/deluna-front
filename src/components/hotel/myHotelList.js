import React from "react";
import {Table, Button} from 'react-bootstrap';
import testImg from '../../pages/images/test.png';
import { Link } from 'react-router-dom';
import * as hotelMainReducer from "../../modules/hotel/hotelMainReducer";

/* redux 영역 */
import { connect } from "react-redux";
const MyhotelList = (props) => { 
    const hotelList = props.form.list
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
                                <td>{item.phone_num}</td>
                                <td><img src={testImg}></img></td>
                                <td>
                                    <Link to = {"/auth/hotel/info?type=modfiy"+"&hotel_num="+item.hotel_num}>
                                        <Button variant="outline-dark">수정</Button>
                                    </Link>
                                </td>
                                <td><Button variant="outline-dark">조회/변경</Button></td>
                                <td><Button variant="outline-dark">보기</Button></td>
                                <td><Button variant="danger">삭제</Button></td>
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
        </>
    )
};
export default connect(
    (state) => ({
        form: state.hotelMainReducer.getIn(['MY_HOTEL_LIST', 'form'])
    }),
)(MyhotelList);