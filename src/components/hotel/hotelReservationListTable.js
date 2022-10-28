import React from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
const HotelReservationListTable = ({hotel_list, onChangeSelect, onClick, inputidx, rank_num, list, maxPage, searchValue, onChange, pageNum, hotelIdx}) => {
    const menuBtns = {
        maxHeight : '2rem',
        minWidth: '4.6rem'
    }
    const searchBtn = {
        maxHeight : '2.4rem',
        fontSize: '1rem',
        fontWeight: '400'
    }
    
    return(
        <Container fluid="xxl" style={{marginTop : '2rem'}}>
            <Row className="mb-3">
                <Col sm={2}>
                    <h3>예약 관리</h3>
                </Col>
                <Col sm={10} />
            </Row>
            <Row className="justify-content-md-center mb-3">
                <Col sm={1}>
                    <div className="d-grid">
                        <Button type="button" size="lg" name='all' variant={rank_num === 1 ? 'primary' : 'light'} onClick={onClick} style={menuBtns}>전체</Button>
                    </div>
                </Col>
                <Col sm={1}>
                    <div className="d-grid">
                        <Button type="button" size="lg" name='confirmation' variant={rank_num === 2 ? 'primary' : 'light'} onClick={onClick} style={menuBtns}>예약확정</Button>
                    </div>
                </Col>
                <Col sm={1}>
                    <div className="d-grid">
                        <Button type="button" size="lg" name ='cancel' variant={rank_num === 3 ? 'primary' : 'light'} onClick={onClick} style={menuBtns}>예약취소</Button>
                    </div>
                </Col>
                <Col sm={1}>
                    <div className="d-grid">
                        <Button type="button" size="lg" name='complete' variant={rank_num === 4 ? 'primary' : 'light'} onClick={onClick} style={menuBtns}>이용완료</Button>
                    </div>
                </Col>
                <Col sm={7} />
            </Row>
            <Row className="justify-content-md-center mb-3">
                <Col sm={4} />
                <Col sm={3}>
                    <Form.Select aria-label="hotel_list" onChange={onChangeSelect} name="hotel" value={hotelIdx}>
                        {hotel_list.map((item, index) => (
                            <option value={index} key={'name'+index}>{item.name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    <Form.Select aria-label="search_list" onChange={onChangeSelect} name="search">
                        <option value='0'>고객명</option>
                        <option value='1'>예약번호</option>
                        <option value='2'>고객 핸드폰번호</option>
                        <option value='3'>예약일자</option>
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    {
                        inputidx ===  '3'
                        ?
                        <Form.Control type="date" name='searchValue' value={searchValue} onChange={onChange} />
                        :
                        <Form.Control type="text" name='searchValue' placeholder="검색" value={searchValue} onChange={onChange} />    
                    }
                    
                </Col>
                <Col sm={1}>
                    <div className="d-grid">
                        <Button size="lg" variant="outline-primary" style={searchBtn} name={'search'} onClick={onClick}>< BsSearch/></Button>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center mb-3">
                <Col sm={12}>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>예약번호</th>
                                <th>호텔명</th>
                                <th>객실명</th>
                                <th>예약자명</th>
                                <th>예약자<br/>휴대폰번호</th>
                                <th>예약일</th>
                                <th>예약상태</th>
                                <th>예약취소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.length === 0 
                                ? 
                                <tr>
                                    <td colSpan={8}><h5>예약내역이 없습니다.</h5></td>
                                </tr>
                                :
                                list.map((item, index) => (
                                    <tr sm={2} key={'list'+index}>
                                        <td>{item.reservation_num}</td>
                                        <td>{item.hotel_name}</td>
                                        <td>{item.room_name}</td>
                                        <td>{item.customer_name}</td>
                                        <td> {item.customer_phone_num}
                                            {/* {item.customer_phone_num.length === '11' 
                                            ? 
                                            item.customer_phone_num.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")
                                            :
                                            item.customer_phone_num.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")
                                            } */}
                                        </td>
                                        <td>
                                            {item.reservation_status === 1 && ('예약확정')}
                                            {item.reservation_status === 2 && ('이용완료')}
                                            {item.reservation_status === 3 && ('예약취소')}
                                        </td>
                                        <td>
                                            {item.reservation_status === 1 && (<Button variant="danger">예약취소</Button>)}
                                            {item.reservation_status === 3 && (<Button variant="light">취소사유</Button>)}
                                        </td>
                                    </tr>
                                ))
                            }
                            {maxPage > 1 && pageNum !== maxPage && (
                                <tr>
                                    <td colSpan={8} style={{padding : '0'}}>
                                        <Button type="button" style={{width : '100%', fontSize : '1rem'}} variant="light" name={'moreList'} onClick={onClick}>더 보기 +</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        {/* <tbody>
                            <tr>
                                <td>12345</td>
                                <td>신라스테이 강남</td>
                                <td>디럭스 더블</td>
                                <td>이준표</td>
                                <td>{'01129810871'.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")}</td>
                                <td>2022/10/01 ~ 2022/10/02</td>
                                <td>예약확정</td>
                                <td><Button variant="danger">예약취소</Button></td>
                            </tr>
                        </tbody> */}
                    </Table>
                </Col>
            </Row>
        </Container>
    );
    
}

export default HotelReservationListTable;