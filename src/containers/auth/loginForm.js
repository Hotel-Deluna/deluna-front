import { useEffect, useState, useNavigate } from "react";
import AuthLoginForm from "../../components/auth/authLoginForm";
import { changeField,initializeForm, login } from "../../modules/auth";
import { useDispatch, useSelector } from "react-redux";
/**
 * 
 * 로그인 컨테이너
 */
 const textMap = {
    partner : '2',
    user : '1',
 };
const Login =({type}) => {
    const role = textMap[type];
    console.log(role);
    const [errCount, setErrCount] = useState(0);
    const [autoLogin, setAutoLogin] = useState(false);
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth : auth.auth,
        authError : auth.authError
    }));

    // //첫 렌더링 시 폼 초기화
    // useEffect(() => {
    //     dispatch(initializeForm('login'));
    // }, [dispatch]);

    const onChange = e =>{
        const {name, value} = e.target;
        console.log(name, value);
        dispatch(
            changeField({
                form : 'login',
                key : name,
                value : value
            })
        );//테스트
        dispatch(
            changeField({
                form : 'login',
                key : 'role',
                value : role
            })
        );//테스트
    }
    const onCheck =(checked)=> {
        console.log(checked);
        setAutoLogin(checked);
    }
    //소셜로그인 선택 시
    const onClick = e => {
        //소셜로그인 부분
        const { name } = e.target;
        console.log(name);
    }
    // 로그인 버튼시
     const onSubmit = e => {
        e.preventDefault();
        let mailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //정규식 @포함
        let pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //비밀번호정규식 - 8~15자리이내
        setErrCount(0);
        if(!mailCheck.test(form.email)){ setErrCount(1)}
        if(!pwCheck.test(form.password)){ setErrCount(2) }
        if(!mailCheck.test(form.email) && !pwCheck.test(form.password)){ setErrCount(3) }

        if(mailCheck.test(form.email) && pwCheck.test(form.password)){//정규식통과시 로그인 api연동
             console.log(form.email, form.password, form.role);
             const { email,  password, role } = form;
             dispatch(login({ email, password, role }));
        }
    }
    //const navigate = useNavigate();

     //회원가입성공/실패처리
     useEffect(() => {
        if(authError){
            //에러
            alert('실패!');
            console.log(authError);
            //return;
        }
        if(auth){
            console.log('로그인성공');
            //토큰값 받아오기
            console.log(auth);
            //navigate('/');
            //window.location.href = "./auth/token/login";
            const token = 'token';//data["token"];
            localStorage.setItem('jwtToken', token);
            if(autoLogin){//자동로그인 체크한경우에만
                const refreshtoken = 'refreshToken';//data["refreshToken"];//자동로그인
                localStorage.setItem('refreshtoken', refreshtoken);
            }
            
        }
    }, [auth, authError]);

    return(
        <AuthLoginForm type={type} form={form} onChange={onChange} onClick={onClick} onSubmit={onSubmit} errCount={errCount} onCheck={onCheck} autoLoginCheck={autoLogin}/>
    );
}

export default Login;