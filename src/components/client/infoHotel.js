import React from "react";
import HeaderFilter from "../layout/js/headerFilter";
import ImageModal from "./imageModal";
import AuthLoginModal from "../auth/authLoginModal";
import { Container, Row, Col, Button, Card, Form, Image, Carousel, Spinner } from "react-bootstrap";
import { CardBody, CardHeader } from "reactstrap";
import { VscTriangleLeft, VscTriangleRight, VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";
import noImage from "../common/noImage.png";

const InfoHotel = (props) => {
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
        fontSize : '1.3rem',
        paddingLeft : '0.4rem',
        paddingRight : '0.4rem',
        margin: '0.3rem',
        height: '97%'
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
        <>
        {props.isHotelLoading && (
        <Container fluid="xxl">
            <Row className="justify-content-md-center mb-3">
                <Col sm={12}>
                    <HeaderFilter />
                </Col>
            </Row>
            {props.hotelInfo.image && (
            props.hotelInfo.image.length > 0 && (
            <>
            <Row className="justify-content-center mb-3">
                <Col xs={12} sm={12} >
                    <Row>
                        <Col xs={1} sm={1} style={angleBtn}>
                        {props.hotelImgIdx !== 0 && (
                            <>
                                {/* <div className="d-block d-sm-none d-grid">
                                    <Button variant="light" style={btnSize} name={'hotelImg_minus'} onClick={props.handleImgBtnClick}><VscTriangleUp /></Button>
                                </div>d-none d-sm-block  */}
                                    <Button variant="light" style={btnSize} name={'hotelImg_minus'} onClick={props.handleImgBtnClick}><VscTriangleLeft /></Button>
                            </>
                        )}
                        </Col>
                        <Col xs={10} sm={10}>
                            <Row>
                                {props.hotelInfo.image && ( 
                                props.hotelInfo.image.map((hotelImgItem, index) => (
                                    index < (props.hotelImgIdx+3) && (
                                        props.hotelImgIdx <= index && (
                                            <Col key={'hotelImg'+index} xs={props.hotelInfo.image !==null && (props.hotelInfo.image.length === 1 ? 12 : (props.hotelInfo.image.length === 2 ? 6 : 4))} sm={props.hotelInfo.image !==null && (props.hotelInfo.image.length === 1 ? 12 : (props.hotelInfo.image.length === 2 ? 6 : 4))} style={{padding : '0.3rem'}}>
                                                <Image style={{ width:'100%', height:'15rem' }} src={hotelImgItem} alt={'hotelImg_'+index} onClick={()=>props.handleImgClick('hotel_'+index)} />
                                            </Col>
                                        )
                                    )
                                )))}
                            </Row>
                        </Col>
                        <Col xs={1} sm={1} style={angleBtn}>
                        {(props.hotelImgIdx+3) < (props.hotelImgMaxIdx+1) && (
                            <>
                                {/* <div className="d-block d-sm-none d-grid">
                                    <Button variant="light" style={btnSize} name={'hotelImg_plus'} onClick={props.handleImgBtnClick}><VscTriangleDown /></Button>
                                </div>d-none d-sm-block */}
                                    <Button variant="light" style={btnSize} name={'hotelImg_plus'} onClick={props.handleImgBtnClick}><VscTriangleRight /></Button>
                            </>
                        )}
                         </Col>
                    </Row>
                </Col>
            </Row>
            </>)
            )}
            
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
                                           { ((idx+1) < props.hotelInfo.tags.length ? <span>{itm+', '}</span> : <span>{itm}</span>)
                                        }
                                        </span>
                                    ))
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
               
            </Row>
            <Row className="mb-2">
                <Col xs={12} sm={12}>
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
                <Col xs={12} sm={12}>
                    <Card border="light">
                        <CardHeader style={{backgroundColor: '#fff', fontSize:'0.7rem', paddingLeft : '0'}}> 
                            <Card.Text>객실을 선택하세요.</Card.Text>
                        </CardHeader>
                        <CardBody style={{paddingBottom:'0',paddingLeft:'0',paddingRight:'0'}}>
                            { props.allInfo.roomList && (
                                props.allInfo.roomList.map((roomItem, roomIndex) => (
                                <Card className={roomIndex !== (props.allInfo.roomList.length-1) && ('mb-3')} key={'room_list'+roomIndex}>
                                    <Row  md={2} className="g-0 justify-content-center">
                                        <Col md={2}>
                                            <Carousel interval={null} data-interval="false" wrap={false} style={{width : '100%', height: '100%'}} indicators={roomItem.roomInfo.image && (roomItem.roomInfo.image === null ? false : true)} >
                                                {   
                                                    roomItem.roomInfo.image ? (
                                                        roomItem.roomInfo.image.map((roomImgItem, roomImgIdx) => (
                                                            <Carousel.Item key={'room_image'+roomImgIdx}>
                                                                <img className="d-block d-md-none" src={roomImgItem} alt={'room_image'+ roomImgIdx} style={{width : '100%',height : '17.5rem'}} onClick={()=>props.handleImgClick('room_'+roomImgIdx+'_'+roomIndex)} />
                                                                <img className="d-none d-md-block" src={roomImgItem} alt={'room_image'+ roomImgIdx} style={{width : '100%',height : '12.5rem'}} onClick={()=>props.handleImgClick('room_'+roomImgIdx+'_'+roomIndex)} />
                                                            </Carousel.Item>
                                                        ))
                                                    )
                                                    :
                                                    (
                                                        <Carousel.Item>
                                                            <img className="d-block d-md-none" src={noImage} alt="no_image" style={{width : '100%',height : '17.5rem'}} />
                                                            <img className="d-none d-md-block" src={noImage} alt="no_image" style={{width : '100%',height : '12.5rem'}} />
                                                        </Carousel.Item>
                                                    )
                                                }
                                            </Carousel>
                                        </Col>
                                        <Col md={8}>
                                            <Card.Body>
                                                <Row className="mb-3">
                                                    <Col md={12}>
                                                        <Card.Title>{roomItem.roomInfo.name}</Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col md={6}>
                                                        <Card.Text style={roomInfoSize}>
                                                            침대 : {roomItem.roomInfo.single_bed_count > 0 && (roomItem.roomInfo.double_bed_count === 0 ? <span>싱글베드:{roomItem.roomInfo.single_bed_count}개</span>  : <span>싱글베드:{roomItem.roomInfo.single_bed_count}개, </span> ) }
                                                                {roomItem.roomInfo.double_bed_count > 0 && (<span>더블베드:{roomItem.roomInfo.double_bed_count}개</span>)}
                                                        </Card.Text>
                                                    </Col>
                                                    <Col md={6}><Card.Text style={roomInfoSize}>객실 인원 수 : 기준 {roomItem.roomInfo.minimum_people}명 / 최대 {roomItem.roomInfo.maximum_people}명</Card.Text></Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col md={6}><Card.Text style={roomInfoSize}>체크인 : {roomItem.roomInfo.check_in_time} / 체크아웃: 11:00</Card.Text></Col>
                                                    <Col md={6}><Card.Text style={roomInfoSize}>예약가능 방 : {roomItem.roomInfo.reservable_room_count}개</Card.Text></Col>
                                                </Row>
                                                {roomItem.roomInfo.tags && (
                                                    <Row className="mb-2">
                                                        <Col md={12}>
                                                            <Card.Text style={roomInfoSize}>
                                                                {roomItem.roomInfo.tags.map((tagsItem, tagsIdx) => (
                                                                        <span key={tagsIdx}>
                                                                        { (tagsIdx+1) < roomItem.roomInfo.tags.length ? <span>{tagsItem+', '}</span> : <span>{tagsItem}</span>
                                                                        }
                                                                        </span>
                                                                ))}
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                )}
                                                    <Row>
                                                        <Col md={3}>
                                                            <span style={{fontSize : '0.9rem'}}>1박 / {roomItem.roomInfo.price && (roomItem.roomInfo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))} 원</span>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Select size="sm" disabled={roomItem.roomInfo.reservable_room_count === 0 && (true)} name={'choiceCnt_'+roomIndex} onChange={props.handleSelect}>
                                                                <option value={0}>객실 수 선택</option>
                                                                {1 <= roomItem.roomInfo.reservable_room_count && (<option value={1}>1</option>)}
                                                                {2 <= roomItem.roomInfo.reservable_room_count && (<option value={2}>2</option>)}
                                                                {3 <= roomItem.roomInfo.reservable_room_count && (<option value={3}>3</option>)}
                                                                {4 <= roomItem.roomInfo.reservable_room_count && (<option value={4}>4</option>)}
                                                                {5 <= roomItem.roomInfo.reservable_room_count && (<option value={5}>5</option>)}
                                                            </Form.Select>
                                                        </Col>
                                                        <Col md={6}>
                                                            <span style={roomInfoSize}>예약 인원 수 : &nbsp;</span>
                                                            <Button variant={roomItem.roomInfo.reservable_room_count === 0 ? "light" : "outline-dark"} onClick={props.handleClick} name={'people_minus_'+roomIndex} disabled={roomItem.roomInfo.reservable_room_count === 0 && (true)}>-</Button>
                                                            &nbsp;<span style={{fontSize:'0.8rem', width:'1.2rem', display:'inline-block', textAlign:'center'}}>{props.allInfo.roomList[roomIndex]?.people}</span>&nbsp;
                                                            <Button variant={roomItem.roomInfo.reservable_room_count === 0 ? "light" : "outline-dark"} onClick={props.handleClick} name={'people_plus_'+roomIndex} disabled={roomItem.roomInfo.reservable_room_count === 0 && (true)}>+</Button>
                                                        </Col>
                                                    </Row>
                                            </Card.Body>
                                        </Col>
                                        <Col md={2}>
                                            <Button name={'makeReservationOne_'+roomIndex} onClick={props.handleClick} variant={props.allInfo.roomList[roomIndex]?.room_cnt === 0 ? (roomItem.roomInfo.reservable_room_count === 0 ?"outline-light" : "outline-dark" ) : "outline-dark"} disabled={roomItem.roomInfo.reservable_room_count === 0 && (true)} style={{width: '100%', height : '100%', border: '0.01rem solid)',borderLeft: '0.1rem solid'}}>
                                                <span style={{color:'#6c757d', fontSize:'1rem'}}>{roomItem.roomInfo.reservable_room_count === 0 ? '예약불가' : '예약하기'}</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            )))}
                        </CardBody>
                    </Card>
                </Col>
               
               
            </Row>
            
            {
            props.allInfo.roomList.length > 1 && !props.isRoomLoading &&(
                <Row className="mb-3"><Col sm={5} /><Col sm={2} style={{textAlign : 'center'}}><Spinner animation="border" /></Col><Col sm={5} /></Row>
            )}
            {props.allInfo.roomList.length > 1   && (
                <Row className="mb-3">
                    <Col sm={12}>
                        <div className="d-grid">
                        <Button name={'makeReservationAll_'} onClick={props.handleClick} variant="light" style={{fontSize:'1rem'}} disabled={props.allReservationCheck ? false : true}>모두 예약</Button>
                        </div>
                    </Col>
                </Row>
            )}
            {props.allInfo.roomList.length > 1  && (
                props.hotelInfo.room_list && (
                props.allInfo.roomList.length !== props.hotelInfo.room_list.length ?
                <Row className="mb-3">
                    <Col xs={12} sm={12}>
                        <div className="d-grid">
                            <Button variant="light" style={{fontSize:'1rem'}} disabled>객실 더보기 <VscTriangleDown /></Button>
                        </div>
                    </Col>
                </Row>
                :
                <Row xs={12} className="mb-3">
                    <Col sm={4} />
                    <Col sm={4} style={{textAlign : 'center'}}>
                        <Button variant="outline-dark" style={{fontSize:'1rem'}} onClick={()=> (document.documentElement.scrollTop = 0)}>맨 위로 <VscTriangleUp /></Button>
                    </Col>
                    <Col sm={4} />
                </Row>
            ))}
            
            <Row className="mb-3"><Col xs><div ref={props.views}></div></Col></Row>
            <Row className="mb-3"><Col sm={12} /></Row>
            <Row><Col sm={12} /></Row>
            {props.roomModalOpen && (
                <ImageModal imgType={props.imgType} setRoomModalOpen={props.setRoomModalOpen} roomModalOpen={props.roomModalOpen} idx={props.modalIdx} imgList={props.imgType === 0 ? props.hotelInfo.image : JSON.parse(JSON.stringify(props.allInfo.roomList[props.roomArrIdx].roomInfo.image))} />
            )}
            {props.loginModalOpen && (
                <AuthLoginModal setLoginModalOpen={props.setLoginModalOpen} loginModalOpen={props.loginModalOpen} setLoginCheck={props.setLoginCheck} />
            )}
            
        </Container>
        )}</>
    );
}

export default InfoHotel;