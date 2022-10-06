import React from "react";
import HeaderFilter from "../layout/js/headerFilter";
import ImageModal from "./imageModal";
import { Container, Row, Col, Button, Card, Form, Image, Carousel } from "react-bootstrap";
import logo from '../layout/imges/city_3.jpg';
import logo2 from '../layout/imges/city_4.jpg';
import logo3 from '../layout/imges/city_5.jpg';
import { CardBody, CardHeader } from "reactstrap";
import { VscTriangleLeft, VscTriangleRight, VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import star from "../hotel/images/star.png";
import noStar from "../hotel/images/no_star.png";
//import noImage from "../common/noImage.png";

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
            {props.hotelInfo.image !== undefined && (
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
                                { props.hotelInfo.image.map((item, index) => (
                                    index < (props.hotelImgIdx+3) && (
                                        props.hotelImgIdx <= index && (
                                            <Col key={'hotelImg'+index} sm={props.hotelInfo.image.length === 1 ? 12 : (props.hotelInfo.image.length === 2 ? 6 : 4)} style={{padding : '0.3rem'}}>
                                                <Image style={{ width:'100%', height:'15rem' }} src={item} alt={'hotelImg_'+index} onClick={()=>props.handleImgClick(0, index)} />
                                            </Col>
                                        )
                                    )
                                ))}
                            </Row>
                        </Col>
                        <Col sm={1} style={angleBtn}>
                        {(props.hotelImgIdx+3) <= props.hotelImgMaxIdx && (
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
                            <Card className="mb-3">
                                <Row  md={2} className="g-0 justify-content-md-center">
                                    <Col md={2}>
                                        <Carousel data-interval="false" wrap={false} style={{width : '100%', height: '100%'}}>
                                            <Carousel.Item>
                                                <img className="d-block w-100" src={logo} alt="First slide"/>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img className="d-block w-100" src={logo2} alt="2 slide"/>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img className="d-block w-100" src={logo3} alt="3 slide"/>
                                            </Carousel.Item>
                                        </Carousel>
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body style={{paddingBottom: '0'}}>
                                        <Row className="mb-3">
                                            <Col md={12}>
                                                <Card.Title>스탠다드 트윈룸</Card.Title>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><Card.Text style={roomInfoSize}>침대 갯수 : 싱글베드2개</Card.Text></Col>
                                            <Col md={6}><Card.Text style={roomInfoSize}>객실 인원 수 : 기준 2명 / 최대 3명</Card.Text></Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><Card.Text style={roomInfoSize}>체크인 : 15:00 / 체크아웃: 11:00</Card.Text></Col>
                                            <Col md={6}><Card.Text style={roomInfoSize}>예약가능 방 : 1</Card.Text></Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={12}><Card.Text style={roomInfoSize}>금연시설,시티뷰,욕조, 무료 와이파이, 조식, 스파</Card.Text></Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={3}>
                                                <span style={roomInfoSize}>1박 / 222,633원</span>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Select size="sm">
                                                    <option value={0}>객실 수 선택</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                </Form.Select>
                                            </Col>
                                            <Col md={6}>
                                                <span style={roomInfoSize}>예약 인원 수 : &nbsp;</span>
                                                <Button variant="outline-dark">-</Button>
                                                &nbsp;<span style={roomInfoSize}>1</span>&nbsp;
                                                <Button variant="outline-dark">+</Button>
                                            </Col>
                                        </Row>
                                        </Card.Body>
                                    </Col>
                                    <Col md={2}>
                                            <Button variant="outline-light" style={{width: '100%', height : '100%', border: '0.01rem solid rgba(0, 0, 0, 0.175)',borderLeft: '0.1rem solid rgba(0, 0, 0, 0.175)'}}>
                                                <p style={{color:'#adb5bd', fontSize:'1rem'}}>예약하기</p>
                                            </Button>
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="mb-3">
                                <Row  md={2} className="g-0">
                                    <Col md={2}>
                                        <Card.Img style={{width : '100%', height: '100%'}} variant="bottom" src={logo2} alt={2} />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body style={{paddingBottom: '0'}}>
                                        <Row className="mb-3">
                                            <Col md={12}>
                                                <Card.Title>스탠다드 더블룸</Card.Title>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><Card.Text style={roomInfoSize}>침대 갯수 : 더블베드2개</Card.Text></Col>
                                            <Col md={6}><Card.Text style={roomInfoSize}>객실 인원 수 : 기준 2명 / 최대 3명</Card.Text></Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}><Card.Text style={roomInfoSize}>체크인 : 15:00 / 체크아웃: 11:00</Card.Text></Col>
                                            <Col md={6}><Card.Text style={roomInfoSize}>예약가능 방 : 1</Card.Text></Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={12}><Card.Text style={roomInfoSize}>금연시설,시티뷰,욕조, 무료 와이파이, 조식, 스파</Card.Text></Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={3}>
                                                <span style={roomInfoSize}>1박 / 110,000원</span>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Select size="sm">
                                                    <option value={0}>객실 수 선택</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                </Form.Select>
                                            </Col>
                                            <Col md={6}>
                                                <span style={roomInfoSize}>예약 인원 수 : &nbsp;&nbsp;</span>
                                                <Button variant="outline-dark">-</Button>
                                                &nbsp;<span style={roomInfoSize}>1</span>&nbsp;
                                                <Button variant="outline-dark">+</Button>
                                            </Col>
                                            {/* <Col sm={5}>
                                                <Row>
                                                    <Col md={5}>
                                                        <Card.Text style={roomInfoSize}>예약 인원 수</Card.Text>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button variant="outline-dark">-</Button>
                                                    </Col>
                                                    <Col md={1}>
                                                        <Card.Text style={roomInfoSize}>2</Card.Text>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button variant="outline-dark">+</Button>
                                                    </Col>
                                                </Row>
                                            </Col> */}
                                        </Row>
                                        </Card.Body>
                                    </Col>
                                    <Col md={2}>
                                            <Button variant="outline-light" style={{width: '100%', height : '100%', border: '0.01rem solid rgba(0, 0, 0, 0.175)',borderLeft: '0.1rem solid rgba(0, 0, 0, 0.175)'}}>
                                                <p style={{color:'#adb5bd', margin: '0', fontSize:'1rem'}}>예약하기</p>
                                            </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </CardBody>
                    </Card>
                </Col>
               
            </Row>
            <Row className="mb-3">
               
                <Col sm={12}>
                    <div className="d-grid">
                    <Button variant="light" style={{fontSize:'1rem'}}>모두 예약</Button>
                    </div>
                </Col>
               
            </Row>
            <Row className="mb-3"><Col sm={12} /></Row>
            <Row className="mb-3"><Col sm={12} /></Row>
            <Row><Col sm={12} /></Row>
            {props.roomModalOpen && (
                <ImageModal imgType={props.imgType} setRoomModalOpen={props.setRoomModalOpen} roomModalOpen={props.roomModalOpen} idx={props.modalIdx} imgList={props.imgType === 0 ? props.hotelInfo.image : ''} />
            )}
        </Container>
    );
}

export default InfoHotel;