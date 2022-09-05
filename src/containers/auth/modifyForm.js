import React, { useState, useEffect } from "react";
import AuthModifyForm from "../../components/auth/authModifyForm";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm,plusField,userSelect, userModify, partnerSelect, partnerModify } from "../../modules/auth";

/**
 * 
 * 수정 모달 컨테이너
 * porps.type : 0 고객 1 사업자
 */
function ModifyForm(props) {
  const[boolean, setboolean] = useState(false);//데이터 리렌더링 막기
  
  //정보 조회 후 담을 status
  const [certifyToggle, setCertifyToggle] = useState(false); // 인증번호 요청시 true - 인증번호입력input,인증번호확인 버튼 노출
  const [setInfo , setSetInfo] = useState({ //수정시 저장 state
  name : {
      originalValue : '',//기존등록된 value값
      isCheck : false,//유효성통과 시 -true
      isSame : true // 기존 등록된 정보와 같을 시 true 아닐 시 false 
  },
  businessNum : {
      value : '',
      originalValue : '',
      isCheck : false,//유효성통과 시 -true
      isSame : true, // 기존 등록된 정보와 같을 시 true 아닐 시 false
      btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
  },
  opening_day : {
    originalValue : '',
    isCheck : false,//유효성통과 시 -true
    isSame : true // 기존 등록된 정보와 같을 시 true 아닐 시 false
  },
  phoneNum : {
      value : '',//작성될 폼에 보여져야할값
      originalValue : '',
      isCheck : false,//유효성통과 시 -true
      isSame : true, // 기존 등록된 정보와 같을 시 true 아닐 시 false
      msg : '',
      btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
      
  },
  phone_auth_num : {
      isCheck : false,
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

  useEffect(() => {//조회하기
    dispatch(initializeForm('select'));
    dispatch(initializeForm('modify'));
    dispatch(
      changeField({
          form : 'select',
          key : 'token',
          value : '1234'
      })
    );
    const { token } = selectForm;
    if(props.type === '0'){//고객
      console.log(selectForm, '고객조회');
      dispatch(userSelect({ token}));
      
    }
    if(props.type === '1'){//사업자
      console.log(selectForm, '사업자조회');
      dispatch(partnerSelect({ token}));
    }
  }, [dispatch]);

  //조회성공 후
  useEffect(() => {
    if(authSelect){
      //데이터 뽑아내기 
      dispatch(changeField({ form : 'modify', key : 'email', value : authSelect.data.email}));
      dispatch(changeField({ form : 'modify', key : 'name', value : authSelect.data.name}));
      let phoneNum = authSelect.data.phone_num;
      phoneNum = phoneNum.length === 10 ? phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') :  phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      dispatch(changeField({ form : 'modify', key : 'phone_num', value :  phoneNum}));
      let businessNum = authSelect.data.business_num !== undefined && authSelect.data.business_num;
      businessNum = authSelect.data.business_num !== undefined ? businessNum.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') : '';
      authSelect.data.business_num !== undefined && dispatch(changeField({ form : 'modify', key : 'business_num', value :  businessNum}));
      let openingDay = authSelect.data.opening_day !== undefined &&  authSelect.data.opening_day;
      openingDay = authSelect.data.opening_day !== undefined ? openingDay.replace(/\T.*/,'') : '';
      authSelect.data.opening_day !== undefined && dispatch(changeField({ form : 'modify', key : 'opening_day', value :  openingDay}));

      console.log('데이터 들어갔니',form);
    }
    if(authSelectError){
      //에러
      //alert('실패!');
      console.log(authSelectError);
      return;
    }  
  }, [authSelect, authSelectError]);

  if(props.isModalOpen && boolean === false){
    setboolean(true);
    let hPhoneNum = '01029810871';
    if ('01029810871'.length === 10) {
      hPhoneNum = hPhoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    if (hPhoneNum.length === 11) {
      hPhoneNum = hPhoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    let hBusinessNum = '1112233333'.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');

    setSetInfo((state) => ({
      ...state,
      'name' : {
        ...state.name,
        'originalValue' : '이준표'
      }
    }));
    setSetInfo((state) => ({
      ...state,
      'phoneNum' : {
        ...state.phoneNum,
        'value' : hPhoneNum,
        'originalValue' : hPhoneNum
      }
    }));
    setSetInfo((state) => ({
      ...state,
      'businessNum' : {
        ...state.businessNum,
        'value' : hBusinessNum,
        'originalValue': hBusinessNum
      }
    }));
    setSetInfo((state) => ({
      ...state,
      'opening_day' : {
        ...state.opening_day,
        'originalValue' : '2022-09-04'
      }
    }));
  }
  const closeOnClick = () => {//모달 닫기
    props.setIsModalOpen(false);
    setboolean(false);
  }

const onChange = (e) => {//그외
  const {name, value} = e.currentTarget;
  //console.log(name, value);
  if(setInfo.name.originalValue === value){//기존값과 동일할 경우
    //setSetInfo({()})
  }else{

  }
  if(name === 'name'){//성명,사업자명 바꿀때
    const nameCheck1 = /^[ㄱ-ㅎ|가-힣]{17}$/;//한글만 입력되게
    if(nameCheck1.test(value)){
      dispatch(
        changeField({
            form : 'modify',
            key : 'name',
            value : value
        })
      );
      let nameCheck2 = /^[ㄱ-ㅎ|가-힣]{2, 17}$/;
      if(nameCheck2.test(value)){//유효성 통과일 시 
        
      }else{
        
      }
    }
  }
  
}

  const onChangeNum = e => {//번호에 하이픈 들어가는 input창
    const {name, value} = e.currentTarget;
    if(name === 'phoneNum'){
        
    }
  }
  const onClick = (e) => {

    // const {name} = e.currentTarget;
    // if(name === 'phoneBtn'){//인증번호요청버튼

    // }else if(name === 'certifyBtn'){//인증확인

    // }else if(name === 'businessBtns'){//사업자진위여부확인

    // }
  }
  
  const onSubmit = (e) => {

  }

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
  return(
    <AuthModifyForm type={props.type} form={form} setInfo={setInfo} onChangeNum={onChangeNum} closeOnClick={closeOnClick} isModalOpen={props.isModalOpen} 
      onChange={onChange} onSubmit={onSubmit} onClick={onClick} disabled={disabled} certifyToggle={certifyToggle} />
  );
  
}
//모달 open 시
  //전달받은 토큰으로 정보조회 api 연동
  //내려받은 데이터값 전달받기
    //임시 테스트 값
//   const [data, setData] = useState([
//     {
//       data : {
//         email: '2juntikect@gmail.com',
//         name: '홍길동',
//         phone_num: '0212345678'
//       },
//       message: 'ok',
//       result: '200'
//     }  
// ]);


export default ModifyForm;