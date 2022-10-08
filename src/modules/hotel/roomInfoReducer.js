import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable"
import moment from "moment";
// 액션 타입
const CHANGE_INPUT = "ROOM_CHANGE_INPUT" //input 값 변경
const CHANGE_CHECKBOX = "ROOM_CHANGE_CHECKBOX" //객실 체크박스 값 변경
const CHANGE_IMAGE = "ROOM_CHANGE_IMAGE" // 객실이미지 변경

const INSERT_INPUT = "ROOM_INSERT_INPUT"; //조회 성공후 초기값 dispatch

const RESET = "RESET";
export const changeInput = createAction(CHANGE_INPUT); //{ form, name, value }
export const changeCheckbox = createAction(CHANGE_CHECKBOX);
export const chnageImages = createAction(CHANGE_IMAGE);
export const insertInput = createAction(INSERT_INPUT);
export const reset = createAction(RESET);


const initialState = Map({
    //객실등록&수정 INPUT 
    REGISTER : ({
        form: Map({
            check_in_time: "15:00",
            check_out_time: "11:00",
            double_bed_count: 0,
            single_bed_count: 0,
            holiday_price_status: 0,
            hotel_num: "",
            maximum_people : 2,
            minimum_people : 1,
            name: "",
            p_weekday_price: "",
            p_weekend_price: "",
            weekday_price: "",
            weekend_price: "",
            room_detail_list : [{
                name : "",
                room_closed_start : "",
                room_closed_end : "",
                room_detail_status : 0
            }],
            originalName : ""
        })
    }),
    //객실 태그
    ROOM_SERVICE : ({
        form : {
            tags : []

        }
    })
    
});
export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [CHANGE_CHECKBOX] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [CHANGE_IMAGE] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INSERT_INPUT] : (state, action) => {
        const { data } = action.payload;
        // const room_detail_list = []
        // if(data.room_detail_info){
        //     for(var i =0; i<data.room_detail_info.length; i++){
        //         const status = parseInt(data.room_detail_info[i].room_detail_status);
        //         room_detail_list.push({
        //                 id : i,
        //                 name : data.room_detail_info[i].name,
        //                 room_detail_status : data.room_detail_info[i].room_detail_status,
        //                 room_closed_start :status === 0 ? "": moment(data.room_detail_info[i].room_closed_start).format("YYYY-MM-DD"),
        //                 room_closed_end : status === 0 ? "" : moment(data.room_detail_info[i].room_closed_end).format("YYYY-MM-DD")
        //             })
        //     }
        // }else{
        //     room_detail_list.push({
        //         id : 0,
        //         name : '',
        //         room_num : '',
        //         room_detail_status : '',
        //         delete_date : '',
        //         room_closed_start : '',
        //         room_closed_end : ''
        //     }) 
        // }
        if(!data.tags) data.tags=[];
        
        return state.setIn(['REGISTER', 'form', 'check_in_time'], data.check_in_time)
                    .setIn(['REGISTER', 'form', 'check_out_time'], data.check_out_time)
                    .setIn(['REGISTER', 'form', 'double_bed_count'], data.double_bed_count)
                    .setIn(['REGISTER', 'form', 'single_bed_count'], data.single_bed_count)
                    .setIn(['REGISTER', 'form', 'holiday_price_status'], data.holiday_price_status)
                    .setIn(['REGISTER', 'form', 'hotel_num'], data.hotel_num)
                    .setIn(['REGISTER', 'form', 'maximum_people'], data.maximum_people)
                    .setIn(['REGISTER', 'form', 'minimum_people'], data.minimum_people)
                    .setIn(['REGISTER', 'form', 'name'], data.name)
                    .setIn(['REGISTER', 'form', 'originalName'], data.name)
                    .setIn(['REGISTER', 'form', 'p_weekday_price'], data.p_weekday_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))
                    .setIn(['REGISTER', 'form', 'p_weekend_price'], data.p_weekend_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))
                    .setIn(['REGISTER', 'form', 'weekday_price'], data.weekday_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))
                    .setIn(['REGISTER', 'form', 'weekend_price'], data.weekend_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))
                    .setIn(['REGISTER', 'form', 'room_detail_list'], data.room_detail_info)
                    .setIn(['ROOM_SERVICE', 'form', 'tags'], data.tags)
                    
    },
    [RESET] : () => {
        return initialState;
    }
}, initialState)