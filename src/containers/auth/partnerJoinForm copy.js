import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/authJoin";
import AuthForm from "../../components/auth/authForm";
/**
 * 
 * 관리자 회원가입 컨테이너(동작제어)
 * 
 */
const PartnerJoinForm = () => {
    // 유효성 boolean
    const [isEmail, setIsEmail] = useState(false); // email - @ 포함되어 있으면 true
    const [isPwd, setIsPwd] = useState(false); // 비밀번호 coment - 영문대소문자,숫자,특수문자 포함 8~15자리 이내 시 true
    const [isPwdCheck, setIsPwdCheck] = useState(false); // 비밀번호 확인 - 비밀번호와 동일하다면 true;
    const [isName, setIsname] = useState(false); // 대표자성명 - 1자이상 17글자 이내
    const [isBusinessNum, setIsBusinessNum] = useState(false); // 사업자번호 12자리
    const [isOpenDate, setIsOpenDate] = useState(false); // 개업일자 yyyy.mm.dd 인지
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 휴대전화 유효성 확인 시 true;
    const [iscertifyNum, setIsCertifyNum] = useState(false); // 인증번호 체크 6자리인지

    const [password, setPassword] = useState('');
    //버튼인증 검사
    const [emailChecked, setEmailChecked] = useState(0); // email  : 미확인 - 0 ,중복 - 1  확인 - 2
    const [phoneChecked, setPhoneChecked] = useState(false); // 인증요청 - false : 미확인, true : 요청완료
    const [certifyChecked, setCertifyChecked] = useState(false); // 인증번호확인 - false : 미확인 ,true : 인증완료
    const [managerChecked, setManagerChecked] = useState(false); // 사업자인증번호확인 - false : 미확인 ,true : 인증완료
    //버튼 상태 ref

    const dispatch = useDispatch();
    const { form } = useSelector(({ authJoin }) => ({
        form: authJoin.partner
    }));
    
    //input 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(    
            changeField({
                form: 'partner',
                key : name,
                value
            })
        );
        if(name === 'email'){//email 체크
            let mailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //정규식 @포함
            if(mailCheck.test(value)){//정규식 통과 시
                setIsEmail(true);
            }else{
                if(isEmail){
                    setIsEmail(false);
                }
            }
        }else 
        if(name === 'pwd'){//비밀번호 체크
            if(isPwd) {
                setIsPwd(false); //비밀번호 확인 유효성 초기화
            }
            let pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //비밀번호정규식 - 8~15자리이내
            if(pwCheck.test(value)){//정규식 통과 시
                setPassword(value);
                setIsPwd(true);
            }else{
                if(isPwd) {
                    setIsPwd(false);
                }
            }
        }else
        if(name === 'pwdcheck'){//비밀번호 확인 체크
            if(password === value){
                setIsPwdCheck(true);
            }else{
                setIsPwdCheck(false);
            }
        }
    };
    useEffect(() => {
        if(isPwd){
            
        }
    }, [isPwd]);
    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
    };
    
    //첫 렌더링 시 폼 초기화
    useEffect(() => {
        dispatch(initializeForm('partner'));
    }, [dispatch]);

    return(
        <AuthForm 
            type={['join', 'patner']}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            isEmail = {isEmail}
            isPwd = {isPwd}
            isPwdCheck = {isPwdCheck}
        ></AuthForm>
    );
}

export default PartnerJoinForm;