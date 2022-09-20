import { Form } from "react-bootstrap";
import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable"
import moment from "moment";
// 액션 타입
const CHANGE_INPUT = "CHANGE_INPUT" //input 값 변경
const CHANGE_CHECKBOX = "CHANGE_CHECKBOX" //호텔 체크박스 값 변경
const CHANGE_IMAGE = "CHANGE_IMAGE" // 호텔이미지 변경

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
        const peak_season_list = []
        if(data.peak_season_list.length > 0){
            for(var i =0; i<data.peak_season_list.length; i++){
                    peak_season_list.push({
                        id : i,
                        peak_season_start : moment(data.peak_season_list[i].peak_season_start).format("YYYY-MM-DD"),
                        peak_season_end : moment(data.peak_season_list[i].peak_season_end).format("YYYY-MM-DD")
                    })
            }
        }else{
            peak_season_list.push({
                id : 0,
                peak_season_start : '',
                peak_season_end : ''
            }) 
        }
        return state.setIn(['REGISTER', 'form', 'ko_name'], data.name)
                    .setIn(['REGISTER', 'form', 'eng_name'], data.eng_name)
                    .setIn(['REGISTER', 'form', 'star'], data.star)
                    .setIn(['REGISTER', 'form', 'phone_num'], data.phone_num.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"))
                    .setIn(['REGISTER', 'form', 'address'], data.address)
                    .setIn(['REGISTER', 'form', 'info'], data.info)
                    .setIn(['REGISTER', 'form', 'rule'], data.rule)
                    .setIn(['REGISTER', 'form', 'peak_season_list'], peak_season_list)
                    .setIn(['HOTEL_SERVICE', 'form', 'tags'], data.tags)
                    .setIn(['HOTEL_IMAGE', 'form', 'imageUrl'], data.image)
                    
    },
    //파일 변환하는 액션
    [CONVER_FILE] : (state, action) => {
        const { data } = action.payload;
        let imageFiles = [];
        if(data.length > 0){
            for(var i=0; i<data.length; i++){
                convertURLtoFile(data[i]).then(result => imageFiles.push(result));
            }
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
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
};
