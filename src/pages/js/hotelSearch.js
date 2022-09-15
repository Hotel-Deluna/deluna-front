import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import HeaderFilter from "../../components/layout/js/headerFilter"; //검색필터
import SideFilter from "../../components/layout/js/sideFilter"; //사이드 검색필터
import SearchMain from "../../components/client/searchMain";
function HotelSearch() {
    return (
        <Container style={{position:"relative"}}>
            <HeaderFilter />
            <Row>
                <Col xs={3}><SideFilter /></Col>
                <Col xs={9}><SearchMain /></Col>
            </Row>
        </Container>
    )
}

export default HotelSearch;