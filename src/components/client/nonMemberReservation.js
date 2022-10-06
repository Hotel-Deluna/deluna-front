import React, { useEffect, useState } from 'react';
import { Modal, Button,Container, Row, Col,Form } from "react-bootstrap";

import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {nonmember_reservation_list, reservation_reset} from "../../modules/client/reservationListActions";
//객실번호 필요(일괄삭제)
const NonMemberReservation = ({modalOpen, closeReservation,nonmember_reservation_list,nonReservation,reservation_reset}) => {
    const [show, setShow] = useState(modalOpen);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [reservationNum, setReservationNum] = useState('');
    const handleClose = () => {
        setShow(false);
        closeReservation(false);
    }
    const handleInput = (e) => {
        if(e.target.id === 'formName'){
            setName(e.target.value)
        }else if(e.target.id === 'formPhone'){
            setPhone(e.target.value)
        }else if(e.target.id === 'formReservation'){
            setReservationNum(e.target.value)
        }
        
    }

    const reservationSelect = () => {
        nonmember_reservation_list({
            name : name,
            phone_num : phone,
            reservation_num : reservationNum
        })
    }
    let navigate = useNavigate();

    useEffect(() => {
        if(nonReservation){
            if(nonReservation.result === 'OK'){
                navigate("/reservationList");
                
            }else{
                alert("일치하는 예약정보가 없습니다.");
            }
            reservation_reset();

        }
        return () => {
            setShow(false);
            closeReservation(false);   
        };
    },[nonmember_reservation_list,nonReservation]);
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                id="batchDelete">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        비회원 예약 내역 조회
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>이름</Form.Label>
                            <Form.Control type="text" placeholder="홍길동" onChange={handleInput}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>휴대폰 번호</Form.Label>
                            <Form.Control type="phone" placeholder="-을 제외하고 입력해주세요." onChange={handleInput}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formReservation">
                            <Form.Label>예약번호</Form.Label>
                            <Form.Control type="number" placeholder="예약번호를 입력해주세요." onChange={handleInput}/>
                        </Form.Group>
                    </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                    disabled={!name || !phone || !reservationNum}
                    onClick={() => reservationSelect()}
                    >
                        조회하기
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
    () =>  ({ reservationListActions}) => ({
        nonReservation : reservationListActions.nonReservation,

    }),
    {
        nonmember_reservation_list,
        reservation_reset

    }
)(NonMemberReservation);
