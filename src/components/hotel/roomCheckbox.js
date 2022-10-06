import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const RoomCheckBox = (props) => {
    return(
        <>
        <Row className="align-items-center mb-3">
            <Col sm={12}>
                <Row className="md-3">
                    <Form.Label>태그</Form.Label>
                    <Col sm={12}>
                        {props.checkbox.map((item, index) => (
                            index < 5 && (
                                <Form.Check inline key={index} label={item.name} value={item.value} onChange={props.checkedList} name={'checkbox_'+index} type='checkbox' checked={props.tags.indexOf(item.value) !== -1 ? true : false} />
                            )
                        ))}
                    </Col>
                </Row>
                <Row className="md-3">
                <Col sm={12}>
                    {props.checkbox.map((item, index) => (
                        index > 4 && (
                            <Form.Check inline key={index} label={item.name} value={item.value} onChange={props.checkedList} name={'checkbox_'+index} type='checkbox' checked={props.tags.indexOf(item.value) !== -1 ? true : false}  />
                        )
                    ))}
                </Col>            
                
                </Row>
            </Col>
        </Row>
        </>
    );
}

export default RoomCheckBox;