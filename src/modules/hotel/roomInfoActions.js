import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as api from "../../lib/api/room";

const [ROOMREGISTER, ROOMREGISTER_SUCCESS, ROOMREGISTER_FAILURE] = createRequestActionTypes(
    'hotel/ROOMREGISTER'
  );
const [ROOMEDIT, ROOMEDIT_SUCCESS, ROOMEDIT_FAILURE] = createRequestActionTypes(
    'hotel/ROOMEDIT'
  );
const [ROOMINFO, ROOMINFO_SUCCESS, ROOMINFO_FAILURE] = createRequestActionTypes(
    'hotel/ROOMINFO'
  );
const ROOMINFO_RESET = "ROOMINFO_RESET";
const [ROOMNAMECHECK, ROOMNAMECHECK_SUCCESS, ROOMNAMECHECK_FAILURE] = createRequestActionTypes(
    'hotel/ROOMNAMECHECK'
  );

export const room_register = createAction(ROOMREGISTER, (data) => data); //객실등록
export const room_edit = createAction(ROOMEDIT, (data) => data); //객실수정
export const room_info = createAction(ROOMINFO, (data) => data); //객실 상세 정보 조회
export const room_info_reset = createAction(ROOMINFO_RESET);
export const name_check = createAction(ROOMNAMECHECK, (data) => data); //객실 상세 정보 조회

const initialState = {
    register: null, //객실등록 상태
    edit : null, //객실 수정 상태
    info : null, //객실 상세정보 상태
    nameCheck : null //객실명 체크
};

const roomRegisterSaga = createRequestSaga(ROOMREGISTER, api.room_register);
const roomEditSaga = createRequestSaga(ROOMEDIT, api.room_edit);
const roomInfoSaga = createRequestSaga(ROOMINFO, api.room_info);
const nameCheckSaga = createRequestSaga(ROOMNAMECHECK, api.name_check);

function* roomInfoResetSaga(){
    return initialState;
}

export function* roomInfoActionsSaga(){
    yield takeLatest(ROOMREGISTER,roomRegisterSaga);
    yield takeLatest(ROOMEDIT,roomEditSaga);
    yield takeLatest(ROOMINFO,roomInfoSaga);
    yield takeLatest(ROOMINFO_RESET, roomInfoResetSaga);
    yield takeLatest(ROOMNAMECHECK, nameCheckSaga);
}

const roomInfoActions = handleActions(
    {
        //객실등록 성공시
        [ROOMREGISTER_SUCCESS] : (state, action) => ({ 
            ...state,
            register : action.payload,
        }),
        //객실등록 실패시
        [ROOMREGISTER_FAILURE] : (state, action) => ({ 
            ...state,
            register : action.payload,
        }),

        //객실수정 성공시
        [ROOMEDIT_SUCCESS] : (state, action) => ({ 
            ...state,
            edit : action.payload,
        }),
        //객실수정 실패시
        [ROOMEDIT_FAILURE] : (state, action) => ({ 
            ...state,
            edit : action.payload,
        }),

        //객실조회 성공시
        [ROOMINFO_SUCCESS] : (state, action) => ({ 
            ...state,
            info : action.payload,
        }),
        //객실조회 실패시
        [ROOMINFO_FAILURE] : (state, action) => ({ 
            ...state,
            info : action.payload,
        }),

        [ROOMINFO_RESET] : (state, action) => ({ 
            ...state,
            register : action.payload,
            edit : action.payload,
            info :  action.payload,
            nameCheck: action.payload
            
        }),
        [ROOMNAMECHECK_SUCCESS] : (state, action) => ({ 
            ...state,
            nameCheck : action.payload,
        }),
        //객실조회 실패시
        [ROOMNAMECHECK_FAILURE] : (state, action) => ({ 
            ...state,
            nameCheck : action.payload,
        }),
    },
    initialState
);

export default roomInfoActions;