import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);

const [JOIN, JOIN_SUCCESS, JOIN_FAILURE] = createRequestActionTypes(
  'auth/JOIN'
);


export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // partner , user
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // partner / user
export const login = createAction(LOGIN, ({  email, password, role  }) => ({
  email, password, role 
}));
export const partnerJoin = createAction(JOIN, ({business_num, email, name, opening_day, password, phone_num})=> ({
  business_num, email, name, opening_day, password, phone_num
}));
export const userJoin = createAction (JOIN, ({email, name, password, phone_auth_num, phone_num}) => ({
  email, name, password, phone_auth_num, phone_num
}));

// saga 생성
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const partnerJoinSaga = createRequestSaga(JOIN, authAPI.partnerJoin);
const userJoinSaga = createRequestSaga(JOIN, authAPI.userJoin);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(JOIN, partnerJoinSaga);
  yield takeLatest(LOGIN, userJoinSaga);
}

const initialState = {
  login: {
        email : '',
        password : '',
        role : '',
  },
  Join : {
    business_num : '', 
    email : '', 
    name : '', 
    opening_day : '', 
    password : '', 
    phone_num : '',
    phone_auth_num : '',
  },

  auth: null,
  authError: null
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.partner.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
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
    [JOIN_SUCCESS]: (state, { payload: authJoin }) => ({
      ...state,
      authJoinError: null,
      authJoin
    }),
    // 회원가입 실패
    [JOIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authJoinError: error
    }),
  },
  initialState,
);

export default auth;