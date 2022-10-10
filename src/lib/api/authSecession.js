import axios from "axios";

//고객 회원탈퇴
export const client_secession = (data) =>
axios.delete('http://43.200.222.222:8080/member/withdraw', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('Authorization'),
    },
    data: {
        data
    }
});
//사업자 회원탈퇴
export const owner_secession = (data) =>
axios.delete('http://43.200.222.222:8080/owner/withdraw', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('accessToken')
    },
    data: {
        data
    }
});