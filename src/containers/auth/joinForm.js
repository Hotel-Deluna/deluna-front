import React, { useEffect, useState } from "react";
import AuthJoinForm from "../../components/auth/authJoinForm";
import { changeField,initializeForm, partnerJoin, userJoin,resetField,resetResponse } from "../../modules/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

/**
 * 
 * 회원가입 공통 컨테이너(사업자, 고객)
 * 
 */
const JoinForm = () => {
    const [type, setType] = useState('0');//고객- 0, 사업자-1 
    const [timerCheck, setTimerCheck] = useState(false);
    const [reTimerCheck, setReTimerCheck] = useState(0);
    const [requestPhoneNum, setRequestPhoneNum] = useState('');//인증요청한 번호
    const [reset, resetCertify] = useState(false); //타이머 리셋
    const [isCheckbox1, setIsCheckbox1] = useState(false);//개인정보 체크박스
    const [isCheckbox2, setIsCheckbox2] = useState(false);//사업정보 체크박스
    const [firstCheck, setFirstCheck] = useState(false);

    const firstDispatch = useDispatch();
    const dispatch = useDispatch();

    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.join,
        auth : auth.auth,
        authError : auth.authError

    }));
    useEffect(() => {
        console.log("I run only Once.");
        firstDispatch(initializeForm('join'));
     }, []);

     useEffect(() => {
      if(!firstCheck){
          //console.log("I run only Once.", form);
          setFirstCheck(true);
      }
   }, [firstDispatch]);

    const [setInfo , setSetInfo] = useState({ //수정시 저장 state
        email : {
            isCheck : false,
            btnCheck : 0, //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
            msg : ''
        },
        name : {
            isCheck : false
        },
        businessNum : {
            value : '',
            isCheck : false,//유효성통과 시 -true
            btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
        },
        opening_day : {
          isCheck : false//유효성통과 시 -true
        },
        phoneNum : {
            value : '',//작성될 폼에 보여져야할값
            isCheck : false,//유효성통과 시 -true
            msg : '',
            btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
            
        },
        phone_auth_num : {
            isCheck : false,
            msg : '',
            btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
        }
    });
    
    const menuChange = (type, e) => {
        console.log(type, e);
        if((type === '1' && e === 'partner') || (type === '0' && e === 'user')){
            setType(type);
            dispatch( resetField({ form : 'join',key : 'email' }));
            dispatch( resetField({ form : 'join',key : 'password' }));
            dispatch( resetField({ form : 'join',key : 'phone_num' }));
            dispatch( resetField({ form : 'join',key : 'phone_auth_num' }));
            dispatch( resetField({ form : 'join',key : 'name' }));
            dispatch( resetField({ form : 'join',key : 'business_num' }));
            dispatch( resetField({ form : 'join',key : 'opening_day' }));
            setSetInfo({ //수정시 저장 state
                email : {
                    isCheck : false,
                    btnCheck : 0, //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
                    msg : ''
                },
                name : {
                    isCheck : false
                },
                businessNum : {
                    value : '',
                    isCheck : false,//유효성통과 시 -true
                    btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
                },
                opening_day : {
                  isCheck : false//유효성통과 시 -true
                },
                phoneNum : {
                    value : '',//작성될 폼에 보여져야할값
                    isCheck : false,//유효성통과 시 -true
                    msg : '',
                    btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
                    
                },
                phone_auth_num : {
                    isCheck : false,
                    msg : '',
                    btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
                }
                });
            setTimerCheck(false);
            setReTimerCheck(0);
            setRequestPhoneNum('');
            resetCertify(false);
            setIsCheckbox1(false);
            setIsCheckbox2(false);
        }
    }
    const onChange = e => {//그외
        const {name, value} = e.currentTarget;
        console.log(name, value);
        if(name === 'email'){
            if(setInfo.email.isCheck){
                setSetInfo((state) => ({...state,'email' : {...state.email,'isCheck' : false}}));
            }
            dispatch(changeField({ form : 'join', key : 'email', value : value}));
            let mailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //정규식 @포함
            if(mailCheck.test(value)){//정규식 통과 시
                setSetInfo((state) => ({...state,'email' : {...state.email,'isCheck' : true, 'msg' : '중복 확인 버튼을 눌러주세요.'}}));
            }else{
                setSetInfo((state) => ({...state,'email' : {...state.email,'isCheck' : false, 'msg' : 'email 형식(@)에 맞게 작성해주세요.(공백없이'}}));
            }
        }else if(name === 'name'){//성명,사업자명 바꿀때
            const nameCheck1 = /^[ㄱ-ㅎ|가-힣]{0,17}$/;//한글만 입력되게
            if(nameCheck1.test(value)){
                dispatch(changeField({ form : 'join', key : 'name', value : value}));
                let nameCheck2 = /^[ㄱ-ㅎ|가-힣]{2, 17}$/;
                if(nameCheck2.test(value)){//유효성 통과일 시 
                    setSetInfo((state) => ({...state,'name' : {...state.name,'isCheck' : true}}));
                }else{
                    setSetInfo((state) => ({...state,'name' : {...state.name,'isCheck' : false}}));
                }
            }
        }else if(name === 'opening_day'){
            dispatch(changeField({ form : 'join', key : 'opening_day', value : value}));
            let dateCheck = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
            if(dateCheck.test(value)){//유효성 통과 시
                setSetInfo((state) => ({...state, 'opening_day' : {'isCheck' : true}}));
            }else{
                setSetInfo((state) => ({...state, 'opening_day' : {'isCheck' : false}}));
            }
        }
    }
    const onChangeNum = e => {//번호에 하이픈 들어가는 input창
        let {name, value} = e.currentTarget;
        if(name === 'phoneNum'){//휴대폰번호입력시
          let regCheck = /^[0-9\b -]{0,13}$/;
            if(regCheck.test(value)){// 숫자입력시에만 Input에 들어감
              value = value.replace(/-/g, '');
              setSetInfo((state) => ({...state, 'phoneNum' :  {...state.phoneNum, 'value' : value}}));
            let checkPhone1 =  /^01([1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;// 011,16,17,18,19 유효성
            let checkPhone2 =  /^010([0-9]{4})([0-9]{4})$/; // 010 유효성
            if(checkPhone1.test(value) || checkPhone2.test(value)){//유효성 체크
              value = value.length === 10 ? value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') :  value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
              setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'isCheck' : true,'value' : value, 'msg' : '인증요청버튼을 눌러주세요.'}}));
              dispatch(changeField({ form : 'join', key : 'phone_num', value : value.replace(/-/g, '')}));
            }else{
              setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'isCheck' : false,'value' : value, 'msg' : '휴대폰번호를 정확히 입력하세요.'}}));
            }
          }
        }else if(name === 'businessNum'){//사업자번호입력시
          const regex = /^[0-9\b -]{0,12}$/;
          if (regex.test(value)) {// 숫자입력시에만 Input에 들어감
            let businessNumCheck = /^[0-9\b -]{10}$/;
            setSetInfo((state) => ({...state, 'businessNum' :  {...state.businessNum, 'value' : value}}));
              if(businessNumCheck.test(value)){//유효성체크
                setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'isCheck' : true,'value' : value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}}));
                let realNum = value.replace(/-/g, '');
                dispatch(changeField({ form : 'join', key : 'business_num', value : realNum}));
              }else{
                if(value.indexOf('-') !== -1){
                  setSetInfo((state) => ({...state, 'businessNum' :  {...state.businessNum, 'value' : value.replace(/-/g, '')}}));
                }
                setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'isCheck' : false}}));
              }
          }
        }else if(name === 'phone_auth_num'){
          let certifyCheck = /[(0-9)]{6}$/;
          dispatch( changeField({ form : 'join', key : 'phone_auth_num', value : value}));
          if(certifyCheck.test(value)){
            console.log(value);
            setSetInfo((state) => ({...state, 'phone_auth_num' : {...state.phone_auth_num,'isCheck' : true}}));
          }else{
              setSetInfo((state) => ({...state, 'phone_auth_num' : {...state.phone_auth_num,'isCheck' : false}}));
          }
        }
    }
  const onClick = (e) => {
    const {name} = e.currentTarget;
    console.log(name);
    if(name === 'emailBtn'){
        axios.post('http://43.200.222.222:8080/common/email/duplicate-check',{
            email: form.email,
            role : type
        }).then((res) =>{
            console.log(res);
            if(res.data.data){ //중복일때
                setSetInfo((state) => ({...state,'email' : {...state.email,'btnCheck' : 1, 'msg' : '중복된 아이디 입니다. 다시 입력해주세요.'}}));
            }else{// 중복이 아닐때
                setSetInfo((state) => ({...state,'email' : {...state.email,'btnCheck' : 2, 'msg' : ''}}));
            }
        });
    }else if(name === 'businessBtn'){//사업자번호 확인요청 버튼 시
        axios.post('http://43.200.222.222:8080/',{}).then((res) =>{
            if(!res.data.data){ //조회완료
                setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'btnCheck' : 2}}));
                dispatch(
                    changeField({
                        form : 'partner',
                        key : 'name',
                        value : form.name
                    },
                    {
                        form : 'partner',
                        key : 'business_num',
                        value : setInfo.businessNum.value.replace(/-/g, '')
                    },
                    {
                        form : 'partner',
                        key : 'opening_day',
                        value : form.opening_day
                    })
                );
                
            }else{// 조회실패
              setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'btnCheck' : 1}}));
                alert('등록된 정보가 없습니다. 사업주명, 사업자등록번호, 개업일자를 다시 선택해주세요.');
            }
        })
    }
    else if(name === 'phoneBtn'){//인증번호요청 버튼시
      //timers.current.startTimer(); 
      if(requestPhoneNum === ''){//최초승인요청시
        console.log('aa');
        if(form.phone_auth_num !== '') {dispatch(changeField({ form : 'join', key : 'phone_auth_num', value : ''}));}//인증번호iput 초기화
          setRequestPhoneNum(setInfo.phoneNum.value.replace(/\-/g,''));
          axios.post('http://43.200.222.222:8080/common/phone/auth/request',{
          phone_num: setInfo.phoneNum.value.replace(/\-/g,'')
          }).then((res) => {
            //console.log(res.data.result);
              if(res.data.result === "OK"){ //성공
                setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum, 'btnCheck' : 2, 'msg' : '입력하신 번호로 문자가 발송되었습니다'}}));
                setTimerCheck(true);//timer시작
              }else{// 실패
                  setTimerCheck(false);//timer종료
                  setRequestPhoneNum('');
                  setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum, 'btnCheck' : 0, 'msg' : '입력하신 번호로 문자가 발송되었습니다'}}));
                  alert('문자발송에 실패하였습니다. 잠시후 다시 이용 부탁드립니다.');
              }
          });        
      }else{
        if(requestPhoneNum !== setInfo.phoneNum.value.replace(/\-/g,'')){//다른번호 다시 인증요청 시
          setReTimerCheck(reTimerCheck+1);
          setRequestPhoneNum(setInfo.phoneNum.value.replace(/\-/g,''));

        }else{
          setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'msg' : '해당 번호로 이미 문자 발송드렸습니다.'}}));
        }

      }
    } //인증번호확인 요청시
    else if(name === 'certifyBtn'){ 
      axios.post('http://43.200.222.222:8080/common/phone/auth/verify',{
        auth_num : form.phone_auth_num, 
        phone_num : requestPhoneNum
        }).then((res) => {
            console.log('인증확인', res.data.result);
            if(res.data.result === "OK"){ //성공
              alert('인증이 완료되었습니다.');
              setTimerCheck(false);//타이머종료
              setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum, 'msg' : ''}}));
              setSetInfo((state) => ({...state, 'phone_auth_num' : {...state.phone_auth_num,'btnCheck' : 2}}));
            }else{// 실패
              setSetInfo((state) => ({...state, 'phone_auth_num' : {...state.phone_auth_num,'btnCheck' : 2, msg:'인증번호가 일치하지 않습니다.'}}));
            }
        })
    }
  }
  //개인체크박스 전체동의 했을 시 -true 
  const highFunction1 = (boolean) => {
    setIsCheckbox1(boolean);
  }
  //기업체크박스 전체동의 했을 시 -true 
  const highFunction2 = (boolean) => {
    setIsCheckbox2(boolean);
  }

    useEffect(() => { //타이머 시간 끝났을 시
        if(reset === 1){
        alert('인증시간이 다됐습니다. 다시 인증요청 해주세요.');
        setTimerCheck(false);
        setRequestPhoneNum('');
        setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum, 'btnCheck' : 0, 'msg' : '인증요청버튼을 눌러주세요.'}}));
        dispatch(changeField({ form : 'join', key : 'phone_auth_num', value : ''}));
        resetCertify(0);
        }
    },[reset]);
   
    const onSubmit = e => {
        //business_num, email, name, opening_day, password, phone_num 순서
        //console.log('submit', form.business_num, form.email,form.name, form.opening_day,form.password, form.phone_num);
        e.preventDefault();
        if(type === '0'){
            const {email, name, password, phone_num} = form;
            dispatch(userJoin({ email, name, password, phone_num}));
        }else{
            const {business_num, email, name, opening_day, password, phone_num} = form;
            dispatch(partnerJoin({business_num, email, name, opening_day, password, phone_num}));
        }
        
    };
    useEffect(() => {
        if(authError){
            //에러
            console.log(authError);
            console.log('회원가입실패');
            dispatch(resetResponse({ key : 'auth'}));
            dispatch(resetResponse({ key : 'authError'}));
            return;
        }
        if(auth){
            console.log('회원가입성공');
            console.log(auth);
            dispatch(resetResponse({ key : 'auth'}));
            dispatch(resetResponse({ key : 'authError'}));
            window.location.href = "./login";
        }
    }, [auth, authError]);

    return(
        <AuthJoinForm type={type} form={form} setInfo={setInfo} onChangeNum={onChangeNum} timerCheck={timerCheck} reTimerCheck={reTimerCheck} menuChange={menuChange} firstCheck={firstCheck}
        onChange={onChange} onSubmit={onSubmit} onClick={onClick} resetCertify={resetCertify} highFunction1={highFunction1} highFunction2={highFunction2} />
    );
}

export default JoinForm;