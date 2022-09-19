import { createAction, handleActions } from "redux-actions";
import {Map} from "immutable"

const FILTER_DATA = "FILTER_DATA" //사이드필터 데이터값

export const filterData = createAction(FILTER_DATA);
const initialState = Map({
    HOTEL_FILTER : ({
        form : {
            data : []
        }
    }),
    FILTER_DATA : ({
        form : {
            hotel_num : [],
            location : [],
            maximum_price : 100000,
            minimum_price : 0,
            rank_num : 1,
            star : null,
            tags :[]
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
        if(name === 'hotel_num'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }else if(name === 'location'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }else if(name === 'maximum_price'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }else if(name === 'minimum_price'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }else if(name === 'rank_num'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }else if(name === 'star'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }else if(name === 'tags'){
            return state.setIn(['FILTER_DATA', 'form', name], value)
        }
    }
}, initialState)

