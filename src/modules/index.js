import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import authJoin, {authJoinSaga} from './authJoin';
import loading from "./loading";

const rootReducer = combineReducers({
    authJoin, 
    loading,
})
export function* rootSaga(){
    yield all([authJoinSaga()]);
}
export default rootReducer;