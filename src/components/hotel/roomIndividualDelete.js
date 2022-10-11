import React, { useEffect, useState } from 'react';
import { Modal, Button,Container, Row, Col } from "react-bootstrap";
import "./css/roomModal.scss";
import { individual_delete_info, individual_delete, individual_delete_confirm } from '../../modules/hotel/roomDeleteActions';
import * as roomDeleteReducer from "../../modules/hotel/roomDeleteReducer";
//import {batch_delete_info, batch_delete, batch_delete_confirm, room_code} from "../../modules/hotel/roomDeleteActions"; 

import { connect, useDispatch } from 'react-redux';

//객실번호 필요(일괄삭제)
const RoomIndividualDelete = ({room_detail_num,modalOpen,getData,individual_delete_info, infoState,hotel,
    individualDeleteInfo, individual_delete, deleteState,individual_delete_confirm}) => {
    const [show, setShow] = useState(modalOpen);
    const roomInfo = individualDeleteInfo.form.info
    const handleClose = () => {
        setShow(false);
        getData(false); //esayRoomManage.js(부모컴포넌트)한테 모달 fasle 전달
    }
    const handleDelete = () => {
        individual_delete(room_detail_num);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        individual_delete_info(room_detail_num);
        return () => {
            individual_delete_confirm();
        };
    },[]);

    useEffect(() => {
        if(infoState){
            if(infoState.result === 'OK'){
                console.log(infoState)
                dispatch(roomDeleteReducer.roomIndividualDeleteInfo({data : infoState.data}))
            }else{
                alert("해당 객실 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
        }
    },[individual_delete_info,infoState]);

    useEffect(() => {
        if(deleteState){
            console.log(deleteState)
            if(deleteState.result === 'OK'){
                alert("객실 삭제가 완료 되었습니다.");
                setShow(false);
                getData("delete");
            }else{
                alert("객실 삭제가 실패하였습니다. 관리자게에 문의해주세요.");
                setShow(false);
                getData(false);
            }
        }
    },[individual_delete,deleteState]);
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                id="individualDelete">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        호실 삭제
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={18} md={12}>
                                삭제 호실 :  <b>{roomInfo.room_name} {roomInfo.name}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={18} md={12}>
                                삭제하실 경우 고객들은 해당 객실을 이용할 수 없으며, <br />
                                기존에 예약되어 있던 고객들은 이용이 가능합니다. <br />
                                만약, 객실삭제 시 예약고객이 있을 경우 <br />
                                최종예약날짜{roomInfo.last_reservation_date ? '('+roomInfo.last_reservation_date.split('T')[0]+')' : ''} 이후 객실이 삭제됩니다.
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDelete}>
                        삭제
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
      )
};

export default connect(
    () => ({roomDeleteActions,roomDeleteReducer}) => ({
        infoState : roomDeleteActions.individualDeleteInfo,
        individualDeleteInfo : roomDeleteReducer.getIn(['ROOM_INDIVIDUAL_DELETE_INFO'],'form'),
        deleteState : roomDeleteActions.individualDelete
    }),
    {
        individual_delete_info,
        individual_delete,
        individual_delete_confirm
    }
)(RoomIndividualDelete);
