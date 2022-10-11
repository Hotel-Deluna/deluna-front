import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";


//redux 조회 및 요청
const [MEMBERINFO, MEMBERINFO_SUCCESS, MEMBERINFO_FAILURE] = createRequestActionTypes(
    'client/MEMBERINFO'
);

const [RESERVATION, RESERVATION_SUCCESS, RESERVATION_FAILURE] = createRequestActionTypes(
    'client/RESERVATION'
);

