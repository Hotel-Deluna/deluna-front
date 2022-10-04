import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/client";

const RESERVTION_LIST = "RESERVTION_LIST"; //고객 예약내역 조회 요청
const RESERVTION_LIST_SUCCESS = "RESERVTION_LIST_SUCCESS"; //고객 예약내역 조회 요청 성공
const RESERVTION_LIST_FALL = "RESERVTION_LIST_FALL"; //고객 예약내역 조회 요청 실패

const RESERVATION_CANCEL_REASON = "RESERVATION_CANCEL_REASON"; //예약취소 조회 요청
const RESERVATION_CANCEL_REASON_SUCCESS = "RESERVATION_CANCEL_REASON_SUCCESS"; //예약취소 조회 성공
const RESERVATION_CANCEL_REASON_FALL = "RESERVATION_CANCEL_REASON_FALL"; //예약취소 조회 실패

const NONMEMBER_RESERVTION_LIST = "RESERVTION_LIST"; //비회원 예약내역 조회 요청
const NONMEMBER_RESERVTION_LIST_SUCCESS = "RESERVTION_LIST_SUCCESS"; //비회원 예약내역 조회 요청 성공
const NONMEMBER_RESERVTION_LIST_FALL = "RESERVTION_LIST_FALL"; //비회원 예약내역 조회 요청 실패

export const reservation_list = createAction(RESERVTION_LIST, (data) => data);
export const reservation_cancel_reason = createAction(RESERVATION_CANCEL_REASON, (data) => data);
export const nonmember_reservation_list = createAction(NONMEMBER_RESERVTION_LIST, (data) => data);
const initialState = {
    reservationList : null,
    reservationCancelReason : null
}

const reservationListActions = handleActions(
    {
        [RESERVTION_LIST_SUCCESS] : (state, action) => ({
            ...state,
            reservationList : action.payload
        }),
        [RESERVTION_LIST_FALL] : (state, action) => ({
            ...state,
            reservationList : action.payload
        }),

        [RESERVATION_CANCEL_REASON_SUCCESS] : (state, action) => ({
            ...state,
            reservationCancelReason : action.payload
        }),
        [RESERVATION_CANCEL_REASON_FALL] : (state, action) => ({
            ...state,
            reservationCancelReason : action.payload
        }),

        [NONMEMBER_RESERVTION_LIST_SUCCESS] : (state, action) => ({
            ...state,
            reservationList : action.payload
        }),
        [NONMEMBER_RESERVTION_LIST_FALL] : (state, action) => ({
            ...state,
            reservationList : action.payload
        }),
    },
    initialState
)

export default reservationListActions;

export function* reservationListActionsSaga(){
    yield takeLatest(RESERVTION_LIST, reservationListSaga);
    yield takeLatest(RESERVATION_CANCEL_REASON, reservationCancelReasonSaga);
    yield takeLatest(NONMEMBER_RESERVTION_LIST, nonmberReservationListSaga);
}

function* reservationListSaga(action){
    try {
        const reservation_list = yield call(api.reservation_list, action.payload);
        console.log(reservation_list)
        yield put({
            type : RESERVTION_LIST_SUCCESS,
            payload : reservation_list.data
        });
    }catch(e){
        yield put({
            type : RESERVTION_LIST_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}
function* reservationCancelReasonSaga(action){
    try {
        const reservation_cancel_reason = yield call(api.reservation_cancel_reason, action.payload);
        yield put({
            type : RESERVATION_CANCEL_REASON_SUCCESS,
            payload : reservation_cancel_reason.data
        });
    }catch(e){
        yield put({
            type : RESERVATION_CANCEL_REASON_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}
function* nonmberReservationListSaga(action){
    try {
        const reservation_list = yield call(api.nonMeber_reservation_list, action.payload);
        yield put({
            type : NONMEMBER_RESERVTION_LIST_SUCCESS,
            payload : reservation_list.data
        });
    }catch(e){
        yield put({
            type : NONMEMBER_RESERVTION_LIST_FALL,
            payload : {
                result : 'serverError',
                message : e
            },
            error: true,
        })
    }
}