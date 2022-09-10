import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable";

// 액션 타입
const POST_MY_HOTEL_LIST = "POST_MY_HOTEL_LIST"; //나의 호텔 리스트 조회값 store 저장
const GET_HOTEL_CODE = "GET_HOTEL_CODE"; //공통코드 호텔 부가서비스/시설 조회값 store 저장
export const selectHotelList = createAction(POST_MY_HOTEL_LIST); //{ form, name, value }
export const selectHotelCode = createAction(GET_HOTEL_CODE);

const initialState = Map({
    //나(사업자)의 호텔리스트 조회된 값
    MY_HOTEL_LIST : ({
        form : {
            list : []

        }
    }),
    HOTEL_CODE : ({
        form : {
            code : []

        }
    }),

    
});
export default handleActions({
    [POST_MY_HOTEL_LIST] : (state, action) => {
        const { data } = action.payload;
        return state.setIn(['MY_HOTEL_LIST', 'form', 'list'], data);
    },
    [GET_HOTEL_CODE] : (state, action) => {
        const { data } = action.payload;
        return state.setIn(['HOTEL_CODE', 'form', 'code'], data);
    },
}, initialState)
