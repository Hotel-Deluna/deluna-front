import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import RoomCommon from "../../containers/hotel/roomCommon";
const RoomDetailListTable =  (props) => {
    const price_align = {
        textAlign : 'left',
        minWidth : '7rem'
    }
    const priceTitle_align = {
        textAlign : 'right',
        minWidth : '7rem'
    }
    return (
        <Container fluid="xxl" style={{marginTop : '2rem'}}>
            <Row className="justify-content-md-center">
                <Col sm={12}>
                    <Table responsive="sm" style={{textAlign : 'center'}}>
                        <thead>
                            <tr>
                                <th>객실명</th>
                                <th>기준인원/최대인원</th>
                                <th>체크인/체크아웃</th>
                                <th>객실 수</th>
                                <th>침대 수</th>
                                <th>태그</th>
                                <th colSpan={2}>가격</th>
                                <th>수정/삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.room_arr.length === 0 
                            ? 
                            <tr>
                                <td colSpan={9}><h6>등록된 객실이 없습니다.</h6></td>
                            </tr>
                            :
                            props.room_arr.map((item, index) => (<>
                                <tr key={'room'+index}>
                                    <td>{item.name}</td>
                                    <td>{item.minimum_people}/{item.maximum_people}</td>
                                    <td>{item.check_in_time}/{item.check_out_time}</td>
                                    <td>{item.room_detail_info.length}</td>
                                    <td>
                                        {item.single_bed_count !== 0 && ('싱글베드 : '+ item.single_bed_count +'개')}
                                        {item.single_bed_count !== 0 && item.double_bed_count !== 0 && (<br />)}
                                        {item.double_bed_count !== 0 && ('더블베드 : '+ item.double_bed_count +'개')}
                                    </td>
                                    <td>
                                        {item.tags.map((i, idx) => (
                                            <span key={'tag'+idx}>
                                           { props.code_arr.map((it, ii) => (
                                                i === it.code && ((idx+1) < item.tags.length ? <span key={'tag_name'+ii}>{it.name+', '}</span> : <span key={'tag_name'+ii}>{it.name}</span>)
                                            ))}
                                            </span>
                                        ))}
                                    </td>
                                    <td colSpan={2}>
                                        <Row className="justify-content-md-center" style={{minWidth : '14rem'}}>
                                            <Col sm={12}>비성수기 가격</Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col sm={6} style={priceTitle_align}><span>주중(일~목)가격:</span></Col>
                                            <Col sm={6} style={price_align}>{item.weekday_price}<span>원</span></Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col sm={6} style={priceTitle_align}>주말(금~토)가격:</Col>
                                            <Col sm={6} style={price_align}>{item.weekend_price}<span>원</span></Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col sm={12}>성수기 가격</Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col sm={6} style={priceTitle_align}>주중(일~목)가격:</Col>
                                            <Col sm={6} style={price_align}>{item.p_weekday_price}<span>원</span></Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col sm={6} style={priceTitle_align}>주말(금~토)가격:</Col>
                                            <Col sm={6} style={price_align}>{item.p_weekend_price}<span>원</span></Col>
                                        </Row>
                                    </td>
                                    <td>
                                        <Row className="justify-content-md-center">
                                            <Col sm={6}>
                                                <Button variant="primary" name={'modify_'+index} onClick={props.showRoomModal}>수정</Button>
                                            </Col>
                                            <Col sm={6}>
                                                <Button variant="danger" >삭제</Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={9} style={{padding : 0}} >
                                        <Row className={!item.roomStatusCheck && ('mb-3')}>
                                            <Col sm={12}>
                                                <Button variant="light" name={'showRoom_'+index} onClick={props.handleClick} style={{width : '100%', height : '100%', fontSize:'0.8rem'}} >호실별 상태보기 {item.roomStatusCheck ? <VscTriangleUp /> : <VscTriangleDown />}</Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={9} style={{padding : 0}}>
                                        {item.roomStatusCheck && (
                                            <>
                                            <Table className="table-bordered mb-3" responsive="sm" style={{margin:0}}>
                                                <thead>
                                                    <tr>
                                                        <th>호실 명</th>
                                                        <th colSpan={11}>호실 상태</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {item.room_detail_info.map((items, indexs) => (<>
                                                    <tr key={'room_detail_info'+indexs}>
                                                        <td> {item.name}&nbsp;{items.name}</td>
                                                        <td colSpan={11}>
                                                            <Row className="justify-content-md-center">
                                                                <Col sm={8} style={{textAlign:'left', fontSize : '0.8rem'}}>
                                                                    {items.status === 2 ? <span>예약불가</span> : (items.available_yn ? <span>예약가능</span> : <><span>{items.room_closed_start} ~ {items.room_closed_end}</span><span>&nbsp;이용불가</span></>)}
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <Button variant="light" style={{width : '100%'}}>이용불가</Button>
                                                                </Col>
                                                                {/* <Col xs='auto' /> */}
                                                                <Col sm={2}>
                                                                    <Button variant="danger" style={{width : '100%'}}>호실삭제</Button>
                                                                </Col>
                                                            </Row>
                                                        </td>
                                                    </tr>
                                                    {item.room_detail_info.length < 5 && (
                                                        <tr>
                                                            <td colSpan={12} style={{padding: 0}}>
                                                                <Button variant="light" name={'room_register'} style={{width : '100%',fontSize : '0.9rem'}}>{item.name} 객실 추가+</Button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                                ))}
                                                </tbody>
                                            </Table>
                                            </>
                                        )}
                                </td>
                                </tr>
                                </>
                            ))
                            }
                            
                        </tbody>
                        {props.room_arr.length < 10 && (
                            <tfoot>
                                <tr>
                                    <td colSpan={9} style={{padding: 0}}>
                                        <Button variant="outline-dark" name={'register'} onClick={props.showRoomModal} style={{width : '100%', height : '100%', fontSize:'1.5rem'}} >객실 등록 +</Button>
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                               
                    </Table>
                </Col>
            </Row>
            {props.roomModalOpen && (<RoomCommon setRoomModalOpen={props.setRoomModalOpen} roomModalOpen={props.roomModalOpen} type={props.type} hotel_num={props.room_arr[0].hotel_num} room_num={props.room_num} />)}
        </Container>  
    );
}

export default RoomDetailListTable;