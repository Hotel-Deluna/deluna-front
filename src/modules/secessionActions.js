import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/authSecession";

//고객
const CLIENT_SECESSION = "CLIENT_SECESSION"; //고객 회원탈퇴 요청
const CLIENT_SECESSION_SUCCESS = "CLIENT_SECESSION_SUCCESS"; //고객 회원탈퇴 성공
const CLIENT_SECESSION_FALL = "CLIENT_SECESSION_FALL"; //고객 회원탈퇴 실패

//owner
const OWNER_SECESSION = "OWNER_SECESSION"; //사업자 회원탈퇴 요청
const OWNER_SECESSION_SUCCESS = "OWNER_SECESSION_SUCCESS"; //사업자 회원탈퇴 성공
const OWNER_SECESSION_FALL = "OWNER_SECESSION_FALL"; //사업자 회원탈퇴 실패

const CLIENT_SECESSION_CONFIRM = "CLIENT_SECESSION_CONFIRM"; //탈퇴 성공하면 고객 reset
const OWNER_SECESSION_CONFIRM = "OWNER_SECESSION_CONFIRM"; //탈퇴 성공하면 사업자 reset
export const client_secession = createAction(CLIENT_SECESSION, (data) => data); //고객 회원탈퇴
export const owner_secession = createAction(OWNER_SECESSION, (data) => data); //사업자 회원탈퇴
export const client_confirm = createAction(CLIENT_SECESSION_CONFIRM);
export const owner_confirm = createAction(OWNER_SECESSION_CONFIRM);
const initialState = {
    client : null,
    owner : null
}

const secessionActions = handleActions(
    {
        //고객 회원탈퇴 성공 시
        [CLIENT_SECESSION_SUCCESS] : (state, action) => ({ 
            ...state,
            client : action.payload,
        }),
        //고객 회원탈퇴 실패 시
        [CLIENT_SECESSION_FALL] : (state, action) => ({ 
            ...state,
            client : action.payload,
        }),
        //사업자 회원탈퇴 성공 시
        [OWNER_SECESSION_SUCCESS] : (state, action) => ({ 
            ...state,
            owner : action.payload,
        }),
        //사업자 회원탈퇴 실패 시
        [OWNER_SECESSION_FALL] : (state, action) => ({ 
            ...state,
            owner : action.payload,
        }),
        //회원 회원탈퇴 성공시 initialState 초기화
        [CLIENT_SECESSION_CONFIRM] : (state, action) => ({ 
            ...state,
            client : action.payload,
        }),
        [OWNER_SECESSION_CONFIRM] : (state, action) => ({ 
            ...state,
            owner : action.payload,
        }),

    },
    initialState
)
export default secessionActions;

export function* secessionActionsSaga(){
    yield takeLatest(CLIENT_SECESSION, clientSecessionSaga);
    yield takeLatest(OWNER_SECESSION, ownerSecessionSaga);
    yield takeLatest(CLIENT_SECESSION_CONFIRM, clientSecessionSaga);
    yield takeLatest(OWNER_SECESSION_CONFIRM, clientSecessionSaga);
}
//고객 회원탈퇴 요청
function* clientSecessionSaga(action){
    if(action.type === 'CLIENT_SECESSION_CONFIRM'){
        return initialState;
    }else{
        try {
            const client = yield call(api.client_secession, action.payload);
            yield put({
                type : CLIENT_SECESSION_SUCCESS,
                payload : client.data
            });
        }catch(e){
            yield put({
                type : CLIENT_SECESSION_FALL,
                payload : {
                    result : 'serverError',
                    message : e
                },
                error: true,
            })
        }
    }
}
//사업자 회원 탈퇴
function* ownerSecessionSaga(action){
    if(action.type === 'OWNER_SECESSION_CONFIRM'){
        return initialState;
    }else{
        try {
            const owner = yield call(api.owner_secession, action.payload);
            yield put({
                type : OWNER_SECESSION_SUCCESS,
                payload : owner.data
            });
        }catch(e){
            yield put({
                type : OWNER_SECESSION_FALL,
                payload : {
                    result : 'serverError',
                    message : e
                },
                error: true,
            })
        }
    }
}

