import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";


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

export const room_register = createAction(ROOMREGISTER, (data) => data); //객실등록
export const room_edit = createAction(ROOMEDIT, (data) => data); //객실수정
export const room_info = createAction(ROOMINFO, (data) => data); //객실 상세 정보 조회

const initialState = {
    register: null, //객실등록 상태
    edit : null, //객실 수정 상태
    info : null, //객실 상세정보 상태
};

export function* hotelInfoActionsSaga(){
    yield takeLatest(ROOMREGISTER,roomRegisterSaga);
    yield takeLatest(ROOMEDIT,roomEditSaga);
    yield takeLatest(ROOMINFO,roomInfoSaga);
    yield takeLatest(ROOMINFO_RESET, roomInfoResetSaga)
}

function* roomInfoResetSaga(){
    return initialState;
}

//객실 등록
function* roomRegisterSaga(action){
    try {
        const register = yield call(api.room_register, action.payload);
        yield put({
            type : ROOMREGISTER_SUCCESS,
            payload : register.data
        });
    }catch(e){
        yield put({
            type : ROOMREGISTER_FAILURE,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

//객실 수정
function* roomEditSaga(action){
    try {
        const edit = yield call(api.room_edit, action.payload);
        //FormData의 value 확인
        // for (let value of action.payload.values()) {
        //     console.log(value);
        // }
        yield put({
            type : ROOMEDIT_SUCCESS,
            payload : edit.data
        });
    }catch(e){
        yield put({
            type : ROOMEDIT_FAILURE,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

//객실 상세정보 조회
function* roomInfoSaga(action){
    try {
        const info = yield call(api.room_info, action.payload);
        yield put({
            type : ROOMINFO_SUCCESS,
            payload : info.data
        });
    }catch(e){
        yield put({
            type : ROOMINFO_FAILURE,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
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
            edit : action.payload,
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
            info :  action.payload

        }),
    },
    initialState
);

export default roomInfoActions;