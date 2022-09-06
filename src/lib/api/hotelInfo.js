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