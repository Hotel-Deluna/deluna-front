import React from "react";
import HeaderFilter from "./layout/js/headerFilter";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import { VscTriangleLeft, VscTriangleRight, VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
const MainComponent = ({city_list, onClick, imgIdx, maxImgIdx,btnClick}) => {
    const subTitleDiv = {
        width : '100%',
        backgroundColor : '#162547',
        color : '#ECD169',
        textAlign : 'center',
        marginBottom : '0'
    };
    const halfLine = {
        width : '100%',
        backgroundColor : '#162547',
        minHeight : '5rem'
    }
    const colAlign = {
        textAlign : 'left'
    }
    const angleBtn = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    const btnSize = {
        fontSize : '1.3rem'
    }
    return(
    <>
        <div style={subTitleDiv}>
            <h5 style={{marginBottom : '0'}}>호텔, 리조트, 호스텔 등<br />전 세계 200만 개 이상의 다양한 숙소를 베스트 요금으로 예약하세요!</h5>
        </div>
        <div style={halfLine} />
        <Container fluid="xxl" style={{marginTop: '-2.5rem'}}>
            <Row className="justify-content-md-center mb-3">
                <Col sm={12}>
                    <HeaderFilter />
                </Col>
            </Row>
            <Row className="justify-content-md-center mb-3">
                <Col sm={12} />
            </Row>
            <Row>
                <Col sm={12} style={colAlign}>
                    <h5>대한민국 여행지</h5>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm={12} style={colAlign}>
                    <h6 style={{color : '#737586'}}>즐길 거리가 가득한 인기여행지들을 살펴보세요.</h6>
                </Col>
                <Col sm={8} />
            </Row>
            <Row className="mb-3">
                {/* 리스트 부분 */}
                {
                    city_list !== undefined && (
                        <>
                        {imgIdx !== 0 
                        ? 
                            <Col sm={1} style={angleBtn}>
                                <div className="d-block d-sm-none d-grid">
                                    <Button variant="light" name='minus' onClick={btnClick} style={btnSize}><VscTriangleUp /></Button>
                                </div>
                                <div className="d-none d-sm-block d-grid">
                                    <Button variant="light" name='minus' onClick={btnClick} style={btnSize}><VscTriangleLeft /></Button>
                                </div>
                            </Col>
                        :
                            <Col sm={1} />
                        }
                        {city_list.map((item, index) => (
                             index < (imgIdx+5) && (
                                imgIdx <= index && (
                                    <Col sm={2} key={index} style={{padding : '0.3rem'}}>
                                        <Figure style={{ width: '100%' }} onClick={(e) => onClick(index)}>
                                            <Figure.Image roundedCircle variant="top" src={item.image} alt={index} />
                                            <Figure.Caption style={{textAlign : 'center'}}>
                                                <b style={{color: '#000'}}>{item.tourist_spot_name}</b>
                                                <br />
                                                숙소 {item.hotel_count} 개
                                            </Figure.Caption>
                                        </Figure>
                                    </Col>
                                )
                             )
                        ))}
                        {(imgIdx+5) <  maxImgIdx
                        ?
                            <Col sm={1} style={angleBtn}>
                                <div className="d-block d-sm-none d-grid">
                                    <Button variant="light" name='plus' onClick={btnClick} style={btnSize}><VscTriangleDown /></Button>
                                </div>
                                <div className="d-none d-sm-block d-grid">
                                    <Button variant="light" name='plus' onClick={btnClick} style={btnSize}><VscTriangleRight /></Button>
                                </div>
                            </Col>
                        :
                            <Col sm={1} />
                        
                        }
                        </>
                    )
                }
            </Row>
        </Container>
    </>
    );
}

export default MainComponent;