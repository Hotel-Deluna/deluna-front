import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField,initializeForm, user } from "../../modules/authJoin";
import { Container, Row, Col, Button, Form, FloatingLabel} from "react-bootstrap";
import JoinCheck from "../../components/auth/joinCheckbox";
import axios from "axios";

import "../../components/auth/css/authForm.scss";
/**
 * 
 * 관리자 회원가입 컨테이너(동작제어)
 * 
 */
const UserJoin = () => {
    const [Email, setEmail] = useState(''); //email
    const [requestEmail, setRequestEmail] = useState('');//회원가입시 보내는 이메일
    const [pwd, setPwd] = useState('');// 비밀번호
    const [pwdCheck, setPwdCheck] = useState(''); //비밀번호확인
    const [Name, setName] = useState(''); //대표자성명
    const [phoneNum, setPhoneNum] = useState(''); //휴대폰번호
    const [hPhoneNum, setHPhoneNum] = useState(''); //하이픈휴대폰번호
    const [certifyNum, setCertifyNum] = useState(''); // 휴대폰 인증번호
    const [requestCertifyNum, setRequestCertifyNum] = useState(''); //회원가입 시 보내는 휴대폰인증번호
    
     //유효성 메세지
     const [emailMsg, setEmailMsg] = useState(''); // email 유효성 메세지
     const [pwdMsg, setPwdMsg] = useState(''); // 비밀번호 유효성 메세지
     const [pwdCheckMsg, setPwdCheckMsg] = useState(''); // 비밀번호 확인 유효성 메세지
     const [phoneNumMsg, setPhoneNumMsg] = useState(''); // 휴대전화 유효성 메세지
     const [certifyNumMsg, setCertifyNumMsg] = useState('') //인증번호 유효성 메세지
    // 유효성 검사
    //버튼인증 검사
    const [emailChecked, setEmailChecked] = useState(0); // email  : 미확인 - 0 ,중복 - 1  확인 - 2
    const [phoneChecked, setPhoneChecked] = useState(0); // 인증요청 -  미확인 - 0 ,실패 - 1  확인 - 2
    const [certifyChecked, setCertifyChecked] = useState(0); // 인증확인 -  미확인 - 0 ,실패 - 1  확인 - 2
    const [timerCheck, setTimerCheck] = useState(false); //타이머 false - 타이머 돌지않음 true - 타이머 시작

    const [isEmail, setIsEmail] = useState(false); // email - @ 포함되어 있으면 true
    const [isPwd, setIsPwd] = useState(false); // 비밀번호 coment - 영문대소문자,숫자,특수문자 포함 8~15자리 이내 시 true
    const [isPwdCheck, setIsPwdCheck] = useState(false); // 비밀번호 확인 - 비밀번호와 동일하다면 true;
    const [isName, setIsname] = useState(false); // 대표자성명 - 1자이상 17글자 이내
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 휴대전화 유효성 확인 시 true;
    const [iscertifyNum, setIsCertifyNum] = useState(false); // 인증번호 체크 6자리인지 
    const [certifyCount, setCertifyCount] = useState(0);// 인증번호count
    const [requestPhoneNum, setRequestPhoneNum] = useState('');
    const [certifyToggle, setCertifyToggle] = useState(false); //토글
    const [isCheckbox1, setIsCheckbox1] = useState(false);//개인정보 체크박스

    const emailInput = useRef('');
    const { inputName, inputValue } = Email;
    const certifyInput = useRef();
    const { certifyName, certifyValue} = certifyNum;
    
    const dispatch = useDispatch();
    const { form, authJoin, authJoinError } = useSelector(({ authJoin }) => ({
        form: authJoin.user,
        authJoin : authJoin.authJoin,
        authJoinError : authJoin.authJoinError

    }));
    //이메일 input onChange
    const handleEmailChange= (e) => {
        const { value, name } = e.target; 
        dispatch(
            changeField({
                form : 'user',
                key : 'email',
                value : value
            })
        );//테스트
        if(emailChecked === 1){
            setEmailChecked(0);
        }
        
            setEmail({
                ...Email, // 기존의 input 객체를 복사한 뒤
                [name]: value // name 키를 가진 값을 value 로 설정
              });
        let mailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //정규식 @포함
        if(mailCheck.test(e.target.value)){//정규식 통과 시
            console.log('email : ',value);
            setIsEmail(true);
            setEmailMsg('중복 확인 버튼을 눌러주세요.');
        }else{
            if(isEmail) setIsEmail(false);
            setEmailMsg('email 형식(@)에 맞게 작성해주세요.(공백없이)');
        }
    }
    //email 중복확인 버튼 시
    const handdleEmailCheckClick = (e) =>{
        axios.post('http://43.200.222.222:8080/common/email/duplicate-check',{
            email: Email.inputValue,
            role : 0
        }).then((res) =>{
            if(!res.data.data){ //중복일때
                setEmailChecked(1);
                setEmailMsg("중복된 아이디 입니다. 다시 입력해주세요.");
                emailInput.current.focus();
            }else{// 중복이 아닐때
                dispatch(
                    changeField({
                        form : 'user',
                        key : 'email',
                        value : Email.inputValue
                    })
                );
                console.log(Email.inputValue);
                setEmailChecked(2);
                setEmailMsg('');
            }
        })

    };
    //비밀번호 input onChange
    const handlePwdChange= (e) => {
        setPwd(e.target.value);
        setPwdCheck('');//비밀번호확인 초기화
        if(isPwdCheck) setIsPwdCheck(false); //비밀번호 확인 유효성 초기화
        let pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //비밀번호정규식 - 8~15자리이내
        if(pwCheck.test(e.target.value)){//정규식 통과 시
            setIsPwd(true);
            setPwdMsg('해당 비밀번호 사용 가능합니다.');
        }else {
            if(isPwd) {
                setIsPwd(false);
            }
            setPwdMsg('숫자, 영문 대or소문자, 특수문자 포함 8자리 이상 15자리 이하로 입력해주세요.');
        }
    }
    //비밀번호 확인 input onChange
    const handlePwdCheckChange = (e) => {
        setPwdCheck(e.target.value);
        if(pwd === e.target.value){
            setIsPwdCheck(true);
            setPwdCheckMsg('비밀번호와 일치합니다.');
            dispatch(
                changeField({
                    form : 'user',
                    key : 'password',
                    value : pwd
                })
            );
            console.log('password : ',pwd);
        }else{
            if(isPwdCheck) setIsPwdCheck(false);
            setPwdCheckMsg('비밀번호와 일치하지않습니다.');
        }
    }
    //사업자 명 input onChange
    const handdleNameChange = (e) => {
        setName(e.target.value);
        let nameCheck2 = /^[ㄱ-ㅎ|가-힣]{2,}$/;
        if(nameCheck2.test(e.target.value)){
            setIsname(true);
            dispatch(
                changeField({
                    form : 'user',
                    key : 'name',
                    value : e.target.value
                })
            );//테스트
            console.log('name : ', e.target.value);
        }else{
            setIsname(false);
        }
    }
    //휴대폰 입력
    const handlePhoneNumberChange = (e) => {
        let regCheck = /^[0-9\b -]{0,13}$/;
        if(regCheck.test(e.target.value)){
            if(e.target.value.indexOf('-') !== -1){
                e.target.value = e.target.value.replace(/-/g, '');
            }
            setPhoneNum(e.target.value);
            
            let checkPhone1 =  /^01([1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;// 011,16,17,18,19 유효성
            let checkPhone2 =  /^010([0-9]{4})([0-9]{4})$/; // 010 유효성
            if(checkPhone1.test(e.target.value) || checkPhone2.test(e.target.value)){
                setHPhoneNum(e.target.value);
                setIsPhoneNum(true);
                setPhoneNumMsg('인증번호를 눌러주세요.');
                dispatch(
                    changeField({
                        form : 'user',
                        key : 'phone_num',
                        value : e.target.value.replace(/-/g, '')
                    })
                );//테스트
                console.log('phone_num : ', e.target.value.replace(/-/g, ''));
                
            }else{
                setIsPhoneNum(false);
                setPhoneNumMsg('휴대폰번호를 정확히 입력하세요.');
            }
        }
    }
    //자동하이픈
    useEffect(() => {
        if (hPhoneNum.length === 10) {
            setHPhoneNum(hPhoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (hPhoneNum.length === 11) {
            setHPhoneNum(hPhoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
      }, [hPhoneNum]);

      function resetTimer (){
        setMinutes();
        setSeconds();
        setMinutes(3);
        setSeconds(0);
      }
      // 인증요청 버튼 시
      const handdleCertifyClick = () => {
        if(requestPhoneNum !== phoneNum || !timerCheck){
            resetTimer();
            setCertifyCount(0);
            axios.post('http://43.200.222.222:8080/common/phone/auth/request',{
            phone_num: (phoneNum).replace(/\-/g,'')
            }).then((res) => {
                console.log('인증요청', res.data.result)
                if(res.data.result === "OK"){ //성공
                    setRequestPhoneNum((phoneNum).replace(/\-/g,''));
                    setCertifyCount(certifyCount+1);
                    setPhoneChecked(2);
                    setTimerCheck(true);
                    setMinutes(1);
                    setSeconds(0);
                    setCertifyToggle(true);
                    setPhoneNumMsg('입력하신 번호로 문자가 발송되었습니다. 인증번호를 입력해주세요.');
                }else{// 실패
                    if(certifyCount > 0){setCertifyCount(certifyCount-1);}
                    alert('문자발송에 실패하였습니다. 잠시후 다시 이용 부탁드립니다.');
                }
            });
        }else{
            if(timerCheck){
                setPhoneNumMsg('해당 번호로 이미 문자 발송드렸습니다. 확인 부탁드립니다.');
                certifyInput.current.focus();
            }
        }
        
      }
    
    // 인증번호 타이머
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [countDown, setCountDown] = useState();

    useEffect(() => {
    let countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
              }
              if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                    setCertifyNum('');
                    setPhoneChecked(1);
                    if(timerCheck){
                        setTimerCheck(false);//타이머종료
                        setCertifyToggle(false);
                        setMinutes();
                        setSeconds();                        
                        setPhoneNumMsg('인증번호를 눌러주세요.');
                        alert('입력시간을 초과했습니다. 다시입력해주세요.');
                    }
                } else {
                  setSeconds(59);
                  setMinutes(parseInt(minutes) - 1);
                }
              }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timerCheck, minutes, seconds]);

    //인증번호 입력 input onChange
    const handdleCertifyInputChange = (e) => {
        const { name, value } = e.target; 
        setCertifyNum({
        ...certifyNum, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
        });
        let certifyCheck = /^[0-9\b -]{6}$/;
        if(certifyCheck.test(value)){
            setIsCertifyNum(true);
            dispatch( 
                changeField({
                    form : 'user',
                    key : 'phone_auth_num',
                    value : value
                })
            );//테스트
            console.log('phone_auth_num', value);
        }else{
            setIsCertifyNum(false);
        }
    }
    //인증번호 확인버튼
    const handdleCertifyCheckClick = ()  =>{
        axios.post('http://43.200.222.222:8080/common/phone/auth/verify',{
            auth_num : certifyNum.certifyValue, 
            phone_num : requestPhoneNum
            }).then((res) => {
                console.log('인증확인', res.data.result);
                if(res.data.result === "OK"){ //성공
                    setRequestCertifyNum(certifyNum.certifyValue);
                    setCertifyChecked(2);
                    clearInterval(countDown);
                    setTimerCheck(false);//타이머종료
                    setMinutes();
                    setSeconds();
                    setCertifyToggle(false);
                    dispatch(
                        changeField({
                            form : 'user',
                            key : 'phone_num',
                            value : phoneNum.replace(/-/g, '')
                        },{ 
                            form : 'user',
                            key : 'phone_auth_num',
                            value : certifyNum.certifyValue
                        })
                    );

                }else{// 실패
                    setCertifyNumMsg('문자발송에 실패하였습니다. 잠시후 다시 이용 부탁드립니다.');
                    certifyInput.current.focus();
                }
            })
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        //business_num, email, name, opening_day, password, phone_num 순서
        console.log('submit', form.email,form.name, form.phone_auth_num,form.password, form.phone_num);
        e.preventDefault();
        const { email, name, password, phone_auth_num, phone_num } = form;
        dispatch(user({ email, name, password, phone_auth_num, phone_num }));
    };

    //첫 렌더링 시 폼 초기화
    useEffect(() => {
        dispatch(initializeForm('user'));
    }, [dispatch]);

     //회원가입성공/실패처리
    useEffect(() => {
        if(authJoinError){
            //에러
            console.log(authJoinError);
            console.log('회원가입실패');
            return;
        }
        if(authJoin){
            console.log('회원가입성공');
            console.log(authJoin);
            window.location.href = "./auth/login";
        }
    }, [authJoin, authJoinError]);

    function disabled(case1, case2){ // 버튼 disbled처리 true - 비활성화 false - 활성화
        if(case2 < 2){
            if(case1){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }

    //개인체크박스 전체동의 했을 시 -true 
    const highFunction1 = (boolean) => {
        setIsCheckbox1(boolean);
      }
    return(
        <Container className="joinContainer" fluid="xxl">
        <Row className="align-items-center mb-3">
            <Col sm = {9}>
                {/* 이메일 input창 */}
                <FloatingLabel controlId="email" label="이메일 주소">
                    <Form.Control type="email" name="email" value={form.email === '' ? '' : certifyValue} ref={emailInput} className={emailChecked === 1 ? 'is-invalid' : ''} onChange={handleEmailChange} disabled={(isEmail === true) && (emailChecked === 2) ? true : false} />
                    <Form.Text className={emailChecked === 1 ? 'err_text' : ''} id="managerEmailHelpBlock">{Email === '' ? 'email 형식(@)으로 작성해주세요.(공백없이)': emailMsg}</Form.Text>
                </FloatingLabel>
            </Col>
            {/* 이메일 중복확인 버튼 */}
            <Col sm = {3}>
                <div className={emailChecked === 2 ? "d-grid": "d-grid join_btns"}>
                   <Button variant="outline-primary" onClick={handdleEmailCheckClick} size="lg" disabled={disabled(isEmail,emailChecked)}>
                        {emailChecked === 2 ? '확인완료' : '중복확인'}
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="g-2 mb-3">
            {/* 비밀번호 input창 */}
            <Col sm = {12}>
                <FloatingLabel controlId="pwd" label="비밀번호">
                    <Form.Control type="password" name="pwd" value={pwd} onChange={handlePwdChange} maxLength={15} />
                    <Form.Text id="managerPasswordHelpBlock">{pwd === '' ? '숫자, 영문 대or소문자, 특수문자 포함 8자리 이상 15자리 이하로 입력해주세요.' :pwdMsg }</Form.Text>
                </FloatingLabel>
            </Col>
        </Row>
        <Row className="g-2 mb-3">
            {/* 비밀번호확인 input창 */}
            <Col sm = {12}>
                <FloatingLabel controlId="pwdcheck" label="비밀번호확인">
                    <Form.Control type="password" name="pwdcheck" value={pwdCheck} onChange={handlePwdCheckChange} maxLength={15} disabled= {(isPwd === false) ? true : false} />
                    <Form.Text id="managerPasswordCheckHelpBlock">{pwdCheck === '' ? '위 입력한 비밀번호와 동일하게 입력하세요.' : pwdCheckMsg}</Form.Text>
                </FloatingLabel>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
                 {/* 이름 input창 */}
                 <Col sm = {12}>
                 <FloatingLabel controlId="name" label="성명">
                 <Form.Control type="name" value={Name} onChange={handdleNameChange} placeholder="name@example.com" />
                 <Form.Text >한글만 입력</Form.Text>
                 </FloatingLabel>
                </Col>
        </Row>
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {9}>
                <FloatingLabel controlId="phoneNum" label="휴대폰번호">
                    <Form.Control type="text" name="phoneNum" onChange={handlePhoneNumberChange} value={isPhoneNum ? hPhoneNum : phoneNum} disabled={(disabled(true, certifyChecked))} />
                    {certifyChecked < 2 && (
                        <Form.Text id="managerPhoneNumberHelpBlock" className={timerCheck && 'border_text' }>{phoneNum === '' ? '하이픈(-) 제외 숫자만 11~12자리 입력'  : phoneNumMsg}</Form.Text>
                    )}
                    {/* 타이머 */}
                    <div className='timerDiv'>
                        <p className={timerCheck ? 'visibility_visible' : 'visibility_hidden'}>
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds} 
                        </p>
                </div>
                </FloatingLabel>
            </Col>
            {/* 휴대폰번호 인증요청 버튼 */}
            <Col sm = {3}>
                <div className={certifyChecked === 2 ? 'd-grid' : 'd-grid join_btns'}>
                    <Button variant={'outline-warning'} size="lg" disabled={(disabled(isPhoneNum, certifyChecked))} onClick={handdleCertifyClick}>
                    {certifyChecked < 2 ? '인증요청' : '인증완료'}
                    </Button>
                </div>
            </Col>
        </Row>
        {certifyToggle && (
            <Row className="align-items-center mb-3">
            {/*  인증번호 input창 */}
            <Col sm = {9}>
                <FloatingLabel controlId="certifyNum" label="인증번호 확인">
                    <Form.Control type="text" name="certifyNum" className={certifyChecked === 2  ? 'is-invalid' : ''} ref={certifyInput} value={certifyValue} onChange={handdleCertifyInputChange} disabled={disabled((phoneChecked === 2 ? true : false), certifyChecked)} maxLength={'6'} />
                    {certifyChecked < 2 && (
                        <Form.Text id="managerPhoneNumberHelpBlock" className={(certifyChecked ===1 && ('error_text'))}>{certifyChecked === 0 ? '휴대전화로 전송된 6자리 인증번호 입력' : certifyNumMsg}</Form.Text>
                    )}
                    
                </FloatingLabel>
            </Col>
            {/* 인증번호 확인 버튼 */}
            <Col sm = {3}>
                <div className={certifyChecked === 2 ? 'd-grid' : 'd-grid join_btns'}>
                    <Button variant={'warning'} size="lg" disabled={disabled((iscertifyNum ? true : false), certifyChecked)} onClick={handdleCertifyCheckClick} >
                        인증확인
                    </Button>
                </div>
            </Col>
        </Row>
        )}
        <Row className="align-items-center mb-3">
               <Col sm = {12}>
                    {/* 개인정보/기업정보 약관동의 checkbox */}
                    <JoinCheck value="0" getDataCheckbox1={highFunction1} />
                </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
            <Col xs lg="5">
            <form onSubmit={onSubmit}>
                <div className="d-grid">
                        <input type='hidden' name='eamil' value={form.email} />
                        <input type='hidden' name='phone_auth_num' value={form.phone_auth_num} />
                        <input type='hidden' name='name' value={form.name}  />
                        <input type='hidden' name='password' value={form.password} />
                        <input type='hidden' name='opening_day' value={form.opening_day} />
                        <input type='hidden' name='phone_num' value={form.phone_num} />
                        <Button type="submit" variant="primary" size="lg" onSubmit={onSubmit} disabled={(isCheckbox1) ? false : true}>회원가입</Button>
                </div>
            </form>    
            </Col>
            <Col md="auto" />
            <Col xs lg="5">
                <div className="d-grid">
                    <Button variant="secondary" size="lg">취소</Button>
                </div>
            </Col>
        </Row>
    </Container>
    );
}
export default UserJoin;//isEmail && emailChecked && isPwd && isPwdCheck && isName && isBusinessNum && isOpenDate && managerChecked  && isPhoneNum && iscertifyNum && certifyChecked &&