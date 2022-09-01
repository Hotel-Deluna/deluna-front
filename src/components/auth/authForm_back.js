import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button, Form, FloatingLabel} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import JoinCheck from "./joinCheckbox";
import "./css/authForm.scss";
/**
 * 
 *  고객, 사업자 회원가입 폼
 * type[0] -> 페이지명 - 로그인:login, 회원가입:join, 정보수정:modify
 * 
 */

const AuthForm = ({ type }) => {
    //const text = textMap[type];
    console.log('form', type[1]);
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.managerJoin
    }));
    // input 변경 핸들러
    const onChange = e => {
        const {value, name} = e.target;
    }
    const [email, setEmail] = useState(''); //email
    const [pwd, setPwd] = useState('');// 비밀번호
    const [pwdCheck, setPwdCheck] = useState(''); //비밀번호확인
    const [name, setName] = useState(''); //대표자성명
    const [businessNum, setBusinessNum] = useState(''); //사업자등록번호
    const [openDate, setOpenDate] = useState(''); //개업일자
    const [phoneNum, setPhoneNum] = useState(''); //휴대폰번호
    const [hPhoneNum, setHPhoneNum] = useState(''); //하이픈휴대폰번호
    const [certifyNum, setCertifyNum] = useState(''); // 휴대폰 인증번호
     //유효성 메세지
     const [emailMsg, setEmailMsg] = useState(''); // email 유효성 메세지
     const [pwdMsg, setPwdMsg] = useState(''); // 비밀번호 유효성 메세지
     const [pwdCheckMsg, setPwdCheckMsg] = useState(''); // 비밀번호 확인 유효성 메세지
     const [phoneNumMsg, setPhoneNumMsg] = useState(''); // 휴대전화 유효성 메세지
    // 유효성 검사
    //버튼인증 검사
    const [emailChecked, setEmailChecked] = useState(0); // email  : 미확인 - 0 ,중복 - 1  확인 - 2
    const [phoneChecked, setPhoneChecked] = useState(false); // 인증요청 - false : 미확인, true : 요청완료
    const [certifyChecked, setCertifyChecked] = useState(false); // 인증번호확인 - false : 미확인 ,true : 인증완료
    //const [managerChecked, setManagerChecked] = useState(false); // 사업자인증번호확인 - false : 미확인 ,true : 인증완료
    const [timerCheck, setTimerCheck] = useState(false); //타이머 false - 타이머 돌지않음 true - 타이머 시작

    const [isEmail, setIsEmail] = useState(false); // email - @ 포함되어 있으면 true
    const [isPwd, setIsPwd] = useState(false); // 비밀번호 coment - 영문대소문자,숫자,특수문자 포함 8~15자리 이내 시 true
    const [isPwdCheck, setIsPwdCheck] = useState(false); // 비밀번호 확인 - 비밀번호와 동일하다면 true;
    const [isName, setIsname] = useState(false); // 대표자성명 - 1자이상 17글자 이내
    const [isBusinessNum, setIsBusinessNum] = useState(false); // 사업자번호 12자리
    const [isOpenDate, setIsOpenDate] = useState(false); // 개업일자 yyyy.mm.dd 인지
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 휴대전화 유효성 확인 시 true;
    const [iscertifyNum, setIsCertifyNum] = useState(false); // 인증번호 체크 6자리인지
    //버튼 alert 메세지
    //const [btnEmailMsg, setBtnEmailMsg] = useState(''); // 중복확인 버튼 메세지
    //const [btnPhoneNumMsg, setBtnPhoneNumMeg] = useState(''); // 휴대폰인증요청 버튼 메세지
    //const [btnCertifyMsg, setBtncertifyMsg] = useState(''); // 인증완료 버튼 메세지
    //const [btnManagerMsg, setManagerMsg] = useState(''); // 사업자번호확인 버튼 메세지
    
    
    //이메일 input onChange
    const handleEmailChange= (e) => {
        if(emailChecked === 1){
            setEmailChecked(0);
        }
        setEmail(e.target.value);
        let mailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //정규식 @포함
        if(mailCheck.test(e.target.value)){//정규식 통과 시
            setIsEmail(true);
            setEmailMsg('중복 확인 버튼을 눌러주세요.');
        }else{
            if(isEmail) setIsEmail(false);
            setEmailMsg('email 형식(@)에 맞게 작성해주세요.(공백없이)');
        }
    }
    //email 중복확인 버튼 시
    const handdleEmailCheckClick = (e) =>{
        setEmailChecked(2);
        alert('중복확인완료');

    }
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
        }else{
            if(isPwdCheck) setIsPwdCheck(false);
            setPwdCheckMsg('비밀번호와 일치하지않습니다.');
        }
    }
    //사업자 명 input onChange
    const handleNameChange = (e) => {
        let nameCheck = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{1,}$/;
        if(nameCheck.test(e.target.value)){
            setName(e.target.value);
            setIsname(true);
        }else{
            setIsname(false);
        }
    }
    //사업자 등록번호 input 창
    const handleBusinessNumChange = (e) => {
        const regex = /^[0-9\b -]{0,12}$/;
        if (regex.test(e.target.value)) {
            setBusinessNum(e.target.value);
            let businessNumCheck = /^[0-9\b -]{10}$/;
            if(businessNumCheck.test(e.target.value)){
                setBusinessNum(e.target.value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'));
                setIsBusinessNum(true);
            }else{
                if(e.target.value.indexOf('-') !== -1){
                    setBusinessNum(e.target.value.replace(/-/g, ''));
                }
                setIsBusinessNum(false);
            }
            
        }
    }
    
    // 개업일자 innput창 onChange
    const handleOpenDateChange=(e) =>{
        setOpenDate(e.target.value);
        let dateCheck = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        if(dateCheck.test(e.target.value)){
            setIsOpenDate(true);
        }else{
            setIsOpenDate(false);
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

      // 인증요청 버튼
      const handdleCertifyButton = () => {
        setPhoneChecked(true);
        setTimerCheck(true);
        //setMinutes(1);
      }
    //인증번호 입력 input onChange
    const handdleCertifyInputChange = (e) => {
            setCertifyNum(e.target.value);
            e.target.value.length === 6 ? setIsCertifyNum(true) : setIsCertifyNum(false);
    }
    /*
    const [minutes, setMinutes] = useState(parseInt());
    const [seconds, setSeconds] = useState(parseInt(0));
    // 인증번호 타이머
    useEffect(() => {
        if(minutes > 0){
            const countdown = setInterval(() => {
                if (parseInt(seconds) > 0) {
                    setSeconds(parseInt(seconds) - 1);
                }
                if (parseInt(seconds) === 0) {
                    if (parseInt(minutes) === 0) {
                        setTimerCheck(false);//타이머종료
                        setCertifyNum('');
                        setPhoneChecked(false);
                        alert('입력시간을 초과했습니다. 다시입력해주세요.');
                        clearInterval(countdown);
                    } else {
                        setMinutes(parseInt(minutes) - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
            return () => clearInterval(countdown);
        }
      }, [minutes, seconds]);
    */
    const handdleCertifyCheckClick = ()  =>{
        setTimerCheck(false);//타이머종료
        //setMinutes(-1);// 타이머종료 
        //setSeconds(0);
        setCertifyChecked(true);
    }
      
    return(
        <Container className="joinContainer" fluid="xxl">
        <Row className="align-items-center mb-3">
            <Col sm = {9}>
                {/* 이메일 input창 */}
                <FloatingLabel controlId="email" label="이메일 주소">
                    <Form.Control type="email" name="email" value={email} className={emailChecked === 1 ? 'is-invalid' : ''} onChange={handleEmailChange} disabled={(isEmail === true) && (emailChecked === 2) ? true : false} />
                    <Form.Text className={isEmail && email !== '' ? 'err_text' : ''} id="managerEmailHelpBlock">{email === '' ? 'email 형식(@)으로 작성해주세요.(공백없이)': emailMsg}</Form.Text>
                </FloatingLabel>
            </Col>
            {/* 이메일 중복확인 버튼 */}
            <Col sm = {3}>
                <div className="d-grid join_btns">
                   <Button variant="outline-primary" onClick={handdleEmailCheckClick} size="lg" disabled={(isEmail === false) || (emailChecked === 2) ? true : false}>
                        {emailChecked === 2 ? '확인완료' : '중복확인'}
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="g-2 mb-3">
            {/* 비밀번호 input창 */}
            <Col sm = {12}>
                <FloatingLabel controlId="pwd" label="비밀번호">
                    <Form.Control type="password" name="pwd" value={pwd} onChange={handlePwdChange} maxLength={15}/>
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
            {type === 'user' 
                ? 
                <>
                 {/* 이름 input창 */}
                 <Col sm = {12}>
                 <FloatingLabel controlId="floatingInputGrid" label="성명">
                 <Form.Control type="name" placeholder="name@example.com" />
                 </FloatingLabel>
                </Col>
                </>
                : 
                <>
                    <Col sm = {4}>
                    <FloatingLabel controlId="name" label="사업자 대표자명">
                    <Form.Control type="name" name="name"  value={name}  maxLength={17} onChange={handleNameChange} 
                    />
                    <Form.Text id="businessName">한글만 입력</Form.Text>
                    </FloatingLabel>
                    </Col>
                    <Col sm = {4}>
                        <FloatingLabel controlId="businessNum" label="사업자등록번호">
                        <Form.Control type="text" name="businessNum" value={businessNum} onChange={handleBusinessNumChange} />
                        <Form.Text id="businessNum" muted>-제외 숫자만 10자리 입력</Form.Text>
                        </FloatingLabel>
                    </Col>
                    <Col sm = {4}>
                        <FloatingLabel controlId="openDay" label="등록일자">
                        <Form.Control type="date" name="openDay" value={openDate}  onChange={handleOpenDateChange} />
                        <Form.Text id="businessDate">사업자 등록일자</Form.Text>
                        </FloatingLabel>
                    </Col>
                </>
            }
            
            
        </Row>
        <Row className="align-items-center mb-3">
        {type === 'partner' 
            ? 
                <Col sm = {12}>
                    <div className="d-grid">
                        <Button variant={isName && isBusinessNum && isOpenDate ?'info' : 'outline-info'} size="md" disabled={isName && isBusinessNum && isOpenDate ? false : true}>
                            사업자번호 확인요청
                        </Button>
                    </div>
                </Col>
            : <></>}
           
        </Row>
        <Row className="align-items-center mb-3">
            {/* 휴대폰번호 input창 */}
            <Col sm = {9}>
                <FloatingLabel controlId="phoneNum" label="휴대폰번호">
                    <Form.Control type="text" name="phoneNum" onChange={handlePhoneNumberChange} value={isPhoneNum ? hPhoneNum : phoneNum} />
                    <Form.Text id="managerPhoneNumberHelpBlock">{phoneNum === '' ? '하이픈(-) 제외 숫자만 11~12자리 입력'  : phoneNumMsg}</Form.Text>
                    {/* 타이머 */}
                    <div className='timerDiv'>
                        <p className={timerCheck ? 'visibility_visible' : 'visibility_hidden'}>
                            {/* {minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
                        </p>
                </div>
                </FloatingLabel>
            </Col>
            {/* 휴대폰번호 인증요청 버튼 */}
            <Col sm = {3}>
                <div className="d-grid join_btns">
                    <Button variant={isPhoneNum ? 'warning' : 'outline-warning'} size="lg" disabled={isPhoneNum ? false : true} onClick={handdleCertifyButton}>
                        인증요청
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
            {/*  인증번호 input창 */}
            <Col sm = {9}>
                <FloatingLabel controlId="certifyNum" label="인증번호 확인">
                    <Form.Control type="text" name="certifyNum" value={certifyNum} onChange={handdleCertifyInputChange} disabled={phoneChecked ? false : true} maxLength={'6'} />
                    <Form.Text id="managerPhoneNumberHelpBlock" muted>휴대전화로 전송된 6자리 인증번호 입력</Form.Text>
                </FloatingLabel>
            </Col>
            {/* 인증번호 확인 버튼 */}
            <Col sm = {3}>
                <div className="d-grid join_btns">
                    <Button variant={phoneChecked ? 'warning' : 'outline-warning'} size="lg" disabled={(iscertifyNum || certifyChecked) ? false : true} onClick={handdleCertifyCheckClick} >
                        {certifyChecked ? '확인완료' : '인증확인'}
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="align-items-center mb-3">
                <Col sm = {12}>
                    {/* 개인정보/기업정보 약관동의 checkbox */}
                    {type === 'user' ? <JoinCheck value="0" /> : <JoinCheck value="1" />}
                </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
            <Col xs lg="5">
                <div className="d-grid">
                    <Button variant="primary" size="lg" disabled>회원가입</Button>
                </div>
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

export default AuthForm;