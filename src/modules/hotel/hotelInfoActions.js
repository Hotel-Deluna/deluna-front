import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/hotel";

//redux 조회 및 연결
const HOTEL_REGISTER = "HOTEL_REGISTER" //호텔 등록 요청
const HOTEL_REGISTER_SUCCESS = "HOTEL_REGISTER_SUCCESS" //호텔 등록요청 성공시
const HOTEL_REGISTER_FALL = "HOTEL_REGISTER_FALL" //호텔 등록요청 실패시 

const HOTEL_EDIT = "HOTEL_EDIT" // 호텔 수정 요청
const HOTEL_EDIT_SUCCESS = "HOTEL_EDIT_SUCCESS" //호텔 수정요청 성공시
const HOTEL_EDIT_FALL = "HOTEL_EDIT_FALL" //호텔 수정요청 실패시 

const HOTEL_INFO = "HOTEL_INFO" //호텔 상세 정보조회 요청
const HOTEL_INFO_SUCCESS = "HOTEL_INFO_SUCCESS" //호텔 상세 정보조회 요청 성공시
const HOTEL_INFO_FALL = "HOTEL_INFO_FALL" //호텔 상세 정보조회 요청 실패시 

export const hotel_register = createAction(HOTEL_REGISTER, (data) => data); //호텔등록
export const hotel_edit = createAction(HOTEL_EDIT, (data) => data); //호텔수정
export const hotel_info = createAction(HOTEL_INFO, (data) => data); //호텔상세 정보 조회
const initialState = {
    register: null, //호텔등록 상태
    edit : null, //호텔 수정 상태
    info : null, //호텔상세정보 상태
};

const hotelInfoActions = handleActions(
    {
        //호텔등록 성공시
        [HOTEL_REGISTER_SUCCESS] : (state, action) => ({ 
            ...state,
            register : action.payload,
        }),
        //호텔등록 실패시
        [HOTEL_REGISTER_FALL] : (state, action) => ({ 
            ...state,
            edit : action.payload,
        }),

        //호텔수정 성공시
        [HOTEL_EDIT_SUCCESS] : (state, action) => ({ 
            ...state,
            edit : action.payload,
        }),
        //호텔수정 실패시
        [HOTEL_EDIT_FALL] : (state, action) => ({ 
            ...state,
            edit : action.payload,
        }),

        //호텔조회 성공시
        [HOTEL_INFO_SUCCESS] : (state, action) => ({ 
            ...state,
            info : action.payload,
        }),
        //호텔조회 실패시
        [HOTEL_INFO_FALL] : (state, action) => ({ 
            ...state,
            info : action.payload,
        }),
        
    },
    initialState
);

export default hotelInfoActions;

export function* hotelInfoActionsSaga(){
    yield takeLatest(HOTEL_REGISTER,hotelRegisterSaga);
    yield takeLatest(HOTEL_EDIT,hotelEditSaga);
    yield takeLatest(HOTEL_INFO,hotelInfoSaga);
}

//호텔 등록
function* hotelRegisterSaga(action){
    try {
        const register = yield call(api.hotel_register, action.payload);
      
       // FormData의 value 확인
        for (let value of action.payload.values()) {
            console.log(value);
        }
        yield put({
            type : HOTEL_REGISTER_SUCCESS,
            payload : register.data
        });
    }catch(e){
        yield put({
            type : HOTEL_REGISTER_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

//호텔 수정
function* hotelEditSaga(action){

    try {
        const edit = yield call(api.hotel_edit, action.payload);
        // FormData의 value 확인
        /*for (let value of action.payload.values()) {
            console.log(value);
        }*/
        yield put({
            type : HOTEL_EDIT_SUCCESS,
            payload : edit.data
        });
    }catch(e){
        console.log(e)
        yield put({
            type : HOTEL_EDIT_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

//호텔 상세정보 조회
function* hotelInfoSaga(action){
    try {
        const info = yield call(api.hotel_info, action.payload);
        yield put({
            type : HOTEL_INFO_SUCCESS,
            payload : info.data
        });
    }catch(e){
        yield put({
            type : HOTEL_INFO_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}

