import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import auth, {authSaga} from './auth';
import loading from "./loading";
//호텔 등록&수정 input,이미지,체크박스 상태관리하는 redux
import hotelInfoReducer from "./hotel/hotelInfoReducer";
//호텔 등록&수정 axios 통신하는 redux
import hotelInfoActions, {hotelInfoActionsSaga} from "./hotel/hotelInfoActions";
//나(사업자)의 호텔리스트 axios 통신하는 redux
import hotelMainActions,{hotelMainActionsSaga} from "./hotel/hotelMainActions";
//나(사업자)의 호텔리스트 상태관리하는 redux
import hotelMainReducer from "./hotel/hotelMainReducer";
//객실삭제(일괄삭제) axios 통신
import roomDeleteActions, {roomBatchDeleteActionsSaga} from "./hotel/roomDeleteActions";
//객실삭제(일괄삭제) 상태관리하는 redux
import roomDeleteReducer from "./hotel/roomDeleteReducer";
//고객 or 사업자 회원탈퇴 axios 통신
import secessionActions, {secessionActionsSaga} from "./secessionActions";
//고객이 검색필터를 통해 axios 통심
import hotelSearchActions,{hotelSearchActionsSaga} from "./client/hotelSearchActions";
import hotelSearchReducer from "./client/hotelSearchReducer";
import reservationListActions,{reservationListActionsSaga} from "./client/reservationListActions";
//사업자 
import roomMainActions, {roomMainActionsSaga} from "./hotel/roomMainActions";
import hotelReservationActions, {hotelReservationActionsSaga} from "./hotel/hotelReservationActions";
import roomMainReducer from "./hotel/roomMainReducer";
import mainActions, {mainActionsSaga} from "./mainActions";
const rootReducer = combineReducers({
    auth,
    loading,
    hotelInfoReducer,
    hotelInfoActions,
    hotelMainReducer,
    hotelMainActions,
    roomDeleteReducer,
    roomDeleteActions,
    secessionActions,
    hotelSearchActions,
    hotelSearchReducer,
    reservationListActions,
    roomMainReducer,
    roomMainActions,
    hotelReservationActions,
    mainActions
})
export function* rootSaga(){
    yield all([authSaga(), hotelInfoActionsSaga(),hotelMainActionsSaga(),
        roomBatchDeleteActionsSaga(),secessionActionsSaga(),hotelSearchActionsSaga(),
        reservationListActionsSaga(), roomMainActionsSaga(),hotelReservationActionsSaga(),
        mainActionsSaga()
    ]);
}
export default rootReducer;