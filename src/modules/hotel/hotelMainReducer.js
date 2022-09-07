import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable";

// 액션 타입
const POST_MY_HOTEL_LIST = "POST_MY_HOTEL_LIST" //나의 호텔 리스트

export const selectHotelList = createAction(POST_MY_HOTEL_LIST); //{ form, name, value }


const initialState = Map({
    //나(사업자)의 호텔리스트 조회된 값
    MY_HOTEL_LIST : ({
        form : {
            list : []

        }
    }),

    
});
export default handleActions({
    [POST_MY_HOTEL_LIST] : (state, action) => {
        const { data } = action.payload;
        return state.setIn(['MY_HOTEL_LIST', 'form', 'list'], []);
    },
}, initialState)
