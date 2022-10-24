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
import RoomRegister from "../../../containers/hotel/roomRegister";
import Reservation from "../../client/nonMemberReservation";

import {useNavigate } from 'react-router-dom'
//임시 토큰을 위한 axios (지워야함)
import axios from "axios";
const Header = () => {
    const [currentClick, setCurrentClick] = React.useState(null);
    let navigate = useNavigate(); //페이지 이동 : react v6부터 useHistory -> useNavigate
    //정보수정
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    //객실등록수정
    const [roomModalOpen, setRoomModalOpen] = useState(false);
    const showRoomModal = () => {
        setRoomModalOpen(true);
    };

    //고객&사업자 회원탈퇴
    const [secessionModal, setSecessionModal] = useState(false);
    const showSecessionModal = () => {
        setSecessionModal(true);
    }
    const closeSecessionModal = (modalOpen) => {
        setSecessionModal(modalOpen)
    }

    //비회원 예약내역 조회
    const [reservation, setReservation] = useState(false);
    const showReservationModal = () => {
        setReservation(true);
    };

    const closeReservation = (modalOpen) => {
        setReservation(modalOpen);
    }
    
    //로그아웃
    const logout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate("/");
    }

    
    //임시 토큰 생성 코드 (지워야함)
    const createToken = () => {
        axios.get("http://43.200.222.222:8080/common/create/token", {
            params: {
                user_num : 6,
                user_role : 2
            }
          })
          .then(function (response) {
            console.log(response)
                localStorage.setItem('accessToken',response.data)
                localStorage.setItem('refreshToken',response.data)
                localStorage.setItem('role',2);
                navigate("/auth/hotel/main");
                // localStorage.setItem('jwtToken','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cGRsNTgzMkBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9NRU1CRVIiLCJleHAiOjE2NjQ4ODA2OTJ9.W9Ltym_kNblL2Fqb3S2XNCeodJyNvGM5cKgBWegNlXVb75Lpp1w9a-31DhvcBJA2YFyYV2vSthVv4u8x7KEXlA')
                // localStorage.setItem('email','tpdl5832@naver.com');
                // localStorage.setItem('role',1);
                // axios.defaults.headers.common[
                //     "Authorization"
                // ] = `Bearer ${response.data}`;
               // response  
          }).catch(function (error) {
              // 오류발생시 실행
          }).then(function() {
              // 항상 실행
          });
        
    }
    return(
        <>
            <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
                
                    {
                        //고객로그인시
                        localStorage.getItem('role') === '1'?
                            <Container fluid>
                                <Navbar.Brand href="/">
                                    <img src={logo} className="header-logo"></img>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                                    <Nav>
                                        <Nav.Link href="/reservationList">
                                            예약내역
                                        </Nav.Link>
                                        <NavDropdown title={localStorage.getItem('email') ? localStorage.getItem('email').split('@')[0]+'님' : null} id="navbarScrollingDropdown">
                                            <NavDropdown.Item onClick={showModal}>내 정보 수정</NavDropdown.Item>
                                            <NavDropdown.Item href="/auth/changePassword">
                                                비밀번호 변경
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={showSecessionModal}>
                                                회원 탈퇴하기
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                        <Nav.Link onClick={() => logout()}>
                                            로그아웃
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                                {isModalOpen && ( <ModifyForm type={'0'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)};
                                {secessionModal && ( <AuthSecession type={0} modalOpen={secessionModal} closeSecessionModal={closeSecessionModal} />)};
                            </Container>
                        :
                        //사업자 로그인시
                        localStorage.getItem('role') === '2' ?
                            <Container fluid>
                                <Navbar.Brand href="/auth/hotel/main">
                                    <img src={logo} className="header-logo"></img>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/auth/hotel/main">호텔관리</Nav.Link>
                                        {/* <Nav.Link onClick={showRoomModal}>객실관리</Nav.Link> */}
                                        <Nav.Link href="/auth/hotel/roomList">객실관리</Nav.Link>
                                        <Nav.Link href="/auth/hotel/reservationList">예약관리</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <NavDropdown title={localStorage.getItem('email') ? localStorage.getItem('email').split('@')[0]+'님' : null} id="navbarScrollingDropdown">
                                            <NavDropdown.Item onClick={showModal}>내 정보 수정</NavDropdown.Item>
                                            <NavDropdown.Item href="/auth/changePassword">
                                                비밀번호 변경
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={showSecessionModal}>
                                                회원 탈퇴하기
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                        <Nav.Link onClick={() => logout()}>
                                            로그아웃
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                                {isModalOpen && ( <ModifyForm type={'1'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)};
                                {secessionModal && ( <AuthSecession type={1} modalOpen={secessionModal} closeSecessionModal={closeSecessionModal} />)};
                                {roomModalOpen && (<RoomRegister setRoomModalOpen={setRoomModalOpen} roomModalOpen={roomModalOpen} />)}
                            </Container>
                        //미로그인시
                        :
                            <Container fluid>
                                <Navbar.Brand href="/">
                                <img src={logo} className="header-logo"></img>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                                    <Nav>
                                        {/* <Nav.Link onClick={createToken}>
                                            임시토큰생성
                                        </Nav.Link> */}
                                        <Nav.Link onClick={showReservationModal}>
                                            예약내역
                                        </Nav.Link>
                                        <Nav.Link href="/auth/login">
                                            로그인
                                        </Nav.Link>
                                        <Nav.Link href="/auth/join">
                                            회원가입
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                                {reservation && ( <Reservation modalOpen={reservation} closeReservation={closeReservation} />)};
                            </Container>
                    }
                    
                
            </Navbar>
        </>
    )
    

    //미로그인시 뿌려줄 header
    // if(!currentClick){
    //     return (
    //         <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
    //             <Container fluid>
    //                 <Navbar.Brand href="/">
    //                     <img src={logo} className="header-logo"></img>
    //                 </Navbar.Brand>
    //                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //                 <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    //                     <Nav>
    //                         <Nav.Link onClick={createToken}>
    //                             임시토큰생성
    //                         </Nav.Link>
    //                         <Nav.Link onClick={showReservationModal}>
    //                             예약내역
    //                         </Nav.Link>
    //                         <Nav.Link href="#buisnessmanLogin" onClick={() => GetClick("buisnessman")}>
    //                             사업자 로그인
    //                         </Nav.Link>
    //                         <Nav.Link href="#userLogin" onClick={() => GetClick("user")}>
    //                             고객 로그인
    //                         </Nav.Link>
    //                         <Nav.Link href="/auth/login">
    //                             로그인
    //                         </Nav.Link>
    //                         <Nav.Link href="/auth/join">
    //                             회원가입
    //                         </Nav.Link>
    //                     </Nav>
    //                 </Navbar.Collapse>
    //                 {reservation && ( <Reservation modalOpen={reservation} closeReservation={closeReservation} />)};
    //             </Container>
    //         </Navbar>
            
    //     );
    // }else{
    //     //고객 로그인시 뿌려줄 header
    //         if(currentClick == "user"){
    //             return(
    //                 <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
    //                     <Container fluid>
    //                         <Navbar.Brand href="/">
    //                             <img src={logo} className="header-logo"></img>
    //                         </Navbar.Brand>
    //                         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //                         <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    //                             <Nav>
    //                                 <Nav.Link href="/reservationList">
    //                                     예약내역
    //                                 </Nav.Link>
    //                                 <NavDropdown title="고객(아이디)님" id="navbarScrollingDropdown">
    //                                     <NavDropdown.Item onClick={showModal}>내 정보 수정</NavDropdown.Item>
    //                                     <NavDropdown.Item href="#passwordChange">
    //                                         비밀번호 변경
    //                                     </NavDropdown.Item>
    //                                     <NavDropdown.Item onClick={showSecessionModal}>
    //                                         회원 탈퇴하기
    //                                     </NavDropdown.Item>
    //                                 </NavDropdown>

    //                                 <Nav.Link href="#logout" onClick={() => GetClick(null)}>
    //                                     로그아웃
    //                                 </Nav.Link>
    //                             </Nav>
    //                         </Navbar.Collapse>
    //                         {isModalOpen && ( <ModifyForm type={'0'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)};
    //                         {secessionModal && ( <AuthSecession type={0} modalOpen={secessionModal} closeSecessionModal={closeSecessionModal} />)};
    //                     </Container>
    //                 </Navbar>
                    
    //             );
    //         //사업자 로그인시 뿌려줄 header
    //         }else{
    //             return(
    //                 <Navbar collapseOnSelect expand="md" className="nav-color" variant="dark">
    //                     <Container fluid>
    //                         <Navbar.Brand href="/">
    //                             <img src={logo} className="header-logo"></img>
    //                         </Navbar.Brand>
    //                         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //                         <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    //                             <Nav className="me-auto">
    //                                 <Nav.Link href="#hotelManagement">호텔관리</Nav.Link>
    //                                 <Nav.Link onClick={showRoomModal}>객실관리</Nav.Link>
    //                                 <Nav.Link href="#reservationManagement">예약관리</Nav.Link>
    //                             </Nav>
    //                             <Nav>
    //                                 <NavDropdown title="사업자(아이디)님" id="navbarScrollingDropdown">
    //                                     <NavDropdown.Item onClick={showModal}>내 정보 수정</NavDropdown.Item>
    //                                     <NavDropdown.Item href="#passwordChange">
    //                                         비밀번호 변경
    //                                     </NavDropdown.Item>
    //                                     <NavDropdown.Item onClick={showSecessionModal}>
    //                                         회원 탈퇴하기
    //                                     </NavDropdown.Item>
    //                                 </NavDropdown>

    //                                 <Nav.Link href="#logout" onClick={() => GetClick(null)}>
    //                                     로그아웃
    //                                 </Nav.Link>
    //                             </Nav>
    //                         </Navbar.Collapse>
    //                         {isModalOpen && ( <ModifyForm type={'1'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)};
    //                         {secessionModal && ( <AuthSecession type={1} modalOpen={secessionModal} closeSecessionModal={closeSecessionModal} />)};
    //                         {roomModalOpen && (<RoomRegister setRoomModalOpen={setRoomModalOpen} roomModalOpen={roomModalOpen} />)}
    //                     </Container>
    //                 </Navbar>
                    
                    
                    
    //             );            
    //         } 
        
    // }
};

export default Header;
