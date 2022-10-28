import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const RESET_FIELD = 'auth/RESET_FIELD';
const PLUS_FIELD = 'auth/PLUS_FIELD';
const SLICE_FIELD = 'auth/SLICE_FIELD';
const RESET_RESPONSE = 'auth/RESET_RESPONSE';


//로그인
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
//소셜로그인
const [SOCIALLOGIN, SOCIALLOGIN_SUCCESS, SOCIALLOGIN_FAILURE] = createRequestActionTypes(
  'auth/SOCIALLOGIN'
);
//회원가입 = JOINUSER - 고객 
const [JOINUSER, JOINUSER_SUCCESS, JOINUSER_FAILURE] = createRequestActionTypes(
  'auth/JOINUSER'
);
const [JOINPARTNER, JOINPARTNER_SUCCESS, JOINPARTNER_FAILURE] = createRequestActionTypes(
  'auth/JOINPARTNER'
);

//정보조회 - SELECTUSER : 고객, SELECTPARTNER :사업자 
const [SELECTUSER, SELECTUSER_SUCCESS, SELECTUSER_FAILURE] = createRequestActionTypes(
  'auth/SELECTUSER'
);
const [SELECTPARTNER, SELECTPARTNER_SUCCESS, SELECTPARTNER_FAILURE] = createRequestActionTypes(
  'auth/SELECTPARTNER'
);

//정보수정
const [MODIFYUSER, MODIFYUSER_SUCCESS, MODIFYUSER_FAILURE] = createRequestActionTypes(
  'auth/MODIFYUSER'
);
const [MODIFYPARTNER, MODIFYPARTNER_SUCCESS, MODIFYPARTNER_FAILURE] = createRequestActionTypes(
  'auth/MODIFYPARTNER'
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // partner , user
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  }),
);

export const resetField = createAction(
  RESET_FIELD,
  ({ form, key }) => ({
    form, // 
    key, // 초기화 키값
  }),
);

export const plusField = createAction(
  PLUS_FIELD,
  ({ form, key }) => ({
    form, // 
    key, // 초기화 키값
  }),
);

export const sliceField = createAction(
  SLICE_FIELD,
  ({ form, key }) => ({
    form, // 
    key, // 초기화 키값
  }),
);

