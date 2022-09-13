import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/client";

const HOTEL_LIST = "HOTEL_LIST"; //검색 호텔 리스트 조회 요청
const HOTEL_LIST_SUCCESS = "HOTEL_LIST_SUCCESS"; //검색 호텔 리스트 조회 요청 성공
const HOTEL_LIST_FALL = "HOTEL_LIST_FALL"; //검색 호텔 리스트 조회 요청 실패

export const hotel_list = createAction(HOTEL_LIST, (data) => data);

const initialState = {
    hotelList : null
}

const hotelSearchActions = handleActions(
    {
        [HOTEL_LIST_SUCCESS] : (state, action) => ({
            ...state,
            hotelList : action.payload
        }),
        [HOTEL_LIST_FALL] : (state, action) => ({
            ...state,
            hotelList : action.payload
        }),
    },
    initialState
)

export default hotelSearchActions;

export function* hotelSearchActionsSaga(){
    yield takeLatest(HOTEL_LIST, hotelListSaga);
}

function* hotelListSaga(action){
    try {
        const hotel_list = yield call(api.hotel_search, action.payload);
        yield put({
            type : HOTEL_LIST_SUCCESS,
            payload : hotel_list.data
        });
    }catch(e){
        yield put({
            type : HOTEL_LIST_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}