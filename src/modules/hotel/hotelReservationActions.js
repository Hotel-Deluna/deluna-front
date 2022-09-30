import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as roomApi from "../../lib/api/room";
import * as hotelApi from "../../lib/api/hotel";

// 예약내역 조회
const [RESERVATIONLIST, RESERVATIONLIST_SUCCESS, RESERVATIONLIST_FAILURE] = createRequestActionTypes(
    'hotel/RESERVATIONLIST'
  );

  const initialState = {
    reservationList : null
}

export const reservation_list = createAction(RESERVATIONLIST, (data) => data); //호텔리스트 조회
const reservationListSaga = createRequestSaga(RESERVATIONLIST, hotelApi.hotel_reservation);

export function* hotelReservationActionsSaga(){
    yield takeLatest(RESERVATIONLIST, reservationListSaga);
}

const hotelReservationActions = handleActions(
    {
        //나의 호텔리스트 조회 성공시
        [RESERVATIONLIST_SUCCESS] : (state, action) => ({ 
            ...state,
            reservationList : action.payload
        }),
        //나의 호텔리스트
        [RESERVATIONLIST_FAILURE] : (state, action) => ({ 
            ...state,
            reservationList : action.payload
        })
    },
    initialState
);

export default hotelReservationActions;