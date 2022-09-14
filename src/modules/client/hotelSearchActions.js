import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/client";

const HOTEL_LIST = "HOTEL_LIST"; //검색 호텔 리스트 조회 요청
const HOTEL_LIST_SUCCESS = "HOTEL_LIST_SUCCESS"; //검색 호텔 리스트 조회 요청 성공
const HOTEL_LIST_FALL = "HOTEL_LIST_FALL"; //검색 호텔 리스트 조회 요청 실패

const HOTEL_FILTER_LIST = "HOTEL_FILTER_LIST"; //사이드필터 검색 호텔 리스트 조회 요청
const HOTEL_FILTER_LIST_SUCCESS = "HOTEL_FILTER_LIST_SUCCESS"; //사이드필터 검색 호텔 리스트 조회 요청 성공
const HOTEL_FILTER_LIST_FALL = "HOTEL_FILTER_LIST_FALL"; //사이드필터 검색 호텔 리스트 조회 요청 실패

export const hotel_list = createAction(HOTEL_LIST, (data) => data);
export const hotel_filter_list = createAction(HOTEL_FILTER_LIST, (data) => data);

const initialState = {
    hotelList : null,
    filterhotelList : null
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
        [HOTEL_FILTER_LIST_SUCCESS] : (state, action) => ({
            ...state,
            filterhotelList : action.payload
        }),
        [HOTEL_FILTER_LIST_FALL] : (state, action) => ({
            ...state,
            filterhotelList : action.payload
        }),
    },
    initialState
)

export default hotelSearchActions;

export function* hotelSearchActionsSaga(){
    yield takeLatest(HOTEL_LIST, hotelListSaga);
    yield takeLatest(HOTEL_FILTER_LIST, hotelFilterListSaga);
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
function* hotelFilterListSaga(action){
    try {
        const hotel_filter_list = yield call(api.hotel_filter_search, action.payload);
        yield put({
            type : HOTEL_FILTER_LIST_SUCCESS,
            payload : hotel_filter_list.data
        });

    }catch(e){
        yield put({
            type : HOTEL_FILTER_LIST_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}