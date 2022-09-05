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

//로그인
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
//회원가입
const [JOIN, JOIN_SUCCESS, JOIN_FAILURE] = createRequestActionTypes(
  'auth/JOIN'
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

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // partner / user

//로그인
export const login = createAction(LOGIN, ({  email, password, role  }) => ({
  email, password, role 
}));
//사업자 회원가입
export const partnerJoin = createAction(JOIN, ({business_num, email, name, opening_day, password, phone_num})=> ({
  business_num, email, name, opening_day, password, phone_num
}));
//고객 회원가입
export const userJoin = createAction (JOIN, ({email, name, password, phone_auth_num, phone_num}) => ({
  email, name, password, phone_auth_num, phone_num
}));

//고객 정보 조회
export const userSelect = createAction(SELECTUSER, ({  token  }) => ({
  token 
}));
//사업자 정보 조회
export const partnerSelect = createAction(SELECTPARTNER, ({  token  }) => ({
  token
}));

//고객 정보 수정
export const userModify = createAction (MODIFYUSER, ({token, email, name, phone_auth_num, phone_num}) => ({
  token, email, name, phone_auth_num, phone_num
}));
//사업자 정보 수정
export const partnerModify = createAction(MODIFYPARTNER, ({token, business_num, email, name, opening_day, phone_num})=> ({
  token, business_num, email, name, opening_day, phone_num
}));

// saga 생성
//로그인
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

//회원가입
const partnerJoinSaga = createRequestSaga(JOIN, authAPI.partnerJoin);
const userJoinSaga = createRequestSaga(JOIN, authAPI.userJoin);
//정보조회
const userSelectSaga = createRequestSaga(SELECTUSER, authAPI.userSelect);
const partnerSelectSaga = createRequestSaga(SELECTPARTNER, authAPI.partnerSelect);
//정보수정
const userModifySaga = createRequestSaga(MODIFYUSER, authAPI.userModify);
const partnerModifySaga = createRequestSaga(MODIFYPARTNER, authAPI.partnerModify);

export function* authSaga() {
  //로그인
  yield takeLatest(LOGIN, loginSaga);
  //회원가입
  yield takeLatest(JOIN, partnerJoinSaga);
  yield takeLatest(JOIN, userJoinSaga);
  //정보조회
  yield takeLatest(SELECTUSER, userSelectSaga);
  yield takeLatest(SELECTPARTNER, partnerSelectSaga);
  //정보수정
  yield takeLatest(MODIFYUSER, userModifySaga);
  yield takeLatest(MODIFYPARTNER, partnerModifySaga);
}

const initialState = {
  login: {
        email : '',
        password : '',
        role : '',
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
  select : {
    token : '',
  },
  modify : {
    token : '',
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
    [INITIALIZE_FORM]: (state, { payload: {form} }) => ({
      ...state,
      [form]: initialState[form],
      authError: null // 폼 전환 시 회원 인증 에러 초기화
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
    // 회원가입 성공
    [JOIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [JOIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: error
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