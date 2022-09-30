import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const RoomDetailListTable =  ({}) => {
    return (
        <Container fluid="xxl">
            <Row className="justify-content-md-center">
                <Col sm={12}>
                    <Table>
                        <thead>
                            <th>객실명</th>
                            <th>기준인원/최대인원</th>
                            <th>체크인/체크아웃</th>
                            <th>객실 수</th>
                            <th>침대 수</th>
                            <th>태그</th>
                            <th>가격</th>
                            <th>수정/삭제</th>
                        </thead>
                       
                    </Table>
                </Col>
            </Row>
        </Container>  
    );
}

export default RoomDetailListTable;