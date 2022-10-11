import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/hotel";

//room_batch_delete
const BATCH_DELETE_INFO = "BATCH_DELETE_INFO"; //객실삭제(일괄삭제) 모달정보 조회요청
const BATCH_DELETE_INFO_SUCCESS = "BATCH_DELETE_INFO_SUCCESS"; //객실삭제(일괄삭제) 모달정보 조회성공
const BATCH_DELETE_INFO_FALL = "BATCH_DELETE_INFO_FALL"; //객실삭제(일괄삭제) 모달정보 조회실패

const BATCH_DELETE = "BATCH_DELETE"; //객실삭제(일괄삭제) 요청
const BATCH_DELETE_SUCCESS = "BATCH_DELETE_SUCCESS"; //객실삭제(일괄삭제) 성공
const BATCH_DELETE_FALL = "BATCH_DELETE_FALL"; //객실삭제(일괄삭제) 실패


const ROOM_CODE = "ROOM_CODE"; //공통코드 (객실 태그) 조회 요청
const ROOM_CODE_SUCCESS = "ROOM_CODE_SUCCESS"; //공통코드 (객실 태그) 조회 요청 성공
const ROOM_CODE_FALL = "ROOM_CODE_FALL"; //공통코드 (객실 태그) 조회 요청 실패

const INDIVIDUAL_DELETE_INFO = "INDIVIDUAL_DELETE_INFO" //호실삭제(개별삭제) 모달정보 조회요청
const INDIVIDUAL_DELETE_INFO_SUCCESS = "INDIVIDUAL_DELETE_INFO_SUCCESS"; //호실삭제(개별삭제) 모달정보 조회성공
const INDIVIDUAL_DELETE_INFO_FALL = "INDIVIDUAL_DELETE_INFO_FALL"; //호실삭제(개별삭제) 모달정보 조회실패

const INDIVIDUAL_DELETE = "INDIVIDUAL_DELETE"; //호실삭제(개별삭제) 요청
const INDIVIDUAL_DELETE_SUCCESS = "INDIVIDUAL_DELETE_SUCCESS"; //객실삭제(일괄삭제) 성공
const INDIVIDUAL_DELETE_FALL = "INDIVIDUAL_DELETE_FALL"; //호실삭제(개별삭제) 실패

const BATCH_DELETE_CONFIRM = "BATCH_DELETE_CONFIRM"; //성공시 initialState 초기화
const INDIVIDUAL_DELETE_CONFIRM = "INDIVIDUAL_DELETE_CONFIRM";

export const batch_delete_info = createAction(BATCH_DELETE_INFO, (data) => data); //객실삭제(일괄삭제) 모달정보 조회
export const batch_delete = createAction(BATCH_DELETE, (data) => data); //객실삭제(일괄삭제) 요청
export const batch_delete_confirm = createAction(BATCH_DELETE_CONFIRM); //객실삭제 성공시 initalState 초기화
export const room_code = createAction(ROOM_CODE); //공통코드(객실 태그) 정보 조회 요청
export const individual_delete_info = createAction(INDIVIDUAL_DELETE_INFO, (data) => data); //호실삭제(호실삭제) 모달정보 조회
export const individual_delete = createAction(INDIVIDUAL_DELETE, (data) => data); //객실삭제(일괄삭제) 요청
export const individual_delete_confirm = createAction(INDIVIDUAL_DELETE_CONFIRM);

const initialState = {
    batchDeleteInfo : null, //객실삭제(일괄삭제) 모달정보 상태
    batchDelete : null, //객실삭제(일괄삭제) 요청 상태
    code : null, //공통코드(객실태그) 요청 상태
    individualDeleteInfo : null,
    individualDelete : null
}

