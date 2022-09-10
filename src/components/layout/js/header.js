import React, {useState, useRef} from "react";

/* 2022.08.25(한예지) : react-bootstarp을 import */
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';

/* 2022.08.25(한예지) : 호텔델루나 로고 이미지 import */
import logo from "../imges/delunaLogo.png";

/* 2022.08.25(한예지) : header.scss파일 import*/
import "../css/header.scss";

import ModifyForm from "../../../containers/auth/modifyForm";
import AuthSecession from "../../auth/authSecession";
const Header = () => {
    const [currentClick, setCurrentClick] = React.useState(null);
    
    const GetClick = (type) => {
        setCurrentClick(type);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    //고객&사업자 회원탈퇴
    const [secessionModal, setSecessionModal] = useState(false);
    const showSecessionModal = () => {
        setSecessionModal(true);
    }
    const closeSecessionModal = (modalOpen) => {
        setSecessionModal(modalOpen)
    }
    //미로그인시 뿌려줄 header
    if(!currentClick){
        return (
            <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img src={logo} className="header-logo"></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#reservation">
                                예약내역
                            </Nav.Link>
                            <Nav.Link href="#buisnessmanLogin" onClick={() => GetClick("buisnessman")}>
                                사업자 로그인
                            </Nav.Link>
                            <Nav.Link href="#userLogin" onClick={() => GetClick("user")}>
                                고객 로그인
                            </Nav.Link>
                            <Nav.Link href="/auth/login">
                                로그인
                            </Nav.Link>
                            <Nav.Link href="/auth/join">
                                회원가입
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        );
    }else{
        //고객 로그인시 뿌려줄 header
            if(currentClick == "user"){
                return(
                    <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
                        <Container fluid>
                            <Navbar.Brand href="#home">
                                <img src={logo} className="header-logo"></img>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                                <Nav>
                                    <Nav.Link href="#reservation">
                                        예약내역
                                    </Nav.Link>
                                    <NavDropdown title="고객(아이디)님" id="navbarScrollingDropdown">
                                        <NavDropdown.Item onClick={showModal}>내 정보 수정</NavDropdown.Item>
                                        <NavDropdown.Item href="#passwordChange">
                                            비밀번호 변경
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={showSecessionModal}>
                                            회원 탈퇴하기
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <Nav.Link href="#logout" onClick={() => GetClick(null)}>
                                        로그아웃
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            {isModalOpen && ( <ModifyForm type={'0'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)};
                            {secessionModal && ( <AuthSecession type={0} modalOpen={secessionModal} closeSecessionModal={closeSecessionModal} />)};
                        </Container>
                    </Navbar>
                    
                );
            //사업자 로그인시 뿌려줄 header
            }else{
                return(
                    <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
                        <Container fluid>
                            <Navbar.Brand href="#home">
                                <img src={logo} className="header-logo"></img>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                                <Nav className="me-auto">
                                    <Nav.Link href="#hotelManagement">호텔관리</Nav.Link>
                                    <Nav.Link href="#guestroomManagement">객실관리</Nav.Link>
                                    <Nav.Link href="#reservationManagement">예약관리</Nav.Link>
                                </Nav>
                                <Nav>
                                    <NavDropdown title="사업자(아이디)님" id="navbarScrollingDropdown">
                                        <NavDropdown.Item onClick={showModal}>내 정보 수정</NavDropdown.Item>
                                        <NavDropdown.Item href="#passwordChange">
                                            비밀번호 변경
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={showSecessionModal}>
                                            회원 탈퇴하기
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <Nav.Link href="#logout" onClick={() => GetClick(null)}>
                                        로그아웃
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            {isModalOpen && ( <ModifyForm type={'1'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)};
                            {secessionModal && ( <AuthSecession type={1} modalOpen={secessionModal} closeSecessionModal={closeSecessionModal} />)};
                        </Container>
                    </Navbar>
                    
                    
                    
                );            
            } 
        
    }
};

export default Header;
