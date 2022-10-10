import React, { useEffect, useState } from 'react';
import { Modal, Button,Container, Row, Col, Form } from "react-bootstrap";
import "./css/roomModal.scss";

import { connect, useDispatch } from 'react-redux';
import {hotel_delete, hotel_delete_confirm} from "../../modules/hotel/hotelMainActions";
//객실번호 필요(일괄삭제)
const HotelDelete = ({hotel_name,hotel_num,modalOpen,getData,
    deleteState, hotel_delete, hotel_delete_confirm, deleteCode}) => {
    const [show, setShow] = useState(modalOpen);
    const [deleteReason, setDeleteReason] = useState('');
    
    const handleClose = () => {
        setShow(false);
        getData(false); //esayRoomManage.js(부모컴포넌트)한테 모달 fasle 전달
    }

    const handleChange = (e) => {
        setDeleteReason(e.target.value);
    }

    const handleDelete = () => {
        const data = {
            "hotel_num" : hotel_num,
            "reason" : deleteReason
        }
        hotel_delete(data)
    }

    useEffect(() => {
        if(deleteState){
            if(deleteState.result === 'OK'){
                alert("호텔 삭제가 완료되었습니다.");
                setShow(false);
                getData(false);
                deleteCode("OK");

            }else{
                alert("호텔 삭제가 실패하였습니다. 관리자에게 문의해주세요.");
            }
        }
    },[hotel_delete,deleteState])

    useEffect(() => {
        return () => {
            hotel_delete_confirm();
        };
    },[]);
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                id="batchDelete">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        호텔 삭제
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={18} md={12}>
                                호텔명 : {hotel_name}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={18} md={12}>
                                <Form>
                                    <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                    >
                                    <Form.Label>삭제사유</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={handleChange}/>
                                    </Form.Group>
                                </Form>
                                <p>삭제 시 더 이상 고객들이 해당 호텔을 이용할 수 없습니다.</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={!deleteReason || deleteReason === ''  ? true : false} 
                        onClick={() => handleDelete()}>
                        확인
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
      )
};

export default connect(
    () => ({hotelMainActions}) => ({
        deleteState : hotelMainActions.hotelDelete
    }),
    {
        hotel_delete,
        hotel_delete_confirm
    }
)(HotelDelete);
