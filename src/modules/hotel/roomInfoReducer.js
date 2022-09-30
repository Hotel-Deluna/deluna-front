import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable"
import moment from "moment";
// 액션 타입
const CHANGE_INPUT = "CHANGE_INPUT" //input 값 변경
const CHANGE_CHECKBOX = "CHANGE_CHECKBOX" //객실 체크박스 값 변경
const CHANGE_IMAGE = "CHANGE_IMAGE" // 객실이미지 변경

const INSERT_INPUT = "INSERT_INPUT"; //조회 성공후 초기값 dispatch
const CONVER_FILE = "CONVER_FILE" //서버 URL -> 파일 변환 (멀티파트를 위해)

const RESET = "RESET";
export const changeInput = createAction(CHANGE_INPUT); //{ form, name, value }
export const changeCheckbox = createAction(CHANGE_CHECKBOX);
export const chnageImages = createAction(CHANGE_IMAGE);
export const insertInput = createAction(INSERT_INPUT);
export const converFile = createAction(CONVER_FILE);
export const reset = createAction(RESET);


const initialState = Map({
    //객실등록&수정 INPUT 
    REGISTER : ({
        form: Map({
            check_in_time: "",
            check_out_time: "",
            double_bed_count: "",
            single_bed_count: "",
            holiday_price_status: 0,
            hotel_num: "",
            maximum_people : "",
            minimum_people : "",
            name: "",
            p_weekday_price: "",
            p_weekend_price: "",
            weekday_price: "",
            weekend_price: "",
            room_detail_list : [{
                id : 0,
                name : '',
                room_num : 0,
                room_closed_start : '',
                room_closed_end : '',
                delete_date : '',
                room_detail_status : 0
            }],
        })
    }),
    //객실 태그
    ROOM_SERVICE : ({
        form : {
            tags : []

        }
    }),
    ROOM_IMAGE : ({
        form : {
            imageFile : [],
            imageUrl : [],
        }
    }),
    
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
        const room_detail_list = []
        if(data.peak_season_list){
            for(var i =0; i<data.room_detail_list.length; i++){
                room_detail_list.push({
                        id : i,
                        name : data.room_detail_list.name,
                        room_num : data.room_detail_list.room_num,
                        room_detail_status : data.room_detail_list.room_detail_status,
                        delete_date : moment(data.room_detail_list[i].delete_date).format("YYYY-MM-DD"),
                        room_closed_start : moment(data.room_detail_list[i].room_closed_start).format("YYYY-MM-DD"),
                        room_closed_end : moment(data.room_detail_list[i].room_closed_end).format("YYYY-MM-DD")
                    })
            }
        }else{
            room_detail_list.push({
                id : 0,
                name : '',
                room_num : '',
                room_detail_status : '',
                delete_date : '',
                room_closed_start : '',
                room_closed_end : ''
            }) 
        }
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
                    .setIn(['REGISTER', 'form', 'p_weekday_price'], data.p_weekday_price)
                    .setIn(['REGISTER', 'form', 'p_weekend_price'], data.p_weekend_price)
                    .setIn(['REGISTER', 'form', 'weekday_price'], data.weekday_price)
                    .setIn(['REGISTER', 'form', 'weekend_price'], data.weekend_price)
                    .setIn(['REGISTER', 'form', 'room_detail_list'], room_detail_list)
                    .setIn(['ROOM_SERVICE', 'form', 'tags'], data.tags)
                    .setIn(['ROOM_IMAGE', 'form', 'imageUrl'], data.image)
                    
    },
    //파일 변환하는 액션
    [CONVER_FILE] : (state, action) => {
        const { data } = action.payload;
        let imageFiles = [];
        if(data.length > 0){
            data.forEach(function (element){
                convertURLtoFile(element+"?timestamp=2").then(result => imageFiles.push(result))
            })
            /*for(var i=0; i<data.length; i++){
                console.log(data[i])
                convertURLtoFile(data[i]+"?timestamp=2").then(result => console.log(result))
                //convertURLtoFile(data[i]+"?timestamp=2").then(result => imageFiles.push(result));
            }*/
        }
        return state.setIn(['HOTEL_IMAGE', 'form', 'imageFile'], imageFiles)
    },
    [RESET] : () => {
        return initialState;
    }
}, initialState)

//서버에서 받은 이미지 URL을 File로 변환
export const convertURLtoFile = async (url) => {
    
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop().split("?").shift(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop().split("?").shift(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
};
