import React from "react";
import HeaderFilter from "../layout/js/headerFilter";
import ImageModal from "./imageModal";
import { Container, Row, Col, Button, Card, Form, Image, Carousel, Spinner } from "react-bootstrap";
import { CardBody, CardHeader } from "reactstrap";
import { VscTriangleLeft, VscTriangleRight, VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";
import noImage from "../common/noImage.png";

const InfoHotel = (props) => {
    console.log(props.room_arr)
    const titleSize = {
        fontSize : '1.2rem'
    }
    const subSize = {
        fontSize : '0.7rem'
    }
    const marginColor = {
        backgroundColor: '#f1f1f1',
        padding : '0',
        marginTop: '-1rem'
    }
    const roomInfoSize = {
        fontSize : '0.8rem'
    }
    const btnSize = {
        fontSize : '1.3rem'
    }
    const angleBtn = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const starSize = {
        width : '1.3rem',
        height : '1.3rem',
        marginRight : '0.2rem'
    }
    
    return(
        <Container fluid="xxl">
            <Row className="justify-content-md-center mb-3">
                <Col sm={12}>
                    <HeaderFilter />
                </Col>
            </Row>
            {props.hotelInfo.image && (
            props.hotelInfo.image.length > 0 && (
            <>
            <Row className="justify-content-md-center mb-3">
                <Col sm={12} >
                    <Row>
                        <Col sm={1} style={angleBtn}>
                        {props.hotelImgIdx !== 0 && (
                            <>
                                <div className="d-block d-sm-none d-grid">
                                    <Button variant="light" style={btnSize} name={'hotelImg_minus'} onClick={props.handleImgBtnClick}><VscTriangleUp /></Button>
                                </div>
                                <div className="d-none d-sm-block d-grid">
                                    <Button variant="light" style={btnSize} name={'hotelImg_minus'} onClick={props.handleImgBtnClick}><VscTriangleLeft /></Button>
                                </div>
                            </>
                        )}
                        </Col>
                        <Col sm={10}>
                            <Row>
                                {props.hotelInfo.image && ( 
                                props.hotelInfo.image.map((hotelImgItem, index) => (
                                    index < (props.hotelImgIdx+3) && (
                                        props.hotelImgIdx <= index && (
                                            <Col key={'hotelImg'+index} sm={props.hotelInfo.image !==null && (props.hotelInfo.image.length === 1 ? 12 : (props.hotelInfo.image.length === 2 ? 6 : 4))} style={{padding : '0.3rem'}}>
                                                <Image style={{ width:'100%', height:'15rem' }} src={hotelImgItem} alt={'hotelImg_'+index} onClick={()=>props.handleImgClick('hotel_'+index)} />
                                            </Col>
                                        )
                                    )
                                )))}
                            </Row>
                        </Col>
                        <Col sm={1} style={angleBtn}>
                        {(props.hotelImgIdx+3) < props.hotelImgMaxIdx && (
                            <>
                                <div className="d-block d-sm-none d-grid">
                                    <Button variant="light" style={btnSize} name={'hotelImg_plus'} onClick={props.handleImgBtnClick}><VscTriangleDown /></Button>
                                </div>
                                <div className="d-none d-sm-block d-grid">
                                    <Button variant="light" style={btnSize} name={'hotelImg_plus'} onClick={props.handleImgBtnClick}><VscTriangleRight /></Button>
                                </div>
                            </>
                        )}
                         </Col>
                    </Row>
                </Col>
            </Row>
            </>)
            )}
            {props.isHotelLoading && (<>
            <Row className="mb-3">
                <Col sm={12}>
                    <Card style={{width : '100%'}}>
                        <Card.Header>
                            <Card.Title style={titleSize}>
                                <span>{props.hotelInfo.name}({props.hotelInfo.eng_name})</span>
                                <span style={{marginLeft : '0.2rem'}}>
                                    <img style={starSize} src={(props.hotelInfo.star - 1 >= 0 ? star : noStar)}></img>
                                    <img style={starSize} src={(props.hotelInfo.star - 2 >= 0 ? star : noStar)}></img>
                                    <img style={starSize} src={(props.hotelInfo.star - 3 >= 0 ? star : noStar)}></img>
                                    <img style={starSize} src={(props.hotelInfo.star - 4 >= 0 ? star : noStar)}></img>
                                    <img style={starSize} src={(props.hotelInfo.star - 5 >= 0 ? star : noStar)}></img>
                                </span>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text style={subSize}>
                                {props.hotelInfo.info}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
               
            </Row>
            <Row className="mb-2">
                <Col sm={12}>
                    <Card style={{width : '100%'}}>
                        <Card.Header>
                            <Card.Title style={titleSize}>부가 시설/서비스</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text style={subSize}>
                                {props.hotelInfo.tags !== undefined && props.hotelInfo.tags !== null  && (
                                    props.hotelInfo.tags.map((itm, idx) => (
                                        <span key={idx}>
                                           { props.hotelCodes.map((it, id) => (
                                            itm === it.code && ((idx+1) < props.hotelInfo.tags.length ? <span key={id}>{it.name+', '}</span> : <span key={id}>{it.name}</span>)
                                        ))}
                                        </span>
                                    ))
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
               
            </Row>
            <Row className="mb-2">
                <Col sm={12}>
                <Card style={{width : '100%'}}>
                        <Card.Header>
                            <Card.Title style={titleSize}>호텔 규정 내용</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text style={subSize}>
                                {props.hotelInfo.rule}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
               
            </Row>
            <Row>
                <Col sm={12}>
                    <Card border="light">
                        <CardHeader style={{backgroundColor: '#fff', fontSize:'0.7rem', paddingLeft : '0'}}> 
                            <Card.Text>객실을 선택하세요.</Card.Text>
                        </CardHeader>
                        <CardBody style={{paddingBottom:'0',paddingLeft:'0',paddingRight:'0'}}>
                            { props.room_arr.map((roomItem, roomIndex) => (
                                <Card className={roomIndex !== (props.room_arr.length-1) && ('mb-3')} key={'room_list'+roomIndex}>
                                    <Row  md={2} className="g-0 justify-content-md-center">
                                        <Col md={2}>
                                            <Carousel interval={null} data-interval="false" wrap={false} style={{width : '100%', height: '100%'}} indicators={ roomItem.image === null ? false : true} >
                                                { 
                                                    roomItem.image === null 
                                                    ? 
                                                        <Carousel.Item>
                                                            <img className="d-block d-md-none" src={noImage} alt="no_image" style={{width : '100%',height : '17.5rem'}} />
                                                            <img className="d-none d-md-block" src={noImage} alt="no_image" style={{width : '100%',height : '12.5rem'}} />
                                                        </Carousel.Item>
                                                    :
                                                    roomItem.image.map((roomImgItem, roomImgIdx) => (
                                                            <Carousel.Item key={'room_image'+roomImgIdx}>
                                                                <img className="d-block d-md-none" src={roomImgItem} alt={'room_image'+ roomImgIdx} style={{width : '100%',height : '17.5rem'}} onClick={()=>props.handleImgClick('room_'+roomImgIdx+'_'+roomIndex)} />
                                                                <img className="d-none d-md-block" src={roomImgItem} alt={'room_image'+ roomImgIdx} style={{width : '100%',height : '12.5rem'}} onClick={()=>props.handleImgClick('room_'+roomImgIdx+'_'+roomIndex)} />
                                                            </Carousel.Item>
                                                        ))
                                                }
                                            </Carousel>
                                        </Col>
                                        <Col md={8}>
                                            <Card.Body>
                                                <Row className="mb-3">
                                                    <Col md={12}>
                                                        <Card.Title>{roomItem.name}</Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col md={6}>
                                                        <Card.Text style={roomInfoSize}>
                                                            침대 : {roomItem.single_bed_count > 0 && (roomItem.double_bed_count === 0 ? <span>싱글베드:{roomItem.single_bed_count}+개</span>  : <span>싱글베드:{roomItem.single_bed_count}개, </span> ) }
                                                                {roomItem.double_bed_count > 0 && (<span>더블베드:{roomItem.double_bed_count}개</span>)}
                                                        </Card.Text>
                                                    </Col>
                                                    <Col md={6}><Card.Text style={roomInfoSize}>객실 인원 수 : 기준 {roomItem.minimum_people}명 / 최대 {roomItem.maximum_people}명</Card.Text></Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col md={6}><Card.Text style={roomInfoSize}>체크인 : {roomItem.check_in_time} / 체크아웃: 11:00</Card.Text></Col>
                                                    <Col md={6}><Card.Text style={roomInfoSize}>예약가능 방 : {roomItem.reservable_room_count}개</Card.Text></Col>
                                                </Row>
                                                {roomItem.tags !== null && (
                                                    <Row className="mb-2">
                                                        <Col md={12}>
                                                            <Card.Text style={roomInfoSize}>
                                                                {roomItem.tags.map((tagsItem, tagsIdx) => (
                                                                        <span key={tagsIdx}>
                                                                        { props.roomCodes.map((roomCodesItem, roomCodesIdx) => (
                                                                            tagsItem === roomCodesItem.code && ((tagsIdx+1) < roomItem.tags.length ? <span key={roomCodesIdx}>{roomCodesItem.name+', '}</span> : <span key={roomCodesIdx}>{roomCodesItem.name}</span>)
                                                                        ))}
                                                                        </span>
                                                                ))}
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                )}
                                                {roomItem.reservable_room_count > 0 && (
                                                    <Row>
                                                        <Col md={3}>
                                                            <span style={{fontSize : '0.9rem'}}>1박 / {roomItem.price} 원</span>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Select size="sm" disabled={roomItem.reservable_room_count === 0 && (true)} name={'choiceCnt_'+roomIndex} onChange={props.handleSelect}>
                                                                <option value={0}>객실 수 선택</option>
                                                                {1 <= roomItem.reservable_room_count && (<option value={1}>1</option>)}
                                                                {2 <= roomItem.reservable_room_count && (<option value={2}>2</option>)}
                                                                {3 <= roomItem.reservable_room_count && (<option value={3}>3</option>)}
                                                                {4 <= roomItem.reservable_room_count && (<option value={4}>4</option>)}
                                                                {5 <= roomItem.reservable_room_count && (<option value={5}>5</option>)}
                                                            </Form.Select>
                                                        </Col>
                                                        <Col md={6}>
                                                            <span style={roomInfoSize}>예약 인원 수 : &nbsp;</span>
                                                            <Button variant="outline-dark" onClick={props.handleClick} name={'people_minus_'+roomIndex} disabled={roomItem.reservable_room_count === 0 && (true)}>-</Button>
                                                            &nbsp;<span style={{fontSize:'0.8rem', width:'1.2rem', display:'inline-block', textAlign:'center'}}>{props.roomInfo.roomList[roomIndex]?.people}</span>&nbsp;
                                                            <Button variant="outline-dark" onClick={props.handleClick} name={'people_plus_'+roomIndex} disabled={roomItem.reservable_room_count === 0 && (true)}>+</Button>
                                                        </Col>
                                                    </Row>
                                                )}
                                            </Card.Body>
                                        </Col>
                                        <Col md={2}>
                                            <Button name={'makeReservationOne_'+roomIndex} onClick={props.handleClick} variant={props.roomInfo.roomList[roomIndex]?.room_cnt === 0 ? "outline-light" : "outline-dark"} disabled={props.roomInfo.roomList[roomIndex]?.room_cnt === 0 && (true)} style={{width: '100%', height : '100%', border: '0.01rem solid)',borderLeft: '0.1rem solid'}}>
                                                <span style={{color:'#adb5bd', fontSize:'1rem'}}>{roomItem.reservable_room_count === 0 ? '예약불가' : '예약하기'}</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </CardBody>
                    </Card>
                </Col>
               
               
            </Row>
            </>)}
            {props.room_arr.length > 1 && !props.isRoomLoading &&(
                <Row className="mb-3"><Col sm={5} /><Col sm={2} style={{textAlign : 'center'}}><Spinner animation="border" /></Col><Col sm={5} /></Row>
            )}
            {props.room_arr.length > 1  && (
                <Row className="mb-3">
                    <Col sm={12}>
                        <div className="d-grid">
                        <Button name={'makeReservationAll_'} onClick={props.handleClick} variant="light" style={{fontSize:'1rem'}} disabled={props.allReservationCheck ? false : true}>모두 예약</Button>
                        </div>
                    </Col>
                </Row>
            )}
            {props.room_arr.length > 1  && (
                props.room_arr.length !== props.hotelInfo.room_list.length ?
                <Row className="mb-3">
                    <Col sm={12}>
                        <div className="d-grid">
                        <Button variant="light" style={{fontSize:'1rem'}} disabled>객실 더보기 <VscTriangleDown /></Button>
                        </div>
                    </Col>
                </Row>
                :
                <Row className="mb-3">
                    <Col sm={4} />
                    <Col sm={4} style={{textAlign : 'center'}}>
                        <Button variant="outline-dark" style={{fontSize:'1rem'}} onClick={()=> (document.documentElement.scrollTop = 0)}>맨 위로 <VscTriangleUp /></Button>
                    </Col>
                    <Col sm={4} />
                </Row>
            )}
            {/* {props.room_arr.length > 1 && (
                <Row className="mb-3">
                    <Col sm={12}>
                        <div className="d-grid">
                        <Button variant="light" style={{fontSize:'1rem'}}>맨 위로 <VscTriangleUp /></Button>
                        </div>
                    </Col>
                </Row>
            )} */}
            
            <Row className="mb-3"><Col xs><div ref={props.views}></div></Col></Row>
            <Row className="mb-3"><Col sm={12} /></Row>
            <Row><Col sm={12} /></Row>
            
            {props.roomModalOpen && (
                <ImageModal imgType={props.imgType} setRoomModalOpen={props.setRoomModalOpen} roomModalOpen={props.roomModalOpen} idx={props.modalIdx} imgList={props.imgType === 0 ? props.hotelInfo.image : props.room_arr[props.roomArrIdx].image} />
            )}
            
        </Container>
    );
}

export default InfoHotel;