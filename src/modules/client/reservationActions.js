import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as clientApi from "../../lib/api/client";
import * as authApi from "../../lib/api/auth";
//redux 조회 및 요청
const [MEMBERINFO, MEMBERINFO_SUCCESS, MEMBERINFO_FAILURE] = createRequestActionTypes(
    'client/MEMBERINFO'
);

const [RESERVATION, RESERVATION_SUCCESS, RESERVATION_FAILURE] = createRequestActionTypes(
    'client/RESERVATION'
);

const initialState = {
    memberInfo : null, //객실리스트 상태
    reservationRegister : null //공통코드(호텔 부가서비스/시설) 상태
}
export const member_info = createAction(MEMBERINFO); //객실등록
export const reservation_register = createAction(RESERVATION, (data) => data); //객실수정
const memberInfoSaga = createRequestSaga(MEMBERINFO, authApi.partnerSelect);
const reservationSaga = createRequestSaga(RESERVATION, clientApi.reservation);

export function* reservationActionsSaga(){
    yield takeLatest(MEMBERINFO, memberInfoSaga);
    yield takeLatest(RESERVATION, reservationSaga);
}
const reservationActions = handleActions(
    {
        //고객정보조회 성공 시
        [MEMBERINFO_SUCCESS] : (state, action) => ({ 
            ...state,
            memberInfo : action.payload
        }),
        //고객정보조회 실패 시 
        [MEMBERINFO_FAILURE] : (state, action) => ({ 
            ...state,
            memberInfo : action.payload
        }),

        //예약하기 성공
        [RESERVATION_SUCCESS] : (state, action) => ({ 
            ...state,
            reservationRegister : action.payload,
        }),
        //예약하기 실패
        [RESERVATION_FAILURE] : (state, action) => ({ 
            ...state,
            reservationRegister : action.payload,
        }),

    },
    initialState
);

export default reservationActions;