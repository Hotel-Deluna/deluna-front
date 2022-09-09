import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import authJoin, {authJoinSaga} from './authJoin';
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
const rootReducer = combineReducers({
    authJoin,
    auth,
    loading,
    hotelInfoReducer,
    hotelInfoActions,
    hotelMainReducer,
    hotelMainActions,
    roomDeleteReducer,
    roomDeleteActions,
})
export function* rootSaga(){
    console.log(authSaga);
    yield all([authJoinSaga(), authSaga(), hotelInfoActionsSaga(),hotelMainActionsSaga(),
        roomBatchDeleteActionsSaga()
    ]);
}
export default rootReducer;