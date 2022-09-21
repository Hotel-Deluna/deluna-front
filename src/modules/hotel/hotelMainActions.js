import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/hotel";

//redux 조회 및 요청
const MY_HOTEL_LIST = "MY_HOTEL_LIST"; //나의 호텔 리스트 조회 요청
const MY_HOTEL_SUCCESS = "MY_HOTEL_SUCCESS"; //나의 호텔 리스트 조회 성공
const MY_HOTEL_FALL = "MY_HOTEL_FALL"; //나의 호텔리스트 조회 실패

const HOTEL_CODE = "HOTEL_CODE"; //공통 코드( 호텔 부가서비스/시설) 조회 요청
const HOTEL_CODE_SUCCESS = "HOTEL_CODE_SUCCESS"; //공통 코드( 호텔 부가서비스/시설) 조회 성공
const HOTEL_CODE_FALL = "HOTEL_CODE_FALL"; //공통 코드( 호텔 부가서비스/시설) 조회 실패

const HOTEL_DELETE = "HOTEL_DELETE"; //호텔 삭제 요청
const HOTEL_DELETE_SUCCESS = "HOTEL_DELETE_SUCCESS"; //호텔 삭제 요청 성공
const HOTEL_DELETE_FALL = "HOTEL_DELETE_FALL"; //호텔 삭제 요청 실패
const HOTEL_DELETE_CONFIRM = "HOTEL_DELETE_CONFIRM" //호텔 삭제 요청 성공시 초기화

export const my_hotel_list = createAction(MY_HOTEL_LIST, (data) => data); //나의호텔리스트 조회
export const hotel_code = createAction(HOTEL_CODE); //공통 코드( 호텔 부가서비스/시설) 조회
export const hotel_delete = createAction(HOTEL_DELETE, (data) => data); //호텔 삭제 
export const hotel_delete_confirm = createAction(HOTEL_DELETE_CONFIRM);

const initialState = {
    hotelList : null, //호텔리스트 상태
    code : null, //공통코드(호텔 부가서비스/시설) 상태
    hotelDelete : null //호텔삭제요청 상태
}

const hotelMainActions = handleActions(
    {
        //나의 호텔리스트 조회 성공시
        [MY_HOTEL_SUCCESS] : (state, action) => ({ 
            ...state,
            hotelList : action.payload,
        }),
        //호텔등록 실패시
        [MY_HOTEL_FALL] : (state, action) => ({ 
            ...state,
            hotelList : action.payload,
        }),

        //공통 코드( 호텔 부가서비스/시설) 조회 성공시
        [HOTEL_CODE_SUCCESS] : (state, action) => ({ 
            ...state,
            code : action.payload,
        }),
        //공통 코드( 호텔 부가서비스/시설) 조회 실패시
        [HOTEL_CODE_FALL] : (state, action) => ({ 
            ...state,
            code : action.payload,
        }),
        //호텔 삭제요청 성공시
        [HOTEL_DELETE_SUCCESS] : (state, action) => ({
            ...state,
            hotelDelete : action.payload  
        }),
        //호텔 삭제요청 실패시
        [HOTEL_DELETE_FALL] : (state, action) => ({
            ...state,
            hotelDelete : action.payload  
        }),
        //호텔 삭제요청 성공 시 초기화
        [HOTEL_DELETE_CONFIRM] : (state, action) => ({
            ...state,
            hotelDelete : action.payload  
        }),

    },
    initialState
)

export default hotelMainActions;

export function* hotelMainActionsSaga(){
    yield takeLatest(MY_HOTEL_LIST, myHotelListSaga);
    yield takeLatest(HOTEL_CODE, hotelCodeSaga);
    yield takeLatest(HOTEL_DELETE, hotelDeleteSaga);
    yield takeLatest(HOTEL_DELETE_CONFIRM,hotelDeleteSaga);
}

//나의 호텔리스트 조회
function* myHotelListSaga(action){
    try {
        const my_hotel_list = yield call(api.my_hotel_list, action.payload);
        yield put({
            type : MY_HOTEL_SUCCESS,
            payload : my_hotel_list.data
        });
    }catch(e){
        yield put({
            type : MY_HOTEL_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}
//공통 코드( 호텔 부가서비스/시설) 조회
function* hotelCodeSaga(action){
    try {
        const hotel_code = yield call(api.hotel_code, action.payload);
        yield put({
            type : HOTEL_CODE_SUCCESS,
            payload : hotel_code.data
        });
    }catch(e){
        yield put({
            type : HOTEL_CODE_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}
//호텔 삭제 요청
function* hotelDeleteSaga(action){
    if(action.type === 'HOTEL_DELETE_CONFIRM'){
        return initialState.hotelDelete;
    }else{
        try {
            const hotelDelete = yield call(api.hotel_delete, action.payload);
            yield put({
                type : HOTEL_DELETE_SUCCESS,
                payload : hotelDelete.data
            });
        }catch(e){
            yield put({
                type : HOTEL_DELETE_FALL,
                payload : {
                    result : 'serverError',
                    message : e
                },
                error: true,
            })
        }
    }
    
}