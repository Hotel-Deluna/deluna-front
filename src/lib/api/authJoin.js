import client from "./client";

//
export const partner = ({ business_num, email, name, opening_day, password, phone_num }) => 
    client.post('http://43.200.222.222:8080/owner/sign-up', { business_num, email, name, opening_day, password, phone_num });

export const user = ({  email, name, password, phone_auth_num, phone_num }) => 
    client.post('http://43.200.222.222:8080/member/sign-up', {  email, name, password, phone_auth_num, phone_num });
