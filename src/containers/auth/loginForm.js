import { useEffect, useState } from "react";
import AuthLoginForm from "../../components/auth/authLoginForm";
import {Tabs, Tab} from "react-bootstrap";
import { changeField, resetField, initializeForm, login } from "../../modules/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

/**
 * 
 * 로그인 컨테이너
 */
 /*const textMap = {
    user : '1', 고객- 1
    partner : '2',사업자-2 
*/

const Login =(props) => {
    //console.log(role);
    const [errCount, setErrCount] = useState(0);
    const [autoLogin, setAutoLogin] = useState(false);
    const [type, setType] = useState('1');//고객- 1, 사업자-2 
    const [firstCheck, setFirstCheck] = useState(false);
    const firstDispatch = useDispatch();
    const dispatch = useDispatch();
     //  //첫 렌더링 시 폼 초기화
     useEffect(() => {
        console.log('first');
        // function start(){
        //     console.log('start');
        //     gapi.client.init({
        //         GOOGLE_CLIENT_ID,
        //         scope: 'profile email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        //     })
        // }

        // gapi.load('client:auth2', start);
        // console.log("I run only Once.");
        firstDispatch(initializeForm('login'));
     }, []);
     

     const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth : auth.auth,
        authError : auth.authError
    }));

    useEffect(() => {
        if(!firstCheck){
            //console.log("I run only Once.", form);
            setFirstCheck(true);
        }
     }, [firstDispatch]);


    const menuChange = (type, e) => {
        console.log(type, e);
        if((type === '2' && e === 'partner') || (type === '1' && e === 'user')){
            setType(type);
            dispatch( resetField({ form : 'login',key : 'email' }));
            dispatch( resetField({ form : 'login',key : 'password' }));
            dispatch(//role 값 교체
                changeField({
                    form : 'login',
                    key : 'role',
                    value : type
                })
            );
        }
    }

   
    //console.log('form', form);

    const onChange = e =>{
        const {name, value} = e.target;
        ////console.log(name, value);
        dispatch(
            changeField({
                form : 'login',
                key : name,
                value : value
            })
        );
        dispatch(
            changeField({
                form : 'login',
                key : 'role',
                value : type
            })
        );
    }
    const onCheck =(checked)=> {
        ////console.log(checked);
        setAutoLogin(checked);
    }
   
    // 로그인 버튼시
     const onSubmit = e => {
        //e.preventDefault();
        let mailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //정규식 @포함
        let pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //비밀번호정규식 - 8~15자리이내
        setErrCount(0);
        if(!mailCheck.test(form.email)){ setErrCount(1)}
        if(!pwCheck.test(form.password)){ setErrCount(2) }
        if(!mailCheck.test(form.email) && !pwCheck.test(form.password)){ setErrCount(3) }
       
        if(mailCheck.test(form.email) && pwCheck.test(form.password)){//정규식통과시 로그인 api연동
             //console.log(form.email, form.password, form.role);
             const { email,  password, role } = form;
             console.log(email, password, role);
             dispatch(login({ email, password, role }));
        }
    }
    const navigate = useNavigate();

    const handleOnclick = (e) => {
        const {name} = e.currentTarget;
        if(name === 'nonMember'){
            props.setLoginCheck(3);
            props.closeOnClick();
        }else if(name === 'cancel'){
            props.closeOnClick();
        }
    }
     //로그인성공/실패처리
     useEffect(() => {
        if(firstCheck){
            if(authError){
                //에러
                //alert('실패!');
                console.log(authError);
                return;
            }
            if(auth){
                //console.log('로그인성공');
                //토큰값 받아오기
                console.log(auth);
                //navigate('/');
                //window.location.href = "./auth/token/login";
                if(auth.data.result === 'OK'){
                    localStorage.clear();
                    localStorage.setItem('accessToken',auth.headers.authorization);
                    localStorage.setItem('refreshToken',auth.headers.refreshtoken);
                    localStorage.setItem('role',auth.data.role);
                    localStorage.setItem('email',auth.data.email);
                    //dispatch(initializeForm('login'));
                    console.log(auth.headers.authorization,auth.data.role, auth.data.email);
                    if(auth.data.role === 2){
                        navigate('/auth/hotel/main');
                    }else{
                        if(props.page === 0){
                            navigate('/');
                        }else{
                            props.setLoginCheck(1);
                            props.closeOnClick();
                        }
                        
                    }
                }else{
                    console.log('아이디 비밀번호 error', auth);
                    alert('아이도 또는 비밀번호가 틀립니다. 다시 입력해주세요.');
                }
                
                //console.log(auth.headers.authorization,auth.data.role, auth.data.email);
                //console.log('refresh',auth.headers.authorization);
                //console.log(localStorage.getItem('accessToken'),localStorage.getItem('refreshToken'),localStorage.getItem('role'),localStorage.getItem('email'));
                // if(autoLogin){//자동로그인 체크한경우에만
                //     const refreshtoken = 'refreshToken';//data["refreshToken"];//자동로그인
                //     localStorage.setItem('refreshtoken', refreshtoken);
                // }
                
            }
        }
        
    }, [auth, authError]);

    return(
        <>
        {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
        {props.page === 0 
        ?
        <Tabs defaultActiveKey='user' onSelect={(e)=> menuChange(type === '1' ? '2' : '1', e)} id="justify-tab-example" justify>
            <Tab eventKey="user" title={'고객 로그인'}>
            {type === '1' &&(
                    <AuthLoginForm page={0} type={type} menuChange={menuChange} form={form} onChange={onChange} onSubmit={onSubmit} errCount={errCount} onCheck={onCheck} autoLoginCheck={autoLogin} firstCheck={firstCheck}/>
            )}
            </Tab>
            {/* 사업자 회원가입 */}
            <Tab eventKey="partner" title={'사업자 로그인'}>
                {type === '2' && (
                    <AuthLoginForm type={type} menuChange={menuChange} form={form} onChange={onChange} onSubmit={onSubmit} errCount={errCount} onCheck={onCheck} autoLoginCheck={autoLogin} firstCheck={firstCheck}/>
                )}
            </Tab>
        </Tabs>
        :
            <AuthLoginForm page={1} handleOnclick= {handleOnclick}type={type} menuChange={menuChange} form={form} onChange={onChange} onSubmit={onSubmit} errCount={errCount} onCheck={onCheck} autoLoginCheck={autoLogin} firstCheck={firstCheck} />
        }
        {/* </GoogleOAuthProvider> */}
    </>
        
    );
}

export default Login;