export const resetResponse = createAction(
  RESET_RESPONSE,
  ({ key }) => ({
    key
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // partner / user

//로그인
export const login = createAction(LOGIN, ({  email, password, role  }) => ({
  email, password, role 
}));
//소셜로그인
export const socialLogin =  createAction(SOCIALLOGIN, ({  email, name,role  }) => ({
  email, name, role
}));

//사업자 회원가입
export const partnerJoin = createAction(JOINPARTNER, ({business_num, email, name, opening_day, password, phone_num})=> ({
  business_num, email, name, opening_day, password, phone_num
}));
//고객 회원가입
export const userJoin = createAction (JOINUSER, ({email, name, password, phone_auth_num, phone_num}) => ({
  email, name, password, phone_auth_num, phone_num
}));

//고객 정보 조회
export const userSelect = createAction(SELECTUSER);
//사업자 정보 조회
export const partnerSelect = createAction(SELECTPARTNER);

//고객 정보 수정
export const userModify = createAction (MODIFYUSER, ({token, name, phone_auth_num, phone_num}) => ({
  token, name, phone_auth_num, phone_num
}));
//사업자 정보 수정
export const partnerModify = createAction(MODIFYPARTNER, ({token, business_num, name, opening_day, phone_num})=> ({
  token, business_num, name, opening_day, phone_num
}));

// saga 생성
//로그인
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const socialLoginSaga = createRequestSaga(SOCIALLOGIN, authAPI.socialLogin);
//회원가입
const partnerJoinSaga = createRequestSaga(JOINPARTNER, authAPI.partnerJoin);
const userJoinSaga = createRequestSaga(JOINUSER, authAPI.userJoin);
//정보조회
const userSelectSaga = createRequestSaga(SELECTUSER, authAPI.userSelect);
const partnerSelectSaga = createRequestSaga(SELECTPARTNER, authAPI.partnerSelect);
//정보수정
const userModifySaga = createRequestSaga(MODIFYUSER, authAPI.userModify);
const partnerModifySaga = createRequestSaga(MODIFYPARTNER, authAPI.partnerModify);

export function* authSaga() {
  //로그인
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SOCIALLOGIN, socialLoginSaga);
  //회원가입
  yield takeLatest(JOINPARTNER, partnerJoinSaga);
  yield takeLatest(JOINUSER, userJoinSaga);
  //정보조회
  yield takeLatest(SELECTUSER, userSelectSaga);
  yield takeLatest(SELECTPARTNER, partnerSelectSaga);
  //정보수정
  yield takeLatest(MODIFYUSER, userModifySaga);
  yield takeLatest(MODIFYPARTNER, partnerModifySaga);
}

const initialState = {
  
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.username을 바꾼다
      }),
    [RESET_FIELD]: (state, { payload: { form, key } }) =>
      produce(state, draft => {
        draft[form][key] = ''; //값 초기화
      }),
    [PLUS_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form].push = {[key] : value};//키 추가
    }),
    [SLICE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form].slice = {[key] : value};//키 삭제
    }),
    [INITIALIZE_FORM]: () =>({
      login: {
        email : '',
        password : '',
        role : '',
      },
      socialLogin: {
        email : '',
        name : '',
        role : 1
      },
      join : {
        business_num : '', 
        email : '', 
        name : '', 
        opening_day : '', 
        password : '', 
        phone_num : '',
        phone_auth_num : '',
      },
      modify : {
        business_num : '', 
        email : '', 
        name : '', 
        opening_day : '', 
        phone_num : '',
        phone_auth_num : '',
      },
      auth: null,//성공 response
      authError: null,//실패 response
      authSelect : null,
      authSelectError : null,
      authModify : null,
      authModifyError : null,
      authSocialLogin : null,
      authSocialLoginError : null
    }),
    [RESET_RESPONSE]: (state, { payload: {key} }) => ({
      ...state,
      [key] : null,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [SOCIALLOGIN_SUCCESS]: (state, { payload: authSocialLogin }) => ({
      ...state,
      authSocialLoginError : null,
      authSocialLogin
    }),
    // 로그인 실패
    [SOCIALLOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authSocialLoginError: error
    }),
    //고객 회원가입 성공
    [JOINUSER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    //고객 회원가입 실패
    [JOINUSER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    //사업자 회원가입 성공
    [JOINPARTNER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    //사업자 회원가입 실패
    [JOINPARTNER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 고객정보조회 성공
    [SELECTUSER_SUCCESS]: (state, { payload: authSelect }) => ({
      ...state,
      authSelectError: null,
      authSelect
    }),
    // 고객정보조회 실패
    [SELECTUSER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authSelectError: error
    }),
    // 사업자정보조회 성공
    [SELECTPARTNER_SUCCESS]: (state, { payload: authSelect }) => ({
      ...state,
      authSelectError: null,
      authSelect
    }),
    // 사업자정보조회 실패
    [SELECTPARTNER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authSelectError: error
    }),
    // 고객정보수정 성공
    [MODIFYUSER_SUCCESS]: (state, { payload: authModify }) => ({
      ...state,
      authModifyError: null,
      authModify
    }),
    // 고객정보수정 실패
    [MODIFYUSER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authModifyError: error
    }),
    // 사업자정보수정 성공
    [MODIFYPARTNER_SUCCESS]: (state, { payload: authModify }) => ({
      ...state,
      authModifyError: null,
      authModify
    }),
    // 사업자정보수정 실패
    [MODIFYPARTNER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authModifyError: error
    }),
  },
  initialState,
);

export default auth;