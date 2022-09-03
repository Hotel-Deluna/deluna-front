import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/join/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/join/INITIALIZE_FORM';

const [PARTNER, PARTNER_SUCCESS, PARTNER_FAILURE] = createRequestActionTypes(
  'auth/join/PARTNER'
);

const [USER, USER_SUCCESS, USER_FAILURE] = createRequestActionTypes(
  'auth/join/USER'
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // partner , user
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // partner / user
export const partner = createAction(PARTNER, ({ business_num, email, name, opening_day, password, phone_num}) => ({
    business_num, email, name, opening_day, password, phone_num
}));
export const user = createAction(USER, ({ email, name, password, phone_auth_num, phone_num }) => ({
    email, name, password, phone_auth_num, phone_num
}));

// saga 생성
const partnerSaga = createRequestSaga(PARTNER, authAPI.partnerJoin);
const userSaga = createRequestSaga(USER, authAPI.userJoin);
export function* authJoinSaga() {
  yield takeLatest(PARTNER, partnerSaga);
  yield takeLatest(USER, userSaga);
}

const initialState = {
  partner: {
        business_num : '',
        email : '',
        name : '',
        opening_day : '',
        password : '',
        phone_num : '',
  },
  user: {
    eamil : '',
    name : '',
    password : '',
    phone_auth_num : '',
    phone_num : '',
  },
  authJoin: null,
  authJoinError: null
};

const authJoin = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.partner.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authJoinError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 사업자회원가입 성공
    [PARTNER_SUCCESS]: (state, { payload: authJoin }) => ({
      ...state,
      authJoinError: null,
      authJoin
    }),
    // 사업자회원가입 실패
    [PARTNER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authJoinError: error
    }),
    // 고객회원가입 성공
    [USER_SUCCESS]: (state, { payload: authJoin }) => ({
      ...state,
      authJoinError: null,
      authJoin
    }),
    // 고객회원가입 실패
    [USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authJoinError: error
    })
  },
  initialState,
);

export default authJoin;