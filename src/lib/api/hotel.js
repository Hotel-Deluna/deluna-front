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

//객실 일괄삭제시 모달창 정보조회 API
export const room_batch_delete_info = (data) =>
axios.post('http://43.200.222.222:8080/hotel/room/delete/info',
    {
        room_num : data
    },
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234',
    }
});

//객실 일괄삭제 요청 API
export const room_batch_delete = (data) =>
axios.delete('http://43.200.222.222:8080/hotel/room/delete', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234',
    },
    data: {
        room_num: data
    }
});

//객실 태그 조회 API
export const room_code = () =>
axios.get('http://43.200.222.222:8080/common/code/room');

//호실삭제시 모달창 정보조회 API
export const room_individual_delete_info = (data) =>
axios.post('http://43.200.222.222:8080/hotel/room/detail/delete/info',
    {
        room_detail_num : data
    },
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234',
    }
});

//호실삭제 요청 API
export const room_individual_delete = (data) =>
axios.delete('http://43.200.222.222:8080/hotel/room/delete', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234',
    },
    data: {
        room_detail_num : data
    }
});

//호텔삭제 요청 API
export const hotel_delete = (data) =>
axios.delete('http://43.200.222.222:8080/hotel/delete', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : '1234',
    },
    data: {
        data
    }
});