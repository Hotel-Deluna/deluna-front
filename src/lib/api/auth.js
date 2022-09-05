import client from "./client";
import axios from "axios";
//회원가입
export const partnerJoin = ({ business_num, email, name, opening_day, password, phone_num }) => 
    axios.post('http://43.200.222.222:8080/owner/sign-up', { business_num, email, name, opening_day, password, phone_num });

export const userJoin = ({  email, name, password, phone_auth_num, phone_num }) => 
    axios.post('http://43.200.222.222:8080/member/sign-up', {  email, name, password, phone_auth_num, phone_num });

//로그인
export const login = ({email, password, role}) =>
    axios.post('http://43.200.222.222:8080/member/sign-in', {email, password, role});

/*정보조회*/
//사업자
export const partnerSelect = ({token }) =>
    axios.post('http://43.200.222.222:8080/owner/view-info', {headers: {'Content-Type': 'application/json','Authorization' : token,}});
//고객
export const userSelect = ({token }) =>
    axios.post('http://43.200.222.222:8080/member/view-info', {headers: {'Content-Type': 'application/json','Authorization' : token,}});
/*정보수정 */
//사업자
export const partnerModify = ({token, business_num, email, name, opening_day,phone_num }) =>
    axios.post('http://43.200.222.222:8080​/owner​/edit-info', {headers:{Authorization: 'Bearer '+token}},
    { business_num, email, name, opening_day, phone_num}
);
//고객
export const userModify = ({ token, email, name, phone_auth_num, phone_num }) =>
    axios.post('http://43.200.222.222:8080​/member​/view-info', {headers:{Authorization: 'Bearer '+token}},
    { email, name, phone_auth_num, phone_num  });    