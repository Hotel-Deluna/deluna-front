import React from "react";
import { Container, Row, Col, Button, Form, FloatingLabel} from "react-bootstrap";

const AuthCommonForm = ({type, value}) => {
    return(
        <div>{type}, {value}</div>
    );
}

export default AuthCommonForm;