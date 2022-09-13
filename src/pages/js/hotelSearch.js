import React from "react";
import {Container} from "react-bootstrap";
import HeaderFilter from "../../components/layout/js/headerFilter"; //검색필터
import SideFilter from "../../components/layout/js/sideFilter"; //사이드 검색필터
function HotelSearch() {
    return (
        <Container>
              <HeaderFilter />
              <SideFilter />
        </Container>
    )
}

export default HotelSearch;