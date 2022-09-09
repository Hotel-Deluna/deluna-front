import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable";

const POST_ROOM_BATCH_DELETE_IFNO = "POST_ROOM_BATCH_DELETE_IFNO";
export const roomBatchDeleteInfo = createAction(POST_ROOM_BATCH_DELETE_IFNO);

const initialState = Map({
    ROOM_BATCH_DELETE_INFO : ({
        form : {
            info : []
        }
    })
});

export default handleActions({
    [POST_ROOM_BATCH_DELETE_IFNO] : (state, action) => {
        const {data} = action.payload;
        return state.setIn(['ROOM_BATCH_DELETE_INFO', 'form', 'info'], data);
    }
}, initialState)

