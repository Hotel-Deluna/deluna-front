import client from "./client";

//회원가입
export const partnerJoin = ({ business_num, email, name, opening_day, password, phone_num }) => 
    client.post('http://43.200.222.222:8080/owner/sign-up', { business_num, email, name, opening_day, password, phone_num });

export const userJoin = ({  email, name, password, phone_auth_num, phone_num }) => 
    client.post('http://43.200.222.222:8080/member/sign-up', {  email, name, password, phone_auth_num, phone_num });

//로그인
export const login = ({email, password, role}) =>
    client.post('http://43.200.222.222:8080/member/sign-in', {email, password, role});