import axios from "axios";

//호텔 등록 API
export const hotel_register = (data) =>
axios.post('http://43.200.222.222:8080/hotel/register',data,{
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : '1234',
    }
});

//호텔 수정 API
export const hotel_edit = (data) =>
axios.patch('http://43.200.222.222:8080/hotel/edit',data,{
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : '1234',
    }
});

//호텔 상세 정보 조회 API
export const hotel_info = (data) =>
axios.post('http://43.200.222.222:8080/hotel/info',{
    hotel_num : data
});

//나(사업자)의 호텔리스트 조회 API
export const my_hotel_list = (data) =>
axios.post('http://43.200.222.222:8080/hotel/owner-hotel-list',
    {
        text : data
    },
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234',
    }
});

//호텔 부가시설/서비스 태그 조회 API
export const hotel_code = () =>
axios.get('http://43.200.222.222:8080/common/code/hotel');