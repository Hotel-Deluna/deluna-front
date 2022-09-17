import React, { useEffect, useState } from 'react';
import { Modal, Button,Container, Row, Col } from "react-bootstrap";
import "./css/roomModal.scss";

import * as roomDeleteReducer from "../../modules/hotel/roomDeleteReducer";
import {batch_delete_info, batch_delete, batch_delete_confirm, room_code} from "../../modules/hotel/roomDeleteActions"; 

import { connect, useDispatch } from 'react-redux';
import { getDefaultNormalizer } from '@testing-library/react';
//객실번호 필요(일괄삭제)
const RoomBatchDelete = ({room_num,infoState,batch_delete_info,batchDeleteInfo, modalOpen, getData,
    batch_delete, deleteState, batch_delete_confirm, room_code,codeState
}) => {
    const [show, setShow] = useState(modalOpen);
    const [commonRoomTag, setCommonRoomTag] = useState([]);
    const handleClose = () => {
        setShow(false);
        getData(false); //esayRoomManage.js(부모컴포넌트)한테 모달 fasle 전달
    }
    const dispatch = useDispatch();
    
    //객실 상세정보 조회
    useEffect(() => {
        batch_delete_info(room_num);
        room_code();
        return () => {
            batch_delete_confirm();
        };
    },[]);

    //객실 상세정보 조회된 값 dispatch
    useEffect(() => {
        if(infoState){
            if(infoState.result === 'OK'){
                dispatch(roomDeleteReducer.roomBatchDeleteInfo({ data : infoState.data}));
            }else{
                alert("해당 객실 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
        }
    },[batch_delete_info,infoState]);

    //객실 삭제 요청
    const handleDelete = () => {
        batch_delete(room_num);
    }
    useEffect(() => {
        if(deleteState){
            if(deleteState.result === 'OK'){
                alert("객실 삭제가 완료 되었습니다.");
                setShow(false);
                getData(false);
            }else{
                alert("객실 삭제가 실패하였습니다. 관리자게에 문의해주세요.")
            }
        }
    },[batch_delete,deleteState]);

    useEffect(() => {
        if(codeState){
            if(codeState.result === 'OK'){
                setCommonRoomTag(codeState.data)
            }   
        }
    },[room_code,codeState])
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                id="batchDelete">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        객실 삭제
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={9} md={6}>
                                객실명 : {batchDeleteInfo.form.info.name}
                            </Col>
                            <Col xs={9} md={6}>
                                기준인원/최대인원 :{batchDeleteInfo.form.info.minimum_people}명/{batchDeleteInfo.form.info.maximum_people}명
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={9} md={6}>
                                체크인/체크아웃 시간 : {batchDeleteInfo.form.info.check_in_time} ~ {batchDeleteInfo.form.info.check_out_time}
                            </Col>
                            <Col xs={9} md={6}>
                                객실 수 : {batchDeleteInfo.form.info.reservable_room_count}개
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={9} md={6}>
                                싱글베드 수 : {batchDeleteInfo.form.info.single_bed_count}개
                            </Col>
                            <Col xs={9} md={6}>
                                더블베드 수 : {batchDeleteInfo.form.info.double_bed_count}개
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={9} md={6}>
                                비성수기가격<br />
                                주중(일~월) 가격 : {batchDeleteInfo.form.info.weekday_price}원<br />
                                주말(금,토) 가격 : {batchDeleteInfo.form.info.weekend_price}원
                            </Col>
                            <Col xs={9} md={6}>
                                성수기 가격 <br />
                                주중(일~월) 가격 : {batchDeleteInfo.form.info.p_weekday_price}원<br />
                                주말(금,토) 가격 : {batchDeleteInfo.form.info.p_weekend_price}원
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={18} md={12}>
                                태그 : 
                                {commonRoomTag.map((item, index) => (
                                        batchDeleteInfo.form.info.tags.includes(item.code) ? (' ☑'+item.name) : null
                                    ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={18} md={12}>
                                삭제하실 경우 고객들은 해당 객실을 이용 할 수 없으며, <br />
                                기존에 예약되어 있던 고객들은 이용이 가능합니다.<br />
                                만약, 객실 삭제 시 예약 고객이 있을 경우<br />
                                최종예약날짜({batchDeleteInfo.form.info.last_reservation_date ? batchDeleteInfo.form.info.last_reservation_date.split('T')[0] : ''}) 이후 객실이 삭제됩니다. 
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={18} md={12} className="accentContent">
                                삭제하시겠습니까?
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDelete}>
                        예
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
      )
};

export default connect(
    () => ({roomDeleteActions,roomDeleteReducer}) => ({
        infoState : roomDeleteActions.batchDeleteInfo,
        batchDeleteInfo : roomDeleteReducer.getIn(['ROOM_BATCH_DELETE_INFO'],'form'),
        deleteState : roomDeleteActions.batchDelete,
        codeState : roomDeleteActions.code

    }),
    {
        batch_delete_info,
        batch_delete,
        batch_delete_confirm,
        room_code
    }
)(RoomBatchDelete);
