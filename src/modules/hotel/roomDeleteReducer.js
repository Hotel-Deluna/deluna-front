import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable";

const POST_ROOM_BATCH_DELETE_IFNO = "POST_ROOM_BATCH_DELETE_IFNO";
const POST_ROOM_INDIVIDUAL_DELETE_INFO = "POST_ROOM_INDIVIDUAL_DELETE_INFO";

export const roomBatchDeleteInfo = createAction(POST_ROOM_BATCH_DELETE_IFNO);
export const roomIndividualDeleteInfo = createAction(POST_ROOM_INDIVIDUAL_DELETE_INFO);

const initialState = Map({
    ROOM_BATCH_DELETE_INFO : ({
        form : {
            info : []
        }
    }),
    ROOM_INDIVIDUAL_DELETE_INFO : ({
        form : {
            info : []
        }
    })
});

export default handleActions({
    [POST_ROOM_BATCH_DELETE_IFNO] : (state, action) => {
        const {data} = action.payload;
        return state.setIn(['ROOM_BATCH_DELETE_INFO', 'form', 'info'], data);
    },
    [POST_ROOM_INDIVIDUAL_DELETE_INFO] : (state, action) => {
        const {data} = action.payload;
        return state.setIn(['ROOM_INDIVIDUAL_DELETE_INFO', 'form', 'info'], data);
    }
}, initialState)

