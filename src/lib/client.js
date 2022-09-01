import axios from "axios";

const client = axios.create;


/*
//api 주소를 다른 곳으로 사용함
client.defaults.baseURL = '';

client.defaults.headers.common[''] = 'Bearer a1b2c3d4';

axios.intercepter.response.use(
    response =>{
        //성공시
        return response;
    },
    err => {
        //요청 실패
        return Promise.reject(error);
    }
)
*/
export default client;