import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//정보조회
const [SELECT, SELECT_SUCCESS, SELECT_FAILURE] = createRequestActionTypes(
  'auth/SELECT'
);

export const initializeSelectForm = createAction(INITIALIZE_FORM, form => form); // partner / user

//고객 정보 조회
export const userSelect = createAction(SELECT, ({  token  }) => ({
  token 
}));
//사업자 정보 조회
export const partnerSelect = createAction(SELECT, ({  token  }) => ({
  token
}));


//정보조회
const userSelectSaga = createRequestSaga(SELECT, authAPI.userSelect);
const partnerSelectSaga = createRequestSaga(SELECT, authAPI.partnerSelect);

export function* authSelectSaga() {
  //정보조회
  yield takeLatest(SELECT, userSelectSaga);
  yield takeLatest(SELECT, partnerSelectSaga);
}

const initialState = {
  select : {
    token : '',
  },
  authSelect : null,
  authSelectError : null,
};

const authSelect = handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: {form} }) => ({
      ...state,
      [form]: initialState[form],
      authError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 정보조회 성공
    [SELECT_SUCCESS]: (state, { payload: authSelect }) => ({
      ...state,
      authSelectError: null,
      authSelect
    }),
    // 회원정보조회 실패
    [SELECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authSelectError: error
    }),
  },
  initialState,
);

export default authSelect;