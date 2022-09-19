import React, { useEffect, useState } from 'react';
import { Modal, Button,Container, Row, Col,Form } from "react-bootstrap";

import { connect, useDispatch } from 'react-redux';
import {reservation_cancel_reason} from "../../modules/client/reservationListActions";
//객실번호 필요(일괄삭제)
const ReservationCancelReason = ({reservation_num, reservation_name, modalOpen, getData
,reservation_cancel_reason,reservationCancelReason
}) => {
    const [show, setShow] = useState(modalOpen);
    const handleClose = () => {
        setShow(false);
        getData(false);
    }

    useEffect(() => {
        reservation_cancel_reason({
            reservation_num : reservation_num,
            user_num : '00001' 
        });

    },[])
    useEffect(() => {
        if(reservationCancelReason){
            if(reservationCancelReason.result === 'OK'){
                
            }else{
                alert("취소사유 조회에 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }  
        }
    },[reservation_cancel_reason,reservationCancelReason])
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                id="batchDelete">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        취소사유
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={18} md={12}>
                                예약번호 : {reservation_num}
                            </Col>
                            <Col xs={18} md={12}>
                                예약자명 : {reservation_name}
                            </Col>
                            <Col xs={18} md={12}>
                                예약 취소자 : 고객
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={18} md={12}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>취소사유</Form.Label>
                                        <Form.Control disabled={true} as="textarea" rows={3}
                                        style={{
                                            fontSize: '0.8rem'
                                        }} 
                                        defaultValue={reservationCancelReason ? reservationCancelReason.data.content : ''}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
      )
};
export default connect(
    () =>  ({ reservationListActions}) => ({
        reservationCancelReason : reservationListActions.reservationCancelReason,

    }),
    {
        reservation_cancel_reason

    }
)(ReservationCancelReason);
