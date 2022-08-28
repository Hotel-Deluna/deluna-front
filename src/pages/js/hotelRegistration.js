import React from "react";
/* 2022.08.25(한예지) : react-bootstarp을 import */
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';

/* 2022.08.25(한예지) : 호텔델루나 로고 이미지 import */
import logo from "../../components/layout/imges/delunaLogo.png";

/* 2022.08.25(한예지) : header.scss파일 import*/
import "../../components/layout/css/header.scss";
const hotelRegistration = () => {
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
                    <Nav.Link href="#buisnessmanLogin">
                        사업자 로그인
                    </Nav.Link>
                    <Nav.Link href="#userLogin">
                        고객 로그인
                    </Nav.Link>
                    <Nav.Link href="#join">
                        회원가입
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default hotelRegistration;