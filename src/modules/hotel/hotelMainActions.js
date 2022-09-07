import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/hotel";

//redux 조회 및 요청
const MY_HOTEL_LIST = "MY_HOTEL_LIST" //나의 호텔 리스트 조회 요청
const MY_HOTEL_SUCCESS = "MY_HOTEL_SUCCESS" //나의 호텔 리스트 조회 성공
const MY_HOTEL_FALL = "MY_HOTEL_FALL" //나의 호텔리스트 조회 실패

export const my_hotel_list = createAction(MY_HOTEL_LIST, (data) => data); //나의호텔리스트 조회

const initialState = {
    hotelList : null //호텔리스트 상태
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
    },
    initialState
)

export default hotelMainActions;

export function* hotelMainActionsSaga(){
    yield takeLatest(MY_HOTEL_LIST, myHotelListSaga);
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