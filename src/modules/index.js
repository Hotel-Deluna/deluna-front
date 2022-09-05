import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import authJoin, {authJoinSaga} from './authJoin';
import auth, {authSaga} from './auth';
import loading from "./loading";

//호텔 등록&수정 input,이미지,체크박스 상태관리하는 redux
import hotelInfoReducer from "./hotelInfoReducer";

//호텔 등록&수정 axios 통신하는 redux
import hotelInfoActions, {hotelInfoActionsSage} from "./hotelInfoActions";

const rootReducer = combineReducers({
    authJoin,
    auth,
    loading,
    hotelInfoReducer,
    hotelInfoActions

})
export function* rootSaga(){
    console.log(authSaga);
    yield all([authJoinSaga(), authSaga(), hotelInfoActionsSage()]);
}
export default rootReducer;