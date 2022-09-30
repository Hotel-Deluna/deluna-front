import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable";

// 액션 타입
const POST_ROOM_LIST = "POST_ROOM_LIST"; //나의 호텔 리스트 조회값 store 저장
const GET_ROOM_CODE = "GET_ROOM_CODE"; //공통코드 호텔 부가서비스/시설 조회값 store 저장
export const selectRoomList = createAction(POST_ROOM_LIST); //{ form, name, value }
export const selectRoomCode = createAction(GET_ROOM_CODE);

const initialState = Map({
    //나(사업자)의 호텔리스트 조회된 값
    ROOM_LIST : ({
        form : {
            list : []

        }
    }),
    ROOM_CODE : ({
        form : {
            code : []

        }
    }),

    
});
export default handleActions({
    [POST_ROOM_LIST] : (state, action) => {
        const { data } = action.payload;
        return state.setIn(['ROOM_LIST', 'form', 'list'], data);
    },
    [GET_ROOM_CODE] : (state, action) => {
        const { data } = action.payload;
        return state.setIn(['ROOM_CODE', 'form', 'code'], data);
    },
}, initialState)
