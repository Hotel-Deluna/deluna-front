import React from "react";
import {Form, Button,Row,Col,InputGroup} from "react-bootstrap";
import { BiSearchAlt2, BiBed } from 'react-icons/bi';
import {BsPerson} from 'react-icons/bs';
import '../css/headerFilter.scss';

function HeaderFilter() {
    return (
            <Row>
            <Col>
            <div className="searchBox">
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><BiBed/></InputGroup.Text>
                        <Form.Control aria-describedby="basic-addon1" 
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="FirstDate" type="date"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="LastDate" type="date"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><BsPerson/></InputGroup.Text>
                        <Form.Control type="text" placeholder="" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Button variant="warning"><BiSearchAlt2 />검색하기</Button>
                    </InputGroup>

                </Form>
            </div>
            </Col>
            </Row>     
    )
}

export default HeaderFilter;