import React, { useEffect, useState } from 'react';
import { Modal, Button,Container, Row, Col, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import {client_secession,owner_secession,client_confirm,owner_confirm} from "../../modules/secessionActions"
const AuthSecession = ({type,modalOpen, closeSecessionModal,
    client_secession,clientState, client_confirm,owner_confirm,
    owner_secession,ownerState

    }) => {
    //type - 0: 고객, 1: 사업자
    const [show, setShow] = useState(modalOpen);
    const [reason, setReason] = useState('');

    const handleClose = () => {
        setShow(false);
        closeSecessionModal(false);
    }

    const handleChange = (e) => {
        setReason(e.target.value);
    }

    const handleDelete = () => {
        let data = {}
        if(type === 0){
            data = {
                "reason": "사용안함111",
                "user_num": "000001"
            }
            client_secession(data);
        }else if(type === 1){
            data = {
                "reason" : reason
            }
            owner_secession(data);
        }
    }
    useEffect(() => {
        return () => {
            if(type === 0) client_confirm();
            else owner_confirm();
        };
    },[]);

    useEffect(() => {
        if(clientState){
            if(clientState.result === 'OK'){
                alert("회원탈퇴가 완료되었습니다.");
                setShow(false);
                closeSecessionModal(false);
            }else{
                alert("회원탈퇴가 실패하였습니다. 관리자에게 문의해주세요.");
            }
        }
    },[client_secession,clientState])

    useEffect(() => {
        if(ownerState){
            if(ownerState.result === 'OK'){
                alert("회원탈퇴가 완료되었습니다.");
                setShow(false);
                closeSecessionModal(false);
            }else{
                alert("회원탈퇴가 실패하였습니다. 관리자에게 문의해주세요.");
            }
        }
    },[owner_secession,ownerState])
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                id="batchDelete">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {type === 0 ? '고객' : '사업자'} 회원 탈퇴
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={18} md={12}>
                                
                                <Form.Select onChange={handleChange}>
                                    <option value="">사유선택</option>
                                    <option value="1">{type === 0 ? '예약 불편' : '매출없음'}</option>
                                    <option value="2">{type === 0 ? '사용이 어려움' : '파산'}</option>
                                    <option value="3">{type === 0 ? '결제 불편' : '서비스 불만'}</option>
                                    <option value="4">다른사이트 이용</option>
                                    <option value="5">개인사정</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={!reason || reason === ''  ? true : false} onClick={()=> handleDelete()}>
                        회원탈퇴
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
      )
};

export default connect(
    () => ({secessionActions}) => ({
        clientState : secessionActions.client,
        ownerState : secessionActions.owner
    }),
    {
        client_secession,
        owner_secession,
        client_confirm,
        owner_confirm
    }
)(AuthSecession);