const roomBatchDeleteActions = handleActions(
    {
        //객실삭제(일괄삭제) 모달정보 조회 성공시
        [BATCH_DELETE_INFO_SUCCESS] : (state, action) => ({ 
            ...state,
            batchDeleteInfo : action.payload,
        }),
        //객실삭제(일괄삭제) 모달정보 조회 실패시
        [BATCH_DELETE_INFO_FALL] : (state, action) => ({ 
            ...state,
            batchDeleteInfo : action.payload,
        }),

        //객실삭제(일괄삭제) 요청 성공시
        [BATCH_DELETE_SUCCESS] : (state, action) => ({ 
            ...state,
            batchDelete : action.payload,
        }),
        //객실삭제(일괄삭제) 요청 실패시
        [BATCH_DELETE_FALL] : (state, action) => ({ 
            ...state,
            batchDelete : action.payload,
        }),

        //객실 삭제 시 초기화
       [BATCH_DELETE_CONFIRM] : (state, action) => ({
            ...state,
            batchDelete : action.payload
       }),
        //객실 삭제 시 초기화
        [INDIVIDUAL_DELETE_CONFIRM] : (state, action) => ({
            ...state,
            individualDelete : action.payload
       }),
       //공통 코드(객실 태그) 조회 성공시
       [ROOM_CODE_SUCCESS] : (state, action) => ({ 
        ...state,
        code : action.payload,
        }),
        //공통 코드(객실 태그) 조회 실패시
        [ROOM_CODE_FALL] : (state, action) => ({ 
            ...state,
            code : action.payload,
        }),

        //호실삭제(개별삭제) 모달정보 조회 성공시
        [INDIVIDUAL_DELETE_INFO_SUCCESS] : (state, action) => ({ 
            ...state,
            individualDeleteInfo : action.payload,
        }),
        //호실삭제(개별삭제) 모달정보 조회 실패시
        [INDIVIDUAL_DELETE_INFO_FALL] : (state, action) => ({ 
            ...state,
            individualDeleteInfo : action.payload,
        }),

        //호실삭제(개별삭제) 요청 성공시
        [INDIVIDUAL_DELETE_SUCCESS] : (state, action) => ({ 
            ...state,
            individualDelete : action.payload,
        }),
        //호실삭제(개별삭제) 요청 실패시
        [INDIVIDUAL_DELETE_FALL] : (state, action) => ({ 
            ...state,
            individualDelete : action.payload,
        }),

    },
    initialState
)
export default roomBatchDeleteActions;

export function* roomBatchDeleteActionsSaga(){
    yield takeLatest(BATCH_DELETE_INFO, batchDeleteInfoSaga);
    yield takeLatest(BATCH_DELETE, batchDeleteSaga);
    yield takeLatest(BATCH_DELETE_CONFIRM, batchDeleteSaga);
    yield takeLatest(ROOM_CODE, roomCodeSaga); 
    yield takeLatest(INDIVIDUAL_DELETE_INFO, individualDeleteInfoSaga);
    yield takeLatest(INDIVIDUAL_DELETE, individualDeleteSaga)
    yield takeLatest(INDIVIDUAL_DELETE_CONFIRM, individualDeleteSaga)
}
function* batchDeleteInfoSaga(action){
    try {
        const batchDeleteInfo = yield call(api.room_batch_delete_info, action.payload);
        yield put({
            type : BATCH_DELETE_INFO_SUCCESS,
            payload : batchDeleteInfo.data
        });
    }catch(e){
        yield put({
            type : BATCH_DELETE_INFO_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

function* batchDeleteSaga(action){
    if(action.type == 'BATCH_DELETE_CONFIRM'){
        return initialState;
    }else{
        try {
            const batchDelete = yield call(api.room_batch_delete, action.payload);
            console.log(batchDelete)
            yield put({
                type : BATCH_DELETE_SUCCESS,
                payload : batchDelete.data
            });
        }catch(e){
            yield put({
                type : BATCH_DELETE_FALL,
                payload : {
                    result : 'serverError',
                    message : e
                },
                error: true,
            })
        }
    }
}

//공통 코드(객실태그) 조회
function* roomCodeSaga(action){
    try {
        const room_code = yield call(api.room_code, action.payload);
        yield put({
            type : ROOM_CODE_SUCCESS,
            payload : room_code.data
        });
    }catch(e){
        yield put({
            type : ROOM_CODE_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

function* individualDeleteInfoSaga(action){
    try {
        //INDIVIDUAL_DELETE_INFO
        const individualDeleteInfo = yield call(api.room_individual_delete_info, action.payload);
        yield put({
            type : INDIVIDUAL_DELETE_INFO_SUCCESS,
            payload : individualDeleteInfo.data
        });
    }catch(e){
        yield put({
            type : INDIVIDUAL_DELETE_INFO_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

function* individualDeleteSaga(action){
    if(action.type == 'INDIVIDUAL_DELETE_CONFIRM'){
        return initialState;
    }else{
        try {
            const individualDelete = yield call(api.room_individual_delete, action.payload);
            yield put({
                type : INDIVIDUAL_DELETE_SUCCESS,
                payload : individualDelete.data
            });
        }catch(e){
            yield put({
                type : INDIVIDUAL_DELETE_FALL,
                payload : {
                    result : 'serverError',
                    message : e
                },
                error: true,
            })
        }
    }
}