import React, { useEffect, useState } from "react";
import {Row, Col,Button} from 'react-bootstrap';
import { UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import testImg from '../../pages/images/test.png';
import * as hotelMainReducer from "../../modules/hotel/hotelMainReducer";
import "./css/hotelRoomList.scss"
import star from "./images/star.png";
import noStar from "./images/no_star.png"
/* redux 영역 */
import { connect } from "react-redux";
const EsayRoomManage = (props) => { 
    const hotelList = props.form.list;
    const codeList = props.code.code;
    const [codeName, setcodeName] = useState([])
    /*useEffect(() => {
        for(var i=0; i<hotelList.length; i++){
            for(var j=0; j<codeList.length; j++){
                if(hotelList[i].tags.includes(codeList[j].code)){
                    codeName.push(codeList.name)
                }
            }
        }
        setcodeName(codeName)
    },[setcodeName])*/

    return (
        <>
            <Row className="containerTitle">
                <Col>
                    객실 간편관리
                </Col>
            </Row>
            {hotelList.map((item, index) => (
            <div className="card mb-3" key={index}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                    <img
                        className="bd-placeholder-img"
                        src={testImg}
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
                                {item.tags.includes(item2.code) ? item2.name+',' : ''}
                            </span> */}
                            <p className="card-text">
                                <small className="text-muted">
                                부가 서비스 :  {codeList.map((item2, index2) => (
                                    item.tags.includes(item2.code) ? (item2.name+',') : null
                                ))}
                                </small>
                            
                            </p>
                            <Button variant="outline-primary">
                                    {item.room_list.length > 0 ? '객실추가' : '객실등록'}
                            </Button>{' '}
                            {
                            item.room_list.length > 0 ?
                                <div className="d-flex flex-column">
                                    <Button variant="outline-dark" id="roomList">
                                        객실 조회 
                                    </Button>
                                    <UncontrolledCollapse toggler="#roomList" className="m-0 p-0">
                                        <Card>
                                            <CardBody>
                                                리액트 나도 할 수 있다! 뚝딱~!
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
    (state) => ({
        form: state.hotelMainReducer.getIn(['MY_HOTEL_LIST', 'form']),
        code : state.hotelMainReducer.getIn(['HOTEL_CODE', 'form'])
    }),
)(EsayRoomManage);