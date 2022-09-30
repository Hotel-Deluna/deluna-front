import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/main";

const [CITYLIST, CITYLIST_SUCCESS, CITYLIST_FAILURE] = createRequestActionTypes(
    'main/CITYLIST'
  );
  
export const selectCityList = createAction(CITYLIST, (data) => data);
const initialState = {
    cityList : null,
}
const cityListSaga = createRequestSaga(CITYLIST, api.hotel_tourist);

export function* mainActionsSaga(){
    yield takeLatest(CITYLIST, cityListSaga);
}
const mainActions = handleActions(
    {
         //나의 객실리스트 조회 성공시
        [CITYLIST_SUCCESS] : (state, action) => ({ 
            ...state,
            cityList : action.payload,
        }),
        //나의 객실리스트 실패 시 
        [CITYLIST_FAILURE] : (state, action) => ({ 
            ...state,
            cityList : action.payload,
        }),
    }, initialState
)
export default mainActions;