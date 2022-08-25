import React from "react";
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import '../css/footer.scss';
import gitlogo from '../imges/github_logo.png';
function Developer({ info }) {
    return (
          <Col sm>
            <b className="title_text">{info.position}</b>
            {info.name_list.map(lists => (<Names namelist={lists} />)) }   
          </Col>
    );
 }

 function Names({namelist}){
    return (
        <p className="sub_text">
            {namelist.username} <br/> {namelist.email}
        </p>
    )
 }

 function SkillOut({skill_list}) {
    const skillname = skill_list.skills.map((skill) => <p className="skill_text">{skill}</p>);
    return (
        <Col sm>
            <b className="title_text">{skill_list.title} SKILLS</b>
            <p className="sub_text">{skillname}</p>
        </Col>
    );
 }


const Footer = () => {
    let developer = [
        {
            position : 'PM',
            name_list : [ {
                username : '박문수',
                email : 'cccccc@gmail.com'
            }]
        },
        {
            position : 'BACKEND DEVELOPER',
            name_list : [ {
                username : '한동희',
                email : 'aaaaaa@gmail.com'
              },
              {
                  username : '김영수',
                  email : 'bbbbbb@gmail.com'
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
            title : 'BACKEND',
            skills : ['java - open jdk 17', 'redis', 'spring boot', 'spring security', 'jwt', 'lombok']
        },
        {
            title : 'FRONTEND',
            skills : ['node.js - 16.17.0', 'react - 18.2.0', 'react-bootstrap', 'scss', 'HTML5']
        },
        {
            title : 'COMMON',
            skills : ['SERVER : aws','SCM : git', 'DB : mariaDB', 'CLOUD : aws, cafe24, oracle cloud', 'API Tools : swagger']
        }
    ];
    return (
        <footer className="navbar-fixed-bottom">
            <Navbar bg="gray" expand="lg">
                <Container id="container_center">
                    <Row className="vertical-center">
                        {developer.map(list => (<Developer info={list} />))}
                        <Col sm id="git_col">
                            <Navbar.Brand href={git_addr} target="_blank">
                                <img src={gitlogo} className="footer-logo" />
                            </Navbar.Brand>
                            <br />
                            <b className="title_text">© 2022 Copyright: Hotel-Deluna</b>
                        </Col>
                        {skillarr.map(skill_value => (<SkillOut skill_list={skill_value} />))}
                    </Row>
                </Container>
            </Navbar>
        </footer>
    )
};

export default Footer;
