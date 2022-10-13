import React, { useState, useEffect, useCallback } from "react";
import AuthModifyForm from "../../components/auth/authModifyForm";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm,resetResponse ,userSelect, userModify, partnerSelect, partnerModify } from "../../modules/auth";

import axios from "axios";
/**
 * 
 * 수정 모달 컨테이너
 * developer : 이준표
 * porps.type : 0 고객 1 사업자
 */

function ModifyForm(props) {
  //const [btnCount, setBtnCount] = useState(0);//인증요청번호 선택 횟수
  const [requestPhoneNum, setRequestPhoneNum] = useState('');//인증요청한 번호
  const [timerCheck, setTimerCheck] = useState(false);
  const [reTimerCheck, setReTimerCheck] = useState(0);
  const [reset, resetCertify] = useState(false);

  //정보 조회 후 담을 status
  const [setInfo , setSetInfo] = useState({ //수정시 저장 state
  name : {
      isCheck : false,//유효성통과 시 -true
      isSame : true
  },
  businessNum : {
      value : '',
      isCheck : false,//유효성통과 시 -true
      isSame : true,
      btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
  },
  opening_day : {
    isCheck : false,//유효성통과 시 -true
    isSame : true
  },
  phoneNum : {
      value : '',//작성될 폼에 보여져야할값
      isCheck : false,//유효성통과 시 -true
      isSame : true,
      msg : '',
      btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
      
  },
  phone_auth_num : {
      isCheck : false,
      original_value : '',
      msg : '',
      btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
  }
  });
  
  const dispatch = useDispatch();
//   //토큰가져오기
//   const {token} = 'token';//localStorage.getItem('jwtToken');

  const { selectForm, authSelect, authSelectError } = useSelector(({ auth }) => ({//조회용
      selectForm: auth.select,
      authSelect : auth.authSelect,
      authSelectError : auth.authSelectError
  }));

  const { form, authModify, authModifyError } = useSelector(({ auth }) => ({//수정용
    form: auth.modify,
    authModify : auth.authModify,
    authModifyError : auth.authModifyError
  }));
  // 정보조회
  useEffect(() => {//조회하기
    //dispatch(initializeForm('select'));
    //dispatch(initializeForm('modify'));
   
    if(props.type === '0'){//고객
      console.log(selectForm, '고객조회');
      dispatch(userSelect());
      
    }
    if(props.type === '1'){//사업자
      console.log(selectForm, '사업자조회');
      dispatch(partnerSelect());
    }
    
  }, []);

  //조회성공 후
  useEffect(() => {
    if(authSelect){
      //데이터 뽑아내기 
      dispatch(changeField({ form : 'modify', key : 'email', value : authSelect.email}));
      dispatch(changeField({ form : 'modify', key : 'name', value : authSelect.name}));
      
      let phoneNum = authSelect.phone_num;
      phoneNum = phoneNum.length === 10 ? phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') :  phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      dispatch(changeField({ form : 'modify', key : 'phone_num', value :  authSelect.phone_num}));
      
      let businessNum = authSelect.business_num !== undefined && authSelect.business_num;
      businessNum = authSelect.business_num !== undefined ? businessNum.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') : '';
      authSelect.business_num !== undefined && dispatch(changeField({ form : 'modify', key : 'business_num', value :  businessNum}));

       let openingDay = authSelect.opening_day !== undefined &&  authSelect.opening_day;
       openingDay = authSelect.opening_day !== undefined ? openingDay.replace(/\T.*/,'') : '';
      authSelect.opening_day !== undefined && dispatch(changeField({ form : 'modify', key : 'opening_day', value :  openingDay}));
      
      console.log(phoneNum, businessNum);
      authSelect.business_num !== undefined ? setSetInfo((state) => ({...state,'phoneNum' : {...state.phoneNum, 'value' : phoneNum},'businessNum' : {...state.businessNum, 'value' : businessNum}}))
      : setSetInfo((state) => ({...state,'phoneNum' : {...state.phoneNum, 'value' : phoneNum}}));
      setSetInfo((state) => ({...state,'phone_auth_num' : {...state.phone_auth_num, 'original_value' : authSelect.phone_auth_num}}));
      //dispatch(resetResponse({ key : 'authSelect'}));
      //console.log('데이터 들어갔니',form);
    }
    if(authSelectError){
      if(authSelectError !== null){
        alert('잠시후 다시 시도해주세요.');
        console.log(authSelectError);
        //authSelectError초기화
        dispatch(resetResponse({ key : 'authSelectError'}));
        props.setIsModalOpen(false);
      }
      //에러
      
      
      return;
    }  
  }, [authSelect, authSelectError]);

  const closeOnClick = () => {//모달 닫기
    dispatch(resetResponse({ key : 'authSelect'}));
    dispatch(resetResponse({ key : 'authSelectError'}));
    props.setIsModalOpen(false);
  }

const onChange = e => {//그외
  const {name, value} = e.currentTarget;
  console.log(name, value);
  if(name === 'name'){//성명,사업자명 바꿀때
    const nameCheck1 = /^[ㄱ-ㅎ|가-힣]{0,17}$/;//한글만 입력되게
    if(nameCheck1.test(value)){
      dispatch(changeField({ form : 'modify', key : 'name', value : value}));
      let nameCheck2 = /^[ㄱ-ㅎ|가-힣]{2, 17}$/;
      if(nameCheck2.test(value)){//유효성 통과일 시 
        setSetInfo((state) => ({...state,'name' : {...state.name,'isCheck' : true}}));
      }else{
        setSetInfo((state) => ({...state,'name' : {...state.name,'isCheck' : false}}));
      }
      if(authSelect.name === value){ //기존정보와 동일한지
        setSetInfo((state) => ({...state,'name' : {...state.name,'isSame' : true}}));
      }else{
        setSetInfo((state) => ({...state,'name' : {...state.name,'isSame' : false}}));
      }
    }
  }else if(name === 'opening_day'){
    dispatch(changeField({ form : 'modify', key : 'opening_day', value : value}));
    let dateCheck = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    if(dateCheck.test(value)){//유효성 통과 시
      setSetInfo((state) => ({...state, 'opening_day' : {'isCheck' : true}}));
    }else{
      setSetInfo((state) => ({...state, 'opening_day' : {'isCheck' : false}}));
    }
    let openingDay = authSelect.opening_day !== undefined &&  authSelect.opening_day;
    openingDay = authSelect.opening_day !== undefined ? openingDay.replace(/\T.*/,'') : '';
    if(openingDay === value){//기존정보와 동일한지
      setSetInfo((state) => ({...state, 'opening_day' : {'isSame' : true}}));
    }else{
      setSetInfo((state) => ({...state, 'opening_day' : {'isSame' : false}}));
    }
  }
}

  const onChangeNum = e => {//번호에 하이픈 들어가는 input창
    let {name, value} = e.currentTarget;
    console.log(name, value);
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
          dispatch(changeField({ form : 'modify', key : 'phone_num', value : value.replace(/-/g, '')}));
        }else{
          setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'isCheck' : false,'value' : value, 'msg' : '휴대폰번호를 정확히 입력하세요.'}}));
        }
        if(authSelect.phone_num === value.replace(/-/g, '')){//기존정보와 동일한지
          setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'isSame' : true, 'msg' : ''}}));
          setTimerCheck(false);
          setRequestPhoneNum('');
          setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'btnCheck' : 0}}));
        }else{
          setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum,'isSame' : false}}));   
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
            dispatch(changeField({ form : 'modify', key : 'business_num', value : realNum}));
          }else{
            if(value.indexOf('-') !== -1){
              setSetInfo((state) => ({...state, 'businessNum' :  {...state.businessNum, 'value' : value.replace(/-/g, '')}}));
            }
            setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'isCheck' : false}}));
          }
          if(authSelect.business_num === value.replace(/-/g, '')){//기존정보와 동일한지
            setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'isSame' : true, 'msg' : ''}}));
          }else{
            setSetInfo((state) => ({...state, 'businessNum' : {...state.businessNum,'isSame' : false}}));
          }
      }
    }else if(name === 'phone_auth_num'){
      let certifyCheck = /[(0-9)]{6}$/;
      dispatch( changeField({ form : 'modify', key : 'phone_auth_num', value : value}));
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
    if(name === 'businessBtn'){//사업자번호 확인요청 버튼 시
      axios.post('http://43.200.222.222:8080/',{
        }).then((res) =>{
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
        if(form.phone_auth_num !== '') {dispatch(changeField({ form : 'modify', key : 'phone_auth_num', value : ''}));}//인증번호iput 초기화
          setRequestPhoneNum(setInfo.phoneNum.value.replace(/\-/g,''));
          axios.post('http://43.200.222.222:8080/common/phone/auth/request',{
          phone_num: setInfo.phoneNum.value.replace(/\-/g,'')
          }).then((res) => {
            console.log(res.data.result);
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
    }
    else if(name === 'certifyBtn'){//인증번호확인 요청시
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
  useEffect(() => { //타이머 시간 끝났을 시
    if(reset === 1){
      alert('인증시간이 다됐습니다. 다시 인증요청 해주세요.');
      setTimerCheck(false);
      setRequestPhoneNum('');
      setSetInfo((state) => ({...state, 'phoneNum' : {...state.phoneNum, 'btnCheck' : 0, 'msg' : '인증요청버튼을 눌러주세요.'}}));
      dispatch(changeField({ form : 'modify', key : 'phone_auth_num', value : ''}));
      resetCertify(0);
    }
  },[reset]);
 
    
  
  const onSubmit = (e) => { //수정버튼 시
    let check = 0;
    if(props.type === '0'){
        if(!setInfo.phoneNum.isSame){
          if(setInfo.phone_auth_num.btnCheck < 2){
            check = 1;
            alert('휴대폰번호 수정 시 휴대폰인증을 완료해야 수정가능합니다.');
          }
        }
        if(check === 0){
          //토큰가져오기
          dispatch(
            changeField({
                form : 'modify',
                key : 'token',
                value : '1234'
            })
          );
          
          const {token, email, name, phone_auth_num, phone_num } = form;
          dispatch(userModify({ token, email, name, phone_auth_num, phone_num }));
        }
    }else{//사업자일때
      if(!setInfo.phoneNum.isSame){
        if(setInfo.phone_auth_num.btnCheck < 2){
          check = 1;
        }else{
          dispatch(
            changeField({
                form : 'modify',
                key : 'form',
                value : authSelect.phone_auth_num
            })
          );
        }
      }
      if(!setInfo.name.isSame || !setInfo.businessNum.isSame || !setInfo.opening_day.isSame){
        if(setInfo.businessNum.btnCheck < 2){
          check = 2;
          alert('사업자번호 확인이 완료되어야 수정이 가능합니다.');
        }
      if(setInfo.phone_auth_num.btnCheck < 2 && setInfo.businessNum.btnCheck < 2){
        check = 3;
      }
      if(check === 0){
        //토큰가져오기
        dispatch(
          changeField({
              form : 'modify',
              key : 'token',
              value : '1234'
          })
        );
        const {token, business_num, email, name, opening_day,phone_num } = form;
        dispatch(partnerModify({ token, business_num, email, name, opening_day,phone_num }));
      }
      }else{
        if(check === 1){alert('휴대폰번호 수정 시 휴대폰인증을 완료해야 수정가능합니다.');}
        if(check === 2){alert('사업자번호 확인이 완료되어야 수정이 가능합니다.');}
        if(check === 3){alert('휴대폰번호,사업자번호 인증을 완료해야 수정가능합니다.');}
      }
    }
  }
  useEffect(() => {
    if(authModifyError){
      if(authModifyError !== null){
        alert('수정에 실패하였습니다. 잠시후 다시 시도해주세요.');
        console.log(authModifyError);
        dispatch(resetResponse({ key : 'authSelect'}));
        dispatch(resetResponse({ key : 'authModifyError'}));
        props.setIsModalOpen(false);
      } 
    }
    if(authModify){
      if(authModify !== null){
        alert('수정 완료하였습니다.')
        console.log(authModify);
        //authModify = null;
        dispatch(resetResponse({ key : 'authSelect'}));
        dispatch(resetResponse({ key : 'authModify'}));
        props.setIsModalOpen(false);
      }
    }
}, [authModify, authModifyError]);


  return(
    <AuthModifyForm type={props.type} form={form} setInfo={setInfo} onChangeNum={onChangeNum} closeOnClick={closeOnClick} isModalOpen={props.isModalOpen} timerCheck={timerCheck} reTimerCheck={reTimerCheck}
    onChange={onChange} onSubmit={onSubmit} onClick={onClick} resetCertify={resetCertify} />
  );
}


export default ModifyForm;