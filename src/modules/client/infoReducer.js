import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable";
import produce from "immer";

const SET_INFO = "SET_INFO";
const CHANGE_ROOMFIELD = "CHANGE_ROOMFIELD";
const ADD_ROOMLIST = "ADD_ROOMLIST";
const SET_SELECTROOM = "SET_SELECTROOM";
const SET_SELECTONEROOM = "SET_SELECTONEROOM";
const RESET = "INFO_RESET";
const CHANGE_HOTELFIELD = "CHANGE_HOTELFIELD";

export const set_info = createAction(SET_INFO);
export const change_roomField = createAction(
    CHANGE_ROOMFIELD,
    ({index, key ,value }) => ({
        index,
        key,
        value
    }),
);
export const change_hotelField = createAction(
    CHANGE_HOTELFIELD,
    ({ key ,value }) => ({
        key,
        value
    }),
);
export const set_selectOneRoom = createAction(
    SET_SELECTONEROOM,
    ({ index }) => ({
        index
    }),
);
export const add_roomlist = createAction(ADD_ROOMLIST,({ data }) => ({ data }));

export const set_selectRoom = createAction(SET_SELECTROOM);
export const reset = createAction(RESET);

const initialState = Map({
    //객실등록&수정 INPUT 
    hotelInfo : Map({
        hotel_num : "",
        hotel_ko_name : "",
        hotel_en_name : "",
        role : 0, //고객 : 1, 비회원 3
        reservation_start_date : "",
        reservation_end_date : "",
        roomList : [{}]
    })
});
  
//const roomRegisterSaga = createRequestSaga(ROOMREGISTER, api.room_register);


export default handleActions(
    {
        [SET_INFO] : (state, action) => {
            const { data } = action.payload;
            //console.log(data.roomList);
            let arr = [];
            
            if(data.roomList.length !== 0){
                if(data.roomList.length === 1){
                    let setData = {
                        people : 1,
                        room_cnt : 0,
                        roomInfo : data.roomList[0]
                    };
                    arr.push(setData);
                }else{
                    for(let i = 0; i <2; i++){
                        let setData = {
                            people : 1,
                            room_cnt : 0,
                            roomInfo : data.roomList[i]
                        };
                        arr.push(setData);
                    }
                    //console.log('arr', arr);
                }
            }
            return state.setIn(['hotelInfo', 'hotel_num'], data.hotel_num)
                     .setIn(['hotelInfo', 'hotel_ko_name'], data.hotel_ko_name)
                     .setIn(['hotelInfo', 'hotel_en_name'], data.hotel_en_name)
                     .setIn(['hotelInfo', 'reservation_start_date'], data.reservation_start_date)
                     .setIn(['hotelInfo', 'reservation_end_date'], data.reservation_end_date)
                     .setIn(['hotelInfo', 'roomList'], arr);
        },
        [ADD_ROOMLIST] : (state, {payload : {data}}) => {
            let arr = state.getIn(['hotelInfo', 'roomList']);
            let setArr = {};
            for(let i = 0; i < data.idx; i++){
                setArr = {
                    people : 1,
                    room_cnt : 0,
                    roomInfo : data.roomInfoList[i]
                }
            }
            
            return state.setIn(['hotelInfo', 'roomList'], arr.concat(setArr));
            // let setArr = {
            //     people : 1,
            //     room_cnt : 0,
            //     roomInfo : data.roomInfo
            // }
            //return state.setIn(['hotelInfo', 'roomList'], arr.concat(setArr));
        },
        [CHANGE_ROOMFIELD] : (state, { payload: { index, key, value } }) => {
            console.log(CHANGE_ROOMFIELD, index, key, value);
            return state.setIn(['hotelInfo', 'roomList', [index], key], value);
        },
        [CHANGE_HOTELFIELD] : (state, { payload: { key, value } }) => {
            return state.setIn(['hotelInfo', key], value);
        },
        [SET_SELECTROOM] : (state) => {
            let arr = state.getIn(['hotelInfo', 'roomList']);
            let new_arr = [];
            arr.filter((item) => (item.room_cnt !== 0 && (
                new_arr.push(item)
            )));
            //console.log('SET_SELECTROOM new_arr',new_arr);
            return state.setIn(['hotelInfo', 'roomList'], new_arr);
        },
        [SET_SELECTONEROOM] : (state, { payload: { index } }) => {
            let arr = state.getIn(['hotelInfo', 'roomList']);
            let new_arr = [];
            arr.filter((item, idx) => (idx === index && (
                new_arr.push(item)
            )));
            //console.log('new_arr',new_arr);
            return state.setIn(['hotelInfo', 'roomList'], new_arr);
        },

        [RESET] : () => {
            return initialState;
        },
}, initialState);

  