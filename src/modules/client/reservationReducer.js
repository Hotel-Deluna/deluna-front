import { createAction, handleAction, handleActions } from "redux-actions";
import {Map} from "immutable";
import { setDate } from "date-fns";
import moment from "moment";

const SET_LIST = 'client/RESERVATION/SET_LIST';
const CHANGE_VALUE = 'client/RESERVATION/CHANGE_VALUE';
const DELETE_LIST = 'client/RESERVATION/DELETE_LIST';

const initializeState = Map({
    reservationList : [],
    reservationInfoList : [],
    totalPrice : 0
});

export const set_info = createAction(SET_LIST);
export const change_value = createAction(CHANGE_VALUE);
export const delete_list = createAction(DELETE_LIST);

export default handleActions({
    [SET_LIST] : (state, action) => {
        const { data } = action.payload;
        //console.log('data', data.list.roomList[0].roomInfo.image[0]);
        let arr= [];
        let infoArr = [];
        let allPrice = 0;
        for(let i = 0; i < data.list.roomList.length; i++){
            for(let j=0; j < data.list.roomList[i].room_cnt; j++){
                let setData = {};
                let setInfoData = {};
                if(data.list.role === 1){
                    setData = {
                        hotel_num : data.list.hotel_num,
                        st_date : moment(data.list.reservation_start_date).format("YYYY-MM-DD"),
                        ed_date : moment(data.list.reservation_end_date).format("YYYY-MM-DD"),
                        role : data.list.role,
                        room_num : data.list.roomList[i].roomInfo.room_num,
                        reservation_people : data.list.roomList[i].people,
                        reservation_price : data.list.roomList[i].roomInfo.price,
                        reservation_name : data.memberInfo.name,
                        reservation_phone : data.memberInfo.phone_num? (data.memberInfo.phone_num.length === 10 ? data.memberInfo.phone_num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'):data.memberInfo.phone_num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') ) : '',
                    }
                }else{
                    setData = {
                        hotel_num : data.list.hotel_num,
                        st_date : moment(data.list.reservation_start_date).format("YYYY-MM-DD"),
                        ed_date : moment(data.list.reservation_end_date).format("YYYY-MM-DD"),
                        role : data.list.role,
                        room_num : data.list.roomList[i].roomInfo.room_num,
                        reservation_people : data.list.roomList[i].people,
                        reservation_price : data.list.roomList[i].roomInfo.price,
                        reservation_name : '',
                        reservation_phone : '',
                        reservation_phone_confirm : ''
                    }
                }
                setInfoData = {
                    name : data.list.roomList[i].roomInfo.name,
                    single_bed_count : data.list.roomList[i].roomInfo.single_bed_count,
                    double_bed_count : data.list.roomList[i].roomInfo.double_bed_count,
                    minimum_people : data.list.roomList[i].roomInfo.minimum_people,
                    maximum_people : data.list.roomList[i].roomInfo.maximum_people,
                    check_in_time : data.list.roomList[i].roomInfo.check_in_time,
                    check_out_time : data.list.roomList[i].roomInfo.check_out_time,
                    tags : data.list.roomList[i].roomInfo.tags,
                    image : data.list.roomList[i].roomInfo.image ? data.list.roomList[i].roomInfo.image[0] : null
                }
                allPrice +=  data.list.roomList[i].roomInfo.price;
                arr.push(setData);
                infoArr.push(setInfoData);
            }
        }
        console.log('reservationList', arr, infoArr, allPrice);
        return state.setIn(['reservationList'], arr)
                    .setIn(['reservationInfoList'], infoArr)
                    .setIn(['totalPrice'], (allPrice+allPrice * 0.1));
    },
    [CHANGE_VALUE]: (state, action) => {
        const { data } = action.payload;
        //console.log('CHANGE_VALUE',data);
        //console.log('CHANGE_VALUE', state.getIn(['reservationList', [data.index], data.key], data.value));
        return state.setIn(['reservationList', [data.index], data.key], data.value);
    },
    [DELETE_LIST]: (state, action) => {
        const { data } = action.payload;
        const arr = state.getIn(['reservationList']);
        const infoArr = state.getIn(['reservationInfoList']);
        const filter_infoArr = infoArr.filter((item, index) => (index !== data.index));
        const filter_arr = arr.filter((item, index) => (index !== data.index));
        let allPrice = 0;
        filter_arr.map((item)=> (
            allPrice += item.reservation_price
        ))
        return state.setIn(['reservationList'], filter_arr)
                    .setIn(['reservationInfoList'], filter_infoArr)
                    .setIn(['totalPrice'], (allPrice+allPrice * 0.1));
    }
}, initializeState);