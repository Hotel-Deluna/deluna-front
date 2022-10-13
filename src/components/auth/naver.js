//Kakao.js
import React from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
const Naver = () => {
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    console.log(code);
    let state = params.get("state");
    let param = { grant_type: 'authorization_code', client_id: 'ujTxeGQ6iDErvd2yX3L9', redirect_uri: 'http://localhost:3000/auth/naver', code: code, client_secret: 'zbGMon4eHt', state : state};
    const queryStringBody = Object.keys(param).map(k=> encodeURIComponent(k)+"="+encodeURI(param[k])).join("&");
    console.log(queryStringBody);

    axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=ujTxeGQ6iDErvd2yX3L9&redirect_uri=http://localhost:3000/auth/naver&code=${code}&client_secret=zbGMon4eHt&state=${state}`).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      return(
        <Container>
          <Row>
            <Col style={{textAlign:'center'}}>
              <Spinner animation="border" size="sm" />
            </Col>
          </Row>
        </Container>
      );
}

export default Naver;