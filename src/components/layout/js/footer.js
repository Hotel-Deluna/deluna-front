import React from "react";
import Accordion from 'react-bootstrap/Accordion';
//import Table from 'react-bootstrap/Table';
import logo from '../images/delunaLogo_128.png';
import '../css/footer.scss';

function Developer({ info }) {
    return (
          <ul className="footer_ul">
            <li><b>{info.position}</b></li>
            {info.name_list.map(lists => (<Names namelist={lists} />)) }
          </ul>
    );
 }

 function Names({namelist}){
    return (
        <li>
            {namelist.username}
            <br/>
            {namelist.email}
        </li>
    )
 }

 function SkillOut({skill_list}) {
    const skillname = skill_list.skills.map((skill) => <li>{skill}</li>);
    return (
        <ul className="footer_ul">
            <li>{skill_list.title} SKILLS</li>
            {skillname}
        </ul>
    );
 }


const Footer = () => {
    let developer = [
        {
            position : 'BACK-END',
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
            position : 'FRONT-END',
            name_list : [{
                username : '한예지',
                email : 'tpdl5832@naver.com'
              },
              {
                  username : '이준표',
                  email : '2junticket@gmail.com'
              }]
        },
        {
            position : 'PM',
            name_list : [ {
                username : '박문수',
                email : '@gmail.com'
            }]
        }
    ];
    let git_addr = 'https://github.com/Hotel-Deluna';
    let skillarr = [
        {
            title : 'back-end',
            skills : ['java(openjdk17)', 'redis', 'spring boot', 'spring security', 'jwt', 'lombok']
        },
        {
            title : 'front-end',
            skills : ['node.js(16.17.0)', 'react(18.2.0)', 'scss', 'react-bootstrap', 'HTML5']
        },
        {
            title : 'common',
            skills : ['형상관리 : git', 'DB : mariaDB', 'cloud : aws, 카페24, oracle cloud', 'api 관리 : swagger']
        }
    ];
    return (
        <div id="footer" className="mt-auto">
            <Accordion defaultActiveKey="0" >
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        {developer.map(list => (<Developer info={list} />)) }
                    </Accordion.Header>
                    <Accordion.Body>
                        {skillarr.map(skill_value => (<SkillOut skill_list={skill_value} />)) }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
};

export default Footer;
