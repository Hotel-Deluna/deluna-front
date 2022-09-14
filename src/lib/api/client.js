import axios from "axios";

// const client = axios.create;
// /*
// //api 주소를 다른 곳으로 사용함
// client.defaults.baseURL = 'http://43.200.222.222:8080';

// client.defaults.headers.common['Authorization'] = '1234';

// axios.interceptors.response.use(
//     response =>{
//         //성공시
//         return response;
//     },
//     error => {
//         //요청 실패
//         return Promise.reject(error);
//     }
// );
// */

//사용자가 상단 검색바를 통해 호텔리스트 조회 요청
export const hotel_search = (data) =>
axios.get('http://43.200.222.222:8080/hotel/search/list',{
    params : {
        people_count : data.guest,
        reservation_start_date : data.checkIn,
        reservation_end_date : data.checkOut,
        search_type : data.search_type,
        text : data.text
    }
});

//사용자가 사이드필터를 통해 호텔리스트 조회 요청
export const hotel_filter_search = (data) =>
axios.post('http://43.200.222.222:8080/hotel/search/list/filter',data,
    {
    headers: {
        'Content-Type': 'application/json'
    }
});