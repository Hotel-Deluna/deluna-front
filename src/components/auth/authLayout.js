import React from "react"
import { Container, Row, Col} from "react-bootstrap";


/**
 * 
 * 공통 레이아웃 담당 컴포넌트
 */

const AuthLayout = ({children}) => {
    const mainCountainer ={
        paddingTop: '3%',
        paddingBottom: '5%',
    }
    return(
        <Container className="joinMainCountainer" style={mainCountainer} fluid="xxl">
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