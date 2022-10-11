import axios from "axios";
//회원가입
export const partnerJoin = ({ business_num, email, name, opening_day, password, phone_num }) => 
    axios.post('http://43.200.222.222:8080/owner/sign-up', { business_num, email, name, opening_day, password, phone_num });

export const userJoin = ({  email, name, password, phone_num }) => 
    axios.post('http://43.200.222.222:8080/member/sign-up', {  email, name, password, phone_num });

//로그인
export const login = ({email, password, role}) =>
    axios.post('http://43.200.222.222:8080/member/sign-in', {email, password, role});

/*정보조회*/
//사업자
export const partnerSelect = () =>
    axios.post('http://43.200.222.222:8080/owner/view-info', {headers: {'Authorization' :  localStorage.getItem('accessToken')}});
//고객
export const userSelect = () =>
axios.post('http://43.200.222.222:8080/member/view-info',{
    headers: {
        'Authorization' : localStorage.getItem('accessToken')
    }
});

/*정보수정 */
//사업자
export const partnerModify = ({token, business_num, name, opening_day,phone_num }) =>
    axios.patch('http://43.200.222.222:8080/owner/edit-info', {headers:{'Authorization': token}},
    { business_num, name, opening_day, phone_num}
);
//고객
export const userModify = ({ token, name, phone_num }) =>
    axios.patch('http://43.200.222.222:8080/member/edit-info', {headers:{'Authorization': token}},//'Bearer '
    { name, phone_num});
    
//휴대폰인증번호요청

//휴대폰인증번호확인