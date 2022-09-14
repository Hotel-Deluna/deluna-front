import React from "react";
//import Modal from "react-modal";
import { Modal, Container, Row, Col } from "react-bootstrap";
import AuthCommonForm from "./authCommonForm";
const AuthModifyForm = ({type, form, isModalOpen, closeOnClick, setInfo, onChange, onChangeNum, onClick, onSubmit, timerCheck, reTimerCheck, resetCertify}) => {
    return(
        <Modal show={isModalOpen} onHide={closeOnClick} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered>
            <Container className="joinMainCountainer" fluid="xxl">
            <Row className="justify-content-md-center">
            {/* <Col xs lg="1" /> */}
                <Col lg="12">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            회원정보 수정
                        </Modal.Title>
                    </Modal.Header>
                </Col>
            {/* <Col xs lg="1" /> */}
            </Row>
            <AuthCommonForm page='modify' type={type} form={form} closeOnClick={closeOnClick} setInfo={setInfo} onChange={onChange} onChangeNum={onChangeNum} onSubmit={onSubmit} onClick={onClick} timerCheck={timerCheck} resetCertify={resetCertify} reTimerCheck={reTimerCheck}  />
        </Container>
              
        </Modal>
    );
}

export default AuthModifyForm;