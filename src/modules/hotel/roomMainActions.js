import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as api from "../../lib/api/room";

//redux 조회 및 요청
const [ROOMLIST, ROOMLIST_SUCCESS, ROOMLIST_FAILURE] = createRequestActionTypes(
    'hotel/ROOMLIST'
  );
  const [ROOMCODE, ROOMCODE_SUCCESS, ROOMCODE_FAILURE] = createRequestActionTypes(
    'hotel/ROOMCODE'
  );

export const room_list = createAction(ROOMLIST, (data) => data); //객실리스트 조회
export const room_code = createAction(ROOMCODE); //공통 코드( 호텔 부가서비스/시설) 조회

const initialState = {
    roomList : null, //객실리스트 상태
    code : null, //공통코드(호텔 부가서비스/시설) 상태
}

const roomMainActions = handleActions(
    {
        //나의 객실리스트 조회 성공시
        [ROOMLIST_SUCCESS] : (state, action) => ({ 
            ...state,
            roomList : action.payload,
        }),
        //나의 객실리스트 실패 시 
        [ROOMLIST_FAILURE] : (state, action) => ({ 
            ...state,
            roomList : action.payload,
        }),

        //공통 코드( 객실 부가서비스/시설) 조회 성공시
        [ROOMCODE_SUCCESS] : (state, action) => ({ 
            ...state,
            code : action.payload,
        }),
        //공통 코드( 객실 부가서비스/시설) 조회 실패시
        [ROOMCODE_FAILURE] : (state, action) => ({ 
            ...state,
            code : action.payload,
        }),

    },
    initialState
)


const roomListSaga = createRequestSaga(ROOMLIST, api.room_info_list);
const roomCodeSaga = createRequestSaga(ROOMCODE, api.room_code);
export function* roomMainActionsSaga(){
    yield takeLatest(ROOMLIST, roomListSaga);
    yield takeLatest(ROOMCODE, roomCodeSaga);
}

export default roomMainActions;
