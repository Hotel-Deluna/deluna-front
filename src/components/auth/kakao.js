//Kakao.js
import React from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import axios from "axios";

const Kakao = () => {
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    console.log(code);
    let param = { grant_type: 'authorization_code', client_id: '2433b4e89ad89bc3db2600c704019c3f', redirect_uri: 'http://localhost:3000/auth/kakao', code: code, client_secret: 'pPygLTWbK5aHO0ny9EMHjQ4qrpWhfcxE'};
    const queryStringBody = Object.keys(param).map(k=> encodeURIComponent(k)+"="+encodeURI(param[k])).join("&");
    console.log(queryStringBody);

    axios.post('https://kauth.kakao.com/oauth/token', queryStringBody,{headers :{'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'}}).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default Kakao;