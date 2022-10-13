import React from "react";
import Login from "../../containers/auth/loginForm";

import { Modal } from "react-bootstrap";


const AuthLoginModal = (props) => {

    const closeOnClick = () => {//모달 닫기
        props.setLoginModalOpen(false);
    }
    

    return(
        <Modal size="lg"  show={props.loginModalOpen} backdrop="static" onHide={closeOnClick} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <h5>로그인</h5>
            </Modal.Header>
            <Modal.Body style={{padding : 0}}>
                <Login page={1} closeOnClick={closeOnClick} setLoginCheck={props.setLoginCheck} />
            </Modal.Body>
        </Modal>
        
    );
}

export default AuthLoginModal;