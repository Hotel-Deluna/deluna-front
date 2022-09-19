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

//검색바 - 검색어에 일치하는 지역명, 호텔명, 호텔주소, 장소 있는지 조회
export const search_bar = (data) =>
axios.get('http://43.200.222.222:8080/hotel/search/bar',
    {
        params : {
            text : data
        }
    },
    {
    headers: {
        'Content-Type': 'application/json'
    }
});

//고객 예약내역 리스트
export const reservation_list = (data) =>
axios.post('http://43.200.222.222:8080/reservation/memberReservationList',data,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234'
    }
});

//고객 예약취소 사유 조회
export const reservation_cancel_reason = (data) => 
axios.post('http://43.200.222.222:8080/reservation/memberReservationDeleteContent',data,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234'
    }
});