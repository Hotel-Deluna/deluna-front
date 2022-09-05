import axios from "axios";
//jwt 토큰 헤더에 포함
export default function setAuthorizationToken(token){
    if (token) {//있으면 헤더에 포함 - email과 구분값(사업자,고객)도 추가
        axios.defaults.headers.common['Authorization'] = `Bear ${token}`;
    }else{//없으면 그부분을 지움
        delete axios.defaults.headers.common['Authorization'];
    }
}