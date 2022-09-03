import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import authJoin, {authJoinSaga} from './authJoin';
import auth, {authSaga} from './auth';
import loading from "./loading";

const rootReducer = combineReducers({
    authJoin,
    auth,
    loading,
})
export function* rootSaga(){
    console.log(authSaga);
    yield all([authJoinSaga(), authSaga()]);
}
export default rootReducer;