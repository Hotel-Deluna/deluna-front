import axios from "axios";

const client = axios.create;


/*
//api 주소를 다른 곳으로 사용함
client.defaults.baseURL = 'http://43.200.222.222:8080';

client.defaults.headers.common['Authorization'] = '1234';

axios.interceptors.response.use(
    response =>{
        //성공시
        return response;
    },
    error => {
        //요청 실패
        return Promise.reject(error);
    }
);
*/
export default client;