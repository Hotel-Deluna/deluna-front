import React from "react";
import {Form, Button,Container,Row,Col} from "react-bootstrap";
import '../css/hotelSearch.scss';

function HotelSearch() {
    return (
        <Container>
            <Row>
            <Col>
            <div className="searchBox">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="region" placeholder="" />
                            <Form.Control type="region" placeholder="" />
                            <Form.Control type="region" placeholder="" />
                            <Form.Control type="region" placeholder="" />
                            <Button variant="warning">검색하기</Button>
                        </Form.Group>  
                        
                    </Form>
            </div>
            </Col>
            </Row>     
        </Container>
    )
}

export default HotelSearch;