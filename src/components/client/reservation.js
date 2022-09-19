
import React, { useState, useEffect } from "react";
import {Tabs,Tab,Table,Button} from "react-bootstrap";
import { connect, useDispatch } from 'react-redux';

import {reservation_list} from "../../modules/client/reservationListActions";
import ReservationCancelReason from "./reservationCancelReason";

const ReservationList = ({reservation_list, reservationList}) => {
    const [reservation, setReservation] = useState([]);
    const [tabs, setTabs] = useState("1");

    //예약 취소보기 모달 관려 시작
    const [modalOpen, setModalOpen] = useState(false);
    const [reservationNum, setReservationNum] = useState('');
    const [reservationName, setReservationName]= useState('');

    //테스트코드
    const [member, setMember] = useState('nonMember');

    const onSetModalOpen = (open, index) => {
        setReservationNum(reservation[index].reservation_num)
        setReservationName(reservation[index].reservation_name)
        setModalOpen(open)
    }

    //roomBatchDelete.js(자식컴포넌트) 에게 전달받은 modal false : modal창 닫기 위해서
    const getData = (modalOpen) => {
        setModalOpen(modalOpen);
    }
     //예약 취소보기 모달 관려 끝

    useEffect(() => {
        if(member === 'member'){
            reservation_list({
                reservation_status : tabs,
                user_num: "000001"
            })
        }
    },[tabs]);

    useEffect(() => {
        if(reservationList){
            if(reservationList.result === 'OK'){
                if(member === 'member') setReservation(reservationList.data);
                else setReservation([reservationList.data])
            }else{
                alert("예약내역을 조회할 수 없습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[reservation_list,reservationList]);
    return (
        <>
        {
            member === 'member'?
            <div id="searchTabs">
                <Tabs
                defaultActiveKey="1"
                variant="tabs"
                id="searchTabs"
                className="mb-3"
                onSelect={(k) => setTabs(k)}
                >
                    <Tab eventKey="1" title="전체"></Tab>
                    <Tab eventKey="2" title="예약확정"></Tab>
                    <Tab eventKey="3" title="예약취소"></Tab>
                    <Tab eventKey="4" title="이용완료"></Tab>
                </Tabs>
            </div>
            :null
        }
            
            {
                reservation.length > 0 ?
                    <Table bordered>
                            <thead className="table-blue">
                                <tr>
                                    <th>예약번호</th>
                                    <th>예약자명</th>
                                    <th>호텔명</th>
                                    <th>객실명</th>
                                    <th>투숙인원</th>
                                    <th>예약일</th>
                                    <th>결제금액</th>
                                    <th>예약상태</th>
                                    <th>예약취소</th>
                                    
                                </tr>
                            </thead>

                            <tbody>
                            {reservation.map((item, index) => (
                                <tr className="table-light" key={index}>
                                    <td>{item.reservation_num}</td>
                                    <td>{item.reservation_name}</td>
                                    <td>{item.name}</td>
                                    <td>{item.room_detail_name}</td>
                                    <td>{item.reservation_people}</td>
                                    <td>{item.st_date.split(' ')[0]} ~ {item.ed_date.split(' ')[0]}</td>
                                    <td>{item.reservation_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                                    {/* 1 : 예약확정, 2:예약취소, 3:이용완료 */}
                                    <td>
                                        {
                                            item.reservation_status === '1' ? '예약확정'
                                            : item.reservation_status === '2' ? '예약취소' : '이용완료'
                                        }
                                    </td>
                                    <td>
                                        {item.reservation_status === '1'?
                                            <Button variant="outline-danger">예약취소</Button>
                                        :
                                        item.reservation_status === '2'?
                                            <Button variant="outline-dark" onClick={() => onSetModalOpen(true,index)}>취소사유</Button> 
                                        : ''
                                        }
                                    </td>
                                </tr>
                                
                            ))}
                            </tbody>
                    </Table>
                : '예약된 정보가 없습니다.'
            }
            <div>
            {modalOpen && (
                <ReservationCancelReason reservation_num={reservationNum} reservation_name={reservationName} modalOpen={modalOpen} getData={getData}/>
            )}
            </div>
        </>

        
        
    )
}

export default connect(
    () =>  ({ reservationListActions}) => ({
        reservationList : reservationListActions.reservationList,

    }),
    {
        reservation_list

    }
)(ReservationList);