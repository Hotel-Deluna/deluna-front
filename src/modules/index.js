import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import authJoin, {authJoinSaga} from './authJoin';
import auth, {authSaga} from './auth';
import loading from "./loading";
import hotelInfoReducer from "./hotelInfoReducer";

const rootReducer = combineReducers({
    authJoin,
    auth,
    loading,
    hotelInfoReducer

})
export function* rootSaga(){
    console.log(authSaga);
    yield all([authJoinSaga(), authSaga()]);
}
export default rootReducer;