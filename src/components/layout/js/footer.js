import React from "react";
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import '../css/footer.scss';
import gitlogo from '../imges/github_logo.png';
/**
 * 
 * 풋터
 * 
 */
const Footer = () => {
    let developer = [
        {
            position : 'PM',
            name_list : [ {
                username : '박문수',
                email : 'monsu1016@gmail.com'
            }]
        },
        {
            position : 'BACKEND DEVELOPER',
            name_list : [ {
                username : '한동희',
                email : 'sms44556688@gmail.com'
              },
              {
                  username : '김영수',
                  email : 'surfingboy0914@gmail.com'
              }]
        },
        {
            position : 'FRONTEND DEVELOPER',
            name_list : [{
                username : '한예지',
                email : 'tpdl5832@naver.com'
              },
              {
                  username : '이준표',
                  email : '2junticket@gmail.com'
              }]
        }
    ];
    let git_addr = 'https://github.com/Hotel-Deluna';
    let skillarr = [
        {
            title : 'COMMON',
            skills : ['SERVER : AWS', 'IMAGE-SERVER : AWS S3','DB : mariaDB', 'CLOUD : cafe24, oracle cloud', 'API Tools : swagger', 'SCM : git']
        },
        {
            title : 'BACKEND',
            skills : ['java - open jdk 17', 'spring cloud gateway', 'spring boot', 'spring security', 'JWT', 'lombok']
        },
        {
            title : 'FRONTEND',
            skills : ['node.js - 16.17.0', 'react - 18.2.0', 'react-bootstrap', 'HTML5', 'Sass(SCSS)']
        }
    ];
    return (
        <footer className="navbar-fixed-bottom">
            <Navbar bg="gray" expand="lg" id="navbar_border">
                <Container id="container_center">
                    <Row lg={7} className="vertical-center">
                            {developer.map((value,index) =>(<Col sm id="title_col" key={'developer'+index}>
                                <b className="title_text">{value.position}</b>
                                {value.name_list.map((value, index)=>(<p key={index} className="sub_text">{value.username} <br /> {value.email}</p>))}
                            </Col>))}
                        <Col sm id="git_col">
                            <Navbar.Brand href={git_addr} target="_blank">
                                <img src={gitlogo} className="footer-logo" alt="gitlogo" />
                            </Navbar.Brand>
                            <br />
                            <b className="title_text">© 2022 Copyright: Hotel Deluna</b>
                        </Col>
                            {skillarr.map((value, index) => (<Col sm key={'skill'+index}>
                                <b className="title_text">{value.title} SKILLS</b>
                                <div className="sub_text">{value.skills.map((value, index)=>(<p key={index} className="sub_text">{value}</p>))}</div>
                            </Col>))}
                    </Row>
                </Container>
            </Navbar>
        </footer>
    )
};

export default Footer;
