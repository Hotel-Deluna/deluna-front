import { Form } from "react-bootstrap";
import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable"
// 액션 타입
const CHANGE_INPUT = "CHANGE_INPUT" //input 값 변경
const CHANGE_CHECKBOX = "CHANGE_CHECKBOX" //호텔 체크박스 값 변경
const CHANGE_IMAGE = "CHANGE_IMAGE" // 호텔이미지 변경

export const changeInput = createAction(CHANGE_INPUT); //{ form, name, value }
export const changeCheckbox = createAction(CHANGE_CHECKBOX);
export const chnageImages = createAction(CHANGE_IMAGE);

const initialState = Map({
    //호텔등록&수정 INPUT 
    REGISTER : ({
        form: Map({
            address: "",
            eng_name: "",
            info: "",
            location:[],
            ko_name: "",
            peak_season_list : [{
                id : 0,
                peak_season_start : '',
                peak_season_end : ''
                    
            }],
            phone_num: "",
            region_1depth_name : "",
            region_2depth_name : "",
            rule: "",
            star: ""
        })
    }),
    //부가 시설 / 서비스 체크박스
    HOTEL_SERVICE : ({
        form : {
            tags : []

        }
    }),
    HOTEL_IMAGE : ({
        form : Map({
            imageFile : [],
            imageUrl : [],
        })
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
}, initialState)