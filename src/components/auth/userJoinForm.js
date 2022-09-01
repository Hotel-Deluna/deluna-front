import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/authJoin";
import { Container, Row, Col, Button, Form, FloatingLabel, Alert} from "react-bootstrap";
import "../../components/auth/css/authForm.scss";
/**
 * 
 * 고객 회원가입 
 * 
 */
const UserJoinForm = () => {
    // 유효성 boolean
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
   
    //버튼인증 검사
    const [emailChecked, setEmailChecked] = useState(0); // email  : 미확인 - 0 ,중복 - 1  확인 - 2
    const [phoneChecked, setPhoneChecked] = useState(false); // 인증요청 - false : 미확인, true : 요청완료
    const [certifyChecked, setCertifyChecked] = useState(false); // 인증번호확인 - false : 미확인 ,true : 인증완료
    //const [managerChecked, setManagerChecked] = useState(false); // 사업자인증번호확인 - false : 미확인 ,true : 인증완료
    const [timerCheck, setTimerCheck] = useState(false); //타이머 false - 타이머 돌지않음 true - 타이머 시작
     // 유효성 검사
    const [isEmail, setIsEmail] = useState(false); // email - @ 포함되어 있으면 true
    const [isPwd, setIsPwd] = useState(false); // 비밀번호 coment - 영문대소문자,숫자,특수문자 포함 8~15자리 이내 시 true
    const [isPwdCheck, setIsPwdCheck] = useState(false); // 비밀번호 확인 - 비밀번호와 동일하다면 true;
    const [isName, setIsname] = useState(false); // 대표자성명 - 1자이상 17글자 이내
    const [isBusinessNum, setIsBusinessNum] = useState(false); // 사업자번호 12자리
    const [isOpenDate, setIsOpenDate] = useState(false); // 개업일자 yyyy.mm.dd 인지
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 휴대전화 유효성 확인 시 true;
    const [iscertifyNum, setIsCertifyNum] = useState(false); // 인증번호 체크 6자리인지


    const dispatch = useDispatch();
    const { form } = useSelector(({ authJoin }) => ({
        form: authJoin.user
    }));
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
    //성명 input onChange
    const handdleNameChange = (e) => {
        setName(e.target.value);
        let nameCheck = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{1,}$/;
        if(nameCheck.test(e.target.value)){
            setIsname(true);
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
    //인증번호 확인
    const handdleCertifyCheckClick = (e) => {
        
    }
    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
    };
    
    //첫 렌더링 시 폼 초기화
    useEffect(() => {
        dispatch(initializeForm('user'));
    }, [dispatch]);

    return(
        <Container className="joinContainer" fluid="xxl">
        <Row className="align-items-center mb-3">
            <Col sm = {9}>
                {/* 이메일 input창 */}
                <FloatingLabel controlId="email" label="이메일 주소">
                    <Form.Control type="email" name="email" value={email} className={emailChecked === 1 ? 'is-invalid' : ''} onChange={handleEmailChange} disabled={(isEmail === true) && (emailChecked === 2) ? true : false} />
                    <Form.Text className={emailChecked === 1 ? 'err_text' : ''} id="managerEmailHelpBlock">{email === '' ? 'email 형식(@)으로 작성해주세요.(공백없이)': emailMsg}</Form.Text>
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
                 {/* 이름 input창 */}
                 <Col sm = {12}>
                 <FloatingLabel controlId="name" label="성명">
                 <Form.Control type="name" value={name} onChange={handdleNameChange} placeholder="name@example.com" />
                 <Form.Text >한글만 입력</Form.Text>
                 </FloatingLabel>
                </Col>
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
                    <UserJoinCheck />
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
/* 개인정보 약관 동의 */
function UserJoinCheck() { 
    const data = [
        {id : 0, title : '본인은 만 18세 이상이며 이용약관, 규정 및 제한 사항 및 여행에 대한 정부 권고 사항을 읽었고 이에 동의합니다(필수).'},
        {id : 1, title : '개인정보 보호정책에 설명된 대로 개인정보 수집 및 사용에 동의합니다(필수).'},
        {id : 2, title : '개인정보 보호정책에 설명된 대로 국내 또는 해외에서 제3자에게 개인정보를 제공하는 데 동의합니다(필수)'}
    ];
    // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const [isCheckbox, setIsCheckbox] = useState(false);
  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
    console.log('',checkItems.length);
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
      setIsCheckbox(true);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
      setIsCheckbox(false);
    }
  }
    return (
        <div className="mb-3 AllCheckbox">
            <Alert variant="light">
                <Alert.Heading>
                    <Form.Check aria-label="option 1" name='user-all' label="개인정보 전체 동의"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={checkItems.length === data.length ? true : false} />
                </Alert.Heading>
                <hr />
                {data?.map((data, key) => (
                    <div className="checkboxs mb-3" key={key}>
                        <Form.Check aria-label="option 1" name={`user-${data.id}`} label={data.title}
                            onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={checkItems.includes(data.id) ? true : false} />
                    </div>
                ))}
            </Alert>
        </div>
    );
  }

export default UserJoinForm;