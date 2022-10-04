import { createAction, handleActions } from "redux-actions";
import {Map, setIn} from "immutable"

const FILTER_DATA = "FILTER_DATA"; //사이드필터 데이터값
const HEADER_DATA = "HEADER_DATA"; //헤더필더 데이터값
const KAKAO_MAP = "KAKAO_MAP";
const RESET = "RESET";

export const filterData = createAction(FILTER_DATA);
export const headerData = createAction(HEADER_DATA);
export const kakaoMap = createAction(KAKAO_MAP);
export const reset = createAction(RESET);
const initialState = Map({
    HOTEL_FILTER : ({
        form : {
            data : []
        }
    }),
    FILTER_DATA : ({
        form : {
            hotel_num : [],
            maximum_price : 1000000,
            minimum_price : 0,
            rank_num : 1,
            star : null,
            hotel_tags :[],
            room_tags : [],
            page : 1,
            page_cnt : 5
        }
    }),
    HEADER_DATA : ({
        form : {
            page : 1,
            page_cnt : 5,
            people_count : 1,
            room_count : 1,
            reservation_end_date : '',
            reservation_start_date : '',
            search_type : '',
            text : ''
        }
    }),
    KAKAO_MAP : ({
        form : {
            click : false
        }
    })
    
});
export default handleActions({
    // [HOTEL_NUM] : (state, action) => {
    //     const { data } = action.payload;
    //     console.log(data)
    //     return state.setIn(['HOTEL_NUM', 'form', 'data'], data)
    // },
    // [HOTEL_FILTER] : (state, action) => {
    //     const { data } = action.payload;
    //     console.log(data)
    //     return state.setIn(['HOTEL_FILTER', 'form', 'data'], data)
    // },
    [FILTER_DATA] : (state, action) => {
        const {name, value} = action.payload;
        return state.setIn(['FILTER_DATA', 'form', name], value)
        // if(name === 'hotel_num'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'location'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'maximum_price'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'minimum_price'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'rank_num'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'star'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'hotel_tags'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'room_tags'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }else if(name === 'page'){
        //     return state.setIn(['FILTER_DATA', 'form', name], value)
        // }
    },

    [HEADER_DATA] : (state, action) => {
        const {data} = action.payload;
        sessionStorage.setItem('headerData', JSON.stringify(data));
        return state.setIn(['HEADER_DATA', 'form', 'page'], data.page)
                .setIn(['HEADER_DATA', 'form', 'people_count'], data.people_count)
                .setIn(['HEADER_DATA', 'form', 'room_count'], data.room_count)
                .setIn(['HEADER_DATA', 'form', 'page_cnt'], 10)
                .setIn(['HEADER_DATA', 'form', 'reservation_start_date'], data.reservation_start_date)
                .setIn(['HEADER_DATA', 'form', 'reservation_end_date'], data.reservation_end_date)
                .setIn(['HEADER_DATA', 'form', 'search_type'], data.search_type)
                .setIn(['HEADER_DATA', 'form', 'text'], data.text)
    },
    [KAKAO_MAP] : (state, action) => {
        const {click} = action.payload;
        return state.setIn(['KAKAO_MAP','form','click'], click)
    },
    [RESET] : () => {
    return initialState;
    }
}, initialState)

