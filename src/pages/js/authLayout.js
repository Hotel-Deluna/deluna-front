import React from "react"
import { Container, Row, Col} from "react-bootstrap";
import "../css/authLayout.scss";

/**
 * 
 * 공통 레이아웃 담당 컴포넌트
 */

const AuthLayout = ({children}) => {
    return(
        <Container className="joinMainCountainer" fluid="xxl">
            <Row className="justify-content-md-center">
            <Col xs lg="3" />
            <Col lg="6" key={children}>
                {children}
            </Col>
            <Col xs lg="3" />
            </Row>
        </Container>
    );

}

export default AuthLayout;